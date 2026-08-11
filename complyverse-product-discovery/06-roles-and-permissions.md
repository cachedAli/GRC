# Roles and permissions

## Confirmed authorization design

RBAC models are `Role`, `Permission`, `RolePermission` and `UserRole`. Users are represented by `GRCUser`; tenant membership is `TenantUser`. Evidence: `models/_03_rbac_models.py`, `_04_user_model_extended.py`, `permissions.py`.

Observed role vocabulary includes `admin`, `user`, `viewer`, `auditor`, `vendor`, `approver`, `control_owner`, `manager` and `employee`. Casing varies in source, so this is not a clean, authoritative predefined-role catalogue. Evidence: backend router/service role checks and `schemas/_00_base.py`.

| Role vocabulary | Intended access interpretation | Evidence/confidence |
|---|---|---|
| Admin | organization, users, roles, integrations, audit and configuration actions | explicit admin routes/checks; Confirmed |
| User | general authenticated operations | widespread guards; Confirmed |
| Viewer | read-limited access in several domains | controls/evidence/search/access review/vulnerability checks; Partial because per-action matrix not consolidated |
| Auditor | audit/control/evidence/review access | auditor portal and multiple guards; Partial |
| Vendor | external/vendor-risk/questionnaire actions | vendor-risk and public token route; Partial |
| Approver | approval steps/exceptions/assessments/workflows | explicit models and checks; Confirmed/partial |
| Control owner | control assignment/workflow action context | normalized control/workflow checks; Partial |

## Enforcement layers and gaps

- Backend: FastAPI routers use authentication/permission helpers and tenant resolution. Evidence: `routers/auth_router.py`, `permissions.py`, module routers.
- Frontend: page and component visibility exists, but `grc-frontend/middleware.ts` was empty in the inspected copy. Do not claim full route-level frontend enforcement.
- Backend access cannot be declared uniformly verified because 2,044 endpoints were not each manually executed. Buyer-facing security copy should say “role and permission data model with backend authorization checks” only after a security review confirms coverage.

## Admin surfaces

`/admin/users`, `/admin/roles`, `/admin/teams`, `/admin/organization`, `/admin/password-policy`, `/admin/audit-logs`, `/admin/ai-usage`, connector/cloud/access-review routes provide the corresponding UI. Evidence: `src/app/(dashboard)/admin/`, `routers/admin_router.py`, `routers/access_review_router.py`.
