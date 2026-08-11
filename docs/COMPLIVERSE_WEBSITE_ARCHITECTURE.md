# CompliVerse AI Website Architecture

Status: Evidence-based draft  
Product sources reviewed: `D:\complywerse_ai` product documentation, backend modules, connector registry, and current marketing site  
Primary constraint: Do not publish certifications, customer outcomes, framework counts, integration availability, or AI data-handling claims until they are verified by the business.

## 1. Data Flow Summary

CompliVerse is best explained as a governed assurance loop:

`Source material -> Structured obligations -> Connected assurance model -> Human decision -> Governed action -> Continuous oversight`

The platform combines deterministic application workflows with assistive AI. AI reads, extracts, recommends, scores, maps, and drafts. People retain authority over approvals, publishing, risk acceptance, exceptions, and other governed decisions.

### Stage 1: Bring in source material

**What goes in**

- Framework files, policies, standards, regulatory documents, and assessment templates
- Evidence files and manual evidence records
- Risk, incident, asset, vulnerability, audit, and control records
- Data from configured scanners, cloud sources, ticketing systems, SIEM tools, and collaboration tools

**What the system does**

- Authenticates the user and resolves the tenant
- Checks role and module permissions
- Stores records inside the tenant's data boundary
- Preserves source, owner, status, version, and timestamps

**What AI does**

- OCR and content extraction where enabled
- Document classification and structured extraction where enabled
- Initial recommendations for likely relationships

**What comes out**

- Searchable, tenant-scoped source records ready for review and mapping

**Primary roles**

- Compliance analyst
- Control or evidence owner
- Security analyst
- Risk analyst
- Auditor

### Stage 2: Parse and normalize

**What goes in**

- Uploaded frameworks, policy documents, assessments, evidence, scanner findings, and operational records

**What the system does**

- Converts source material into product records such as requirements, controls, policy statements, assessment items, vulnerabilities, risks, and evidence
- Applies lifecycle states, ownership, validity dates, and versioning
- Uses deterministic calculations where a configured rule or score exists

**What AI does**

- Extracts obligations, statements, summaries, and candidate metadata
- Suggests evidence quality and relevance
- Produces draft analysis rather than final governed decisions

**What comes out**

- Structured records that can be linked, assigned, compared, and reported

**Primary roles**

- Compliance analyst
- Policy owner
- Security analyst
- Risk manager

### Stage 3: Map and assess

**What goes in**

- Requirements, controls, policies, evidence, assets, risks, vulnerabilities, incidents, and audit records

**What the system does**

- Maintains explicit links across modules
- Reuses unified controls across multiple frameworks
- Calculates configured coverage, status, score, SLA, and lifecycle views
- Surfaces gaps, missing evidence, overdue work, and control dependencies

**What AI does**

- Suggests framework-to-control and evidence-to-control mappings
- Assesses evidence quality and freshness
- Recommends gaps, treatments, fixes, or next actions
- Drafts narratives and explanations for human review

**What comes out**

- A connected assurance model showing what is covered, what is weak, and what requires action

**Primary roles**

- Head of GRC
- Compliance manager
- Risk manager
- Control owner
- Internal auditor

### Stage 4: Review and decide

**What goes in**

- AI suggestions, assessment results, gaps, exceptions, policy changes, workflow drafts, and remediation proposals

**What the system does**

- Routes work to accountable owners
- Enforces lifecycle, permission, review, approval, and publishing states
- Records decisions and changes in audit history

**What AI does**

- Explains recommendations and prepares review-ready drafts
- Does not replace the authorized approver

**What comes out**

- Accepted, edited, rejected, approved, or escalated decisions with accountable ownership

**Primary roles**

- Policy approver
- Risk owner
- Control owner
- Compliance leader
- Auditor

### Stage 5: Execute governed work

**What goes in**

- Approved policies, treatments, remediation plans, findings, exceptions, tasks, and workflows

**What the system does**

- Creates and tracks tasks, approvals, reviews, exceptions, attestations, audit work, retests, and remediation
- Supports versioned workflow definitions and monitored executions
- Synchronizes supported records with configured integrations

**What AI does**

- Drafts workflow paths, remediation guidance, summaries, and communications where enabled

**What comes out**

- Owned work with status, due dates, SLA tracking, evidence, and a traceable history

**Primary roles**

- Control owner
- Remediation owner
- Security team
- GRC operations
- Audit team

### Stage 6: Monitor and report

**What goes in**

- Current controls, evidence, risks, vulnerabilities, findings, tasks, incidents, and workflow events

**What the system does**

- Maintains dashboards, KRIs, KPIs, heatmaps, coverage, expiry, SLA, and review views
- Supports audit packages, exports, reports, and board-level reporting workflows
- Feeds new gaps and changes back into the operating loop

**What AI does**

- Produces source-grounded answers and draft narratives where enabled
- Helps summarize changes and explain current posture

**What comes out**

- Continuous oversight, audit-ready records, management reporting, and the next cycle of action

**Primary roles**

- CISO
- Head of GRC
- Risk leadership
- Internal audit
- Executive and board stakeholders

### Primary Flow Diagram Spec

**Purpose:** Explain the complete product in one scan.

| Node | Label | Description |
|---|---|---|
| 1 | Bring in sources | Upload documents and connect approved operational systems. |
| 2 | Structure the work | Turn source material into obligations, controls, evidence, and findings. |
| 3 | Map and assess | Connect records, reuse controls, and identify coverage or gaps. |
| 4 | Review and decide | Route recommendations to the people authorized to approve them. |
| 5 | Act with control | Assign remediation, publish policies, run reviews, and track exceptions. |
| 6 | Monitor and report | Keep posture, evidence, risk, and audit outputs current. |

**Visual direction**

- One left-to-right route on desktop; vertical route on mobile
- Dark navy canvas with electric-blue active path and cyan status signals
- Each node reveals one real product record, not an abstract AI orb
- Motion follows data from source to outcome; no crossing lines
- Final node loops back with one subtle return line labeled `New signals`
- The human decision node is visually distinct and cannot be bypassed

## 2. Persona Questions Map

Persona priority below is inferred from the implemented product. Commercial leadership should confirm the primary buyer, company size, industries, and buying committee.

### Head of GRC or Compliance

**Situation before visiting**

Evidence is fragmented, the same controls are repeated across frameworks, owners are difficult to chase, and an audit or regulatory deadline is approaching.

**What they must believe in 10 seconds**

CompliVerse can connect the work they already do into one governed system without removing their authority.

**Silent questions**

- Can one control and one piece of evidence satisfy multiple obligations?
- How much manual mapping and follow-up remains?
- Can I see ownership, approval, expiry, and audit history?
- Which frameworks are genuinely supported?
- Can I export what an auditor needs?

**Demo trigger**

A concrete framework-to-control-to-evidence workflow, a recognizable product screen, and a credible explanation of implementation.

**Bounce trigger**

Generic AI claims, no workflow detail, unsupported framework counts, or no answer about evidence and approvals.

### CISO or Security Leader

**Situation before visiting**

Technical findings, vulnerabilities, assets, and compliance work live in separate systems, making risk prioritization and executive reporting difficult.

**What they must believe in 10 seconds**

CompliVerse connects security signals to controls, business risk, remediation ownership, and assurance outcomes.

**Silent questions**

- Which security tools can connect today?
- Does the platform correlate vulnerabilities with assets, controls, and risk?
- Can it enforce SLAs, exceptions, retests, and escalation?
- How is sensitive security data isolated and protected?
- Can I explain the business impact to leadership?

**Demo trigger**

A vulnerability or control failure traced through ownership, risk, remediation, and reporting.

**Bounce trigger**

A compliance-only message, vague "continuous monitoring" language, or unverified integration logos.

### Risk Leader

**Situation before visiting**

Risk registers are static, control effectiveness is disconnected from risk scoring, and updates depend on spreadsheets and meetings.

**What they must believe in 10 seconds**

CompliVerse turns risk into a living, connected operating process rather than another isolated register.

**Silent questions**

- Can risks connect to controls, incidents, KRIs, treatments, and business impact?
- Can owners review and approve decisions?
- Are scoring methods configurable and explainable?
- Can the platform support scenario and bow-tie analysis?
- What reporting is available for executives and committees?

**Demo trigger**

A risk record that visibly changes as controls, incidents, KRIs, and treatments change.

**Bounce trigger**

Claims that AI autonomously decides risk or an interface that hides how a score was produced.

### Internal Audit Leader

**Situation before visiting**

Planning, workpapers, findings, evidence, and follow-up are disconnected from the control and risk systems they assess.

**What they must believe in 10 seconds**

CompliVerse preserves independence while giving audit teams traceable evidence and connected remediation.

**Silent questions**

- Does it support the audit lifecycle, not just compliance assessments?
- Can evidence and controls be reused without losing source history?
- Can findings feed remediation and risk?
- Are workpapers, approvals, QA, and reports traceable?
- Can I export an audit package?

**Demo trigger**

An audit engagement flowing from scope and workpapers to findings, remediation, and reporting.

**Bounce trigger**

No dedicated audit story or language suggesting AI replaces auditor judgment.

### Control, Evidence, or Remediation Owner

**Situation before visiting**

They receive unclear requests from several teams and repeatedly upload the same evidence.

**What they must believe in 10 seconds**

CompliVerse gives them one clear queue of owned work, context, due dates, and reusable evidence.

**Silent questions**

- What exactly do I need to do?
- Why was this assigned to me?
- Can I reuse evidence already approved?
- Who approves my submission?
- Will I be notified before work becomes overdue?

**Demo trigger**

A focused "My Work" experience with clear context and minimal GRC jargon.

**Bounce trigger**

Dense platform breadth without a simple owner workflow.

## 3. Current Site Audit

### Page-Level Audit

| Page or section | Current status | Data-flow stage it should cover | Buyer question | Coverage |
|---|---|---|---|---|
| Home hero | Strong visual direction; broad value statement | Entire loop | What is this, and why should I care now? | Weak |
| Framework marquee | Shows relevant GCC and global standards | Map and assess | Does it support my obligations? | Weak |
| Connected Assurance | Strong unified-control concept | Map and assess | Can I test once and reuse evidence? | Covered |
| Five feature stories | Real outcome areas and good editorial structure | Structure through execute | What work can I manage? | Covered |
| AI product tour | Strong human-approval message and process tabs | Parse, assess, decide | What does AI do, and who remains accountable? | Covered |
| Framework orbit | Memorable visual framework coverage story | Map and assess | How broad is framework support? | Weak |
| Final CTA | Clear route to demo | Conversion | What should I do next? | Covered |
| Features page | Older visual system and stale feature grouping | All stages | What can the platform actually do? | Weak |
| Governance page | Thin and includes claims not firmly supported by product evidence | Structure, decide, execute | Can I govern policies and obligations? | Weak |
| Risk page | Thin and includes unsupported autonomous discovery claims | Assess, decide, monitor | Can I manage connected enterprise risk? | Weak |
| Compliance page | Overstates unattended collection and several unverified integrations | Ingest, map, monitor | Can I stay audit-ready with less manual work? | Weak |
| Frameworks coverage | Rich dataset exists, but public count and availability need validation | Map and assess | Is my framework supported now? | Weak |
| Request demo | Functional form but little trust or qualification context | Conversion | What happens after I submit? | Weak |
| ROI page | Uses unsourced percentages | Reporting and value | What measurable value should I expect? | Missing |
| Security and data handling | No dedicated page | Every stage | Can I trust this platform with GRC and security data? | Missing |
| How it works | No dedicated end-to-end product flow | Entire loop | How does source data become governed action? | Missing |
| Integrations | No verified availability page | Ingest and execute | What connects today, and what is beta? | Missing |
| Audit management | Implemented product area not represented | Decide, execute, report | Can internal audit work here too? | Missing |
| Implementation | No deployment or onboarding explanation | Ingest and configure | How difficult is adoption? | Missing |
| Pricing or packaging | No expectation setting | Conversion | Is this appropriate for my organization? | Missing |
| Trust resources | No proof, guides, or security resources | Trust | Can I validate the company and product? | Missing |

### Claims to Remove or Rewrite

| Current claim pattern | Problem | Safer replacement |
|---|---|---|
| AI continuously analyzes the legal landscape | No verified source coverage or update SLA | Track regulatory changes, assess impact, and route approved actions. |
| AI identifies risk from internal communications and external news APIs | Not established by the reviewed implementation | Connect risks to controls, KRIs, incidents, scenarios, and treatments. |
| Evidence is collected from AWS, GitHub, HRIS, and identity providers without human intervention | Connector availability and unattended behavior are not verified | Bring evidence into a governed repository through uploads and configured integrations. |
| Fixed 85%, 80%, 95%, or 99% ROI claims | No cited customer evidence | Replace with a value model using customer-entered assumptions, or remove until validated. |
| A fixed 19, 30, or 37 module/framework count | Counts differ across product and marketing sources | Use a verified, centrally managed count or avoid a number until product ownership approves it. |
| Autonomous AI action | Conflicts with product approval and audit patterns | AI recommends. Humans approve. |

## 4. Recommended Page List

### Launch Priority

1. **Home** - Establish the connected GRC promise, show the operating loop, and earn the demo click.
2. **How It Works** - Explain exactly how source material becomes reviewed, traceable action.
3. **Security and Data Handling** - Answer the trust questions that can stop a GRC buyer from progressing.
4. **Platform** - Present product breadth through five outcomes, then expose the underlying modules.
5. **Frameworks** - Show verified standards and how unified controls reduce duplicate work.
6. **Integrations** - Separate available, beta, and planned connections with honest capability detail.
7. **Use Cases** - Give GRC, security, risk, and audit buyers a relevant entry path.
8. **Request a Demo** - Set expectations, qualify interest, and give the buyer a credible next step.

### Secondary Priority

9. **About Liztek** - Establish ownership, mission, and the relationship to the wider product family.
10. **Resources** - Publish framework guides, trust documents, and implementation material as they become available.
11. **Pricing** - Add packaging guidance when commercial strategy is approved; a transparent enterprise contact model is acceptable.

### Navigation Recommendation

Primary navigation:

`Platform | How It Works | Frameworks | Integrations | Security | Resources`

Utility actions:

`Sign in | Request a demo`

Do not place all modules in the top navigation. Use a platform mega-menu grouped by business outcome.

## 5. Per-Page Content Blocks

The following blocks are in recommended build order. They are a content blueprint, not a requirement to place every block on the first release.

## Home

### 1. Hero

**Purpose:** Tell the buyer what CompliVerse connects and why that matters.

**Eyebrow**

`CONNECTED GRC OPERATIONS`

**Headline**

`Turn every obligation into accountable action.`

**Subhead**

`CompliVerse connects frameworks, controls, evidence, risk, remediation, and audit work in one governed system. AI prepares the analysis. Your people make the decisions.`

**Supporting line**

`Built for compliance, risk, security, and audit teams that need one reliable view of assurance.`

**Primary CTA**

`See CompliVerse in action`

**Secondary CTA**

`Explore how it works`

**Visual spec**

- Animated connected-record path, not a generic dashboard collage
- Show one obligation entering, linking to a shared control, finding approved evidence, and producing an owned action
- Keep the route to five nodes in the hero; reserve the full six-node loop for How It Works

### 2. Framework Trust Bar

**Purpose:** Establish relevance without implying unverified certification or coverage.

**Headline**

`Built to connect the frameworks your organization operates against.`

**Supporting line**

`Explore verified GCC and global framework coverage in the platform library.`

**Visual spec**

- Use only verified framework marks with correct naming and licensing
- Link to the Frameworks page
- Do not display a count until the source of truth is approved

### 3. The Assurance Problem

**Purpose:** Name the operational problem before presenting more features.

**Headline**

`Your assurance work is connected. Your tools usually are not.`

**Copy**

`A policy change affects controls. A failed control changes risk. A vulnerability creates remediation. An auditor asks for the evidence behind all of it. When each record lives in a separate spreadsheet or system, the team repeats work and loses context.`

**Visual spec**

- Before-and-after relationship map
- Left: five disconnected records
- Right: the same five records connected through one control
- Avoid pain-point icon cards

### 4. How It Works Snapshot

**Purpose:** Make the system legible before asking the buyer to explore modules.

**Headline**

`From source material to governed action.`

**Subhead**

`CompliVerse structures the work, connects the records, and keeps every recommendation accountable to a person.`

**Visual spec**

- Use the six-node primary flow in a compact form
- CTA: `Follow the complete workflow`

### 5. Five Outcome Stories

**Purpose:** Explain platform breadth without dumping a module directory onto the homepage.

**Headline**

`One operating model. Five connected outcomes.`

**Supporting line**

`The platform spans more than five modules; these are the five outcomes that make the full system understandable.`

**Story 1**

`Govern every obligation`

`Turn policies, standards, and regulatory duties into owned, approved work.`

Proof points:

- Framework-linked policies and requirements
- Review, approval, version, and publication lifecycles
- Ownership, exceptions, attestations, and change tracking

**Story 2**

`Prove every control`

`Assess evidence once, connect it to unified controls, and reuse it without losing source history.`

Proof points:

- Evidence quality, validity, and approval
- Control and cross-framework mapping
- Assessment and audit package workflows

**Story 3**

`See risk in context`

`Connect threats, controls, KRIs, incidents, treatments, and business consequences in one living view.`

Proof points:

- Enterprise risk register and reviews
- Bow-tie, scenario, heatmap, and appetite views
- Linked mitigations, incidents, dependencies, and controls

**Story 4**

`Prioritize what matters`

`Turn vulnerabilities and control failures into owned remediation based on exposure, context, and due dates.`

Proof points:

- Asset, control, and vulnerability relationships
- SLA, exception, escalation, and retest workflows
- AI-assisted analysis and fix recommendations

**Story 5**

`Make assurance move`

`Coordinate tasks, approvals, audits, workflows, and answers across the complete GRC operating model.`

Proof points:

- Versioned workflows and human approval gates
- Audit planning, workpapers, findings, and follow-up
- Permission-aware ComplyChat grounded in GRC records

**Visual spec**

- Preserve the current sticky editorial interaction
- Replace placeholders with real, legible product crops
- Each crop should prove the exact copy beside it
- CTA after the final story: `Explore the complete platform`

### 6. Governed AI

**Purpose:** Explain AI utility without suggesting autonomous governance.

**Eyebrow**

`GOVERNED INTELLIGENCE`

**Headline**

`AI recommends. Humans approve.`

**Subhead**

`Use AI to read, map, assess, draft, and explain. Keep approval, publication, acceptance, and accountability with the people authorized to decide.`

**Routes**

- Regulatory impact: ingest, extract, connect, recommend, approve
- Evidence review: read, assess, score, reuse, review
- Risk support: monitor, detect, model, advise, decide
- Workflow drafting: describe, generate, validate, publish, monitor
- Grounded answers: ask, authorize, query, explain, open sources

**Visual spec**

- Keep the existing tabbed execution trace
- Label AI outputs as recommendations or drafts
- Visually lock the approval node to a named human role

### 7. Framework Intelligence

**Purpose:** Show that framework breadth is managed through shared controls, not separate silos.

**Headline**

`One connected system for every framework you run.`

**Copy**

`Map obligations to a shared control library, connect evidence once, and understand coverage across every verified framework in scope.`

**Visual spec**

- Keep the orbital framework composition
- Hover or focus reveals the full framework name inside the pill
- The central card should say `Verified framework library`, not a hard-coded count until approved
- Provide a text list and keyboard access as an accessible alternative

### 8. Final CTA

**Purpose:** Convert interest after product, process, trust, and coverage have been established.

**Headline**

`See how your GRC operating model connects.`

**Copy**

`Bring one framework, one control workflow, or one current assurance problem. We will show how CompliVerse carries it from source to accountable action.`

**Primary CTA**

`Request a tailored demo`

**Secondary CTA**

`Talk to the CompliVerse team`

## How It Works

### 1. Page Hero

**Purpose:** Set the expectation that this page explains the real operating loop.

**Headline**

`How CompliVerse turns assurance data into governed work.`

**Subhead**

`Follow a requirement from source material through structured analysis, human review, remediation, and reporting.`

**Visual spec**

- Full six-node primary flow
- Scroll-linked active state is appropriate, but the entire route must remain understandable without animation

### 2. Bring in the Sources

**Purpose:** Explain supported input patterns without overstating automation.

**Headline**

`Start with the records you already have.`

**Copy**

`Upload frameworks, policies, assessments, and evidence. Add risks, assets, incidents, vulnerabilities, controls, and audit work. Connect approved systems where a production integration is available.`

**Visual spec**

- Source tray feeding a single intake route
- Separate `Upload`, `Create`, and `Connect` source types

### 3. Build the Connected Record

**Purpose:** Demonstrate the product's differentiating relationship model.

**Headline**

`Keep the relationship, not just the file.`

**Copy**

`A framework requirement can connect to a unified control, a policy statement, approved evidence, a risk, a remediation task, and an audit finding. Each record keeps its owner, status, source, and history.`

**Diagram spec**

| Node | Label | Description |
|---|---|---|
| 1 | Requirement | The obligation that must be satisfied. |
| 2 | Unified control | The shared control used across applicable frameworks. |
| 3 | Evidence | The approved proof, with quality and validity context. |
| 4 | Risk or finding | The consequence when assurance is weak or incomplete. |
| 5 | Owned action | The approved remediation, review, exception, or task. |

### 4. Review Before Action

**Purpose:** Make human governance explicit.

**Headline**

`Recommendations move faster. Authority stays clear.`

**Copy**

`AI can prepare a mapping, quality assessment, treatment, workflow, or narrative. Authorized users can inspect the source, edit the recommendation, approve it, reject it, or escalate it.`

**Visual spec**

- Split trace showing `AI-prepared` and `Human-decided`
- Include source link, confidence or rationale, owner, and decision history

### 5. Close the Loop

**Purpose:** Explain continuous oversight as a workflow, not a vague promise.

**Headline**

`Every outcome becomes the next signal.`

**Copy**

`Approved work updates coverage, risk, evidence, remediation, and reports. New expiries, findings, incidents, or failed controls return to the same governed loop.`

**Visual spec**

- Single return path from Monitor to Sources
- Use examples such as evidence expiry, failed retest, overdue action, or KRI breach

## Security and Data Handling

This page must be reviewed by engineering, legal, and security before publication.

### 1. Page Hero

**Purpose:** Answer the central trust question directly.

**Headline**

`Sensitive assurance data deserves explicit boundaries.`

**Subhead**

`CompliVerse is designed around tenant separation, permission-aware access, protected credentials, human approval, and traceable activity.`

### 2. Tenant and Access Architecture

**Purpose:** Explain verified isolation and access controls in plain language.

**Headline**

`Your organization operates inside its own tenant context.`

**Copy**

`Requests resolve the active tenant before product data is accessed. Role and action permissions determine which modules and records a user can reach. Product data is stored in a tenant-specific PostgreSQL database.`

**Diagram spec**

| Node | Label | Description |
|---|---|---|
| 1 | User request | An authenticated user enters the application. |
| 2 | Tenant context | CompliVerse resolves the organization boundary. |
| 3 | Permission check | Role and action rights are evaluated. |
| 4 | Tenant data | The request reaches the tenant-specific database. |
| 5 | Audit history | Relevant activity and domain decisions are recorded. |

### 3. Integration Credentials

**Purpose:** Address how connected-system secrets are handled.

**Headline**

`Connector credentials are protected at rest.`

**Copy**

`Configured integration credentials are encrypted before storage and decrypted only for authorized connector operations. Exact key management, rotation, and deployment procedures should be documented before this section expands.`

### 4. AI Boundaries

**Purpose:** Explain what AI can access and what it cannot decide.

**Headline**

`AI assistance follows product permissions and review paths.`

**Copy**

`CompliVerse uses AI for extraction, mapping, assessment, recommendations, drafting, and grounded answers where those features are enabled. Governed actions remain subject to user permissions and human review.`

**Publication dependency**

Do not make claims about model training, retention, data residency, zero retention, subprocessors, or private model deployment until contractual and technical details are approved.

### 5. Security FAQ

**Purpose:** Give procurement and security reviewers a practical next step.

Initial questions to answer after validation:

- How is data encrypted in transit and at rest?
- Where is tenant data hosted?
- What backup and recovery controls exist?
- Are SSO, MFA, and SCIM supported?
- How long are product, audit, and AI interaction records retained?
- Which AI providers process data, in which regions, and under what retention terms?
- Which certifications, assessments, penetration tests, or reports can be shared?
- What incident response and breach notification commitments apply?

## Platform

### 1. Page Hero

**Purpose:** Present broad capability without an unreadable module wall.

**Headline**

`The operating system for connected GRC work.`

**Subhead**

`Bring governance, compliance, enterprise risk, controls, evidence, security findings, audit, and remediation into one permission-aware platform.`

### 2. Outcome Navigation

**Purpose:** Let each buyer enter through their problem.

Groups:

- Govern obligations
- Prove assurance
- Manage connected risk
- Prioritize exposure
- Coordinate action

**Visual spec**

- Persistent outcome tabs
- Each tab opens a relationship map, module list, and real product screenshot
- Avoid equal-sized feature card grids

### 3. Module Directory

**Purpose:** Give evaluators a complete capability inventory after the outcome story is clear.

Recommended groups:

- Governance and policy
- Frameworks, controls, assessments, and evidence
- Enterprise risk and resilience
- Vulnerability, assets, and remediation
- Audit and assurance
- Workflow, reporting, administration, and AI assistance

**Publication dependency**

Product leadership must approve the public module list and count. The reviewed product design brief describes 31 sidebar modules, while current marketing materials use different numbers.

## Frameworks

### 1. Page Hero

**Purpose:** Establish verified scope and explain the reuse model.

**Headline**

`Run multiple frameworks without rebuilding the same control environment.`

**Subhead**

`Connect requirements to shared controls and approved evidence, then view coverage in the context of each framework.`

### 2. Framework Explorer

**Purpose:** Help buyers verify whether their obligations are represented.

**Copy**

`Search the verified framework library by region, sector, and assurance objective. Open a framework to see its full name, edition, geography, status, and supported workflow.`

**Visual spec**

- Searchable text list is primary
- Orbit can remain as the editorial introduction
- Each framework needs a source-controlled status: `Available`, `Beta`, `Template only`, or `Planned`

### 3. Reuse Diagram

**Purpose:** Explain why a connected control library matters.

**Diagram spec**

| Node | Label | Description |
|---|---|---|
| 1 | Frameworks | Multiple obligations enter the same assurance model. |
| 2 | Shared control | Equivalent requirements connect to one governed control. |
| 3 | Approved evidence | Reusable proof retains source, owner, and validity. |
| 4 | Coverage views | Each framework shows its own current posture. |

## Integrations

### 1. Page Hero

**Purpose:** Set an honest expectation about connected systems.

**Headline**

`Connect operational signals to governed assurance work.`

**Subhead**

`Use production integrations to bring selected findings, events, tickets, meetings, and cloud signals into the records and workflows they affect.`

### 2. Availability Catalog

**Purpose:** Clearly distinguish what is usable today from what is being validated.

**Verified in code as concrete adapters or working exemplars**

- ServiceNow
- Splunk
- Microsoft Teams
- Fireflies.ai
- Metasploit
- Nessus and Tenable
- Rapid7, Nexpose, and InsightVM

**Explicitly marked beta in the connector registry**

- BMC Helix ITSM
- Wazuh
- IBM QRadar
- Core Impact
- Zoom
- Office 365 and Outlook

**Cloud connector caution**

AWS Inspector, Azure Defender, and GCP Security Command Center surfaces exist, but the reviewed cloud router states that sync orchestration was deferred. Do not market them as continuously syncing until current runtime behavior is verified.

**Visual spec**

- Filter by `Security`, `Ticketing`, `Cloud`, and `Collaboration`
- Every card displays `Available`, `Beta`, or `Planned`
- Detail page states direction of sync, records moved, authentication method, frequency, and limitations

### 3. Integration Flow

**Purpose:** Explain that connectors feed governed records, not an unbounded data lake.

**Diagram spec**

| Node | Label | Description |
|---|---|---|
| 1 | Connected system | An approved source provides selected operational data. |
| 2 | Normalize | CompliVerse converts it into a governed record. |
| 3 | Connect context | The record links to assets, controls, risks, or work. |
| 4 | Owner action | A person reviews, remediates, approves, or closes it. |

## Use Cases

### 1. GRC and Compliance Operations

**Headline**

`Reduce repeated compliance work without losing control.`

**Copy**

`Map obligations to shared controls, reuse approved evidence, govern policy lifecycles, and keep every gap assigned to an accountable owner.`

### 2. Security Risk and Remediation

**Headline**

`Connect technical exposure to business accountability.`

**Copy**

`Bring vulnerabilities, assets, controls, risks, exceptions, SLAs, and retests into one traceable remediation process.`

### 3. Enterprise Risk

**Headline**

`Make risk a living operating view.`

**Copy**

`Connect risks to KRIs, incidents, controls, dependencies, scenarios, treatments, reviews, and reporting.`

### 4. Internal Audit

**Headline**

`Carry audit work from plan to verified follow-up.`

**Copy**

`Manage the audit universe, plans, engagements, workpapers, findings, quality review, reporting, and remediation while preserving traceability to controls and evidence.`

### 5. Business Continuity and Third-Party Risk

**Headline**

`Extend assurance beyond the control library.`

**Copy**

`Coordinate resilience and third-party risk workflows inside the same governed operating model.`

**Publication dependency**

Confirm which BCM and third-party workflows are ready for public demonstration before expanding this page.

## About Liztek

### 1. Page Hero

**Purpose:** Establish the company behind the platform without distracting from the product.

**Headline**

`Built by Liztek for teams accountable for trust.`

**Subhead**

`CompliVerse AI is part of the Liztek product family, created to make complex governance work connected, explainable, and executable.`

### 2. Product Family

**Purpose:** Connect CompliVerse to sibling products only where the relationship is real and useful.

**Copy**

`CompliVerse, ProcureVerse, and AuditVerse share a focus on governed workflows, clear accountability, and operational intelligence.`

**Publication dependency**

Confirm legal product names, URLs, ownership statements, and any cross-product integrations before publication.

## Request a Demo

### 1. Demo Promise

**Purpose:** Tell the buyer what they will receive for sharing their details.

**Headline**

`Bring us one assurance workflow.`

**Subhead**

`Choose a framework, evidence process, risk scenario, vulnerability workflow, or audit challenge. We will tailor the demonstration around the records, decisions, and outputs your team needs.`

### 2. Recommended Form

Fields:

- Work email
- Name
- Company
- Role
- Region
- Primary objective
- Frameworks in scope
- Current systems or tools
- Desired timeline

**Post-submit copy**

`A CompliVerse specialist will review your use case and contact you to arrange the right product walkthrough.`

**Implementation note**

Replace or wrap the generic embedded form with a branded confirmation state, privacy notice, and clear response-time commitment once sales operations approves it.

## 6. Open Questions

These answers are required before the architecture and public claims can be finalized.

### Market and Buyer

1. Which persona owns the budget: Head of GRC, CISO, Chief Risk Officer, Internal Audit, or another role?
2. What organization size and maturity level is the primary target?
3. Which industries and regions are launch priorities?
4. Is the platform sold as one suite, configurable modules, or tiered packages?
5. What implementation model, typical timeline, and service support can be promised?

### Product Scope

6. What is the approved public module count, and what creates a "module"?
7. Which modules are production-ready, beta, demonstration-only, or roadmap?
8. Which framework list and editions are production-ready today?
9. Who owns the single source of truth for framework names, counts, and availability?
10. Which exports and audit package formats can be demonstrated reliably?
11. Are third-party risk, BCM, access reviews, report builder, and certification journeys ready for public positioning?

### AI

12. Which AI providers and models are used in production?
13. Which features use AI, which use deterministic rules, and which use both?
14. Are prompts or outputs retained by providers, and are they used for model training?
15. What tenant data is sent to an AI provider for each feature?
16. What source citation, confidence, or review behavior is guaranteed?
17. Can customers disable AI globally or by feature?
18. Are private deployment or customer-selected model options available?

### Security and Privacy

19. What encryption standards are used in transit and for product data at rest?
20. How are encryption keys stored, separated, and rotated?
21. What regions and cloud providers host application, database, object, log, and AI-processing data?
22. What backup, recovery, availability, and disaster recovery commitments exist?
23. What retention and deletion rules apply to tenant data, audit logs, evidence, and AI conversations?
24. Are SSO, MFA, SCIM, IP restriction, and session controls supported?
25. Which certifications, assessments, penetration tests, DPAs, subprocessors, and security reports can be shared?
26. What incident response and breach notification commitments are approved?

### Integrations

27. Which concrete adapters have passed production testing?
28. Which connectors are one-way, two-way, event-driven, or scheduled?
29. Which cloud connectors currently perform real synchronization rather than configuration and health checks?
30. Which integration logos and trademark assets may be used publicly?

### Proof and Commercial Content

31. Are there approved customers, logos, testimonials, case studies, or quantified outcomes?
32. Can ROI be calculated from customer inputs instead of publishing unsupported fixed percentages?
33. Is pricing public, "contact sales," or package-based?
34. What demo response time can the site promise?
35. What legal entity, address, privacy policy, terms, and contact details should appear in the footer and forms?

## Evidence Notes

The architecture is grounded in the following reviewed product areas:

- Multi-tenant request handling, tenant-specific databases, RBAC, and audit infrastructure
- Governance, policy, framework, control, evidence, assessment, ERM, vulnerability, audit, asset, workflow, and ComplyChat modules
- Connector provider registry and scanner/cloud integration code
- Product design brief describing the operator interface and cross-module relationships
- Current marketing routes and homepage section components

This document intentionally treats repository presence as product evidence, not proof of commercial availability, production readiness, contractual security behavior, or customer outcomes. Those claims require owner approval and runtime validation.
