"use client";

import {
  ASSET_AXES,
  CIS_TARGETS,
  CONNECTOR_LOGOS,
  EVIDENCE_MATCHES,
  SCANNERS,
  TPRA_STAGES,
  VULN_SIGNALS,
  type ModuleStory,
} from "@/data/modules";
import { Sparkle } from "@/components/ui/Primitives";

/* ------------------------------------------------------------------ *
 * Shared chrome
 * ------------------------------------------------------------------ */

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-brand-ink">
        {title}
      </div>
      {children}
    </div>
  );
}

/** A labelled bar. `tone` shifts it from brand green to amber for weak scores. */
function Bar({ pct, tone = "brand" }: { pct: number; tone?: "brand" | "warn" | "mute" }) {
  const bg =
    tone === "warn" ? "bg-[#f59e0b]" : tone === "mute" ? "bg-[#cbd5e1]" : "bg-brand";
  return (
    <span className="block h-[5px] flex-1 overflow-hidden rounded-full bg-line-soft">
      <span
        className={`block h-full rounded-full ${bg} transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]`}
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Per-module proofs
 * ------------------------------------------------------------------ */

/** Evidence: one artifact answering three frameworks at once. */
function EvidenceProof() {
  return (
    <Panel title="One artifact · three frameworks · AI-suggested, not yet linked">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[430px] border-collapse text-left">
          <thead>
            <tr className="text-[9.5px] uppercase tracking-[.1em] text-ink-faint">
              <th className="pb-2 font-semibold">Framework</th>
              <th className="pb-2 font-semibold">Control</th>
              <th className="pb-2 font-semibold">Coverage</th>
              <th className="pb-2 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {EVIDENCE_MATCHES.map((m) => (
              <tr key={m.control} className="border-t border-line-soft align-middle">
                <td className="py-2 pr-3 text-[11.5px] font-semibold text-ink">
                  {m.framework}
                </td>
                <td className="py-2 pr-3">
                  <span className="font-mono text-[10.5px] font-semibold text-brand-ink">
                    {m.control}
                  </span>
                  <span className="block text-[10px] leading-tight text-ink-soft">
                    {m.title}
                  </span>
                </td>
                <td className="py-2 pr-3">
                  <span className="rounded-full bg-[#fffbeb] px-2 py-0.5 text-[9.5px] font-bold text-[#b45309]">
                    {m.coverage}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <span className="rounded-md border border-brand-200 bg-brand-100 px-2 py-1 text-[9.5px] font-semibold text-brand-ink">
                    Link
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-[1.5] text-ink-soft">
        <Sparkle /> Review each row, then link the ones that fit, the AI proposes, a
        human decides.
      </p>
    </Panel>
  );
}

/** Vulnerabilities: the re-score from CVSS-alone to host-contextual. */
function VulnProof() {
  return (
    <Panel title="CVE-2024-2961 · on Primary Web Server">
      <div className="mb-3 flex items-center gap-3">
        <ScoreChip label="Before · CVSS alone" value={88} tone="mute" />
        <span className="text-[16px] text-ink-faint" aria-hidden="true">
          →
        </span>
        <ScoreChip label="After · on this host" value={79} tone="brand" />
        <span className="ml-auto rounded-full bg-[#fef2f2] px-2.5 py-1 text-[10px] font-bold text-[#b91c1c]">
          Weaponized
        </span>
      </div>
      <div className="grid gap-1.5">
        {VULN_SIGNALS.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <span className="w-[104px] shrink-0 text-[10.5px] text-ink-muted">
              {s.label}
            </span>
            <Bar
              pct={(s.score / s.max) * 100}
              tone={s.score === 0 ? "mute" : s.score / s.max > 0.85 ? "brand" : "warn"}
            />
            <span className="hidden w-[92px] shrink-0 text-right font-mono text-[9.5px] text-ink-soft sm:block">
              {s.value}
            </span>
            <span className="w-[34px] shrink-0 text-right font-mono text-[9.5px] font-semibold text-ink">
              {s.score}/{s.max}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ScoreChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "brand" | "mute";
}) {
  return (
    <span
      className={`rounded-xl border px-3 py-2 ${
        tone === "brand"
          ? "border-brand-200 bg-brand-50"
          : "border-line bg-[#f8fafc]"
      }`}
    >
      <span className="block text-[9px] uppercase tracking-[.1em] text-ink-faint">
        {label}
      </span>
      <span
        className={`font-display text-[20px] font-bold leading-none ${
          tone === "brand" ? "text-brand-ink" : "text-ink-faint"
        }`}
      >
        {value}
      </span>
    </span>
  );
}

/** Assets: the eight criticality axes plus CIS hardening pass rates. */
function AssetProof() {
  return (
    <div className="grid gap-3">
      <Panel title="Criticality · scored on 8 business axes">
        <div className="grid gap-1.5">
          {ASSET_AXES.map((a) => (
            <div key={a.label} className="flex items-center gap-2.5">
              <span className="w-[118px] shrink-0 text-[10.5px] text-ink-muted">
                {a.label}
              </span>
              <Bar pct={a.pct} tone={a.pct >= 85 ? "brand" : "warn"} />
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="CIS benchmark · pass / fail per platform">
        <div className="grid gap-2">
          {CIS_TARGETS.map((t) => {
            const total = t.pass + t.fail;
            return (
              <div key={t.name} className="flex items-center gap-2.5">
                <span className="w-[104px] shrink-0 text-[10.5px] font-medium text-ink">
                  {t.name}
                </span>
                <span className="flex h-[7px] flex-1 overflow-hidden rounded-full bg-line-soft">
                  <span
                    className="h-full bg-brand"
                    style={{ width: `${(t.pass / total) * 100}%` }}
                  />
                  <span
                    className="h-full bg-[#f87171]"
                    style={{ width: `${(t.fail / total) * 100}%` }}
                  />
                </span>
                <span className="shrink-0 font-mono text-[9.5px] text-ink-soft">
                  {t.pass}/{total}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/** Vendors: the eleven governed stages, drawn as a rail. */
function VendorProof() {
  return (
    <Panel title="The governed lifecycle · 11 stages, every vendor">
      <div className="flex flex-wrap gap-1.5">
        {TPRA_STAGES.map((s, i) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 py-1 pl-1.5 pr-2.5 text-[10.5px] font-medium text-brand-forest"
          >
            <span className="inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-brand font-mono text-[8px] font-bold text-on-brand">
              {i + 1}
            </span>
            {s}
          </span>
        ))}
      </div>
    </Panel>
  );
}

/** Connectors: real logos, plus the scanners findings arrive from. */
function ConnectorProof() {
  return (
    <div className="grid gap-3">
      <Panel title="Connectors · pull from what you already run">
        <div className="flex flex-wrap gap-1.5">
          {CONNECTOR_LOGOS.map((c) => (
            <span
              key={c}
              title={c.replace(/_/g, " ")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/connectors/${c}.svg`}
                alt={c}
                className="h-[17px] w-[17px] object-contain"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </Panel>
      <Panel title="Findings arrive from">
        <div className="grid gap-1.5">
          {SCANNERS.map((s) => (
            <span
              key={s}
              className="flex items-center gap-2 rounded-lg border border-line-soft bg-[#f8fafc] px-2.5 py-1.5 text-[11px] font-medium text-ink-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {s}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/** Documents: the lifecycle pips plus what a policy carries. */
function DocumentProof() {
  const docs = [
    { name: "Information Security Policy", stage: 5, status: "Published", fw: "ISO 27001" },
    { name: "Access Control Policy", stage: 3, status: "Approval", fw: "SOC 2" },
    { name: "Cardholder Data Handling", stage: 2, status: "Review", fw: "PCI DSS" },
  ];
  return (
    <Panel title="One library · lifecycle, framework, attestation">
      <div className="grid gap-2">
        {docs.map((d) => (
          <div key={d.name} className="rounded-lg border border-line-soft bg-[#f8fafc] px-2.5 py-2">
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink">
                {d.name}
              </span>
              <span className="shrink-0 rounded-full border border-brand-200 bg-brand-100 px-2 py-0.5 text-[9px] font-semibold text-brand-ink">
                {d.fw}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
            <span className="inline-flex gap-[2.5px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-1 w-[13px] rounded-full"
                  style={{
                    background:
                      i < d.stage - 1
                        ? "#1ed4b0"
                        : i === d.stage - 1
                          ? "#f59e0b"
                          : "#e2e8f0",
                  }}
                />
              ))}
            </span>
            <span className="text-[9.5px] font-semibold text-ink-soft">
              {d.status}
            </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-[1.5] text-ink-soft">
        Built-in templates for ISO 27001, SOC 2 and PCI DSS · in-place versioning ·
        full history
      </p>
    </Panel>
  );
}

/** Committees: charter → members → meeting → actions. */
function CommitteeProof() {
  const actions = [
    { item: "Approve revised BCM policy", owner: "CISO", due: "12 Mar" },
    { item: "Close SAMA 3.3.14 evidence gap", owner: "Head of IT", due: "20 Mar" },
    { item: "Review Q1 vendor reassessments", owner: "Procurement", due: "31 Mar" },
  ];
  return (
    <Panel title="Security Steering Committee · open actions">
      <div className="grid gap-1.5">
        {actions.map((a) => (
          <div
            key={a.item}
            className="flex min-w-0 items-center gap-2.5 rounded-lg border border-line-soft bg-[#f8fafc] px-2.5 py-2"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span className="min-w-0 flex-1 truncate text-[11px] text-ink-muted">
              {a.item}
            </span>
            <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[9.5px] font-semibold text-ink">
              {a.owner}
            </span>
            <span className="shrink-0 font-mono text-[9.5px] text-ink-soft">{a.due}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** Generic fallback: a coverage read-out, used by the less bespoke modules. */
function CoverageProof({ story }: { story: ModuleStory }) {
  const rows = [
    { name: "ISO 27001", pct: 91 },
    { name: "SOC 2", pct: 87 },
    { name: "SAMA CSF", pct: 78 },
    { name: "PCI DSS", pct: 81 },
  ];
  return (
    <Panel title={`${story.name} · live coverage`}>
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2.5">
            <span className="w-[74px] shrink-0 text-[11px] font-semibold text-ink">
              {r.name}
            </span>
            <Bar pct={r.pct} tone={r.pct >= 85 ? "brand" : "warn"} />
            <span className="w-[30px] shrink-0 text-right font-mono text-[10px] font-semibold text-brand-ink">
              {r.pct}%
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ *
 * Selector
 * ------------------------------------------------------------------ */

export default function ModuleProof({ story }: { story: ModuleStory }) {
  switch (story.proof) {
    case "evidence":
      return <EvidenceProof />;
    case "vulnerabilities":
      return <VulnProof />;
    case "assets":
      return <AssetProof />;
    case "vendors":
      return <VendorProof />;
    case "connectors":
      return <ConnectorProof />;
    case "documents":
      return <DocumentProof />;
    case "committees":
      return <CommitteeProof />;
    default:
      return <CoverageProof story={story} />;
  }
}
