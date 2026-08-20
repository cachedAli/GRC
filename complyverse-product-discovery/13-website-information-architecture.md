# Recommended website information architecture

Only pages with sufficient source evidence are recommended. Every page should use screenshots from a verified running tenant, not mockups.

| Navigation/page | Goal and audience | Core evidence | CTA | Evidence sufficiency |
|---|---|---|---|---|
| Platform overview | explain connected GRC operations to compliance/risk leaders | modules/models in `03-product-modules.md` | Book a demo | High, careful wording |
| Product tour | show framework-to-evidence-to-risk flow | framework/control/evidence/risk routes | Explore product tour | Medium |
| Controls & evidence | show operational work for owners/auditors | `_07`–`_10`, `_44`, `controls/`, `evidence/` | See control workbench | High |
| Enterprise risk & RCSA | show risk assessment and treatment | `_11`, `_26`, `erm/` | Explore risk management | High |
| Governance & policy | show documents, approvals, attestations, changes | `_13`, `_27`–`_32`, `governance/` | Explore governance | High |
| Third-party risk | show TPRA lifecycle | `_35`, `_41`, `vendor-risk/` | Explore vendor risk | High with implementation qualification |
| Security operations | assets, vulnerability, posture/plugin capabilities | `_14`, `_22`, `_37`, `_47` | Explore security operations | Medium; separate mock/reference features |
| Workflow automation | configurable definitions and approvals | `_34`, `workflow-engine/` | See workflows | Medium |
| AI assistance | explain assisted functions and review boundary | `09-ai-capabilities.md` | Discuss AI capabilities | Medium |
| Reporting & audit readiness | reports, packages, auditor portal | report/evidence/auditor models | View reporting | Medium |
| Integrations | present only verified/provider-qualified integrations | `10-integrations.md` | Discuss integrations | Low to medium |
| Security | architectural controls and team-confirmed practices | `11-security-and-enterprise-readiness.md` | Contact security team | Low until questionnaire evidence |
| Framework library | searchable library plus one verified page per non-fictional runtime-seeded catalog | `startup_seed.py`, `seed_data/frameworks/*.json` | View framework library | High, subject to commercial/licensing confirmation |

Avoid industry, customer-story, pricing, trial, partner and benchmark pages until the team provides evidence. Suggested solution pages after confirmation: compliance leader, risk leader, control owner, internal auditor, security team, vendor-risk team.
