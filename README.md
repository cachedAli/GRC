# complyverse_website

Marketing site for **CompliVerse AI** — an AI-native GRC platform.

Next.js 14 (App Router) · React 18 · Tailwind CSS 4 · TypeScript

---

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> **Note:** don't run `npm run build` while `npm run dev` is running — both write
> to `.next/` and the dev server will start throwing `MODULE_NOT_FOUND`. Stop the
> dev server first, or delete `.next/` afterwards.

## Environment

Copy `.env.example` to `.env`. Every value is optional — the site runs without
them, with reduced functionality:

| Variable | Unset | Set |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | ComplyChat serves keyword-matched scripted answers | ComplyChat answers via Claude, using the product facts in `app/api/complychat/route.ts` |
| `DEMO_WEBHOOK_URL` | Demo requests are validated and logged server-side | Each validated request is POSTed as JSON to the URL (CRM / Zapier / inbox) |

**Demo requests currently have no delivery destination.** Point
`DEMO_WEBHOOK_URL` at a real endpoint before launch, or leads will only reach
the server log.

## Structure

```
app/
  page.tsx              home page — composes the sections below
  api/complychat/       ComplyChat endpoint (Claude + scripted fallback)
  api/demo-request/     demo form endpoint (server-side validation)
  request-demo/         book-a-demo page
  [...slug]/            catch-all for planned pages
components/
  home/                 home page sections
  home/ModuleScenes     14 bespoke animated module diagrams
  home/SceneKit         shared primitives for those scenes
  layout/               floating nav island + footer
  chat/ComplyChat       the site AI concierge widget
  ui/Primitives         Logo (GRC monogram), Icon, scroll reveal
data/
  home.ts               frameworks, modules, hero copy, linkage model
  modules.ts            module stories + capability catalogue
  nav.ts                navigation IA and its icon set
public/
  frameworks/           regulator marks (from the platform)
  connectors/           integration logos (from the platform)
  logo/                 GRC monogram variants
```

## Brand

The GRC monogram is four stroked paths on one grid — a 76-unit cap height and a
single 15-unit stroke weight throughout. Variants live in `public/logo/`; the
React component is `Logo` in `components/ui/Primitives.tsx`.

| Token | Value |
| --- | --- |
| Brand | `#1ED4B0` |
| Brand strong | `#17B898` |
| Brand deep | `#109880` |
| Night | `#0B1220` |
| Mono | `#111827` |

Type: **Poppins** (display) · **Inter** (body) · **JetBrains Mono** (labels).

## Content accuracy

CompliVerse is pre-launch: live demos, founding-customer program open, **no
signed customers and no case studies**. The copy reflects that deliberately —
there are no invented ratings, customer counts or logo walls anywhere on the
site, and ComplyChat is instructed to say so if asked. Please keep it that way
until there is something real to point at.
