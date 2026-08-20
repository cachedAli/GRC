"use client";

import { useEffect, useRef, useState } from "react";
import { MODULE_STORIES } from "@/data/modules";
import { Icon, Sparkle } from "@/components/ui/Primitives";
import ModuleScene from "@/components/home/ModuleScenes";

/**
 * The platform explorer — sticky graphical stage on the left, module list
 * scrolling past on the right.
 *
 * The stage answers the same three questions for every module in the same
 * visual grammar, so a visitor learns to read one diagram and then reads all
 * fourteen: the end-to-end flow, what the record links into once it exists,
 * and a proof panel showing real screen-level detail.
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
            All fourteen, on one data model. Scroll — the diagram follows you.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ---------------- Sticky graphical stage ---------------- */}
          <div className="top-[104px] hidden lg:sticky lg:block">
            <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_60px_-34px_rgba(15,23,42,.25)]">
              {/* Progress through the fourteen. */}
              <div
                className="absolute left-0 top-0 z-10 h-[3px] bg-[linear-gradient(90deg,#1ed4b0,#3ddfc2)] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ width: `${progress}%` }}
              />

              <div
                key={story.key}
                style={{ animation: "cv-stage-in .38s cubic-bezier(.22,1,.36,1) both" }}
              >
                <StageHeader story={story} index={active} />

                <div className="px-5 pt-5">
                  <ModuleScene story={story} />
                </div>

                <div className="px-5 pt-4">
                  <LinkageRow links={story.links} />
                </div>

                <div className="mt-5 flex items-start gap-3 bg-[#0b1220] px-6 py-4">
                  <span className="mt-px inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand text-[11px] text-on-brand">
                    <Sparkle />
                  </span>
                  <div>
                    <div className="text-[9.5px] font-bold uppercase tracking-[.14em] text-[#3ddfc2]">
                      Beyond the point tools
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-200/80">
                      {story.edge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- Scrolling module list ---------------- */}
          <div className="flex flex-col gap-3">
            {MODULE_STORIES.map((m, i) => {
              const on = i === active;
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
                    <div className="overflow-hidden rounded-2xl border border-line bg-white">
                      <div className="px-3 pt-3">
                        <ModuleScene story={m} />
                      </div>
                      <div className="px-3 pb-3 pt-3">
                        <LinkageRow links={m.links} />
                      </div>
                      <div className="flex items-start gap-2.5 bg-[#0b1220] px-4 py-3">
                        <span className="mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand text-[10px] text-on-brand">
                          <Sparkle />
                        </span>
                        <p className="text-[11.5px] leading-[1.55] text-slate-200/80">
                          {m.edge}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageHeader({
  story,
  index,
}: {
  story: (typeof MODULE_STORIES)[number];
  index: number;
}) {
  return (
    <div className="flex items-start gap-3.5 border-b border-line-soft bg-[linear-gradient(160deg,#f0fdf9,#ffffff)] px-6 py-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-brand text-on-brand">
        <Icon d={story.icon} size={20} />
      </span>
      <div className="min-w-0">
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
  );
}

/** What the record links into — the payoff of a single data model. */
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
