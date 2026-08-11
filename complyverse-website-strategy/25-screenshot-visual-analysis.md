# Supplied screenshot visual analysis

## Evidence scope

This document analyses the supplied Drata and Secureframe desktop mega-menu screenshots. The images are reference evidence for layout, hierarchy and interaction patterns only. They are not evidence for CompliVerse features, customers or maturity.

## Drata screenshots

### Shared shell

- Near-black header and panel with electric-blue highlights.
- Persistent top-level navigation: Products, Solutions, Customers, Partners, Resources and Company.
- Search, Contact Sales, Sign In and a filled Get Started button remain visible while menus are open.
- The open item gains a dark raised-tab treatment, not merely an underline.
- Mega menus occupy almost the entire viewport width and begin immediately below the header.
- Thin borders and a strict column grid control a large amount of information.
- Bracketed uppercase headings use a monospaced or technical display style. This creates a system/command-center character.

### Products menu

Four visible columns: Products, Categories, Capabilities and Go Beyond. The first two use illustrated icon cards and descriptions; the capability column is a denser link list; the final column routes to integrations, API, product updates and plans. This is a deliberate hierarchy:

`Named commercial offers → buyer categories → individual capabilities → ecosystem/company differentiators`

Strength: it supports a mature portfolio with many ways to enter. Risk: it duplicates concepts across columns and would make a smaller product appear inflated.

### Solutions menu

Organized by company size, framework and industry. The framework list sits in the visual center and receives the most width. This suggests Drata expects visitors to self-identify through multiple taxonomies rather than understand one platform flow first.

CompliVerse should not use company-size segmentation at launch. Its stronger evidence is by role, workflow and framework. Industry links should wait for approved financial-services, healthcare and government content.

### Customers menu

Three areas: customer/community programmes, support/education, and featured customer stories with branded image cards. The visual proof is doing substantial sales work. CompliVerse cannot reproduce this structure honestly until customer and support programmes exist.

### Resources menu

Separates quick links, resource formats, learning collections and featured editorial content. Featured cards introduce colour and imagery into an otherwise textual menu. This works because the resource library is already deep. A nearly empty CompliVerse Resources menu would look performative; launch with Framework library and Product tour links only.

## Secureframe screenshots

### Shared shell

- White interface with very dark navy typography and one mint-green action colour.
- The header is visually quiet; the Request a demo button is the dominant element.
- Open menus are white full-width panels with large section headings, generous whitespace and pale vertical dividers.
- Icons are consistent outline drawings used for recognition, not decoration.
- Body descriptions use larger text and comfortable line height, reducing the perceived density of the catalogue.

### Products menu

Three product-family columns: core compliance, a defense-specific suite, and risk/vendor capabilities. This is easier to scan than Drata because it starts from commercial families. The defense column is highly specialized, showing how a mature site can reserve a large navigation region for a strong vertical offer.

CompliVerse should adapt the family model as:

`Controls & Evidence | Risk & Governance | Third-Party & Operations`

However, the launch menu should still expose only four dedicated pages so partial modules are not presented as equivalent products.

### Solutions menu

The left side uses three illustrated audience cards: small business, enterprise and defense contractors. The right side is a textual “Top Frameworks” list with short outcomes and a large View all frameworks button. This is the most useful screenshot pattern for CompliVerse: a limited set of audience/workflow entry points beside a verified framework shortlist.

Adaptation: replace company-size cards with **Compliance teams**, **Risk teams** and **Internal audit**, but only when those Tier 2 pages exist. Until then, show Product tour, Multi-framework programmes and Audit preparation.

### Partners menu

Partner types are shown as icon-plus-description blocks, with separate programme actions. This structure depends on actual service, audit, reseller and technology programmes. It is not suitable for CompliVerse yet.

### Resources menu

Three broad columns separate educational resources, framework resources and customer/support resources. The visual hierarchy makes framework hubs a core acquisition channel. CompliVerse can eventually use this model for framework guides, glossary and product documentation, but should not advertise empty categories.

### Company menu

Four evenly weighted items: About, Careers, Security and Newsroom. This is unusually disciplined. For CompliVerse, launch with About, Security and Contact. Careers and Newsroom require real programmes and maintained content.

## Comparative visual matrix

| Dimension | Drata | Secureframe | CompliVerse decision |
|---|---|---|---|
| Brand expression | technical, dark, space/mission language | bright, calm, accessible | calm operational record; avoid both space styling and mint clone |
| Information density | high | medium | medium-low at launch |
| Menu organizing principle | overlapping products/categories/capabilities | product families and audience/framework groups | product workflows and framework entry points |
| Heading style | small technical labels | large plain-language headings | plain-language headings with small status labels only where useful |
| Proof in navigation | featured customer/resource cards | audience illustrations and resource descriptions | real product screen fragment or product-tour card, no fake proof |
| CTA treatment | Contact Sales + Get Started | Sign in + Request a demo | Login + Book a demo; product tour as in-menu secondary action |
| Best lesson | systematic grouping for broad catalogues | whitespace and clear family grouping | combine grid discipline with whitespace |

## Recommended CompliVerse desktop mega menu

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ CompliVerse   Platform  Products  Solutions  Frameworks  Resources      │
│                                                    Login  [Book a demo]  │
├──────────────────────────────────────────────────────────────────────────┤
│ PRODUCTS                                                                 │
│                                                                          │
│ Operate controls        Manage risk            Govern decisions          │
│ Controls & evidence     Enterprise risk        Governance & policy       │
│ Evidence lifecycle      RCSA                    Third-party risk          │
│ Control workbench       Risk treatment         Vendor assessment         │
│                                                                          │
│ [View platform]         REAL PRODUCT TOUR                                │
│                        Follow requirement → evidence → review             │
│                        [Open product tour]                                │
└──────────────────────────────────────────────────────────────────────────┘
```

Do not show every backend module. Use small status text such as “Available in product,” “Limited availability,” or “Discuss availability” only after the product team approves the status vocabulary.

## Responsive behaviour inferred from the screenshots

- Desktop mega menus should become full-screen or accordion navigation below tablet width.
- Product and framework groups need visible headings in mobile navigation; do not flatten all links into one list.
- Keep Book a demo pinned near the mobile menu footer.
- Product-tour preview images should disappear or move below links on narrow screens.
- Use focus trapping, Escape-to-close, arrow-key navigation and clear `aria-expanded` state.
