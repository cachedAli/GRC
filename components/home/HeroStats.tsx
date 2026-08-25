"use client";

import { useEffect, useState } from "react";
import { HERO_STATS, TOOLS_REPLACED } from "@/data/home";
import { Icon } from "@/components/ui/Primitives";

/** Ease-out so each count decelerates into its final value. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts 0 → target once, on mount, driven by rAF rather than an interval so
 * the tick rate follows the display instead of drifting.
 */
function useCountUp(target: number, duration = 1100, delay = 260) {
  // Starts at the true figure so server-rendered HTML and any client where the
  // animation never runs both show the real number rather than zero.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    let done = false;
    setValue(0);

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOut(t) * target));
      if (t < 1) raf = requestAnimationFrame(step);
      else done = true;
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    // rAF is paused in background tabs and non-compositing embeds. Without this
    // the hero would sit there advertising "0 modules" indefinitely.
    const failsafe = window.setTimeout(() => {
      if (!done) setValue(target);
    }, delay + duration + 900);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
}

/**
 * Hero proof stats, drawn and animated rather than written.
 *
 * Each figure counts up while its graphic assembles in step: fourteen module
 * dots pop in sequence, five real regulator marks slide into a stack, and five
 * point-tool tiles are struck through one at a time.
 */
export default function HeroStats() {
  const modules = useCountUp(HERO_STATS.modules);
  const frameworks = useCountUp(25);
  const tools = useCountUp(HERO_STATS.toolsReplaced, 900, 420);

  return (
    <div className="grid max-w-[500px] grid-cols-3 divide-x divide-[#cfe6df] rounded-2xl border border-brand-200 bg-white/60 backdrop-blur-sm">
      {/* Modules, a 7x2 dot grid that fills in. */}
      <Stat value={String(modules)} label="modules">
        <span className="grid grid-cols-7 gap-[3px]">
          {Array.from({ length: HERO_STATS.modules }).map((_, i) => (
            <span
              key={i}
              className="cv-stat-dot h-[5px] w-[5px] rounded-[1.5px] bg-brand"
              style={
                {
                  "--dot-o": 0.45 + (i / HERO_STATS.modules) * 0.55,
                  animationDelay: `${300 + i * 42}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </Stat>

      {/* Frameworks, real regulator marks sliding into an overlapping stack. */}
      <Stat value={`${frameworks}+`} label="frameworks">
        <span className="flex items-center">
          {HERO_STATS.frameworkFaces.map((src, i) => (
            <span
              key={src}
              className="cv-stat-face inline-flex h-[19px] w-[19px] items-center justify-center rounded-full border border-white bg-white shadow-[0_1px_3px_rgba(15,23,42,.16)]"
              style={{
                marginLeft: i === 0 ? 0 : -6,
                zIndex: 5 - i,
                animationDelay: `${340 + i * 80}ms`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-[13px] w-[13px] object-contain"
                loading="lazy"
              />
            </span>
          ))}
          <span className="ml-1.5 font-mono text-[9px] font-semibold text-brand-ink">
            +20
          </span>
        </span>
      </Stat>

      {/*
        Point tools, one icon per category that gets switched off, struck
        through in turn. Sized to the narrowest column: five tiles plus gaps
        must fit ~89px at 375px wide, so they only grow from `sm` up.
      */}
      <Stat value={`${tools}+`} label="tools replaced">
        <span className="flex items-center gap-[2px] sm:gap-[3px]">
          {TOOLS_REPLACED.map((tool, i) => (
            <span
              key={tool.name}
              title={tool.name}
              className="relative inline-flex h-[15px] w-[15px] items-center justify-center rounded-[3px] border border-[#cbd5e1] bg-[#f1f5f9] text-[#94a3b8] sm:h-[18px] sm:w-[18px]"
            >
              <Icon d={tool.icon} size={10} strokeWidth={1.7} className="sm:hidden" />
              <Icon
                d={tool.icon}
                size={12}
                strokeWidth={1.7}
                className="hidden sm:block"
              />
              <span
                className="cv-stat-strike absolute left-1/2 top-1/2 h-[1px] w-[17px] bg-[#64748b] sm:w-[21px]"
                style={{ animationDelay: `${520 + i * 110}ms` }}
              />
            </span>
          ))}
        </span>
      </Stat>
    </div>
  );
}

function Stat({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 px-2.5 py-3.5 first:pl-3 last:pr-3 sm:px-3.5 sm:first:pl-4 sm:last:pr-4">
      {/* Tabular figures so the counter does not jitter as digits change. */}
      <span className="font-display text-[22px] font-bold leading-none tracking-[-.02em] text-ink tabular-nums">
        {value}
      </span>
      <span className="flex min-h-[19px] items-center">{children}</span>
      {/* Two lines of label height are reserved on narrow screens, where
          "tools replaced" wraps and the other two do not, without it the
          three figures sit at different baselines. */}
      <span className="min-h-[1.75rem] text-[9.5px] font-medium uppercase leading-[1.35] tracking-[.06em] text-ink-soft sm:min-h-0 sm:text-[10.5px] sm:tracking-[.1em]">
        {label}
      </span>
    </div>
  );
}
