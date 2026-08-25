import Link from "next/link";
import type { ModuleStory } from "@/data/modules";
import { CAPABILITY_PAGES } from "@/data/capabilityPages";
import { MODULE_STORIES } from "@/data/modules";
import { Icon, Sparkle } from "@/components/ui/Primitives";
import ModuleScene from "@/components/home/ModuleScenes";
import { RevealOnScroll } from "@/components/ui/Primitives";

/**
 * The dedicated page for one capability.
 *
 * The module's animated scene (a drawn recreation of the real platform UI) is
 * the hero mockup, tilted in 3D. Everything else is assembled from the module's
 * own flow, links and differentiator plus the page detail in CAPABILITY_PAGES,
 * so every capability gets a distinct, on-brand page from one template.
 */
export default function CapabilityPageView({ story }: { story: ModuleStory }) {
  const page = CAPABILITY_PAGES[story.key];
  if (!page) return null;

  const second = page.secondScene
    ? MODULE_STORIES.find((m) => m.key === page.secondScene)
    : null;

  return (
    <div className="bg-white">
      <RevealOnScroll />

      {/* ---------------- Hero ---------------- */}
      <section className="relative -mt-[76px] overflow-hidden bg-[linear-gradient(180deg,#e9fbf6,#f6fdfb_60%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 15% 0%, rgba(30,212,176,.16), transparent 60%)," +
              "radial-gradient(ellipse 45% 40% at 95% 30%, rgba(61,223,194,.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-[132px] lg:grid-cols-[1fr_1.05fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
              <Icon d={story.icon} size={13} />
              {page.eyebrow}
            </div>
            <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-.02em] text-ink sm:text-[46px]">
              {story.name}
            </h1>
            <p className="mt-5 max-w-[480px] text-[16px] leading-[1.65] text-ink-muted">
              {page.subtitle}
            </p>

            <div className="mt-7">
              <Link
                href="/request-demo"
                className="inline-block rounded-full bg-brand px-7 py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
              >
                Book a live demo
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-8 border-t border-brand-200/60 pt-6">
              {page.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[20px] font-bold tracking-[-.01em] text-ink">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[11.5px] uppercase tracking-[.08em] text-ink-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D-tilted platform mockup, stacked for depth */}
          <div className="[perspective:1600px]">
            <div
              className="relative origin-center transition-transform duration-500 [transform:rotateY(-13deg)_rotateX(7deg)] hover:[transform:rotateY(-7deg)_rotateX(4deg)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* two offset panels sitting behind, so the mockup reads as a 3D stack */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[22px] border border-brand-200/50 bg-white/45"
                style={{ transform: "translateZ(-70px) translate(30px,30px)" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[22px] border border-line bg-white/70"
                style={{ transform: "translateZ(-36px) translate(15px,15px)" }}
              />
              <div className="relative rounded-[22px] border border-line bg-white p-2.5 shadow-[0_40px_90px_-40px_rgba(13,148,136,.45),0_12px_30px_-16px_rgba(15,23,42,.25)]">
                <ModuleScene story={story} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Problem → shift ---------------- */}
      <section className="border-b border-line-warm bg-white px-6 py-[72px]">
        <div className="mx-auto max-w-[1120px]">
          <div data-reveal className="mb-9 text-center">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              Why it matters
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              From scattered to connected.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            {/* The old way */}
            <div
              data-reveal
              className="rounded-[20px] border border-[#f0dfc4] bg-[#fdf8ef] p-7"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#eacf9f] bg-white/70 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-[#a16207]">
                <span className="grid grid-cols-2 gap-[2px]">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-[2px] bg-[#d4a24a]" />
                  ))}
                </span>
                The old way
              </div>
              <p className="mb-5 font-display text-[18px] font-semibold leading-snug text-[#7c5410]">
                {page.problem.pain}
              </p>
              <ul className="grid gap-3">
                {page.problem.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#f3d9b0] text-[#a16207]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] leading-[1.55] text-[#8a6a34]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connector arrow */}
            <div
              aria-hidden="true"
              className="hidden items-center justify-center md:flex"
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-ink shadow-[0_8px_20px_-10px_rgba(13,148,136,.5)]">
                <span
                  className="absolute inset-0 rounded-full border border-brand/40"
                  style={{ animation: "cv-ring-ping 2.4s ease-out infinite" }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* With Complyverse */}
            <div
              data-reveal
              style={{ transitionDelay: "90ms" }}
              className="relative overflow-hidden rounded-[20px] border border-brand-200 bg-[linear-gradient(160deg,#effcf8,#ffffff_65%)] p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl"
              />
              <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-brand-ink">
                <Sparkle />
                With Complyverse
              </div>
              <p className="relative mb-5 font-display text-[18px] font-semibold leading-snug text-brand-forest">
                {page.problem.gain}
              </p>
              <ul className="relative grid gap-3">
                {page.problem.gainPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] leading-[1.55] text-ink-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="px-6 py-[76px]">
        <div className="mx-auto max-w-[1120px]">
          <div data-reveal className="mb-10 max-w-[560px]">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              What you get
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              Built for the way regulated teams actually work.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {page.features.map((f, i) => (
              <div
                key={f.title}
                data-reveal
                style={{ transitionDelay: `${(i % 2) * 70}ms` }}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand-200 hover:shadow-[0_16px_40px_-24px_rgba(13,148,136,.4)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-ink transition-colors group-hover:bg-brand group-hover:text-on-brand">
                  <Icon d={f.icon} size={20} />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-ink-soft">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works (flow) ---------------- */}
      <section className="border-y border-line-warm bg-[#f6f8fa] px-6 py-[70px]">
        <div className="mx-auto max-w-[1120px]">
          <div data-reveal className="mb-9 text-center">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              End to end
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              How it flows
            </h2>
          </div>

          <div data-reveal className="relative">
            <div className="absolute left-0 right-0 top-[26px] hidden h-[2px] overflow-hidden bg-line md:block">
              <div
                className="h-full w-[38%] rounded-full bg-[linear-gradient(90deg,transparent,#1ed4b0,transparent)]"
                style={{ animation: "cv-flow-pulse 2.6s linear infinite" }}
              />
            </div>
            <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:justify-between md:gap-2">
              {story.flow.map((s, i) => (
                <li
                  key={s.label}
                  className="flex flex-col items-center text-center md:flex-1"
                  style={{ animation: `cv-stage-pop .45s ${i * 90}ms cubic-bezier(.22,1,.36,1) both` }}
                >
                  <span className="mb-2 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-brand bg-white font-mono text-[13px] font-bold text-brand-ink">
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                  <span className="text-[11px] leading-tight text-ink-soft">{s.sub}</span>
                </li>
              ))}
            </ol>
          </div>

          {second && (
            <div data-reveal className="mx-auto mt-12 max-w-[680px]">
              <div className="rounded-[22px] border border-line bg-white p-2.5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.3)]">
                <ModuleScene story={second} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Linkage + differentiator ---------------- */}
      <section className="px-6 py-[70px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 lg:grid-cols-2">
          <div data-reveal className="rounded-2xl border border-line bg-white p-7">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-brand-ink">
              Linked into
            </div>
            <p className="mb-4 text-[13.5px] leading-[1.6] text-ink-soft">
              A record here never sits alone. The moment it exists, it connects to:
            </p>
            <div className="flex flex-wrap gap-2">
              {story.links.map((l) => (
                <span
                  key={l}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[12px] font-medium text-brand-forest"
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 15l6-6M8 8H6a4 4 0 000 8h2M16 8h2a4 4 0 010 8h-2"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="flex flex-col justify-center rounded-2xl bg-[#0b1220] p-7"
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-on-brand">
              <Sparkle />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#3ddfc2]">
              Beyond the point tools
            </div>
            <p className="mt-2 text-[15px] leading-[1.6] text-slate-200/85">{story.edge}</p>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-[#d9f3ec] bg-[linear-gradient(160deg,#e9fbf6,#f6fdfb)] px-6 py-[72px]">
        <div data-reveal className="mx-auto max-w-[640px] text-center">
          <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            See {story.name.toLowerCase()} on your own stack.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Demos are scoped to your regulators. Pick a slot and we&apos;ll run it live.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/request-demo"
              className="rounded-full bg-brand px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
