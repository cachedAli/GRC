# Dashboards, reporting and metrics

## Confirmed surfaces

The UI includes central dashboard tabs for compliance, risk, governance, incident, control testing and executive views; module dashboards for ERM, vulnerabilities, vendor risk, BCM, assets/posture, evidence and reports; and a report builder with filters, pivots, charts, trends, saved reports, exports and print. Evidence: `src/app/(dashboard)/dashboard/components/`, `reports/_reports/`, module dashboard routes.

Backend models establish `MetricSnapshot`, `MetricTarget`, `ScorecardConfig`, `ReportDefinition`, risk score history and control assurance snapshots. Evidence: `models/_42_metric_snapshots.py`, `_43_scorecard_config.py`, `_44_control_workbench.py`, `_45_report_definitions.py`, `_46_metric_targets.py`.

## Metrics that can be described conservatively

| Metric family | Evidence | Status |
|---|---|---|
| Framework/compliance readiness | framework journey/snapshot and dashboard components | Partial: calculation needs validation |
| Control coverage/assurance/work status | control library coverage, workbench, assurance snapshot | Partial |
| Evidence coverage/quality/audit package content | evidence workspace/detail/coverage models | Partial; some UI mock references |
| Risk scores, appetite, KRI and heatmaps | risk model/history/KRI, ERM analytics pages | Confirmed/partial |
| Vulnerability SLA, exception and remediation | vulnerability routers/pages and SLA config | Confirmed/partial |
| Vendor risk/TPRA state | TPRA risk snapshot/models/pages | Partial |
| Governance, document/attestation, regulatory activity | governance and metric components/models | Partial |
| AI usage/budget | `AIUsageEvent`, budget models, admin page | Confirmed/partial |

Do not publish exact formulas, benchmark claims, real-time guarantees, or reported values until a running tenant/database validates them. Several frontend files explicitly contain `mock`/`placeholder` terminology, including dashboard/evidence/workflow areas.
