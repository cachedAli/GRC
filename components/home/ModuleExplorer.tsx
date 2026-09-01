"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MODULE_STORIES } from "@/data/modules";
import { CAPABILITY_PAGES } from "@/data/capabilityPages";
import { Icon, Sparkle } from "@/components/ui/Primitives";
import ModuleScene from "@/components/home/ModuleScenes";

/**
 * The platform explorer, sticky graphical stage on the left, module list
 * scrolling past on the right.
 *
 * The stage answers the same questions for every module in the same visual
 * grammar, so a visitor learns to read one diagram and then reads all twelve:
 * the end-to-end flow (the drawn scene), the proof stats, what the record links
 * into once it exists, and the problem it kills vs. how Compliverse fixes it.
 */
export default function ModuleExplorer() {
  const [active, setActive] = useState(0);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Scrolling the list drives the stage. Cards are also buttons, so the stage
  // is still reachable if the observer never fires (background tab, embeds).
  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.moduleIndex);
          if (!Number.isNaN(i)) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const story = MODULE_STORIES[active];
  const page = CAPABILITY_PAGES[story.key];
  const progress = Math.round(((active + 1) / MODULE_STORIES.length) * 100);

  return (
    <section className="border-t border-line-warm bg-[#f6f8fa] px-6 pb-24 pt-[70px]">
      <div className="mx-auto max-w-[1180px]">
        <div data-reveal className="mx-auto mb-11 max-w-[620px] text-center">
          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
            The whole platform
          </div>
          <h2 className="font-display text-[28px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            Go deep, module by module
          </h2>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
            All twelve, on one data model. Scroll, the diagram follows you.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ---------------- Sticky graphical stage ---------------- */}
          <div className="top-[104px] hidden lg:sticky lg:block">
            <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_60px_-34px_rgba(15,23,42,.25)]">
              {/* Progress through the twelve. */}
              <div
                className="absolute left-0 top-0 z-10 h-[3px] bg-[linear-gradient(90deg,#1ed4b0,#3ddfc2)] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ width: `${progress}%` }}
              />

              <div
                key={story.key}
                style={{ animation: "cv-stage-in .38s cubic-bezier(.22,1,.36,1) both" }}
              >
                <StageHeader story={story} index={active} stats={page?.stats} />

                <div className="px-5 pt-4">
                  <ModuleScene story={story} />
                </div>

                <div className="px-5 pt-3">
                  <LinkageRow links={story.links} />
                </div>

                {page && <ProblemSolution story={story} page={page} />}
              </div>
            </div>
          </div>

          {/* ---------------- Scrolling module list ---------------- */}
          <div className="flex flex-col gap-3">
            {MODULE_STORIES.map((m, i) => {
              const on = i === active;
              const mPage = CAPABILITY_PAGES[m.key];
              return (
                <div key={m.key}>
                  <button
                    type="button"
                    data-module-index={i}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className="w-full rounded-2xl border-[1.5px] px-4 py-3.5 text-left transition-all duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{
                      background: on ? "#ffffff" : "#fbfcfd",
                      borderColor: on ? "#1ed4b0" : "#e6ebf0",
                      transform: on ? "scale(1.015)" : "scale(1)",
                      boxShadow: on ? "0 16px 40px -22px rgba(13,148,136,.45)" : "none",
                    }}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] transition-colors"
                        style={{
                          background: on ? "#1ed4b0" : "#e8fcf8",
                          color: on ? "#0A0A0A" : "#0c8f76",
                        }}
                      >
                        <Icon d={m.icon} size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <b className="font-display text-[13.5px] text-ink">{m.name}</b>
                          <span className="font-mono text-[9.5px] text-ink-faint">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </span>
                        <span className="mt-1 block text-[11.5px] leading-[1.5] text-ink-soft">
                          {m.promise}
                        </span>
                      </span>
                    </span>
                  </button>

                  {/*
                    The sticky stage is desktop-only, so on narrow screens each
                    card carries its own diagram directly beneath it.
                  */}
                  <div className="mt-3 lg:hidden">
                    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
                      <div className="px-3 pt-3">
                        <ModuleScene story={m} />
                      </div>
                      <div className="px-3 pt-3">
                        <LinkageRow links={m.links} />
                      </div>
                      {mPage && <ProblemSolution story={m} page={mPage} compact />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/*
              Trailing spacer, desktop only. The sticky stage's travel is bounded
              by this column's height; without extra room below the last card the
              stage detaches and rides up while modules 11-13 are active. This
              keeps it pinned until the last module has been read.
            */}
            <div aria-hidden="true" className="hidden lg:block lg:h-[58vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StageHeader({
  story,
  index,
  stats,
}: {
  story: (typeof MODULE_STORIES)[number];
  index: number;
  stats?: { value: string; label: string }[];
}) {
  return (
    <div className="border-b border-line-soft bg-[linear-gradient(160deg,#f0fdf9,#ffffff)] px-6 py-4">
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-brand text-on-brand">
          <Icon d={story.icon} size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-display text-[18px] font-semibold text-ink">
              {story.name}
            </h3>
            <span className="font-mono text-[10px] text-ink-faint">
              {String(index + 1).padStart(2, "0")} / {MODULE_STORIES.length}
            </span>
          </div>
          <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-muted">
            {story.promise}
          </p>
        </div>
      </div>

      {/* Proof stats, straight from the module's real capability figures. */}
      {stats && stats.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl border border-brand-200 bg-white/70 px-3 py-1.5"
              style={{
                animation: `cv-stage-pop .4s ${150 + i * 80}ms cubic-bezier(.22,1,.36,1) both`,
              }}
            >
              <div className="font-display text-[12.5px] font-bold leading-tight text-brand-forest">
                {s.value}
              </div>
              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.08em] text-ink-soft">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** What the record links into, the payoff of a single data model. */
function LinkageRow({ links }: { links: string[] }) {
  return (
    <div>
      <div className="mb-2.5 font-mono text-[9.5px] font-semibold uppercase tracking-[.14em] text-ink-faint">
        Linked into
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {links.map((l, i) => (
          <span
            key={l}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10.5px] font-medium text-brand-forest"
            style={{
              animation: `cv-stage-pop .4s ${140 + i * 50}ms cubic-bezier(.22,1,.36,1) both`,
            }}
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
  );
}

/**
 * The dark payoff panel: the problem this module kills, then how Compliverse
 * fixes it, then the way in. Reuses the same problem/shift copy as the
 * dedicated capability page, so the story is consistent everywhere.
 */
function ProblemSolution({
  story,
  page,
  compact = false,
}: {
  story: (typeof MODULE_STORIES)[number];
  page: (typeof CAPABILITY_PAGES)[string];
  compact?: boolean;
}) {
  return (
    <div className={`mt-4 bg-[#0b1220] ${compact ? "px-4 py-3.5" : "px-6 py-3.5"}`}>
      <div className="flex items-start gap-2.5">
        <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#3a2c17] text-[#f0c986]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </span>
        <p className="text-[11.5px] leading-[1.5] text-slate-400">
          <span className="font-semibold text-[#f0c986]">Today: </span>
          {page.problem.pain}
        </p>
      </div>

      <div className="mt-2 flex items-start gap-2.5">
        <span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] text-on-brand">
          <Sparkle />
        </span>
        <p className="text-[12px] leading-[1.5] text-slate-100">
          <span className="font-semibold text-[#3ddfc2]">Compliverse: </span>
          {page.problem.gain}
        </p>
      </div>

      <Link
        href={story.href ?? `/platform/${story.key}`}
        className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#3ddfc2] transition hover:gap-1.5"
      >
        Explore {story.name}
        
      </Link>
    </div>
  );
}
