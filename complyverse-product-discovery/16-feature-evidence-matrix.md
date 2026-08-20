# Feature evidence matrix

| Module | Feature | User Benefit | UI Evidence | Backend Evidence | Data Model Evidence | Status | Confidence | Source Paths | Safe to Market? |
|---|---|---|---|---|---|---|---|---|---|
| Frameworks | 33 non-fictional runtime-seeded catalogs | organize requirements across framework libraries | `frameworks/` | `startup_seed.py`; `frameworks_router.py` | uploaded-framework and `_07` models | Confirmed | High | `startup_seed.py`; `seed_data/frameworks/`; `_07`; `frameworks/` | Yes, with careful wording |
| Controls | normalization/common mapping | reduce duplicate control work | `control-library/` | `modules/control_library/` | `_08`, `_09_1` | Partial | High | control-library routes/models | Yes, with careful wording |
| Control workbench | work items/tests/evidence | operationalize controls | `controls/workbench/` | workbench router | `_44_control_workbench.py` | Confirmed | High | `_44`; workbench router | Yes |
| Evidence | version/mapping/audit package | trace audit support | `evidence/` | evidence routers | `_10_evidence_management.py` | Confirmed | High | `_10`; modules/evidence | Yes |
| ERM | risk/KRI/mitigation | assess and treat risk | `erm/` | ERM routers | `_11_enterprise_risk_management.py` | Partial | High | `_11`; modules/erm | Yes, with careful wording |
| RCSA | campaign/response/finding/approval | run self-assessments | `erm/rcsa/` | RCSA routers | `_26_rcsa...py` | Confirmed | High | `_26`; RCSA routes | Yes |
| Governance | document lifecycle/attestation | govern policy and acknowledgement | `governance/` | governance routers | `_13`, `_27` | Partial | High | governance models/routes | Yes, with careful wording |
| Vendor risk | TPRA lifecycle | assess vendors systematically | `vendor-risk/` | vendor-risk routers | `_35`, `_41` | Partial | High | TPRA models/routes | Yes, with careful wording |
| Assets | inventory/criticality | connect GRC to assets | `assets/` | assets router | `_14` | Confirmed | High | `_14`; assets routes | Yes |
| Discovery | campaigns/runs/observations | discover assets | `asset-discovery/` | discovery router | `_47` | Partial | Medium | `_47`; module | Needs team confirmation |
| Vulnerabilities | SLA/remediation/retest | track remediation | `vulnerabilities/` | vuln routers | `_22`, `_25` | Partial | High | vuln module | Yes, with careful wording |
| Workflow | graph definitions/approvals | configure work routing | `workflow-engine/` | workflow router/services | `_34` | Partial | High | `_34`; workflow engine | Yes, with careful wording |
| Audit | packages/auditor portal | organize audit access | auditor/evidence routes | auditor portal routers | `_10`, `_37` | Partial | Medium | auditor portal | Yes, with careful wording |
| BCM | plans/BIA/drills | manage continuity exercises | `bcm/` | BCM router | `_44 BCM` | Confirmed | High | BCM model/module | Yes |
| Integrations | connection/sync records | connect source systems | `integrations/` | integration routers | `_33` | Partial | Medium | `_33`; integrations module | Needs team confirmation |
| Reporting | definitions/snapshots/builder | report programme data | `reports/` | reporting router | `_42`, `_45`, `_46` | Partial | High | reports UI/models | Yes, with careful wording |
| AI | chat/drafting/assessment/mapping | assist analysis | `complychat`, AI pages | AI routers/services | AI models/usage | Partial | High | `09-ai-capabilities.md` | Yes, with careful wording |
| Compliance plugins | CIS scans/posture | assess asset configuration | `compliance-plugins/` | plugin/agent routers | `_37` | Mock | Medium | plugin runner includes mock | No |
