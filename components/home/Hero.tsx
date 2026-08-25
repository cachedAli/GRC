import Link from "next/link";
import { ATTENTION, ICON } from "@/data/home";
import { Icon, Sparkle } from "@/components/ui/Primitives";
import TypedCapabilities from "@/components/home/TypedCapabilities";
import HeroStats from "@/components/home/HeroStats";

/** Small KPI tile inside the dashboard mock. */
function Kpi({
  label,
  value,
  pct,
  valueClass = "text-ink",
  barClass = "bg-brand",
}: {
  label: string;
  value: string;
  pct: number;
  valueClass?: string;
  barClass?: string;
}) {
  return (
    <div className="rounded-[11px] border border-line bg-white px-3 py-2.5">
      <div className="text-[10px] font-medium text-ink-soft">{label}</div>
      <div className={`font-display text-[19px] font-bold ${valueClass}`}>{value}</div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line-soft">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/**
 * The hero pulls itself up under the floating nav island (76px of sticky
 * layout) so the gradient runs behind it, then pads its content clear again.
 * Scoped here rather than on the nav, so inner pages keep normal top spacing.
 */
export default function Hero() {
  return (
    <section className="relative -mt-[76px] overflow-hidden bg-[linear-gradient(180deg,#d9f4ee_0%,#eefaf6_28%,#f6fdfb_60%,#ffffff_100%)]">
      {/* Two soft brand blooms behind the fold. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 18% 0%, rgba(30,212,176,.16), transparent 60%)," +
            "radial-gradient(ellipse 40% 35% at 90% 20%, rgba(61,223,194,.12), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-11 px-6 pb-[70px] pt-[132px] lg:grid-cols-[1.02fr_1fr]">
        <div>
          <div className="cv-fade-up inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[.18em] text-brand-ink">
            <Icon d={ICON.spark} size={13} strokeWidth={1.8} />
            AI-native enterprise GRC
          </div>

          <h1
            className="cv-fade-up mt-[18px] font-display text-[38px] font-semibold leading-[1.09] tracking-[-.018em] text-ink sm:text-[50px]"
            style={{ animationDelay: ".07s" }}
          >
            Compliance that
            <br />
            proves itself.
          </h1>

          <p
            className="cv-fade-up mt-5 max-w-[470px] text-[16.5px] leading-[1.68] text-ink-muted"
            style={{ animationDelay: ".14s" }}
          >
            Every framework, document, control, risk and piece of evidence in one
            connected system. Gaps surface on their own.
          </p>

          <div
            className="cv-fade-up mt-7 flex flex-wrap gap-3"
            style={{ animationDelay: ".21s" }}
          >
            <Link
              href="/request-demo"
              className="rounded-full bg-brand px-7 py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
          </div>

          {/* One typed capability claim, cycling through the modules. */}
          <div className="cv-fade-up mt-8" style={{ animationDelay: ".28s" }}>
            <TypedCapabilities />
          </div>

          <div className="cv-fade-up mt-6" style={{ animationDelay: ".34s" }}>
            <HeroStats />
          </div>
        </div>

        {/* Product mock */}
        <div className="cv-fade-up relative mt-6 lg:mt-0" style={{ animationDelay: ".2s" }}>
          <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_30px_70px_-30px_rgba(13,148,136,.3),0_8px_24px_-12px_rgba(15,23,42,.12)]">
            <div className="flex items-center gap-1.5 border-b border-line-soft bg-[#fbfdfd] px-3.5 py-2.5">
              {/* macOS traffic lights: close / minimise / full-screen. */}
              <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[10px] text-ink-faint">
                app.compliverse.ai/dashboard
              </span>
            </div>

            <div className="flex flex-col gap-3 bg-[#f8fafc] px-[18px] py-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-[13.5px] font-semibold text-ink">
                  Unified GRC Dashboard
                </span>
                <span className="rounded-full border border-brand-200 bg-brand-100 px-2.5 py-[3px] text-[10px] font-semibold text-brand-ink">
                  <Sparkle /> AI Insights
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <Kpi label="Compliance" value="78%" pct={78} />
                <Kpi label="Evidence" value="82%" pct={82} />
                <Kpi
                  label="Open gaps"
                  value="21"
                  pct={14}
                  valueClass="text-[#c2410c]"
                  barClass="bg-[#f59e0b]"
                />
              </div>

              <div className="rounded-[11px] border border-line bg-white px-3.5 py-3">
                <div className="mb-[7px] text-[10.5px] font-semibold text-[#334155]">
                  Needs attention
                </div>
                {ATTENTION.map((a) => (
                  <div
                    key={a.text}
                    className="flex items-center gap-2 border-t border-[#f8fafc] py-[5px]"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: a.dot }}
                    />
                    <span className="flex-1 text-[11px] text-ink-muted">{a.text}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                      style={{ color: a.fg, background: a.bg }}
                    >
                      {a.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating AI callout, evidence reuse. */}
          <div
            className="absolute -right-3.5 -top-[22px] hidden w-[250px] rounded-[14px] border border-brand-200 bg-white px-[15px] py-3.5 shadow-[0_20px_44px_-18px_rgba(13,148,136,.4)] sm:block"
            style={{ animation: "cv-float-y 5s ease-in-out infinite" }}
          >
            <div className="mb-1.5 flex items-center gap-[7px] text-[10.5px] font-bold tracking-[.08em] text-brand-ink">
              <Icon d={ICON.spark} size={12} strokeWidth={1.8} />
              AI · EVIDENCE REUSE
            </div>
            <div className="text-[11.5px] leading-[1.55] text-[#334155]">
              <b>Cloud-Security-Policy.pdf</b> also satisfies <b>ISO 27001 A.5.23</b>{" "}
              and <b>SOC 2 CC9.2</b>.
            </div>
            <span className="mt-2 inline-block rounded-full bg-brand px-3 py-1 text-[10.5px] font-semibold text-on-brand">
              Create 2 links
            </span>
          </div>

          {/* Floating gap callout. */}
          <div
            className="absolute -bottom-5 -left-[18px] hidden w-[238px] rounded-[14px] border border-line bg-white px-[15px] py-3.5 shadow-[0_20px_44px_-18px_rgba(15,23,42,.25)] sm:block"
            style={{ animation: "cv-float-y 6s .8s ease-in-out infinite" }}
          >
            <div className="mb-1.5 flex items-center gap-[7px]">
              <span className="rounded-full bg-[#fee2e2] px-2 py-0.5 text-[9.5px] font-bold text-[#b91c1c]">
                GAP
              </span>
              <span className="font-mono text-[10px] text-ink-soft">SAMA 3.3.14</span>
            </div>
            <div className="text-[11.5px] leading-[1.55] text-[#334155]">
              No documented cloud-exit strategy for material workloads.
            </div>
            <span className="mt-2 inline-block rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-[10.5px] font-semibold text-brand-ink">
              <Sparkle /> Draft the policy section
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
