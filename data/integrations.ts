/**
 * The integration catalogue, mirrored from the platform
 * (`components/integrations/connector-catalogue.ts`).
 *
 * `syncs` is a scope statement — what a connector will collect — not a result.
 * There are deliberately no counts, dates or health values here: nothing is
 * connected until the sync backend ships, and a compliance product must never
 * display an invented sync time.
 *
 * `logo` is null where we do not ship a local mark. The platform falls back to
 * a third-party logo host in that case; the marketing site does not, and draws
 * an initials tile instead, so the page makes no external requests.
 */

export const INTEGRATION_CATEGORIES = [
  "Cloud",
  "Identity",
  "Code & CI/CD",
  "Endpoint",
  "Ticketing",
  "Communication",
  "HR",
  "Data & Monitoring",
] as const;

export type IntegrationCategory = (typeof INTEGRATION_CATEGORIES)[number];

export type Integration = {
  id: string;
  name: string;
  categories: IntegrationCategory[];
  /** Local brand mark, or null to render an initials tile. */
  logo: string | null;
  /** What this connector collects as evidence once sync is enabled. */
  syncs: string[];
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "aws",
    name: "Amazon Web Services",
    categories: ["Cloud"],
    logo: "/connectors/aws.svg",
    syncs: [
      "IAM users, roles and attached policies",
      "CloudTrail trail configuration and log file validation",
      "S3 bucket encryption and public-access settings",
      "Security group ingress rules",
    ],
  },
  {
    id: "gcp",
    name: "Google Cloud",
    categories: ["Cloud"],
    logo: "/connectors/gcp.svg",
    syncs: [
      "IAM policy bindings and service accounts",
      "Cloud Audit Logs configuration",
      "Cloud Storage bucket access controls and encryption",
      "VPC firewall rules",
    ],
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    categories: ["Cloud"],
    logo: "/connectors/azure.svg",
    syncs: [
      "RBAC role assignments across subscriptions",
      "Activity log and diagnostic settings",
      "Storage account encryption and public-access configuration",
      "Network security group rules",
    ],
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    categories: ["Cloud"],
    logo: "/connectors/digitalocean.svg",
    syncs: [
      "Team members and their access level",
      "Cloud firewall rules",
      "Spaces bucket permissions",
      "Managed database backup and encryption settings",
    ],
  },
  {
    id: "heroku",
    name: "Heroku",
    categories: ["Cloud"],
    logo: "/connectors/heroku.svg",
    syncs: [
      "Team members and app collaborators",
      "App, dyno and add-on inventory",
      "TLS certificate and custom domain configuration",
    ],
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    categories: ["Cloud"],
    logo: "/connectors/cloudflare.svg",
    syncs: [
      "Account members and API token scopes",
      "WAF and firewall rule configuration",
      "TLS, HSTS and minimum TLS version settings",
      "DNS zone records",
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    categories: ["Cloud"],
    logo: "/connectors/kubernetes.svg",
    syncs: [
      "RBAC roles, cluster roles and bindings",
      "Namespace and pod security standards",
      "Audit policy configuration",
      "Secret inventory · names only, never values",
    ],
  },
  {
    id: "terraform",
    name: "Terraform Cloud",
    categories: ["Cloud"],
    logo: "/connectors/terraform.svg",
    syncs: [
      "Workspace membership and team access",
      "Run, plan and apply history",
      "Policy check results",
      "State version and encryption settings",
    ],
  },
  {
    id: "okta",
    name: "Okta",
    categories: ["Identity"],
    logo: "/connectors/okta.svg",
    syncs: [
      "User and group directory with lifecycle state",
      "Application access assignments",
      "MFA factor enrollment per user",
      "Sign-on and password policies",
    ],
  },
  {
    id: "entra",
    name: "Microsoft Entra ID",
    categories: ["Identity"],
    logo: null,
    syncs: [
      "Users, groups and directory role assignments",
      "Conditional access policies",
      "MFA registration state per user",
      "Privileged role activations",
    ],
  },
  {
    id: "gws",
    name: "Google Workspace",
    categories: ["Identity"],
    logo: "/connectors/google_workspace.svg",
    syncs: [
      "Users, groups and organisational units",
      "2-step verification enrollment per user",
      "Admin role assignments",
      "Third-party OAuth app grants",
    ],
  },
  {
    id: "onelogin",
    name: "OneLogin",
    categories: ["Identity"],
    logo: null,
    syncs: [
      "User and role directory",
      "Application access assignments",
      "MFA factor enrollment per user",
      "Security and password policies",
    ],
  },
  {
    id: "jumpcloud",
    name: "JumpCloud",
    categories: ["Identity", "Endpoint"],
    logo: null,
    syncs: [
      "User and user-group directory",
      "Device-to-user bindings",
      "MFA enrollment per user",
      "System policies applied to managed devices",
    ],
  },
  {
    id: "auth0",
    name: "Auth0",
    categories: ["Identity"],
    logo: "/connectors/auth0.svg",
    syncs: [
      "Tenant users and role assignments",
      "Connection and MFA configuration",
      "Application grants and API scopes",
      "Tenant log stream configuration",
    ],
  },
  {
    id: "duo",
    name: "Duo Security",
    categories: ["Identity"],
    logo: null,
    syncs: [
      "Enrolled users and their registered devices",
      "Authentication policies per application",
      "Protected application inventory",
      "Administrator accounts and roles",
    ],
  },
  {
    id: "github",
    name: "GitHub",
    categories: ["Code & CI/CD"],
    logo: "/connectors/github.svg",
    syncs: [
      "Organisation members, teams and repository access",
      "Branch protection and required review rules",
      "Pull request review and approval history",
      "Dependabot and code scanning alerts",
    ],
  },
  {
    id: "gitlab",
    name: "GitLab",
    categories: ["Code & CI/CD"],
    logo: "/connectors/gitlab.svg",
    syncs: [
      "Group and project membership with access level",
      "Protected branch and merge approval rules",
      "Merge request approval history",
      "Pipeline and security scan results",
    ],
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    categories: ["Code & CI/CD"],
    logo: "/connectors/bitbucket.svg",
    syncs: [
      "Workspace members and repository permissions",
      "Branch restrictions and merge checks",
      "Pull request approval history",
      "Repository access keys · names only",
    ],
  },
  {
    id: "circleci",
    name: "CircleCI",
    categories: ["Code & CI/CD"],
    logo: "/connectors/circleci.svg",
    syncs: [
      "Project and context access",
      "Pipeline and workflow run history",
      "Manual approval job records",
      "Environment variable inventory · names only",
    ],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    categories: ["Code & CI/CD"],
    logo: "/connectors/jenkins.svg",
    syncs: [
      "User accounts and matrix permissions",
      "Job configuration and build history",
      "Installed plugin inventory and versions",
      "Credential store inventory · names only",
    ],
  },
  {
    id: "jamf",
    name: "Jamf",
    categories: ["Endpoint"],
    logo: null,
    syncs: [
      "Managed device inventory and assigned user",
      "FileVault disk encryption state per device",
      "OS version and patch level",
      "Configuration profiles applied",
    ],
  },
  {
    id: "kandji",
    name: "Kandji",
    categories: ["Endpoint"],
    logo: null,
    syncs: [
      "Managed device inventory and assigned user",
      "FileVault disk encryption state per device",
      "OS patch level against the enforced baseline",
      "Blueprint library items applied",
    ],
  },
  {
    id: "intune",
    name: "Microsoft Intune",
    categories: ["Endpoint"],
    logo: null,
    syncs: [
      "Enrolled device inventory and assigned user",
      "BitLocker disk encryption state per device",
      "Compliance policy evaluation per device",
      "Update ring configuration",
    ],
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    categories: ["Endpoint"],
    logo: null,
    syncs: [
      "Sensor installation coverage per host",
      "Detection and incident history",
      "Host group prevention policy assignment",
      "Sensor version and update state",
    ],
  },
  {
    id: "sentinelone",
    name: "SentinelOne",
    categories: ["Endpoint"],
    logo: null,
    syncs: [
      "Agent installation coverage per endpoint",
      "Threat detection and resolution history",
      "Endpoint policy assignment",
      "Agent version and update state",
    ],
  },
  {
    id: "jira",
    name: "Jira",
    categories: ["Ticketing"],
    logo: "/connectors/jira.svg",
    syncs: [
      "Issue records for linked change and incident workflows",
      "Workflow status transitions with actor and timestamp",
      "Approval and resolution history",
      "Project permission schemes",
    ],
  },
  {
    id: "linear",
    name: "Linear",
    categories: ["Ticketing"],
    logo: "/connectors/linear.svg",
    syncs: [
      "Issue records and their state history",
      "Team and project membership",
      "Workflow state configuration",
      "Cycle start and completion dates",
    ],
  },
  {
    id: "asana",
    name: "Asana",
    categories: ["Ticketing"],
    logo: "/connectors/asana.svg",
    syncs: [
      "Task records with assignee and completion date",
      "Project and team membership",
      "Approval task outcomes",
      "Custom field values used for tracking",
    ],
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    categories: ["Ticketing"],
    logo: null,
    syncs: [
      "Change request records and their approvals",
      "Incident and problem tickets with resolution time",
      "CMDB configuration items",
      "Assignment group membership",
    ],
  },
  {
    id: "slack",
    name: "Slack",
    categories: ["Communication"],
    logo: "/connectors/slack.svg",
    syncs: [
      "Workspace members and account type",
      "Channel inventory and privacy setting",
      "Retention and export policy configuration",
      "Installed app and integration inventory",
    ],
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    categories: ["Communication"],
    logo: "/connectors/teams.svg",
    syncs: [
      "Team and channel membership",
      "Guest access and external sharing settings",
      "Meeting recording policy configuration",
      "Retention policy configuration",
    ],
  },
  {
    id: "zoom",
    name: "Zoom",
    categories: ["Communication"],
    logo: "/connectors/zoom.svg",
    syncs: [
      "User accounts and assigned licences",
      "Meeting security and encryption settings",
      "Cloud recording and retention settings",
      "Admin role assignments",
    ],
  },
  {
    id: "workday",
    name: "Workday",
    categories: ["HR"],
    logo: null,
    syncs: [
      "Worker roster with hire and termination dates",
      "Job, department and manager assignments",
      "Onboarding and offboarding task completion",
      "Background check and policy acknowledgement records",
    ],
  },
  {
    id: "bamboohr",
    name: "BambooHR",
    categories: ["HR"],
    logo: null,
    syncs: [
      "Employee roster with hire and termination dates",
      "Job title, department and reporting line",
      "Onboarding and offboarding task completion",
      "Training and policy acknowledgement records",
    ],
  },
  {
    id: "rippling",
    name: "Rippling",
    categories: ["HR"],
    logo: null,
    syncs: [
      "Employee roster with employment status and dates",
      "Onboarding and offboarding workflow completion",
      "Device and application assignments per employee",
      "Role and department data",
    ],
  },
  {
    id: "gusto",
    name: "Gusto",
    categories: ["HR"],
    logo: null,
    syncs: [
      "Employee roster with hire and termination dates",
      "Department and manager assignments",
      "Employment type and status changes",
    ],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    categories: ["Data & Monitoring"],
    logo: "/connectors/snowflake.svg",
    syncs: [
      "Users, roles and grant hierarchy",
      "Network policy and IP allow-list configuration",
      "Login history and MFA enforcement",
      "Retention, masking and encryption settings",
    ],
  },
  {
    id: "datadog",
    name: "Datadog",
    categories: ["Data & Monitoring"],
    logo: "/connectors/datadog.svg",
    syncs: [
      "Monitor and alert rule configuration",
      "Triggered alert and notification history",
      "User accounts and role assignments",
      "Log retention and index configuration",
    ],
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    categories: ["Data & Monitoring"],
    logo: "/connectors/pagerduty.svg",
    syncs: [
      "On-call schedules and escalation policies",
      "Incident timeline with acknowledgement and resolution",
      "Service and team ownership",
      "User accounts and contact methods",
    ],
  },
  {
    id: "sentry",
    name: "Sentry",
    categories: ["Data & Monitoring"],
    logo: "/connectors/sentry.svg",
    syncs: [
      "Organisation members and team access",
      "Alert rule configuration and issue ownership",
      "Release and deploy history",
      "Data scrubbing and PII filtering settings",
    ],
  },
];
