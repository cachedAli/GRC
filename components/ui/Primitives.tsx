"use client";

import { useEffect } from "react";

/** Stroke icon rendered from a raw SVG path string (see ICON in data/home.ts). */
export function Icon({
  d,
  size = 16,
  className,
  strokeWidth = 1.9,
}: {
  d: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The CompliVerse GRC monogram.
 *
 * G, R and C drawn on one grid at a single stroke weight: the G's crossbar runs
 * out of the ring and into the R's stem, and the R's leg becomes one long sweep
 * that lands on the C's baseline with a horizontal tangent, so the three letters
 * read as a single continuous stroke. The G and C rings are the same radius and
 * open the same way — two near-complete revolutions joined by that sweep, which
 * is where the 360° idea lives rather than in any added symbol.
 *
 * Drawn with strokes rather than outlined fills: the weight stays mathematically
 * uniform, and it is four paths instead of a few hundred anchor points. Outline
 * them in one step if a print workflow needs filled contours.
 */
const MONOGRAM = [
  "M83.11 80.43A38 38 0 1 1 83.11 31.57", // G ring, 280°
  "M50 56H116", //                            G crossbar, exits into the R
  "M116 94V18A19 19 0 0 1 116 56C138 84 166 94 198 94", // R stem → bowl → sweep
  "M226.24 81.43A38 38 0 1 1 226.24 30.57", // C ring, 276°
];

export function Logo({
  size = 26,
  tone = "light",
  className,
}: {
  /** Rendered height in px; width follows the 252:112 ratio. */
  size?: number;
  tone?: "light" | "dark" | "mono";
  className?: string;
}) {
  const stroke =
    tone === "dark" ? "#FFFFFF" : tone === "mono" ? "#111827" : "#1ED4B0";
  return (
    <svg
      viewBox="0 0 252 112"
      height={size}
      width={size * (252 / 112)}
      className={className}
      role="img"
      aria-label="CompliVerse"
    >
      <g
        fill="none"
        stroke={stroke}
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MONOGRAM.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** The sparkle glyph used wherever the product marks something as AI-driven. */
export function Sparkle({ className }: { className?: string }) {
  return <span className={className} aria-hidden="true">&#10022;</span>;
}

/**
 * Adds `.cv-in` to every `[data-reveal]` element once it scrolls into view.
 * One observer for the whole document beats one per section, and elements are
 * unobserved after firing so the effect never re-runs on scroll-back.
 *
 * Mount once, near the root of a page.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const revealAll = () => nodes.forEach((n) => n.classList.add("cv-in"));

    // Without IntersectionObserver (or with reduced motion) show everything
    // immediately rather than leaving the page permanently blank.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    // Only now opt into the hidden-by-default state: the CSS that hides
    // [data-reveal] is scoped to this class, so a page whose JS never runs
    // still renders its content.
    document.documentElement.classList.add("cv-js");

    let delivered = false;
    const io = new IntersectionObserver(
      (entries) => {
        delivered = true;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("cv-in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));

    // Failsafe: an observer that never delivers (background tab throttling,
    // non-compositing embeds) would otherwise hold the page at opacity 0.
    const failsafe = window.setTimeout(() => {
      if (!delivered) {
        revealAll();
        io.disconnect();
      }
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return null;
}
