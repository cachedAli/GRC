import type { FrameworkGuide } from "@/data/frameworks";

/**
 * The hero graphic for a framework guide. Two forms, both driven by the
 * framework's REAL structure so no two render alike:
 *
 *  - constellation: the framework mark at the centre, its control domains as
 *    spokes on dashed, marching connectors (the Vanta-style hub).
 *  - pipeline: the framework's functions as a sequential, flowing rail.
 *
 * Pure CSS animation, no timers, so it is a server component and never stalls.
 */
export default function FrameworkGraphic({ guide }: { guide: FrameworkGuide }) {
  return guide.shape === "pipeline" ? (
    <Pipeline guide={guide} />
  ) : (
    <Constellation guide={guide} />
  );
}

function Constellation({ guide }: { guide: FrameworkGuide }) {
  const { accent, nodes, centerLabel } = guide;
  const N = nodes.length;
  // Elliptical: pull the horizontal reach in so wide side-chips stay inside the
  // ring, keep the vertical reach for spread.
  const RX = 32;
  const RY = 37;
  const pts = nodes.map((n, i) => {
    const a = ((-90 + (i * 360) / N) * Math.PI) / 180;
    return { ...n, x: 50 + RX * Math.cos(a), y: 50 + RY * Math.sin(a) };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* Concentric rings + connectors */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="0.4" />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={accent}
          strokeOpacity="0.16"
          strokeWidth="0.4"
          strokeDasharray="1 2.5"
          style={{ transformOrigin: "center", animation: "cv-sweep 40s linear infinite" }}
        />
        {pts.map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="0.5"
            strokeDasharray="1.4 1.8"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "cv-edge-flow 3s linear infinite" }}
          />
        ))}
      </svg>

      {/* Accent glow behind the hub */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.22, animation: "cv-breathe 4s ease-in-out infinite" }}
      />

      {/* Centre hub */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b1220] text-center shadow-[0_20px_44px_-18px_rgba(11,18,32,.7)]">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 1px ${accent}66, inset 0 0 22px ${accent}33` }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-[-8%] rounded-full border"
          style={{ borderColor: `${accent}55`, animation: "cv-ring-ping 3s ease-out infinite" }}
        />
        <span className="px-2 font-display text-[13px] font-bold leading-[1.1] text-white sm:text-[15px]">
          {centerLabel}
        </span>
      </div>

      {/* Spoke nodes */}
      {pts.map((p, i) => (
        <div
          key={p.label}
          className="absolute z-20 w-[112px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: "translate(-50%,-50%)",
            animation: `cv-stage-pop .5s ${180 + i * 90}ms cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          <div className="rounded-[11px] border border-line bg-white px-2.5 py-1.5 text-center shadow-[0_10px_26px_-14px_rgba(15,23,42,.4)]">
            <div className="flex items-center justify-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
              <span className="font-display text-[11px] font-semibold leading-tight text-ink">
                {p.label}
              </span>
            </div>
            {p.short && (
              <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[.04em] text-ink-soft">
                {p.short}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* A couple of drifting sparkles for life */}
      {[
        { t: "12%", l: "82%", d: "0s" },
        { t: "78%", l: "14%", d: "1.2s" },
      ].map((s) => (
        <span
          key={s.l}
          aria-hidden="true"
          className="absolute text-[15px]"
          style={{ top: s.t, left: s.l, color: accent, animation: `cv-float-soft 3.6s ${s.d} ease-in-out infinite` }}
        >
          &#10022;
        </span>
      ))}
    </div>
  );
}

function Pipeline({ guide }: { guide: FrameworkGuide }) {
  const { accent, nodes, centerLabel } = guide;
  return (
    <div className="mx-auto w-full max-w-[520px]">
      {/* Centre mark as the lead badge */}
      <div className="mb-6 flex justify-center">
        <div className="relative flex items-center gap-2.5 rounded-full bg-[#0b1220] px-5 py-2.5 shadow-[0_18px_40px_-20px_rgba(11,18,32,.7)]">
          <span
            aria-hidden="true"
            className="absolute inset-[-6px] rounded-full border"
            style={{ borderColor: `${accent}55`, animation: "cv-ring-ping 3s ease-out infinite" }}
          />
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          <span className="font-display text-[14px] font-bold text-white">{centerLabel}</span>
        </div>
      </div>

      {/* Function rail */}
      <div className="relative">
        <div className="absolute left-4 right-4 top-[22px] h-[2px] overflow-hidden rounded-full bg-line">
          <div
            className="h-full w-1/3 rounded-full"
            style={{
              background: `linear-gradient(90deg,transparent,${accent},transparent)`,
              animation: "cv-flow-pulse 2.6s linear infinite",
            }}
          />
        </div>
        <ol className="relative grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:flex md:justify-between">
          {nodes.map((n, i) => (
            <li
              key={n.label}
              className="flex flex-col items-center px-1 text-center md:flex-1"
              style={{ animation: `cv-stage-pop .5s ${140 + i * 100}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              <span
                className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] bg-white font-mono text-[12px] font-bold"
                style={{ borderColor: accent, color: accent }}
              >
                {i + 1}
              </span>
              <span className="font-display text-[12px] font-semibold leading-tight text-ink">
                {n.label}
              </span>
              {n.short && (
                <span className="mt-0.5 text-[10px] text-ink-soft">{n.short}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
