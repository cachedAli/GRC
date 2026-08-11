# Confirmed product workflows

## Compliance and control flow

`Framework seeded/uploaded → hierarchy and controls represented → normalized/common mappings → control work items/owners → evidence linked → assessment/audit/reporting`

Evidence: `seed_frameworks.py`, `models/_07`–`_10`, `_44_control_workbench.py`, `modules/framework_upload/`, `modules/evidence/`, `modules/control_library/`. **Status: Partial end-to-end.** The model supports the flow; automatic creation and score updates need runtime verification.

## Evidence lifecycle

`Evidence created/uploaded → versioned → mapped to controls (and optionally policy/incident) → reviewed/AI assessed/OCR processed → included in audit package → access logged`

Evidence: `models/_10_evidence_management.py`, `modules/evidence/routers/lifecycle.py`, `cross_links.py`, `control_links.py`, `audit_packages.py`, `ocr.py`, `ai_assessment.py`. **Status: Confirmed/partial.** Human review and expiry/renewal behaviour are not uniformly verified.

## Risk lifecycle

`Risk recorded → inherent/residual attributes and links → KRI/incidents/dependencies/controls considered → mitigation action and evidence → review/history/report`

Evidence: `_11_enterprise_risk_management.py`, `modules/erm/routers/risks.py`, `mitigation_actions.py`, `reviews.py`, `kris.py`. **Status: Confirmed/partial.** Actual scoring formula varies and should be validated from services/UI before external claims.

## RCSA lifecycle

`Template → campaign → assessment → question response/evidence → finding → tiered approval → reporting`

Evidence: `_26_rcsa_risk_and_control_self_assessment_models.py`, `modules/erm/routers/rcsa.py`, `rcsa_custom.py`, corresponding `erm/rcsa/` pages. **Status: Confirmed.** Notification timing is not fully verified.

## Governance document lifecycle

`Document draft → version/reviewers → approval steps/sign-off → attestation/acknowledgement → audit history → policy exception or regulatory/control/risk linkage`

Evidence: `_13_governance_document_management_enhanced.py`, `modules/governance/routers/documents.py`, `document_workflow.py`, `document_signoff.py`, `attestations.py`. **Status: Confirmed/partial.** Delivery of employee emails/reminders depends on SMTP/worker configuration.

## Vendor/TPRA lifecycle

`Vendor intake → tiering/stage instance → questionnaire and evidence → findings/remediation/risk acceptance/contract obligations → approvals → monitoring signals → offboarding`

Evidence: `_35_vendor_risk_management_models.py`, `_41_tpra_lifecycle_models.py`, `modules/vendor_risk/routers/lifecycle.py`, `monitoring.py`, `assessments.py`. **Status: Confirmed/partial.** External sharing and monitoring provider operation require integration validation.

## Vulnerability lifecycle

`Ingest/create vulnerability → asset/control linkage → SLA/workflow state → remediation plan/mitigation → escalation/exception → retest/report`

Evidence: `_22_vulnerability_management_module.py`, `_25_vulnerability_workflow_template_models.py`, `modules/vuln_management/routers/`. **Status: Confirmed/partial.** Scanner ingestion and AI plan generation have mock/placeholder references.

## Workflow engine

`Definition/version with nodes and edges → trigger/event/schedule → instance → state-machine steps/actions → approval/timer/notification/webhook → audit/history`

Evidence: `_34_workflow_automation_engine_standalone_config_driven.py`, `modules/workflow_engine/services/runtime.py`, `state_machine.py`, `trigger_dispatcher.py`, `timer_service.py`. **Status: Partial** because some action handlers are explicitly placeholder/mock and runtime flags can disable it.
