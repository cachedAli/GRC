"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { TIERS, type Tier } from "@/data/home";

/**
 * "Designed for every stage" — three audience cards on a dark band.
 *
 * The lit/dim card state lives in CSS (see .cv-stage-card in globals.css) so it
 * survives without JS and still reads correctly on touch devices, where :hover
 * never fires and every card is lit instead. React is only responsible for two
 * embellishments: the pointer-tracked highlight inside each card, and the
 * ambient floor glow that takes on the hovered tier's colour.
 */
export default function StageCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const tint = TIERS[hovered ?? 1];

  return (
    <section className="relative overflow-hidden bg-[#0b1220] px-6 pb-24 pt-[86px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] transition-[background] duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, rgb(${tint.accentSoft} / .13), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div data-reveal className="mx-auto mb-14 max-w-[720px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-slate-300/80">
            <span
              className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{ background: tint.accent }}
            />
            Every stage
          </div>
          <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.02em] text-white sm:text-[44px]">
            Designed for every stage
            <br />
            of the programme
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.7] text-slate-300/60">
            Whether you&apos;re chasing your first certificate or answering to four
            regulators at once — the same connected graph, scaled to where you are.
          </p>
        </div>

        <div className="cv-stage-row grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <StageCard
              key={t.who}
              tier={t}
              index={i}
              featured={i === 1}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCard({
  tier,
  index,
  featured,
  onEnter,
  onLeave,
}: {
  tier: Tier;
  index: number;
  featured: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  // Write the pointer position straight to CSS vars — no state, no re-render.
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  return (
    <div
      data-reveal
      data-featured={featured}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="cv-stage-card group relative flex flex-col overflow-hidden rounded-[20px] border bg-[#0e1626]"
      style={
        {
          transitionDelay: `${index * 0.07}s`,
          "--accent": tier.accent,
          "--accent-soft": tier.accentSoft,
        } as React.CSSProperties
      }
    >
      <span aria-hidden="true" className="cv-stage-card__rail absolute left-0 top-0 w-[3px]" />
      <span aria-hidden="true" className="cv-stage-card__wash pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="cv-stage-card__cursor pointer-events-none absolute inset-0" />

      <div className="relative flex flex-1 flex-col p-7">
        <h3 className="font-display text-[26px] font-semibold tracking-[-.01em] text-white">
          {tier.who}
        </h3>
        <p className="cv-stage-card__tagline mt-1.5 text-[15px] font-medium">
          {tier.tagline}
        </p>

        <div className="my-6 border-t border-dashed border-white/[.12]" />

        <ul className="flex flex-col gap-4">
          {tier.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden="true" className="cv-stage-card__marker mt-[5px] shrink-0">
                <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
                  <path d="M0 0l9 5-9 5V0z" />
                </svg>
              </span>
              <span className="text-[13.5px] leading-[1.65] text-slate-300/75">{b}</span>
            </li>
          ))}
        </ul>

        {/* Framework marks this tier actually ships with. */}
        <div className="mt-7 flex flex-wrap items-center gap-1.5">
          {tier.fws.map((fw) => (
            <span
              key={fw.n}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.05] py-1 pl-1 pr-2.5 text-[10px] font-semibold text-slate-300/70"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fw.src}
                alt=""
                className="h-[15px] w-[15px] rounded-[3px] bg-white object-contain p-px"
                loading="lazy"
              />
              {fw.n}
            </span>
          ))}
        </div>

        <Link
          href={tier.href}
          className="cv-stage-card__cta group/btn mt-auto flex items-center justify-center gap-2 rounded-[10px] border pt-3.5 pb-3.5 text-[13.5px] font-semibold"
          style={{ marginTop: "1.75rem" }}
        >
          {tier.cta}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
