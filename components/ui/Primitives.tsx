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
 * The Complyverse wordmark, matching the product UI: "Comply" in ink, "verse"
 * in brand teal, with a small superscript AI. `tone` flips it for dark panels;
 * `size` is the wordmark's font size in px.
 */
export function Logo({
  size = 20,
  tone = "light",
  className,
}: {
  size?: number;
  tone?: "light" | "dark" | "mono";
  className?: string;
}) {
  const comply =
    tone === "dark" ? "#FFFFFF" : tone === "mono" ? "#0f172a" : "#0b1220";
  const verse = tone === "dark" ? "#3ddfc2" : "#17b898";
  return (
    <span
      className={`inline-flex items-start font-display font-bold leading-none tracking-[-.02em] ${className ?? ""}`}
      style={{ fontSize: size }}
      role="img"
      aria-label="Complyverse AI"
    >
      <span style={{ color: comply }}>Comply</span>
      <span style={{ color: verse }}>verse</span>
      <span
        className="font-semibold tracking-[.08em]"
        style={{
          color: verse,
          fontSize: size * 0.42,
          marginLeft: size * 0.1,
          marginTop: size * 0.04,
        }}
      >
        AI
      </span>
    </span>
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
