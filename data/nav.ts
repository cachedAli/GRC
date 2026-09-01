/**
 * Navigation structure and its icon set.
 *
 * The icons are hand-drawn 24x24 stroke paths chosen to depict the thing
 * itself, a plug for integrations, a severed bar for gap analysis, a lifebuoy
 * for continuity, rather than a generic set of rounded glyphs. Framework
 * entries deliberately use the real regulator marks instead of an icon: the
 * ISO or SAMA logo is more legible at 16px than any drawing of one.
 */

const LOGO = "/frameworks";

export const NAV_ICON = {
  /** Stacked planes, the platform as layers on one model. */
  layers: "M12 3.5 20.5 8 12 12.5 3.5 8zM3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16",
  /** Three nodes wired together, the linkage graph. */
  graph:
    "M12 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM10.6 7.2 6.4 16.3M13.4 7.2l4.2 9.1M7.5 18.5h9",
  /** Four tiles, the module catalogue. */
  modules: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  /** Ruled table, the control coverage matrix. */
  matrix: "M4 4h16v16H4zM4 9.5h16M4 15h16M9.5 4v16M15 4v16",
  /** One input branching to two outputs, event-driven workflow. */
  branch: "M3 5h4v4H3zM16 3h4v4h-4zM16 17h4v4h-4zM7 7h5M12 5v14M12 5h4M12 19h4",
  /** Plug and socket, integrations. */
  plug: "M9 2v6M15 2v6M6.5 8h11v3.5a5.5 5.5 0 01-11 0zM12 17.5V22",
  /** Shield with a tick, verified security posture. */
  shieldCheck:
    "M12 3l8 3v5.5c0 4.9-3.4 8.2-8 9.5-4.6-1.3-8-4.6-8-9.5V6zM8.8 12l2.2 2.2 4.2-4.4",
  /** Shield with a warning, an open vulnerability. */
  shieldAlert: "M12 3l8 3v5.5c0 4.9-3.4 8.2-8 9.5-4.6-1.3-8-4.6-8-9.5V6zM12 9v4M12 16v.01",
  /** Speech bubble carrying a query, the assistant over your data. */
  ask: "M4 5h16v10H9.5L4 19zM8 9h8M8 12h5",
  /** Document with body lines, policies and records. */
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h4",
  /** Two people, one linked in, vendors in your supply chain. */
  vendors:
    "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3.1 2.7-5.5 6-5.5M16.5 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12.5 20c0-2.2 1.8-4 4-4s4 1.8 4 4",
  /** Paperclip, the evidence attached to a control. */
  clip: "M18.5 8.2 9.9 16.8a3.4 3.4 0 01-4.8-4.8l8.7-8.7a2.2 2.2 0 013.1 3.1l-8.5 8.5a1.1 1.1 0 01-1.5-1.5l7.6-7.6",
  /** Lifebuoy, business continuity. */
  lifebuoy:
    "M12 21a9 9 0 100-18 9 9 0 000 18zM12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9",
  /** Racked hardware, the asset inventory. */
  racks: "M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01M16 7h2.5M16 17h2.5",
  /** Bars with one cut short and its shortfall dashed, the gap. */
  gap: "M4 20h16M7.5 20v-6M12 20v-10M16.5 20v-4M16.5 12.5V9.5",
  /** Dial with a needle past centre, risk against appetite. */
  gauge: "M4.5 17.5a8.5 8.5 0 1115 0M12 17.5l4.6-5.6M12 17.5h.01M4.5 17.5h15",
  /** Meridian globe, the international standards. */
  globe:
    "M12 21a9 9 0 100-18 9 9 0 000 18zM3.4 9h17.2M3.4 15h17.2M12 3c2.4 2.4 3.7 5.6 3.7 9s-1.3 6.6-3.7 9c-2.4-2.4-3.7-5.6-3.7-9S9.6 5.4 12 3z",
  /** Dropped pin, regional and jurisdictional frameworks. */
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12.6a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2z",
  /** Tray with an arrow in, upload your own regulation. */
  upload: "M12 15V3M8 6.5 12 3l4 3.5M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4",
  /** Open book, long-form guides. */
  book: "M12 6.5S9.5 4.5 3 4.5v13c6.5 0 9 2 9 2s2.5-2 9-2v-13c-6.5 0-9 2-9 2zM12 6.5v13",
  /** Indexed spine, the glossary. */
  glossary: "M5 3h12a2 2 0 012 2v16H7a2 2 0 01-2-2zM19 17H7a2 2 0 00-2 2M9.5 8h5M9.5 11.5h3",
  /** File with angle brackets, the docs. */
  codeDoc: "M6 3h8l5 5v13H6zM14 3v5h5M10 13l-2 2 2 2M14 13l2 2-2 2",
  /** Folded newspaper, articles. */
  news: "M4 6h12v14H4zM16 9h4v9a2 2 0 01-4 0V6M7 9.5h6M7 12.5h6M7 15.5h4",
  /** Windowed building, the company. */
  building:
    "M4 21V6.5L11 3l7 3.5V21M3 21h18M9 21v-4.5h4V21M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01",
  /** Shoot breaking ground, growth and onboarding. */
  sprout: "M12 21v-8M12 13c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6zM12 13c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7z",
  /** Envelope, contact. */
  mail: "M3 6h18v12H3zM3.5 6.7 12 13l8.5-6.3",
  /** Arrow through a doorway, customer sign-in. */
  signIn: "M10 3H5.5A1.5 1.5 0 004 4.5v15A1.5 1.5 0 005.5 21H10M16 16l4-4-4-4M20 12H9",
} as const;

export type NavLink = {
  title: string;
  desc: string;
  href: string;
  icon?: string;
  /** Regulator mark, used instead of an icon in the Frameworks menu. */
  logo?: string;
};

export type NavGroup = { label: string; links: NavLink[] };

/**
 * The promo rail on the right of a mega-menu.
 * - "demo": a compact dark call-to-action card.
 * - "assistant": an illustrated AI-assistant card (drawn avatar), like the
 *   policy-assistant panels competitors run in their product menus.
 */
export type NavFeature = {
  variant: "demo" | "assistant";
  title: string;
  body: string;
  href: string;
  cta: string;
  /** assistant only: the greeting shown in the illustrated card. */
  greeting?: string;
};

export type NavMenu = {
  label: string;
  href: string;
  /** Rendered width of the panel. */
  width: number;
  groups: NavGroup[];
  feature?: NavFeature;
  footer?: { label: string; href: string };
};

export const NAV_MENUS: NavMenu[] = [
  {
    label: "Platform",
    href: "/platform",
    width: 780,
    groups: [
      {
        label: "Explore",
        links: [
          { title: "Platform overview", desc: "See how one data model runs GRC", href: "/platform", icon: NAV_ICON.layers },
          { title: "The 360° linkage model", desc: "Trace a clause to its evidence and audit", href: "/platform#linkage", icon: NAV_ICON.graph },
          { title: "ComplyChat", desc: "Ask your GRC data in plain English", href: "/platform/insights", icon: NAV_ICON.ask },
        ],
      },
      {
        label: "Foundations",
        links: [
          { title: "Unified control library", desc: "Implement a control once, inherit everywhere", href: "/platform/controls", icon: NAV_ICON.matrix },
          { title: "Workflow automation", desc: "Let routing, chasing and escalation run themselves", href: "/platform/workflow", icon: NAV_ICON.branch },
          { title: "Integrations", desc: "Collect evidence from the tools you already run", href: "/integrations", icon: NAV_ICON.plug },
          { title: "Security & architecture", desc: "Tenant isolation, encryption and hosting", href: "/hosting", icon: NAV_ICON.shieldCheck },
        ],
      },
    ],
    feature: {
      variant: "demo",
      title: "See it on your own stack",
      body: "We scope the demo to your regulators and run the gap analysis live, on your frameworks.",
      href: "/request-demo",
      cta: "Book a demo",
    },
  },
  {
    label: "Solutions",
    href: "/platform",
    width: 980,
    groups: [
      {
        label: "Govern & document",
        links: [
          { title: "Document management", desc: "Policy library, lifecycle, drafting", href: "/platform/governance", icon: NAV_ICON.doc },
          { title: "Committees & meetings", desc: "Charters, members, tracked actions", href: "/platform/committees", icon: NAV_ICON.vendors },
          { title: "Gap analysis", desc: "Where coverage actually stops", href: "/platform/assessments", icon: NAV_ICON.gap },
          { title: "Business continuity", desc: "ISO 22301 readiness", href: "/frameworks/iso-22301", icon: NAV_ICON.lifebuoy },
        ],
      },
      {
        label: "Assess & assure",
        links: [
          { title: "Evidence management", desc: "Intake, OCR, cross-framework reuse", href: "/platform/evidence", icon: NAV_ICON.clip },
          { title: "Vendor risk (TPRM)", desc: "Questionnaires and monitoring", href: "/platform/vendors", icon: NAV_ICON.vendors },
          { title: "Cybersecurity assurance", desc: "Assets and vulnerabilities, one loop", href: "/platform/assurance", icon: NAV_ICON.shieldCheck },
        ],
      },
      {
        label: "Automate & host",
        links: [
          { title: "Enterprise risk (ERM)", desc: "Register, KRIs, RCSA, appetite", href: "/platform/risk", icon: NAV_ICON.gauge },
          { title: "Compliance automation", desc: "Connect your stack, collect evidence", href: "/integrations", icon: NAV_ICON.plug },
          { title: "Cloud (SaaS)", desc: "Secure global hosting, run by us", href: "/hosting", icon: NAV_ICON.globe },
          { title: "On-premise", desc: "Your infrastructure, your control", href: "/hosting", icon: NAV_ICON.racks },
        ],
      },
    ],
    feature: {
      variant: "assistant",
      title: "AI Policy Assistant",
      greeting: "Hi, I'm ComplyChat",
      body: "Draft a policy, map it to the clause, and answer your team's questions in plain language.",
      href: "/platform/governance",
      cta: "See it in action",
    },
  },
  {
    label: "Frameworks",
    href: "/frameworks",
    width: 760,
    groups: [
      {
        label: "Global standards",
        links: [
          { title: "ISO 27001", desc: "Information security", href: "/frameworks/iso-27001", logo: `${LOGO}/iso.org.png` },
          { title: "SOC 2", desc: "Trust services criteria", href: "/frameworks/soc-2", logo: `${LOGO}/aicpa.org.png` },
          { title: "PCI DSS", desc: "Payment security", href: "/frameworks/pci-dss", logo: `${LOGO}/pcisecuritystandards.org.png` },
          { title: "NIST CSF", desc: "Cyber framework", href: "/frameworks/nist-csf", logo: `${LOGO}/nist.gov.png` },
          { title: "GDPR", desc: "Data protection", href: "/frameworks/gdpr", logo: `${LOGO}/gdpr.eu.png` },
        ],
      },
      {
        label: "Regional mandates",
        links: [
          { title: "SAMA CSF", desc: "Saudi banking cyber", href: "/frameworks/sama-csf", logo: `${LOGO}/sama.gov.sa.png` },
          { title: "SBP ETGRMF", desc: "Pakistan banking tech", href: "/frameworks/sbp-etgrmf", logo: `${LOGO}/sbp.org.pk.png` },
          { title: "DORA", desc: "EU operational resilience", href: "/frameworks/dora", logo: `${LOGO}/esma.europa.eu.png` },
          { title: "NIS2", desc: "EU cyber directive", href: "/frameworks/nis2", logo: `${LOGO}/enisa.europa.eu.png` },
        ],
      },
    ],
    footer: { label: "Browse all 20+ frameworks", href: "/frameworks" },
  },
  {
    label: "Resources",
    href: "/resources",
    width: 620,
    groups: [
      {
        label: "Learn",
        links: [
          { title: "Framework guides", desc: "Every framework, mapped and drawn", href: "/frameworks", icon: NAV_ICON.book },
          { title: "Compliance glossary", desc: "The vocabulary, plainly defined", href: "/resources/glossary", icon: NAV_ICON.glossary },
          { title: "Integrations catalog", desc: "40 connectors, evidence on autopilot", href: "/integrations", icon: NAV_ICON.plug },
          { title: "Documentation", desc: "Guides and product references", href: "/resources", icon: NAV_ICON.codeDoc },
        ],
      },
    ],
    footer: { label: "All resources", href: "/resources" },
  },
];
