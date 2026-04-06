"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Banknote,
  ShieldCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type Domain = "finance" | "risk" | "sustainability";

interface Framework {
  short: string;
  full: string;
  domain: Domain;
}

interface PositionedFramework extends Framework {
  x: number;
  y: number;
}

const frameworks: Framework[] = [
  {
    short: "SWIFT CSCF",
    full: "SWIFT Customer Security Controls Framework",
    domain: "finance",
  },
  {
    short: "ARAMCO CCC",
    full: "ARAMCO Cybersecurity Compliance",
    domain: "risk",
  },
  {
    short: "ISO 27001",
    full: "ISO/IEC 27001:2022",
    domain: "sustainability",
  },
  {
    short: "PCI DSS",
    full: "PCI Data Security Standard",
    domain: "finance",
  },
  {
    short: "SBP Cloud",
    full: "SBP Cloud Outsourcing Framework",
    domain: "finance",
  },
  {
    short: "SBP Banking",
    full: "SBP Internet Banking Framework",
    domain: "finance",
  },
  {
    short: "Tech Risk (FS)",
    full: "Technology Risk Instructions for Financial Services Operators",
    domain: "risk",
  },
  {
    short: "CBUAE Art. 13",
    full: "Article (13) Technology Risk and Information Security _ CBUAE Rulebook-1",
    domain: "risk",
  },
  {
    short: "SBP ETGRMF",
    full: "SBP ETGRMF",
    domain: "risk",
  },
  {
    short: "Tech Risks Banks",
    full: "Technology Risks Regulation Banks",
    domain: "risk",
  },
  {
    short: "Cloud Computing",
    full: "Cloud Computing Regulation",
    domain: "risk",
  },
  {
    short: "SOX ITGC",
    full: "SOX IT General Controls",
    domain: "finance",
  },
  {
    short: "SOC 2",
    full: "SOC 2 Type II",
    domain: "finance",
  },
  {
    short: "Sri Lanka BSS",
    full: "Sri Lanka Baseline Security Standard (BSS)",
    domain: "sustainability",
  },
  {
    short: "SAMA CSF",
    full: "SAMA Cyber Security Framework",
    domain: "risk",
  },
  {
    short: "SABIC Cyber",
    full: "SABIC CyberTrust Guidelines",
    domain: "sustainability",
  },
  {
    short: "NIST CSF",
    full: "NIST Cybersecurity Framework",
    domain: "sustainability",
  },
  {
    short: "NIST 800-53",
    full: "NIST SP 800-53 Rev 5",
    domain: "sustainability",
  },
  {
    short: "NIS2",
    full: "NIS2 Directive",
    domain: "sustainability",
  },
  {
    short: "MAS TRM",
    full: "MAS Technology Risk Management Guidelines",
    domain: "risk",
  },
  {
    short: "ISO 22301",
    full: "ISO 22301:2019 Business Continuity Management System",
    domain: "finance",
  },
  {
    short: "HIPAA",
    full: "HIPAA Security & Privacy Rule",
    domain: "sustainability",
  },
  {
    short: "GDPR",
    full: "General Data Protection Regulation",
    domain: "sustainability",
  },
  {
    short: "DORA",
    full: "Digital Operational Resilience Act (DORA)",
    domain: "risk",
  },
  {
    short: "COBIT 2019",
    full: "COBIT 2019",
    domain: "finance",
  },
];

const domainMeta: Record<
  Domain,
  {
    label: string;
    color: string;
    border: string;
    glow: string;
    icon: LucideIcon;
    summary: string;
  }
> = {
  finance: {
    label: "Finance & Controls",
    color: "#065F46",
    border: "rgba(6,95,70,0.22)",
    glow: "rgba(6,95,70,0.30)",
    icon: Banknote,
    summary:
      "Track financial controls, evidence, and owners for audit readiness.",
  },
  risk: {
    label: "Technology Risk",
    color: "#10B981",
    border: "rgba(16,185,129,0.25)",
    glow: "rgba(16,185,129,0.34)",
    icon: Activity,
    summary: "See tech-risk gaps, remediation, and ownership before they slip.",
  },
  sustainability: {
    label: "Trust & Resilience",
    color: "#14B8A6",
    border: "rgba(20,184,166,0.25)",
    glow: "rgba(20,184,166,0.35)",
    icon: ShieldCheck,
    summary:
      "Keep privacy, resilience, and cyber obligations traceable from one screen.",
  },
};

const sectorAngles: Record<Domain, { start: number; end: number }> = {
  risk: { start: -92, end: 28 },
  sustainability: { start: 28, end: 148 },
  finance: { start: 148, end: 268 },
};

const domainOrder: Domain[] = ["risk", "sustainability", "finance"];
const DESKTOP_MIN_DIAMETER = 640;

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [diameter, setDiameter] = useState(760);
  const [focusDomain, setFocusDomain] = useState<Domain | "all">("all");
  const [hoveredShort, setHoveredShort] = useState<string | null>(null);
  const [pinnedShort, setPinnedShort] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 24,
    mass: 0.7,
  });

  const ringRotate = useTransform(scrollSmooth, [0, 1], [-56, 56]);
  const ringOpacity = useTransform(
    scrollSmooth,
    [0, 0.18, 0.86, 1],
    [0.26, 0.62, 0.62, 0.32],
  );
  const progressFill = useTransform(scrollSmooth, [0, 1], [0.05, 1]);

  const groups = useMemo(
    () => ({
      finance: frameworks.filter((item) => item.domain === "finance"),
      risk: frameworks.filter((item) => item.domain === "risk"),
      sustainability: frameworks.filter(
        (item) => item.domain === "sustainability",
      ),
    }),
    [],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const update = () => {
      const width = stage.clientWidth;
      if (width > 0) {
        setDiameter(Math.max(width, DESKTOP_MIN_DIAMETER));
      }
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0) {
        setDiameter(Math.max(entry.contentRect.width, DESKTOP_MIN_DIAMETER));
      }
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const visiblePool = useMemo(
    () =>
      focusDomain === "all"
        ? frameworks
        : frameworks.filter((item) => item.domain === focusDomain),
    [focusDomain],
  );

  useEffect(() => {
    if (
      pinnedShort &&
      !visiblePool.some((item) => item.short === pinnedShort)
    ) {
      setPinnedShort(null);
    }

    if (
      hoveredShort &&
      !visiblePool.some((item) => item.short === hoveredShort)
    ) {
      setHoveredShort(null);
    }
  }, [visiblePool, pinnedShort, hoveredShort]);

  const selectedShort = pinnedShort;
  const selectedFramework = selectedShort
    ? (frameworks.find((item) => item.short === selectedShort) ?? null)
    : null;

  const selectedMeta = selectedFramework
    ? domainMeta[selectedFramework.domain]
    : null;

  const positionedNodes = useMemo(() => {
    const center = diameter / 2;
    const radii = [
      diameter * 0.45,
      diameter * 0.4,
      diameter * 0.35,
      diameter * 0.3,
    ];
    const lanePattern = [0, 2, 1, 3];
    const result: PositionedFramework[] = [];

    domainOrder.forEach((domain) => {
      const items = groups[domain];
      const { start, end } = sectorAngles[domain];

      // Keep nodes away from sector boundaries and alternate lanes for spacing.
      const sweep = end - start - 24;
      const offset = start + 12;

      items.forEach((item, index) => {
        const ratio = items.length === 1 ? 0.5 : index / (items.length - 1);
        const lane = lanePattern[index % lanePattern.length];
        const laneCycle = Math.floor(index / lanePattern.length);
        const radius = radii[(lane + laneCycle) % radii.length];
        const jitter = (index % 2 === 0 ? -1 : 1) * 1.5;
        const angle = offset + ratio * sweep + jitter;
        const radians = (angle * Math.PI) / 180;

        const node = {
          ...item,
          x: center + Math.cos(radians) * radius,
          y: center + Math.sin(radians) * radius,
        };

        // Keep desktop pills clear from the bottom map badge area.
        if (
          node.y > diameter * 0.79 &&
          Math.abs(node.x - center) < diameter * 0.22
        ) {
          const direction = node.x >= center ? 1 : -1;
          node.x += direction * diameter * 0.07;
          node.y -= diameter * 0.035;
        }

        result.push(node);
      });
    });

    return result;
  }, [diameter, groups]);

  const center = diameter / 2;
  const selectedNode = positionedNodes.find(
    (node) => node.short === selectedShort,
  );

  const connector = useMemo(() => {
    if (!selectedNode) {
      return null;
    }

    const dx = selectedNode.x - center;
    const dy = selectedNode.y - center;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const length = Math.max(Math.sqrt(dx * dx + dy * dy) - diameter * 0.205, 0);

    return { angle, length };
  }, [selectedNode, center, diameter]);

  const compact = diameter < 560;

  return (
    <section
      ref={sectionRef}
      id="frameworks"
      className="relative overflow-hidden py-22 md:py-28"
    >
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-linear-to-b from-green/6 via-teal/8 to-bg-mint/70" />
      <div className="absolute -left-16 top-18 h-64 w-64 rounded-full bg-teal/14 blur-3xl" />
      <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-green/14 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-green-dark">
            Framework Coverage
          </p> */}
          <h2 className="text-4xl font-semibold text-gray-900 font-poppins mt-3 leading-tight">
            What each framework needs
            <br className="hidden sm:block" />
            from your team
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto text-gray-600 mt-4">
            Select a domain or framework to see the controls, evidence, owners,
            and gaps.
          </p>

          <motion.div
            aria-hidden="true"
            className="mx-auto mt-7 h-1.5 w-60 overflow-hidden rounded-full bg-teal-900/10"
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                scaleX: progressFill,
                transformOrigin: "0% 50%",
                background: "linear-gradient(90deg, #14B8A6, #10B981, #065F46)",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:items-center md:justify-center md:overflow-visible md:pb-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <FilterChip
            label={`All (${frameworks.length})`}
            active={focusDomain === "all"}
            color="#065F46"
            onClick={() => setFocusDomain("all")}
          />
          {(Object.keys(domainMeta) as Domain[]).map((domain) => (
            <FilterChip
              key={domain}
              label={`${domainMeta[domain].label} (${groups[domain].length})`}
              active={focusDomain === domain}
              color="#065F46"
              activeColor={domainMeta[domain].color}
              onClick={() => setFocusDomain(domain)}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-8 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_-24px_rgba(6,95,70,0.35)]">
            <div
              className="absolute inset-x-0 top-0 h-24"
              style={{
                background: selectedMeta
                  ? `linear-gradient(180deg, ${selectedMeta.glow}, transparent)`
                  : "linear-gradient(180deg, rgba(6,95,70,0.25), transparent)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-2">
                {selectedFramework && selectedMeta ? (
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                    style={{
                      color: selectedMeta.color,
                      borderColor: selectedMeta.border,
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <selectedMeta.icon className="h-3.5 w-3.5" />
                    <span>{selectedMeta.label}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-green-900/20 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-green-dark">
                    <Waypoints className="h-3.5 w-3.5" />
                    <span>All Frameworks</span>
                  </div>
                )}

                {selectedFramework ? (
                  <button
                    type="button"
                    onClick={() => setPinnedShort(null)}
                    className="rounded-full border border-green-900/20 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600"
                  >
                    Clear
                  </button>
                ) : (
                  <p className="pt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Overview
                  </p>
                )}
              </div>

              <h3 className="mt-4 font-poppins text-lg font-semibold leading-tight text-[#052E16]">
                {selectedFramework
                  ? selectedFramework.full
                  : "Select a framework to see controls, evidence, owners, and gaps"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {selectedFramework && selectedMeta
                  ? selectedMeta.summary
                  : "Start with a domain, then tap a framework to see the requirement."}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/80 bg-white/75 p-3 shadow-[0_14px_34px_-24px_rgba(6,95,70,0.32)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Tap to inspect frameworks
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {visiblePool.map((item) => {
                const meta = domainMeta[item.domain];
                const active = item.short === pinnedShort;

                return (
                  <button
                    key={item.short}
                    type="button"
                    onClick={() => {
                      setPinnedShort((current) =>
                        current === item.short ? null : item.short,
                      );
                    }}
                    className="rounded-2xl border bg-white/95 px-2.5 py-2 text-left shadow-[0_8px_16px_-14px_rgba(6,95,70,0.35)] transition-all"
                    style={{
                      borderColor: active
                        ? meta.color
                        : "rgba(107,114,128,0.24)",
                      boxShadow: active
                        ? `0 12px 22px -16px ${meta.glow}`
                        : "0 8px 16px -14px rgba(6,95,70,0.3)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="font-body text-[11px] font-semibold text-slate-700">
                        {item.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 hidden md:block"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto w-full max-w-215">
            <div ref={stageRef} className="relative aspect-square w-full">
              <motion.div
                aria-hidden="true"
                className="absolute inset-[7.5%] rounded-full opacity-60"
                style={{
                  rotate: ringRotate,
                  opacity: ringOpacity,
                  background:
                    "conic-gradient(from -90deg, rgba(16,185,129,0.45) 0deg 120deg, rgba(20,184,166,0.4) 120deg 240deg, rgba(6,95,70,0.38) 240deg 360deg)",
                  maskImage:
                    "radial-gradient(circle, transparent 43%, black 44%, black 68%, transparent 69%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, transparent 43%, black 44%, black 68%, transparent 69%)",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute inset-[7.5%] rounded-full border border-white/35"
              />

              <div className="absolute inset-[14%] rounded-full border border-white/80 bg-white/65 shadow-[0_12px_40px_-28px_rgba(6,95,70,0.45)] backdrop-blur-sm" />

              {/* Visible Orbital Tracks matching radii (45%, 37%, 29%) */}
              <div className="absolute inset-[5%] rounded-full border-2 border-teal-900/4 pointer-events-none" />
              <div className="absolute inset-[13%] rounded-full border-2 border-teal-900/6 pointer-events-none" />
              <div className="absolute inset-[21%] rounded-full border-2 border-teal-900/8 pointer-events-none" />

              {connector && (
                <motion.div
                  key={selectedShort}
                  initial={{ width: 0, opacity: 0.2 }}
                  animate={{ width: connector.length, opacity: 0.95 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-1/2 z-20 h-0.5 origin-left rounded-full"
                  style={{
                    transform: `translateY(-50%) rotate(${connector.angle}deg)`,
                    background: `linear-gradient(90deg, ${selectedMeta?.color ?? "#065F46"}, transparent)`,
                  }}
                />
              )}

              <div className="absolute left-1/2 top-1/2 z-30 h-[44%] w-[44%] min-h-55 min-w-55 max-h-82 max-w-82 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-4xl border border-white/90 bg-white/88 p-5 shadow-[0_24px_75px_-34px_rgba(6,95,70,0.45)] sm:p-6">
                <div
                  className="absolute inset-0"
                  style={{
                    background: selectedMeta
                      ? `radial-gradient(circle at 0% 0%, ${selectedMeta.glow}, transparent 62%)`
                      : "radial-gradient(circle at 0% 0%, rgba(6,95,70,0.28), transparent 62%)",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedShort ?? "overview"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex h-full flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      {selectedFramework && selectedMeta ? (
                        <div
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
                          style={{
                            color: selectedMeta.color,
                            borderColor: selectedMeta.border,
                            backgroundColor: "rgba(255,255,255,0.85)",
                          }}
                        >
                          <selectedMeta.icon className="h-3.5 w-3.5" />
                          <span>{selectedMeta.label}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-green-900/20 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-green-dark">
                          <Waypoints className="h-3.5 w-3.5" />
                          <span>All Frameworks</span>
                        </div>
                      )}
                      <p className="pt-1 text-[11px] font-medium text-slate-500">
                        {pinnedShort ? "Pinned" : "Overview"}
                      </p>
                    </div>

                    <h3 className="mt-4 font-poppins text-xl font-semibold leading-tight text-[#052E16] sm:text-2xl">
                      {selectedFramework
                        ? selectedFramework.full
                        : "Select a framework to see controls, evidence, owners, and gaps"}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                      {selectedFramework && selectedMeta
                        ? selectedMeta.summary
                        : "Start with a domain, then tap a framework to see the requirement."}
                    </p>

                    <div className="mt-auto rounded-2xl border border-green-100 bg-bg-mint/90 p-3">
                      {selectedFramework ? (
                        <p className="text-xs font-medium text-slate-600">
                          Tap the same framework again to clear it.
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-slate-600">
                          {`Finance (${groups.finance.length}) | Technology Risk (${groups.risk.length}) | Trust & Resilience (${groups.sustainability.length})`}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {positionedNodes.map((node) => {
                const meta = domainMeta[node.domain];
                const active =
                  node.short === pinnedShort || node.short === hoveredShort;
                const muted =
                  focusDomain !== "all" && node.domain !== focusDomain;

                return (
                  <motion.button
                    key={node.short}
                    type="button"
                    onMouseEnter={() => {
                      setHoveredShort(node.short);
                    }}
                    onMouseLeave={() => setHoveredShort(null)}
                    onFocus={() => {
                      setHoveredShort(node.short);
                    }}
                    onBlur={() => setHoveredShort(null)}
                    onClick={() => {
                      setPinnedShort((current) =>
                        current === node.short ? null : node.short,
                      );
                    }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{
                      opacity: muted ? 0.23 : 1,
                      scale: active ? 1.05 : 1,
                    }}
                    viewport={{ once: true, amount: 0.45 }}
                    whileHover={muted ? {} : { y: -2, scale: 1.06 }}
                    animate={{
                      opacity: muted ? 0.23 : 1,
                      scale: active ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-40 whitespace-nowrap -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white/96 px-2.5 py-1.5 text-left shadow-[0_8px_20px_-14px_rgba(6,95,70,0.35)] backdrop-blur-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-3.5 sm:py-2"
                    style={{
                      left: node.x,
                      top: node.y,
                      borderColor: active
                        ? meta.color
                        : "rgba(107,114,128,0.25)",
                      boxShadow: active
                        ? `0 12px 28px -16px ${meta.glow}`
                        : "0 8px 18px -14px rgba(6,95,70,0.32)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span
                        className={`font-body font-semibold tracking-[0.01em] text-slate-700 ${
                          compact ? "text-[9px]" : "text-[11px] sm:text-xs"
                        }`}
                      >
                        {node.short}
                      </span>
                    </span>
                  </motion.button>
                );
              })}

              <div className="pointer-events-none absolute bottom-[3.8%] left-1/2 z-20 -translate-x-1/2 rounded-full border border-green-200/80 bg-white/85 px-4 py-2 text-center shadow-sm backdrop-blur-sm">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-green-dark sm:text-xs">
                  <Waypoints className="h-3.5 w-3.5" />
                  Framework map
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  color,
  activeColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
  activeColor?: string;
}) {
  const selectedColor = activeColor ?? color;

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold font-body transition-all md:px-5"
      style={{
        color: active ? "#ffffff" : color,
        borderColor: active ? selectedColor : "rgba(107,114,128,0.3)",
        backgroundColor: active ? selectedColor : "rgba(255,255,255,0.82)",
      }}
    >
      {label}
    </button>
  );
}
