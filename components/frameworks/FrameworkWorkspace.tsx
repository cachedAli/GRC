import type { FrameworkGuide } from "@/data/frameworks";
import { FRAMEWORK_ARTIFACTS } from "@/data/frameworks";
import { Sparkle } from "@/components/ui/Primitives";

/**
 * A drawn screenshot of the framework running inside the platform: its control
 * areas with AI-recommended evidence, what is still missing, and the standard
 * templates a team spins the required artifacts from. Content is per-framework
 * (real domains + real deliverables), so no two look the same. Pure CSS, server
 * component.
 */
export default function FrameworkWorkspace({ guide }: { guide: FrameworkGuide }) {
  const a = guide.accent;
  const artifacts = FRAMEWORK_ARTIFACTS[guide.slug] ?? [];
  const rows = guide.nodes.slice(0, 4).map((n, i) => ({
    label: n.label,
    status: i === 0 ? "ready" : i === 2 ? "missing" : "ai",
  }));
  const open = rows.filter((r) => r.status !== "ready").length;

  return (
    <div className="w-[540px] overflow-hidden rounded-[16px] border border-line bg-white font-body">
      {/* Title bar */}
      <div className="flex items-center gap-2.5 border-b border-line-soft bg-[#f8fafc] px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-line-soft bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={guide.logo} alt="" className="h-4 w-4 object-contain" />
        </span>
        <div className="flex-1">
          <div className="font-display text-[12.5px] font-semibold text-ink">
            {guide.name} · Assessment
          </div>
          <div className="text-[10px] text-ink-soft">Statement-level status</div>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{ background: `${a}18`, color: a }}
        >
          64% ready
        </span>
      </div>

      {/* Readiness bar */}
      <div className="px-4 pt-3">
        <div className="h-[6px] overflow-hidden rounded-full bg-line-soft">
          <div
            className="h-full rounded-full"
            style={{ width: "64%", background: a, animation: "cv-grow 1.1s cubic-bezier(.22,1,.36,1) both" }}
          />
        </div>
      </div>

      {/* Controls + evidence */}
      <div className="px-4 pb-1 pt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-ink-faint">
            Control area
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-ink-faint">
            AI evidence
          </span>
        </div>

        <div className="grid gap-1.5">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className="flex items-center gap-2.5 rounded-[10px] border border-line-soft bg-white px-3 py-2"
              style={{ animation: `cv-stage-pop .4s ${120 + i * 90}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              <StatusDot status={r.status} accent={a} />
              <span className="flex-1 truncate text-[12px] font-semibold text-ink">
                {r.label}
              </span>
              <EvidenceChip status={r.status} accent={a} artifact={artifacts[0]} />
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendation callout */}
      <div className="mx-4 mt-3 flex items-start gap-2.5 rounded-[10px] bg-[#0b1220] px-3.5 py-2.5">
        <span
          className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px]"
          style={{ background: a, color: "#08110d" }}
        >
          <Sparkle />
        </span>
        <p className="text-[11px] leading-[1.5] text-slate-200/85">
          <span className="font-semibold" style={{ color: a }}>
            AI recommends evidence
          </span>{" "}
          for {open} open controls, and flags what is still missing.
        </p>
      </div>

      {/* Create from template */}
      <div className="px-4 pb-4 pt-3.5">
        <div className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-ink-faint">
          Create from standard template
        </div>
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {["Policy", "Assessment", "Charter"].map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold"
              style={{ borderColor: `${a}55`, color: a, background: `${a}0d` }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 3h7l5 5v13H7zM14 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {artifacts.map((art) => (
            <span
              key={art}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-[#f8fafc] px-2.5 py-1 text-[10.5px] font-medium text-ink-soft"
            >
              <span className="text-[12px] leading-none" style={{ color: a }}>
                +
              </span>
              {art}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status, accent }: { status: string; accent: string }) {
  if (status === "ready") {
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "missing") {
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 7v6M12 16.5v.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px]"
      style={{ background: accent, color: "#08110d" }}
    >
      <Sparkle />
    </span>
  );
}

function EvidenceChip({
  status,
  accent,
  artifact,
}: {
  status: string;
  accent: string;
  artifact?: string;
}) {
  if (status === "ready") {
    return (
      <span className="inline-flex max-w-[150px] items-center gap-1 rounded-md bg-[#ecfdf5] px-2 py-1 text-[10px] font-semibold text-[#047857]">
        <span className="truncate">{artifact ?? "Evidence linked"}</span>
      </span>
    );
  }
  if (status === "missing") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-[#fffbeb] px-2 py-1 text-[10px] font-semibold text-[#b45309]">
        Create <span aria-hidden="true">▸</span>
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold"
      style={{ background: `${accent}14`, color: accent }}
    >
      Suggested <span aria-hidden="true">+</span>
    </span>
  );
}
