# CompliVerse website (static, 2026-11-13)

The marketing site is a static website of 77 HTML pages with its stylesheets,
scripts, images and one PDF. There is no server code, no database and no build
step.

## What is in this repository

```
index.html            the homepage
*.html                hosting, integrations, request-demo, roi, terms, privacy
ai/ platform/ modules/ services/ frameworks/ solutions/ resources/
css/ js/              stylesheets and scripts (plain files, no bundler)
assets/               integration logos (SVG)
downloads/            sample-security-report.pdf
netlify.toml          Netlify config (stages the deployable files into dist/)
vercel.json           Vercel config (clean URLs, cache headers)
```

Non-site working folders (`docs/`, `complyverse-product-discovery/`,
`complyverse-website-strategy/`, `.claude/`) stay in git but are excluded from
the published bundle.

## How to host it

- Any static host works: Nginx or Apache, S3 + CloudFront, Azure Static Web Apps
  or Storage, Netlify, Cloudflare Pages.
- Serve the repository root as the document root (or use the provided
  `netlify.toml` / `vercel.json`). The server only has to serve `index.html`
  for `/`.
- Every link is relative and names its file (`frameworks/index.html`, not
  `frameworks/`), so the site also works under a sub-path and needs no rewrite
  rules.
- Make sure `.svg` is served as `image/svg+xml` and `.pdf` as
  `application/pdf`.
- Turn on gzip or Brotli for HTML, CSS, JS and SVG.

## Caching

The CSS and JS file names carry no content hash, so do not cache them as
immutable.

- HTML: `Cache-Control: no-cache` (the browser revalidates every time).
- CSS, JS, SVG, PDF: `Cache-Control: public, max-age=3600` or revalidate with
  ETags.

Both deployment configs already apply these headers.

## Outside requests

The pages load two web fonts from Google Fonts and nothing else from outside the
site:

- `https://fonts.googleapis.com` (the font stylesheet)
- `https://fonts.gstatic.com` (the font files)

There is no analytics, tracking, cookies, chat widget or third-party script.
Nothing is stored in the browser.

## Security headers (recommended)

The pages have one tiny inline script (it adds a `js` class to `<html>`), no
inline event handlers, and use `style` attributes on some elements. This
Content-Security-Policy was tested against every page with no violations:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-/x7W7R75k8Roq0WaVRQX9blP4OufE5xbAdzklGxsgpw='; style-src 'self' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'
```

If the inline script in the page head changes, its `sha256-` hash must be
recomputed. The deployment configs enable the other suggested headers
(`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`).

## Not in the site

- A 404 page (none exists; the host's default is fine, or point it at
  `index.html`).
- `robots.txt` and `sitemap.xml`: they need the final domain.
- A favicon file: each page carries its icon inline, so nothing is required.

## Before it goes live as the public site

These are content decisions for the site owner, not server work. As delivered:

- **The demo request form does not send anything.** `request-demo.html`
  validates the form and shows a confirmation in the page; no data leaves the
  browser. A real endpoint (CRM, form service or API) must be wired in before
  launch.
- **The footer says "Draft 4 — a static prototype: nothing you type here leaves
  your browser."** Remove it for launch.
- **`terms.html` and `privacy.html` are placeholders** awaiting the approved
  legal text.
- **Three library guides are outlines** marked "in preparation".
- **The sample security report** (`downloads/sample-security-report.pdf`) and
  the product mock-ups use fictional data and are labelled so.

## Previous Next.js site

The previous Next.js application is preserved on the
`nextjs-archive-2026-11-13` branch. Check it out to restore that codebase.
