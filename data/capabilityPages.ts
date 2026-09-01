import { ICON } from "@/data/home";
import { NAV_ICON } from "@/data/nav";

/**
 * Per-module detail for the dedicated capability pages under /platform/[key].
 *
 * The `key` matches a MODULE_STORIES entry, so each page reuses that module's
 * animated scene (the "drawn screenshot"), flow, linkage and differentiator.
 * Everything here is the extra page-level content: a marketing subtitle, the
 * feature grid, two proof stats, and a problem/shift contrast that says out
 * loud what the module fixes. Feature detail is taken from the real platform
 * submodules, not invented.
 */

export type Feature = { icon: string; title: string; body: string };
export type ProofStat = { value: string; label: string };

/** The "today it's broken / with Compliverse" contrast shown per page. */
export type ProblemShift = {
  pain: string;
  painPoints: string[];
  gain: string;
  gainPoints: string[];
};

export type CapabilityPage = {
  eyebrow: string;
  subtitle: string;
  features: Feature[];
  stats: ProofStat[];
  problem: ProblemShift;
  /** Optional second scene key, shown as a supporting mockup lower down. */
  secondScene?: string;
};

export const CAPABILITY_PAGES: Record<string, CapabilityPage> = {
  governance: {
    eyebrow: "Governance & Documents",
    subtitle:
      "One library for every policy, standard and procedure, each traced to the clause that demands it.",
    features: [
      { icon: ICON.doc, title: "Full document lifecycle", body: "Draft, review, approve and publish, with version history pinned at every step." },
      { icon: NAV_ICON.branch, title: "Attestation campaigns", body: "Push a policy to the people it applies to and track every acknowledgement." },
      { icon: ICON.users, title: "Committees & regulatory change", body: "Run governance committees and log the regulatory changes that trigger a review." },
      { icon: NAV_ICON.shieldCheck, title: "Exceptions on record", body: "Accept what you can't fix as a documented exception, mapped back to the policy." },
    ],
    stats: [
      { value: "SOC 2 · ISO · PCI", label: "built-in templates" },
      { value: "In-place", label: "versioning & history" },
    ],
    problem: {
      pain: "Policies scattered across drives",
      painPoints: [
        "Which version is current? Nobody's sure",
        "No line from a policy to the clause that demands it",
        "Attestations chased in a spreadsheet",
      ],
      gain: "One governed library, every version pinned",
      gainPoints: [
        "Draft, review, approve, publish, with full history",
        "Each policy traced to the control it satisfies",
        "Attestation campaigns track every acknowledgement",
      ],
    },
    secondScene: "committees",
  },
  committees: {
    eyebrow: "Committees & Meetings",
    subtitle:
      "Stand up a governance committee, charter it, seat its members and never lose an action item.",
    features: [
      { icon: ICON.users, title: "Members & roles", body: "Seat the committee, assign roles, and keep the roster current as people change." },
      { icon: ICON.doc, title: "AI-drafted charters", body: "Draft a charter, run it through the same approval workflow as any policy." },
      { icon: ICON.refresh, title: "Scheduled meetings", body: "Schedule sessions, capture minutes, and carry decisions into the record." },
      { icon: NAV_ICON.branch, title: "Tracked actions", body: "Every action item carries an owner and a due date the engine chases for you." },
    ],
    stats: [
      { value: "Owner + due date", label: "on every action" },
      { value: "One workflow", label: "charters to approvals" },
    ],
    problem: {
      pain: "Committee work lives in inboxes",
      painPoints: [
        "Minutes in one place, actions in another",
        "Action items lose their owner by the next meeting",
        "Charters drift from the approval record",
      ],
      gain: "The committee runs on the record",
      gainPoints: [
        "Members, charter and minutes in one place",
        "Every action carries an owner and a due date",
        "Charters run the same approval as any policy",
      ],
    },
  },
  evidence: {
    eyebrow: "Evidence Management",
    subtitle:
      "Upload an artifact once. The AI reads it, then tells you every framework requirement it already satisfies.",
    features: [
      { icon: ICON.database, title: "OCR intake", body: "Any file type comes in, gets read, and carries owner, validity and quality state." },
      { icon: ICON.spark, title: "Cross-framework reuse", body: "One log-retention artifact answers SWIFT 4.1, NIST AU-6 and PCI 10.2.1 at once." },
      { icon: NAV_ICON.clip, title: "AI clause mapping", body: "The AI proposes the controls a piece of evidence proves. You confirm, it never links silently." },
      { icon: ICON.audit, title: "Audit packages", body: "Packages assemble from links that already exist the day evidence was uploaded." },
    ],
    stats: [
      { value: "1 artifact", label: "many frameworks" },
      { value: "Human-approved", label: "every link" },
    ],
    problem: {
      pain: "The same proof, collected again and again",
      painPoints: [
        "One artifact re-uploaded per framework",
        "No idea what a file already satisfies",
        "Audit packages hand-built from scratch each time",
      ],
      gain: "Upload once, satisfy everywhere",
      gainPoints: [
        "OCR reads the file and tags it on intake",
        "One artifact answers many frameworks at once",
        "Packages assemble from links already made",
      ],
    },
    secondScene: "controls",
  },
  vendors: {
    eyebrow: "Vendor Risk (TPRM)",
    subtitle:
      "Every third party through one governed lifecycle, from first intake to reassessment and offboarding.",
    features: [
      { icon: ICON.users, title: "Eleven governed stages", body: "Intake, tiering, diligence, decision, contracting, monitoring, offboarding, all in one place." },
      { icon: ICON.doc, title: "AI questionnaires", body: "Draft questionnaire answers from vendor documents and flag deltas for human review." },
      { icon: ICON.shieldAlert, title: "Findings & remediation", body: "Track findings to closure and bind remediation to the contract that requires it." },
      { icon: ICON.refresh, title: "Continuous monitoring", body: "Signals keep watching between reviews, so a vendor's risk never goes stale." },
    ],
    stats: [
      { value: "11 stages", label: "one lifecycle" },
      { value: "Conditions", label: "tracked as obligations" },
    ],
    problem: {
      pain: "Vendor risk ends at onboarding",
      painPoints: [
        "Questionnaires sit in email threads",
        "Risk is assessed once, then goes stale",
        "Contract obligations forgotten by renewal",
      ],
      gain: "One governed lifecycle, continuously watched",
      gainPoints: [
        "Eleven stages from intake to offboarding",
        "Monitoring signals keep scoring between reviews",
        "Findings bind to the contract that requires the fix",
      ],
    },
    secondScene: "workflow",
  },
  assets: {
    eyebrow: "Asset Management",
    subtitle:
      "Know what you own, how much it matters, and whether it is hardened, before an auditor asks.",
    features: [
      { icon: ICON.server, title: "Inventory any way", body: "Bring assets from CSV, Excel or a live connector, then keep them current." },
      { icon: NAV_ICON.gauge, title: "Criticality on 8 axes", body: "Business impact scored across eight dimensions, not a dropdown someone guessed." },
      { icon: NAV_ICON.shieldCheck, title: "CIS hardening", body: "Benchmark each platform against CIS controls with a live pass/fail posture." },
      { icon: ICON.spark, title: "CIA & CDE tagging", body: "Confidentiality, integrity, availability and cardholder-data scope on every asset." },
    ],
    stats: [
      { value: "8 axes", label: "criticality score" },
      { value: "CIS", label: "benchmark posture" },
    ],
    problem: {
      pain: "You can't protect what you can't see",
      painPoints: [
        "The inventory is a stale spreadsheet",
        "Criticality is a guess in a dropdown",
        "Hardening state is unknown until an audit",
      ],
      gain: "Know what you own and what it's worth",
      gainPoints: [
        "Inventory from CSV, Excel or a live connector",
        "Criticality scored on eight business axes",
        "CIS benchmark posture, live per platform",
      ],
    },
    secondScene: "vulnerabilities",
  },
  vulnerabilities: {
    eyebrow: "Vulnerability Management",
    subtitle:
      "Stop patching by CVSS. Prioritise by what is actually exploitable, on the hosts that actually matter.",
    features: [
      { icon: NAV_ICON.plug, title: "Scanner ingestion", body: "Pull findings from Nessus, Rapid7, Wiz and Defender, or import a CSV." },
      { icon: ICON.trend, title: "Real exploit signals", body: "EPSS probability, CISA KEV, CWE and exploit maturity enrich every finding." },
      { icon: NAV_ICON.gauge, title: "Host-contextual score", body: "Seven signals re-score against asset criticality, so a CVSS 8.8 can fall and a quiet CVE can rise." },
      { icon: NAV_ICON.branch, title: "SLA & remediation", body: "SLA clocks, exceptions and AI-written fix guidance land straight in the ticket." },
    ],
    stats: [
      { value: "7 signals", label: "beyond CVSS" },
      { value: "EPSS · KEV", label: "live enrichment" },
    ],
    problem: {
      pain: "Patch by CVSS, drown in noise",
      painPoints: [
        "A high CVSS on a dev box outranks a real threat",
        "Exploitability isn't in the score",
        "SLAs tracked in a side spreadsheet",
      ],
      gain: "Prioritise by what's actually exploitable",
      gainPoints: [
        "EPSS, KEV and exploit maturity enrich each finding",
        "Seven signals re-score against asset criticality",
        "SLA clocks and AI fix guidance land in the ticket",
      ],
    },
  },
  workflow: {
    eyebrow: "Workflow Automation",
    subtitle:
      "Describe how your organisation actually works. The engine routes, escalates and chases for you.",
    features: [
      { icon: NAV_ICON.branch, title: "Event-driven", body: "Any record event can trigger a flow, across every module on the platform." },
      { icon: ICON.flow, title: "Your rules, no code", body: "Build the conditions and routing your regulator expects, per record and business unit." },
      { icon: ICON.alert, title: "Escalation on breach", body: "Miss an SLA and the engine escalates to the owner or committee that holds it." },
      { icon: ICON.audit, title: "Full audit trail", body: "Every execution is logged end to end, so the trail is a query, not a reconstruction." },
    ],
    stats: [
      { value: "Any record", label: "any business unit" },
      { value: "No-code", label: "workflow builder" },
    ],
    problem: {
      pain: "Process lives in people's heads",
      painPoints: [
        "Routing depends on who remembers the rule",
        "SLA breaches surface too late to matter",
        "The audit trail is reconstructed after the fact",
      ],
      gain: "The engine routes, chases and escalates",
      gainPoints: [
        "Any record event can trigger a flow",
        "Miss an SLA and it escalates to the owner",
        "Every execution is logged end to end",
      ],
    },
  },
  connectors: {
    eyebrow: "Integrations & Identity",
    subtitle:
      "Pull the truth from the systems you already run, and let people in with the identity they already have.",
    features: [
      { icon: NAV_ICON.plug, title: "40 connectors", body: "Cloud, code, endpoint, ticketing, HR and monitoring sources across eight categories." },
      { icon: ICON.users, title: "Identity providers", body: "Okta, Entra, JumpCloud and more, so sign-in uses the identity you already trust." },
      { icon: ICON.spark, title: "Auto-linked evidence", body: "Findings arrive already attached to the right asset, no reconciliation spreadsheet." },
      { icon: ICON.database, title: "One schema", body: "Every source normalises into the same data model the rest of the platform reads." },
    ],
    stats: [
      { value: "40", label: "supported connectors" },
      { value: "8", label: "source categories" },
    ],
    problem: {
      pain: "GRC data copied by hand",
      painPoints: [
        "Findings pasted from a scanner export",
        "Reconciliation spreadsheets to match assets",
        "Another login for every tool",
      ],
      gain: "Pull the truth from systems you run",
      gainPoints: [
        "40 connectors across eight categories",
        "Findings arrive already linked to the asset",
        "Sign in with the identity you already trust",
      ],
    },
  },
  assessments: {
    eyebrow: "Compliance Assessments",
    subtitle:
      "Work a framework statement by statement, with the evidence already suggested for each one.",
    features: [
      { icon: ICON.shield, title: "Statement-level status", body: "Track every clause, so 'partially compliant' points at the exact gap." },
      { icon: ICON.spark, title: "AI evidence recs", body: "Each item comes with the evidence the AI thinks answers it, ready to confirm." },
      { icon: ICON.users, title: "Tiered approval", body: "Route responses through the review chain your governance model requires." },
      { icon: ICON.audit, title: "Auditor exports", body: "Package the whole assessment for an auditor from links that already exist." },
    ],
    stats: [
      { value: "Statement-level", label: "granularity" },
      { value: "AI-suggested", label: "evidence per item" },
    ],
    problem: {
      pain: "Compliance lives in spreadsheets",
      painPoints: [
        "A row per control, copied between frameworks",
        "Nobody knows which evidence answers which clause",
        "'Partially compliant' hides where the real gap is",
      ],
      gain: "One assessment, statement by statement",
      gainPoints: [
        "Every clause tracked to a live status",
        "The AI suggests the evidence for each item",
        "The auditor export builds from links that already exist",
      ],
    },
    secondScene: "evidence",
  },
  controls: {
    eyebrow: "Unified Control Library",
    subtitle:
      "Implement a control once and inherit it everywhere it is required.",
    features: [
      { icon: ICON.library, title: "Harmonised groups", body: "Controls collapse into families shared across every framework that needs them." },
      { icon: NAV_ICON.branch, title: "Inheritance", body: "Implement once, inherit everywhere, with the coverage matrix kept live." },
      { icon: ICON.spark, title: "AI similarity mapping", body: "The AI computes control similarity across frameworks and proposes mappings in batch." },
      { icon: NAV_ICON.matrix, title: "Coverage matrix", body: "See at a glance which frameworks a control satisfies and where the gaps are." },
    ],
    stats: [
      { value: "Once", label: "implement, inherit everywhere" },
      { value: "Live", label: "coverage matrix" },
    ],
    problem: {
      pain: "The same control, implemented five times",
      painPoints: [
        "One control duplicated per framework",
        "No view of where a gap actually is",
        "Frameworks mapped by hand in a matrix",
      ],
      gain: "Implement once, inherit everywhere",
      gainPoints: [
        "Controls collapse into harmonised families",
        "The coverage matrix stays live",
        "The AI proposes cross-framework mappings",
      ],
    },
  },
  risk: {
    eyebrow: "Enterprise Risk (ERM)",
    subtitle:
      "Gaps become owned risks automatically, with no re-keying between the finding and the register.",
    features: [
      { icon: NAV_ICON.gauge, title: "Register & appetite", body: "Score inherent against residual and hold the register to a stated appetite." },
      { icon: ICON.trend, title: "KRIs & analytics", body: "Set KRI thresholds and read the exposure on a live heatmap and bow-tie view." },
      { icon: ICON.refresh, title: "RCSA campaigns", body: "Run control self-assessments across the business and roll the results up." },
      { icon: ICON.alert, title: "Enforced escalation", body: "Breach a threshold and the workflow engine escalates it to the committee that owns it." },
    ],
    stats: [
      { value: "Inherent vs residual", label: "on one model" },
      { value: "Appetite", label: "enforced, not decorative" },
    ],
    problem: {
      pain: "The register drifts from reality",
      painPoints: [
        "A failed control is re-keyed into a risk by hand",
        "Appetite is a slide, not a control",
        "KRIs update on a monthly copy-paste",
      ],
      gain: "Gaps become owned risks on their own",
      gainPoints: [
        "A finding flows into the register with no re-keying",
        "Breach the appetite and the workflow escalates it",
        "KRIs and the heatmap score off the same graph, live",
      ],
    },
    secondScene: "workflow",
  },
  audit: {
    eyebrow: "Audit Management",
    subtitle:
      "Audit prep becomes a query, not a quarter of chasing people for files.",
    features: [
      { icon: ICON.search, title: "Universe to findings", body: "Run the audit universe, annual plans, engagements and workpapers in one place." },
      { icon: ICON.audit, title: "Self-assembling packages", body: "Packages build from links that already exist, because evidence was attached on day one." },
      { icon: NAV_ICON.branch, title: "CCM & QAIP", body: "Continuous control monitoring and quality assurance built into the audit lifecycle." },
      { icon: ICON.users, title: "Auditor collaboration", body: "Give auditors a scoped workspace for requests and evidence, kept on track." },
    ],
    stats: [
      { value: "Minutes", label: "not a quarter" },
      { value: "Internal + statutory", label: "audit types" },
    ],
    problem: {
      pain: "Audit season is a scramble",
      painPoints: [
        "A quarter spent chasing people for files",
        "Evidence is hunted down after the request lands",
        "The trail is reconstructed, not queried",
      ],
      gain: "The package is already assembled",
      gainPoints: [
        "Evidence was linked the day it was uploaded",
        "Universe, plan, engagement and workpapers in one place",
        "When the auditor asks, the trail is a query",
      ],
    },
    secondScene: "evidence",
  },
  insights: {
    eyebrow: "Dashboards & ComplyChat",
    subtitle:
      "Ask a plain question and get an answer grounded in your own records, with the guardrails enterprises expect.",
    features: [
      { icon: NAV_ICON.ask, title: "Ask in plain English", body: "No query language, no exports. Ask the question, get the answer you can act on." },
      { icon: NAV_ICON.shieldCheck, title: "Your data only", body: "Answers come from your live records, isolated to your tenant, nothing invented." },
      { icon: ICON.chart, title: "Executive dashboards", body: "Compliance, risk and AI-prioritised signals rolled up for the people who report to the board." },
      { icon: ICON.spark, title: "Jump to the record", body: "Every answer links straight to the underlying record, so a number is always checkable." },
    ],
    stats: [
      { value: "Plain English", label: "no query language" },
      { value: "Tenant-isolated", label: "answers you can trust" },
    ],
    problem: {
      pain: "The answer is buried in the data",
      painPoints: [
        "Every board question needs an export and a pivot",
        "Numbers can't be traced back to a record",
        "Generic AI invents what it doesn't know",
      ],
      gain: "Ask in plain English, grounded in your data",
      gainPoints: [
        "No query language, no exports, just the answer",
        "Every number links back to its record",
        "Answers stay inside your tenant, nothing invented",
      ],
    },
    secondScene: "risk",
  },
};
