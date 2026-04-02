export interface FeatureDetail {
    id: string;
    name: string;
    preview: string;
    capability: string;
    subFeatures: string[];
    example: string;
    businessValue: string;
}

export interface FeatureModule {
    id: "governance" | "risk" | "compliance";
    tabLabel: string;
    title: string;
    subtitle: string;
    features: FeatureDetail[];
}

export const featureModules: FeatureModule[] = [
    {
        id: "governance",
        tabLabel: "AI Governance",
        title: "AI Governance",
        subtitle: "Policy management, attestation, exception workflows, and board oversight.",
        features: [
            {
                id: "01",
                name: "AI Policy Drafting and Generation",
                preview: "Generates complete, regulation-aligned policy documents from scratch in seconds.",
                capability:
                    "Takes selected frameworks and regulatory scope as input, fetches relevant controls, and produces structured policies, procedures, or standards.",
                subFeatures: [
                    "Framework-aligned drafting",
                    "Document type enforcement (policy vs procedure vs standard)",
                    "Metadata generation",
                    "Estimated review time calculation"
                ],
                example:
                    "A mid-size bank adopting PCI-DSS for the first time needs 15+ policies. Instead of paying consultants to draft each one, the CISO selects PCI-DSS and generates an Access Control Policy in 30 seconds with scope definition, accountability matrix, and control references. The team reviews and customizes instead of starting from a blank page.",
                businessValue:
                    "Around 80% reduction in policy drafting time with immediate regulatory alignment and consistent document quality."
            },
            {
                id: "02",
                name: "AI Policy Suggestion Engine",
                preview:
                    "Recommends exactly which governance documents your adopted frameworks require with priorities and control references.",
                capability:
                    "Scans all controls in a selected framework and suggests required policies, standards, and procedures with priority and mapped controls.",
                subFeatures: [
                    "Priority ranking (High, Medium, Low)",
                    "Control-to-document mapping",
                    "Recommended key sections"
                ],
                example:
                    "A fintech receives its banking license and must comply with SAMA controls. AI recommends the complete document roadmap including high-priority policies first, followed by standards and procedures, each linked to exact controls.",
                businessValue:
                    "Eliminates guesswork in regulatory documentation and reduces audit findings from missing policies."
            },
            {
                id: "03",
                name: "AI Policy Gap Analysis",
                preview:
                    "Semantic analysis of existing policies against regulatory requirements to find and quantify compliance gaps.",
                capability:
                    "Classifies each requirement as fully compliant, partially compliant, not addressed, or not applicable. Extracts evidence text and generates remediation recommendations with risk severity.",
                subFeatures: [
                    "Domain-scoped analysis to reduce false positives",
                    "Evidence extraction with verbatim references",
                    "Remediation guidance",
                    "Risk impact scoring (regulatory, operational, financial, reputational)"
                ],
                example:
                    "A bank aligns existing policy packs to a new operational resilience regulation. AI highlights what is compliant, what is missing, and which clauses must be added first due to high regulatory risk.",
                businessValue:
                    "Turns a multi-week manual gap assessment into a few hours with defensible prioritization."
            },
            {
                id: "04",
                name: "AI Regulatory Change Impact Assessment",
                preview:
                    "Instantly maps how incoming regulatory changes affect existing policies, controls, and compliance posture.",
                capability:
                    "Categorizes changes and maps impacted internal policies, frameworks, and controls with predicted impact.",
                subFeatures: [
                    "Impacted item identification",
                    "Change categorization",
                    "Affected framework mapping"
                ],
                example:
                    "A regulator issues updated outsourcing guidance for cloud providers. AI immediately flags impacted policies, procedures, and controls, including where current procedures do not satisfy new requirements.",
                businessValue:
                    "Reduces regulatory response time from weeks to days and minimizes missed-change risk."
            },
            {
                id: "05",
                name: "AI Governance Dashboard and Executive Insights",
                preview:
                    "AI-generated executive governance health summaries, trend analysis, and anomaly detection in seconds.",
                capability:
                    "Aggregates governance signals across modules and produces plain-language insight on what needs attention now.",
                subFeatures: [
                    "Policy review cycle monitoring",
                    "Attestation completion analysis",
                    "Exception trend detection",
                    "Remediation progress tracking",
                    "Accepted risk summaries"
                ],
                example:
                    "Before a board risk committee meeting, the CRO opens one dashboard and sees acknowledgment drop-offs, expiring exceptions, overdue remediations, and key trends without requesting multiple manual reports.",
                businessValue:
                    "Board-ready visibility in real time with proactive issue detection before audit findings appear."
            },
            {
                id: "06",
                name: "AI Document Parsing and Statement Extraction",
                preview:
                    "Reads uploaded policy documents and extracts every individual requirement as traceable policy statements.",
                capability:
                    "Uses OCR and NLP to extract, categorize, and prioritize statements while detecting overlap and duplicates.",
                subFeatures: [
                    "Automatic categorization",
                    "Mandatory vs guidance tagging",
                    "Version snapshots",
                    "Duplicate prevention"
                ],
                example:
                    "After an acquisition, 45 inherited governance documents are uploaded. AI extracts and categorizes statements, identifies overlap, and creates a clean harmonization baseline.",
                businessValue:
                    "Cuts post-merger policy integration effort from months to weeks."
            },
            {
                id: "07",
                name: "AI-Powered Attestation and Acknowledgment Management",
                preview:
                    "Campaign-based policy attestation with real-time tracking, anomaly detection, and automated reminders.",
                capability:
                    "Monitors campaign progress by user, branch, and policy while highlighting suspicious completion gaps.",
                subFeatures: [
                    "Per-policy completion dashboards",
                    "User status (acknowledged, pending, overdue)",
                    "Automated reminders",
                    "Audit-ready timestamps"
                ],
                example:
                    "A compliance team launches a policy attestation for thousands of employees. AI flags one low-completion branch early, enabling targeted follow-up before deadline.",
                businessValue:
                    "Provides defensible proof of policy acknowledgment while eliminating manual chasing."
            },
            {
                id: "08",
                name: "AI-Enhanced Policy Exception Management",
                preview:
                    "Formal exception workflow with AI risk scoring, compensating control evaluation, approvals, and expiry tracking.",
                capability:
                    "Supports structured justifications, approval chains, compensating controls, and automatic expiry notifications.",
                subFeatures: [
                    "Justification documentation",
                    "Approval chain workflow",
                    "Expiry countdown and reminders",
                    "Revocation workflow",
                    "Comment threads"
                ],
                example:
                    "A temporary policy exception is approved with controls and a fixed expiry. Automated reminders ensure review and closure before becoming an unmanaged deviation.",
                businessValue:
                    "Eliminates informal bypasses and creates full audit evidence for every exception decision."
            },
            {
                id: "09",
                name: "AI Committee and Board Governance Oversight",
                preview:
                    "Board and committee management with AI minute summarization and automatic action extraction.",
                capability:
                    "Extracts action items from meeting minutes, assigns owners, sets deadlines, and tracks completion status.",
                subFeatures: [
                    "Committee structure and charters",
                    "Meeting scheduling and agendas",
                    "Attendance tracking",
                    "Action item status tracking"
                ],
                example:
                    "After each committee session, AI extracts decisions and assigns action owners. Next meeting starts with a precise completion dashboard and overdue escalations.",
                businessValue:
                    "Closes the execution gap between board decisions and operational follow-through."
            },
            {
                id: "10",
                name: "AI Compliance-by-Framework Reporting",
                preview:
                    "Cross-framework compliance reporting with AI-prioritized remediation and one-click executive export.",
                capability:
                    "Generates framework posture scores, open gaps, remediation status, and accepted risk snapshots across obligations.",
                subFeatures: [
                    "Framework compliance scores",
                    "Open gap summaries",
                    "Remediation progress",
                    "Accepted risk tracking",
                    "Upcoming review deadlines"
                ],
                example:
                    "A security leader sees posture across SAMA, PCI-DSS, and ISO in one view and receives AI priority guidance based on urgency, penalty exposure, and implementation effort.",
                businessValue:
                    "Single-pane compliance visibility with data-driven remediation prioritization."
            }
        ]
    },
    {
        id: "risk",
        tabLabel: "AI Risk Management",
        title: "AI Risk Management",
        subtitle: "Risk identification, treatment, assessment, scenario modeling, and integration.",
        features: [
            {
                id: "01",
                name: "AI Risk Suggestion Engine",
                preview:
                    "Generates complete risk details - category, likelihood, impact, and treatment - from a brief scenario.",
                capability:
                    "Transforms a short risk description into categorized risk records with severity, treatment recommendation, and narrative.",
                subFeatures: [
                    "Risk categorization",
                    "Severity mapping",
                    "Treatment recommendation",
                    "Suggested controls"
                ],
                example:
                    "An analyst enters a third-party processor concern. AI produces a complete risk entry with inherent risk scoring, treatment path, and recommended controls in minutes.",
                businessValue:
                    "Improves consistency and speed of risk documentation regardless of analyst experience."
            },
            {
                id: "02",
                name: "AI Risk Treatment Plan Generation",
                preview:
                    "Generates multiple actionable treatment options with implementation steps and timeline guidance.",
                capability:
                    "Analyzes risk context and severity to produce practical treatment alternatives with expected impact.",
                subFeatures: [
                    "Multiple treatment options",
                    "Implementation timeline suggestions",
                    "Control effectiveness estimates"
                ],
                example:
                    "For a governance compliance risk, AI generates mitigation options with effort and expected reduction so owners can choose what to execute now versus later.",
                businessValue:
                    "Turns vague recommendations into clear action plans that can be assigned and tracked."
            },
            {
                id: "03",
                name: "AI-Powered Risk Assessment Scoring",
                preview:
                    "Pre-populates risk scores, treatment suggestions, control effectiveness, and rationale for assessment cycles.",
                capability:
                    "Evaluates each risk in context of existing controls and operational conditions to suggest consistent scoring.",
                subFeatures: [
                    "Treatment decision suggestion",
                    "Control effectiveness rating",
                    "Rationale generation",
                    "Notes auto-population"
                ],
                example:
                    "During annual enterprise assessment, teams review AI-prepared scoring recommendations for each risk instead of scoring every record from scratch.",
                businessValue:
                    "Large reduction in assessment cycle time and much higher scoring consistency across units."
            },
            {
                id: "04",
                name: "AI Risk Appetite and KRI Threshold Suggestions",
                preview:
                    "Recommends benchmarked risk appetite thresholds and KRI triggers based on organizational context.",
                capability:
                    "Generates threshold candidates and early-warning levels using profile and industry context.",
                subFeatures: [
                    "Benchmark-informed thresholds",
                    "Automated breach alerts",
                    "Trend monitoring",
                    "Appetite statement generation"
                ],
                example:
                    "A risk office setting its first enterprise appetite framework gets suggested thresholds, warning triggers, and rationale that leadership can calibrate.",
                businessValue:
                    "Creates defensible appetite definitions instead of arbitrary limits."
            },
            {
                id: "05",
                name: "AI RCSA Evidence Recommendations",
                preview:
                    "Suggests exact evidence artifacts for each RCSA question during self-assessment.",
                capability:
                    "Analyzes questions and recommends evidence types, content expectations, and concrete examples.",
                subFeatures: [
                    "Question-specific evidence suggestions",
                    "Confidence scoring",
                    "Gap detection",
                    "Template-aligned recommendations"
                ],
                example:
                    "For a segregation-of-duties control question, AI recommends the exact matrix, access report, and audit references to attach.",
                businessValue:
                    "Improves assessment quality and exposes evidence gaps before reviewers or auditors do."
            },
            {
                id: "06",
                name: "AI-Powered Bow-Tie Analysis",
                preview:
                    "Builds complete threat-to-consequence narratives with mapped preventive and recovery controls.",
                capability:
                    "Creates cause-effect chains covering threats, vulnerabilities, event path, consequences, and control quality.",
                subFeatures: [
                    "Threat identification",
                    "Preventive control mapping",
                    "Consequence analysis",
                    "Recovery control mapping",
                    "Narrative generation"
                ],
                example:
                    "For ransomware risk on core banking systems, AI lays out threat sources, preventive gaps, outage consequences, and recovery readiness in one explainable model.",
                businessValue:
                    "Makes complex risks easier for executives and regulators to understand and act on."
            },
            {
                id: "07",
                name: "AI Scenario Analysis and What-If Modeling",
                preview:
                    "Models risk scenarios with adjustable assumptions and plain-language business impact outputs.",
                capability:
                    "Runs parameterized simulations and produces before-after impact narratives for decision makers.",
                subFeatures: [
                    "Preset scenario templates",
                    "Parameter sliders",
                    "Before/after comparison"
                ],
                example:
                    "Leadership asks what happens if a major correspondent relationship is lost. AI estimates disruption window, financial effects, and notification implications.",
                businessValue:
                    "Moves risk discussions from opinion-based to scenario-driven planning."
            },
            {
                id: "08",
                name: "AI Mitigation Action Generation",
                preview:
                    "Generates prioritized, cost-aware mitigation options for each risk with implementation guidance.",
                capability:
                    "Produces practical action alternatives with rough effort, timing, and expected reduction outcomes.",
                subFeatures: [
                    "Multiple options per risk",
                    "Action assignment",
                    "Deadline tracking",
                    "Effectiveness monitoring"
                ],
                example:
                    "For increasing fraud trends, AI proposes several mitigation options with expected impact and delivery timeline so teams can phase implementation by budget.",
                businessValue:
                    "Enables faster, more transparent mitigation decisions with better prioritization."
            },
            {
                id: "09",
                name: "Excel Risk Register Upload with AI Mapping",
                preview:
                    "Bulk-imports risk registers from spreadsheets with intelligent column mapping and score preservation.",
                capability:
                    "Auto-detects field mappings, creates records at scale, and links imported entries to assessment context.",
                subFeatures: [
                    "Column auto-detection",
                    "Score pre-population",
                    "Assessment linking",
                    "Bulk risk creation"
                ],
                example:
                    "During a merger, hundreds of inherited risks from spreadsheets are imported in minutes with mapped fields and retained scoring history.",
                businessValue:
                    "Eliminates manual migration effort and preserves historical risk intelligence."
            },
            {
                id: "10",
                name: "Accept Risk to Risk Register Integration",
                preview:
                    "Accepted compliance gaps can automatically create linked risk register records with full traceability.",
                capability:
                    "Converts accepted findings into structured risks with score mapping, treatment defaults, and link-back references.",
                subFeatures: [
                    "Gap-to-risk linking",
                    "Severity mapping",
                    "Auto-populated risk fields",
                    "End-to-end traceability"
                ],
                example:
                    "A compliance finding is accepted as risk and instantly appears in the risk register with severity, owner context, and evidence link to the source finding.",
                businessValue:
                    "Prevents ownership gaps between compliance and risk teams while preserving audit traceability."
            }
        ]
    },
    {
        id: "compliance",
        tabLabel: "AI Compliance",
        title: "AI Compliance",
        subtitle: "Framework ingestion, evidence workflows, reporting, and compliance operations.",
        features: [
            {
                id: "01",
                name: "AI Framework Document Ingestion (3-Pass Extraction)",
                preview:
                    "Reads regulatory PDFs and DOCX files and extracts structured controls, domains, and requirements.",
                capability:
                    "Uses a 3-pass extraction flow: structure detection, control extraction with IDs, and validation with deduplication.",
                subFeatures: [
                    "Multi-format support (PDF, DOCX)",
                    "Domain detection",
                    "Sub-control extraction",
                    "AI framework classification"
                ],
                example:
                    "A large regulation document is uploaded and AI structures domains and controls in minutes, preserving control IDs and detecting overlaps with existing frameworks.",
                businessValue:
                    "New frameworks become operational quickly instead of requiring weeks of manual decomposition."
            },
            {
                id: "02",
                name: "AI Cross-Framework Control Mapping and Similarity Analysis",
                preview:
                    "Finds semantically similar controls across frameworks so teams can implement once and map many.",
                capability:
                    "Applies similarity scoring and grouping to create normalized control records linked to multiple standards.",
                subFeatures: [
                    "Similarity scoring",
                    "AI grouping",
                    "Normalized control model",
                    "Implement-once approach"
                ],
                example:
                    "Across four frameworks, AI shows where access-control requirements overlap and consolidates implementation and evidence planning.",
                businessValue:
                    "Substantial reduction in duplicate compliance effort for multi-framework organizations."
            },
            {
                id: "03",
                name: "AI Compliance Assessment Parsing",
                preview:
                    "Uploads existing Excel or CSV assessment checklists and maps them into structured compliance records.",
                capability:
                    "Detects file shape, maps columns intelligently, and imports statuses and notes into linked controls.",
                subFeatures: [
                    "Format auto-detection",
                    "Excel and CSV support",
                    "Assessment linking",
                    "Status preservation"
                ],
                example:
                    "An external auditor checklist is uploaded and instantly transformed into trackable compliance work items without duplicate entry.",
                businessValue:
                    "Removes manual copy effort between audit files and internal tracking systems."
            },
            {
                id: "04",
                name: "AI Evidence Assessment and Matching",
                preview:
                    "Scores uploaded evidence against linked controls using explicit, implicit, and inferred matching.",
                capability:
                    "Evaluates coverage quality and cross-framework relevance while flagging missing proof elements.",
                subFeatures: [
                    "Explicit match scoring",
                    "Intent-based matching",
                    "Cross-framework inferred matching",
                    "Quality scoring"
                ],
                example:
                    "A penetration test report is uploaded and mapped to multiple controls across standards while AI highlights a specific missing requirement.",
                businessValue:
                    "Improves evidence reuse and catches coverage gaps before formal audit review."
            },
            {
                id: "05",
                name: "AI Evidence Requirements Generation",
                preview:
                    "Generates exact evidence requirements per control with suggested document types and naming examples.",
                capability:
                    "Builds control-specific evidence checklists with required content and practical file expectations.",
                subFeatures: [
                    "Evidence type specification",
                    "Content requirement guidance",
                    "Example filenames",
                    "Review workflow support"
                ],
                example:
                    "For a logging control, AI recommends exactly what screenshots, reports, policies, and extracts to collect and how to package them.",
                businessValue:
                    "Prevents audit surprises by making evidence requirements explicit from day one."
            },
            {
                id: "06",
                name: "AI Compliance Gap Prioritization",
                preview:
                    "Ranks gaps by regulatory impact, severity, remediation complexity, and timeline urgency.",
                capability:
                    "Uses multi-factor prioritization to identify what should be remediated first for highest risk reduction.",
                subFeatures: [
                    "Severity ranking",
                    "Effort estimation",
                    "Deadline awareness",
                    "Remediation recommendations"
                ],
                example:
                    "After assessment, AI surfaces critical gaps due in 30 days and separates medium-priority documentation fixes for later waves.",
                businessValue:
                    "Focuses limited remediation capacity on highest-impact gaps first."
            },
            {
                id: "07",
                name: "Multi-Tier Evidence Approval Workflow",
                preview:
                    "Runs sequential review and approval chains for evidence with full timeline and audit trail.",
                capability:
                    "Supports configurable reviewer order, approve or reject actions, and complete timestamped change history.",
                subFeatures: [
                    "Multi-step review chains",
                    "Reviewer assignment",
                    "Status tracking",
                    "Pending review dashboards",
                    "Full audit trail"
                ],
                example:
                    "Evidence passes through security, compliance, and executive approval with tracked revisions, comments, and final sign-off records.",
                businessValue:
                    "Demonstrates robust internal control over evidence quality and approvals."
            },
            {
                id: "08",
                name: "Compliance Calendar and Deadline Management",
                preview:
                    "A unified calendar for deadlines, assessment cycles, certification windows, and recurring compliance events.",
                capability:
                    "Combines obligations into one timeline with reminders, overdue tracking, and framework-level filtering.",
                subFeatures: [
                    "Month and list views",
                    "Color-coded events",
                    "Framework filters",
                    "Recurring schedule support",
                    "Overdue escalation"
                ],
                example:
                    "Quarterly scans, annual reports, surveillance audits, and training deadlines are tracked in one calendar with automated reminder cadence.",
                businessValue:
                    "Reduces missed deadlines and enables proactive preparation."
            },
            {
                id: "09",
                name: "Comprehensive Compliance Reporting (24 Reports plus Excel Export)",
                preview:
                    "A centralized reports center with pre-built reports across modules and formatted export endpoints.",
                capability:
                    "Aggregates cross-module compliance data into one-click reports suitable for internal and regulatory audiences.",
                subFeatures: [
                    "Risk management reports",
                    "Compliance posture reports",
                    "Governance reports",
                    "ERM reports",
                    "Evidence reports"
                ],
                example:
                    "When regulators request posture evidence quickly, teams generate consolidated framework summaries, gap reports, and export-ready files in minutes.",
                businessValue:
                    "Cuts reporting response from days to minutes with consistent output quality."
            },
            {
                id: "10",
                name: "Enriched Executive Dashboard (10 Tabs)",
                preview:
                    "Ten specialized dashboards deliver multi-dimensional GRC visibility with AI-generated insights and anomaly alerts.",
                capability:
                    "Combines governance, risk, and compliance metrics with AI commentary that highlights trends and emerging issues.",
                subFeatures: [
                    "Overview",
                    "Governance",
                    "Risk",
                    "Compliance",
                    "Executive risk",
                    "Compliance health",
                    "Risk treatment",
                    "Incident dashboard",
                    "Control testing",
                    "Regulatory impact"
                ],
                example:
                    "Before executive reviews, leadership sees trend movement, delayed remediation, and approaching threshold breaches in one live view.",
                businessValue:
                    "Replaces manual monthly report assembly with real-time, decision-ready visibility."
            }
        ]
    }
];
