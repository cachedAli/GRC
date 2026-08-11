# Route and screen inventory

## Method and status

There are **198 `page.tsx` files** under `grc-frontend/src/app`. Parenthesized route groups are omitted from URLs below. All dashboard pages are intended for authenticated tenant users; exact permissions vary by backend endpoint and are not inferred from route existence. Page status is **UI present** unless paired API routers/models below establish backend evidence.

## Public/authentication

| URL | Purpose | Evidence | Status |
|---|---|---|---|
| `/login`, `/register` | sign-in and tenant registration | `src/app/login/page.tsx`, `register/page.tsx`, `routers/auth_router.py`, `routers/tenants_router.py` | Partial; UI includes placeholder references |
| `/vendor-risk/questionnaires/{token}` | external questionnaire response | `src/app/vendor-risk/questionnaires/[token]/page.tsx`, `modules/vendor_risk/routers/questionnaires.py` | Partial |

## Route families

| URLs | Screen intent | Main backend/module evidence |
|---|---|---|
| `/dashboard`, `/compliance-overview`, `/my-work`, `/my-runs` | executive/compliance and personal work views | `routers/dashboard_router.py`, `routers/enriched_dashboard_router.py` |
| `/frameworks`, `/frameworks/{id}`, `/frameworks/overview/{id}`, `/frameworks/manage`, `/framework-upload/*`, `/assessments*` | framework catalogue, journeys, upload, assessment | `routers/frameworks_router.py`, `modules/framework_upload/`, `models/_07`, `_16`, `_17` |
| `/controls*`, `/control-library*` | controls, workbench, coverage, compare, assurance, gaps | `routers/controls_router.py`, `modules/control_library/`, `models/_08`, `_09`, `_44` |
| `/evidence*`, `/evidence-requirements` | register, detail, coverage, audit packages | `routers/evidence_router.py`, `modules/evidence/`, `models/_10` |
| `/erm/*` | risk register, assessment, RCSA, KRI, incidents, analytics, appetite, mitigation | `modules/erm/`, `models/_11`, `_21`, `_26` |
| `/governance/*`, `/documents` | policy/documents, mapping, reviews, changes, committee, attestations | `modules/governance/`, `models/_12`, `_13`, `_27`–`_32` |
| `/vendor-risk/*` | vendors, TPRA, questionnaires, monitoring, exchange, findings | `modules/vendor_risk/`, `models/_35`, `_41` |
| `/assets*`, `/asset-discovery`, `/risk-posture*`, `/compliance-plugins*` | inventory, criticality, discovery, posture and CIS scans | `routers/assets_router.py`, `modules/asset_discovery/`, `modules/risk_posture/`, `modules/compliance_plugins/` |
| `/vulnerabilities*`, `/issues*` | vulnerability register/lifecycle and cross-domain issues | `modules/vuln_management/`, `modules/issue_management/` |
| `/bcm*` | business-continuity plans and drills | `modules/bcm/`, `models/_44_business_continuity_management_models.py` |
| `/auditor-portal*`, `/reports*`, `/tasks*`, `/is-projects*` | auditor views, reports, tasks and projects | `modules/auditor_portal/`, `routers/reporting_router.py`, `routers/tasks_router.py`, `routers/is_projects_router.py` |
| `/integrations*`, `/admin/connectors`, `/admin/cloud-connectors` | connection/configuration views | `modules/integrations/`, `modules/connectors/` |
| `/workflow-engine`, `/governance/workflows` | definition builder/runtime and governance workflows | `modules/workflow_engine/`, `models/_34` |
| `/complychat`, `/erm/ai-risk-assessment`, `/admin/ai-usage` | AI chat, risk assessment and usage admin | `modules/chatbot/`, `routers/ai_risk_assessment_router.py`, `routers/admin_ai_usage_router.py` |
| `/admin/*`, `/users` | users, roles, teams, org, audit log, SSO/admin controls | `routers/admin_router.py`, `routers/sso_router.py`, `models/_01`–`_06` |
| `/nca`, `/cyber-security`, `/compliance/*` | regional/compliance workspaces and access reviews | `routers/nca_*`, `modules/compliance/`, `routers/access_review_router.py` |

## Complete URL manifest

The authoritative page-path listing can be regenerated with `rg --files grc-frontend/src/app -g page.tsx`. The route groups above cover all 198 entry pages; nested views include detail, list, dashboard, report, print, configuration and approval screens for the named family. Routes that appear only in the frontend remain **UI only** until a matching API call is verified.

High-risk visual-only examples detected by text search include portions of evidence snapshots/performance, workflow builder UI, vendor question pages, some vulnerability panels, and dashboard widgets. Evidence: files matched in `grc-frontend/src/**` containing `mock` or `placeholder`.
