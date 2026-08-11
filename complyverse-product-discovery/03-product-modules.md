# Product modules

## Status key

**Confirmed** = UI plus backend/model evidence. **Partial** = implemented surfaces but explicit placeholders, mock paths, or unverified deployment. **UI only** = no backend proof found. All source paths are relative to `D:\complywerse_ai`.

| Module | Purpose and core workflow | Users | Status and evidence |
|---|---|---|---|
| Framework management | Create/seed/upload frameworks; represent domains, objectives, controls and sub-controls; show journeys/assessments. `Framework → Domain → Objective → Control → Sub-control`. | compliance manager, auditor | Confirmed/partial: `models/_07_framework_normalization_models.py`, `routers/frameworks_router.py`, `modules/framework_upload/`, `app/(dashboard)/frameworks/` |
| Common control library | Normalize/match controls, group overlaps, map, compare, inherit and analyse gaps/coverage. | compliance/control owner | Confirmed/partial: `_08_normalized_control_model.py`, `_09_1_unified...py`, `modules/control_library/`, `control-library/` |
| Control workbench | Assign work items, testing/procedures/evidence/escalations and assurance snapshots. | control owner, approver, auditor | Confirmed: `_44_control_workbench.py`, `modules/control_library/routers/workbench.py`, `controls/workbench/` |
| Evidence management | Store/version evidence, map to controls/policies/incidents, AI assessment/OCR and audit packages. | control owner, reviewer, auditor | Confirmed/partial: `_10_evidence_management.py`, `modules/evidence/`, `evidence/`; OCR/AI require provider/runtime validation |
| Enterprise risk management | Risk register, links to controls/assets/evidence/frameworks/governance, KRI, incidents, reviews, appetite, mitigation and reports. | risk manager, executives | Confirmed/partial: `_11_enterprise_risk_management.py`, `modules/erm/`, `erm/` |
| RCSA | Templates, campaigns, question responses/evidence, findings and tiered approvals. | risk/control owners, approvers | Confirmed: `_26_rcsa...py`, `modules/erm/routers/rcsa*.py`, `erm/rcsa/` |
| Governance/policy | Author/version/review/approve/sign-off documents; manage exceptions, mapping, attestations, regulatory feeds/changes and committees. | governance/compliance, employees, board | Confirmed/partial: `_12`, `_13`, `_27`–`_32`, `modules/governance/`, `governance/` |
| Vendor risk/TPRA | Vendor register, questionnaires, assessments, lifecycle stages, evidence, approvals, contracts, monitoring signals and shared assessments. | procurement, risk, vendor | Confirmed/partial: `_35_vendor_risk_management_models.py`, `_41_tpra_lifecycle_models.py`, `modules/vendor_risk/` |
| Asset and discovery | Asset inventory/relationships/ownership, criticality assessments, discovery campaigns/runs/observations and external identities. | IT/security, risk | Confirmed/partial: `_14_it_asset_inventory.py`, `_47_asset_discovery_models.py`, `assets/`, `asset-discovery/` |
| Compliance plugins/CIS posture | Agent/compliance-plugin catalog, asset scope, runs, benchmark OS mapping and weighted posture. | security/IT | Partial: `_37_artifact...py`, `modules/agents/`, `modules/compliance_plugins/`, `modules/risk_posture/`; mock runner exists |
| Vulnerability management | Vulnerabilities, SLA, workflow states, exceptions, remediation, retests, exploitability and department escalation. | security, asset owners, auditor | Confirmed/partial: `_22_vulnerability_management_module.py`, `_25_vulnerability_workflow...py`, `modules/vuln_management/` |
| Issue management | Cross-links issues to risks, assets, controls, evidence and vendors; actions/comments/activity/matrices/automation flags. | remediation owners, managers | Confirmed: `_12_governance.py`, `modules/issue_management/`, `issues/` |
| Workflow engine | Define/version graph workflows, nodes/edges/instances/steps/approvals/schedules/webhooks/email/notifications; runtime dispatch and timers. | admins, process owners, approvers | Confirmed/partial: `_34_workflow...py`, `modules/workflow_engine/`, `workflow-engine/`; action handlers include placeholders |
| Audit/auditor portal | Audit-plan entries, audit packages/access logs and auditor controls/evidence/reviews/trace. | internal/external auditor | Confirmed/partial: `_10`, `_37`, `modules/auditor_portal/`, `routers/audit_plan_router.py` |
| BCM | BIA, dependencies, recovery strategies, plans, drills/results/findings/settings. | resilience/business owners | Confirmed: `_44_business_continuity_management_models.py`, `modules/bcm/`, `bcm/` |
| Integrations and access review | Integration connections/sync/audit/exception data; access review campaigns/items/findings/SoD rules. | admin, IAM/compliance | Confirmed/partial: `_33_integrations...py`, `_40_access_review_models.py`, `modules/integrations/`, `routers/access_review_router.py` |
| Reporting/dashboard | saved report definitions, metric snapshots/targets, report builder and dashboards. | executives, managers, auditors | Confirmed/partial: `_42`, `_43`, `_45_report_definitions.py`, `_46_metric_targets.py`, `reports/` |
| Projects/tasks | IS projects, milestones, tasks, evidence, risks/dependencies, health and critical tasks. | programme/project managers | Confirmed: `_36_is_projects_critical_tasks_models.py`, `routers/is_projects_router.py`, `routers/tasks_router.py` |

Module interconnection is real at the data-model level: controls, evidence, assets, risks, documents, issues and vendors are expressly joined by link models. Exact UI/API completeness differs by feature and is tracked in `16-feature-evidence-matrix.md`.
