"use client";

/**
 * Shared building blocks for the module scenes.
 *
 * Every scene is a small composition of floating product-UI cards rather than
 * an abstract diagram, a back card settles first, a front card overlaps it,
 * and stat chips arrive last. Positioning is percentage-based so a scene scales
 * with its container instead of needing a fixed canvas size.
 */

export function Scene({ children }: { children: React.ReactNode }) {
  /*
    The compositions are laid out in percentages against a ~540px design width.
    Squeezed into a phone column they drop to ~7px type, so instead of shrinking
    them into mush the scene keeps its design width and scrolls sideways. On
    desktop the container is already wider, so nothing scrolls.
  */
  return (
    <div className="-mx-1 overflow-x-auto px-1 [scrollbar-width:thin]">
      <div className="cv-scene h-[290px] w-full min-w-[540px]">{children}</div>
    </div>
  );
}

/** A floating panel that looks like a real product surface. */
export function Card({
  children,
  x,
  y,
  w,
  delay = 0,
  front = false,
  float = false,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  w: string;
  delay?: number;
  front?: boolean;
  float?: boolean;
  from?: "up" | "left";
  className?: string;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-xl border bg-white ${
        front
          ? "z-20 border-line shadow-[0_18px_40px_-16px_rgba(15,23,42,.28)]"
          : "z-10 border-line-soft shadow-[0_10px_26px_-14px_rgba(15,23,42,.22)]"
      } ${className}`}
      style={{
        left: x,
        top: y,
        width: w,
        animation:
          `${from === "left" ? "cv-card-in-left" : "cv-card-in"} .5s ${delay}ms cubic-bezier(.22,1,.36,1) both` +
          (float ? `, cv-float-soft 5s ${delay + 600}ms ease-in-out infinite` : ""),
      }}
    >
      {children}
    </div>
  );
}

/** The title strip at the top of a card. */
export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-line-soft px-3 py-2 text-[10.5px] font-semibold text-ink">
      {children}
    </div>
  );
}

/** A small floating metric, like the stat cards in a product hero. */
export function Stat({
  label,
  value,
  sub,
  x,
  y,
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  x: string;
  y: string;
  delay?: number;
}) {
  return (
    <div
      className="absolute z-30 rounded-xl border border-brand-200 bg-white px-3 py-2 shadow-[0_14px_30px_-14px_rgba(13,148,136,.4)]"
      style={{
        left: x,
        top: y,
        animation: `cv-pop .45s ${delay}ms cubic-bezier(.22,1,.36,1) both`,
      }}
    >
      <div className="text-[8.5px] uppercase tracking-[.1em] text-ink-faint">{label}</div>
      <div className="font-display text-[16px] font-bold leading-tight text-ink">{value}</div>
      {sub && <div className="text-[9px] text-brand-ink">{sub}</div>}
    </div>
  );
}

/** Grey placeholder lines, stands in for body copy inside a mock surface. */
export function Lines({ n = 3, w = ["80%", "60%", "70%"] }: { n?: number; w?: string[] }) {
  return (
    <div className="grid gap-1.5 px-3 py-2.5">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="block h-[5px] rounded-full bg-line-soft"
          style={{ width: w[i % w.length] }}
        />
      ))}
    </div>
  );
}

/** A status pill. */
export function Pill({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "warn" | "danger" | "mute";
}) {
  const map = {
    brand: "bg-brand-100 text-brand-ink border-brand-200",
    warn: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
    danger: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]",
    mute: "bg-[#f1f5f9] text-ink-soft border-line",
  } as const;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8.5px] font-bold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

/** The badge strip along the bottom of a scene. */
export function PillRow({ items, delay = 700 }: { items: string[]; delay?: number }) {
  return (
    <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap gap-1.5">
      {items.map((t, i) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-white/90 px-2 py-[3px] text-[9px] font-semibold text-brand-forest backdrop-blur-sm"
          style={{ animation: `cv-pop .4s ${delay + i * 70}ms cubic-bezier(.22,1,.36,1) both` }}
        >
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="#0c8f76"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t}
        </span>
      ))}
    </div>
  );
}

/** A connector drawn between two points inside a scene. */
export function Wire({
  d,
  delay = 0,
  dash = 160,
}: {
  d: string;
  delay?: number;
  dash?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#1ed4b0"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeDasharray={dash}
      strokeDashoffset={dash}
      style={{ animation: `cv-draw .7s ${delay}ms cubic-bezier(.22,1,.36,1) forwards` }}
    />
  );
}
