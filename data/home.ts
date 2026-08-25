/**
 * Home page content.
 *
 * The module list, framework coverage and AI blurbs are taken from the
 * platform itself (GRC-Tenant) rather than invented for marketing, the
 * fourteen entries below are the fourteen route groups that actually ship.
 */

const LOGO = "/frameworks";

/**
 * Regulators with no redistributable logo get a generated initials badge, so
 * the marquee stays visually even instead of showing a broken image.
 */
export function initialsBadge(text: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">` +
    `<rect width="40" height="40" rx="8" fill="#e8fcf8"/>` +
    `<text x="20" y="25" text-anchor="middle" font-family="Inter,Arial" ` +
    `font-size="13" font-weight="700" fill="#0c8f76">${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export type Framework = { name: string; blurb: string; src: string; slug: string };

export const FRAMEWORKS: Framework[] = [
  { name: "ISO 27001", blurb: "Information security", src: `${LOGO}/iso.org.png`, slug: "iso-27001" },
  { name: "SOC 2", blurb: "Trust services", src: `${LOGO}/aicpa.org.png`, slug: "soc-2" },
  { name: "SAMA CSF", blurb: "Saudi banking cyber", src: `${LOGO}/sama.gov.sa.png`, slug: "sama-csf" },
  { name: "NCA ECC", blurb: "Saudi essential controls", src: initialsBadge("NCA"), slug: "nca-ecc" },
  { name: "PCI DSS", blurb: "Payment security", src: `${LOGO}/pcisecuritystandards.org.png`, slug: "pci-dss" },
  { name: "NIST CSF", blurb: "Cyber framework", src: `${LOGO}/nist.gov.png`, slug: "nist-csf" },
  { name: "GDPR", blurb: "Data protection", src: `${LOGO}/gdpr.eu.png`, slug: "gdpr" },
  { name: "CBUAE Art.13", blurb: "UAE tech risk", src: initialsBadge("CB"), slug: "cbuae" },
  { name: "SBP ETGRMF", blurb: "Pakistan banking tech", src: `${LOGO}/sbp.org.pk.png`, slug: "sbp-etgrmf" },
  { name: "MAS TRM", blurb: "Singapore tech risk", src: initialsBadge("MAS"), slug: "mas-trm" },
  { name: "ISO 22301", blurb: "Business continuity", src: `${LOGO}/iso.org.png`, slug: "iso-22301" },
  { name: "DORA", blurb: "EU op-resilience", src: `${LOGO}/esma.europa.eu.png`, slug: "dora" },
  { name: "NIS2", blurb: "EU cyber directive", src: `${LOGO}/enisa.europa.eu.png`, slug: "nis2" },
  { name: "HIPAA", blurb: "Health data", src: `${LOGO}/hhs.gov.png`, slug: "hipaa" },
  { name: "COBIT 2019", blurb: "IT governance", src: `${LOGO}/isaca.org.png`, slug: "cobit-2019" },
  { name: "SOX ITGC", blurb: "Financial reporting", src: `${LOGO}/sec.gov.png`, slug: "sox-itgc" },
  { name: "SWIFT CSCF", blurb: "Payments network", src: initialsBadge("SW"), slug: "swift-cscf" },
  { name: "ARAMCO CCC", blurb: "Supplier cyber", src: initialsBadge("ARM"), slug: "aramco-ccc" },
  { name: "CIS Controls", blurb: "Security baselines", src: `${LOGO}/cisecurity.org.png`, slug: "cis-controls" },
  { name: "HITRUST", blurb: "Health trust", src: `${LOGO}/hitrustalliance.net.png`, slug: "hitrust" },
];

/** Shared 24x24 stroke-icon path data. */
export const ICON = {
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4",
  docSimple: "M7 3h7l5 5v13H7zM14 3v5h5",
  shield: "M9 12l2 2 4-4M12 3l8 4v5c0 5.5-3.8 8.5-8 9.5C7.8 20.5 4 17.5 4 12V7z",
  shieldAlert: "M12 3l8 4v5c0 5.5-3.8 8.5-8 9.5C7.8 20.5 4 17.5 4 12V7zM12 8v5M12 16.5v.01",
  shieldPlain: "M12 3l8 4v5c0 5.5-3.8 8.5-8 9.5C7.8 20.5 4 17.5 4 12V7z",
  library: "M4 8h10M18 8h2M4 16h2M10 16h10M16 5.8v4.4M7 13.8v4.4",
  librarySimple: "M4 8h10M18 8h2M4 16h2M10 16h10",
  database: "M4 7a8 3 0 0016 0 8 3 0 00-16 0zM4 7v10a8 3 0 0016 0V7M4 12a8 3 0 0016 0",
  databaseSimple: "M4 7a8 3 0 0016 0 8 3 0 00-16 0zM4 7v10a8 3 0 0016 0V7",
  trend: "M4 17l5-6 4 3 6-8M15 6h5v5",
  trendPlain: "M4 17l5-6 4 3 6-8",
  users: "M8 11a4 4 0 118 0v2a4 4 0 01-8 0zM5 20c1.5-2 4-3 7-3s5.5 1 7 3",
  search: "M11 17.5A6.5 6.5 0 1017.5 11 6.5 6.5 0 0011 17.5zM16 16l5 5",
  audit: "M11 17.5A6.5 6.5 0 1017.5 11 6.5 6.5 0 0011 17.5zM16 16l5 5M8.5 11l1.8 1.8 3.4-3.6",
  // A magnifier centred in the 24x24 box (circle at 11,11), so it sits square
  // in a tile instead of leaning to one corner like the audit glyph above.
  auditCentered: "M11 5a6 6 0 100 12 6 6 0 000-12zM15.5 15.5 20 20",
  flow: "M5 6h4v4H5zM15 14h4v4h-4zM7 10v4a2 2 0 002 2h6M15 6h4v4h-4z",
  spark: "M12 3l2.1 6.9L21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1z",
  server: "M4 5h16v6H4zM4 15h16v4H4zM7 8h.01M7 17h.01",
  star: "M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z",
  upload: "M12 16V4M7 9l5-5 5 5M5 20h14",
  chart: "M4 19h16M7 16V9M12 16V5M17 16v-6",
  bank: "M4 21h16M6 21V10M18 21V10M4 10l8-6 8 6M10 21v-5h4v5",
  refresh: "M20 12a8 8 0 11-2.3-5.6M20 4v4h-4",
  alert: "M12 9v4M12 16.5v.01M10.3 4.2L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.2a2 2 0 00-3.4 0z",
  grid: "M4 5h16M4 5v14h16V5M9 9h6M9 13h6M9 17h3",
} as const;

export type Module = {
  name: string;
  tagline: string;
  ai: string;
  chips: string[];
  icon: string;
  href: string;
  cta: string;
};

/** The fourteen shipping modules, in platform order. */
export const MODULES: Module[] = [
  {
    name: "Governance & Documents",
    tagline:
      "Policy lifecycle, versions, reviews, attestations, committees, regulatory change.",
    ai: "Drafts policies from framework context and extracts statements from what you already have.",
    chips: ["Lifecycle", "Attestations", "Committees"],
    icon: ICON.doc,
    href: "/governance",
    cta: "Explore Document Management",
  },
  {
    name: "Compliance Assessments",
    tagline:
      "Import checklists, track statement-level status, run tiered approval workflows.",
    ai: "Recommends evidence per assessment item and generates the reviewer context.",
    chips: ["AI evidence recs", "Approvals", "Exports"],
    icon: ICON.shield,
    href: "/compliance",
    cta: "See compliance workflows",
  },
  {
    name: "Unified Control Library",
    tagline:
      "Harmonized control groups across frameworks with inheritance and a coverage matrix.",
    ai: "Computes control similarity across frameworks and proposes mappings in batch.",
    chips: ["Coverage matrix", "Inheritance", "Comparison"],
    icon: ICON.library,
    href: "/features",
    cta: "See the control library",
  },
  {
    name: "Evidence Management",
    tagline: "Intake with OCR, lifecycle states, quality tracking, audit packages.",
    ai: "Deep-assesses artifacts against control catalogs, explicit, implicit or inferred match, and finds cross-framework equivalents.",
    chips: ["OCR", "Cross-framework reuse", "Audit packages"],
    icon: ICON.database,
    href: "/features",
    cta: "Explore Evidence",
  },
  {
    name: "Enterprise Risk (ERM)",
    tagline:
      "Register, KRIs, incidents, RCSA campaigns, appetite, dependencies, analytics.",
    ai: "Suggests risks and treatments, sets KRI thresholds, explains bow-ties in executive language.",
    chips: ["RCSA", "KRIs", "Bow-tie analytics"],
    icon: ICON.trend,
    href: "/risk",
    cta: "Explore ERM",
  },
  {
    name: "Vulnerability Management",
    tagline:
      "Scanner ingestion, register, SLA tracking, exceptions, escalations, retests.",
    ai: "Analyzes reports and writes the fix recommendation into the ticket.",
    chips: ["SLA engine", "Exceptions", "AI fixes"],
    icon: ICON.shieldAlert,
    href: "/features",
    cta: "Explore Vulnerability Mgmt",
  },
  {
    name: "Vendor Risk (TPRM)",
    tagline:
      "Vendor tiering, questionnaires, scoring, continuous monitoring, lifecycle.",
    ai: "Drafts questionnaire answers from vendor documents and flags deltas for human review.",
    chips: ["Questionnaires", "Monitoring", "Tiering"],
    icon: ICON.users,
    href: "/features",
    cta: "Explore Vendor Risk",
  },
  {
    name: "Audit Management",
    tagline: "Universe, plans, engagements, workpapers, findings, CCM, QAIP.",
    ai: "Drafts annual plans, test procedures and findings; writes the board-pack narrative.",
    chips: ["Engagements", "Findings", "CCM"],
    icon: ICON.audit,
    href: "/features",
    cta: "Explore Audit Mgmt",
  },
  {
    name: "Workflow Automation",
    tagline:
      "Event-driven definitions, executions, routing, notifications, integrations.",
    ai: "Describe the workflow in English, AI builds, optimizes and routes it.",
    chips: ["NL to workflow", "Events", "Escalations"],
    icon: ICON.flow,
    href: "/features",
    cta: "See automation",
  },
  {
    name: "ComplyChat AI",
    tagline:
      "A GRC assistant over your live data, sessions, history, framework stats.",
    ai: "SQL-grounded answers, tenant-scoped, with conversation memory.",
    chips: ["SQL-grounded", "Tenant-scoped", "Session memory"],
    icon: ICON.spark,
    href: "/features",
    cta: "Meet ComplyChat",
  },
  {
    name: "Asset Management",
    tagline:
      "IT asset inventory, lifecycle, coverage analysis, control and evidence links.",
    ai: "Recommends CIA (confidentiality, integrity, availability) scores per asset.",
    chips: ["Inventory", "CIA scoring", "Coverage"],
    icon: ICON.server,
    href: "/features",
    cta: "Explore Assets",
  },
  {
    name: "Certification Journeys",
    tagline:
      "Guided implementation tracking toward ISO, SOC 2 and regional certifications.",
    ai: "Tracks readiness, reviews evidence and surfaces certification gaps.",
    chips: ["Journeys", "Progress", "Gap views"],
    icon: ICON.star,
    href: "/compliance",
    cta: "See certifications",
  },
  {
    name: "Dashboards & Insights",
    tagline:
      "Executive KPIs, compliance and risk signals, AI-prioritized recommendations.",
    ai: "Prioritizes what needs attention today across every module.",
    chips: ["Exec KPIs", "AI insights", "Trends"],
    icon: ICON.chart,
    href: "/features",
    cta: "See the dashboard",
  },
];

/**
 * Hero typewriter lines, one per capability area.
 *
 * Deliberately short: these render on a single line at 17px, so anything past
 * ~36 characters wraps and the hero reflows. Each is a claim, not a noun.
 */
export type CapabilityLine = { label: string; icon: string; text: string };

export const CAPABILITY_LINES: CapabilityLine[] = [
  { label: "Compliance", icon: ICON.shield, text: "Assess 25+ frameworks at once." },
  { label: "Evidence", icon: ICON.database, text: "Reuse one artifact everywhere." },
  { label: "Enterprise Risk", icon: ICON.trend, text: "Score risk on a live heatmap." },
  { label: "Governance", icon: ICON.doc, text: "Draft policies from the clause." },
  { label: "Vendor Risk", icon: ICON.users, text: "Monitor every vendor, always." },
  { label: "Audit", icon: ICON.auditCentered, text: "Turn audit prep into a query." },
  { label: "Vulnerabilities", icon: ICON.shieldAlert, text: "Close findings before the SLA." },
];

/**
 * The point-tool categories Complyverse displaces. Shown as struck-through
 * icons next to the "tools replaced" figure, so the claim is illustrated by
 * what actually gets switched off rather than by five blank squares.
 */
export const TOOLS_REPLACED = [
  { name: "Policy and document tools", icon: ICON.doc },
  { name: "Risk register spreadsheets", icon: ICON.trend },
  { name: "Vendor management tools", icon: ICON.users },
  { name: "Asset inventory tools", icon: ICON.server },
  { name: "Audit workpaper tools", icon: ICON.audit },
];

/** Hero proof stats, rendered as small graphics rather than plain text. */
export const HERO_STATS = {
  modules: 13,
  frameworks: "25+",
  toolsReplaced: TOOLS_REPLACED.length,
  /** Real marks shown in the overlapping stack next to the framework count. */
  frameworkFaces: [
    `${LOGO}/iso.org.png`,
    `${LOGO}/aicpa.org.png`,
    `${LOGO}/sama.gov.sa.png`,
    `${LOGO}/nist.gov.png`,
    `${LOGO}/pcisecuritystandards.org.png`,
  ],
};

/**
 * The six links in the chain, and why each one exists.
 *
 * The point of the section is that these are not six tools, it is one record
 * passing through six states, so every edge carries the verb that connects
 * them rather than a decorative line.
 */
export const LINKS = [
  {
    from: "Framework",
    verb: "demands",
    to: "Policy",
    why: "Every clause names the policy statement that has to exist, so the moment you pick a framework the required documents are already listed against it.",
  },
  {
    from: "Policy",
    verb: "implements",
    to: "Control",
    why: "A published policy becomes the controls that enforce it, written once, inherited by every framework that shares them.",
  },
  {
    from: "Control",
    verb: "proven by",
    to: "Evidence",
    why: "Each control points at the artifacts that prove it works. One artifact can satisfy several frameworks at once.",
  },
  {
    from: "Evidence",
    verb: "exposes",
    to: "Risk",
    why: "Where evidence is missing or stale, the gap becomes an owned risk with a treatment plan, no re-keying between systems.",
  },
  {
    from: "Risk",
    verb: "tested in",
    to: "Audit",
    why: "Auditors test the controls behind each risk. The workpaper pulls from the same records your team already maintains.",
  },
  {
    from: "Audit",
    verb: "closes back to",
    to: "Framework",
    why: "Findings resolve against the clause that started the chain, so the loop closes instead of ending in a report nobody reads.",
  },
];

/** The six stages of the 360-degree linkage model. */
export const STAGES = [
  {
    title: "Framework",
    icon: ICON.grid,
    desc: "25+ ship built in; upload anything else and the parser extracts domains, controls and mandatory-vs-advisory reading.",
    ai: "Parses regulations into control hierarchies with evidence expectations.",
  },
  {
    title: "Policy",
    icon: ICON.docSimple,
    desc: "Full lifecycle, draft, review, approval, publish, attestations, every statement traceable to its framework clauses.",
    ai: "Drafts policies from framework context; flags uncovered clauses.",
  },
  {
    title: "Control",
    icon: ICON.librarySimple,
    desc: "Controls harmonize into groups: implement once, inherit everywhere, with a live coverage matrix.",
    ai: "Maps control similarity across frameworks in batch.",
  },
  {
    title: "Evidence",
    icon: ICON.databaseSimple,
    desc: "OCR intake, lifecycle and quality states. One artifact satisfies every framework that shares the control.",
    ai: "Assesses artifacts, explicit, implicit or inferred, and finds equivalents.",
  },
  {
    title: "Risk",
    icon: ICON.shieldPlain,
    desc: "Gaps become owned risks; KRIs, incidents, RCSA and appetite reference the same graph. No re-keying.",
    ai: "Suggests treatments, thresholds, and plain-language bow-ties.",
  },
  {
    title: "Audit",
    icon: ICON.search,
    desc: "Universe to findings, the audit trail is a query, not a quarter of evidence-hunting.",
    ai: "Drafts plans, procedures, findings and the board narrative.",
  },
];

/**
 * Audience tiers for the "every stage" section.
 *
 * Each tier carries its own accent so the three cards read as distinct
 * altitudes rather than three copies of the brand green. `accent` drives the
 * left rail, the bullet markers and the cursor-tracked corner glow.
 *
 * `accentSoft` is the same colour as space-separated channels, so it can be
 * dropped into `rgb(var(--accent-soft) / <alpha>)`. Comma separators silently
 * invalidate that syntax, so keep the spaces.
 */
export type Tier = {
  who: string;
  tagline: string;
  href: string;
  cta: string;
  bullets: string[];
  accent: string;
  accentSoft: string;
  art: string[];
  fws: { n: string; src: string }[];
};

export const TIERS: Tier[] = [
  {
    who: "Startup",
    tagline: "Earn trust fast",
    href: "/compliance",
    cta: "Start fast",
    accent: "#f5a524",
    accentSoft: "245 165 36",
    bullets: [
      "AI assembles the policies, controls and evidence requests, you review and approve.",
      "Framework roadmaps that prioritise whatever is blocking the deal in front of you.",
      "Prove security early so enterprise buyers stop stalling procurement.",
    ],
    art: ["M4 20h16", "M6 20V9l6-5 6 5v11", "M10 20v-4h4v4", "M12 3v2", "M9 11h.01M15 11h.01"],
    fws: [
      { n: "SOC 2", src: `${LOGO}/aicpa.org.png` },
      { n: "ISO 27001", src: `${LOGO}/iso.org.png` },
      { n: "GDPR", src: `${LOGO}/gdpr.eu.png` },
    ],
  },
  {
    who: "Mid-market",
    tagline: "Scale trust smoothly",
    href: "/platform",
    cta: "Scale smoothly",
    accent: "#1ed4b0",
    accentSoft: "30 212 176",
    bullets: [
      "Standardise controls and policies as teams, tools and regions multiply.",
      "Reuse evidence across frameworks so every audit stays predictable.",
      "Workflows chase the owners, so your compliance team stops chasing people.",
    ],
    art: [
      "M3 20h18",
      "M5 20V8h5v12",
      "M14 20V4h5v16",
      "M7 11h.01M7 14h.01M16.5 7h.01M16.5 10h.01M16.5 13h.01",
    ],
    fws: [
      { n: "PCI DSS", src: `${LOGO}/pcisecuritystandards.org.png` },
      { n: "NIST CSF", src: `${LOGO}/nist.gov.png` },
      { n: "HIPAA", src: `${LOGO}/hhs.gov.png` },
    ],
  },
  {
    who: "Enterprise",
    tagline: "Command trust at scale",
    href: "/governance",
    cta: "Command at scale",
    accent: "#818cf8",
    accentSoft: "129 140 248",
    bullets: [
      "Unify governance, risk and compliance across business units and regions.",
      "SAMA, NCA, CBUAE and SBP built in as first-class frameworks, not bolted on.",
      "Committees, attestations, internal audit and board reporting on one graph.",
    ],
    art: [
      "M2 20h20",
      "M4 20V6h6v14",
      "M13 20V3h7v17",
      "M6.5 9h.01M6.5 12h.01M6.5 15h.01M16 6h.01M16 9h.01M16 12h.01M16 15h.01",
    ],
    fws: [
      { n: "SAMA CSF", src: `${LOGO}/sama.gov.sa.png` },
      { n: "SBP", src: `${LOGO}/sbp.org.pk.png` },
      { n: "DORA", src: `${LOGO}/esma.europa.eu.png` },
    ],
  },
];

export const ARTICLES = [
  {
    tag: "SAMA CSF",
    title: "SAMA CSF compliance, control by control: a practical map",
    teaser:
      "What the Saudi Central Bank actually checks, the evidence that satisfies each domain, and where banks lose weeks.",
    read: "12 min",
    href: "/resources",
  },
  {
    tag: "EVIDENCE",
    title: "Evidence reuse: satisfy ISO 27001, SOC 2 and SAMA with one artifact",
    teaser:
      "Cross-framework equivalence is the biggest audit-prep time saver. How intent-based matching works.",
    read: "9 min",
    href: "/resources",
  },
  {
    tag: "GAP ANALYSIS",
    title: "Running a policy gap analysis your regulator would sign",
    teaser:
      "A defensible method: parse the framework, extract statements, map coverage, rank gaps by exposure.",
    read: "10 min",
    href: "/resources",
  },
];

/** Solutions mega-menu. */
export const SOLUTIONS = [
  { name: "Document Management", desc: "Policy library, lifecycle, AI drafting", href: "/governance", icon: ICON.doc },
  { name: "Vendor Risk (TPRM)", desc: "Questionnaires, monitoring, lifecycle", href: "/features", icon: ICON.users },
  { name: "Vulnerability Management", desc: "Register, SLA, AI fix guidance", href: "/features", icon: ICON.shieldAlert },
  { name: "Evidence Management", desc: "Intake, OCR, AI assessment, reuse", href: "/features", icon: ICON.database },
  { name: "Business Continuity", desc: "ISO 22301 readiness & resilience", href: "/features", icon: ICON.refresh },
  { name: "Asset Management", desc: "Inventory, CIA scoring, coverage", href: "/features", icon: ICON.server },
  { name: "Gap Analysis", desc: "AI policy & control gap discovery", href: "/compliance", icon: ICON.chart },
  { name: "Risk Management (ERM)", desc: "Register, KRIs, RCSA, analytics", href: "/risk", icon: ICON.trend },
];

/** Hero dashboard mock, "needs attention" rows. */
export const ATTENTION = [
  { dot: "#f43f5e", text: "Access Control Policy review overdue 12d", tag: "Governance", bg: "#fef2f2", fg: "#b91c1c" },
  { dot: "#f59e0b", text: "3 SAMA CSF controls missing evidence", tag: "Compliance", bg: "#fffbeb", fg: "#b45309" },
  { dot: "#f59e0b", text: "Vendor reassessment due: PayGate Ltd", tag: "TPRM", bg: "#fffbeb", fg: "#b45309" },
];

/** Footer trust strip. */
export const TRUST_BADGES = [
  { name: "SOC 2", src: `${LOGO}/aicpa.org.png` },
  { name: "ISO 27001", src: `${LOGO}/iso.org.png` },
  { name: "SAMA CSF", src: `${LOGO}/sama.gov.sa.png` },
  { name: "GDPR", src: `${LOGO}/gdpr.eu.png` },
  { name: "PCI DSS", src: `${LOGO}/pcisecuritystandards.org.png` },
];
