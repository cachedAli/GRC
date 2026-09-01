"use client";

import {
  ASSET_AXES,
  CIS_TARGETS,
  CONNECTOR_LOGOS,
  EVIDENCE_MATCHES,
  TPRA_STAGES,
  VULN_SIGNALS,
  type ModuleStory,
} from "@/data/modules";
import { Card, CardTitle, Lines, Pill, PillRow, Scene, Stat, Wire } from "./SceneKit";

/* ================================================================== *
 * 01 · Governance, a policy moves through its gates, then the gap it
 * leaves behind gets a treatment decision.
 * ================================================================== */
function GovernanceScene() {
  const gates = ["Draft", "Review", "Approval", "Published", "Attested"];
  return (
    <Scene>
      <Card x="3%" y="8%" w="52%" delay={0}>
        <CardTitle>Information Security Policy</CardTitle>
        <div className="px-3 py-2.5">
          <div className="mb-2 flex items-center gap-1">
            {gates.map((g, i) => (
              <span key={g} className="flex-1">
                <span
                  className="block h-[4px] rounded-full"
                  style={{
                    background: i < 4 ? "#1ed4b0" : "#e2e8f0",
                    animation: `cv-grow .4s ${200 + i * 160}ms cubic-bezier(.22,1,.36,1) both`,
                  }}
                />
                <span className="mt-1 block text-[7.5px] text-ink-soft">{g}</span>
              </span>
            ))}
          </div>
          <Lines n={2} w={["88%", "64%"]} />
        </div>
      </Card>

      {/* The treatment decision, mirroring the real gap-analysis flow. */}
      <Card x="34%" y="38%" w="60%" delay={520} front float>
        <CardTitle>Gap found · ISO 27001 A.5.23</CardTitle>
        <div className="grid gap-1.5 p-2.5">
          {[
            { t: "Accept risk", tone: "brand" as const, i: "M9 12.5l2 2 4-4" },
            { t: "Mitigate risk", tone: "warn" as const, i: "M12 9v4M12 16v.01" },
            { t: "Not applicable", tone: "mute" as const, i: "M8 12h8" },
          ].map((o, i) => (
            <div
              key={o.t}
              className="flex items-center gap-2 rounded-lg border px-2 py-1.5"
              style={{
                animation:
                  i === 1
                    ? `cv-highlight 1.6s 900ms cubic-bezier(.22,1,.36,1) forwards`
                    : undefined,
                borderColor: i === 1 ? undefined : "transparent",
              }}
            >
              <span
                className="h-[9px] w-[9px] shrink-0 rounded-full"
                style={{
                  boxShadow: "inset 0 0 0 1.5px #cbd5e1",
                  animation: i === 1 ? "cv-radio 1.6s 900ms forwards" : undefined,
                }}
              />
              <Pill tone={o.tone}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                  <path d={o.i} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </Pill>
              <span className="text-[10px] font-medium text-ink">{o.t}</span>
            </div>
          ))}
        </div>
      </Card>

      <Stat label="Attested" value="94%" sub="1,204 staff" x="4%" y="62%" delay={1100} />
    </Scene>
  );
}

/* ================================================================== *
 * 02 · Committees, members assemble around a charter, actions eject.
 * ================================================================== */
function CommitteeScene() {
  const people = ["MA", "SK", "RF", "JD", "LP"];
  return (
    <Scene>
      <Card x="5%" y="10%" w="46%" delay={0}>
        <CardTitle>Security Steering Committee</CardTitle>
        <div className="p-2.5">
          <div className="mb-2 flex">
            {people.map((p, i) => (
              <span
                key={p}
                className="-ml-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-100 text-[8px] font-bold text-brand-ink first:ml-0"
                style={{ animation: `cv-pop .4s ${150 + i * 110}ms cubic-bezier(.22,1,.36,1) both` }}
              >
                {p}
              </span>
            ))}
          </div>
          <div className="rounded-lg border border-line-soft bg-[#f8fafc] px-2 py-1.5">
            <div className="text-[9px] font-semibold text-ink">Charter v2.1</div>
            <div className="text-[8px] text-brand-ink">Approved · 12 Feb</div>
          </div>
        </div>
      </Card>

      <Card x="40%" y="44%" w="56%" delay={620} front float>
        <CardTitle>Open actions</CardTitle>
        <div className="grid gap-1 p-2">
          {[
            ["Approve revised BCM policy", "CISO", "12 Mar"],
            ["Close SAMA 3.3.14 gap", "Head of IT", "20 Mar"],
            ["Q1 vendor reassessments", "Procurement", "31 Mar"],
          ].map(([t, o, d], i) => (
            <div
              key={t}
              className="flex min-w-0 items-center gap-1.5 rounded-md bg-[#f8fafc] px-1.5 py-1"
              style={{ animation: `cv-tick .4s ${800 + i * 150}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span className="min-w-0 flex-1 truncate text-[9px] text-ink-muted">{t}</span>
              <Pill tone="mute">{o}</Pill>
              <span className="shrink-0 font-mono text-[8px] text-ink-faint">{d}</span>
            </div>
          ))}
        </div>
      </Card>
    </Scene>
  );
}

/* ================================================================== *
 * 03 · Evidence, one artifact is scanned, then wired to three frameworks.
 * ================================================================== */
function EvidenceScene() {
  return (
    <Scene>
      <Card x="4%" y="14%" w="34%" delay={0}>
        <CardTitle>log-retention.pdf</CardTitle>
        <div className="relative">
          <Lines n={4} w={["86%", "70%", "80%", "56%"]} />
          {/* OCR sweep across the artifact. */}
          <span
            className="pointer-events-none absolute left-2 right-2 h-[2px] rounded-full bg-[linear-gradient(90deg,transparent,#1ed4b0,transparent)]"
            style={{ animation: "cv-scan 2s 300ms ease-in-out 2" }}
          />
        </div>
        <div className="flex items-center gap-1 border-t border-line-soft px-2 py-1.5">
          <Pill tone="brand">OCR</Pill>
          <span className="text-[8px] text-ink-soft">Valid to 12/2026</span>
        </div>
      </Card>

      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Wire d="M38 28 C 50 28, 50 22, 62 22" delay={1400} dash={40} />
        <Wire d="M38 32 C 50 32, 50 38, 62 38" delay={1600} dash={40} />
        <Wire d="M38 36 C 50 36, 50 54, 62 54" delay={1800} dash={40} />
      </svg>

      <Card x="44%" y="10%" w="53%" delay={1200} front>
        <CardTitle>AI-suggested · not yet linked</CardTitle>
        <div className="grid gap-1 p-2">
          {EVIDENCE_MATCHES.map((m, i) => (
            <div
              key={m.control}
              className="flex min-w-0 items-center gap-1.5 rounded-md border border-transparent px-1.5 py-1"
              style={{ animation: `cv-highlight 1.2s ${1500 + i * 220}ms cubic-bezier(.22,1,.36,1) forwards` }}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[9px] font-semibold text-ink">
                  {m.framework}
                </span>
                <span className="block font-mono text-[8px] text-brand-ink">{m.control}</span>
              </span>
              <Pill tone="warn">partial</Pill>
              <Pill tone="brand">Link</Pill>
            </div>
          ))}
        </div>
      </Card>

      <Stat label="Reused across" value="3 frameworks" sub="from one upload" x="42%" y="66%" delay={2200} />
    </Scene>
  );
}

/* ================================================================== *
 * 04 · Vendors, a vendor token walks the eleven governed stages.
 * ================================================================== */
function VendorScene() {
  return (
    <Scene>
      <Card x="4%" y="9%" w="92%" delay={0}>
        <CardTitle>PayGate Ltd · critical tier</CardTitle>
        <div className="p-2.5">
          <div className="grid grid-cols-11 gap-[3px]">
            {TPRA_STAGES.map((s, i) => (
              <span key={s} className="flex flex-col items-center gap-1" title={s}>
                <span
                  className="block h-[5px] w-full rounded-full"
                  style={{
                    background: i <= 7 ? "#1ed4b0" : "#e2e8f0",
                    animation: `cv-grow .35s ${150 + i * 90}ms cubic-bezier(.22,1,.36,1) both`,
                  }}
                />
                <span className="font-mono text-[7px] text-ink-faint">{i + 1}</span>
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[8px] text-ink-soft">
            <span>Intake &amp; Scoping</span>
            <span>Reassessment &amp; Offboarding</span>
          </div>
        </div>
      </Card>

      <Card x="8%" y="40%" w="58%" delay={1050} front float>
        <CardTitle>Stage 8 · Approval decision</CardTitle>
        <div className="grid gap-1 p-2">
          {["Approve", "Approve with conditions", "Defer", "Reject"].map((o, i) => (
            <div
              key={o}
              className="flex items-center gap-2 rounded-md border border-transparent px-1.5 py-1"
              style={{
                animation: i === 1 ? "cv-highlight 1.4s 1400ms forwards" : undefined,
              }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-full"
                style={{
                  boxShadow: "inset 0 0 0 1.5px #cbd5e1",
                  animation: i === 1 ? "cv-radio 1.4s 1400ms forwards" : undefined,
                }}
              />
              <span className="text-[9.5px] text-ink">{o}</span>
            </div>
          ))}
        </div>
      </Card>

      <Stat label="Conditions" value="3 tracked" sub="as obligations" x="68%" y="48%" delay={2100} />
    </Scene>
  );
}

/* ================================================================== *
 * 05 · Assets, a criticality radar draws, then hardening results land.
 * ================================================================== */
function AssetScene() {
  const n = ASSET_AXES.length;
  const pts = ASSET_AXES.map((a, i) => {
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = 4 + (a.pct / 100) * 30;
    return `${50 + r * Math.cos(ang)},${50 + r * Math.sin(ang)}`;
  }).join(" ");

  return (
    <Scene>
      <Card x="3%" y="10%" w="44%" delay={0}>
        <CardTitle>Primary Web Server</CardTitle>
        <div className="flex items-center gap-1 px-2.5 py-2">
          <Pill tone="danger">critical</Pill>
          <Pill tone="brand">CDE</Pill>
          <Pill tone="mute">internet-facing</Pill>
        </div>
        <div className="relative h-[104px]">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {[12, 22, 32].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="0.6" />
            ))}
            {ASSET_AXES.map((_, i) => {
              const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 34 * Math.cos(ang)}
                  y2={50 + 34 * Math.sin(ang)}
                  stroke="#e2e8f0"
                  strokeWidth="0.6"
                />
              );
            })}
            <polygon
              points={pts}
              fill="rgb(30 212 176 / .22)"
              stroke="#1ed4b0"
              strokeWidth="1.4"
              style={{
                transformOrigin: "50% 50%",
                animation: "cv-radar .8s 400ms cubic-bezier(.22,1,.36,1) both",
              }}
            />
          </svg>
        </div>
      </Card>

      <Card x="45%" y="26%" w="52%" delay={700} front float>
        <CardTitle>CIS benchmark</CardTitle>
        <div className="grid gap-1.5 p-2.5">
          {CIS_TARGETS.map((t, i) => {
            const total = t.pass + t.fail;
            return (
              <div key={t.name} className="flex items-center gap-1.5">
                <span className="w-[64px] shrink-0 truncate text-[8.5px] text-ink-muted">
                  {t.name}
                </span>
                <span className="flex h-[5px] flex-1 overflow-hidden rounded-full bg-line-soft">
                  <span
                    className="h-full bg-brand"
                    style={{
                      width: `${(t.pass / total) * 100}%`,
                      animation: `cv-grow .6s ${900 + i * 140}ms cubic-bezier(.22,1,.36,1) both`,
                    }}
                  />
                  <span className="h-full bg-[#f87171]" style={{ width: `${(t.fail / total) * 100}%` }} />
                </span>
                <span className="shrink-0 font-mono text-[8px] text-ink-soft">
                  {t.pass}/{total}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Stat label="Criticality" value="8.5 / 10" sub="8 business axes" x="4%" y="72%" delay={1400} />
    </Scene>
  );
}

/* ================================================================== *
 * 06 · Vulnerabilities, the score is recomputed against its host.
 * ================================================================== */
function VulnScene() {
  return (
    <Scene>
      <Card x="4%" y="8%" w="50%" delay={0}>
        <CardTitle>VULN-50 · CVE-2024-2961</CardTitle>
        <div className="flex flex-wrap items-center gap-1 px-2.5 py-2">
          <Pill tone="danger">weaponized</Pill>
          <Pill tone="warn">EPSS 88.3%</Pill>
          <Pill tone="mute">not in KEV</Pill>
        </div>
        <div className="flex items-end gap-2 border-t border-line-soft px-2.5 py-2">
          <span className="text-center">
            <span className="block text-[8px] uppercase tracking-[.08em] text-ink-faint">
              CVSS alone
            </span>
            <span className="font-display text-[22px] font-bold leading-none text-ink-faint line-through">
              88
            </span>
          </span>
          
          <span className="text-center">
            <span className="block text-[8px] uppercase tracking-[.08em] text-brand-ink">
              On this host
            </span>
            <span
              className="font-display text-[26px] font-bold leading-none text-brand-ink"
              style={{ animation: "cv-pop .5s 900ms cubic-bezier(.22,1,.36,1) both" }}
            >
              79
            </span>
          </span>
        </div>
      </Card>

      <Card x="42%" y="30%" w="55%" delay={600} front float>
        <CardTitle>7 exploitability signals</CardTitle>
        <div className="grid gap-[5px] p-2.5">
          {VULN_SIGNALS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="w-[70px] shrink-0 truncate text-[8px] text-ink-muted">
                {s.label}
              </span>
              <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-line-soft">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${(s.score / s.max) * 100}%`,
                    background: s.score === 0 ? "#cbd5e1" : "#1ed4b0",
                    animation: `cv-grow .55s ${800 + i * 110}ms cubic-bezier(.22,1,.36,1) both`,
                  }}
                />
              </span>
              <span className="w-[26px] shrink-0 text-right font-mono text-[7.5px] text-ink">
                {s.score}/{s.max}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </Scene>
  );
}

/* ================================================================== *
 * 07 · Workflow, nodes wire themselves together, a token takes a branch.
 * ================================================================== */
function WorkflowScene() {
  const node = (x: string, y: string, label: string, delay: number, tone = "brand") => (
    <div
      className={`absolute z-20 rounded-lg border px-2 py-1.5 text-[9px] font-semibold shadow-sm ${
        tone === "brand"
          ? "border-brand-200 bg-white text-ink"
          : "border-[#fde68a] bg-[#fffbeb] text-[#b45309]"
      }`}
      style={{ left: x, top: y, animation: `cv-pop .4s ${delay}ms cubic-bezier(.22,1,.36,1) both` }}
    >
      {label}
    </div>
  );
  return (
    <Scene>
      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Wire d="M22 28 H 40" delay={500} dash={20} />
        <Wire d="M58 28 H 68 V 16 H 78" delay={800} dash={40} />
        <Wire d="M58 28 H 68 V 46 H 78" delay={1000} dash={40} />
        <Wire d="M88 52 V 74 H 40" delay={1400} dash={80} />
      </svg>

      {node("4%", "22%", "Control fails", 150)}
      {node("40%", "22%", "If critical asset", 400)}
      {node("77%", "10%", "Route to owner", 750)}
      {node("77%", "40%", "Notify committee", 950)}
      {node("28%", "68%", "Escalate on SLA breach", 1350, "warn")}

      <Stat label="Built by you" value="Any record" sub="any business unit" x="4%" y="45%" delay={1600} />
      <PillRow items={["Event-driven", "Conditional", "Escalations", "Full audit trail"]} delay={1800} />
    </Scene>
  );
}

/* ================================================================== *
 * 08 · Integrations, packets travel from connectors into the graph.
 * ================================================================== */
function ConnectorScene() {
  const shown = CONNECTOR_LOGOS.slice(0, 12);
  return (
    <Scene>
      <Card x="3%" y="12%" w="40%" delay={0}>
        <CardTitle>Connected sources</CardTitle>
        <div className="grid grid-cols-6 gap-1 p-2">
          {shown.map((c, i) => (
            <span
              key={c}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-line bg-white"
              style={{ animation: `cv-pop .35s ${100 + i * 55}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/connectors/${c}.svg`} alt="" className="h-[13px] w-[13px] object-contain" />
            </span>
          ))}
        </div>
      </Card>

      {/* Packets flowing into the platform. */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute z-10 h-1.5 w-1.5 rounded-full bg-brand"
          style={{
            left: "44%",
            top: `${30 + i * 12}%`,
            ["--dx" as string]: "88px",
            animation: `cv-packet 1.6s ${900 + i * 260}ms linear infinite`,
          }}
        />
      ))}

      <Card x="58%" y="24%" w="38%" delay={700} front float>
        <CardTitle>Auto-linked</CardTitle>
        <div className="grid gap-1 p-2">
          {[
            ["Nessus", "412 findings"],
            ["Wiz", "88 findings"],
            ["AWS", "1,204 assets"],
          ].map(([s, v], i) => (
            <div
              key={s}
              className="flex items-center gap-1.5 rounded-md bg-[#f8fafc] px-1.5 py-1"
              style={{ animation: `cv-tick .4s ${1100 + i * 170}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              <span className="h-1 w-1 rounded-full bg-brand" />
              <span className="flex-1 text-[9px] font-semibold text-ink">{s}</span>
              <span className="font-mono text-[8px] text-ink-soft">{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <PillRow items={["Cloud connectors", "Scanners", "Identity providers", "Evidence collectors"]} delay={1600} />
    </Scene>
  );
}

/* ================================================================== *
 * 09 · Assessments, statements tick off, the readiness ring closes.
 * ================================================================== */
function AssessmentScene() {
  const rows = [
    ["A.5.1 Policies for information security", "met"],
    ["A.5.23 Cloud services security", "gap"],
    ["A.8.16 Monitoring activities", "met"],
    ["A.8.8 Technical vulnerabilities", "met"],
  ] as const;
  return (
    <Scene>
      <Card x="4%" y="12%" w="60%" delay={0}>
        <CardTitle>ISO 27001 · statement level</CardTitle>
        <div className="grid gap-1 p-2">
          {rows.map(([t, s], i) => (
            <div
              key={t}
              className="flex min-w-0 items-center gap-1.5 rounded-md bg-[#f8fafc] px-1.5 py-1"
              style={{ animation: `cv-tick .4s ${250 + i * 190}ms cubic-bezier(.22,1,.36,1) both` }}
            >
              <span className="min-w-0 flex-1 truncate text-[9px] text-ink-muted">{t}</span>
              <Pill tone={s === "met" ? "brand" : "warn"}>{s === "met" ? "met" : "gap"}</Pill>
            </div>
          ))}
        </div>
      </Card>

      <Card x="60%" y="34%" w="36%" delay={800} front float>
        <div className="p-3 text-center">
          <svg viewBox="0 0 36 36" className="mx-auto h-[64px] w-[64px]">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#1ed4b0"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="94"
              strokeDashoffset="94"
              transform="rotate(-90 18 18)"
              style={{ animation: "cv-draw 1.1s 1000ms cubic-bezier(.22,1,.36,1) forwards" }}
            />
          </svg>
          <div className="mt-1 font-display text-[15px] font-bold text-ink">87%</div>
          <div className="text-[8.5px] text-ink-soft">audit ready</div>
        </div>
      </Card>
    </Scene>
  );
}

/* ================================================================== *
 * 10 · Controls, one control inherits out to many frameworks.
 * ================================================================== */
function ControlScene() {
  const fws = ["ISO 27001", "SOC 2", "PCI DSS", "SAMA CSF", "NIST CSF"];
  return (
    <Scene>
      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {fws.map((_, i) => (
          <Wire key={i} d={`M34 50 C 52 50, 52 ${16 + i * 17}, 64 ${16 + i * 17}`} delay={700 + i * 130} dash={50} />
        ))}
      </svg>

      <Card x="3%" y="36%" w="31%" delay={0} float>
        <CardTitle>Access review</CardTitle>
        <div className="px-2.5 py-2">
          <Pill tone="brand">implemented once</Pill>
          <div className="mt-1.5 text-[8.5px] text-ink-soft">Owner · Head of IT</div>
        </div>
      </Card>

      {fws.map((f, i) => (
        <div
          key={f}
          className="absolute z-20 rounded-lg border border-brand-200 bg-white px-2 py-1 text-[9px] font-semibold text-ink shadow-sm"
          style={{
            left: "64%",
            top: `${12 + i * 17}%`,
            animation: `cv-pop .4s ${1000 + i * 130}ms cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          {f}
        </div>
      ))}

      <Stat label="Inherited by" value="5 frameworks" x="3%" y="70%" delay={1700} />
    </Scene>
  );
}

/* ================================================================== *
 * 11 · Risk, a risk moves from inherent to residual on the heatmap.
 * ================================================================== */
function RiskScene() {
  const cell = (r: number, c: number) => {
    const sev = r + c;
    return sev >= 6 ? "#fca5a5" : sev >= 4 ? "#fde68a" : "#a7f3d0";
  };
  return (
    <Scene>
      <Card x="5%" y="12%" w="46%" delay={0}>
        <CardTitle>Inherent vs residual</CardTitle>
        <div className="p-2.5">
          <div className="relative grid grid-cols-5 gap-[3px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className="h-[18px] rounded-[3px]"
                style={{
                  background: cell(4 - Math.floor(i / 5), i % 5),
                  opacity: 0.55,
                  animation: `cv-pop .3s ${100 + i * 14}ms ease-out both`,
                }}
              />
            ))}
            {/* The risk itself, settling from the red corner into amber. */}
            <span
              className="absolute h-[13px] w-[13px] rounded-full border-2 border-white bg-[#0b1220] shadow-md"
              style={{
                right: "2%",
                top: "2%",
                ["--tx" as string]: "-96px",
                ["--ty" as string]: "58px",
                animation: "cv-settle 1.5s 700ms cubic-bezier(.22,1,.36,1) forwards",
              }}
            />
          </div>
        </div>
      </Card>

      <Card x="50%" y="34%" w="46%" delay={800} front float>
        <CardTitle>R-20 · Segregation of duties</CardTitle>
        <div className="grid gap-1 p-2.5 text-[8.5px]">
          {[
            ["Owner", "Mark Allen"],
            ["Category", "Asset management"],
            ["Control", "Access reviews conducted"],
            ["Treatment", "Mitigate"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex items-center justify-between gap-2"
              style={{ animation: `cv-tick .35s ${1000 + i * 130}ms ease-out both` }}
            >
              <span className="text-ink-faint">{k}</span>
              <span className="truncate font-semibold text-ink">{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </Scene>
  );
}

/* ================================================================== *
 * 12 · Audit, evidence tiles fly into an assembling package.
 * ================================================================== */
function AuditScene() {
  return (
    <Scene>
      <Card x="4%" y="14%" w="40%" delay={0}>
        <CardTitle>Linked evidence</CardTitle>
        <div className="grid grid-cols-4 gap-1 p-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="h-[26px] rounded-[3px] border"
              style={{
                animation: `cv-highlight 1.4s ${300 + i * 110}ms cubic-bezier(.22,1,.36,1) forwards`,
                borderColor: "#e2e8f0",
                background: "#f8fafc",
              }}
            />
          ))}
        </div>
      </Card>

      <Card x="54%" y="26%" w="42%" delay={700} front float>
        <CardTitle>SOC 2 audit package</CardTitle>
        <div className="p-2.5">
          <div className="mb-1.5 h-[5px] overflow-hidden rounded-full bg-line-soft">
            <span
              className="block h-full rounded-full bg-brand"
              style={{ width: "87%", animation: "cv-grow 1.2s 900ms cubic-bezier(.22,1,.36,1) both" }}
            />
          </div>
          <div className="flex items-center justify-between text-[8.5px]">
            <span className="text-ink-soft">Assembled from existing links</span>
            <span className="font-mono font-semibold text-brand-ink">87%</span>
          </div>
        </div>
      </Card>

      <Stat label="Prep time" value="minutes" sub="not a quarter" x="6%" y="66%" delay={1500} />
    </Scene>
  );
}

/* ================================================================== *
 * 13 · ComplyChat, a question is answered from live tables.
 * ================================================================== */
function InsightScene() {
  return (
    <Scene>
      <Card x="6%" y="14%" w="62%" delay={0}>
        <CardTitle>ComplyChat</CardTitle>
        <div className="grid gap-1.5 p-2.5">
          <div
            className="ml-auto max-w-[80%] rounded-[10px_10px_3px_10px] bg-ink px-2 py-1.5 text-[9px] text-white"
            style={{ animation: "cv-pop .4s 300ms cubic-bezier(.22,1,.36,1) both" }}
          >
            Which controls block the Q3 SOC 2 audit?
          </div>
          <div
            className="max-w-[88%] rounded-[10px_10px_10px_3px] border border-line bg-[#f8fafc] px-2 py-1.5 text-[9px] text-ink-muted"
            style={{ animation: "cv-pop .4s 1100ms cubic-bezier(.22,1,.36,1) both" }}
          >
            3 controls lack evidence, CC6.1, CC6.8, CC7.2. Two can reuse ISO artifacts.
          </div>
        </div>
      </Card>

      <Card x="34%" y="60%" w="52%" delay={1500} front float>
        <div className="flex items-center gap-1.5 px-2.5 py-2">
          <Pill tone="brand">SQL-grounded</Pill>
          <span className="font-mono text-[8px] text-ink-soft">148ms</span>
          <span className="ml-auto text-[8.5px] font-semibold text-brand-deep">
            Jump to record
          </span>
        </div>
      </Card>

      <Stat label="Scope" value="Tenant-only" sub="your tables" x="6%" y="62%" delay={1800} />
    </Scene>
  );
}

/* ================================================================== */

const SCENES: Record<ModuleStory["proof"], () => React.JSX.Element> = {
  documents: GovernanceScene,
  committees: CommitteeScene,
  evidence: EvidenceScene,
  vendors: VendorScene,
  assets: AssetScene,
  vulnerabilities: VulnScene,
  workflow: WorkflowScene,
  connectors: ConnectorScene,
  assessments: AssessmentScene,
  controls: ControlScene,
  risk: RiskScene,
  audit: AuditScene,
  insights: InsightScene,
};

export default function ModuleScene({ story }: { story: ModuleStory }) {
  const S = SCENES[story.proof];
  return <S />;
}
