import Link from "next/link";
import type { FrameworkGuide } from "@/data/frameworks";
import { Icon, Sparkle, RevealOnScroll } from "@/components/ui/Primitives";
import { ICON } from "@/data/home";
import FrameworkGraphic from "@/components/frameworks/FrameworkGraphic";
import FrameworkWorkspace from "@/components/frameworks/FrameworkWorkspace";

/**
 * One framework guide page. Graphics-first: the framework's own constellation
 * carries the hero, and overview / importance / scope / journey are told in
 * compact cards and an animated rail rather than walls of text.
 */
export default function FrameworkGuideView({ guide }: { guide: FrameworkGuide }) {
  const a = guide.accent;
  return (
    <div className="bg-white">
      <RevealOnScroll />

      {/* ---------------- Hero ---------------- */}
      <section className="relative -mt-[76px] overflow-hidden bg-[linear-gradient(180deg,#eefaf6,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 45% at 82% 18%, ${a}22, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-[128px] lg:grid-cols-[1fr_1.05fr]">
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] backdrop-blur-sm"
              style={{ borderColor: `${a}55`, color: a }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={guide.logo} alt="" className="h-4 w-4 rounded object-contain" />
              {guide.category} · {guide.region}
            </div>
            <h1 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-.02em] text-ink sm:text-[48px]">
              {guide.name}
            </h1>
            <div className="mt-2 font-mono text-[12.5px] text-ink-soft">{guide.full}</div>
            <p className="mt-5 max-w-[480px] text-[16px] leading-[1.6] text-ink-muted">
              {guide.overview}
            </p>

            <div className="mt-7">
              <Link
                href="/request-demo"
                className="inline-block rounded-full bg-brand px-7 py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
              >
                Book a live demo
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-8 border-t border-line-soft pt-6">
              {guide.facts.map((f) => (
                <div key={f.label}>
                  <div
                    className="font-display text-[22px] font-bold tracking-[-.01em]"
                    style={{ color: a }}
                  >
                    {f.value}
                  </div>
                  <div className="mt-0.5 text-[11.5px] uppercase tracking-[.08em] text-ink-soft">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal>
            <FrameworkGraphic guide={guide} />
            <div className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[.14em] text-ink-faint">
              {guide.nodesLabel}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Importance + scope ---------------- */}
      <section className="px-6 py-[70px]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[20px] border border-line bg-white p-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
              style={{ background: a, opacity: 0.12 }}
            />
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-white"
              style={{ background: a }}
            >
              <Icon d={ICON.trend} size={20} />
            </span>
            <h2 className="relative mt-4 font-display text-[18px] font-semibold text-ink">
              Why it matters
            </h2>
            <p className="relative mt-2 text-[14px] leading-[1.6] text-ink-muted">
              {guide.importance}
            </p>
          </div>

          <div
            data-reveal
            style={{ transitionDelay: "80ms" }}
            className="relative overflow-hidden rounded-[20px] border border-line bg-white p-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
              style={{ background: a, opacity: 0.12 }}
            />
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-white"
              style={{ background: a }}
            >
              <Icon d={ICON.users} size={20} />
            </span>
            <h2 className="relative mt-4 font-display text-[18px] font-semibold text-ink">
              Who it&apos;s for
            </h2>
            <p className="relative mt-2 text-[14px] leading-[1.6] text-ink-muted">
              {guide.scope}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- The journey ---------------- */}
      <section className="border-y border-line-warm bg-[#f6f8fa] px-6 py-[70px]">
        <div className="mx-auto max-w-[1080px]">
          <div data-reveal className="mb-10 text-center">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em]" style={{ color: a }}>
              The journey
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              How you get to {guide.name}
            </h2>
          </div>

          <div data-reveal className="relative">
            <div className="absolute left-0 right-0 top-[26px] hidden h-[2px] overflow-hidden bg-line md:block">
              <div
                className="h-full w-[32%] rounded-full"
                style={{
                  background: `linear-gradient(90deg,transparent,${a},transparent)`,
                  animation: "cv-flow-pulse 2.8s linear infinite",
                }}
              />
            </div>
            <ol className="relative grid grid-cols-2 gap-5 sm:grid-cols-3 md:flex md:justify-between md:gap-2">
              {guide.phases.map((s, i) => (
                <li
                  key={s.label}
                  className="flex flex-col items-center text-center md:max-w-[150px] md:flex-1"
                  style={{ animation: `cv-stage-pop .45s ${i * 90}ms cubic-bezier(.22,1,.36,1) both` }}
                >
                  <span
                    className="mb-2 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] bg-white font-mono text-[13px] font-bold"
                    style={{ borderColor: a, color: a }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                  <span className="mt-0.5 text-[11px] leading-tight text-ink-soft">{s.sub}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- The workspace (drawn screenshot) ---------------- */}
      <section className="px-6 py-[76px]">
        <div className="mx-auto max-w-[1120px]">
          <div data-reveal className="mb-10 max-w-[600px]">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              On Compliverse
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              {guide.name}, worked in the platform
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Drawn workspace screenshot, tilted in 3D */}
            <div data-reveal className="[perspective:1500px]">
              <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div
                  className="origin-left transition-transform duration-500 lg:[transform:rotateY(-9deg)_rotateX(5deg)] lg:hover:[transform:rotateY(-4deg)_rotateX(2deg)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-fit rounded-[18px] border border-line bg-white p-2 shadow-[0_36px_80px_-40px_rgba(13,148,136,.4),0_12px_30px_-16px_rgba(15,23,42,.25)]">
                    <FrameworkWorkspace guide={guide} />
                  </div>
                </div>
              </div>
            </div>

            {/* The evidence + template story */}
            <div data-reveal style={{ transitionDelay: "80ms" }} className="grid gap-3.5">
              {[
                { icon: ICON.spark, title: "Get the evidence you need", body: `The AI recommends which evidence answers each ${guide.name} control, ready to confirm.` },
                { icon: ICON.alert, title: "See what's missing", body: "Gaps and missing artifacts surface on their own, not the week of the audit." },
                { icon: ICON.doc, title: "Create from templates", body: "Spin up policies, assessments and charters from standard templates, then tailor them to your scope." },
                { icon: ICON.shield, title: "Collected once, reused", body: "One artifact satisfies this framework and every other it maps to." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3.5 rounded-2xl border border-line bg-white p-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${a}14`, color: a }}
                  >
                    <Icon d={f.icon} size={19} />
                  </span>
                  <div>
                    <h3 className="font-display text-[14px] font-semibold text-ink">{f.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-soft">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section
        className="border-t px-6 py-[72px]"
        style={{ borderColor: `${a}33`, background: `linear-gradient(160deg,${a}12,#f6fdfb)` }}
      >
        <div data-reveal className="mx-auto max-w-[640px] text-center">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ background: a }}>
            <Sparkle />
          </div>
          <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            Get {guide.name}-ready on your own stack.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Demos are scoped to your frameworks. Pick a slot and we&apos;ll run {guide.name} live.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/request-demo"
              className="rounded-full bg-brand px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
            <Link
              href="/frameworks"
              className="rounded-full border border-[#d7e3e0] bg-white px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
            >
              All frameworks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
