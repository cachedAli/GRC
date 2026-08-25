import Link from "next/link";
import { Sparkle } from "@/components/ui/Primitives";

const CARD =
  "flex flex-col gap-2 rounded-[18px] border border-[#e4efec] bg-[#f4f9f8] p-5 text-inherit transition hover:border-brand hover:shadow-[0_18px_40px_-22px_rgba(13,148,136,.35)]";

const COMPLIANCE_ROWS = [
  { name: "SAMA CSF", pct: 78 },
  { name: "ISO 27001", pct: 91 },
  { name: "SOC 2", pct: 87 },
];

const VENDORS = [
  { name: "PayGate Ltd", ini: "PG", bg: "#eef4ff", fg: "#1d4ed8", sev: "Critical", sevBg: "#fee2e2", sevFg: "#b91c1c" },
  { name: "CloudHost KSA", ini: "CH", bg: "#e8fcf8", fg: "#0c8f76", sev: "Medium", sevBg: "#fef9c3", sevFg: "#a16207" },
  { name: "DataVault Inc", ini: "DV", bg: "#f5f3ff", fg: "#6d28d9", sev: "Low", sevBg: "#dcfce7", sevFg: "#15803d" },
];

const AUDIT = [
  { fw: "SOC 2", pct: "87% ready", glyph: "◐", tone: "text-brand-ink" },
  { fw: "ISO 27001", pct: "74% ready", glyph: "◐", tone: "text-brand-ink" },
  { fw: "SAMA CSF", pct: "58% ready", glyph: "◔", tone: "text-[#b45309]" },
  { fw: "PCI DSS", pct: "81% ready", glyph: "◐", tone: "text-brand-ink" },
];

/**
 * Policy lifecycle pips. `stage` is 1-5; everything before it is done, the
 * stage itself takes the status colour, the rest stay grey.
 */
const LIFECYCLE = [
  { name: "Cyber Security Policy", stage: 5, status: "Published", cur: "#10b981", fg: "#047857" },
  { name: "Access Control Policy", stage: 3, status: "Approval", cur: "#f59e0b", fg: "#b45309" },
  { name: "BCM Plan", stage: 2, status: "Review", cur: "#f59e0b", fg: "#b45309" },
];

const HEAT = [
  ["#fde68a", "#92570e", 4], ["#fca5a5", "#9b1c1c", 2], ["#f87171", "#ffffff", 1],
  ["#a7f3d0", "#065f46", 6], ["#fde68a", "#92570e", 3], ["#fca5a5", "#9b1c1c", 2],
  ["#6ee7b7", "#065f46", 9], ["#a7f3d0", "#065f46", 5], ["#fde68a", "#92570e", 2],
] as const;

export default function CapabilityGrid() {
  return (
    <section className="bg-white px-6 pb-[76px] pt-[54px]">
      <div className="mx-auto max-w-[1150px]">
        <div data-reveal className="mx-auto mb-9 max-w-[600px] text-center">
          <h2 className="font-display text-[28px] font-semibold tracking-[-.01em] text-ink sm:text-[34px]">
            It&apos;s all here.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
            Governance, compliance, risk and proof, one data model, thirteen modules,
            AI in every one of them.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Compliance */}
          <Link data-reveal href="/platform/assessments" className={CARD}>
            <b className="font-display text-[15.5px] text-ink">Compliance</b>
            <span className="text-[12.5px] leading-[1.55] text-ink-soft">
              Multi-framework assessments with AI evidence recommendations.
            </span>
            <span className="mt-1.5 rounded-xl border border-line bg-white p-3">
              {COMPLIANCE_ROWS.map((c) => (
                <span key={c.name} className="flex items-center gap-2 py-[4.5px]">
                  <b className="w-[74px] text-[11px] font-semibold text-[#334155]">{c.name}</b>
                  <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-line-soft">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${c.pct}%` }}
                    />
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-brand-ink">
                    {c.pct}%
                  </span>
                </span>
              ))}
            </span>
          </Link>

          {/* Risk */}
          <Link
            data-reveal
            href="/platform/risk"
            className={CARD}
            style={{ transitionDelay: ".08s" }}
          >
            <b className="font-display text-[15.5px] text-ink">Risk (ERM)</b>
            <span className="text-[12.5px] leading-[1.55] text-ink-soft">
              Register, KRIs, RCSA and appetite, scored on a live heatmap.
            </span>
            <span className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-line bg-white p-3">
              <span className="grid grid-cols-[repeat(3,26px)] gap-[3px] [grid-auto-rows:26px]">
                {HEAT.map(([bg, fg, n], i) => (
                  <span
                    key={i}
                    className="flex items-center justify-center rounded-[5px] text-[9px] font-bold"
                    style={{ background: bg, color: fg }}
                  >
                    {n}
                  </span>
                ))}
              </span>
              <span className="text-[11px] leading-[1.6] text-ink-muted">
                34 open risks
                <br />
                <b className="text-ink">5 above appetite</b>
                <br />3 KRIs breaching
              </span>
            </span>
          </Link>

          {/* TPRM */}
          <Link
            data-reveal
            href="/platform/vendors"
            className={CARD}
            style={{ transitionDelay: ".16s" }}
          >
            <b className="font-display text-[15.5px] text-ink">Third-Party Risk</b>
            <span className="text-[12.5px] leading-[1.55] text-ink-soft">
              Vendor lifecycle with continuous monitoring and AI questionnaires.
            </span>
            <span className="mt-1.5 rounded-xl border border-line bg-white p-3">
              {VENDORS.map((v) => (
                <span key={v.name} className="flex items-center gap-2 py-[4.5px]">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[9px] font-bold"
                    style={{ background: v.bg, color: v.fg }}
                  >
                    {v.ini}
                  </span>
                  <b className="flex-1 text-[11px] font-semibold text-[#334155]">{v.name}</b>
                  <span className="text-[9px] font-semibold text-brand-ink">
                    <Sparkle /> On
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                    style={{ color: v.sevFg, background: v.sevBg }}
                  >
                    {v.sev}
                  </span>
                </span>
              ))}
            </span>
          </Link>

          {/* Audit */}
          <Link data-reveal href="/platform/audit" className={CARD}>
            <b className="font-display text-[15.5px] text-ink">Audit</b>
            <span className="text-[12.5px] leading-[1.55] text-ink-soft">
              Universe to findings, packages assemble from existing links.
            </span>
            <span className="mt-1.5 grid grid-cols-2 gap-[7px] rounded-xl border border-line bg-white p-3">
              {AUDIT.map((a) => (
                <span key={a.fw} className="rounded-lg border border-line px-2.5 py-2">
                  <b className="block text-[10.5px] text-ink">{a.fw}</b>
                  <span className={`text-[9.5px] font-semibold ${a.tone}`}>
                    {a.glyph} {a.pct}
                  </span>
                </span>
              ))}
            </span>
          </Link>

          {/* Documents */}
          <Link
            data-reveal
            href="/platform/governance"
            className={CARD}
            style={{ transitionDelay: ".08s" }}
          >
            <b className="font-display text-[15.5px] text-ink">Documents &amp; Policy</b>
            <span className="text-[12.5px] leading-[1.55] text-ink-soft">
              Draft → review → approve → publish, with AI drafting and attestations.
            </span>
            <span className="mt-1.5 rounded-xl border border-line bg-white p-3">
              {LIFECYCLE.map((d) => (
                <span key={d.name} className="flex items-center gap-2 py-[4.5px]">
                  <b className="flex-1 text-[11px] font-semibold text-[#334155]">{d.name}</b>
                  <span className="inline-flex gap-[2.5px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="h-1 w-[11px] rounded-full"
                        style={{
                          background:
                            i < d.stage - 1 ? "#1ed4b0" : i === d.stage - 1 ? d.cur : "#e2e8f0",
                        }}
                      />
                    ))}
                  </span>
                  <span className="text-[9.5px] font-semibold" style={{ color: d.fg }}>
                    {d.status}
                  </span>
                </span>
              ))}
            </span>
          </Link>

          {/* ComplyChat, the one dark card, so the AI story reads as the finale. */}
          <Link
            data-reveal
            href="/platform/insights"
            className="flex flex-col gap-2 rounded-[18px] border border-[#0b1220] bg-[#0b1220] p-5 text-inherit transition hover:shadow-[0_18px_40px_-20px_rgba(11,18,32,.5)]"
            style={{ transitionDelay: ".16s" }}
          >
            <b className="font-display text-[15.5px] text-white">ComplyChat AI</b>
            <span className="text-[12.5px] leading-[1.55] text-slate-200/65">
              Ask a plain question, get an answer you can act on and trust.
            </span>
            <span className="mt-1.5 rounded-xl border border-[#3ddfc2]/25 bg-white/5 p-3">
              <span className="block text-[11px] leading-[1.6] text-slate-200/85">
                <b className="text-[#3ddfc2]">Q:</b> Which controls block the Q3 SOC 2 audit?
              </span>
              <span className="mt-1.5 block text-[11px] leading-[1.6] text-slate-200/85">
                <b className="text-[#3ddfc2]">A:</b> 3 controls lack evidence, CC6.1, CC6.8,
                CC7.2. Two can reuse ISO artifacts. <u>Queue links?</u>
              </span>
              <span className="mt-2 inline-block rounded-full border border-[#3ddfc2]/40 px-2.5 py-[3px] text-[9.5px] font-semibold text-[#3ddfc2]">
                <Sparkle /> Answers only from your own data
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
