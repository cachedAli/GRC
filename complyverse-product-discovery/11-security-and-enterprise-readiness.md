# Security and enterprise readiness

## Confirmed technical controls/design

| Area | Evidence | Finding |
|---|---|---|
| Tenant separation | per-tenant DB architecture and tenant middleware | Confirmed design: `README.md`, `middleware/subdomain.py`, `db.py` |
| Authentication/session | auth router, JWT cookie handling, password policy model | Confirmed components: `routers/auth_router.py`, `_02_password_session...py` |
| RBAC | roles/permissions/user-role models and backend checks | Confirmed design: `_03_rbac_models.py`, `permissions.py` |
| SSO/IdP | SSO router, Entra router, IdP config/group mapping models | Partial: `routers/sso_router.py`, model `_05` |
| Audit logging | HTTP audit middleware and audit-log model | Confirmed: `main.py`, `_06_audit_trail.py`, `audit_logger.py` |
| CORS/compression | configurable CORS and GZip middleware | Confirmed: `main.py` |
| Secret configuration | environment examples used for DB, session, AI, SMTP etc. | Confirmed: `.env.example`; values not inspected/reported |
| Input models | Pydantic schemas and FastAPI endpoints | Confirmed design, not a complete security test |
| File/OCR | upload root and OCR route | Partial; malware scanning/content controls not verified |
| Background job controls | Redis/Celery configured | Partial; deployment/monitoring not verified |

## Not verified or absent from inspected evidence

MFA enforcement, SAML/OIDC configuration quality, password hashing configuration, encryption at rest/in transit, key rotation, backup/restore, data-retention policy, DLP, security headers, CSP, CSRF posture, rate limiting, penetration testing, incident response, certifications, hosting regions, and SLA cannot be claimed from this inspection. CORS is configured, but this is not equivalent to broader web-security assurance.

## Marketing boundary

Safe with careful wording: “tenant-aware PostgreSQL architecture, role/permission data model, audit logging, configurable identity-provider integration, and configurable CORS.” Any stronger security, privacy, encryption or certification claim requires the team’s formal evidence.
