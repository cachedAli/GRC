# Frameworks and controls

> **Superseding correction:** The earlier legacy-seed discussion below is incomplete. `backend/grc/seed_frameworks.py` is disabled/no-op (`seed_frameworks.py:165-172`) and is not the authoritative runtime source. The authoritative catalog is the 34 JSON files automatically loaded by `backend/grc/startup_seed.py` (`_seed_framework_catalog()` and `ensure_local_framework_catalog()`) from `backend/grc/seed_data/frameworks/`, into `UploadedFramework` and `ParsedFrameworkControl`. `tenant_manager.py` also invokes `seed_uploaded_frameworks`. Of these 34, 33 are non-fictional and one is explicit mock. The list below supersedes the table under “Confirmed seed-framework support.”

## Runtime-seeded catalog, exact files and static control records

| File | Framework/catalog | Version | Controls | Status |
|---|---|---|---:|---|
| `adhics.json` | Abu Dhabi Healthcare Information and Cyber Security Standard | 0.9 | 162 | Runtime seed |
| `aramco_ccc.json` | ARAMCO Cybersecurity Compliance Certification | 2024 | 35 | Runtime seed |
| `cis_controls.json` | CIS Critical Security Controls | 8.0 | 153 | Runtime seed |
| `cobit.json` | COBIT | 2019 | 40 | Runtime seed |
| `csa_ccm_v4.json` | CSA Cloud Controls Matrix | 4.0 | 197 | Runtime seed |
| `doh_adhie_policy.json` | DOH Abu Dhabi Health Information Exchange Policy | 1.1 | 195 | Runtime seed |
| `dora.json` | Digital Operational Resilience Act | EU 2022/2554 | 54 | Runtime seed |
| `gdpr.json` | General Data Protection Regulation | 2016/679 | 41 | Runtime seed |
| `hipaa.json` | HIPAA Security & Privacy Rule | 2024 | 67 | Runtime seed |
| `hitrust_csf.json` | HITRUST CSF | 11.4.0 | 156 | Runtime seed |
| `iso_22301.json` | ISO 22301 BCMS | 2019 | 40 | Runtime seed |
| `iso_27001.json` | ISO/IEC 27001 | 2022 | 93 | Runtime seed |
| `iso_42001.json` | ISO/IEC 42001 AI management system | 2023 | 70 | Runtime seed |
| `iso_45001.json` | ISO 45001 OH&S management system | 2018 | 36 | Runtime seed |
| `mas_trm.json` | MAS Technology Risk Management Guidelines | 2021 | 236 | Runtime seed |
| `NDMO_Data_Management_Standardsv1.5.json` | KSA NDMO data management and personal-data standards | 1.5 | 202 | Runtime seed |
| `nis2.json` | NIS2 Directive | 2022/2555 | 47 | Runtime seed |
| `nist_800_171.json` | NIST SP 800-171 | Rev. 2 | 110 | Runtime seed |
| `nist_800_53.json` | NIST SP 800-53 | Rev. 5 | 148 | Runtime seed |
| `nist_airmf.json` | NIST AI RMF | 1.0 | 72 | Runtime seed |
| `nist_csf.json` | NIST Cybersecurity Framework | 1.1 | 46 | Runtime seed |
| `pci_dss.json` | PCI DSS | 4.0.1 | 205 | Runtime seed |
| `qcb_technology_risks.json` | Qatar Central Bank Technology Risks Circular | January 2018 | 516 | Runtime seed |
| `Regulation on_Personal_Data_Transfer_Outside_KSA.json` | Personal Data Transfer Outside KSA Regulation | 2.0 | 21 | Runtime seed |
| `sabic_cybertrust.json` | SABIC CyberTrust Guidelines | 1.0 | 35 | Runtime seed |
| `sama_csf.json` | SAMA Cyber Security Framework | 2023 | 170 | Runtime seed |
| `sbp_cloud.json` | SBP Cloud Outsourcing Framework | 2023 | 58 | Runtime seed |
| `sbp_etgrmf.json` | SBP ETGRMF | 2022 | 262 | Runtime seed |
| `sbp_internet_banking.json` | SBP Internet Banking Framework | 2023 | 66 | Runtime seed |
| `sl_csf.json` | Sri Lanka Baseline Security Standard | 1.0 | 79 | Runtime seed |
| `soc2.json` | SOC 2 Type II | 2017, 2022 updates | 65 | Runtime seed |
| `sox.json` | SOX IT General Controls | 2024 | 54 | Runtime seed |
| `swift_cscf.json` | SWIFT Customer Security Controls Framework | 2024 | 31 | Runtime seed |
| `gcrf_global_cyber_resilience.json` | Global Cyber Resilience Framework | 1.0 | 75 | **Mock:** fictional source metadata |

There are also **27 runtime ERM assessment methodologies** under `backend/grc/seed_data/framework_assessments/frameworks/`, dynamically loaded by `modules/erm/framework_methodologies/_loader.py`. They enrich assessment generation and are not 27 extra framework catalogs. **15** generic framework journey/register template definitions are loaded from `seed_data/framework_templates/`. NCA DCC-1:2022 and CCC-2:2024 parsing, NCA workspace data and PDPL reference-law/assessment data are dedicated paths outside the 34-file catalog. Evidence: `routers/nca_container_router.py`, `routers/compliance_assessments_router.py`, `seed_data/dcc_catalog.json`, `seed_data/reference_laws/ksa_pdpl.json`.

## Confirmed seed-framework support

`backend/grc/seed_frameworks.py` explicitly implements seed functions for PCI DSS v4.0, ISO 27001:2022, NIST CSF 2.0 and SAMA Cyber Security Framework. It uses `Framework`, `FrameworkDomain`, `ControlObjective`, `FrameworkControl` and `FrameworkSubControl`. Exact control counts should be calculated from a seeded database, not asserted from static code. Evidence: `seed_frameworks.py` lines around 408, 617, 940 and 1356; `models/_07_framework_normalization_models.py`.

## Template/reference frameworks, not automatically marketing-ready

`seed_data/framework_templates/_generate.py` names CIS Controls v8, DORA, GDPR, HIPAA, ISO 22301, ISO 42001, NIS2, NIST 800-53/800-171, NIST AI RMF, NIST CSF 2.0, PCI DSS, SOC 2 and SOX ITGC. This is evidence of template-generation/reference handling, not proof that every template is seeded, complete, licensed, current, or production-enabled. ISO 27701 and PDPL appear in repository references/components; NCA/DCC templates are present in `NCA_Templates/`. Status: **Partial/referenced** unless confirmed by a seed/API/database run.

| Framework / library | Evidence | Safe status |
|---|---|---|
| PCI DSS v4.0 | seed function | Confirmed seed support |
| ISO 27001:2022 | seed function | Confirmed seed support |
| NIST CSF 2.0 | seed function | Confirmed seed support |
| SAMA Cyber Security Framework | seed function | Confirmed seed support |
| CIS Controls v8, DORA, GDPR, HIPAA, ISO 22301, ISO 42001, NIS2, NIST 800-53/171, NIST AI RMF, SOC 2, SOX ITGC | template generator identifiers | Partial/reference |
| NCA, DCC, PDPL, ASVS | templates, dedicated routers/components/demo scripts | Partial; regional/domain workstreams |

## Project-specific terminology

- **Framework**: top-level standard/regulation library (`Framework`).
- **Domain / objective / control / sub-control**: hierarchy represented in `_07_framework_normalization_models.py`.
- **Normalized control**: a control used to normalize/match framework controls (`NormalizedControl`, `ControlMapping`).
- **Common control group**: a reusable grouping for cross-framework overlap (`CommonControlGroup`).
- **Evidence**: uploaded/recorded evidence with versions and control links (`Evidence`, `EvidenceVersion`, `EvidenceControlMapping`).
- **Assessment**: multiple concepts exist: compliance assessment, risk assessment, framework risk assessment and RCSA. Do not collapse them in copy.
- **Finding/gap**: RCSA findings and gap-analysis routes/models exist; definitions/statuses vary by module.

## Mapping and reuse

`ControlMapping`, `NormalizedControlLink`, common-control-group mappings, similarity mappings and inheritance entities establish a real design for cross-framework alignment and reuse. AI mapping endpoints exist, but AI suggestion quality and approval workflow must be validated before marketing as automated mapping. Evidence: `_08_normalized_control_model.py`, `_09_1_unified_common_control_library_models.py`, `modules/control_library/routers/ai_mapping.py`.
