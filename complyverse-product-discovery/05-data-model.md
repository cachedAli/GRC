# Data model

## Confirmed relationship map

`Tenant → TenantUser / BusinessUnit / PasswordPolicy / GRCUser / Role / Permission`

`Framework → FrameworkDomain → ControlObjective → FrameworkControl → FrameworkSubControl`

`FrameworkControl → ControlMapping / NormalizedControl → CommonControlGroup`

`Evidence → EvidenceVersion; Evidence ↔ FrameworkControl; Evidence ↔ Incident / Policy; AuditPackage ↔ Evidence`

`Risk ↔ Control / Asset / Evidence / FrameworkControl / Governance; Risk → KRI → measurement; Risk → review/history/mitigation`

`GovernanceDocument → version/reviewer/approval/audit; GovernanceDocument ↔ control/risk/regulation/asset`

`Vendor → questionnaire/assessment/SLA/incident; TPRA stage → question/response/finding/remediation/approval/signal`

`ITAsset ↔ control/internal-control/framework-control/evidence/risk; DiscoveryCampaign → scope/run/job/observation`

`WorkflowDefinition → node/edge/version/instance/step/approval/schedule/webhook/notification`

These relationships are based on named SQLAlchemy link models, not an independently executed database. Evidence: `backend/grc/models/_01` through `_47`.

## Major entity groups

| Group | Important entities and intended data |
|---|---|
| Tenant/identity | `Tenant`, `TenantUser`, `BusinessUnit`, `GRCUser`, `Role`, `Permission`, `RolePermission`, `UserRole`, `IdentityProviderConfig`, `AuditLog` |
| Compliance | `Framework`, hierarchy entities, normalized/common controls, `ComplianceProgram`, `GRCComplianceAssessment`, certification journey/phase/snapshot/control implementation |
| Evidence/audit | `Evidence`, versions, mappings, AI assessment/cache, audit packages/access logs, audit-plan entry |
| Risk | `Risk`, control/asset/evidence/framework/governance links, KRI/measurements, incident, review, history, dependency, appetite, mitigation, risk assessment |
| Governance | objectives, exceptions, issue/action/comment/activity/link models, documents/version/review/approval/signoff, attestations, regulatory change/impact/tasks, committee/meeting models |
| Operational security | `ITAsset`, criticality records, asset discovery models, vulnerability and workflow models, compliance agent/plugin/run | 
| Vendors | vendor, questionnaire, assessment, lifecycle/TPRA entities, shared assessment |
| Platform services | integration connection/sync/audit/exception, workflow entities, report definition, metric snapshots/targets, AI usage/budget/recommendation |

## Tenant isolation

The documented architecture uses a master tenant registry and per-tenant databases. `TenantMiddleware` records the resolved tenant on request state, prioritising an authenticated JWT's tenant slug. The actual safety of every endpoint depends on use of tenant DB dependencies; it has not been endpoint-by-endpoint formally verified. Evidence: `README.md`, `middleware/subdomain.py`, `db.py`.

## Lifecycle fields

Status, owner, assignee, created/updated and approval/audit/version fields are present across named lifecycle models. The final field-level source is the relevant model module; this analysis avoids an unreliable universal field list because entity schemas differ. There is confirmed version/audit design for evidence and governance documents, audit logs across the platform, and explicit approval models for workflow, RCSA, documents, TPRA and assessment evidence.
