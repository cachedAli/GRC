"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { INTEGRATIONS } from "@/data/integrations";

/** Cells per grid, per side. Sparse on purpose, empty cells carry the rhythm. */
const ROWS = 5;
const COLS = 3;
const CELLS = ROWS * COLS;
/** How many of those cells hold a logo at any moment. */
const FILLED = 6;
const TICK_MS = 2200;

/** A deterministic shuffle so server and client agree on the first paint. */
function seeded(list: number[], seed: number) {
  const a = [...list];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Integration wall.
 *
 * Two sparse grids flank the message. On each tick one cell swaps its logo for
 * another from the catalogue, so the wall reads as a living inventory rather
 * than a static logo dump, and the eye is never asked to track more than one
 * change at a time.
 */
export default function IntegrationsSection() {
  // Only marks we ship locally appear in the wall; the rest are on the full
  // list with initials tiles, which would look broken at this size.
  const pool = useMemo(() => INTEGRATIONS.filter((i) => i.logo), []);

  const [slots, setSlots] = useState<(number | null)[]>(() => {
    const cells = seeded([...Array(CELLS * 2).keys()], 7).slice(0, FILLED * 2);
    const out: (number | null)[] = Array(CELLS * 2).fill(null);
    cells.forEach((cell, i) => {
      out[cell] = i % pool.length;
    });
    return out;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setInterval(() => {
      setSlots((cur) => {
        const next = [...cur];
        const occupied = next.map((v, i) => (v === null ? -1 : i)).filter((i) => i >= 0);
        const empty = next.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
        if (!occupied.length || !empty.length) return cur;

        // Move one logo to a free cell and advance it to the next brand.
        const from = occupied[Math.floor(Math.random() * occupied.length)];
        const to = empty[Math.floor(Math.random() * empty.length)];
        const shown = new Set(next.filter((v): v is number => v !== null));
        let candidate = ((next[from] as number) + 1) % pool.length;
        for (let n = 0; n < pool.length && shown.has(candidate); n++) {
          candidate = (candidate + 1) % pool.length;
        }
        next[from] = null;
        next[to] = candidate;
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(t);
  }, [pool.length]);

  const grid = (offset: number) => (
    <div
      aria-hidden="true"
      className="grid shrink-0 grid-cols-3 gap-px bg-line"
      style={{ width: COLS * 78 }}
    >
      {Array.from({ length: CELLS }).map((_, i) => {
        const idx = slots[offset + i];
        const item = idx === null || idx === undefined ? null : pool[idx];
        return (
          <span
            key={i}
            className="flex h-[78px] items-center justify-center bg-white"
          >
            {item && (
              <span
                key={item.id}
                className="flex h-full w-full items-center justify-center"
                style={{ animation: "cv-logo-in .55s cubic-bezier(.22,1,.36,1) both" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo as string}
                  alt=""
                  className="h-[30px] w-[30px] object-contain"
                  loading="lazy"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-line bg-[#fbfdfd] py-[72px]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-center gap-0 px-6">
        {/* Left wall, hidden below lg, where the message needs the width. */}
        <div className="hidden lg:block">{grid(0)}</div>

        <div className="min-w-0 flex-1 px-6 text-center lg:px-12">
          <div data-reveal>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              Compliance automation
            </div>
            <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-.02em] text-ink sm:text-[40px]">
              Evidence that collects
              <br className="hidden sm:block" /> itself.
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[14.5px] leading-[1.65] text-ink-soft">
              Connect the systems you already run. Complyverse pulls the evidence,
              attaches it to the right control, and keeps it current.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/integrations"
                className="rounded-full bg-brand px-6 py-3 font-display text-[14px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
              >
                See all integrations →
              </Link>
            </div>

            <p className="mt-4 font-mono text-[11px] text-ink-faint">
              {INTEGRATIONS.length} connectors · 8 categories
            </p>
          </div>
        </div>

        <div className="hidden lg:block">{grid(CELLS)}</div>
      </div>

      {/* Below lg the walls would crush the message, so the marks run as a
          single band underneath instead. */}
      <div className="cv-marquee-mask mt-10 lg:hidden">
        <div
          className="cv-marquee-track gap-2"
          style={{ animation: "cv-marquee 40s linear infinite" }}
        >
          {[...pool, ...pool].map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl border border-line bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo as string}
                alt={item.name}
                className="h-[26px] w-[26px] object-contain"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export { initials };
