import Link from "next/link";
import { Icon, Sparkle, RevealOnScroll } from "@/components/ui/Primitives";
import { ICON } from "@/data/home";
import { NAV_ICON } from "@/data/nav";

/**
 * Cybersecurity Assurance, the unified home for Asset Management and
 * Vulnerability Management. One pipeline: discover what you own, score what
 * matters, and re-rank every finding by what is genuinely exploitable on the
 * host it sits on. Rebuilt in the site's white + teal system, every dashboard
 * light (no dark panels).
 */

const HERO_STATS = [
  { v: "205", l: "findings re-scored", s: "raw CVSS to contextual priority" },
  { v: "426", l: "reachable attack paths", s: "surfaced, not guessed" },
  { v: "47 / 85", l: "inventory score", s: "measured against target" },
  { v: "Agentless", l: "platform connectors", s: "nothing installed" },
];

const PIPELINE = [
  { n: "01", name: "IT Asset Discovery", sub: "EASM + network sweep", icon: NAV_ICON.globe },
  { n: "02", name: "IT Asset Inventory", sub: "the hub, nothing copied", icon: NAV_ICON.racks },
  { n: "03", name: "Criticality Assessments", sub: "bank-grade scoring", icon: NAV_ICON.gauge },
  { n: "04", name: "Vulnerabilities", sub: "contextual, not raw CVSS", icon: NAV_ICON.shieldAlert },
  { n: "05", name: "CTEM Scopes", sub: "exposure loop", icon: NAV_ICON.branch },
  { n: "06", name: "Assets Risk Posture", sub: "one banded score", icon: ICON.chart },
];

const SOURCES = ["NVD", "FIRST.org EPSS", "CISA KEV", "Exploit-DB", "GitHub PoCs", "Nessus"];

/** Framed light "screenshot" wrapper, with a breadcrumb bar in place of a dark chrome. */
function Screen({
  crumb,
  tag,
  children,
}: {
  crumb: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_24px_60px_-40px_rgba(13,148,136,.4)]">
      <div className="flex items-center justify-between border-b border-line-soft bg-[#f6fdfb] px-4 py-2.5">
        <span className="font-mono text-[10.5px] text-brand-deep">{crumb}</span>
        {tag && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-brand-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" style={{ animation: "cv-pulse-dot 2s infinite" }} />
            {tag}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function SectionHead({
  n,
  eyebrow,
  title,
  body,
}: {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div data-reveal className="mb-8 max-w-[620px]">
      <div className="mb-3 inline-flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand font-mono text-[12px] font-bold text-on-brand">
          {n}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[.18em] text-brand-ink">{eyebrow}</span>
      </div>
      <h2 className="font-display text-[26px] font-semibold leading-[1.12] tracking-[-.01em] text-ink sm:text-[32px]">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{body}</p>
    </div>
  );
}

export default function AssuranceView() {
  return (
    <div className="bg-white">
      <RevealOnScroll />

      {/* ---------------- Hero ---------------- */}
      <section className="relative -mt-[76px] overflow-hidden bg-[linear-gradient(180deg,#e9fbf6,#f6fdfb_55%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 18% 0%, rgba(30,212,176,.16), transparent 60%)," +
              "radial-gradient(ellipse 45% 40% at 90% 20%, rgba(61,223,194,.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1120px] px-6 pb-14 pt-[132px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            <Icon d={NAV_ICON.shieldCheck} size={13} />
            Cybersecurity Assurance
          </div>
          <h1 className="mx-auto max-w-[760px] font-display text-[36px] font-semibold leading-[1.06] tracking-[-.02em] text-ink sm:text-[52px]">
            Prove your attack surface. <span className="text-brand-deep">Don&apos;t guess it.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.65] text-ink-muted">
            Six modules, one loop: find what you own, score what matters, and
            re-rank every finding by what is genuinely exploitable on the host it
            sits on. Assets and vulnerabilities, one connected pipeline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/request-demo"
              className="rounded-full bg-brand px-7 py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
            <a
              href="#pipeline"
              className="rounded-full border border-[#d7e3e0] bg-white px-7 py-3.5 font-display text-[14.5px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
            >
              How it connects
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-3 md:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.l}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="rounded-2xl border border-line bg-white/80 p-4 text-left backdrop-blur-sm"
              >
                <div className="font-display text-[24px] font-bold tracking-[-.01em] text-brand-deep">
                  {s.v}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-ink">{s.l}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-ink-soft">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Pipeline ---------------- */}
      <section id="pipeline" className="scroll-mt-24 border-y border-line-warm bg-[#f6f8fa] px-6 py-[72px]">
        <div className="mx-auto max-w-[1120px]">
          <div data-reveal className="mb-10 text-center">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              One pipeline
            </div>
            <h2 className="mx-auto max-w-[640px] font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              One pipeline. The inventory is the hub.
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[14.5px] leading-[1.6] text-ink-soft">
              Discovery, scanning and identity all feed one inventory. CTEM reads
              exposure from it. And a re-scan, never a checkbox, is the only proof
              a fix actually landed.
            </p>
          </div>

          <div data-reveal className="relative">
            <div className="absolute left-0 right-0 top-[26px] hidden h-[2px] overflow-hidden bg-line md:block">
              <div
                className="h-full w-[28%] rounded-full bg-[linear-gradient(90deg,transparent,#1ed4b0,transparent)]"
                style={{ animation: "cv-flow-pulse 2.8s linear infinite" }}
              />
            </div>
            <ol className="relative grid grid-cols-2 gap-5 sm:grid-cols-3 md:flex md:justify-between md:gap-2">
              {PIPELINE.map((p, i) => (
                <li
                  key={p.name}
                  className="flex flex-col items-center text-center md:max-w-[160px] md:flex-1"
                  style={{ animation: `cv-stage-pop .45s ${i * 80}ms cubic-bezier(.22,1,.36,1) both` }}
                >
                  <span className="mb-2 flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-brand bg-white text-brand-ink">
                    <Icon d={p.icon} size={20} />
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-ink-faint">{p.n}</span>
                  <span className="text-[12.5px] font-semibold text-ink">{p.name}</span>
                  <span className="mt-0.5 text-[11px] leading-tight text-ink-soft">{p.sub}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Traceable sources */}
          <div data-reveal className="mt-11 rounded-2xl border border-line bg-white p-5 text-center">
            <p className="text-[13px] font-semibold text-ink">
              Nothing is invented. Every value traces to a source.
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">
              Scores, exploit maturity and known-exploited status are pulled live, not asserted.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {SOURCES.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 font-mono text-[11px] font-medium text-brand-forest"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 01 Discovery ---------------- */}
      <section className="px-6 py-[72px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHead
            n="01"
            eyebrow="IT Asset Discovery"
            title="See what the internet sees, and what hides inside your network."
            body="Discovery runs both directions: outside-in EASM from a domain, inside-out network sweep from a CIDR. Both turn unknowns into the same inventory, agentless."
          />
          <div data-reveal>
            <Screen crumb="compliverse / assurance / discovery" tag="LIVE · EASM + Network">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Outside-in */}
                <div className="rounded-xl border border-line-soft bg-[#f8fafc] p-3">
                  <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[.1em] text-brand-ink">
                    Outside-in · EASM
                  </div>
                  <div className="grid gap-1.5">
                    {["www.liztek.ca", "smtp.liztek.ca", "pop.liztek.ca", "mail.liztek.ca"].map((h, i) => (
                      <div
                        key={h}
                        className="flex items-center justify-between rounded-lg border border-line bg-white px-2.5 py-1.5"
                        style={{ animation: `cv-stage-pop .4s ${100 + i * 70}ms cubic-bezier(.22,1,.36,1) both` }}
                      >
                        <span className="font-mono text-[11px] text-ink">{h}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center font-mono text-[10px] text-ink-faint">8 internet-facing</div>
                </div>
                {/* Inside-out */}
                <div className="rounded-xl border border-line-soft bg-[#f8fafc] p-3">
                  <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[.1em] text-brand-ink">
                    Inside-out · Network sweep
                  </div>
                  <div className="grid gap-1.5">
                    {[
                      { k: "CIDR sweep", v: "203 hosts" },
                      { k: "Port sweep", v: "1,940 open" },
                      { k: "OS fingerprint", v: "profiled" },
                      { k: "Active Directory", v: "domain-joined" },
                    ].map((r, i) => (
                      <div
                        key={r.k}
                        className="flex items-center justify-between rounded-lg border border-line bg-white px-2.5 py-1.5"
                        style={{ animation: `cv-stage-pop .4s ${140 + i * 70}ms cubic-bezier(.22,1,.36,1) both` }}
                      >
                        <span className="text-[11px] text-ink-muted">{r.k}</span>
                        <span className="font-mono text-[10.5px] font-semibold text-brand-deep">{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Flow */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 rounded-xl border border-brand-200 bg-brand-50/60 px-3 py-2.5">
                {["Campaign", "Run", "Observation", "Inbox", "Connect", "Inventory"].map((s, i, a) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-brand-forest">{s}</span>
                    {i < a.length - 1 && <span className="text-brand/60">·</span>}
                  </span>
                ))}
              </div>
            </Screen>
          </div>
        </div>
      </section>

      {/* ---------------- 03 Criticality ---------------- */}
      <section className="border-y border-line-warm bg-[#f6f8fa] px-6 py-[72px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal className="order-2 lg:order-1">
            <Screen crumb="compliverse / assurance / criticality / core-banking-host" tag="ISCA · 28 / 32">
              <div className="mb-3 grid grid-cols-2 gap-2">
                {[
                  { k: "Operational", v: "4/4" },
                  { k: "Financial", v: "4/4" },
                  { k: "Customer", v: "3/4" },
                  { k: "Data sensitivity", v: "4/4" },
                  { k: "Access risk", v: "3/4" },
                  { k: "RTO / RPO", v: "4/4" },
                  { k: "Internet facing", v: "2/4" },
                  { k: "B2B exposure", v: "4/4" },
                ].map((c, i) => (
                  <div
                    key={c.k}
                    className="flex items-center justify-between rounded-lg border border-line bg-white px-2.5 py-1.5"
                    style={{ animation: `cv-stage-pop .4s ${80 + i * 50}ms cubic-bezier(.22,1,.36,1) both` }}
                  >
                    <span className="text-[11px] text-ink-muted">{c.k}</span>
                    <span className="font-mono text-[10.5px] font-semibold text-brand-deep">{c.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[.1em] text-brand-ink">Core banking host</div>
                  <div className="font-display text-[13px] font-semibold text-ink">Approved · signed, dated, locked</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[22px] font-bold text-brand-deep">28</div>
                  <div className="text-[10px] font-semibold text-brand-ink">Mission-Critical</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  { b: "6+", l: "Low" },
                  { b: "14+", l: "Moderate" },
                  { b: "22+", l: "High" },
                  { b: "28+", l: "Mission-Critical" },
                ].map((band) => (
                  <span key={band.l} className="rounded-md border border-line bg-[#f8fafc] px-2 py-1 text-[10px] text-ink-soft">
                    <b className="font-mono text-brand-deep">{band.b}</b> {band.l}
                  </span>
                ))}
              </div>
            </Screen>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead
              n="03"
              eyebrow="Criticality Assessments"
              title="Business criticality, scored, not a dropdown someone guessed."
              body="Two bank-grade templates score what an asset is worth across eight criteria, signed, locked, then used to re-rank every finding on the host. Criticality is an input, not a label."
            />
            <div data-reveal className="grid gap-2.5">
              {[
                { icon: NAV_ICON.gauge, t: "Eight scored criteria", b: "Operational, financial, customer, data, access, RTO/RPO and exposure." },
                { icon: NAV_ICON.branch, t: "Assessor, review, approved", b: "A governed workflow; an approved score is signed, dated and locked." },
                { icon: ICON.doc, t: "Exports on the bank template", b: "Promote to the risk register, or export .xlsx / PDF for the file." },
              ].map((f) => (
                <div key={f.t} className="flex gap-3.5 rounded-2xl border border-line bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-ink">
                    <Icon d={f.icon} size={19} />
                  </span>
                  <div>
                    <h3 className="font-display text-[14px] font-semibold text-ink">{f.t}</h3>
                    <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-soft">{f.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 04 Vulnerabilities ---------------- */}
      <section className="px-6 py-[72px]">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            n="04"
            eyebrow="Vulnerability Management"
            title="Stop patching by CVSS. Patch what is actually exploitable."
            body="Contextual priority weighs exposure, exploits and EPSS on top of CVSS. An urgent-looking 98 falls to 36 where nothing can reach it."
          />
          <div data-reveal className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
            {/* The re-score */}
            <Screen crumb="compliverse / assurance / vulnerabilities / VULN-299">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[.1em] text-ink-faint">Raw CVSS</div>
                  <div className="mt-1 font-display text-[40px] font-bold leading-none text-[#dc2626]">98</div>
                  <div className="mt-1 text-[10px] text-ink-soft">looks critical</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 font-mono text-[11px] font-bold text-brand-deep">↓ 62</span>
                  <svg width="100%" height="8" viewBox="0 0 100 8" className="mt-2" preserveAspectRatio="none">
                    <line x1="2" y1="4" x2="98" y2="4" stroke="#1ed4b0" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                  <span className="mt-1 text-[10px] text-ink-soft">re-scored on the host</span>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[.1em] text-ink-faint">Contextual</div>
                  <div className="mt-1 font-display text-[40px] font-bold leading-none text-brand-deep">36</div>
                  <div className="mt-1 text-[10px] text-ink-soft">actually is</div>
                </div>
              </div>
              <p className="mt-4 rounded-xl border border-line-soft bg-[#f8fafc] px-3 py-2.5 text-[12px] leading-[1.55] text-ink-muted">
                Internal-only host, no known exploit, not in CISA KEV. The urgent
                CVSS 98 falls to a contextual 36.
              </p>
              <div className="mt-3 grid gap-1.5">
                {[
                  { k: "CVSS severity", v: "20 / 20" },
                  { k: "Exploit probability (EPSS 0.4%)", v: "0.08 / 20" },
                  { k: "Known exploited (KEV)", v: "0 / 20" },
                  { k: "Network reachability", v: "3 / 20" },
                ].map((r) => (
                  <div key={r.k} className="flex items-center justify-between text-[11.5px]">
                    <span className="text-ink-muted">{r.k}</span>
                    <span className="font-mono font-semibold text-brand-deep">{r.v}</span>
                  </div>
                ))}
              </div>
            </Screen>

            {/* Looks like vs actually is */}
            <Screen crumb="205 findings · re-ranked by exposure" tag="Contextual lens">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[.1em] text-ink-faint">Looks like</div>
                  {[
                    { l: "Critical", n: 11, c: "#dc2626" },
                    { l: "High", n: 13, c: "#ea580c" },
                    { l: "Medium", n: 180, c: "#d97706" },
                  ].map((b) => (
                    <Bar key={b.l} label={b.l} n={b.n} max={205} color={b.c} />
                  ))}
                </div>
                <div>
                  <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[.1em] text-brand-ink">Actually is</div>
                  {[
                    { l: "Urgent", n: 1, c: "#dc2626" },
                    { l: "Moderate", n: 23, c: "#d97706" },
                    { l: "Low", n: 181, c: "#1ed4b0" },
                  ].map((b) => (
                    <Bar key={b.l} label={b.l} n={b.n} max={205} color={b.c} />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line-soft pt-3">
                {["Open", "In Progress", "Remediated", "Verified", "Closed"].map((s, i, a) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-semibold text-ink-muted">{s}</span>
                    {i < a.length - 1 && <span className="text-brand/50 text-[10px]">·</span>}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-ink-soft">
                A re-scan proves the fix. Verified, not a claim.
              </p>
            </Screen>
          </div>
        </div>
      </section>

      {/* ---------------- 05 CTEM ---------------- */}
      <section className="border-y border-line-warm bg-[#f6f8fa] px-6 py-[72px]">
        <div className="mx-auto max-w-[1000px] text-center">
          <div data-reveal className="mb-3 inline-flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand font-mono text-[12px] font-bold text-on-brand">05</span>
            <span className="text-[11px] font-bold uppercase tracking-[.18em] text-brand-ink">CTEM exposure loop</span>
          </div>
          <h2 data-reveal className="mx-auto max-w-[680px] font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            Scope, prioritise, validate, mobilise. 426 reachable paths, not a list of CVEs.
          </h2>
          <div data-reveal className="relative mt-10">
            <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { s: "Scope", d: "the surface that matters" },
                { s: "Prioritise", d: "by real exploitability" },
                { s: "Validate", d: "reachable attack paths" },
                { s: "Mobilise", d: "assign, one owner" },
              ].map((c, i) => (
                <li
                  key={c.s}
                  className="rounded-2xl border border-line bg-white p-5 text-left"
                  style={{ animation: `cv-stage-pop .45s ${i * 90}ms cubic-bezier(.22,1,.36,1) both` }}
                >
                  <span className="font-mono text-[11px] font-bold text-brand-deep">0{i + 1}</span>
                  <div className="mt-1 font-display text-[15px] font-semibold text-ink">{c.s}</div>
                  <div className="mt-1 text-[12px] leading-[1.5] text-ink-soft">{c.d}</div>
                </li>
              ))}
            </ol>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-[12.5px] font-semibold text-brand-forest">
              <span aria-hidden="true">↺</span>
              Every verified fix re-enters discovery. The surface is never done.
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 06 Posture ---------------- */}
      <section className="px-6 py-[72px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <SectionHead
            n="06"
            eyebrow="Assets Risk Posture"
            title="One composite risk score per asset, banded, not vibes."
            body="CIS, vulnerabilities, criticality, controls and linked risk blend into one banded score per asset, tuned to your own appetite with business multipliers for exposure and data class."
          />
          <div data-reveal>
            <Screen crumb="compliverse / assurance / risk-posture" tag="Banking preset · tunable">
              <div className="flex items-center gap-4 rounded-xl border border-line-soft bg-[#f8fafc] px-4 py-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[.1em] text-ink-faint">Average risk / 100</div>
                  <div className="font-display text-[30px] font-bold leading-none text-[#d97706]">64.2</div>
                </div>
                <span className="rounded-full bg-[#fffbeb] px-2.5 py-1 text-[11px] font-bold text-[#b45309]">Elevated</span>
                <div className="ml-auto text-right text-[11px] text-ink-soft">
                  2 of 10 assets<br />scored so far
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-ink-faint">
                  How the score is built · five weighted dimensions
                </div>
                {[
                  { k: "Open vulnerabilities", w: 30 },
                  { k: "CIS Benchmark gap", w: 25 },
                  { k: "CIA criticality", w: 15 },
                  { k: "Control coverage gap", w: 15 },
                  { k: "Linked-risk residual", w: 15 },
                ].map((d, i) => (
                  <div key={d.k} className="flex items-center gap-2.5 py-1">
                    <span className="w-[150px] shrink-0 text-[11.5px] text-ink-muted">{d.k}</span>
                    <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-line-soft">
                      <span
                        className="block h-full rounded-full bg-brand"
                        style={{ width: `${d.w * 3.2}%`, animation: `cv-grow 1s ${i * 90}ms both` }}
                      />
                    </span>
                    <span className="w-8 text-right font-mono text-[10.5px] font-semibold text-brand-deep">{d.w}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  { l: "Contained", c: "#1ed4b0" },
                  { l: "Watch", c: "#65a30d" },
                  { l: "Elevated", c: "#d97706" },
                  { l: "Severe", c: "#dc2626" },
                ].map((b) => (
                  <span key={b.l} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[10.5px] text-ink-soft">
                    <span className="h-2 w-2 rounded-full" style={{ background: b.c }} />
                    {b.l}
                  </span>
                ))}
              </div>
            </Screen>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-[#d9f3ec] bg-[linear-gradient(160deg,#e9fbf6,#f6fdfb)] px-6 py-[76px]">
        <div data-reveal className="mx-auto max-w-[680px] text-center">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-on-brand">
            <Sparkle />
          </div>
          <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[34px]">
            Every asset, every finding. One connected graph.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            See discovery, inventory, criticality, vulnerabilities, CTEM and
            posture working together against your own surface.
          </p>
          <div className="mt-7">
            <Link
              href="/request-demo"
              className="inline-block rounded-full bg-brand px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/** A tiny horizontal bar for the vuln distribution. */
function Bar({ label, n, max, color }: { label: string; n: number; max: number; color: string }) {
  return (
    <div className="mb-1.5">
      <div className="flex items-center justify-between text-[10.5px]">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono font-semibold text-ink">{n}</span>
      </div>
      <span className="mt-0.5 block h-[5px] overflow-hidden rounded-full bg-line-soft">
        <span
          className="block h-full rounded-full"
          style={{ width: `${Math.max(4, (n / max) * 100)}%`, background: color, animation: "cv-grow 1s both" }}
        />
      </span>
    </div>
  );
}
