"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  FileCheck2,
  Network,
  Radar,
  Route,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  id: string;
  discipline: string;
  title: string;
  description: string;
  proofPoints: [string, string, string];
  previewTitle: string;
  tone: string;
  accent: string;
  Icon: LucideIcon;
  imageSrc?: string;
}

const featuresData: Feature[] = [
  {
    id: "govern",
    discipline: "Governance",
    title: "Govern every obligation",
    description:
      "Turn policies, standards, and regulatory duties into owned, approved work.",
    proofPoints: [
      "Framework-linked policies",
      "Review and approval lifecycles",
      "Owner, version, and status tracking",
    ],
    previewTitle: "Document lifecycle",
    tone: "#eef7ff",
    accent: "#0057ff",
    Icon: FileCheck2,
  },
  {
    id: "prove",
    discipline: "Evidence intelligence",
    title: "Prove every control",
    description:
      "Let AI read evidence, score its quality, and map it to the right controls before audit time.",
    proofPoints: [
      "OCR and AI quality assessment",
      "Suggested control mappings",
      "Reusable evidence across modules",
    ],
    previewTitle: "Evidence assessment",
    tone: "#d8ebfa",
    accent: "#0057ff",
    Icon: Radar,
  },
  {
    id: "risk",
    discipline: "Risk intelligence",
    title: "See risk in context",
    description:
      "Connect threats, controls, consequences, and business impact in one living risk view.",
    proofPoints: [
      "Bow-tie risk analysis",
      "Inherent and residual scoring",
      "Controls, causes, and consequences",
    ],
    previewTitle: "Connected risk view",
    tone: "#b9c9ff",
    accent: "#0057ff",
    Icon: Network,
  },
  {
    id: "prioritize",
    discipline: "Security posture",
    title: "Prioritize what matters",
    description:
      "Turn vulnerabilities and exposure into owned remediation work before risk becomes audit pain.",
    proofPoints: [
      "Severity and SLA tracking",
      "Risk-based prioritization",
      "Owned remediation workflows",
    ],
    previewTitle: "Vulnerability posture",
    tone: "#7da3ff",
    accent: "#000414",
    Icon: Route,
  },
  {
    id: "orchestrate",
    discipline: "Assurance orchestration",
    title: "Make assurance move",
    description:
      "Automate reviews, tasks, approvals, and answers across the complete GRC operating model.",
    proofPoints: [
      "Workflow and approval automation",
      "ComplyChat grounded in GRC data",
      "Connected tasks and audit trails",
    ],
    previewTitle: "Assurance workflow",
    tone: "#286ce0",
    accent: "#12d8ff",
    Icon: Bot,
  },
];

export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const next = Math.min(
      featuresData.length - 1,
      Math.max(0, Math.round(latest * (featuresData.length - 1))),
    );
    setActiveFeature((current) => (current === next ? current : next));
  });

  return (
    <section
      id="features"
      className="feature-story-section"
      aria-labelledby="features-heading"
    >
      <div className="feature-story-grid" aria-hidden="true" />
      <div className="feature-story-glow" aria-hidden="true" />

      <header className="feature-story-header">
        <p className="feature-story-eyebrow">The connected GRC platform</p>
        <h2 id="features-heading">One operating model. Nineteen connected modules.</h2>
        <p className="feature-story-intro">
          Govern, assure, manage risk, secure, and orchestrate every part of
          GRC in one connected platform.
        </p>
      </header>

      <div ref={trackRef} className="feature-story-track">
        <div className="feature-story-desktop">
          <div className="feature-story-copy-column">
            {featuresData.map((feature, index) => (
              <FeatureStory
                key={feature.id}
                feature={feature}
                showPlatformCta={index === featuresData.length - 1}
              />
            ))}
          </div>

          <div className="feature-story-stage-column">
            <div className="feature-story-stage">
              <div className="feature-story-stage-viewport">
                {featuresData.map((feature, index) => (
                  <FeatureStagePanel
                    key={feature.id}
                    feature={feature}
                    index={index}
                    progress={smoothProgress}
                    active={index === activeFeature}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="feature-story-mobile">
          {featuresData.map((feature, index) => (
            <article key={feature.id} className="feature-story-mobile-item">
              <StoryContent feature={feature} />
              {index === featuresData.length - 1 ? (
                <FeatureCta className="feature-story-cta is-mobile" />
              ) : null}
              <FeaturePreview feature={feature} compact />
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}

function FeatureCta({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p>See the complete platform map</p>
      <a href="/landing-2/platform.html" className="feature-story-cta-link">
        Explore all 19 modules
        <ArrowUpRight
          className="feature-story-cta-arrow"
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

function FeatureStagePanel({
  feature,
  index,
  progress,
  active,
}: {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const step = 1 / (featuresData.length - 1);
  const center = index * step;
  const opacity = useTransform(progress, (latest) => {
    const distance = Math.abs(latest - center);
    return Math.max(0, Math.min(1, 1 - distance / step));
  });
  const scale = useTransform(opacity, [0, 0.5, 1], [0.9, 0.95, 1]);

  return (
    <motion.div
      style={
        reduceMotion
          ? { opacity: active ? 1 : 0, scale: 1, zIndex: active ? 2 : 1 }
          : { opacity, scale, zIndex: active ? 2 : 1 }
      }
      className="feature-story-stage-panel"
      aria-hidden={!active}
    >
      <FeaturePreview feature={feature} />
    </motion.div>
  );
}

function FeatureStory({
  feature,
  showPlatformCta = false,
}: {
  feature: Feature;
  showPlatformCta?: boolean;
}) {
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start 86%", "end 14%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.38, 0.62, 0.82, 1],
    [0.08, 0.42, 1, 1, 0.42, 0.08],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.96, 0.985, 1, 0.985, 0.96],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [32, 12, 0, -12, -32],
  );

  return (
    <article ref={storyRef} className="feature-story-copy">
      <motion.div
        style={reduceMotion ? undefined : { opacity, scale, y }}
        className="feature-story-copy-inner"
      >
        <StoryContent feature={feature} ctaFollows={showPlatformCta} />
        {showPlatformCta ? <FeatureCta className="feature-story-cta is-desktop" /> : null}
      </motion.div>
    </article>
  );
}

function StoryContent({
  feature,
  ctaFollows = false,
}: {
  feature: Feature;
  ctaFollows?: boolean;
}) {
  return (
    <>
      <p className="feature-story-label">{feature.discipline}</p>
      <h3>{feature.title}</h3>
      <p className="feature-story-description">{feature.description}</p>
      <ul className={`feature-story-proof${ctaFollows ? " feature-story-proof--with-cta" : ""}`}>
        {feature.proofPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </>
  );
}

function FeaturePreview({
  feature,
  compact = false,
}: {
  feature: Feature;
  compact?: boolean;
}) {
  const Icon = feature.Icon;
  const style = {
    "--feature-tone": feature.tone,
    "--feature-accent": feature.accent,
  } as CSSProperties;

  return (
    <div
      className={`feature-preview-shell${compact ? " is-compact" : ""}`}
      style={style}
    >
      <div className="feature-preview-map" aria-hidden="true" />
      <div className="feature-preview-browser">
        <div className="feature-preview-chrome" aria-hidden="true">
          <span />
          <span />
          <span />
          <div>app.complyverse.ai</div>
        </div>

        <div className="feature-preview-screen">
          {feature.imageSrc ? (
            <Image
              src={feature.imageSrc}
              alt={`${feature.title} product screen`}
              fill
              sizes="(max-width: 1023px) 92vw, 52vw"
              className="object-cover object-left-top"
            />
          ) : (
            <div className="feature-preview-placeholder" aria-hidden="true">
              <div className="feature-preview-toolbar">
                <div className="feature-preview-mark">
                  <Icon size={18} strokeWidth={1.7} />
                </div>
                <div>
                  <span>{feature.discipline}</span>
                  <strong>{feature.previewTitle}</strong>
                </div>
                <i>Live</i>
              </div>

              <div className="feature-preview-metrics">
                {feature.proofPoints.map((point, index) => (
                  <div key={point}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{point}</strong>
                  </div>
                ))}
              </div>

              <div className="feature-preview-table">
                <div>
                  <span />
                  <span />
                  <span />
                </div>
                {[0, 1, 2, 3].map((row) => (
                  <div key={row}>
                    <span />
                    <span />
                    <span />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
