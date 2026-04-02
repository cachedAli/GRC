"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  Sparkles,
  Layers,
  BarChart3,
  Map as MapIcon,
  Zap,
  Target,
  PieChart,
  TrendingUp,
  Navigation,
  ClipboardCheck,
  ArrowLeftRight,
  FileText,
  Users,
  Scale,
  Globe,
  RefreshCw,
  UserCheck,
  Brain,
  Tag,
  Package,
  Link2,
  ScanSearch,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

interface TourFeature {
  Icon: LucideIcon;
  title: string;
  desc: string;
  bg: string;
  fg: string;
}

interface TourSlide {
  tab: string;
  TabIcon: LucideIcon;
  title: string;
  description: string;
  screenshot: string;
  features: TourFeature[];
}

const tourSlides: TourSlide[] = [
  {
    tab: "Dashboard",
    TabIcon: LayoutDashboard,
    title: "Executive Dashboard",
    description:
      "A single pane of glass for your entire GRC program. Real-time compliance scores, risk heatmaps, and control effectiveness — visible in seconds, not hours.",
    screenshot: "/screenshots/slide_01.png",
    features: [
      {
        Icon: BarChart3,
        title: "10+ Dashboard Tabs",
        desc: "Overview, Risk, Compliance, Governance, Incidents, Control Testing, and more",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: MapIcon,
        title: "Interactive Heatmaps",
        desc: "Click-through risk visualization with drill-down to individual entries",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
      {
        Icon: Zap,
        title: "Real-Time Data",
        desc: "No more quarterly snapshots — live metrics that update as your program evolves",
        bg: "#ECFDF5",
        fg: "#059669",
      },
    ],
  },
  {
    tab: "Risk",
    TabIcon: AlertTriangle,
    title: "Enterprise Risk Management",
    description:
      "The deepest ERM module on the market. From risk identification to bow-tie analysis — everything connected, everything measurable.",
    screenshot: "/screenshots/slide_33.png",
    features: [
      {
        Icon: Target,
        title: "Risk Register & Scoring",
        desc: "Inherent/residual scoring, treatment plans, owner assignment, closure workflows",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: PieChart,
        title: "Advanced Analytics",
        desc: "Bow-tie diagrams, scenario modeling, risk aggregation, and AI narratives",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
      {
        Icon: TrendingUp,
        title: "KRI Monitoring",
        desc: "Configurable thresholds, trend analysis, automated alerts when indicators breach tolerance",
        bg: "#D1FAE5",
        fg: "#047857",
      },
    ],
  },
  {
    tab: "Compliance",
    TabIcon: ShieldCheck,
    title: "Compliance Management",
    description:
      "From framework selection to certification — a guided journey that tells you exactly what's needed, what's done, and what's next.",
    screenshot: "/screenshots/slide_37.png",
    features: [
      {
        Icon: Navigation,
        title: "Certification Journeys",
        desc: "Step-by-step roadmaps with milestones, task tracking, and completion status",
        bg: "#ECFDF5",
        fg: "#059669",
      },
      {
        Icon: ClipboardCheck,
        title: "Assessment Workflows",
        desc: "Control-level testing with evidence upload, scoring, and multi-tier approvals",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: ArrowLeftRight,
        title: "Cross-Framework Mapping",
        desc: "Implement once, satisfy multiple regulators. AI finds control overlaps automatically",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
    ],
  },
  {
    tab: "Governance",
    TabIcon: BookOpen,
    title: "Governance & Policy",
    description:
      "Full policy lifecycle management — from draft to publication to expiry — with approval workflows, committee tracking, and regulatory intelligence.",
    screenshot: "/screenshots/slide_09.png",
    features: [
      {
        Icon: FileText,
        title: "Document Lifecycle",
        desc: "Draft → Review → Approve → Publish → Expire with version control and audit trail",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: Users,
        title: "Committee Management",
        desc: "Board meetings, agendas, actions, attestation campaigns, regulatory feeds",
        bg: "#D1FAE5",
        fg: "#047857",
      },
      {
        Icon: Scale,
        title: "Exception Management",
        desc: "Policy exception workflow with risk assessment, compensating controls, and approvals",
        bg: "#ECFDF5",
        fg: "#059669",
      },
    ],
  },
  {
    tab: "Audit",
    TabIcon: ClipboardList,
    title: "Audit Management",
    description:
      "End-to-end internal audit — universe, planning, engagement, fieldwork, findings, and continuous controls monitoring — all connected.",
    screenshot: "/screenshots/slide_60.png",
    features: [
      {
        Icon: Globe,
        title: "Audit Universe & Planning",
        desc: "Define auditable entities, create risk-based audit plans, allocate resources",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: RefreshCw,
        title: "Continuous Monitoring",
        desc: "Automated control tests with real-time alerting and CCM dashboards",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
      {
        Icon: UserCheck,
        title: "Skills & Capacity",
        desc: "Auditor competency tracking, certification management, and workload planning",
        bg: "#ECFDF5",
        fg: "#059669",
      },
    ],
  },
  {
    tab: "Evidence AI",
    TabIcon: Sparkles,
    title: "AI Evidence Assessment",
    description:
      "Upload a document. AI reads it, scores relevance and adequacy, maps it to framework clauses, and produces auditor-defensible output — in seconds.",
    screenshot: "/screenshots/slide_47.png",
    features: [
      {
        Icon: Brain,
        title: "Intelligent Scoring",
        desc: "Relevance, adequacy, confidence, and audit readiness — scored automatically",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
      {
        Icon: Tag,
        title: "Clause-Level Mapping",
        desc: "Matched text snippets, rationale, coverage types — defensible in audit",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: Package,
        title: "Audit Packages",
        desc: "Bundle, finalize, export evidence with retention policies and legal hold",
        bg: "#ECFDF5",
        fg: "#059669",
      },
    ],
  },
  {
    tab: "Controls",
    TabIcon: Layers,
    title: "Unified Control Library",
    description:
      "Map controls across every framework. AI detects similarities, identifies gaps, and recommends evidence — so you implement once and satisfy many.",
    screenshot: "/screenshots/slide_52.png",
    features: [
      {
        Icon: Link2,
        title: "Cross-Framework Mapping",
        desc: "AI-driven similarity detection with confidence scores and reasoning",
        bg: "#ECFDF5",
        fg: "#065F46",
      },
      {
        Icon: ScanSearch,
        title: "Gap Analysis",
        desc: "Identify coverage gaps with priority recommendations and coverage visualization",
        bg: "#D1FAE5",
        fg: "#047857",
      },
      {
        Icon: GitBranch,
        title: "Control Inheritance",
        desc: "Parent-child relationships with coverage percentages and conditional logic",
        bg: "#ECFEF8",
        fg: "#0F766E",
      },
    ],
  },
];

export default function ProductTour() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevIdxRef = useRef(0);
  const activeSlide = tourSlides[activeIdx];

  const goTo = (i: number) => {
    setDirection(i > prevIdxRef.current ? 1 : -1);
    prevIdxRef.current = i;
    setActiveIdx(i);
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <section
      id="tour"
      className="relative rounded-xl py-20 md:py-28 px-4 sm:px-6 bg-white overflow-hidden"
    >
      {/* Background: subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#ECFDF5] via-white to-white pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#065F46 1px, transparent 1px), linear-gradient(90deg, #065F46 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] animate-pulse" />
            <span className="font-mono text-xs text-[#065F46] font-semibold uppercase tracking-widest">
              Platform Tour
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-bold leading-tight mb-4">
            See the platform in action.
          </h2>
          <p className="font-body text-base text-[#6B7280] max-w-lg mx-auto leading-relaxed">
            Every module connected. Everything measurable. One unified GRC
            platform built for modern enterprises.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex gap-1 justify-center flex-wrap mb-10 md:mb-12 p-1.5 bg-[#F1F5F9] rounded-2xl max-w-3xl mx-auto">
          {tourSlides.map((slide, i) => {
            const TabIcon = slide.TabIcon;
            return (
              <button
                key={slide.tab}
                onClick={() => goTo(i)}
                className={`relative flex items-center gap-1.5 font-body text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeIdx === i
                    ? "bg-white text-[#0A0A0A] shadow-sm shadow-black/10"
                    : "text-[#6B7280] hover:text-[#0A0A0A]"
                }`}
              >
                <TabIcon
                  size={14}
                  className={
                    activeIdx === i ? "text-[#065F46]" : "text-[#9CA3AF]"
                  }
                />
                {slide.tab}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="grid lg:grid-cols-[5fr_7fr] gap-8 md:gap-10 xl:gap-16 items-start"
          >
            {/* Left: text */}
            <div className="flex flex-col">
              {/* Slide number / label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs text-[#9CA3AF] tabular-nums">
                  {String(activeIdx + 1).padStart(2, "0")} /{" "}
                  {String(tourSlides.length).padStart(2, "0")}
                </span>
                <span className="flex-1 h-px bg-[#E2E2DA]" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0A] leading-tight mb-4">
                {activeSlide.title}
              </h3>
              <p className="font-body text-[15px] text-[#6B7280] leading-relaxed mb-8">
                {activeSlide.description}
              </p>

              {/* Features list */}
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                {activeSlide.features.map((feat, i) => {
                  const FeatIcon = feat.Icon;
                  return (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1 + 0.15,
                        ease: [0.22, 1, 0.36, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                      }}
                      className="flex items-start gap-4 py-4 group"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: feat.bg, color: feat.fg }}
                      >
                        <FeatIcon size={17} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-[#0A0A0A] mb-1">
                          {feat.title}
                        </p>
                        <p className="font-body text-[13px] text-[#9CA3AF] leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right: screenshot */}
            <div className="relative">
              {/* Glow effect behind frame */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-25 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, #10B981 0%, transparent 70%)",
                }}
              />
              {/* Browser frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(16,185,129,0.2)] border border-[#E2E2DA] bg-white">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#F8FAFC] border-b border-[#E8EAEF]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-3 bg-white border border-[#E8EAEF] rounded-md px-3 py-1.5 font-body text-[11px] text-[#9CA3AF] truncate">
                    app.complyverse.io /{" "}
                    {activeSlide.tab.toLowerCase().replace(/ /g, "-")}
                  </div>
                </div>
                <Image
                  src={activeSlide.screenshot}
                  alt={activeSlide.title}
                  width={960}
                  height={600}
                  className="w-full h-auto block"
                  priority={activeIdx === 0}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar navigation */}
        <div className="flex items-center gap-3 mt-10 max-w-xs mx-auto">
          {tourSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex-1 h-1 rounded-full overflow-hidden bg-[#E2E2DA] transition-all duration-300"
            >
              {activeIdx === i && (
                <div className="h-full bg-[#10B981] rounded-full w-full" />
              )}
              {activeIdx !== i && (
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    i < activeIdx ? "w-full bg-[#10B981]/30" : "w-0"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
