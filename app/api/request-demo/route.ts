import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type DemoPayload = {
  fullName?: string;
  workEmail?: string;
  company?: string;
  role?: string;
  phone?: string;
  message?: string;
};

type RequiredDemoPayload = Required<DemoPayload>;

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function readRequiredEnv(name: string) {
  const value = sanitize(process.env[name]);
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function resolveSmtpConfig(): SmtpConfig {
  const host = readRequiredEnv("SMTP_HOST");
  const user = readRequiredEnv("SMTP_USER");
  const pass = readRequiredEnv("SMTP_PASS");
  const to = readRequiredEnv("DEMO_REQUEST_TO_EMAIL");

  const portRaw = sanitize(process.env.SMTP_PORT);
  const port = Number(portRaw || "587");
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid SMTP_PORT value");
  }

  const secureRaw = sanitize(process.env.SMTP_SECURE).toLowerCase();
  const secure =
    secureRaw === ""
      ? port === 465
      : secureRaw === "true" || secureRaw === "1";

  const from = sanitize(process.env.SMTP_FROM) || user;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
  };
}

async function sendDemoRequestEmail(payload: RequiredDemoPayload) {
  const smtp = resolveSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  const submittedAt = new Date().toISOString();

  const text = [
    "New demo request received",
    "",
    `Submitted At: ${submittedAt}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.workEmail}`,
    `Company: ${payload.company}`,
    `Role: ${payload.role || "-"}`,
    `Phone: ${payload.phone || "-"}`,
    `Notes: ${payload.message || "-"}`,
  ].join("\n");

  const html = `
    <h2>New Demo Request</h2>
    <p><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.workEmail)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
    <p><strong>Role:</strong> ${escapeHtml(payload.role || "-")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "-")}</p>
    <p><strong>Notes:</strong><br/>${escapeHtml(payload.message || "-")}</p>
  `;

  await transporter.sendMail({
    from: smtp.from,
    to: smtp.to,
    replyTo: payload.workEmail,
    subject: `Compliwerse Demo Request - ${payload.fullName}`,
    text,
    html,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DemoPayload;

    const payload: RequiredDemoPayload = {
      fullName: sanitize(body.fullName),
      workEmail: sanitize(body.workEmail),
      company: sanitize(body.company),
      role: sanitize(body.role),
      phone: sanitize(body.phone),
      message: sanitize(body.message),
    };

    if (!payload.fullName || !payload.workEmail || !payload.company) {
      return NextResponse.json(
        { message: "Name, work email, and company are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.workEmail)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    await sendDemoRequestEmail(payload);

    return NextResponse.json(
      { message: "Demo request submitted successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Request demo submission failed:", error);
    return NextResponse.json(
      { message: "Unable to submit demo request right now." },
      { status: 500 },
    );
  }
}
