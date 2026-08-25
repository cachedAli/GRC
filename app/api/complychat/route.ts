import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Everything ComplyChat is allowed to claim. Kept in one string so the facts
 * stay auditable, if the product changes, this is the only place to edit.
 *
 * The pre-launch line is deliberate: we have demos running and no signed
 * customers, and the bot must say so rather than invent social proof.
 */
const SYSTEM = `You are ComplyChat, the website concierge for Complyverse AI, an AI-native enterprise GRC platform (pre-launch: live demos running, founding-customer program open, no public case studies yet, be honest about that if asked).

FACTS: 13 integrated modules: Governance & Document Management (policy lifecycle, versioning, attestations, committees, regulatory change), Compliance Assessments, Unified Control Library, Evidence Management (OCR, AI assessment, cross-framework reuse, audit packages), Enterprise Risk (register, KRIs, incidents, RCSA, appetite, analytics), Vulnerability Management (register, SLA, exceptions, AI fixes), Vendor Risk/TPRM, Audit Management, Workflow Automation, Asset Management (CIA scoring), Certification journeys, Dashboards, ComplyChat.

FRAMEWORKS (25+): ISO 27001, ISO 22301, SOC 2, PCI DSS, NIST CSF, NIST 800-53, GDPR, HIPAA, DORA, NIS2, COBIT 2019, SOX ITGC, SWIFT CSCF, SAMA CSF, NCA ECC, CBUAE Art.13, SBP, MAS TRM, Sri Lanka BSS, ARAMCO CCC, SABIC, CIS Controls, HITRUST.

DIFFERENTIATOR: 360-degree linkage, framework, policy, control, evidence, risk and audit are one connected graph; evidence is reused across frameworks and gaps surface automatically. AI in every module.

PRICING: tiered by modules and users; exact numbers in demos.

BEHAVIOR: Be concise (2-4 short sentences, plain text). Answer general GRC questions accurately. On buying intent (pricing, onboarding, framework need, comparison with Vanta/Drata/OneTrust), answer then suggest booking a live demo. Never invent customers, certifications, or metrics. Steer non-GRC topics back.

After your reply, on a new final line output exactly BOOK=yes if you are suggesting a demo now, else BOOK=no.`;

/**
 * Keyword-matched answers used when no ANTHROPIC_API_KEY is configured, or
 * when the API call fails. The widget stays useful either way, a broken
 * concierge on a pre-launch site is worse than a scripted one.
 */
function scripted(q: string): string {
  const s = q.toLowerCase();
  if (/framework|sama|nca|iso|soc|nist|gdpr|pci|dora|hipaa/.test(s))
    return "We ship 25+ frameworks built in, ISO 27001, SOC 2, PCI DSS, NIST, GDPR, plus regional ones like SAMA CSF, NCA, CBUAE and SBP, mapped into one unified control library. Evidence is reused across all of them.";
  if (/evidence/.test(s))
    return "Evidence comes in once (upload, OCR, metadata), our AI assesses it against framework controls, and cross-framework equivalence means one artifact can satisfy several obligations. Audit packages assemble themselves from what's already linked.";
  if (/pric|cost/.test(s))
    return "Pricing is tiered by modules and users, the pricing page shows the tier shapes, and exact numbers are shared in a demo scoped to your frameworks.";
  if (/vanta|drata|onetrust|competitor|different/.test(s))
    return "The short version: those platforms focus on trust automation or point domains. Complyverse links the whole chain, framework, policy, control, evidence, risk, audit, as one graph, with regional frameworks (SAMA, NCA, SBP) built in, not bolted on.";
  if (/demo|trial|start|onboard/.test(s))
    return "Easiest path is a 30-minute live demo scoped to your frameworks, pick a slot and we'll show your use case, not a canned tour.";
  if (/risk|erm|kri|rcsa/.test(s))
    return "Enterprise Risk covers the register, KRIs, incidents, RCSA campaigns, appetite and dependency analytics. Because gaps flow in from the same graph, a failed control becomes an owned risk without re-keying anything.";
  if (/audit.?ready|year.?round|stay compliant|continuous/.test(s))
    return "Staying audit-ready is the default, not a scramble. Evidence, controls and risks live on one graph, workflows chase the owners, and an audit package assembles from links that already exist. When the auditor asks, the trail is a query, not a quarter of hunting.";
  if (/manual|reduce.*work|automat|less work|save time/.test(s))
    return "The AI does the repetitive part: it drafts policies from framework context, recommends the evidence for each control, and reuses one artifact across every framework it satisfies. You review and approve, so people spend time on judgement, not data entry.";
  return "Complyverse is an AI-native GRC platform: 13 modules, 25+ frameworks, and a 360-degree linkage model that connects policies, controls, evidence, risks and audits. What would you like to dig into, frameworks, evidence, risk, or how the AI works?";
}

type Turn = { role: "user" | "assistant"; text: string };

export async function POST(req: Request) {
  let history: Turn[] = [];
  try {
    const body = (await req.json()) as { messages?: Turn[] };
    history = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const last = [...history].reverse().find((m) => m.role === "user");
  const question = last?.text?.trim() ?? "";
  if (!question) {
    return NextResponse.json({ error: "No question supplied" }, { status: 400 });
  }

  // No key configured, serve the scripted concierge instead of erroring.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply: scripted(question),
      book: /pric|demo|cost|trial|onboard/i.test(question),
      source: "scripted",
    });
  }

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024, // deliberately short: the bot answers in 2-4 sentences
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" }, // concierge Q&A, favour latency
      system: SYSTEM,
      messages: history.slice(-8).map((m) => ({
        role: m.role,
        content: m.text,
      })),
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        reply: scripted(question),
        book: false,
        source: "scripted",
      });
    }

    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    // The model appends a BOOK=yes/no line; strip it and use it as the signal
    // for whether to surface the "Book a live demo" button.
    const lines = text.split("\n");
    let book = false;
    if (/^BOOK=/i.test(lines[lines.length - 1]?.trim() ?? "")) {
      book = /yes/i.test(lines.pop() as string);
    }

    const reply = lines.join("\n").trim();
    return NextResponse.json({
      reply: reply || scripted(question),
      book,
      source: "claude",
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { reply: "I'm getting a lot of questions right now, try again in a moment, or book a demo and we'll answer live.", book: true, source: "scripted" },
        { status: 200 },
      );
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`ComplyChat API error ${err.status}:`, err.message);
    } else {
      console.error("ComplyChat error:", err);
    }
    return NextResponse.json({
      reply: scripted(question),
      book: /pric|demo|cost|trial|onboard/i.test(question),
      source: "scripted",
    });
  }
}
