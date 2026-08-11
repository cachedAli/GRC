"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BookOpenCheck,
  Check,
  FileCheck2,
  FileText,
  Pause,
  Play,
  Radar,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import Magnet from "@/components/ui/Magnet";
import TiltedSurface from "@/components/ui/TiltedSurface";

type Point = { x: number; y: number };

type Signal = {
  name: string;
  detail: string;
  record: string;
  processing: string;
  outcome: number;
  icon: LucideIcon;
};

const signals: Signal[] = [
  {
    name: "Policy change",
    detail: "A requirement changed",
    record: "POL-3.2",
    processing: "Requirement structured",
    outcome: 0,
    icon: FileText,
  },
  {
    name: "Framework obligation",
    detail: "A control must be proven",
    record: "ISO-A.5.15",
    processing: "Control and evidence mapped",
    outcome: 1,
    icon: BookOpenCheck,
  },
  {
    name: "Approved evidence",
    detail: "Proof has new validity",
    record: "EVD-1048",
    processing: "Coverage recalculated",
    outcome: 1,
    icon: FileCheck2,
  },
  {
    name: "Risk signal",
    detail: "A threshold was breached",
    record: "RSK-031",
    processing: "Affected control identified",
    outcome: 2,
    icon: Activity,
  },
  {
    name: "Vulnerability finding",
    detail: "Exposure needs remediation",
    record: "FND-208",
    processing: "Owner and retest connected",
    outcome: 2,
    icon: ShieldAlert,
  },
];

const outcomes = [
  { name: "Human approval", detail: "An authorized person decides", icon: Check },
  { name: "Live coverage", detail: "Assurance views update", icon: Radar },
  { name: "Owned action", detail: "An owner receives the next step", icon: Activity },
];

const desktop = {
  width: 1200,
  height: 590,
  sources: [
    { x: 360, y: 82 },
    { x: 600, y: 82 },
    { x: 840, y: 82 },
    { x: 155, y: 250 },
    { x: 155, y: 375 },
  ],
  core: { x: 600, y: 292 },
  outcomes: [
    { x: 980, y: 195 },
    { x: 1040, y: 305 },
    { x: 980, y: 415 },
  ],
  audit: { x: 600, y: 520 },
};

const compact = {
  width: 360,
  height: 880,
  sources: [
    { x: 72, y: 80 },
    { x: 180, y: 80 },
    { x: 288, y: 80 },
    { x: 116, y: 175 },
    { x: 244, y: 175 },
  ],
  core: { x: 180, y: 380 },
  outcomes: [
    { x: 65, y: 610 },
    { x: 180, y: 610 },
    { x: 295, y: 610 },
  ],
  audit: { x: 180, y: 790 },
};

function toPosition(point: Point, width: number, height: number) {
  return { left: `${(point.x / width) * 100}%`, top: `${(point.y / height) * 100}%` };
}

function curve(start: Point, end: Point, compactMode: boolean) {
  if (compactMode) {
    const middle = (start.y + end.y) / 2;
    return `M${start.x} ${start.y} C${start.x} ${middle} ${end.x} ${middle} ${end.x} ${end.y}`;
  }
  const middle = (start.x + end.x) / 2;
  return `M${start.x} ${start.y} C${middle} ${start.y} ${middle} ${end.y} ${end.x} ${end.y}`;
}

export default function ConnectedAssurance() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [activeSignal, setActiveSignal] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [locked, setLocked] = useState(false);

  const geometry = compactMode ? compact : desktop;
  const signal = signals[activeSignal];
  const activeOutcome = signal.outcome;
  const packetDestination = phase === 0
    ? geometry.sources[activeSignal]
    : phase === 1
      ? geometry.core
      : phase === 2
        ? geometry.outcomes[activeOutcome]
        : geometry.audit;

  const sourcePaths = geometry.sources.map((point) => curve(point, geometry.core, compactMode));
  const outcomePaths = geometry.outcomes.map((point) => curve(geometry.core, point, compactMode));
  const auditPaths = geometry.outcomes.map((point) => curve(point, geometry.audit, compactMode));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 960px)");
    const update = () => setCompactMode(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !playing || prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      if (phase < 3) {
        setPhase((value) => value + 1);
        return;
      }
      if (locked) {
        setPlaying(false);
        return;
      }
      setActiveSignal((value) => (value + 1) % signals.length);
      setPhase(0);
    }, phase === 3 ? 1600 : 1150);
    return () => window.clearTimeout(timer);
  }, [locked, phase, playing, prefersReducedMotion, visible]);

  useEffect(() => {
    if (prefersReducedMotion) setPhase(3);
  }, [prefersReducedMotion]);

  const selectSignal = (index: number, shouldLock: boolean) => {
    setActiveSignal(index);
    setPhase(0);
    setLocked(shouldLock);
    setPlaying(true);
  };

  const togglePlayback = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setLocked(false);
    setPlaying(true);
    if (phase === 3) setPhase(0);
  };

  const sourcePathClass = (index: number) => {
    if (index !== activeSignal) return "";
    return phase === 0 ? " is-current" : " is-traversed";
  };

  const outcomePathClass = (index: number) => {
    if (index !== activeOutcome || phase < 1) return "";
    return phase === 2 ? " is-current" : phase > 2 ? " is-traversed" : "";
  };

  return (
    <section ref={sectionRef} className="assurance-bridge" aria-labelledby="assurance-bridge-heading">
      <div className="assurance-bridge-panel">
        <div className="assurance-bridge-grid" aria-hidden="true" />
        <div className="assurance-bridge-glow" aria-hidden="true" />

        <AnimatedContent distance={18} duration={0.5} threshold={0.2}>
          <header className="assurance-bridge-intro">
            <p>Connected assurance</p>
            <h2 id="assurance-bridge-heading">Every signal connects to a governed outcome.</h2>
            <div>Choose a source to see how CompliVerse preserves its context, connects the affected records, and carries it to the person or assurance view that needs to change.</div>
          </header>
        </AnimatedContent>

        <AnimatedContent className="assurance-map-shell" distance={16} scale={0.99} delay={0.12} threshold={0.12}>
          <div className="assurance-map-toolbar">
            <div><span className="assurance-live-dot" aria-hidden="true" /> {locked ? "Selected route" : "Live connection map"}</div>
            <strong aria-live="polite">{signal.name} → {outcomes[activeOutcome].name}</strong>
            <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause connection map" : "Play all connection routes"}>
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              {playing ? "Pause" : "Play all"}
            </button>
          </div>

          <div className="assurance-map" style={{ aspectRatio: `${geometry.width} / ${geometry.height}` }}>
            <span className="assurance-map-label assurance-map-label-sources">Signals</span>
            <span className="assurance-map-label assurance-map-label-outcomes">Governed outcomes</span>

            <svg className="assurance-map-lines" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" aria-hidden="true">
              {[...sourcePaths, ...outcomePaths, ...auditPaths].map((path, index) => (
                <path key={`blur-${index}`} className="assurance-map-path-blur" d={path} />
              ))}
              {sourcePaths.map((path, index) => <path key={`source-${index}`} className={`assurance-map-path${sourcePathClass(index)}`} d={path} />)}
              {outcomePaths.map((path, index) => <path key={`outcome-${index}`} className={`assurance-map-path${outcomePathClass(index)}`} d={path} />)}
              {auditPaths.map((path, index) => (
                <path
                  key={`audit-${index}`}
                  className={`assurance-map-path${index === activeOutcome && phase === 3 ? " is-current" : ""}`}
                  d={path}
                />
              ))}
            </svg>

            {signals.map((item, index) => {
              const Icon = item.icon;
              const selected = index === activeSignal;
              return (
                <Magnet
                  key={item.name}
                  className={`assurance-map-source${selected ? " is-selected" : ""}`}
                  innerClassName="assurance-map-source-magnet"
                  padding={42}
                  strength={10}
                  style={toPosition(geometry.sources[index], geometry.width, geometry.height)}
                >
                  <motion.button
                    type="button"
                    onPointerEnter={() => !locked && !compactMode && selectSignal(index, false)}
                    onClick={() => selectSignal(index, true)}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    aria-pressed={selected}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                  </motion.button>
                </Magnet>
              );
            })}

            <div className={`assurance-map-core${phase === 1 ? " is-active" : ""}`} style={toPosition(geometry.core, geometry.width, geometry.height)}>
              <TiltedSurface className="assurance-map-core-surface" rotateAmplitude={6} scaleOnHover={1.025}>
                <div className="assurance-map-core-head"><span>CompliVerse</span><i aria-hidden="true" /></div>
                <strong>Connected assurance graph</strong>
                <p>{signal.processing}</p>
                <div><span>Source retained</span><span>Owner resolved</span><span>History attached</span></div>
              </TiltedSurface>
            </div>

            {outcomes.map((item, index) => {
              const Icon = item.icon;
              const selected = index === activeOutcome && phase >= 2;
              return (
                <article
                  key={item.name}
                  className={`assurance-map-outcome${selected ? " is-selected" : ""}`}
                  style={toPosition(geometry.outcomes[index], geometry.width, geometry.height)}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                </article>
              );
            })}

            <div className={`assurance-map-audit${phase === 3 ? " is-active" : ""}`} style={toPosition(geometry.audit, geometry.width, geometry.height)}>
              <FileCheck2 size={17} aria-hidden="true" />
              <span><small>Audit history</small><strong>Source, decision, owner, and time retained</strong></span>
              <em>{signal.record}</em>
            </div>

            <motion.div
              className="assurance-map-packet"
              animate={toPosition(packetDestination, geometry.width, geometry.height)}
              initial={false}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20, mass: 0.72 }}
              aria-hidden="true"
            >
              <span>CV</span><strong>{signal.record}</strong>
            </motion.div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
