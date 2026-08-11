import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

type PlannedPage = {
  eyebrow: string;
  title: string;
  summary: string;
  scope: string[];
  status?: "Launch" | "Phase 2";
};

const plannedPages: Record<string, PlannedPage> = {
  platform: {
    eyebrow: "Platform",
    title: "Follow GRC work across connected records.",
    summary:
      "See how frameworks, controls, evidence, risks, policies, vendors and reviews form one operating model.",
    scope: [
      "Framework and control relationships",
      "Ownership and workflow",
      "Evidence and decision history",
      "Reporting and architecture",
    ],
    status: "Launch",
  },
  "how-it-works": {
    eyebrow: "How it works",
    title: "Follow a requirement from programme setup to review.",
    summary:
      "A guided walkthrough of framework selection, control ownership, evidence, risk and reporting.",
    scope: [
      "Select a framework",
      "Organize controls",
      "Assign ownership",
      "Link evidence",
      "Connect risk and findings",
      "Prepare review",
    ],
    status: "Launch",
  },
  "products/controls-evidence": {
    eyebrow: "Controls and evidence",
    title: "Make control work traceable from requirement to evidence.",
    summary:
      "Organize requirements, reusable controls, owners, testing work, evidence versions and audit packages.",
    scope: [
      "Framework hierarchy",
      "Normalized and common controls",
      "Control workbench",
      "Evidence lifecycle",
      "Coverage and audit packages",
    ],
    status: "Launch",
  },
  "products/enterprise-risk": {
    eyebrow: "Enterprise risk and RCSA",
    title: "Keep risk decisions connected to the work behind them.",
    summary:
      "Assess risk, run RCSA campaigns, manage treatment, monitor indicators and retain review history.",
    scope: [
      "Risk register",
      "Risk assessment",
      "RCSA",
      "Risk treatment",
      "KRIs and reporting",
    ],
    status: "Launch",
  },
  "products/governance-policy": {
    eyebrow: "Governance and policy",
    title: "Give governance decisions a reviewable history.",
    summary:
      "Manage document versions, reviewers, approvals, publication, attestations and related compliance context.",
    scope: [
      "Document lifecycle",
      "Review and approval",
      "Attestations",
      "Policy exceptions",
      "Regulatory change",
    ],
    status: "Launch",
  },
  "products/third-party-risk": {
    eyebrow: "Third-party risk",
    title: "Make third-party review a managed lifecycle.",
    summary:
      "Organize vendor intake, tiering, questionnaires, evidence, findings, remediation and approvals.",
    scope: [
      "Vendor register",
      "Questionnaires",
      "Assessment",
      "Findings and remediation",
      "Approval and monitoring",
    ],
    status: "Launch",
  },
  "products/security-operations": {
    eyebrow: "Security operations",
    title: "Connect assets and vulnerabilities with GRC context.",
    summary:
      "Relate asset, vulnerability and operational records to controls, risks, issues and remediation work.",
    scope: [
      "Asset inventory",
      "Vulnerability management",
      "Issues and actions",
      "Control and risk relationships",
    ],
    status: "Phase 2",
  },
  "solutions/compliance-teams": {
    eyebrow: "For compliance teams",
    title: "Give control owners clear work without losing programme visibility.",
    summary:
      "Organize frameworks, controls, evidence, owners, reviews and reporting around a connected programme.",
    scope: [
      "Programme view",
      "Control ownership",
      "Evidence review",
      "Gap and action tracking",
      "Audit preparation",
    ],
    status: "Launch",
  },
  "solutions/risk-teams": {
    eyebrow: "For risk teams",
    title: "Connect assessments with the controls and operations behind them.",
    summary:
      "Maintain risk context, treatment, indicators, approvals and reporting.",
    scope: [
      "Risk register",
      "RCSA",
      "Operational context",
      "Treatment",
      "KRI monitoring",
    ],
    status: "Launch",
  },
  "solutions/internal-audit": {
    eyebrow: "For internal audit",
    title: "Review controls and evidence without reconstructing the record.",
    summary:
      "Access supporting context, manage findings, track remediation and prepare reviewable packages.",
    scope: [
      "Audit scope",
      "Control and evidence review",
      "Findings",
      "Remediation",
      "Audit packages",
    ],
    status: "Launch",
  },
  "solutions/security-teams": {
    eyebrow: "For security teams",
    title: "Connect security operations with risk and compliance work.",
    summary:
      "Relate assets, vulnerabilities and remediation activity to controls, evidence and risk.",
    scope: [
      "Asset context",
      "Vulnerability workflows",
      "Control relationships",
      "Issues and remediation",
    ],
    status: "Phase 2",
  },
  "solutions/multi-framework": {
    eyebrow: "Multi-framework programmes",
    title: "Understand where requirements share the same control work.",
    summary:
      "Normalize related requirements, review mappings and organize reusable controls and evidence.",
    scope: [
      "Framework selection",
      "Control normalization",
      "Common controls",
      "Evidence reuse",
      "Coverage and gaps",
    ],
    status: "Launch",
  },
  "solutions/audit-preparation": {
    eyebrow: "Audit preparation",
    title: "Prepare reviewable evidence from work already being managed.",
    summary:
      "Identify controls, collect evidence, resolve gaps and assemble a reviewable audit package.",
    scope: [
      "Audit scope",
      "Evidence requests",
      "Evidence review",
      "Findings and actions",
      "Audit packages",
    ],
    status: "Launch",
  },
  "solutions/evidence-operations": {
    eyebrow: "Evidence operations",
    title: "Manage evidence from collection through review.",
    summary:
      "Create, version, map, assess, review and package evidence against control requirements.",
    scope: [
      "Collection",
      "Version history",
      "Control mappings",
      "Review",
      "Audit packages",
    ],
    status: "Phase 2",
  },
  "solutions/policy-governance": {
    eyebrow: "Policy governance",
    title: "Manage policy work from draft through acknowledgement.",
    summary:
      "Coordinate versions, reviewers, approvals, publication, attestations and renewal.",
    scope: [
      "Drafting",
      "Versioning",
      "Approval",
      "Publication",
      "Attestation",
    ],
    status: "Phase 2",
  },
  frameworks: {
    eyebrow: "Framework library",
    title: "Find the frameworks relevant to your programme.",
    summary:
      "Browse approved global and regional catalogs by version, region and programme type.",
    scope: [
      "Search and filters",
      "Framework versions",
      "Regional collections",
      "Availability status",
      "Related product workflows",
    ],
    status: "Launch",
  },
  "frameworks/iso-27001": {
    eyebrow: "ISO/IEC 27001:2022",
    title: "Operate your ISO 27001 programme from requirement to evidence.",
    summary:
      "Organize ISO requirements, control ownership, evidence, risk, policy work and review activity.",
    scope: [
      "ISMS context",
      "Control ownership",
      "Policy records",
      "Evidence and risk",
      "Audit preparation",
    ],
    status: "Launch",
  },
  "frameworks/pci-dss": {
    eyebrow: "PCI DSS 4.0.1",
    title: "Connect PCI DSS requirements with control work and evidence.",
    summary:
      "Organize scope, ownership, recurring activities, testing evidence and remediation.",
    scope: [
      "Requirement hierarchy",
      "Ownership",
      "Testing and evidence",
      "Issues and remediation",
      "Assessment preparation",
    ],
    status: "Launch",
  },
  "frameworks/nist-csf": {
    eyebrow: "NIST Cybersecurity Framework",
    title: "Organize cybersecurity outcomes through control and risk work.",
    summary:
      "Connect functions and categories with controls, assets, vulnerabilities, evidence and improvement actions.",
    scope: [
      "Functions and categories",
      "Control context",
      "Asset and vulnerability context",
      "Evidence",
      "Improvement actions",
    ],
    status: "Launch",
  },
  "frameworks/sama-csf": {
    eyebrow: "SAMA Cyber Security Framework",
    title: "Manage SAMA requirements through owned, evidenced work.",
    summary:
      "Organize control ownership, evidence, risk, governance and assessment activity.",
    scope: [
      "Framework hierarchy",
      "Control ownership",
      "Evidence",
      "Risk and governance",
      "Assessment reporting",
    ],
    status: "Launch",
  },
  "frameworks/soc-2": {
    eyebrow: "SOC 2",
    title: "Organize SOC 2 control, evidence and audit-preparation work.",
    summary:
      "Coordinate Trust Services Criteria controls, testing evidence, exceptions and auditor review.",
    scope: [
      "Criteria context",
      "Control ownership",
      "Evidence and testing",
      "Exceptions",
      "Audit preparation",
    ],
    status: "Launch",
  },
  ai: {
    eyebrow: "AI assistance",
    title: "Use AI assistance without removing accountable review.",
    summary:
      "Explore ComplyChat, evidence assessment, extraction, drafting and mapping assistance.",
    scope: [
      "ComplyChat",
      "Evidence assessment and OCR",
      "Control mapping",
      "Policy drafting",
      "Usage governance",
    ],
    status: "Launch",
  },
  security: {
    eyebrow: "Security and architecture",
    title: "Understand how CompliVerse structures tenant access and activity.",
    summary:
      "Review tenant architecture, authentication, roles, permissions, identity configuration and audit logging.",
    scope: [
      "Tenant architecture",
      "Authentication",
      "Roles and permissions",
      "Audit logging",
      "AI and data questions",
    ],
    status: "Launch",
  },
  about: {
    eyebrow: "About CompliVerse",
    title: "GRC work deserves a connected operational record.",
    summary:
      "Learn why CompliVerse is built around visible ownership, supporting evidence and reviewable decisions.",
    scope: [
      "The problem",
      "Product belief",
      "Product principles",
      "Regional and global programmes",
      "Company information",
    ],
    status: "Launch",
  },
  contact: {
    eyebrow: "Contact",
    title: "Discuss the GRC programme you are building.",
    summary:
      "Tell the CompliVerse team about your frameworks, workflows and evaluation requirements.",
    scope: [
      "Programme questions",
      "Framework requirements",
      "Security review",
      "Product availability",
    ],
    status: "Launch",
  },
  demo: {
    eyebrow: "Product demonstration",
    title: "Walk through CompliVerse with your programme in mind.",
    summary:
      "Explore the frameworks, controls, evidence, risks and review processes relevant to your team.",
    scope: [
      "Framework structure",
      "Control ownership",
      "Evidence workflow",
      "Risk and governance",
      "Reporting and AI assistance",
    ],
    status: "Launch",
  },
  "platform/reporting-audit": {
    eyebrow: "Reporting and audit readiness",
    title: "Bring the supporting record together for review.",
    summary:
      "Organize control status, evidence, findings, actions and audit activity into reviewable views.",
    scope: [
      "Evidence packages",
      "Control status",
      "Findings",
      "Saved reports",
      "Review history",
    ],
    status: "Phase 2",
  },
  "platform/workflow-automation": {
    eyebrow: "Workflow automation",
    title: "Configure repeatable review and approval flows.",
    summary:
      "Define triggers, steps, approvals, schedules and notifications around GRC work.",
    scope: [
      "Definitions",
      "Triggers",
      "Approvals",
      "Schedules",
      "Notifications",
    ],
    status: "Phase 2",
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Connect approved systems with CompliVerse workflows.",
    summary:
      "Review integration categories, provider status, authentication and supported data flows.",
    scope: [
      "Identity",
      "Cloud",
      "Vulnerability",
      "Ticketing and communications",
      "Webhooks",
    ],
    status: "Phase 2",
  },
  resources: {
    eyebrow: "Resources",
    title: "Learn how CompliVerse supports GRC operations.",
    summary:
      "Access maintained framework guidance, documentation and product information.",
    scope: [
      "Framework library",
      "Product documentation",
      "Guides",
      "Glossary",
    ],
    status: "Phase 2",
  },
  "resources/documentation": {
    eyebrow: "Product documentation",
    title: "Understand CompliVerse workflows and configuration.",
    summary:
      "A future maintained reference for product setup, administration and everyday work.",
    scope: [
      "Getting started",
      "Administration",
      "Product workflows",
      "Permissions",
      "Troubleshooting",
    ],
    status: "Phase 2",
  },
  "resources/framework-guides": {
    eyebrow: "Framework guides",
    title: "Learn how framework programmes are structured.",
    summary:
      "A future collection of maintained guides tied to approved framework versions.",
    scope: [
      "Framework purpose",
      "Programme structure",
      "Control ownership",
      "Evidence",
      "Review preparation",
    ],
    status: "Phase 2",
  },
  "resources/glossary": {
    eyebrow: "GRC glossary",
    title: "Understand the language used across CompliVerse.",
    summary:
      "Clear definitions for frameworks, controls, evidence, risk, assessment, findings and review.",
    scope: [
      "Compliance terms",
      "Risk terms",
      "Governance terms",
      "Audit terms",
      "Product vocabulary",
    ],
    status: "Phase 2",
  },
};

export default function PlannedMarketingPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const key = params.slug.join("/");
  const page = plannedPages[key];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-[72vh] bg-[#F5F7FA] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_-55px_rgba(18,32,43,0.38)]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="px-7 py-10 sm:px-10 lg:px-14 lg:py-16">
            <div className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#2457D6]">
              {page.eyebrow}
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#12202B] sm:text-5xl">
              {page.title}
            </h1>
            <div className="mt-6 max-w-2xl font-body text-base font-medium leading-7 text-[#607080] sm:text-lg">
              {page.summary}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-[#2457D6] px-6 py-3 font-body text-sm font-bold text-white transition hover:bg-[#1D47B5]"
              >
                Request demo
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-[#EEF3FF] px-6 py-3 font-body text-sm font-bold text-[#2457D6] transition hover:bg-[#E1E9FF]"
              >
                Return home
              </Link>
            </div>
          </div>

          <aside className="bg-[#2457D6] px-7 py-9 text-white sm:px-10 lg:px-9 lg:py-14">
            <div className="flex items-center justify-between gap-4">
              <div className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                Planned scope
              </div>
              <span className="rounded-full bg-white/12 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {page.status}
              </span>
            </div>
            <ul className="mt-7 space-y-4">
              {page.scope.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[28px_1fr] items-start gap-3 font-body text-sm font-semibold leading-6 text-white/90"
                >
                  <span className="font-body text-xs font-bold text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/20 pt-6 font-body text-xs leading-5 text-white/65">
              The full page content and product visuals will be added during its
              dedicated design pass.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

