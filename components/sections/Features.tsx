"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Target,
  CheckSquare,
  FileText,
  ClipboardList,
  Bot,
  ShieldAlert,
  Package,
  Zap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  screenshot?: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Target size={22} strokeWidth={1.4} />,
    title: "Enterprise Risk Management",
    body: "Full risk lifecycle — register, assess, treat, monitor, review. Bow-tie analysis, scenario modeling, KRI monitoring, RCSA campaigns, and AI-generated risk narratives with confidence scoring.",
    screenshot: "/screenshots/slide_22.png",
  },
  {
    id: 2,
    icon: <CheckSquare size={22} strokeWidth={1.4} />,
    title: "Compliance Automation",
    body: "25+ pre-built frameworks with guided certification journeys. Control-level assessments, evidence collection, and approval workflows — all in one place.",
  },
  {
    id: 3,
    icon: <FileText size={22} strokeWidth={1.4} />,
    title: "Governance & Policy",
    body: "Full document lifecycle with multi-step approvals, committee management, regulatory change tracking, and policy exception handling.",
  },
  {
    id: 4,
    icon: <ClipboardList size={22} strokeWidth={1.4} />,
    title: "Internal Audit",
    body: "Audit universe, planning, engagements, findings, CCM, test scripts, skills matrix, capacity planning, and QAIP — end to end.",
  },
  {
    id: 5,
    icon: <Bot size={22} strokeWidth={1.4} />,
    title: "AI That Actually Works",
    body: "Evidence assessment with clause-level mapping. Cross-framework control similarity. Natural language queries against your live GRC data. Risk narratives with confidence scores. Gap analysis with priority recommendations.",
    screenshot: "/screenshots/slide_75.png",
  },
  {
    id: 6,
    icon: <ShieldAlert size={22} strokeWidth={1.4} />,
    title: "Vulnerability Management",
    body: "Register, triage, remediate, retest. SLA enforcement by severity, department views, escalation engine, and AI-powered analysis.",
  },
  {
    id: 7,
    icon: <Package size={22} strokeWidth={1.4} />,
    title: "Evidence Management",
    body: "AI-powered assessment scoring. OCR extraction. Audit packages with legal hold. Clause-level control mapping with auditor-defensible output.",
  },
  {
    id: 8,
    icon: <Zap size={22} strokeWidth={1.4} />,
    title: "Workflow Automation",
    body: "Visual drag-and-drop workflow builder. Event triggers, scheduled execution, approval steps, email notifications, and AI assistance.",
  },
];

export default function Features() {
  const [activeId, setActiveId] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const activeFeature = features.find((f) => f.id === activeId)!;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const idx = Math.min(
      Math.floor(latest * features.length),
      features.length - 1,
    );
    setActiveId(idx + 1);
  });

  return (
    <>
      {/* Header scrolls away naturally — NOT inside the sticky panel */}
      <section
        id="features"
        className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-10 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs text-[#2020CC] font-semibold uppercase tracking-wide mb-4">
            Features
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] max-w-[600px] leading-tight">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="font-body text-base text-[#6B7280] mt-4 max-w-lg">
            A unified platform that replaces your entire GRC tool stack — with
            AI woven into every workflow.
          </p>
        </div>
      </section>

      {/* Scroll-driven sticky panel — exactly one viewport tall */}
      <div ref={containerRef} className="min-h-0 md:min-h-[480vh]">
        <div className="bg-white md:sticky md:top-0 md:h-screen overflow-hidden flex items-center">
          <div className="w-full px-4 sm:px-6 py-8 md:py-0">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 h-auto md:h-[calc(100vh-3rem)]">
                {/* Left: scroll-driven list */}
                <div className="flex flex-col gap-1.5 justify-center overflow-hidden mb-2 md:mb-0">
                  {features.map((f) => {
                    const isPast = f.id < activeId;
                    const isActive = f.id === activeId;
                    return (
                      <motion.button
                        key={f.id}
                        type="button"
                        onClick={() => setActiveId(f.id)}
                        aria-pressed={isActive}
                        animate={{
                          opacity: isPast ? 0.35 : isActive ? 1 : 0.7,
                          y: isPast ? -4 : 0,
                          scale: isPast ? 0.98 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1] as [
                            number,
                            number,
                            number,
                            number,
                          ],
                        }}
                        className={`w-full text-left px-4 sm:px-5 py-3 rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer ${
                          isActive
                            ? "bg-[#2020CC]"
                            : "bg-transparent border border-[#E2E2DA]"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#EEF0FF] text-[#2020CC]"
                          }`}
                        >
                          {f.icon}
                        </div>
                        <span
                          className={`font-body font-semibold text-sm flex-1 ${
                            isActive
                              ? "text-white"
                              : isPast
                                ? "text-[#9CA3AF]"
                                : "text-[#0A0A0A]"
                          }`}
                        >
                          {f.title}
                        </span>
                        <ArrowRight
                          size={15}
                          className={
                            isActive ? "text-white/60" : "text-[#C4C4BE]"
                          }
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Right: animated detail panel — fills column height, scrolls internally if needed */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-[#F0F4FF]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #2020CC 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      opacity: 0.08,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-[#F0F4FF]"
                    style={{ opacity: 0.92 }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -32 }}
                      transition={{
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                      }}
                      className="relative z-10 p-5 sm:p-8 flex flex-col justify-center h-full overflow-y-auto"
                    >
                      <p className="font-mono text-xs font-semibold text-[#2020CC]/40 uppercase tracking-widest mb-4">
                        0{activeFeature.id} / 0{features.length}
                      </p>
                      <div className="w-12 h-12 rounded-2xl bg-[#2020CC] flex items-center justify-center text-white mb-5 flex-shrink-0">
                        {activeFeature.icon}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[#0A0A0A] mb-3 leading-tight">
                        {activeFeature.title}
                      </h3>
                      <p className="font-body text-sm text-[#6B7280] leading-relaxed max-w-md">
                        {activeFeature.body}
                      </p>
                      {activeFeature.screenshot && (
                        <div className="mt-5 rounded-2xl overflow-hidden border border-[#E2E2DA] shadow-lg flex-shrink-0">
                          <Image
                            src={activeFeature.screenshot}
                            alt={activeFeature.title}
                            width={700}
                            height={400}
                            className="w-full object-cover"
                            style={{ maxHeight: "13rem" }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
