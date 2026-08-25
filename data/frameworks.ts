import { initialsBadge } from "@/data/home";

/**
 * Per-framework guide content for /frameworks/[slug].
 *
 * The pages are graphical, not textual: each framework is drawn as its own
 * constellation (the mark at the centre, its REAL control domains/functions as
 * spokes) or a sequential pipeline. Uniqueness comes from real structure, a
 * framework's actual domains, counts, journey and accent colour, not a different
 * template per page.
 *
 * Content mirrors the platform's own framework data: domains and counts from the
 * backend framework catalogues (seed_data/frameworks/*.json) and journeys from
 * the platform's frameworkFlows. NCA ECC and CBUAE are not in the platform yet,
 * so those two are written from public knowledge and kept conservative.
 */

const LOGO = "/frameworks";

export type FrameworkNode = { label: string; short?: string };
export type FrameworkPhase = { label: string; sub: string };
export type FrameworkFact = { value: string; label: string };

export type FrameworkGuide = {
  slug: string;
  name: string;
  full: string;
  logo: string;
  category: string;
  region: string;
  accent: string;
  centerLabel: string;
  shape: "constellation" | "pipeline";
  nodesLabel: string;
  nodes: FrameworkNode[];
  overview: string;
  importance: string;
  scope: string;
  facts: FrameworkFact[];
  phases: FrameworkPhase[];
};

export const FRAMEWORK_GUIDES: Record<string, FrameworkGuide> = {
  "iso-27001": {
    slug: "iso-27001",
    name: "ISO 27001",
    full: "ISO/IEC 27001:2022",
    logo: `${LOGO}/iso.org.png`,
    category: "Information security",
    region: "Global",
    accent: "#17b898",
    centerLabel: "ISO 27001",
    shape: "constellation",
    nodesLabel: "Annex A themes",
    nodes: [
      { label: "Organizational", short: "37 controls" },
      { label: "People", short: "8 controls" },
      { label: "Physical", short: "14 controls" },
      { label: "Technological", short: "34 controls" },
    ],
    overview:
      "The international standard for an Information Security Management System. The 2022 revision groups its 93 Annex A controls into four themes.",
    importance:
      "The most widely recognised security certification worldwide, and often the price of entry for enterprise and cross-border deals.",
    scope:
      "Any organisation that wants to prove it manages information security systematically, whatever its size or sector.",
    facts: [
      { value: "93", label: "Annex A controls" },
      { value: "4", label: "control themes" },
      { value: "3 yr", label: "certificate cycle" },
    ],
    phases: [
      { label: "Scope the ISMS", sub: "Boundaries and assets" },
      { label: "Risk assessment", sub: "Identify and treat risk" },
      { label: "Apply Annex A", sub: "Statement of Applicability" },
      { label: "Internal audit", sub: "Test the ISMS" },
      { label: "Stage 1 & 2 audit", sub: "Certification body" },
      { label: "Surveillance", sub: "Annual, recertify at 3 yrs" },
    ],
  },

  "soc-2": {
    slug: "soc-2",
    name: "SOC 2",
    full: "SOC 2 (AICPA Trust Services Criteria)",
    logo: `${LOGO}/aicpa.org.png`,
    category: "Trust services",
    region: "Global (US-origin)",
    accent: "#4f46e5",
    centerLabel: "SOC 2",
    shape: "constellation",
    nodesLabel: "Trust Services Criteria",
    nodes: [
      { label: "Security", short: "required" },
      { label: "Availability" },
      { label: "Processing integrity" },
      { label: "Confidentiality" },
      { label: "Privacy" },
    ],
    overview:
      "An attestation report by a CPA firm on how well a service organisation's controls meet the AICPA Trust Services Criteria.",
    importance:
      "The default assurance SaaS buyers ask for in North America. A Type II report is often required before a deal closes.",
    scope:
      "Service organisations that store or process customer data and need to give customers assurance over their controls.",
    facts: [
      { value: "5", label: "trust criteria" },
      { value: "Type I / II", label: "report kinds" },
      { value: "6-12 mo", label: "Type II window" },
    ],
    phases: [
      { label: "Pick criteria", sub: "Security + any others" },
      { label: "Readiness", sub: "Gap assessment" },
      { label: "Remediate", sub: "Close control gaps" },
      { label: "Observation", sub: "Type II evidence window" },
      { label: "Fieldwork", sub: "CPA testing" },
      { label: "Report", sub: "Annual renewal" },
    ],
  },

  "sama-csf": {
    slug: "sama-csf",
    name: "SAMA CSF",
    full: "SAMA Cyber Security Framework",
    logo: `${LOGO}/sama.gov.sa.png`,
    category: "Banking cyber",
    region: "Saudi Arabia",
    accent: "#059669",
    centerLabel: "SAMA",
    shape: "constellation",
    nodesLabel: "Main domains",
    nodes: [
      { label: "Leadership & governance" },
      { label: "Risk & compliance" },
      { label: "Operations & technology" },
      { label: "Third-party cyber" },
    ],
    overview:
      "The Saudi Central Bank's mandatory cyber security framework for the financial sector, assessed on a maturity model from level 0 to 5.",
    importance:
      "Compliance is required to operate as a regulated financial institution in Saudi Arabia, with SAMA reviewing maturity directly.",
    scope:
      "All financial institutions regulated by SAMA: banks, insurance and finance companies operating in the Kingdom.",
    facts: [
      { value: "170", label: "controls" },
      { value: "L0-5", label: "maturity model" },
      { value: "Level 3", label: "minimum target" },
    ],
    phases: [
      { label: "Scope", sub: "Institution and assets" },
      { label: "Maturity self-assessment", sub: "Score levels 0-5" },
      { label: "Remediation roadmap", sub: "Reach the target level" },
      { label: "Implement", sub: "Across all domains" },
      { label: "SAMA review", sub: "Regulator submission" },
      { label: "Re-assess", sub: "Annual maturity cycle" },
    ],
  },

  "nca-ecc": {
    slug: "nca-ecc",
    name: "NCA ECC",
    full: "NCA Essential Cybersecurity Controls",
    logo: initialsBadge("NCA"),
    category: "National cyber",
    region: "Saudi Arabia",
    accent: "#0e7490",
    centerLabel: "NCA ECC",
    shape: "constellation",
    nodesLabel: "ECC domains",
    nodes: [
      { label: "Cybersecurity governance" },
      { label: "Cybersecurity defence" },
      { label: "Cybersecurity resilience" },
      { label: "Third-party & cloud" },
      { label: "ICS cybersecurity" },
    ],
    overview:
      "The National Cybersecurity Authority's baseline controls for protecting Saudi Arabia's information and technology assets, structured into five domains.",
    importance:
      "Mandatory for government bodies and critical national infrastructure in the Kingdom, with subdomains that map cleanly to ISO 27001.",
    scope:
      "Government organisations, critical national infrastructure and the entities that operate on their behalf.",
    facts: [
      { value: "5", label: "domains" },
      { value: "29", label: "subdomains" },
      { value: "Mandatory", label: "for CNI" },
    ],
    phases: [
      { label: "Scope", sub: "Assets in the KSA" },
      { label: "Gap assessment", sub: "Against the ECC" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "All five domains" },
      { label: "Compliance review", sub: "Evaluate posture" },
      { label: "Maintain", sub: "Continuous compliance" },
    ],
  },

  "pci-dss": {
    slug: "pci-dss",
    name: "PCI DSS",
    full: "PCI DSS v4.0.1",
    logo: `${LOGO}/pcisecuritystandards.org.png`,
    category: "Payment security",
    region: "Global",
    accent: "#e11d48",
    centerLabel: "PCI DSS",
    shape: "constellation",
    nodesLabel: "Control goals",
    nodes: [
      { label: "Secure network" },
      { label: "Protect account data" },
      { label: "Vulnerability mgmt" },
      { label: "Access control" },
      { label: "Monitor & test" },
      { label: "Security policy" },
    ],
    overview:
      "The baseline of technical and operational requirements that protect payment account data, organised as twelve requirements under six goals.",
    importance:
      "Required by the card brands for anyone that stores, processes or transmits cardholder data, with monthly fines for non-compliance.",
    scope:
      "Merchants and service providers in the cardholder-data environment, validated by SAQ or a Report on Compliance.",
    facts: [
      { value: "12", label: "requirements" },
      { value: "6", label: "goals" },
      { value: "Annual + ASV", label: "validation" },
    ],
    phases: [
      { label: "Scope the CDE", sub: "Cardholder data flows" },
      { label: "Gap assessment", sub: "Against the 12 reqs" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Controls and policy" },
      { label: "Assess & scan", sub: "ASV + assessor" },
      { label: "Revalidate", sub: "Annual + quarterly ASV" },
    ],
  },

  "nist-csf": {
    slug: "nist-csf",
    name: "NIST CSF",
    full: "NIST Cybersecurity Framework 2.0",
    logo: `${LOGO}/nist.gov.png`,
    category: "Cyber framework",
    region: "Global (US-origin)",
    accent: "#7c3aed",
    centerLabel: "NIST CSF",
    shape: "pipeline",
    nodesLabel: "The six functions",
    nodes: [
      { label: "Govern" },
      { label: "Identify" },
      { label: "Protect" },
      { label: "Detect" },
      { label: "Respond" },
      { label: "Recover" },
    ],
    overview:
      "A voluntary framework that organises cybersecurity outcomes into six functions, from governance through to recovery, for any organisation to profile against.",
    importance:
      "The common language for cyber risk, widely used to set a target profile, communicate to the board and align other frameworks.",
    scope:
      "Any organisation, of any size, that wants a structured, outcome-based way to manage and communicate cyber risk.",
    facts: [
      { value: "6", label: "functions" },
      { value: "22", label: "categories" },
      { value: "Voluntary", label: "profile-based" },
    ],
    phases: [
      { label: "Create profile", sub: "Scope outcomes" },
      { label: "Assess current", sub: "Where you are" },
      { label: "Set target", sub: "Where you want to be" },
      { label: "Prioritise gaps", sub: "By risk" },
      { label: "Implement", sub: "Close the gaps" },
      { label: "Measure", sub: "Improve over time" },
    ],
  },

  gdpr: {
    slug: "gdpr",
    name: "GDPR",
    full: "EU General Data Protection Regulation",
    logo: `${LOGO}/gdpr.eu.png`,
    category: "Data protection",
    region: "European Union",
    accent: "#2563eb",
    centerLabel: "GDPR",
    shape: "constellation",
    nodesLabel: "Core principles",
    nodes: [
      { label: "Lawful & fair" },
      { label: "Purpose limitation" },
      { label: "Data minimisation" },
      { label: "Accuracy" },
      { label: "Storage limitation" },
      { label: "Integrity & confidentiality" },
      { label: "Accountability" },
    ],
    overview:
      "The EU regulation governing how personal data is collected and used, built on seven principles and a set of enforceable data-subject rights.",
    importance:
      "Applies to anyone handling EU residents' data, with fines up to 4% of global turnover, so it drives privacy programmes worldwide.",
    scope:
      "Any organisation, anywhere, that processes the personal data of people in the European Union.",
    facts: [
      { value: "7", label: "principles" },
      { value: "99", label: "articles" },
      { value: "4%", label: "max turnover fine" },
    ],
    phases: [
      { label: "Data mapping", sub: "Records of processing" },
      { label: "Lawful basis & DPIA", sub: "Assess risk" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Rights & notices", sub: "Enable data subjects" },
      { label: "Governance", sub: "DPO and records" },
      { label: "Accountability", sub: "Ongoing evidence" },
    ],
  },

  cbuae: {
    slug: "cbuae",
    name: "CBUAE",
    full: "CBUAE Technology & Cyber Risk Requirements",
    logo: initialsBadge("CB"),
    category: "Banking tech risk",
    region: "United Arab Emirates",
    accent: "#b45309",
    centerLabel: "CBUAE",
    shape: "constellation",
    nodesLabel: "Focus areas",
    nodes: [
      { label: "Governance & oversight" },
      { label: "Technology risk" },
      { label: "Information security" },
      { label: "Business continuity" },
      { label: "Outsourcing" },
      { label: "Incident reporting" },
    ],
    overview:
      "The Central Bank of the UAE's expectations for how licensed financial institutions govern technology and cyber risk across their operations.",
    importance:
      "Sets the supervisory baseline for operating as a regulated financial institution in the UAE, examined on an ongoing basis.",
    scope:
      "Banks and licensed financial institutions supervised by the Central Bank of the UAE.",
    facts: [
      { value: "IT & cyber", label: "risk scope" },
      { value: "CBUAE", label: "supervised" },
      { value: "Ongoing", label: "supervision" },
    ],
    phases: [
      { label: "Scope", sub: "Institution and systems" },
      { label: "Gap assessment", sub: "Against requirements" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Controls and policy" },
      { label: "Board oversight", sub: "Report and attest" },
      { label: "Supervision", sub: "Continuous review" },
    ],
  },

  "sbp-etgrmf": {
    slug: "sbp-etgrmf",
    name: "SBP ETGRMF",
    full: "SBP Enterprise Technology Governance & Risk Management Framework",
    logo: `${LOGO}/sbp.org.pk.png`,
    category: "Banking tech",
    region: "Pakistan",
    accent: "#15803d",
    centerLabel: "SBP",
    shape: "constellation",
    nodesLabel: "Domains",
    nodes: [
      { label: "IT governance" },
      { label: "Technology risk" },
      { label: "Information security" },
      { label: "Business continuity" },
      { label: "Outsourcing" },
      { label: "IT operations" },
    ],
    overview:
      "The State Bank of Pakistan's framework for governing enterprise technology and technology risk across regulated financial institutions.",
    importance:
      "Mandatory for banks and DFIs in Pakistan, setting the board-level expectations for how technology risk is owned and managed.",
    scope:
      "Banks, microfinance banks and development finance institutions regulated by the State Bank of Pakistan.",
    facts: [
      { value: "262", label: "controls" },
      { value: "Board", label: "level ownership" },
      { value: "Mandatory", label: "for FIs" },
    ],
    phases: [
      { label: "Scope", sub: "Institution and systems" },
      { label: "Gap assessment", sub: "Against the framework" },
      { label: "Remediation roadmap", sub: "Prioritise the work" },
      { label: "Implement", sub: "Across all domains" },
      { label: "SBP submission", sub: "Regulator reporting" },
      { label: "Review", sub: "Annual cycle" },
    ],
  },

  "mas-trm": {
    slug: "mas-trm",
    name: "MAS TRM",
    full: "MAS Technology Risk Management Guidelines",
    logo: initialsBadge("MAS"),
    category: "Tech risk",
    region: "Singapore",
    accent: "#0891b2",
    centerLabel: "MAS TRM",
    shape: "constellation",
    nodesLabel: "Domains",
    nodes: [
      { label: "Risk governance" },
      { label: "Risk management" },
      { label: "Systems development" },
      { label: "IT resilience" },
      { label: "Access control" },
      { label: "Cyber operations" },
    ],
    overview:
      "The Monetary Authority of Singapore's guidelines on managing technology risk, from governance and development through to resilience and cyber operations.",
    importance:
      "The supervisory benchmark for financial institutions in Singapore, referenced directly when MAS assesses technology risk posture.",
    scope:
      "Banks, insurers, payment firms and other financial institutions regulated by the Monetary Authority of Singapore.",
    facts: [
      { value: "236", label: "controls" },
      { value: "Guidelines", label: "supervisory" },
      { value: "MAS", label: "regulated" },
    ],
    phases: [
      { label: "Scope", sub: "Institution and systems" },
      { label: "Risk assessment", sub: "Technology risk" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "TRM controls" },
      { label: "Board attestation", sub: "Own the risk" },
      { label: "Monitor", sub: "Continuous review" },
    ],
  },

  "iso-22301": {
    slug: "iso-22301",
    name: "ISO 22301",
    full: "ISO 22301:2019",
    logo: `${LOGO}/iso.org.png`,
    category: "Business continuity",
    region: "Global",
    accent: "#0d9488",
    centerLabel: "ISO 22301",
    shape: "pipeline",
    nodesLabel: "BCMS lifecycle",
    nodes: [
      { label: "Impact analysis" },
      { label: "Risk assessment" },
      { label: "BC strategy" },
      { label: "BC plans" },
      { label: "Exercise & test" },
      { label: "Improve" },
    ],
    overview:
      "The international standard for a Business Continuity Management System, a governed way to prepare for, respond to and recover from disruption.",
    importance:
      "Proves an organisation can keep critical operations running through an incident, increasingly asked for alongside ISO 27001.",
    scope:
      "Any organisation that needs assurance it can maintain and recover critical activities during disruption.",
    facts: [
      { value: "PDCA", label: "management cycle" },
      { value: "3 yr", label: "certificate cycle" },
      { value: "BIA-led", label: "prioritisation" },
    ],
    phases: [
      { label: "Impact analysis", sub: "Critical activities" },
      { label: "Risk assessment", sub: "Threats to continuity" },
      { label: "Strategy", sub: "Continuity options" },
      { label: "Plans", sub: "Response and recovery" },
      { label: "Exercise", sub: "Test and validate" },
      { label: "Certify", sub: "Audit and improve" },
    ],
  },

  dora: {
    slug: "dora",
    name: "DORA",
    full: "Digital Operational Resilience Act",
    logo: `${LOGO}/esma.europa.eu.png`,
    category: "Operational resilience",
    region: "European Union",
    accent: "#1d4ed8",
    centerLabel: "DORA",
    shape: "constellation",
    nodesLabel: "The five pillars",
    nodes: [
      { label: "ICT risk management" },
      { label: "Incident reporting" },
      { label: "Resilience testing" },
      { label: "Third-party risk" },
      { label: "Information sharing" },
    ],
    overview:
      "The EU regulation making financial entities operationally resilient to ICT disruption, built on five pillars from risk management to testing.",
    importance:
      "In force across the EU financial sector, it turns operational resilience from good practice into a binding, examinable requirement.",
    scope:
      "Financial entities in the EU and the critical ICT third parties that serve them.",
    facts: [
      { value: "5", label: "pillars" },
      { value: "In force", label: "since 2025" },
      { value: "EU-wide", label: "financial sector" },
    ],
    phases: [
      { label: "Scope ICT", sub: "Systems and providers" },
      { label: "Risk framework", sub: "ICT risk management" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "The five pillars" },
      { label: "Resilience testing", sub: "Including TLPT" },
      { label: "Report", sub: "Incidents and registers" },
    ],
  },

  nis2: {
    slug: "nis2",
    name: "NIS2",
    full: "EU NIS2 Directive",
    logo: `${LOGO}/enisa.europa.eu.png`,
    category: "Cyber directive",
    region: "European Union",
    accent: "#6366f1",
    centerLabel: "NIS2",
    shape: "constellation",
    nodesLabel: "Key measures",
    nodes: [
      { label: "Governance" },
      { label: "Risk management" },
      { label: "Incident reporting" },
      { label: "Business continuity" },
      { label: "Supply chain" },
    ],
    overview:
      "The EU directive raising the cybersecurity baseline across essential and important sectors, with management held accountable for compliance.",
    importance:
      "Expands sharply on the original NIS, with real penalties and personal liability for senior management who fail to comply.",
    scope:
      "Medium and large entities across eighteen critical sectors operating in the European Union.",
    facts: [
      { value: "18", label: "sectors" },
      { value: "Directive", label: "EU-wide" },
      { value: "Mgmt", label: "held liable" },
    ],
    phases: [
      { label: "Scope", sub: "Entity classification" },
      { label: "Gap assessment", sub: "Against Art. 21" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Risk measures" },
      { label: "Register", sub: "With the authority" },
      { label: "Report", sub: "Incidents on the clock" },
    ],
  },

  hipaa: {
    slug: "hipaa",
    name: "HIPAA",
    full: "HIPAA Security & Privacy Rules",
    logo: `${LOGO}/hhs.gov.png`,
    category: "Health data",
    region: "United States",
    accent: "#0284c7",
    centerLabel: "HIPAA",
    shape: "constellation",
    nodesLabel: "Rules & safeguards",
    nodes: [
      { label: "Administrative" },
      { label: "Physical" },
      { label: "Technical" },
      { label: "Privacy Rule" },
      { label: "Breach Notification" },
    ],
    overview:
      "The US law protecting health information, with Security Rule safeguards, a Privacy Rule and a Breach Notification Rule.",
    importance:
      "Mandatory for the US healthcare sector and its vendors, with significant penalties for breaches of protected health information.",
    scope:
      "Covered entities and the business associates that handle protected health information in the United States.",
    facts: [
      { value: "3", label: "safeguard types" },
      { value: "PHI", label: "protected data" },
      { value: "US", label: "healthcare" },
    ],
    phases: [
      { label: "Scope PHI", sub: "Where it lives" },
      { label: "Risk analysis", sub: "Security Rule" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Safeguards", sub: "Admin, physical, technical" },
      { label: "Policies & training", sub: "Privacy Rule" },
      { label: "Maintain", sub: "Breach readiness" },
    ],
  },

  "cobit-2019": {
    slug: "cobit-2019",
    name: "COBIT 2019",
    full: "COBIT 2019 (ISACA)",
    logo: `${LOGO}/isaca.org.png`,
    category: "IT governance",
    region: "Global",
    accent: "#9333ea",
    centerLabel: "COBIT",
    shape: "constellation",
    nodesLabel: "Governance domains",
    nodes: [
      { label: "Evaluate, direct, monitor" },
      { label: "Align, plan, organise" },
      { label: "Build, acquire, implement" },
      { label: "Deliver, service, support" },
      { label: "Monitor, evaluate, assess" },
    ],
    overview:
      "ISACA's framework for the governance and management of enterprise IT, organised into forty objectives across five domains.",
    importance:
      "The reference model for IT governance, widely used to connect IT goals to enterprise goals and to underpin audits.",
    scope:
      "Enterprises that want a governance system aligning IT with business objectives and stakeholder needs.",
    facts: [
      { value: "40", label: "objectives" },
      { value: "5", label: "domains" },
      { value: "Governance", label: "and management" },
    ],
    phases: [
      { label: "Governance goals", sub: "Enterprise alignment" },
      { label: "Assess", sub: "Capability maturity" },
      { label: "Design target", sub: "Governance system" },
      { label: "Implement", sub: "The objectives" },
      { label: "Measure", sub: "Performance" },
      { label: "Improve", sub: "Continuous" },
    ],
  },

  "sox-itgc": {
    slug: "sox-itgc",
    name: "SOX ITGC",
    full: "Sarbanes-Oxley IT General Controls",
    logo: `${LOGO}/sec.gov.png`,
    category: "Financial reporting",
    region: "United States",
    accent: "#475569",
    centerLabel: "SOX ITGC",
    shape: "constellation",
    nodesLabel: "ITGC domains",
    nodes: [
      { label: "Access to programs & data" },
      { label: "Program changes" },
      { label: "Program development" },
      { label: "Computer operations" },
    ],
    overview:
      "The IT general controls that underpin Sarbanes-Oxley, giving assurance over the systems behind financial reporting.",
    importance:
      "Required for US-listed companies, where a control deficiency can become a material weakness disclosed to the market.",
    scope:
      "Public companies subject to SOX and the IT systems that support financial reporting.",
    facts: [
      { value: "4", label: "ITGC domains" },
      { value: "Annual", label: "attestation" },
      { value: "US-listed", label: "companies" },
    ],
    phases: [
      { label: "Scope systems", sub: "In-scope for reporting" },
      { label: "Risk & controls", sub: "Design the ITGCs" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Operate the controls" },
      { label: "Test", sub: "Management + auditor" },
      { label: "Attest", sub: "Annual cycle" },
    ],
  },

  "swift-cscf": {
    slug: "swift-cscf",
    name: "SWIFT CSCF",
    full: "SWIFT Customer Security Controls Framework",
    logo: initialsBadge("SW"),
    category: "Payments network",
    region: "Global",
    accent: "#ca8a04",
    centerLabel: "SWIFT",
    shape: "constellation",
    nodesLabel: "Security principles",
    nodes: [
      { label: "Restrict internet access" },
      { label: "Reduce attack surface" },
      { label: "Physically secure" },
      { label: "Protect credentials" },
      { label: "Manage identities" },
      { label: "Detect activity" },
      { label: "Plan response" },
    ],
    overview:
      "The mandatory and advisory controls SWIFT users implement to secure their local payments environment, grouped under security principles.",
    importance:
      "An annual self-attestation is required to stay connected to the SWIFT network, with counterparties able to see the result.",
    scope:
      "Any institution that connects to the SWIFT messaging network for payments.",
    facts: [
      { value: "32", label: "controls" },
      { value: "3", label: "objectives" },
      { value: "Annual", label: "attestation" },
    ],
    phases: [
      { label: "Scope architecture", sub: "Connectivity type" },
      { label: "Gap assessment", sub: "Against the CSCF" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Mandatory controls" },
      { label: "Independent assessment", sub: "Assurance" },
      { label: "Attest", sub: "Annual KYC-SA" },
    ],
  },

  "aramco-ccc": {
    slug: "aramco-ccc",
    name: "ARAMCO CCC",
    full: "Saudi Aramco Cybersecurity Compliance Certificate (SACS-002)",
    logo: initialsBadge("ARM"),
    category: "Supplier cyber",
    region: "Saudi Arabia",
    accent: "#047857",
    centerLabel: "ARAMCO",
    shape: "constellation",
    nodesLabel: "Control areas",
    nodes: [
      { label: "Governance" },
      { label: "Asset & data protection" },
      { label: "Access control" },
      { label: "Operations security" },
      { label: "Incident management" },
      { label: "Third-party" },
    ],
    overview:
      "Saudi Aramco's third-party cybersecurity standard, where suppliers earn a Cybersecurity Compliance Certificate before doing business.",
    importance:
      "The certificate is a prerequisite for working with Aramco, making it a gate to one of the region's largest supply chains.",
    scope:
      "Third parties and suppliers that connect to or handle data for Saudi Aramco.",
    facts: [
      { value: "35", label: "controls" },
      { value: "CCC", label: "certificate" },
      { value: "Supplier", label: "prerequisite" },
    ],
    phases: [
      { label: "Register", sub: "Supplier onboarding" },
      { label: "Gap assessment", sub: "Against SACS-002" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "The controls" },
      { label: "Audit", sub: "Authorised assessor" },
      { label: "Certify", sub: "CCC issued and renewed" },
    ],
  },

  "cis-controls": {
    slug: "cis-controls",
    name: "CIS Controls",
    full: "CIS Critical Security Controls v8",
    logo: `${LOGO}/cisecurity.org.png`,
    category: "Security baselines",
    region: "Global",
    accent: "#4338ca",
    centerLabel: "CIS v8",
    shape: "constellation",
    nodesLabel: "Key controls",
    nodes: [
      { label: "Asset inventory" },
      { label: "Data protection" },
      { label: "Secure configuration" },
      { label: "Account management" },
      { label: "Access control" },
      { label: "Vulnerability mgmt" },
      { label: "Audit logging" },
    ],
    overview:
      "A prioritised set of eighteen controls and their safeguards, ordered by the attacks they stop, with Implementation Groups for phasing.",
    importance:
      "The fastest way to a defensible baseline, and a common bridge that maps into ISO 27001, NIST CSF and PCI DSS.",
    scope:
      "Any organisation that wants a prioritised, prescriptive starting point for cyber defence.",
    facts: [
      { value: "18", label: "controls" },
      { value: "153", label: "safeguards" },
      { value: "IG1-3", label: "phasing" },
    ],
    phases: [
      { label: "Inventory", sub: "Assets and software" },
      { label: "Pick an IG", sub: "Implementation group" },
      { label: "Gap assessment", sub: "Against the safeguards" },
      { label: "Implement", sub: "By priority" },
      { label: "Measure", sub: "Safeguard coverage" },
      { label: "Improve", sub: "Move up the IGs" },
    ],
  },

  hitrust: {
    slug: "hitrust",
    name: "HITRUST",
    full: "HITRUST CSF",
    logo: `${LOGO}/hitrustalliance.net.png`,
    category: "Health trust",
    region: "Global (US-origin)",
    accent: "#0369a1",
    centerLabel: "HITRUST",
    shape: "constellation",
    nodesLabel: "Control domains",
    nodes: [
      { label: "Access control" },
      { label: "Endpoint protection" },
      { label: "Configuration mgmt" },
      { label: "Vulnerability mgmt" },
      { label: "Incident management" },
      { label: "Third-party assurance" },
      { label: "Data protection & privacy" },
    ],
    overview:
      "A certifiable framework that harmonises HIPAA, ISO, NIST, PCI and more into one set of prescriptive, scalable control domains.",
    importance:
      "A HITRUST certification is a strong assurance signal in healthcare, letting one assessment answer many overlapping obligations.",
    scope:
      "Healthcare organisations and their vendors that need certifiable, harmonised assurance over many frameworks at once.",
    facts: [
      { value: "19", label: "domains" },
      { value: "e1 / i1 / r2", label: "assessment tiers" },
      { value: "Certifiable", label: "assurance" },
    ],
    phases: [
      { label: "Scope", sub: "Systems and factors" },
      { label: "Readiness", sub: "MyCSF assessment" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Validated assessment", sub: "External assessor" },
      { label: "QA & certify", sub: "HITRUST review" },
      { label: "Maintain", sub: "Interim and recertify" },
    ],
  },

  "nist-800-53": {
    slug: "nist-800-53",
    name: "NIST 800-53",
    full: "NIST SP 800-53 Rev. 5",
    logo: `${LOGO}/nist.gov.png`,
    category: "Federal controls",
    region: "United States",
    accent: "#6d28d9",
    centerLabel: "800-53",
    shape: "constellation",
    nodesLabel: "Control families",
    nodes: [
      { label: "Access control" },
      { label: "Audit & accountability" },
      { label: "Configuration mgmt" },
      { label: "Identification & auth" },
      { label: "Incident response" },
      { label: "Risk assessment" },
      { label: "System & comms protection" },
    ],
    overview:
      "The US federal catalogue of security and privacy controls, organised into twenty families and applied through Low, Moderate and High baselines.",
    importance:
      "The control set behind FedRAMP and FISMA, and the catalogue that NIST CSF, CMMC and many others map back to.",
    scope:
      "US federal agencies, their contractors, and any organisation adopting a rigorous, baseline-driven control catalogue.",
    facts: [
      { value: "20", label: "control families" },
      { value: "Low·Mod·High", label: "baselines" },
      { value: "FedRAMP", label: "underpins it" },
    ],
    phases: [
      { label: "Categorize", sub: "System and data impact" },
      { label: "Select baseline", sub: "Low, Moderate or High" },
      { label: "Implement", sub: "The chosen controls" },
      { label: "Assess", sub: "Test effectiveness" },
      { label: "Authorize", sub: "Accept residual risk" },
      { label: "Monitor", sub: "Continuous" },
    ],
  },

  "sbp-cloud": {
    slug: "sbp-cloud",
    name: "SBP Cloud Outsourcing",
    full: "SBP Cloud Adoption & Outsourcing Framework",
    logo: `${LOGO}/sbp.org.pk.png`,
    category: "Banking cloud",
    region: "Pakistan",
    accent: "#0e7490",
    centerLabel: "SBP Cloud",
    shape: "constellation",
    nodesLabel: "Focus areas",
    nodes: [
      { label: "Governance & strategy" },
      { label: "Risk assessment" },
      { label: "Due diligence" },
      { label: "Contracts & SLAs" },
      { label: "Data residency" },
      { label: "Exit strategy" },
    ],
    overview:
      "The State Bank of Pakistan's conditions for banks adopting cloud services, from governance and due diligence to data residency and a workable exit.",
    importance:
      "Sets what a Pakistani bank must satisfy before moving workloads to the cloud, reviewed by the regulator.",
    scope:
      "Banks and financial institutions in Pakistan outsourcing to cloud service providers.",
    facts: [
      { value: "58", label: "controls" },
      { value: "SBP", label: "regulated" },
      { value: "Cloud", label: "outsourcing" },
    ],
    phases: [
      { label: "Scope", sub: "Workloads and providers" },
      { label: "Risk assessment", sub: "Cloud and outsourcing risk" },
      { label: "Due diligence", sub: "Assess the provider" },
      { label: "Contract & controls", sub: "SLAs and safeguards" },
      { label: "SBP approval", sub: "Regulator sign-off" },
      { label: "Monitor & exit", sub: "Ongoing, with an exit plan" },
    ],
  },

  "sbp-ibanking": {
    slug: "sbp-ibanking",
    name: "SBP Internet Banking",
    full: "SBP Internet & Mobile Banking Security Framework",
    logo: `${LOGO}/sbp.org.pk.png`,
    category: "Banking channels",
    region: "Pakistan",
    accent: "#15803d",
    centerLabel: "SBP IB",
    shape: "constellation",
    nodesLabel: "Focus areas",
    nodes: [
      { label: "Governance" },
      { label: "Authentication" },
      { label: "Transaction security" },
      { label: "Fraud monitoring" },
      { label: "Customer awareness" },
      { label: "Incident response" },
    ],
    overview:
      "The State Bank of Pakistan's security requirements for internet and mobile banking, from strong authentication to fraud monitoring.",
    importance:
      "Mandatory for banks offering digital channels in Pakistan, protecting both customers and the channel from fraud.",
    scope:
      "Banks and payment institutions in Pakistan operating internet or mobile banking.",
    facts: [
      { value: "66", label: "controls" },
      { value: "SBP", label: "regulated" },
      { value: "Digital", label: "channels" },
    ],
    phases: [
      { label: "Scope channels", sub: "Internet and mobile" },
      { label: "Gap assessment", sub: "Against the framework" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Controls and monitoring" },
      { label: "SBP review", sub: "Regulator reporting" },
      { label: "Monitor", sub: "Fraud and incidents" },
    ],
  },

  sabic: {
    slug: "sabic",
    name: "SABIC CyberTrust",
    full: "SABIC Third-Party Cybersecurity Standard",
    logo: initialsBadge("SABIC"),
    category: "Supplier cyber",
    region: "Saudi Arabia",
    accent: "#075985",
    centerLabel: "SABIC",
    shape: "constellation",
    nodesLabel: "Control areas",
    nodes: [
      { label: "Governance" },
      { label: "Access control" },
      { label: "Data protection" },
      { label: "Operations security" },
      { label: "Incident management" },
      { label: "Third-party" },
    ],
    overview:
      "SABIC's cybersecurity requirements for the third parties in its supply chain, a supplier assurance standard in the spirit of Aramco's.",
    importance:
      "Meeting it is a condition of cyber-sensitive business with SABIC, one of the region's largest manufacturers.",
    scope:
      "Suppliers and third parties that connect to or handle data for SABIC.",
    facts: [
      { value: "35", label: "controls" },
      { value: "Supplier", label: "assurance" },
      { value: "KSA", label: "industrial" },
    ],
    phases: [
      { label: "Register", sub: "Supplier onboarding" },
      { label: "Gap assessment", sub: "Against the standard" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "The controls" },
      { label: "Assessment", sub: "Independent review" },
      { label: "Certify", sub: "Issued and renewed" },
    ],
  },

  "sl-bss": {
    slug: "sl-bss",
    name: "Sri Lanka BSS",
    full: "CBSL Baseline Security Standard",
    logo: initialsBadge("BSS"),
    category: "Banking cyber",
    region: "Sri Lanka",
    accent: "#b45309",
    centerLabel: "SL BSS",
    shape: "constellation",
    nodesLabel: "Domains",
    nodes: [
      { label: "Governance" },
      { label: "Access control" },
      { label: "Network security" },
      { label: "Data protection" },
      { label: "Incident management" },
      { label: "Business continuity" },
    ],
    overview:
      "The Central Bank of Sri Lanka's Baseline Security Standard for licensed banks, a mandatory floor of cybersecurity controls.",
    importance:
      "Mandatory for licensed banks in Sri Lanka, setting the minimum cybersecurity posture the regulator expects.",
    scope:
      "Licensed banks and financial institutions supervised by the Central Bank of Sri Lanka.",
    facts: [
      { value: "79", label: "controls" },
      { value: "CBSL", label: "mandated" },
      { value: "Banks", label: "in Sri Lanka" },
    ],
    phases: [
      { label: "Scope", sub: "In-scope systems" },
      { label: "Gap assessment", sub: "Against the BSS" },
      { label: "Remediate", sub: "Close the gaps" },
      { label: "Implement", sub: "Baseline controls" },
      { label: "CBSL review", sub: "Regulator reporting" },
      { label: "Maintain", sub: "Continuous compliance" },
    ],
  },
};

/**
 * The concrete deliverables the platform can spin up from a standard template
 * for each framework, shown in the "workspace" screenshot. Real artifacts a team
 * produces for that framework, so the mockup reads as specific, not generic.
 */
export const FRAMEWORK_ARTIFACTS: Record<string, string[]> = {
  "iso-27001": ["Statement of Applicability", "ISMS scope", "Risk treatment plan"],
  "soc-2": ["System description", "Control matrix", "Risk assessment"],
  "sama-csf": ["Cyber security policy", "Maturity assessment", "Risk register"],
  "nca-ecc": ["Cybersecurity policy", "Asset register", "Compliance report"],
  "pci-dss": ["Network diagram", "Data-flow diagram", "SAQ / ROC"],
  "nist-csf": ["Current profile", "Target profile", "Action plan"],
  gdpr: ["Records of processing", "DPIA", "Privacy notice"],
  cbuae: ["IT risk policy", "Continuity plan", "Incident register"],
  "sbp-etgrmf": ["IT governance policy", "Risk register", "Continuity plan"],
  "mas-trm": ["TRM framework", "Risk assessment", "Incident plan"],
  "iso-22301": ["Business impact analysis", "Continuity plan", "Exercise report"],
  dora: ["ICT risk framework", "Incident register", "Resilience test report"],
  nis2: ["Risk-measures policy", "Incident procedure", "Supplier register"],
  hipaa: ["Risk analysis", "Policies & procedures", "Business associate agreement"],
  "cobit-2019": ["Governance charter", "RACI matrix", "Maturity assessment"],
  "sox-itgc": ["ITGC control matrix", "Access review", "Change log"],
  "swift-cscf": ["Security policy", "Architecture diagram", "Attestation (KYC-SA)"],
  "aramco-ccc": ["Cybersecurity policy", "Gap assessment", "CCC application"],
  "cis-controls": ["Asset inventory", "Config baseline", "Safeguard tracker"],
  hitrust: ["Scoping document", "MyCSF assessment", "Corrective action plan"],
  "nist-800-53": ["System security plan", "Control baseline", "Assessment report"],
  "sbp-cloud": ["Cloud risk assessment", "Outsourcing register", "Exit plan"],
  "sbp-ibanking": ["Channel security policy", "Fraud monitoring plan", "Incident procedure"],
  sabic: ["Cybersecurity policy", "Gap assessment", "Compliance certificate"],
  "sl-bss": ["Security policy", "Risk register", "Continuity plan"],
};
