# CompliVerse complete product source of truth

## Verified product definition

CompliVerse is a multi-tenant GRC application implemented with Next.js, FastAPI and PostgreSQL. Its data model and route structure cover frameworks and controls, evidence/audit packages, ERM/RCSA, governance documents and attestations, vendor risk, assets/discovery, vulnerabilities, BCM, workflows, reporting, integrations and AI assistance. The startup path loads 34 framework/control JSON catalogs, 33 non-fictional and one explicitly mock. Evidence: `README.md`, `backend/grc/main.py`, `backend/grc/models/`, `grc-frontend/src/app/`, `backend/grc/startup_seed.py`, `backend/grc/seed_data/frameworks/`.

## What is confirmed versus uncertain

The source confirms rich UI and API/model foundations. It does **not** prove every displayed feature has production data, an active integration, complete automation, accurate calculation or operational deployment. Demo seed scripts, mock runners, placeholder text and separate workstream directories require restraint. The feature-by-feature marketing boundary is `16-feature-evidence-matrix.md`.

## Architecture and access

The system is a Next.js App Router UI calling FastAPI routers. PostgreSQL/SQLAlchemy stores data; the architecture is documented as master tenant registry plus a database per tenant. Tenant middleware resolves request context from JWT, subdomain, header or configured fallback. Roles/permissions, password policy, identity-provider config and audit logging are modelled. Evidence: `README.md`, `middleware/subdomain.py`, models `_01`–`_06`.

## The connected product model

`Framework → controls → control work → evidence → assessment/audit/reporting`

`Risk ↔ controls/assets/evidence/frameworks/governance; risk → KRI/incidents/mitigation/review`

`Governance documents ↔ controls/risks/regulations/assets; documents → version/review/approval/attestation`

`Vendor → assessment/questionnaire/TPRA stages/findings/remediation/approval/monitoring`

`Asset ↔ controls/evidence/risks/vulnerabilities; discovery → observations`

This linkage is the strongest evidence-backed website narrative.

## Recommended market posture

Market CompliVerse as a configurable GRC and cyber-risk operations product for teams coordinating controls, evidence, risk, governance and audit activity. Position framework/control/evidence, ERM/RCSA, governance, vendor risk, assets/vulnerabilities, workflows and reporting as distinct product areas, always qualifying beta/partial integrations and AI assistance. Do not claim compliance outcomes, broad connector availability, certifications, exact library totals or AI automation guarantees without team evidence.

## Documentation index

- `00-executive-overview.md`: scope, definition and findings
- `01-repository-architecture.md`: stack and deployment shape
- `02-route-and-screen-inventory.md`: route families/inventory method
- `03-product-modules.md`: module analysis
- `04-frameworks-and-controls.md`: framework evidence
- `05-data-model.md`: entity and relationship map
- `06-roles-and-permissions.md`: RBAC analysis
- `07-product-workflows.md`: workflow reconstruction
- `08-dashboards-and-metrics.md`: metric/reporting evidence
- `09-ai-capabilities.md`: AI implementation boundary
- `10-integrations.md`: connector classification
- `11-security-and-enterprise-readiness.md`: verified security posture
- `12-product-positioning.md`: defensible positioning
- `13-website-information-architecture.md`: web-page plan
- `14-landing-page-content-source-pack.md`: claims and headline directions
- `15-content-gaps-and-team-questions.md`: decisions/evidence required
- `16-feature-evidence-matrix.md`: marketability matrix
- `18-landing-2-reconciliation.md`: landing prototype and claim reconciliation

## Consistency review

All product claims in this set reference project paths, use status labels, avoid secret values and distinguish seed/template/reference material from confirmed main-app functionality. A second pass should be performed against a running, populated tenant before public launch content is approved.
