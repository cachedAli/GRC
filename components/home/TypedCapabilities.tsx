"use client";

import { useEffect, useState } from "react";
import { CAPABILITY_LINES } from "@/data/home";
import { Icon } from "@/components/ui/Primitives";

const TYPE_MS = 30; // per character while writing
const DELETE_MS = 14; // per character while erasing — deleting reads faster
const HOLD_MS = 1900; // pause on the finished line
const GAP_MS = 300; // pause on the empty line before the next one starts

/** Commas get a beat, so it reads like typing rather than a ticker. */
function pauseFor(char: string): number {
  return char === "," ? 120 : 0;
}

/**
 * Hero typewriter: a single highlighted line that writes one short capability
 * claim, holds, backspaces it, and moves to the next module. Sits inline under
 * the CTAs with no surrounding panel — the mint highlight is the container.
 */
export default function TypedCapabilities() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const line = CAPABILITY_LINES[index];

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(
        () => setIndex((i) => (i + 1) % CAPABILITY_LINES.length),
        4000,
      );
      return () => clearTimeout(t);
    }

    const full = line.text;
    const delay = !deleting
      ? count < full.length
        ? TYPE_MS + pauseFor(full[count - 1] ?? "")
        : HOLD_MS
      : count > 0
        ? DELETE_MS
        : GAP_MS;

    const t = setTimeout(() => {
      if (!deleting) {
        if (count < full.length) setCount(count + 1);
        else setDeleting(true);
        return;
      }
      if (count > 0) {
        setCount(count - 1);
        return;
      }
      setDeleting(false);
      setIndex((i) => (i + 1) % CAPABILITY_LINES.length);
    }, delay);

    return () => clearTimeout(t);
  }, [count, deleting, index, line.text, reduced]);

  const shown = reduced ? line.text : line.text.slice(0, count);

  return (
    <div className="flex items-center gap-3">
      {/* Icon swaps with the line; the ring pulses on the brand colour. */}
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-ink ring-1 ring-brand-200">
        <Icon d={line.icon} size={17} />
      </span>

      {/*
        One line of height is reserved and the row never wraps, so the hero
        cannot reflow as the sentence grows and shrinks.
      */}
      <p
        aria-hidden="true"
        className="flex min-h-[1.9rem] min-w-0 items-center whitespace-nowrap font-display text-[15px] font-semibold tracking-[-.01em] text-brand-forest sm:text-[17px]"
      >
        {/* Marker-pen highlight that grows with the text. */}
        <span className="rounded-[5px] bg-brand-100/80 px-1.5 py-0.5 decoration-clone box-decoration-clone">
          {shown}
        </span>
        <span
          className="ml-0.5 inline-block w-[2.5px] rounded-sm bg-brand-deep"
          style={{
            height: "1.1em",
            animation: reduced ? "none" : "cv-caret 1s step-end infinite",
          }}
        />
      </p>

      {/* Screen readers get the whole line once per rotation, not per keystroke. */}
      <p className="sr-only" aria-live="polite">
        {line.label}: {line.text}
      </p>
    </div>
  );
}
