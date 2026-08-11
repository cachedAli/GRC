# Integrations

## Evidence and classification

`IntegrationConnection`, `SyncHistory`, `IntegrationAuditLog`, `IntegrationException`, scan records and outbound exception requests demonstrate a configurable integration data model. Evidence: `models/_33_integrations_module_vulnerability_scanner_integration.py`, `modules/integrations/`.

| Integration/provider | Evidence | Classification |
|---|---|---|
| Microsoft Entra ID | identity provider model/router and tests | Implemented/partial |
| Okta, Google Workspace, LDAP, SailPoint | named test files and provider mapping references | Partial/referenced; connection success not verified |
| AWS, Azure, GCP | cloud connector/router/dependencies | Partial/referenced |
| Tenable, Qualys, Rapid7 | vulnerability integration references | Partial/referenced |
| ServiceNow, Jira, Slack, GitHub, GitLab, Bitbucket, CrowdStrike, Defender, Sentinel, Wiz | connector registry/provider/reference matches | Partial/referenced; do not market as active connectors without provider-by-provider validation |
| Splunk, QRadar, Wazuh, MS Teams, Metasploit, Core Impact, BMC Remedy | `modules/connectors/providers/` | Provider code exists; several contain placeholder references |
| SMTP | environment-backed email service paths | Configurable/partial |
| n8n/webhooks | environment variables and workflow webhook model | Configurable/partial |

The repository does not establish sync frequency, production authentication completion, which providers are shipped, or a supported-integration catalogue. Required secrets use environment variables or stored connector credentials; values are deliberately omitted.
