import { ICON } from "@/data/home";
import { NAV_ICON } from "@/data/nav";

/**
 * Module stories for the platform explorer.
 *
 * Each entry answers three questions visually rather than in prose: what the
 * end-to-end flow is, what the record links into once it exists, and what we
 * do here that point tools do not. Stage names, lifecycle steps and scoring
 * signals are taken from the running platform (GRC-Tenant), not invented.
 */

export type Stage = { label: string; sub: string };

export type ModuleStory = {
  key: string;
  name: string;
  /** Optional explore-link override; defaults to /platform/[key]. */
  href?: string;
  /** One line, use-case framed: what this does for the person using it. */
  promise: string;
  icon: string;
  /** The end-to-end pipeline, rendered as an animated flow. */
  flow: Stage[];
  /** What a record here links into, the 360° payoff. */
  links: string[];
  /** The differentiator, stated plainly. */
  edge: string;
  /** Selects the bespoke proof panel drawn under the flow. */
  proof:
    | "documents"
    | "committees"
    | "assessments"
    | "controls"
    | "evidence"
    | "risk"
    | "vulnerabilities"
    | "assets"
    | "vendors"
    | "audit"
    | "workflow"
    | "connectors"
    | "insights";
};

export const MODULE_STORIES: ModuleStory[] = [
  {
    key: "governance",
    name: "Governance & Documents",
    promise: "One document library for the whole organisation, every policy traced to the clause that demands it.",
    icon: ICON.doc,
    flow: [
      { label: "Draft", sub: "AI or template" },
      { label: "Review", sub: "Owners comment" },
      { label: "Approval", sub: "Tiered sign-off" },
      { label: "Published", sub: "Version pinned" },
      { label: "Attested", sub: "Staff acknowledge" },
    ],
    links: ["Frameworks", "Clauses", "Controls", "Risk register", "Exceptions", "Attestations"],
    edge: "Run a gap analysis against any framework, accept what you can't fix as a risk, and the exception is documented against the policy itself.",
    proof: "documents",
  },
  {
    key: "committees",
    name: "Committees & Meetings",
    promise: "Stand up a governance committee, charter it, and never lose an action item again.",
    icon: ICON.users,
    flow: [
      { label: "Create", sub: "Committee set up" },
      { label: "Charter", sub: "AI-drafted, approved" },
      { label: "Members", sub: "Roles assigned" },
      { label: "Meetings", sub: "Scheduled, minuted" },
      { label: "Actions", sub: "Owned and chased" },
    ],
    links: ["Charters", "Approvals", "Meeting minutes", "Action items", "Owners", "Policies"],
    edge: "Charters go through the same approval workflow as policies, and every action item carries an owner and a due date that the workflow engine chases.",
    proof: "committees",
  },
  {
    key: "evidence",
    name: "Evidence Management",
    promise: "Upload an artifact once. The AI reads it, then tells you every framework requirement it already satisfies.",
    icon: ICON.database,
    flow: [
      { label: "Upload", sub: "Any file type" },
      { label: "OCR", sub: "Text extracted" },
      { label: "AI assess", sub: "Clauses matched" },
      { label: "Review", sub: "You confirm" },
      { label: "Linked", sub: "Reused everywhere" },
    ],
    links: ["Frameworks", "Controls", "Policies", "Assets", "Risks", "Assessments", "Incidents"],
    edge: "Cross-framework equivalence: one log-retention artifact answers SWIFT 4.1, NIST AU-6 and PCI 10.2.1 at once. You review the suggestion; the AI never links silently.",
    proof: "evidence",
  },
  {
    key: "vendors",
    name: "Vendor Risk (TPRM)",
    promise: "Every third party through one governed lifecycle, from first intake to offboarding.",
    icon: ICON.users,
    flow: [
      { label: "Intake", sub: "Scoping & tiering" },
      { label: "Diligence", sub: "Questionnaire" },
      { label: "Decision", sub: "Approve / conditions" },
      { label: "Contracting", sub: "Controls bound" },
      { label: "In-life", sub: "Monitored" },
    ],
    links: ["Questionnaires", "Findings", "Contracts", "Artifacts", "Risk register", "Evidence"],
    edge: "Eleven governed stages, not a spreadsheet and a reminder. Approve with conditions and the conditions become tracked obligations.",
    proof: "vendors",
  },
  {
    key: "vulnerabilities",
    name: "Cybersecurity Assurance",
    href: "/platform/assurance",
    promise: "Inventory what you own, score its business criticality, then re-rank every finding by what is genuinely exploitable on that host.",
    icon: NAV_ICON.shieldCheck,
    flow: [
      { label: "Discover", sub: "EASM + sweep" },
      { label: "Inventory", sub: "the one hub" },
      { label: "Criticality", sub: "8 business axes" },
      { label: "Contextualise", sub: "EPSS, KEV, reach" },
      { label: "Remediate", sub: "re-scan verifies" },
    ],
    links: ["Risks", "Controls", "CIS benchmarks", "Evidence", "Owners", "Findings"],
    edge: "Discovery, inventory, criticality and exposure are one pipeline. Seven signals re-score every finding against the host it sits on, and the asset's own criticality decides what rises.",
    proof: "vulnerabilities",
  },
  {
    key: "workflow",
    name: "Workflow Automation",
    promise: "Describe how your organisation actually works, the engine routes, escalates and chases for you.",
    icon: ICON.flow,
    flow: [
      { label: "Trigger", sub: "Any record event" },
      { label: "Condition", sub: "Your rules" },
      { label: "Route", sub: "Owner or committee" },
      { label: "Escalate", sub: "On breach" },
      { label: "Close", sub: "Audit trail kept" },
    ],
    links: ["Every module", "Approvals", "Notifications", "Escalations", "Integrations"],
    edge: "Not a fixed approval chain. Build the flow your regulator expects, per record type, per business unit, including ones nobody anticipated.",
    proof: "workflow",
  },
  {
    key: "connectors",
    name: "Integrations & Identity",
    promise: "Pull the truth from the systems you already run, and let people in with the identity they already have.",
    icon: NAV_ICON.plug,
    flow: [
      { label: "Connect", sub: "Scanner or cloud" },
      { label: "Sync", sub: "Scheduled pull" },
      { label: "Normalise", sub: "One schema" },
      { label: "Auto-link", sub: "Asset matched" },
      { label: "Evidence", sub: "Collected for you" },
    ],
    links: ["Assets", "Vulnerabilities", "Evidence", "Identity providers", "Audit logs"],
    edge: "Findings arrive already attached to the right asset, no reconciliation spreadsheet between the scanner and the register.",
    proof: "connectors",
  },
  {
    key: "assessments",
    name: "Compliance Assessments",
    promise: "Work a framework statement by statement, with the evidence already suggested for each one.",
    icon: ICON.shield,
    flow: [
      { label: "Import", sub: "Checklist loaded" },
      { label: "Assign", sub: "Statement owners" },
      { label: "Respond", sub: "AI suggests evidence" },
      { label: "Approve", sub: "Tiered review" },
      { label: "Export", sub: "Auditor package" },
    ],
    links: ["Frameworks", "Controls", "Evidence", "Findings", "Owners", "Audit packages"],
    edge: "Status is tracked at statement level, so 'partially compliant' points at the exact clause still missing evidence.",
    proof: "assessments",
  },
  {
    key: "controls",
    name: "Unified Control Library",
    promise: "Implement a control once and inherit it everywhere it is required.",
    icon: ICON.library,
    flow: [
      { label: "Harmonise", sub: "Across frameworks" },
      { label: "Group", sub: "One control family" },
      { label: "Inherit", sub: "Child frameworks" },
      { label: "Map", sub: "AI similarity" },
      { label: "Cover", sub: "Live matrix" },
    ],
    links: ["Frameworks", "Evidence", "Assessments", "Risks", "Policies", "Assets"],
    edge: "Control similarity is computed across frameworks in batch, so a new standard maps onto what you already run instead of starting at zero.",
    proof: "controls",
  },
  {
    key: "risk",
    name: "Enterprise Risk (ERM)",
    promise: "Gaps become owned risks automatically, no re-keying between the finding and the register.",
    icon: ICON.trend,
    flow: [
      { label: "Identify", sub: "Gap or incident" },
      { label: "Score", sub: "Inherent vs residual" },
      { label: "Treat", sub: "Owner and plan" },
      { label: "Monitor", sub: "KRI thresholds" },
      { label: "Report", sub: "Board view" },
    ],
    links: ["Controls", "Assets", "Vendors", "Incidents", "RCSA", "Appetite", "KRIs"],
    edge: "Appetite is enforced, not decorative, breach a threshold and the workflow engine escalates it to the committee that owns it.",
    proof: "risk",
  },
  {
    key: "audit",
    name: "Audit Management",
    promise: "Audit prep becomes a query, not a quarter of chasing people for files.",
    icon: ICON.audit,
    flow: [
      { label: "Universe", sub: "Auditable entities" },
      { label: "Plan", sub: "Annual schedule" },
      { label: "Engage", sub: "Workpapers" },
      { label: "Finding", sub: "Tracked to close" },
      { label: "Package", sub: "Auto-assembled" },
    ],
    links: ["Controls", "Evidence", "Findings", "Risks", "CCM", "QAIP", "Committees"],
    edge: "Packages assemble from links that already exist, because the evidence was attached to the control the day it was uploaded.",
    proof: "audit",
  },
  {
    key: "insights",
    name: "Dashboards & ComplyChat",
    promise: "Ask your own GRC data a question in English and get an answer grounded in your records.",
    icon: NAV_ICON.ask,
    flow: [
      { label: "Ask", sub: "Plain English" },
      { label: "Ground", sub: "SQL over your data" },
      { label: "Scope", sub: "Tenant-isolated" },
      { label: "Answer", sub: "With citations" },
      { label: "Act", sub: "Jump to the record" },
    ],
    links: ["Every module", "Exec KPIs", "Trends", "Recommendations", "Session history"],
    edge: "Answers are generated against your live tables, so the number in the chat is the number in the register, not a summary of a summary.",
    proof: "insights",
  },
];

/** Evidence coverage suggestions, the cross-framework payoff, verbatim shape. */
export const EVIDENCE_MATCHES = [
  { framework: "SWIFT CSCF", control: "4.1", title: "Logging and Monitoring", coverage: "partial" },
  { framework: "NIST SP 800-53 Rev 5", control: "AU-6", title: "Audit Record Review & Reporting", coverage: "partial" },
  { framework: "PCI DSS v4.0.1", control: "10.2.1", title: "Enable Audit Logs for All Components", coverage: "partial" },
];

/** The seven signals that re-score a finding against its host. */
export const VULN_SIGNALS = [
  { label: "CVSS severity", value: "8.8 / 10", score: 18, max: 20 },
  { label: "Exploit probability", value: "EPSS 88.3%", score: 18, max: 20 },
  { label: "Exploit maturity", value: "Weaponized", score: 15, max: 15 },
  { label: "Known exploited", value: "Not in KEV", score: 0, max: 15 },
  { label: "Attack vector", value: "Network", score: 10, max: 10 },
  { label: "Internet exposure", value: "Internet-facing", score: 10, max: 10 },
  { label: "Asset criticality", value: "Critical · 8.5/10", score: 9, max: 10 },
];

/** The eight business axes behind an asset criticality score. */
export const ASSET_AXES = [
  { label: "Operational dependency", pct: 90 },
  { label: "Financial impact", pct: 75 },
  { label: "Customer impact", pct: 85 },
  { label: "Data sensitivity", pct: 95 },
  { label: "Unauthorised access risk", pct: 70 },
  { label: "RTO / RPO", pct: 80 },
  { label: "Internet facing", pct: 100 },
  { label: "B2B exposure", pct: 60 },
];

/** CIS hardening targets the platform benchmarks against. */
export const CIS_TARGETS = [
  { name: "Windows Server", pass: 142, fail: 18 },
  { name: "Linux Server", pass: 96, fail: 11 },
  { name: "AWS Account", pass: 58, fail: 6 },
  { name: "Kubernetes", pass: 44, fail: 9 },
];

/** The eleven governed TPRA stages, as they run in the platform. */
export const TPRA_STAGES = [
  "Intake & Scoping",
  "Inherent Risk Tiering",
  "Due Diligence Planning",
  "Questionnaire & Evidence",
  "Risk Analysis & Scoring",
  "Findings & Remediation",
  "Contracting & Controls",
  "Approval Decision",
  "Onboarding & Enablement",
  "Continuous Monitoring",
  "Reassessment & Offboarding",
];

/** Connector logos that ship in the platform's asset folder. */
export const CONNECTOR_LOGOS = [
  "aws", "azure", "gcp", "kubernetes", "okta", "auth0", "google_workspace",
  "github", "gitlab", "jira", "slack", "teams", "datadog", "sentry",
  "cloudflare", "snowflake", "terraform", "pagerduty",
];

/** Scanners the platform pulls findings from. */
export const SCANNERS = ["Tenable Nessus", "Rapid7", "Wiz", "Microsoft Defender", "CSV / Excel"];


/**
 * The capability catalogue, everything the platform does, at a glance.
 *
 * Twelve cells rather than fourteen modules: a couple of the smaller modules
 * are folded into the capability a buyer would actually search for, and each
 * cell gets the action link that matches its own verb.
 */
export type Capability = {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: string;
};

export const CAPABILITIES: Capability[] = [
  {
    title: "Policy & Document Management",
    body: "One library for every policy, standard and procedure, drafted by AI, versioned in place, and attested by the people it applies to.",
    cta: "Manage policies",
    href: "/platform/governance",
    icon: NAV_ICON.doc,
  },
  {
    title: "Committees & Meetings",
    body: "Charter a governance committee, seat its members, schedule the meetings and track every action item to a named owner.",
    cta: "Run committees",
    href: "/platform/committees",
    icon: NAV_ICON.vendors,
  },
  {
    title: "Custom Workflows",
    body: "Design event-driven workflows without code to route approvals, chase owners and escalate across any record in the platform.",
    cta: "Build workflows",
    href: "/platform/workflow",
    icon: NAV_ICON.branch,
  },
  {
    title: "Controls & Evidence",
    body: "Define controls once, keep ownership explicit, and link evidence so an artifact uploaded today answers every framework that needs it.",
    cta: "Automate evidence",
    href: "/platform/evidence",
    icon: NAV_ICON.clip,
  },
  {
    title: "Enterprise Risk Management",
    body: "Document risks, score inherent against residual, run RCSA campaigns and hold the register to a stated appetite.",
    cta: "See the register",
    href: "/platform/risk",
    icon: NAV_ICON.gauge,
  },
  {
    title: "Vendor Risk Management",
    body: "Bring third-party risk into one governed lifecycle, eleven stages from intake and tiering through to reassessment and offboarding.",
    cta: "Report on vendor risk",
    href: "/platform/vendors",
    icon: NAV_ICON.shieldCheck,
  },
  {
    title: "Cybersecurity Assurance",
    body: "Inventory what you own, score its business criticality, then re-rank every finding by what is genuinely exploitable on that host.",
    cta: "Explore assurance",
    href: "/platform/assurance",
    icon: NAV_ICON.shieldCheck,
  },
  {
    title: "Multi-Framework Support",
    body: "25+ frameworks share one control library, so global standards and regional mandates stop being separate programmes.",
    cta: "Map frameworks",
    href: "/platform/controls",
    icon: NAV_ICON.globe,
  },
  {
    title: "Integrations & Identity",
    body: "Pull findings and assets from the scanners and clouds you already run, and let people in with the identity they already have.",
    cta: "Connect your stack",
    href: "/platform/connectors",
    icon: NAV_ICON.plug,
  },
  {
    title: "ComplyChat AI",
    body: "Ask your own GRC data a question in plain English and get an answer grounded in your live records, scoped to your tenant.",
    cta: "Ask ComplyChat",
    href: "/platform/insights",
    icon: NAV_ICON.ask,
  },
  {
    title: "Audit Management",
    body: "Run the universe, plans, engagements and findings in one place, with packages that assemble from links that already exist.",
    cta: "Collaborate with auditors",
    href: "/platform/audit",
    icon: ICON.audit,
  },
];
