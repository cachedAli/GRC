# CompliVerse product discovery: executive overview

## Scope and evidence standard

This source pack analyses `D:\complywerse_ai` as read on 2026-08-06. No product files were changed. The output folder is separate because the analysed repository is outside the writable workspace. A claim is **Confirmed** only when source shows a UI and/or backend implementation; UI text alone is not treated as proof of a working service. Seed/demo, `mock`, `placeholder`, and standalone workstream material is labelled accordingly.

## What CompliVerse is

**Confirmed:** CompliVerse is a multi-tenant GRC web application for managing frameworks, controls, evidence, enterprise risk, governance documents, audits, vendor risk, vulnerabilities, assets, workflows, and related reporting. It is implemented as a Next.js frontend and FastAPI/PostgreSQL backend. Evidence: `README.md`, `backend/grc/main.py`, `backend/grc/models/`.

## Product shape and likely users

The code supports organization administrators, compliance and risk practitioners, control owners, approvers, auditors, vendors, employees, and viewers. It is particularly shaped for regulated cybersecurity/compliance programmes, including Saudi NCA/SAMA/DCC and PDPL material, as well as general frameworks. This is an implementation interpretation, not proof of a commercial target market. Evidence: role checks throughout `backend/grc/routers/`, `NCA_Templates/`, `backend/grc/seed_frameworks.py`.

## Confirmed capability areas

| Area | Status | Representative evidence |
|---|---|---|
| Framework, normalized and common controls | Confirmed/partial | `models/_07_framework_normalization_models.py`, `_08_normalized_control_model.py`, `_09_1_unified_common_control_library_models.py`, `modules/control_library/` |
| Evidence and audit packages | Confirmed | `models/_10_evidence_management.py`, `modules/evidence/`, `app/(dashboard)/evidence/` |
| Enterprise risk, assessments, RCSA, KRI and incidents | Confirmed/partial | `models/_11_enterprise_risk_management.py`, `_26_rcsa...py`, `modules/erm/` |
| Governance documents, attestations, regulatory change, committees | Confirmed/partial | `models/_13...governance_document...py`, `_27...`, `_28...`, `_29...`, `modules/governance/` |
| Vendor risk / TPRA | Confirmed/partial | `models/_35_vendor_risk_management_models.py`, `_41_tpra_lifecycle_models.py`, `modules/vendor_risk/` |
| Asset inventory, discovery and risk posture | Confirmed/partial | `models/_14_it_asset_inventory.py`, `_47_asset_discovery_models.py`, `modules/asset_discovery/`, `modules/risk_posture/` |
| Vulnerability management | Confirmed/partial | `models/_22_vulnerability_management_module.py`, `modules/vuln_management/` |
| Configurable workflow automation | Confirmed/partial | `models/_34_workflow...py`, `modules/workflow_engine/` |
| AI-assisted functions and ComplyChat | Confirmed/partial | `modules/chatbot/`, `modules/evidence/routers/ai_assessment.py`, `tasks/ai_drafting.py` |

## Important caveats

- The repo contains 198 page-entry files, 2,044 decorated endpoints, demo seed scripts, and explicit mock/placeholder references. Breadth does not establish deployment readiness.
- The authoritative startup path seeds 34 framework/control JSON catalogs, not merely the four legacy seed functions noted in the initial pass. One is explicitly mock; 33 are non-fictional. See `04-frameworks-and-controls.md`.
- `landing-2-site/` is a standalone static marketing prototype in the writable workspace, not runtime implementation evidence. See `18-landing-2-reconciliation.md`.
- `CIS_Module_Updated/`, `Updated_CIS_Assests/`, and `workflow_audit_modules/` include artifacts and parallel workstreams. They are not assumed deployed unless the main app imports them.
- There is no evidence in scope of customers, pricing, certifications, SLA, hosting region, or a public marketing site.

## Product story safe to use with careful wording

`Configure a programme or framework → organize controls → assign and collect evidence → assess risk and issues → route reviews/approvals → assemble audit/reporting views.`

This flow is supported by model relationships and module routers, but individual workflow configurations and calculations require environment-level validation.

See `17-complete-product-source-of-truth.md` for the consolidated record.
