"use client";

import { useEffect, useState } from "react";
import { LINKS, STAGES } from "@/data/home";
import { Icon, Sparkle } from "@/components/ui/Primitives";

/* Geometry for the ring, in the SVG's 760 x 420 space. */
const CX = 380;
const CY = 210;
const RX = 250;
const RY = 138;
const NODE_R = 44;

const POS = STAGES.map((_, i) => {
  const a = ((i * 60 - 90) * Math.PI) / 180;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
});

/**
 * An arc from node i to node i+1, bowed outward so the chain reads as a ring
 * rather than a polygon. The control point is pushed away from the centre.
 */
function arc(i: number) {
  const a = POS[i];
  const b = POS[(i + 1) % POS.length];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = mx - CX;
  const dy = my - CY;
  const len = Math.hypot(dx, dy) || 1;
  const bow = 34;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${(mx + (dx / len) * bow).toFixed(1)} ${(my + (dy / len) * bow).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

/**
 * The 360° linkage model.
 *
 * Six nodes, six labelled edges, and a relationship list beside them. Hovering
 * either the list or the graph highlights the same link in both, so the
 * diagram explains the list and the list explains the diagram.
 */
export default function LinkageGraph() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  // Walks the chain on its own until someone takes over.
  useEffect(() => {
    if (held) return;
    const t = setInterval(() => setActive((i) => (i + 1) % LINKS.length), 3200);
    return () => clearInterval(t);
  }, [held]);

  const link = LINKS[active];
  const toStage = STAGES.find((s) => s.title === link.to) ?? STAGES[0];

  return (
    <section className="overflow-hidden bg-white px-6 pb-[86px] pt-[74px]">
      <div className="mx-auto max-w-[1180px]">
        <div data-reveal className="mx-auto mb-10 max-w-[660px] text-center">
          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
            The 360° linkage model
          </div>
          <h2 className="font-display text-[28px] font-semibold tracking-[-.01em] text-ink sm:text-[34px]">
            Scattered across six tools. Connected in one.
          </h2>
          <p className="mt-3.5 text-[14.5px] leading-[1.65] text-ink-soft">
            Not six products bolted together, one record moving through six states.
            Hover any link to see why it connects.
          </p>
        </div>

        <div
          data-reveal
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]"
          onMouseLeave={() => setHeld(false)}
        >
          {/* ---------------- Graph ---------------- */}
          {/*
            SVG text scales with the viewBox, so squeezed into a phone column
            the 13px node labels would render at ~5px. The graph keeps a design
            width and scrolls sideways instead; on desktop the column is wider
            than the minimum, so nothing scrolls.
          */}
          <div className="relative -mx-1 overflow-x-auto px-1 [scrollbar-width:thin]">
            <svg viewBox="0 0 760 420" className="w-full min-w-[560px]" role="img"
              aria-label={`Linkage graph. ${link.from} ${link.verb} ${link.to}.`}>
              <defs>
                <marker
                  id="cvArrow"
                  markerWidth="7"
                  markerHeight="7"
                  refX="5.4"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0 0.6 L6 3.5 L0 6.4 z" fill="#1ed4b0" />
                </marker>
              </defs>

              {/* Spokes to the hub, the shared data model underneath. */}
              {POS.map((p, i) => (
                <line
                  key={`spoke-${i}`}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  stroke="#eef2f7"
                  strokeWidth="1.4"
                />
              ))}

              {/* The chain itself. */}
              {LINKS.map((l, i) => {
                const on = i === active;
                return (
                  <g key={l.verb}>
                    <path
                      d={arc(i)}
                      fill="none"
                      stroke={on ? "#1ed4b0" : "#dbe4ea"}
                      strokeWidth={on ? 2.6 : 1.6}
                      strokeLinecap="round"
                      strokeDasharray={on ? "6 7" : undefined}
                      markerEnd={on ? "url(#cvArrow)" : undefined}
                      style={on ? { animation: "cv-edge-flow 1.3s linear infinite" } : undefined}
                    />
                    {/* A pulse travelling the active edge. */}
                    {on && (
                      <circle r="4.5" fill="#0c8f76">
                        <animateMotion dur="1.9s" repeatCount="indefinite" path={arc(i)} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Hub */}
              <circle cx={CX} cy={CY} r="56" fill="#0b1220" />
              <text
                x={CX}
                y={CY - 2}
                textAnchor="middle"
                fontFamily="var(--font-display), Poppins, sans-serif"
                fontSize="15"
                fontWeight="700"
                fill="#3ddfc2"
              >
                360°
              </text>
              <text
                x={CX}
                y={CY + 15}
                textAnchor="middle"
                fontFamily="var(--font-body), Inter, sans-serif"
                fontSize="10"
                fill="rgba(255,255,255,.7)"
              >
                one record
              </text>

              {/* Nodes */}
              {STAGES.map((s, i) => {
                const isFrom = s.title === link.from;
                const isTo = s.title === link.to;
                const lit = isFrom || isTo;
                return (
                  <g
                    key={s.title}
                    onMouseEnter={() => {
                      const idx = LINKS.findIndex((l) => l.from === s.title);
                      if (idx >= 0) {
                        setActive(idx);
                        setHeld(true);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Show what ${s.title} connects to`}
                    onFocus={() => {
                      const idx = LINKS.findIndex((l) => l.from === s.title);
                      if (idx >= 0) {
                        setActive(idx);
                        setHeld(true);
                      }
                    }}
                    className="cursor-pointer focus:outline-none [&:focus-visible>circle]:stroke-ink [&:focus-visible>circle]:[stroke-width:3]"
                  >
                    <circle
                      cx={POS[i].x}
                      cy={POS[i].y}
                      r={NODE_R}
                      fill={isTo ? "#1ed4b0" : "#ffffff"}
                      stroke={lit ? "#1ed4b0" : "#dbe4ea"}
                      strokeWidth="1.6"
                      className="transition-all duration-[350ms]"
                    />
                    {/* Professional icon above the label. */}
                    <g
                      transform={`translate(${POS[i].x - 9}, ${POS[i].y - 20})`}
                      className="pointer-events-none"
                    >
                      <path
                        d={s.icon}
                        transform="scale(0.75)"
                        fill="none"
                        stroke={isTo ? "#0A0A0A" : "#0c8f76"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <text
                      x={POS[i].x}
                      y={POS[i].y + 19}
                      textAnchor="middle"
                      fontFamily="var(--font-display), Poppins, sans-serif"
                      fontSize="13"
                      fontWeight="600"
                      fill={isTo ? "#0A0A0A" : "#334155"}
                      className="pointer-events-none"
                    >
                      {s.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ---------------- Relationship list ---------------- */}
          <div>
            <div className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-ink-faint">
              Why they connect
            </div>
            <div className="grid gap-1.5">
              {LINKS.map((l, i) => {
                const on = i === active;
                return (
                  <button
                    key={l.verb}
                    type="button"
                    onMouseEnter={() => {
                      setActive(i);
                      setHeld(true);
                    }}
                    onFocus={() => {
                      setActive(i);
                      setHeld(true);
                    }}
                    onClick={() => {
                      setActive(i);
                      setHeld(true);
                    }}
                    aria-current={on}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                      on
                        ? "border-brand bg-brand-50 shadow-[0_10px_26px_-16px_rgba(13,148,136,.55)]"
                        : "border-line bg-white hover:border-brand-200"
                    }`}
                  >
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-ink">{l.from}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[.06em] ${
                          on
                            ? "bg-brand text-on-brand"
                            : "bg-brand-100 text-brand-ink"
                        }`}
                      >
                        {l.verb}
                        <span aria-hidden="true">→</span>
                      </span>
                      <span className="text-[12px] font-semibold text-ink">{l.to}</span>
                    </span>
                    {/* The reason only expands for the live row, so the list
                        stays scannable instead of becoming six paragraphs. */}
                    {on && (
                      <span
                        className="mt-1.5 block text-[11.5px] leading-[1.55] text-ink-muted"
                        style={{ animation: "cv-stage-pop .35s cubic-bezier(.22,1,.36,1) both" }}
                      >
                        {l.why}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* What the AI does at the receiving end of the live link. */}
            <div
              key={toStage.title}
              className="mt-3 flex items-start gap-2.5 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5"
              style={{ animation: "cv-stage-pop .35s cubic-bezier(.22,1,.36,1) both" }}
            >
              <span className="mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-[10px] text-on-brand">
                <Sparkle />
              </span>
              <span className="text-[11.5px] leading-[1.55] text-brand-forest">
                <b>AI at {toStage.title}:</b> {toStage.ai}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
