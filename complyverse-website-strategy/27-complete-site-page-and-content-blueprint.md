# CompliVerse complete website page and content blueprint

## Document purpose

This document converts the verified product discovery and reference-site research into an implementable website plan. It defines:

- Header navigation and mega menus
- Homepage content, order, layout and calls to action
- Launch pages and their complete section plans
- Product, solution and framework page templates
- Page-specific messages, workflows and visual requirements
- Internal linking
- Content and evidence boundaries
- Phase 2 and Phase 3 expansion

This is a content and information-architecture blueprint. It does not certify that every repository capability is production-ready.

## Evidence foundation

The central product relationship confirmed in the CompliVerse repository is:

Framework requirement → Control → Owner and work item → Evidence → Risk, issue or finding → Review or approval → Audit package or report

Representative evidence:

- Framework hierarchy: backend/grc/models/_07_framework_normalization_models.py
- Normalized controls: backend/grc/models/_08_normalized_control_model.py
- Common controls and mappings: backend/grc/models/_09_1_unified_common_control_library_models.py
- Evidence and audit packages: backend/grc/models/_10_evidence_management.py
- Enterprise risk: backend/grc/models/_11_enterprise_risk_management.py
- Governance and documents: backend/grc/models/_12*, _13*, and _27 through _32
- Vendor risk and TPRA: backend/grc/models/_35_vendor_risk_management_models.py and _41_tpra_lifecycle_models.py
- Control workbench: backend/grc/models/_44_control_workbench.py
- Product screens: grc-frontend/src/app/

The main website story should explain this connected record rather than present an unstructured list of repository modules.

---

# 1. Global website system

## Primary audiences

1. Compliance leaders
2. Risk managers
3. Security and cyber-risk teams
4. Internal and external auditors
5. Control owners and reviewers
6. Governance and policy teams
7. Third-party risk and procurement teams
8. Technical and security evaluators

## Primary conversion

Book a demo

## Secondary conversions

- See how it works
- Explore the platform
- View framework library
- Explore a product area
- Discuss AI capabilities
- Discuss security and architecture

## Website vocabulary

Use:

- Framework requirement
- Control
- Control owner
- Evidence
- Risk
- Finding
- Action
- Review
- Approval
- Audit package
- Report

Avoid:

- Revolutionary compliance
- Game-changing
- Cutting-edge
- Autonomous compliance
- Guaranteed compliance
- Instant certification
- Seamless everything
- All-in-one without a precise explanation

## Visual system

### Colour

| Token | Value | Use |
|---|---:|---|
| Ledger Ink | #12202B | Headings, navigation and primary text |
| Control Blue | #2457D6 | Links, primary actions and selected records |
| Evidence Teal | #0E7C74 | Evidence, verified relationships and completed states |
| Review Amber | #C17817 | Pending review and attention states |
| Paper Mist | #F4F7F8 | Page background |
| Register White | #FFFFFF | Content and interface surfaces |

### Typography

- Display: Instrument Sans
- Body and interface: Source Sans 3
- Control identifiers, versions and statuses: IBM Plex Mono

Font licensing and availability must be confirmed during implementation.

### Signature interaction

The Evidence Thread is the distinctive website interaction:

Requirement → Control → Owner → Evidence → Risk or action → Review

It should reveal actual product context on hover, keyboard focus or selection. This is the only visually expressive interaction that should receive substantial motion. Other motion should remain quiet.

---

# 2. Header and navigation

## Desktop header

Navigation order:

CompliVerse | Platform | Products | Solutions | Frameworks | Resources | Company | Login | Book a demo

Behaviour:

- Sticky after the visitor begins scrolling
- White or Paper Mist background
- Thin divider below the header
- Visible keyboard focus
- Escape closes an open menu
- Selected top-level item uses a restrained blue surface or underline
- Book a demo remains visible while mega menus are open
- No announcement bar unless the announcement and destination are real

## Platform mega menu

### Column 1: Understand the platform

#### Platform overview

Description: See how frameworks, controls, evidence, risk, governance and reporting connect.

Destination: /platform

#### Connected operating model

Description: Follow the relationship from a requirement to ownership, evidence and review.

Destination: /platform#connected-model

#### Ownership and workflows

Description: Understand tasks, approvals, review stages and workflow instances.

Destination: /platform#ownership

### Column 2: Work across the platform

#### See how it works

Description: Follow a six-step walkthrough from framework selection to reporting.

Destination: /how-it-works

#### Reporting and audit readiness

Description: Bring control status, evidence, findings and review activity together.

Destination at launch: /platform#reporting

Dedicated Phase 2 destination: /platform/reporting-audit

#### Workflow automation

Description: Configure triggers, steps, approvals, schedules and notifications.

Destination at launch: /platform#workflow

Dedicated Phase 2 destination: /platform/workflow-automation

### Column 3: Trust and architecture

#### AI assistance

Description: Explore ComplyChat, mapping, drafting, extraction and assessment assistance.

Destination: /ai

#### Security and architecture

Description: Review tenant architecture, permissions, authentication and audit logging.

Destination: /security

### Featured panel

Label: See a connected record

Copy: Follow one requirement through control ownership, evidence, risk and review.

Action: See how it works

## Products mega menu

### Column 1: Operate controls

#### Controls and evidence

Description: Connect requirements to owned controls, testing work and evidence.

Destination: /products/controls-evidence

Supporting links:

- Framework management
- Common controls
- Control workbench
- Evidence lifecycle
- Audit packages

These supporting links initially point to anchors on the Controls and evidence page.

### Column 2: Manage risk

#### Enterprise risk and RCSA

Description: Assess risk, run control self-assessments and manage treatment.

Destination: /products/enterprise-risk

#### Third-party risk

Description: Manage vendor intake, questionnaires, findings, remediation and approval.

Destination: /products/third-party-risk

### Column 3: Govern decisions

#### Governance and policy

Description: Draft, review, approve, attest and retain document history.

Destination: /products/governance-policy

Supporting links:

- Policy lifecycle
- Attestations
- Regulatory change
- Exceptions
- Committees and decisions

### More capabilities

- Assets and vulnerabilities
- Business continuity
- Issues and actions
- Projects and tasks
- Workflow automation
- Reporting and audit readiness

At launch, these link to relevant anchors on /platform. They should receive dedicated pages only after product availability and content depth are confirmed.

## Solutions mega menu

### Column 1: By team

#### Compliance teams

Description: Organize frameworks, controls, evidence, ownership and reporting.

Destination: /solutions/compliance-teams

#### Risk teams

Description: Assess risk, connect operational context and manage treatment.

Destination: /solutions/risk-teams

#### Internal audit

Description: Review controls and evidence, manage findings and prepare packages.

Destination: /solutions/internal-audit

#### Security teams

Description: Connect assets, vulnerabilities, controls and risk.

Status: Phase 2 after product validation.

### Column 2: By objective

#### Multi-framework programmes

Description: Normalize related requirements and understand reusable control work.

Destination: /solutions/multi-framework

#### Audit preparation

Description: Version, review and package evidence for an audit or assessment.

Destination: /solutions/audit-preparation

#### Evidence operations

Description: Manage evidence creation, versions, mappings, reviews and packages.

Destination at launch: /products/controls-evidence#evidence

Dedicated Phase 2 destination: /solutions/evidence-operations

#### Policy governance

Description: Organize drafting, approval, publication and acknowledgement.

Destination at launch: /products/governance-policy

### Featured panel

Label: Connected workflow

Copy: See how one framework requirement becomes assigned, evidenced and reviewed work.

Action: See how it works

## Frameworks mega menu

### Featured frameworks

- ISO/IEC 27001:2022
- PCI DSS 4.0.1
- NIST Cybersecurity Framework
- SAMA Cyber Security Framework
- SOC 2

Each item links to its framework detail page only after version and availability approval.

### Browse

#### Framework library

Description: Search the complete approved catalog by region, type and programme.

Destination: /frameworks

#### Global frameworks

Destination: /frameworks?region=global

#### Middle East frameworks

Destination: /frameworks?region=middle-east

#### Asia-Pacific frameworks

Destination: /frameworks?region=asia-pacific

### Featured panel

Copy: Browse framework names, versions, regions and current catalog status.

Action: View all frameworks

Do not place all framework names in the mega menu.

## Resources mega menu

### Explore

- See how it works
- Framework library
- Security and architecture
- Product documentation, when maintained

### Learn

- Framework guides, Phase 2
- Compliance glossary, Phase 2
- Product updates, only after a maintained release process exists
- Blog, only after an editorial owner and publishing plan exist

### Featured panel

Use either a maintained framework guide or the interactive platform walkthrough. Do not display placeholder resources.

## Company menu

### About CompliVerse

Destination: /about

### Contact

Destination: /contact

### Security and architecture

Destination: /security

Do not add Careers, Newsroom, Partners or Customer Stories until the corresponding programmes and content exist.

## Mobile navigation

Use accordion groups:

- Platform
- Products
- Solutions
- Frameworks
- Resources
- Company

Requirements:

- Keep headings visible
- Do not flatten every link into one list
- Place Login above the fixed Book a demo action
- Trap focus while the menu is open
- Support Escape to close
- Respect reduced-motion settings
- Remove decorative preview panels on narrow screens

---

# 3. Homepage

## Route

/

## Page goal

Explain what CompliVerse connects, show how the product works and move a qualified visitor toward a demonstration.

## Audience

Compliance, risk, security and audit leaders evaluating a GRC platform.

## Meta title

CompliVerse | Connected control, evidence and risk work

## Meta description

Map framework requirements to controls, link evidence and risk, and organize governance work for review and reporting with CompliVerse.

## Section 1: Hero

### Placement

Left side: thesis, supporting copy and actions.

Right side: one connected product record.

Below both columns: Evidence Thread preview.

### Eyebrow

Connected GRC operations

### Headline

Turn framework requirements into connected GRC work.

### Supporting copy

Map requirements to reusable controls, assign ownership, link supporting evidence, connect risks and actions, and keep the complete record ready for review.

### Primary action

Book a demo

### Secondary action

See how it works

### Supporting line

Built for compliance, risk, security and audit teams.

### Hero visual

Use a real anonymized record with:

- Framework and control identifier
- Control title
- Owner
- Implementation or review status
- Evidence record
- Evidence version
- Related risk or issue
- Recent review activity

Illustrative structure:

ISO 27001 · A.5.15  
Access control  
Owner: Security  
Review status: Pending review  
Evidence: Access review · Version 3  
Related risk: Unauthorized access

The example must be replaced with verified tenant data before launch.

## Section 2: Connected workflow

### Headline

A requirement should lead somewhere useful.

### Copy

CompliVerse connects requirements with the people, evidence, risks and decisions behind your compliance programme.

### Evidence Thread stages

1. Requirement
2. Reusable control
3. Responsible owner
4. Supporting evidence
5. Risk or action
6. Review and reporting

Selecting a stage reveals:

- What happens at that stage
- Related product area
- Relevant product screenshot
- Link to the relevant page

### Action

Explore the platform

## Section 3: Main product areas

### Headline

Work across the records that matter.

### Copy

Organize compliance, risk, governance and third-party activity without losing the relationships between them.

### Product 1: Controls and evidence

Headline: Make control work traceable.

Copy: Connect framework requirements to control owners, testing work, evidence versions and audit packages.

Capabilities:

- Framework and control hierarchy
- Normalized controls
- Control mappings
- Control workbench
- Evidence versioning
- Evidence review
- Audit packages

Action: Explore controls and evidence

### Product 2: Enterprise risk and RCSA

Headline: Keep risk decisions connected.

Copy: Assess risks, run control self-assessments, manage treatments and retain a reviewable decision history.

Capabilities:

- Risk register
- Risk assessments
- RCSA campaigns
- KRIs
- Mitigation actions
- Findings
- Approvals and reviews

Action: Explore enterprise risk

### Product 3: Governance and policy

Headline: Give governance work a decision record.

Copy: Manage policies and governance documents through drafting, review, approval, publication and acknowledgement.

Capabilities:

- Document versions
- Review workflows
- Approval and sign-off
- Employee attestations
- Policy exceptions
- Regulatory changes
- Governance history

Action: Explore governance and policy

### Product 4: Third-party risk

Headline: Manage third-party review as a lifecycle.

Copy: Manage vendor activity from intake and questionnaires through remediation, approval and monitoring.

Capabilities:

- Vendor register
- Tiering
- Questionnaires
- Evidence
- Assessments
- Findings
- Remediation
- Approval

Action: Explore third-party risk

## Section 4: Multi-framework control reuse

### Headline

Understand where the same control work applies.

### Copy

Normalize related requirements, organize reusable controls and understand how control work and evidence contribute across multiple frameworks.

### Visual

ISO 27001 + PCI DSS + SOC 2 + SAMA CSF + NIST CSF → Common control → Owner → Evidence

### Capabilities

- Normalized controls
- Common-control groups
- Framework mappings
- Coverage comparison
- Gap identification
- Evidence reuse

### Action

Explore multi-framework programmes

Do not state a control-reuse percentage until calculated and approved.

## Section 5: Framework library preview

### Headline

Start from the frameworks in your programme.

### Copy

Browse global and regional framework catalogs and understand how requirements connect with controls, evidence, risk and review work.

### Featured framework fields

- Framework name
- Version
- Region
- Framework type
- Short purpose
- Current catalog status

### Candidate featured frameworks

- ISO/IEC 27001:2022
- PCI DSS 4.0.1
- SOC 2
- NIST Cybersecurity Framework
- SAMA Cyber Security Framework
- NIST AI RMF
- One approved UAE framework
- One approved Pakistan or regional framework

### Action

View framework library

Do not publish the total catalog count until commercial availability and licensing have been confirmed.

## Section 6: ComplyChat and AI assistance

### Headline

Use assistance where professional judgement still matters.

### Copy

CompliVerse includes AI-assisted chat, mapping, drafting, extraction and assessment capabilities designed to support reviewable GRC work.

### Featured capability: ComplyChat

Headline: Ask questions about your GRC programme.

Copy: Use ComplyChat to explore framework, control, evidence, risk and governance context through a conversational interface.

Example question: Which access-management controls still need supporting evidence?

The visual should show:

- User question
- Concise answer
- Related control or evidence links
- Source or context area
- Open related record action

Use only a verified answer from an approved tenant.

### Supporting AI capability 1

Control-mapping assistance

Copy: Review suggested relationships between framework requirements and reusable controls.

### Supporting AI capability 2

Evidence assessment

Copy: Extract document content and review suggested evidence assessments.

### Supporting AI capability 3

Policy and risk assistance

Copy: Draft policy content or review suggested risk considerations before accepting them.

### Review flow

Source record → AI suggestion → Human review → Accepted result

### Disclosure

AI-assisted output should be reviewed by the people accountable for the underlying decision.

### Action

Explore AI assistance

## Section 7: Connected operational context

### Headline

Connect GRC work with operational context.

### Copy

Relate controls and risks to the assets, vulnerabilities, issues, incidents and projects that influence them.

### Related capabilities

- Asset inventory
- Vulnerability management
- Issues and remediation
- Incidents
- Business continuity
- Projects and tasks
- Workflow automation

### Visual structure

Assets and vendors connect to risks. Risks connect to controls. Controls connect to evidence. Issues, vulnerabilities and actions connect around those records.

Do not display these as seven equal product cards. Use one relationship diagram with expandable detail.

### Action

Explore the platform

## Section 8: Accountability and architecture

### Headline

Keep ownership, access and activity visible.

### Copy

Structure tenant data, roles, approvals, versions and activity history around the people responsible for each decision.

### Show

- Tenant-aware architecture
- Roles and permissions
- Control ownership
- Approval states
- Evidence versions
- Document versions
- Audit history
- Reviewer activity

### Action

View security and architecture

Do not claim certifications, hosting regions, MFA enforcement or specific encryption until formal evidence is approved.

## Section 9: Reporting and audit preparation

### Headline

Bring the supporting record together for review.

### Copy

Organize evidence, control status, risks, findings, actions and audit activity into reviewable packages and reporting views.

### Show

- Evidence packages
- Auditor access
- Control status
- Findings and issues
- Risk reporting
- Saved reports
- Review history

### Action

Explore audit preparation

Do not use invented readiness scores or sample metrics without an illustrative-data label.

## Section 10: Final conversion

### Headline

See how CompliVerse could organize your GRC programme.

### Copy

Walk through your frameworks, control structure, evidence workflow, risk requirements and review process with the CompliVerse team.

### Actions

- Book a demo
- View framework library

### Supporting text

Tell us which framework or operational problem you want to discuss.

---

# 4. Platform overview page

## Route

/platform

## Goal

Explain the connected data and operating model across CompliVerse.

## Audience

Cross-functional evaluators, GRC leaders and technical stakeholders.

## Hero

Eyebrow: CompliVerse platform

Headline: Follow GRC work across connected records.

Copy: Bring frameworks, controls, evidence, risks, policies, vendors, assets and reviews into a related operating model.

Actions: Book a demo; See how it works

Visual: complete Evidence Thread with related product screens.

## Section 1: Connected record model

Headline: Follow the relationship, not another collection of registers.

Explain:

- Frameworks contain requirements
- Requirements map to controls
- Controls receive ownership and work
- Evidence supports controls
- Risks, findings and actions connect to the same context
- Reviews and reporting draw from the supporting record

## Section 2: Frameworks and reusable controls

Show framework hierarchy, normalized controls, common-control groups and mappings.

Action: Explore controls and evidence

## Section 3: Evidence and decision history

Show evidence versions, mappings, document versions, approvals and audit history.

Action: Explore evidence management

## Section 4: Risk and operational context

Show relationships among risk, controls, assets, evidence, incidents, vendors and mitigation.

Action: Explore enterprise risk

## Section 5: Ownership and workflow

Explain owners, assignees, reviewers, approvers, workflow steps, schedules and notifications.

Qualification: Some workflow action handlers and deployments require runtime validation.

## Section 6: Reporting and audit

Show saved reports, metric snapshots, audit packages, findings and auditor activity.

Qualification: Exact calculations require validation from a populated tenant.

## Section 7: AI assistance

Show ComplyChat and assisted mapping, drafting, evidence assessment and risk suggestions.

Action: Explore AI assistance

## Section 8: Architecture

Show tenant context, database isolation design, authentication, roles and audit logging.

Action: View security and architecture

## Final CTA

Headline: See the connected operating model with your programme.

Action: Book a demo

---

# 5. How it works page

## Route

/how-it-works

## Goal

Replace unavailable customer proof with a clear, screenshot-led demonstration of the product workflow.

## Hero

Headline: Follow a requirement from programme setup to review.

Copy: See how CompliVerse organizes controls, ownership, evidence, risk and review activity around the requirements in your programme.

Action: Book a demo

## Step 1: Select a framework

Show the framework library and a framework detail screen.

Outcome: Requirements are organized into a visible programme structure.

## Step 2: Organize and map controls

Show framework controls, normalized controls and mappings.

Outcome: Related requirements can be managed through a reusable control structure.

## Step 3: Assign ownership and work

Show the control workbench, owner, status, test or task.

Outcome: Accountable people can see what requires action.

## Step 4: Link supporting evidence

Show evidence upload, version and control mapping.

Outcome: Reviewers can trace a control to its supporting record.

## Step 5: Connect risk, findings and action

Show related risk, issue, finding or mitigation action.

Outcome: Gaps lead to managed decisions and remediation.

## Step 6: Prepare review and reporting

Show an audit package, report or review history.

Outcome: Programme progress is supported by connected records.

## Final CTA

Headline: Walk through the workflow using your frameworks.

Action: Book a demo

---

# 6. Controls and evidence product page

## Route

/products/controls-evidence

## Hero

Eyebrow: Controls and evidence

Headline: Make control work traceable from requirement to evidence.

Copy: Organize framework requirements, reusable controls, owners, testing work and supporting evidence in one connected workflow.

Actions: Book a demo; See how it works

Visual: control detail connected to framework requirements, owner and evidence.

## Section 1: Product workflow

Framework → Mapped control → Owner → Test or work item → Evidence → Review → Audit package

## Section 2: Framework hierarchy

Explain domains, objectives, controls and sub-controls.

## Section 3: Normalized and common controls

Explain control normalization, related requirements, common-control groups and reuse.

Avoid claiming fully automated mapping quality.

## Section 4: Control workbench

Show:

- Owner
- Assignee
- Implementation state
- Testing or procedure
- Evidence request
- Escalation
- Review state

## Section 5: Evidence lifecycle

Show:

- Create or upload
- Version
- Map to controls
- Link to related records
- Review
- AI assessment or OCR, qualified
- Add to audit package

## Section 6: Coverage and gaps

Show coverage and gap views without invented values.

## Section 7: Audit packages

Explain selected evidence, access history and review preparation.

## Section 8: Connected records

Show links to risks, policies, incidents, assets and issues.

## Section 9: AI assistance

Show mapping suggestions, evidence recommendations, OCR and evidence assessment with reviewer control.

## Section 10: Relevant frameworks

Link to the framework library and featured frameworks.

## FAQ

- Can controls be reused across frameworks?
- Can evidence support more than one control?
- Are evidence versions retained?
- Can reviewers see the relationship between a control and evidence?
- Can CompliVerse import custom frameworks?

Answers must remain aligned with the validated product environment.

## Final CTA

Headline: See how your control and evidence model would work.

Action: Book a demo

---

# 7. Enterprise risk and RCSA product page

## Route

/products/enterprise-risk

## Hero

Eyebrow: Enterprise risk and RCSA

Headline: Keep risk decisions connected to the work behind them.

Copy: Assess risk, connect controls and assets, manage treatment, monitor indicators and retain a reviewable history.

Actions: Book a demo; Explore the workflow

## Section 1: Risk lifecycle

Identify → Assess → Connect controls, assets and evidence → Treat → Monitor → Review

## Section 2: Risk register

Show ownership, category, assessment attributes, status and related records.

## Section 3: Assessment

Explain inherent and residual concepts conservatively. Do not publish a universal scoring formula until validated.

## Section 4: RCSA

Show:

- Templates
- Campaigns
- Assessments
- Questions
- Responses
- Evidence
- Findings
- Tiered approvals

## Section 5: Risk treatment

Show mitigation actions, owners, dates, evidence and review.

## Section 6: KRIs and monitoring

Show KRI definitions, measurements, thresholds and history. Avoid real-time claims.

## Section 7: Operational context

Show connections to controls, assets, evidence, frameworks, governance records, incidents and dependencies.

## Section 8: Reporting

Show risk register views, heatmaps, treatment status and review history using verified data.

## Section 9: AI assistance

Show risk-assessment or recommendation assistance as proposed output requiring review.

## FAQ

- Can risks link to controls and evidence?
- Does CompliVerse support RCSA campaigns?
- Can risk treatments have owners and evidence?
- Can teams monitor KRIs?
- How are approvals recorded?

## Final CTA

Headline: Review your risk and RCSA operating model.

Action: Book a demo

---

# 8. Governance and policy product page

## Route

/products/governance-policy

## Hero

Eyebrow: Governance and policy

Headline: Give every policy and governance decision a reviewable history.

Copy: Manage drafting, versions, reviewers, approvals, publication, acknowledgement and related compliance context.

## Section 1: Document lifecycle

Draft → Version → Review → Approve → Publish → Attest → Renew

## Section 2: Authoring and versions

Show document metadata, current version and version history.

## Section 3: Review and approval

Show assigned reviewers, approval steps, sign-off and activity history.

## Section 4: Publication and attestation

Show employee acknowledgement and attestation records. Email delivery depends on configured services.

## Section 5: Policy exceptions

Show exception request, owner, rationale, decision and review.

## Section 6: Regulatory change

Show change records, impacts and related tasks without claiming an active external regulatory feed unless confirmed.

## Section 7: Committees and meetings

Show meeting, decision and action records.

## Section 8: Connected context

Show policy links to controls, risks, regulations and assets.

## Section 9: AI drafting

Show drafting assistance followed by reviewer editing and approval.

## FAQ

- Does CompliVerse retain document versions?
- Can policies follow review and approval steps?
- Can employees acknowledge documents?
- Can policies link to controls and risks?
- Can exceptions be recorded and reviewed?

## Final CTA

Headline: See how governance work becomes a retained decision record.

Action: Book a demo

---

# 9. Third-party risk product page

## Route

/products/third-party-risk

## Hero

Eyebrow: Third-party risk

Headline: Make third-party review a managed lifecycle.

Copy: Organize vendor intake, tiering, questionnaires, evidence, findings, remediation, approvals and monitoring activity.

## Section 1: Lifecycle

Intake → Tier → Questionnaire → Review → Findings → Remediation → Approve → Monitor or offboard

## Section 2: Vendor register and intake

Show vendor record, owner, category, lifecycle state and related information.

## Section 3: Tiering and scope

Explain configurable risk context without claiming an automatic universal rating.

## Section 4: Questionnaires

Show internal administration and the external token-based response experience.

## Section 5: Evidence and assessment

Show supporting documents, responses and assessment context.

## Section 6: Findings and remediation

Show finding severity, owner, action, evidence and review.

## Section 7: Approval and risk acceptance

Show approval state, decision and retained history.

## Section 8: Contracts and obligations

Show related contractual obligations when validated in the product.

## Section 9: Monitoring and offboarding

Describe monitoring signals and offboarding conservatively. External monitoring providers require confirmation.

## Section 10: AI assistance

Show vendor-document or questionnaire analysis as a suggested result requiring review.

## FAQ

- Can vendors complete questionnaires externally?
- Can supporting evidence be attached?
- Can findings create remediation work?
- Can assessments follow approval stages?
- Which monitoring providers are available?

The provider question must route to product confirmation.

## Final CTA

Headline: Walk through your third-party review process.

Action: Book a demo

---

# 10. Solution pages

## Shared solution template

1. Role or operational-problem hero
2. Current fragmented process
3. Connected CompliVerse workflow
4. Relevant product screenshots
5. Ownership and collaboration
6. Reporting outcome
7. Related products
8. Relevant frameworks
9. FAQ
10. Demo CTA

## Compliance teams

### Route

/solutions/compliance-teams

### Hero

Headline: Give control owners clear work without losing programme visibility.

Copy: Organize frameworks, controls, evidence, owners, reviews and reporting around a connected compliance programme.

### Sections

1. Bring frameworks into a common programme view
2. Normalize and map related controls
3. Assign owners and implementation work
4. Request and review evidence
5. Track gaps, issues and actions
6. Prepare reviews and audit packages
7. Use ComplyChat and mapping assistance carefully
8. Related frameworks and products

## Risk teams

### Route

/solutions/risk-teams

### Hero

Headline: Connect risk assessments with the controls and operations behind them.

### Sections

1. Maintain the risk register
2. Assess inherent and residual context
3. Run RCSA campaigns
4. Link controls, assets, evidence and incidents
5. Manage treatment and approvals
6. Monitor KRIs
7. Report risk and review history

## Internal audit

### Route

/solutions/internal-audit

### Hero

Headline: Review controls, evidence and findings without reconstructing the record.

### Sections

1. Define review or audit scope
2. Access controls and supporting evidence
3. Track requests and review status
4. Record findings and issues
5. Assign remediation actions
6. Retain reviewer and access history
7. Prepare an audit package or report

Auditor-portal completeness requires runtime validation.

## Multi-framework programmes

### Route

/solutions/multi-framework

### Hero

Headline: Understand where framework requirements share the same control work.

### Sections

1. Select or upload frameworks
2. Normalize requirements
3. Create or review mappings
4. Organize common-control groups
5. Assign reusable control work
6. Connect supporting evidence
7. Compare coverage and identify gaps
8. Add another framework

Do not promise automatic mapping accuracy or a fixed reuse percentage.

## Audit preparation

### Route

/solutions/audit-preparation

### Hero

Headline: Prepare reviewable evidence from the work already being managed.

### Sections

1. Understand audit scope
2. Identify related controls
3. Request or collect evidence
4. Retain evidence versions
5. Review submissions
6. Resolve gaps and findings
7. Assemble an audit package
8. Provide controlled auditor access
9. Retain activity history

---

# 11. Framework library

## Route

/frameworks

## Goal

Help visitors find relevant frameworks while presenting accurate version and availability information.

## Hero

Headline: Find the frameworks relevant to your programme.

Copy: Browse approved global and regional framework catalogs and see how CompliVerse connects requirements with controls, evidence, risk and review work.

## Search and filters

- Keyword
- Region
- Country
- Framework type
- Industry or sector
- Version
- Availability status

## Framework card fields

- Exact framework name
- Version
- Region
- Type
- Short description
- Static catalog control count, only when approved
- Availability status
- Related product areas
- View framework action

## Status vocabulary

Use only approved terms such as:

- Available
- Limited availability
- Validation in progress
- Discuss availability

Do not expose the fictional GCRF catalog.

## Featured collections

- Global security and privacy
- Middle East and Gulf
- Financial services
- Healthcare
- Artificial intelligence and technology risk
- Business continuity and resilience

Collections should appear only when enough approved frameworks support them.

## Final CTA

Headline: Discuss the frameworks in your programme.

Action: Book a demo

---

# 12. Framework detail pages

## Shared page structure

1. Exact framework name and version
2. What the framework is
3. Who it applies to
4. Framework hierarchy
5. Assessment, certification or review journey
6. How CompliVerse organizes requirements
7. Control ownership and work
8. Evidence workflow
9. Gaps, risks and actions
10. Cross-framework mappings
11. Reporting and audit preparation
12. Related products
13. Related frameworks
14. FAQ
15. Discuss the framework CTA

## Shared disclosure

Catalog availability does not represent endorsement, certification or guaranteed implementation scope.

## ISO/IEC 27001 page

### Route

/frameworks/iso-27001

### Hero

Headline: Operate your ISO 27001 programme from requirement to evidence.

Copy: Organize ISO 27001 requirements, control ownership, supporting evidence, risks, policy work and review activity.

### Specific sections

- ISMS programme context
- ISO/IEC 27001:2022 catalog hierarchy
- Control ownership and applicability
- Policy and governance records
- Evidence and review
- Risk treatment
- Audit preparation
- Cross-framework relationships

## PCI DSS page

### Route

/frameworks/pci-dss

### Hero

Headline: Connect PCI DSS requirements with control work and supporting evidence.

### Specific sections

- PCI DSS 4.0.1 scope
- Requirement hierarchy
- Ownership and recurring activities
- Evidence and testing
- Issues and remediation
- Audit or assessment preparation
- Relationships with overlapping frameworks

## NIST CSF page

### Route

/frameworks/nist-csf

### Hero

Headline: Organize cybersecurity outcomes through connected control and risk work.

### Required content decision

Resolve the runtime catalog version 1.1 and separate assessment-methodology reference to 2.0 before publishing the page.

### Specific sections

- NIST CSF purpose
- Functions, categories and subcategories
- Control and risk relationships
- Asset and vulnerability context
- Evidence and review
- Improvement actions
- Related NIST catalogs

## SAMA CSF page

### Route

/frameworks/sama-csf

### Hero

Headline: Manage SAMA cybersecurity requirements through owned, evidenced work.

### Specific sections

- Financial-sector and regional context
- Framework hierarchy
- Control ownership
- Evidence collection
- Risk and issue relationships
- Governance and policy
- Assessment and reporting
- Related Saudi and financial-sector catalogs

Commercial and regional expertise claims require team approval.

## SOC 2 page

### Route

/frameworks/soc-2

### Hero

Headline: Organize SOC 2 control, evidence and audit-preparation work.

### Specific sections

- Trust Services Criteria context
- Control ownership
- Evidence and testing
- Exceptions and remediation
- Audit packages and auditor access
- Common-control reuse
- Related ISO and privacy frameworks

Do not claim that CompliVerse performs or guarantees a SOC 2 audit.

---

# 13. AI assistance page

## Route

/ai

## Goal

Explain specific AI-assisted tasks, data flow, review boundaries and availability without autonomous-compliance claims.

## Hero

Eyebrow: AI assistance

Headline: Use AI assistance without removing accountable review.

Copy: Explore programme records, review suggested mappings, extract evidence content and draft operational material while keeping people responsible for the final decision.

Action: Discuss AI capabilities

## Section 1: ComplyChat

Show:

- User question
- Retrieved or related context
- Answer
- Linked source records
- Open related record

Safe message: Ask questions about framework, control, evidence, risk and governance context.

Do not guarantee completeness, accuracy or universal tenant-scoped SQL safety without validation.

## Section 2: Evidence assessment and OCR

Input: uploaded document or image.

Proposed output: extracted content and suggested assessment.

Reviewer action: inspect, correct and accept or reject.

## Section 3: Control mapping

Input: framework or control text.

Proposed output: suggested related control or mapping.

Reviewer action: verify and approve.

## Section 4: Policy drafting

Input: document context and drafting request.

Proposed output: draft content.

Reviewer action: edit, route through document review and approve.

## Section 5: Risk, vendor and vulnerability assistance

Describe these as partial capabilities and proposed analysis, not automatic decisions.

## Section 6: Workflow assistance

Show workflow design suggestions only when validated.

## Section 7: Usage governance

Show AI usage events and budget concepts.

## Section 8: Architecture and data questions

Confirmed configuration evidence includes OpenAI, LangChain, LangGraph, Qdrant and LangSmith.

Require team answers for:

- Retention
- Training use
- Opt-out
- Data location
- Model selection
- Access control
- Logging
- Human-review policy

## Section 9: Review principle

Source record → AI suggestion → Human review → Accepted result

## Final CTA

Headline: Review how AI assistance would fit your programme.

Action: Discuss AI capabilities

---

# 14. Security and architecture page

## Route

/security

## Goal

Give technical and procurement evaluators an accurate view of confirmed architecture while identifying items that require formal assurance.

## Hero

Headline: Understand how CompliVerse structures tenant access and activity.

Copy: Review the confirmed architecture for tenant context, roles, authentication, identity configuration and audit logging.

Action: Discuss security and architecture

## Section 1: Architecture

Browser → Next.js interface → FastAPI services → tenant-specific PostgreSQL database

Explain the master tenant registry and per-tenant database design as documented in the repository.

## Section 2: Tenant resolution and isolation

Explain request tenant context from authentication, subdomain, header or configured fallback.

Qualification: Every endpoint has not received a formal isolation test in this research.

## Section 3: Authentication and sessions

Describe confirmed components without specifying unverified hashing, MFA or session-hardening claims.

## Section 4: Roles and permissions

Show role, permission, role-permission and user-role models and backend authorization checks.

## Section 5: Identity providers

Describe configuration for SSO and identity providers carefully. Production provider status requires confirmation.

## Section 6: Audit logging

Show HTTP audit middleware, audit-log model and relevant activity history.

## Section 7: Files, background tasks and integrations

Explain uploads, OCR, Celery and Redis configuration. File scanning and deployment monitoring require confirmation.

## Section 8: AI architecture

Link to the AI page and list unresolved provider/data-handling questions.

## Section 9: Formal assurance required

Do not claim without team evidence:

- Certifications
- Encryption standards
- MFA enforcement
- Hosting regions
- Backup and disaster recovery
- Data retention
- Penetration testing
- Incident response commitments
- SLA
- Security monitoring
- Malware scanning

## Final CTA

Headline: Continue the architecture and security review.

Action: Contact the CompliVerse team

---

# 15. About page

## Route

/about

## Hero

Headline: GRC work deserves a connected operational record.

Copy: CompliVerse is being built around a practical idea: requirements, control work, evidence, risk decisions and governance activity should not have to be reconstructed when a team needs to act or explain progress.

## Section 1: The problem

Explain disconnected registers, files, ownership and review history.

## Section 2: Product belief

Requirements should connect to controls. Controls should connect to people and evidence. Risks and decisions should retain their context.

## Section 3: Product principles

- Visible ownership
- Connected evidence
- Reviewable decisions
- Frameworks as working programmes
- Careful AI assistance
- Transparent product availability

## Section 4: Regional and global programmes

Describe the presence of global and regional framework catalogs without inferring target geography or specialist credentials.

## Section 5: Company facts

Requires team input:

- Legal company name
- Founders and leadership
- Locations
- Mission
- Company history
- Contact details

## Final CTA

Headline: Discuss the GRC programme you are building.

Action: Contact us

---

# 16. Contact and demo page

## Routes

/contact  
/demo

These may initially share one form with different page headings.

## Demo page hero

Headline: Walk through CompliVerse with your programme in mind.

Copy: Tell us which frameworks, control workflows, risk processes or review requirements you want to explore.

## Demo form

Required:

- Name
- Work email
- Organization
- Role
- Primary objective
- Framework interest

Optional:

- Message

Do not initially require:

- Phone
- Budget
- Purchase date
- Employee count

## What the demonstration can cover

- Framework and requirement structure
- Common and mapped controls
- Control ownership
- Evidence workflow
- Risk and RCSA
- Governance documents
- Third-party risk
- Reporting and audit preparation
- AI assistance

Display only capabilities confirmed for the demonstration environment.

## Confirmation

Do not promise a response time until sales operations confirm it.

---

# 17. Footer

## Platform

- Platform overview
- See how it works
- AI assistance
- Security and architecture

## Products

- Controls and evidence
- Enterprise risk and RCSA
- Governance and policy
- Third-party risk

## Solutions

- Multi-framework programmes
- Audit preparation
- Compliance teams
- Risk teams
- Internal audit

## Frameworks

- Framework library
- ISO 27001
- PCI DSS
- NIST CSF
- SAMA CSF
- SOC 2

## Resources

- See how it works
- Framework library
- Product documentation, when available

## Company

- About
- Contact
- Login

## Legal

- Privacy
- Terms
- Cookie preferences

Include legal links only after their pages are formally prepared.

---

# 18. Page-level internal linking

## Homepage

Links to:

- Platform
- Four product pages
- Multi-framework solution
- Framework library
- AI
- Security
- Audit preparation
- Demo

## Product pages

Link to:

- Related solution pages
- Relevant frameworks
- Platform
- AI when applicable
- Security
- Demo

## Framework pages

Link to:

- Controls and evidence
- Governance and policy where relevant
- Enterprise risk where relevant
- Audit preparation
- Related frameworks
- Framework library
- Demo

## Solution pages

Link to:

- Relevant products
- Relevant frameworks
- See how it works
- Demo

## AI and security pages

Link to each other and to the Platform page. AI claims that depend on data handling should point to Security and architecture.

---

# 19. Launch priorities

## Phase 1: Required

1. Homepage
2. Platform overview
3. See how it works
4. Controls and evidence
5. Enterprise risk and RCSA
6. Governance and policy
7. Third-party risk
8. Framework library
9. ISO 27001
10. PCI DSS
11. NIST CSF after version resolution
12. SAMA CSF
13. SOC 2
14. AI assistance
15. Security and architecture
16. Demo/contact
17. About

## Phase 2: After validation and content preparation

- Reporting and audit readiness
- Workflow automation
- Security teams
- Evidence operations
- Policy governance
- Security operations
- Integrations
- Product documentation
- Framework guides
- Glossary

## Phase 3: Requires external proof or operating programmes

- Customer stories
- Pricing
- Partners
- Careers
- Newsroom
- Trust center
- Industry pages
- Comparison pages
- Integration marketplace
- Analyst and award pages
- Resource hub with multiple formats

---

# 20. Content approval boundaries

## Product approval

- Production module availability
- Beta and limited-availability labels
- Demonstration scope
- Framework availability
- Connector availability

## Security approval

- Hosting
- Regions
- Encryption
- MFA
- Backups
- Retention
- Monitoring
- Security testing
- Incident response

## Legal approval

- AI data handling
- Privacy statements
- Framework licensing
- Framework-body references
- Terms
- Cookie language

## Commercial approval

- Pricing
- Trial
- Customer names
- Customer outcomes
- Testimonials
- Service levels
- Response times

---

# 21. Final homepage sequence

1. Header
2. Hero
3. Connected workflow and Evidence Thread
4. Four main product areas
5. Multi-framework control reuse
6. Framework library preview
7. ComplyChat and AI assistance
8. Connected operational context

9. Accountability and architecture
10. Reporting and audit preparation
11. Final conversion
12. Footer

The homepage should remain focused on the connected record behind a GRC programme. Additional pages deepen one product, solution, framework or trust question without repeating the entire homepage.

