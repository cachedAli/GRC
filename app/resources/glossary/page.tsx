import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/Primitives";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Compliance glossary",
  description:
    "Plain definitions for the vocabulary of GRC: frameworks, controls, evidence, risk, assessments, audit and the terms in between.",
  path: "/resources/glossary",
});

type Term = { term: string; def: string };
type Group = { label: string; terms: Term[] };

const GLOSSARY: Group[] = [
  {
    label: "Frameworks & compliance",
    terms: [
      { term: "Framework", def: "A structured set of requirements and controls, such as ISO 27001 or SOC 2, that an organisation aligns its programme to." },
      { term: "Control", def: "A safeguard or measure that reduces risk and satisfies a requirement, from access reviews to encryption." },
      { term: "Unified control library", def: "One harmonised set of controls mapped across every framework that needs them, so you implement a control once and inherit it everywhere." },
      { term: "Gap analysis", def: "A comparison of your current controls against a framework to surface exactly what is missing." },
      { term: "Statement of Applicability", def: "The ISO 27001 document that records which Annex A controls apply, and the justification for any excluded." },
      { term: "Cross-framework reuse", def: "Using a single piece of evidence to satisfy requirements in several frameworks at once, collected only once." },
    ],
  },
  {
    label: "Evidence & audit",
    terms: [
      { term: "Evidence", def: "An artifact, a log, policy, configuration or report, that proves a control is designed and operating." },
      { term: "Audit package", def: "The assembled set of controls and evidence handed to an assessor, built from links that already exist." },
      { term: "Type I / Type II", def: "SOC 2 report kinds: a point-in-time test of control design (I) versus operating effectiveness over a period (II)." },
      { term: "Attestation", def: "A formal, recorded acknowledgement that a policy or control has been read, reviewed or accepted." },
      { term: "Continuous control monitoring", def: "Automated, ongoing checks that a control keeps working between formal audits, not just at assessment time." },
    ],
  },
  {
    label: "Risk",
    terms: [
      { term: "Risk register", def: "The catalogue of identified risks, each with an owner, a score and a treatment decision." },
      { term: "Inherent vs residual risk", def: "The level of risk before controls are applied (inherent) versus what remains after them (residual)." },
      { term: "Risk appetite", def: "The amount and type of risk an organisation is willing to accept in pursuit of its objectives." },
      { term: "Key Risk Indicator (KRI)", def: "A metric that signals a rising level of risk as it approaches or breaches a defined threshold." },
      { term: "RCSA", def: "Risk and Control Self-Assessment: a structured review in which the business rates its own risks and control effectiveness." },
      { term: "Treatment", def: "The decision on how to handle a risk: accept, mitigate, transfer or avoid it." },
    ],
  },
  {
    label: "Governance & policy",
    terms: [
      { term: "Policy lifecycle", def: "The path a document travels: draft, review, approve, publish and attest, with version history at every step." },
      { term: "Exception", def: "A documented, approved deviation from a policy or control, mapped back to what it departs from." },
      { term: "Committee", def: "A governance body, such as a security steering committee, that owns decisions, charters and action items." },
      { term: "Regulatory change", def: "A tracked update to a law or standard that triggers a review of the affected controls and policies." },
    ],
  },
  {
    label: "Security & third parties",
    terms: [
      { term: "Vulnerability", def: "A weakness in a system, application or process that could be exploited by a threat." },
      { term: "EPSS / KEV", def: "The Exploit Prediction Scoring System and CISA's Known Exploited Vulnerabilities catalogue, used to prioritise fixes by real exploitability." },
      { term: "Remediation SLA", def: "The agreed time allowed to fix a finding, tracked from the day it is raised." },
      { term: "TPRM", def: "Third-Party Risk Management: assessing and continuously monitoring vendors across their whole lifecycle." },
      { term: "CIA triad", def: "Confidentiality, Integrity and Availability, the three properties that information security controls protect." },
    ],
  },
  {
    label: "The Compliverse model",
    terms: [
      { term: "The linkage graph", def: "The connected data model that ties frameworks, policies, controls, evidence, risks and audits together as one graph." },
      { term: "Tenant isolation", def: "Keeping each customer's data separated in its own scope, so answers and evidence never cross tenants." },
    ],
  },
];

export default function GlossaryPage() {
  return (
    <div className="bg-white">
      <RevealOnScroll />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eefaf6,#f7fdfb_60%,#ffffff)]">
        <div className="relative mx-auto max-w-[760px] px-6 pb-12 pt-[132px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            Compliance glossary
          </div>
          <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-.02em] text-ink sm:text-[46px]">
            The vocabulary of GRC, plainly defined.
          </h1>
          <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.6] text-ink-muted">
            The terms that run through frameworks, controls, evidence, risk and
            audit, without the jargon.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[880px]">
          {GLOSSARY.map((group) => (
            <div key={group.label} data-reveal className="mb-10">
              <h2 className="mb-4 border-b border-line-soft pb-2.5 font-display text-[15px] font-semibold uppercase tracking-[.08em] text-brand-deep">
                {group.label}
              </h2>
              <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {group.terms.map((t) => (
                  <div key={t.term}>
                    <dt className="font-display text-[14.5px] font-semibold text-ink">
                      {t.term}
                    </dt>
                    <dd className="mt-1 text-[13px] leading-[1.6] text-ink-soft">
                      {t.def}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div data-reveal className="mt-4 rounded-[18px] bg-[#0b1220] px-7 py-7 text-center">
            <p className="text-[14px] leading-[1.6] text-slate-200/85">
              Want to see these turned into a running programme on your own
              frameworks?
            </p>
            <Link
              href="/request-demo"
              className="mt-4 inline-block rounded-full bg-brand px-7 py-3 font-display text-[13.5px] font-semibold text-on-brand transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
