/* ComplyVerse AI v5 — product content (Audit Management removed; Auditor Portal elevated) */
window.CV = window.CV || {};

CV.STORY = [
  {
    id: 'birth',
    kicker: 'Chapter 01 · Begin',
    title: 'Your organization. Understood as one.',
    body: 'Scroll the camera through a Digital Risk Twin atrium—volumetric light, architectural depth, and holograms as every platform capability unfolds in one continuous story.',
    cta: null
  },
  {
    id: 'fragment',
    kicker: 'Chapter 02 · The cost of silence',
    title: 'Risk goes dark when signals stay siloed.',
    body: 'Policies in one tool. Evidence in another. Scanners somewhere else. Boards never see the path from finding to obligation.',
    cta: null
  },
  {
    id: 'twin',
    kicker: 'Chapter 03 · Digital Risk Twin',
    title: 'Watch every link light up.',
    body: 'Regulation → policy → control → evidence → asset → vulnerability → risk → Auditor Portal → board. One graph. One truth.',
    cta: null
  },
  {
    id: 'atlas',
    kicker: 'Chapter 04 · Platform Atlas',
    title: 'Nineteen stations. One operating model.',
    body: 'Fly through the living org twin—Govern, Assure, Risk, Secure, Orchestrate. Click a station for depth. Auditor Portal is elevated for certification journey review.',
    cta: { href: '#atlas-stage', label: 'Explore stations' }
  },
  {
    id: 'secure',
    kicker: 'Chapter 05 · Secure the real estate',
    title: 'Cyber signals meet business impact.',
    body: 'Assets, multi-scanner vulns with EPSS, vendors, and access reviews—prioritized by criticality, not severity alone.',
    cta: null
  },
  {
    id: 'ai',
    kicker: 'Chapter 06 · Orchestrate with AI',
    title: 'AI recommends. Humans approve.',
    body: 'Watch agent paths travel the twin edges. ComplyChat, workflow drafting, and the Auditor Portal review run stay tenant-scoped, explainable, and attributable.',
    cta: { href: '#ai-stage', label: 'Run an agent path' }
  },
  {
    id: 'industry',
    kicker: 'Chapter 07 · Operating stories',
    title: 'Same twin. Different industries.',
    body: 'Illustrative journeys for banking, government, energy, healthcare, technology, and retail—not customer claims.',
    cta: null
  },
  {
    id: 'compare',
    kicker: 'Chapter 08 · Capability signal',
    title: 'See where the twin pulls ahead.',
    body: 'A holographic comparison plane in the world itself—directional evaluation including Auditor Portal / certification review.',
    cta: { href: '#compare-stage', label: 'Open comparison' }
  },
  {
    id: 'experience',
    kicker: 'Chapter 09 · Product planes',
    title: 'Touch the screens inside the twin.',
    body: 'Interactive product planes for Dashboard, Auditor Portal, Control Library, Evidence, and more. Illustrated by default; live when the app is running.',
    cta: { href: '#exp-stage', label: 'Browse modules' }
  },
  {
    id: 'arrive',
    kicker: 'Chapter 10 · Arrive',
    title: 'See your risk picture as one.',
    body: 'Request a tailored demonstration for your industry and mandatory frameworks—NCA, SAMA, PDPL, and beyond.',
    cta: { href: 'mailto:hello@complyverse.com', label: 'Request demonstration' }
  }
];

CV.CHAPTER_FOCUS = {
  atlas: { progress: 0.33, label: 'Platform Atlas' },
  ai: { progress: 0.55, label: 'AI roles' },
  compare: { progress: 0.72, label: 'Compare' },
  experience: { progress: 0.85, label: 'Experience' },
  twin: { progress: 0.22, label: 'Digital Risk Twin' },
  industry: { progress: 0.62, label: 'Industries' }
};

CV.CAPABILITIES = [
  {id:'governance',mission:'govern',num:'01',title:'Governance & Policy',tag:'Policy lifecycle to accountable governance',features:['Policy drafting, review, approval, publication and archive','Version history, scheduled reviews and document mappings','Attestations, campaigns, reminders and escalation chains','Regulatory changes, committees, meetings and oversight actions','Applicability decisions, policy exceptions and reporting'],ai:'Draft policies from framework context; extract statements; analyze gaps; generate committee charters.',useCase:'Operationalize a new regulatory obligation across policies, committees and owners.',example:'A Saudi bank receives a SAMA circular. ComplyVerse parses the change, identifies affected policies and routes approved actions to control owners.',outcome:'Faster regulatory response with a complete decision trail.'},
  {id:'frameworks',mission:'govern',num:'02',title:'Framework Intelligence',tag:'Turn any standard into a working program',features:['Framework inventory and hierarchical controls','Upload, parsing, classification and control extraction','Mandatory versus advisory interpretation','Alignment, assessment, evidence requirements and publishing','Global, GCC and custom framework support'],ai:'Parse regulatory documents, extract controls and generate evidence expectations.',useCase:'Convert a newly issued framework into an assessable control program.',example:'A government entity uploads an updated national standard; domains map to NCA ECC overlaps automatically.',outcome:'New requirements become operational without spreadsheet translation.'},
  {id:'compliance',mission:'govern',num:'03',title:'Compliance Assessments',tag:'Statement-level status and evidence workflow',features:['Assessment template upload and structured parsing','Statement-level compliance status and ownership','Evidence upload, linkage, review and approvals','Pending approvals, history, updates and export','Compliance dashboards and assessment types'],ai:'Generate assessment context and tailored evidence recommendations.',useCase:'Run a regulated assessment with multi-level approval.',example:'A healthcare group launches a PDPL assessment across five business units with AI-recommended proof.',outcome:'Consistent assessments with less interpretation variance.'},
  {id:'projects',mission:'govern',num:'04',title:'IS Projects & Certification',tag:'Manage compliance transformation as a program',features:['Certification journeys and implementation tracking','Project dashboards, ownership and progress','Gap remediation and evidence review','Priority and status reporting','Task and issue linkage'],ai:'Recommend priorities through connected control and assessment engines.',useCase:'Coordinate a multi-team certification program.',example:'ISO 27001 gaps become a phased plan with evidence attached for the steering committee.',outcome:'Certification work becomes an accountable program.'},
  {id:'controls',mission:'assure',num:'05',title:'Unified Control Library',tag:'Map once. Reuse across every obligation.',features:['Normalized control creation and hierarchy','AI mapping, control groups and inheritance','Cross-framework mapping and coverage matrix','Evidence requirements and recommendations','Gap analysis, comparison, review and export'],ai:'Propose mappings, group equivalent controls and recommend evidence.',useCase:'Replace duplicate framework controls with one enterprise model.',example:'Access-control requirements across ISO, PCI, NCA ECC and SAMA map to one internal control.',outcome:'Lower testing duplication and clearer coverage.'},
  {id:'evidence',mission:'assure',num:'06',title:'Evidence Intelligence',tag:'Know whether proof is relevant, sufficient and current',features:['Central evidence intake and lifecycle','OCR and document content extraction','Control and cross-module linkage','Quality, freshness and expiration tracking','Reusable evidence and package assembly'],ai:'Deep-assess proof; detect weak evidence; discover cross-framework reuse.',useCase:'Validate that evidence actually demonstrates the required control.',example:'A backup report is OCR-scored and reused for ISO, NCA and reviewer requests.',outcome:'Evidence becomes assurance intelligence.'},
  {id:'auditor',mission:'assure',num:'07',title:'Auditor Portal',tag:'Certification review without inbox chaos',features:['Journey-scoped workspace for external and internal auditors','Overview of controls, evidence mix, documents, risks and assets','Controls spine with applicability, implementation and full requirement text','Evidence queue with preview, approve and reject notes','One-click auto-approve for non-critical in-scope controls','Shareable deep links to the exact journey and tab','Tenant-guarded access to the same system of record'],ai:'Surfaces connected control and evidence context so reviewers decide faster without leaving the platform.',useCase:'Give auditors a governed path through a certification journey instead of email attachments.',example:'An external ISO auditor opens a journey, scans readiness gauges, walks controls, approves evidence packages and shares a tab link with a peer—all inside the tenant boundary.',outcome:'Cleaner certification reviews with decisions that stick to the operational record.'},
  {id:'erm',mission:'risk',num:'08',title:'Enterprise Risk Management',tag:'Live risk context from register to scenario',features:['Risk registers, scoring, reviews and dependencies','KRIs, thresholds, measurements and alerts','Incidents, corrective actions and mitigation plans','Risk appetite, tolerance and internal controls','Heatmaps, aggregation, Bow-Tie and scenario analysis'],ai:'Suggest descriptions, scores, KRIs and treatments; explain scenarios.',useCase:'Connect operating signals to enterprise exposure.',example:'OT control failures update risk, trigger a KRI and model disruption for CRO review.',outcome:'Leadership sees current exposure with evidence behind the decision.'},
  {id:'rcsa',mission:'risk',num:'09',title:'RCSA',tag:'Structured self-assessment at enterprise scale',features:['RCSA templates and campaigns','Distributed responses and guidance','Findings, approvals and remediation','Department and business-unit rollups'],ai:'Suggest questions and evidence expectations.',useCase:'Run consistent self-assessments across departments.',example:'A regional bank launches quarterly RCSA for operations, treasury and digital banking.',outcome:'Comparable results with first-line accountability.'},
  {id:'bcm',mission:'risk',num:'10',title:'Business Continuity',tag:'Plans, drills and operational resilience',features:['Business-continuity plans','Drill planning, execution and results','Critical-service continuity context','Corrective actions and follow-up'],ai:'Connected risk context supports prioritization narratives.',useCase:'Prove critical services survive realistic disruption.',example:'A payments outage drill links unmet recovery objectives back to operational risks.',outcome:'Continuity plans are tested and connected to improvement.'},
  {id:'issues',mission:'risk',num:'11',title:'Issues, Tasks & Actions',tag:'Close the loop on every finding',features:['Central issue register','Personal work queues and SLAs','Escalation and overdue reporting','Cross-module remediation linkage'],ai:'Receives remediation recommendations from connected engines.',useCase:'Standardize remediation regardless of origin.',example:'Weak evidence, portal findings and vulns create governed actions in one queue.',outcome:'Fewer orphaned findings.'},
  {id:'vulnerabilities',mission:'secure',num:'12',title:'Vulnerability Governance',tag:'Prioritize by business impact',features:['Multi-report ingestion and register','Cross-scanner normalization and deduplication','CVSS, EPSS, aging and trends','Asset, department and control linkage','SLAs, exceptions, retest and closure'],ai:'Summarize posture and recommend fixes.',useCase:'Move beyond severity-only remediation.',example:'Qualys and Tenable findings dedupe; EPSS meets asset criticality; payments SLA shortens.',outcome:'Teams fix what matters first—and can explain why.'},
  {id:'assets',mission:'secure',num:'13',title:'Assets & Risk Posture',tag:'Infrastructure linked to services and controls',features:['IT asset inventory and lifecycle','CIA criticality assessments','Control, evidence and vulnerability links','Windows, Linux, network, database, cloud and Kubernetes discovery'],ai:'Recommend CIA ratings; enrich asset risk context.',useCase:'See how an asset drives coverage and exposure.',example:'A production database joins payment service context and CIS/PCI assessments.',outcome:'A trusted foundation for cyber risk and compliance.'},
  {id:'vendors',mission:'secure',num:'14',title:'Third-Party Risk',tag:'Onboarding through offboarding',features:['Vendor inventory and segmentation','Questionnaires, assessments and evidence exchange','Findings and approval workflows','Continuous monitoring and risk 360'],ai:'Support assessment analysis and risk summaries.',useCase:'Apply diligence proportional to criticality.',example:'A payroll SaaS vendor resolves findings and stays under continuous review.',outcome:'Faster onboarding with evidence-based governance.'},
  {id:'access',mission:'secure',num:'15',title:'Access Reviews & Identity',tag:'Prove access remains appropriate',features:['Access-review campaigns','Identity and application connections','Manager and owner decisions','Exception and remediation tracking'],ai:'Focus attention on risky entitlement patterns.',useCase:'Certify privileged access periodically.',example:'Entra ID and Active Directory feed a privileged-access campaign.',outcome:'Defensible certification without spreadsheets.'},
  {id:'workflow',mission:'orchestrate',num:'16',title:'Workflow Engine',tag:'Governance intent as executable process',features:['Visual definitions and versioning','Events, triggers, conditions and branching','Approvals, timers, escalations and notifications','Module action catalog and integrations'],ai:'Draft workflows from natural language for admin validation.',useCase:'Automate multi-domain governance processes.',example:'Expired critical evidence notifies, tasks, escalates and updates readiness—AI drafts; humans publish.',outcome:'Repeatable automation without hard-coding.'},
  {id:'complychat',mission:'orchestrate',num:'17',title:'ComplyChat',tag:'Ask live GRC data in business language',features:['Tenant-scoped Q&A','SQL-first grounded answers','Session context and history','Source-linked operational answers'],ai:'Translate questions into authorized, data-grounded answers.',useCase:'Instant answers without assembled reports.',example:'A CRO asks which critical risks sit outside appetite due to overdue vulns—and opens the sources.',outcome:'Faster decisions with traceability.'},
  {id:'integrations',mission:'orchestrate',num:'18',title:'Integrations & Discovery',tag:'Bring operational signals into the model',features:['Cloud, identity, ITSM and security connectors','AWS, Azure, GCP and Kubernetes','Endpoint and database discovery','ServiceNow, Splunk, Teams and webhooks'],ai:'Normalizes discovered context for downstream use.',useCase:'Stop relying only on manual uploads.',example:'Azure and Entra connections enrich assets, identities and assessments.',outcome:'More current GRC data.'},
  {id:'admin',mission:'orchestrate',num:'19',title:'Secure Administration',tag:'Tenant boundaries and traceability',features:['Organization and tenant provisioning','Users, roles and fine-grained permissions','SSO and identity administration','Audit logs for critical actions','Agents and platform configuration'],ai:'AI inherits tenant scope and permissions; actions stay attributable.',useCase:'Operate GRC with segregation of duties.',example:'A group provisions tenants, assigns module permissions and monitors critical changes.',outcome:'Enterprise governance of the platform itself.'}
];

CV.MISSIONS = {
  govern: { label: 'Govern', color: '#0057ff' },
  assure: { label: 'Assure', color: '#0057ff' },
  risk: { label: 'Manage risk', color: '#0057ff' },
  secure: { label: 'Secure', color: '#0057ff' },
  orchestrate: { label: 'Orchestrate', color: '#0057ff' }
};

CV.AI_SCENARIOS = {
  regulatory: { kicker: 'REGULATORY ANALYST', title: 'From circular to approved tasks.', text: 'Interpret obligations, map to controls and prepare impact for human review.', steps: [['Ingest', 'Regulation'], ['Extract', 'Controls'], ['Connect', 'Policies'], ['Recommend', 'Gaps'], ['Approve', 'Human']], path: ['reg', 'pol', 'ctl', 'ev', 'board'] },
  evidence: { kicker: 'EVIDENCE INSPECTOR', title: 'From upload to cross-framework assurance.', text: 'OCR and matching score relevance, sufficiency and reuse.', steps: [['Read', 'OCR'], ['Assess', 'Match'], ['Score', 'Quality'], ['Reuse', 'Controls'], ['Review', 'Owner']], path: ['ev', 'ctl', 'ast', 'risk', 'board'] },
  risk: { kicker: 'RISK ADVISOR', title: 'From signals to explainable decisions.', text: 'KRIs, incidents and failures analyzed together for treatment options.', steps: [['Monitor', 'Signals'], ['Detect', 'Breaches'], ['Model', 'Scenario'], ['Advise', 'Treatment'], ['Decide', 'Owner']], path: ['vul', 'ast', 'risk', 'ctl', 'board'] },
  auditor: { kicker: 'AUDITOR PORTAL', title: 'From journey to reviewer decision.', text: 'Certification journey overview, controls spine and evidence queue—approve or reject in the system of record.', steps: [['Open', 'Journey'], ['Scan', 'Readiness'], ['Walk', 'Controls'], ['Review', 'Evidence'], ['Decide', 'Approve / reject']], path: ['ctl', 'ev', 'audit', 'risk', 'board'] },
  workflow: { kicker: 'WORKFLOW ARCHITECT', title: 'From intent to governed automation.', text: 'Natural language becomes draft triggers, approvals and timers.', steps: [['Describe', 'Rule'], ['Generate', 'Draft'], ['Validate', 'Permissions'], ['Publish', 'Version'], ['Monitor', 'Runs']], path: ['pol', 'ctl', 'ev', 'risk', 'board'] },
  chat: { kicker: 'COMPLYCHAT', title: 'From question to source-linked facts.', text: 'Tenant-scoped answers grounded in live platform data.', steps: [['Ask', 'Language'], ['Authorize', 'Role'], ['Query', 'Data'], ['Explain', 'Context'], ['Open', 'Sources']], path: ['board', 'risk', 'vul', 'ctl', 'ev'] }
};

CV.INDUSTRIES = {
  banking: { label: 'Banking & financial services', title: 'Connect prudential, cyber and operational risk.', scenario: 'A payments vulnerability hits an internet-facing server while SAMA evidence nears expiry.', flow: ['Vulnerability deduped with EPSS', 'Asset criticality maps payment impact', 'SAMA, PCI and NCA controls link', 'Risks recalculate', 'SLA and executive brief open'], result: 'Security, risk and compliance act from one context.' },
  government: { label: 'Government & public sector', title: 'National mandates become provable execution.', scenario: 'An updated NCA requirement must be evidenced before regulatory review.', flow: ['Framework AI-parsed', 'Obligations map to controls', 'Applicability assigned', 'Evidence tasks generated', 'Auditor Portal opens for controlled review'], result: 'Clause-to-evidence traceability for reviewers.' },
  energy: { label: 'Energy & critical infrastructure', title: 'OT exposure meets operational resilience.', scenario: 'A control failure on a critical OT asset threatens continuity.', flow: ['Dependencies expose service impact', 'Vulns and controls link', 'KRI triggers ERM', 'Scenario explains exposure', 'BCM actions schedule'], result: 'Technical risk in continuity language.' },
  health: { label: 'Healthcare', title: 'Protect data while sustaining care.', scenario: 'A clinical SaaS vendor reports an incident involving patient data.', flow: ['Vendor 360 updates', 'Exposure mapped to PDPL', 'Actions and evidence requests issue', 'Leadership gets a traceable brief'], result: 'Privacy, vendor and continuity share one view.' },
  technology: { label: 'Technology & cloud', title: 'Scale certifications without duplicate work.', scenario: 'Expand from ISO 27001 into SOC 2 and PCI.', flow: ['Frameworks enter the library', 'Controls AI-mapped', 'Evidence reused', 'Gaps become projects', 'Auditor Portal packages the journey'], result: 'More coverage, less repeated testing.' },
  retail: { label: 'Retail & e-commerce', title: 'Protect transactions across the chain.', scenario: 'A POS vendor has overdue remediation on cardholder controls.', flow: ['Vendor event raises', 'PCI controls identified', 'Exception workflow runs', 'Appetite and SLA review', 'Readiness updates'], result: 'Commercial risk and payment security aligned.' }
};

CV.FRAMEWORKS = ['NCA ECC', 'SAMA CSF', 'PDPL', 'ISO 27001', 'NIST CSF', 'PCI DSS', 'SOC 2', 'GDPR', 'DORA', 'CIS Benchmarks', 'HIPAA', 'Aramco CCC'];

CV.TWIN_NODES = [
  { id: 'reg', label: 'Regulation', color: '#0057ff' },
  { id: 'pol', label: 'Policy', color: '#12d8ff' },
  { id: 'ctl', label: 'Control', color: '#0057ff' },
  { id: 'ev', label: 'Evidence', color: '#12d8ff' },
  { id: 'ast', label: 'Asset', color: '#e8a030' },
  { id: 'vul', label: 'Vulnerability', color: '#e8a030' },
  { id: 'risk', label: 'Risk', color: '#e8a030' },
  { id: 'board', label: 'Board', color: '#0A0A0A' },
  { id: 'audit', label: 'Auditor Portal', color: '#0057ff' }
];

CV.TWIN_EDGES = [
  ['reg', 'pol'], ['pol', 'ctl'], ['ctl', 'ev'], ['ctl', 'ast'],
  ['ast', 'vul'], ['vul', 'risk'], ['ev', 'risk'], ['risk', 'board'],
  ['ctl', 'risk'], ['ev', 'audit'], ['ctl', 'audit'], ['audit', 'board']
];

CV.LIVE_ROUTES = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', blurb: 'Executive posture across risk, compliance, and cyber signals.', spots: ['Risk heatmap', 'Open actions', 'Framework readiness'], kpis: ['92% control coverage', '14 critical risks', '3 overdue vulns'] },
  { id: 'governance', label: 'Governance', path: '/governance', blurb: 'Policy lifecycle, attestations, committees, and regulatory change.', spots: ['Policy versions', 'Attestation campaigns', 'Change queue'], kpis: ['48 policies live', '6 pending approvals', '2 circulars'] },
  { id: 'frameworks', label: 'Frameworks', path: '/frameworks', blurb: 'Inventory, parse, and publish NCA ECC, SAMA CSF, PDPL, and global standards.', spots: ['Domain tree', 'Mandatory flags', 'Publish status'], kpis: ['12 frameworks', 'NCA ECC mapped', 'PDPL active'] },
  { id: 'controls', label: 'Control library', path: '/control-library', blurb: 'Map once—reuse controls across every obligation with AI grouping.', spots: ['Coverage matrix', 'AI mapping', 'Evidence reqs'], kpis: ['1,240 controls', '68% multi-map', '112 gaps'] },
  { id: 'evidence', label: 'Evidence', path: '/evidence', blurb: 'OCR, quality, freshness, and cross-framework reuse of proof.', spots: ['Intake queue', 'Quality scores', 'Expiry alerts'], kpis: ['860 packages', '94% fresh', '18 expiring'] },
  { id: 'auditor', label: 'Auditor Portal', path: '/auditor-portal', blurb: 'Journey-scoped certification review—controls spine and evidence queue.', spots: ['Readiness gauges', 'Approve / reject', 'Shareable tabs'], kpis: ['ISO journey', '41 in scope', '12 pending'] },
  { id: 'erm', label: 'ERM', path: '/erm', blurb: 'Registers, KRIs, Bow-Tie, and scenario analysis for current exposure.', spots: ['Heatmap', 'KRI breaches', 'Treatments'], kpis: ['5×5 matrix', '7 KRIs red', '3 scenarios'] },
  { id: 'rcsa', label: 'RCSA', path: '/erm/rcsa/assessments', blurb: 'Distributed self-assessments with findings and department rollups.', spots: ['Campaign progress', 'Responses', 'Findings'], kpis: ['Q2 campaign', '86% complete', '22 findings'] },
  { id: 'vulns', label: 'Vulnerabilities', path: '/vulnerabilities', blurb: 'Multi-scanner ingest with EPSS and asset-criticality prioritization.', spots: ['Deduped register', 'EPSS × CIA', 'SLA clocks'], kpis: ['1,102 open', 'EPSS top 20', 'Payments SLA'] },
  { id: 'assets', label: 'Assets', path: '/assets', blurb: 'Infrastructure linked to services, controls, and vulnerability posture.', spots: ['Inventory', 'CIA ratings', 'Dependencies'], kpis: ['4.2k assets', '312 critical', 'Cloud + OT'] },
  { id: 'vendors', label: 'Vendors', path: '/vendor-risk', blurb: 'Onboarding through offboarding with questionnaires and risk 360.', spots: ['Tiering', 'Questionnaires', 'Monitoring'], kpis: ['186 vendors', '24 high risk', '9 overdue'] },
  { id: 'workflow', label: 'Workflow', path: '/workflow-engine', blurb: 'Visual definitions—triggers, approvals, timers, and module actions.', spots: ['Canvas', 'Versions', 'Run history'], kpis: ['31 published', 'AI drafts', '12 running'] },
  { id: 'chat', label: 'ComplyChat', path: '/complychat', blurb: 'Ask live GRC data in business language—source-linked answers.', spots: ['Session history', 'SQL-grounded', 'Open sources'], kpis: ['Tenant-scoped', 'Role-aware', 'Traceable'] }
];

/* Expanded from v3 workbook + Auditor Portal / GCC emphasis */
CV.COMPARE_ROWS = [
  ['gov', 'Policy lifecycle', '✓', '✓', '✓', '◐', '◐', '◐', '✓'],
  ['gov', 'Document management & versioning', '✓', '✓', '✓', '◐', '○', '◐', '✓'],
  ['gov', 'Regulatory change + AI impact', '✓', '✓', '◐', '✓', '✕', '○', '◐'],
  ['gov', 'Committees and attestations', '✓', '◐', '◐', '✕', '✕', '✕', '◐'],
  ['risk', 'Risk register and assessment', '✓', '✓', '✓', '✕', '◐', '◐', '✓'],
  ['risk', '5×5 inherent/residual heatmap', '✓', '◐', '◐', '✕', '✕', '✕', '◐'],
  ['risk', 'KRIs with threshold alerts', '✓', '✓', '✓', '✕', '✕', '✕', '◐'],
  ['risk', 'Bow-Tie and scenarios', '✓', '◐', '◐', '✕', '✕', '✕', '✕'],
  ['risk', 'RCSA campaigns', '✓', '✓', '✓', '✕', '✕', '✕', '◐'],
  ['comp', 'Multi-framework support', '✓', '✓', '✓', '◐', '✓', '✓', '✓'],
  ['comp', 'Cross-framework AI mapping', '✓', '◐', '✓', '◐', '◐', '✓', '◐'],
  ['comp', 'AI gap analysis by impact', '✓', '◐', '◐', '◐', '◐', '✓', '✓'],
  ['comp', 'Statement-level assessments', '✓', '◐', '◐', '◐', '✕', '✕', '◐'],
  ['comp', 'GCC frameworks (NCA / SAMA / PDPL)', '✓', '◐', '○', '○', '○', '✓', '✓'],
  ['assure', 'Auditor Portal / certification review', '✓', '◐', '◐', '✕', '✕', '✕', '◐'],
  ['assure', 'Journey-scoped evidence approve/reject', '✓', '◐', '○', '✕', '✕', '✕', '○'],
  ['vuln', 'Multi-scanner ingestion', '✓', '◐', '✕', '✕', '◐', '✕', '✕'],
  ['vuln', 'Cross-scanner deduplication', '✓', '✕', '✕', '✕', '✕', '✕', '✕'],
  ['vuln', 'EPSS prioritization', '✓', '✕', '✕', '✕', '✕', '✕', '✕'],
  ['vuln', 'SLA by department / criticality', '✓', '○', '✕', '✕', '✕', '✕', '◐'],
  ['ai', 'Conversational GRC assistant', '✓', '✕', '◐', '✕', '✕', '✕', '✕'],
  ['ai', 'AI policy analysis', '✓', '○', '◐', '◐', '✕', '◐', '◐'],
  ['ai', 'Agentic AI + human approval', '✓', '✕', '◐', '✕', '✕', '✕', '✕'],
  ['ai', 'AI control grouping / mapping', '✓', '✕', '◐', '✕', '✕', '◐', '◐'],
  ['flow', 'No-code workflow builder', '✓', '◐', '◐', '✕', '✕', '✕', '◐'],
  ['flow', 'Triggers, approvals, timers, webhooks', '✓', '◐', '◐', '✕', '✕', '○', '◐'],
  ['flow', 'Version history & analytics', '✓', '◐', '◐', '✕', '✕', '✕', '◐'],
  ['evidence', 'Evidence library with OCR', '✓', '◐', '◐', '✕', '◐', '◐', '◐'],
  ['evidence', 'Quality and expiration tracking', '✓', '○', '○', '✕', '✕', '✕', '✕'],
  ['evidence', 'Control linkage & coverage', '✓', '✓', '✓', '◐', '◐', '◐', '✓'],
  ['evidence', 'Audit-ready packaging', '✓', '✓', '✓', '✕', '✕', '✕', '✓']
];

CV.COMPARE_VENDORS = ['ComplyVerse', 'Legacy Suite A', 'Legacy Suite B', 'Point Tool A', 'Point Tool B', 'Regional GRC A', 'Regional GRC B'];

CV.COMPARE_CATEGORIES = {
  gov: 'Governance',
  risk: 'Risk',
  comp: 'Compliance',
  assure: 'Assure',
  vuln: 'Vulnerabilities',
  ai: 'AI',
  flow: 'Workflow',
  evidence: 'Evidence'
};

CV.NODE_LABEL = Object.fromEntries((CV.TWIN_NODES || []).map((n) => [n.id, n.label]));

/* ===================================================================
   v6 append — "Inside the Twin"
   Region variants (GCC ⇄ Global) + floating product-screen content.
   Nothing above this line changed; deep-dive pages keep working.
   =================================================================== */

CV.REGION = {
  default: 'gcc',
  frameworks: {
    gcc: ['NCA ECC', 'SAMA CSF', 'PDPL', 'Aramco CCC', 'ISO 27001', 'NIST CSF'],
    global: ['ISO 27001', 'NIST CSF', 'SOC 2', 'PCI DSS', 'GDPR', 'DORA']
  },
  /* Executive dashboard readiness bars per region */
  readiness: {
    gcc: [['NCA ECC', 86], ['SAMA CSF', 79], ['PDPL', 91], ['ISO 27001', 84]],
    global: [['ISO 27001', 84], ['SOC 2', 77], ['PCI DSS', 82], ['NIST CSF', 74]]
  },
  scope: {
    gcc: 'Riyadh HQ · SAMA-regulated group · national mandates',
    global: 'Multi-cert estate · ISO / SOC 2 / PCI program'
  }
};

CV.PRODUCT_SCREENS = {
  dashboard: {
    title: 'Executive Dashboard',
    path: '/dashboard',
    capability: 'erm',
    /* 5×5 risk matrix counts — rows top→bottom = impact 5→1, cols = likelihood 1→5 */
    heat: [
      [0, 1, 3, 4, 3],
      [1, 2, 4, 2, 2],
      [2, 3, 5, 2, 0],
      [3, 4, 2, 1, 0],
      [5, 3, 1, 0, 0]
    ],
    inherent: [0, 3], /* impact 5 × likelihood 4 — before treatment */
    residual: [2, 1], /* impact 3 × likelihood 2 — after treatment */
    actions: [
      ['Renew PDPL DPIA evidence — data lake', 'due 3d'],
      ['Privileged access review · 12 decisions', 'overdue'],
      ['Patch CVE-2025-1094 on payments edge', 'SLA 38h']
    ]
  },
  auditor: {
    title: 'Auditor Portal',
    path: '/auditor-portal',
    capability: 'auditor',
    journey: 'ISO 27001:2022 · Journey J-114',
    inScope: 41,
    pending: 12,
    gauges: [['Controls', 86], ['Evidence', 78], ['Overall', 82]],
    /* [control id, applicability, implementation %, requirement snippet] */
    spine: [
      ['A.5.1', 'Applicable', 92, 'Policies for information security shall be defined, approved by management and reviewed…'],
      ['A.8.8', 'Applicable', 76, 'Information about technical vulnerabilities of systems in use shall be obtained and evaluated…'],
      ['A.5.30', 'Partial', 64, 'ICT readiness shall be planned, implemented and tested based on business-continuity objectives…']
    ],
    /* [evidence id, label, OCR quality 0..1] */
    evidence: [
      ['EV-2214', 'Backup restore test — Q2 report', 0.94],
      ['EV-2198', 'Privileged access review export', 0.88],
      ['EV-2183', 'Firewall rule recertification', 0.91]
    ]
  },
  chat: {
    title: 'ComplyChat',
    path: '/complychat',
    capability: 'complychat',
    question: 'Which critical risks sit outside appetite due to overdue vulns?',
    answer: '3 critical risks exceed appetite: PAY-04 (payment switch), OT-11 (plant historian), DR-02 (DR replication). Each carries ≥1 vulnerability past SLA with EPSS ≥ 0.62 on a criticality-H asset.',
    sources: ['risk_register', 'vuln_findings', 'appetite_thresholds'],
    steps: ['Ingest', 'Extract', 'Connect', 'Recommend', 'Approve'],
    stepNote: 'Human-in-the-loop — nothing publishes without an owner decision.'
  },
  vulns: {
    title: 'Vulnerabilities',
    path: '/vulnerabilities',
    capability: 'vulnerabilities',
    /* [CVE, scanners, CVSS, EPSS %, CIA, SLA, severity class, deduped] */
    rows: [
      ['CVE-2025-1094', 'Qualys + Tenable', '9.8', 91, 'H·H·H', '38h', 'crit', true],
      ['CVE-2024-3400', 'Tenable', '10.0', 87, 'H·M·H', '3d', 'high', false],
      ['CVE-2025-0282', 'Qualys', '9.0', 64, 'M·M·M', '6d', 'med', false],
      ['CVE-2023-44487', 'Tenable', '7.5', 55, 'L·M·H', '9d', 'med', false]
    ],
    note: 'EPSS × CIA ranks PAY-EDGE-02 above 41 higher-CVSS findings.',
    assetsCapability: 'assets'
  }
};
