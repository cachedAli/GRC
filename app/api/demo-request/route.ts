import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Demo requests.
 *
 * Validation runs here rather than only in the browser, the client form is a
 * convenience, not a trust boundary, and this endpoint is reachable directly.
 *
 * Delivery is deliberately a single function so there is one place to wire a
 * destination. Until `DEMO_WEBHOOK_URL` is set the request is logged and the
 * caller still gets a success response, so the form never fails in front of a
 * lead while the CRM is being decided.
 */

type Payload = {
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  company?: unknown;
  teamSize?: unknown;
  frameworks?: unknown;
  notes?: unknown;
};

type Clean = {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  teamSize: string;
  frameworks: string[];
  notes: string;
};

/** Deliberately permissive, the goal is to catch typos, not police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Free-mail domains: allowed, but flagged so sales can triage. */
const FREE_MAIL = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "icloud.com", "aol.com", "proton.me", "protonmail.com",
]);

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

function validate(body: Payload): { ok: true; data: Clean } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const email = str(body.email, 200).toLowerCase();
  const firstName = str(body.firstName, 80);
  const lastName = str(body.lastName, 80);
  const company = str(body.company, 120);
  const teamSize = str(body.teamSize, 40);
  const notes = str(body.notes, 1000);

  if (!email) errors.email = "Work email is required.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like a valid email.";

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!company) errors.company = "Company name is required.";

  const frameworks = Array.isArray(body.frameworks)
    ? body.frameworks.filter((f): f is string => typeof f === "string").slice(0, 20).map((f) => f.slice(0, 60))
    : [];

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { email, firstName, lastName, company, teamSize, frameworks, notes } };
}

/** The single place to point this at a CRM, inbox or queue. */
async function deliver(data: Clean & { freeMail: boolean }) {
  const url = process.env.DEMO_WEBHOOK_URL;
  if (!url) {
    console.info("[demo-request] no DEMO_WEBHOOK_URL set; logging only:", {
      ...data,
      email: data.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
    });
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const domain = result.data.email.split("@")[1] ?? "";

  try {
    await deliver({ ...result.data, freeMail: FREE_MAIL.has(domain) });
  } catch (err) {
    // A delivery failure must not lose the lead: log loudly, still confirm.
    console.error("[demo-request] delivery failed:", err);
  }

  return NextResponse.json({ ok: true });
}
