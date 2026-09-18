import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * Demo requests.
 *
 * Validation runs here rather than only in the browser, the client form is a
 * convenience, not a trust boundary, and this endpoint is reachable directly.
 *
 * Delivery is deliberately a single function so email and an optional CRM
 * webhook receive the same validated data. Until SMTP is configured, the
 * request is logged and the caller still gets a success response.
 */

type Payload = {
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  company?: unknown;
  teamSize?: unknown;
  frameworks?: unknown;
  notes?: unknown;
  calendlyEventUri?: unknown;
  calendlyInviteeUri?: unknown;
};

type Clean = {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  teamSize: string;
  frameworks: string[];
  notes: string;
  calendlyEventUri: string;
  calendlyInviteeUri: string;
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
  const calendlyEventUri = str(body.calendlyEventUri, 500);
  const calendlyInviteeUri = str(body.calendlyInviteeUri, 500);

  if (!email) errors.email = "Work email is required.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like a valid email.";

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!company) errors.company = "Company name is required.";

  const validCalendlyUri = (value: string) => {
    try {
      return new URL(value).hostname === "api.calendly.com";
    } catch {
      return false;
    }
  };
  if (!validCalendlyUri(calendlyEventUri) || !validCalendlyUri(calendlyInviteeUri)) {
    errors.schedule = "Complete your Calendly booking before submitting.";
  }

  const frameworks = Array.isArray(body.frameworks)
    ? body.frameworks.filter((f): f is string => typeof f === "string").slice(0, 20).map((f) => f.slice(0, 60))
    : [];

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { email, firstName, lastName, company, teamSize, frameworks, notes, calendlyEventUri, calendlyInviteeUri } };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");

async function sendEmail(data: Clean & { freeMail: boolean }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.DEMO_RECIPIENT_EMAIL;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !to || !from) return;

  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  const fullName = `${data.firstName} ${data.lastName}`;
  const frameworks = data.frameworks.length ? data.frameworks.join(", ") : "None selected";
  const calendlyDashboardUrl = "https://calendly.com/app/scheduled_events/user/me";
  const replyUrl = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Your Compliverse demo request` )}`;
  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(data.email),
    company: escapeHtml(data.company),
    teamSize: escapeHtml(data.teamSize || "Not provided"),
    frameworks: escapeHtml(frameworks),
    notes: escapeHtml(data.notes || "No additional notes provided.").replace(/\n/g, "<br />"),
    calendlyEventUri: escapeHtml(data.calendlyEventUri),
    calendlyDashboardUrl: escapeHtml(calendlyDashboardUrl),
    replyUrl: escapeHtml(replyUrl),
  };
  const text = [
    "New Compliverse demo request",
    "",
    `Name: ${fullName}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Team size: ${data.teamSize || "Not provided"}`,
    `Frameworks: ${frameworks}`,
    "Status: Confirmed in Calendly",
    `Calendly event: ${data.calendlyEventUri}`,
    `Notes: ${data.notes || "None"}`,
  ].join("\n");

  await transport.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `New demo request from ${fullName} at ${data.company}`,
    text,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3f7f6;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New demo request from ${safe.fullName} at ${safe.company}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7f6;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #dce9e6;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px rgba(15,23,42,.10);">
          <tr>
            <td style="padding:30px 32px;background:#0b1220;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:-.3px;">COMPLIVERSE <span style="color:#1ed4b0;font-size:10px;vertical-align:super;letter-spacing:.04em;">AI</span></td>
                  <td align="right"><span style="display:inline-block;padding:7px 11px;border:1px solid rgba(30,212,176,.3);border-radius:999px;background:rgba(30,212,176,.1);color:#3ddfc2;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">New inbound lead</span></td>
                </tr>
              </table>
              <div style="margin-top:28px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">Demo request</div>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:27px;line-height:1.25;letter-spacing:-.6px;">${safe.fullName} wants to see Compliverse</h1>
              <p style="margin:9px 0 0;color:#b8c6d8;font-size:14px;line-height:1.6;">A new request was submitted from <strong style="color:#ffffff;">${safe.company}</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 10px;">
              <div style="margin-bottom:14px;color:#0c8f76;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">Contact details</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                <tr>
                  <td width="42%" style="padding:14px 16px;background:#f8fbfa;border-bottom:1px solid #e9efed;color:#64748b;font-size:12px;font-weight:600;">Name</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e9efed;color:#0f172a;font-size:13px;font-weight:700;">${safe.fullName}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fbfa;border-bottom:1px solid #e9efed;color:#64748b;font-size:12px;font-weight:600;">Email</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e9efed;font-size:13px;"><a href="mailto:${safe.email}" style="color:#0c8f76;font-weight:700;text-decoration:none;">${safe.email}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fbfa;border-bottom:1px solid #e9efed;color:#64748b;font-size:12px;font-weight:600;">Company</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e9efed;color:#0f172a;font-size:13px;font-weight:700;">${safe.company}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fbfa;border-bottom:1px solid #e9efed;color:#64748b;font-size:12px;font-weight:600;">Team size</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #e9efed;color:#334155;font-size:13px;">${safe.teamSize}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f0fdf9;color:#0f5c4c;font-size:12px;font-weight:700;">Booking status</td>
                  <td style="padding:14px 16px;background:#f0fdf9;color:#0f5c4c;font-size:13px;font-weight:700;">Confirmed in Calendly<br /><span style="color:#64748b;font-size:10px;font-weight:500;">Calendly sends the date, time, timezone and calendar invitation separately.</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 8px;">
              <div style="margin-bottom:9px;color:#64748b;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Frameworks to cover</div>
              <div style="padding:14px 16px;border:1px solid #cef8f0;border-radius:12px;background:#f0fdf9;color:#0f5c4c;font-size:13px;font-weight:600;line-height:1.6;">${safe.frameworks}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 8px;">
              <div style="margin-bottom:9px;color:#64748b;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Notes</div>
              <div style="padding:16px;border-left:3px solid #1ed4b0;border-radius:0 12px 12px 0;background:#f8fbfa;color:#334155;font-size:13px;line-height:1.7;">${safe.notes}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="border-radius:10px;background:#1ed4b0;"><a href="${safe.replyUrl}" style="display:inline-block;padding:13px 19px;color:#0a0a0a;font-size:13px;font-weight:800;text-decoration:none;">Reply to ${escapeHtml(data.firstName)} &rarr;</a></td>
                <td width="10"></td>
                <td style="border:1px solid #0c8f76;border-radius:10px;background:#0c8f76;"><a href="${safe.calendlyDashboardUrl}" target="_blank" style="display:inline-block;padding:12px 18px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;">View in Calendly</a></td>
              </tr></table>
              <p style="margin:15px 0 0;color:#94a3b8;font-size:11px;line-height:1.5;">This one-hour slot is reserved in Calendly. Open Scheduled Events to review, reschedule or cancel it. Event reference: ${safe.calendlyEventUri}</p>
            </td>
          </tr>
          <tr><td style="padding:17px 32px;background:#f8fbfa;border-top:1px solid #e9efed;color:#94a3b8;font-size:10px;text-align:center;">Sent securely from the Compliverse demo request form</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  });
}

/** The single place to point this at a CRM, inbox or queue. */
async function deliver(data: Clean & { freeMail: boolean }) {
  await sendEmail(data);

  const url = process.env.DEMO_WEBHOOK_URL;
  if (!url) {
    console.info("[demo-request] no DEMO_WEBHOOK_URL set; email sent or logging only:", {
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
    console.error("[demo-request] delivery failed:", err);
    return NextResponse.json(
      { errors: { form: "We could not send your request just now. Please try again or contact us directly." } },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
