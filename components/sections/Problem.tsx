"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  ClipboardCheck,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";

interface Card {
  icon: React.ReactNode;
  title: string;
  body: string;
  bg: string;
}

const cards: Card[] = [
  {
    icon: <ShieldAlert size={22} strokeWidth={1.4} />,
    title: "For Security Teams",
    body: "Get real-time visibility across all your controls. Automated evidence collection means no more manual spreadsheets before every audit.",
    bg: "#2020CC",
  },
  {
    icon: <ClipboardCheck size={22} strokeWidth={1.4} />,
    title: "For Compliance Officers",
    body: "25+ pre-built frameworks with guided certification journeys. Control-level assessments, evidence collection, and approval workflows — all in one place.",
    bg: "#5046D6",
  },
  {
    icon: <BarChart3 size={22} strokeWidth={1.4} />,
    title: "For Risk Managers",
    body: "Full risk lifecycle — register, assess, treat, monitor, review. Bow-tie analysis, scenario modeling, KRI monitoring, and AI-generated risk narratives.",
    bg: "#3535D5",
  },
  {
    icon: <Users size={22} strokeWidth={1.4} />,
    title: "For the Board",
    body: "Executive dashboards with real-time compliance scores, risk heatmaps, and control effectiveness — visible in seconds, not hours.",
    bg: "#1414A0",
  },
];

const dotPattern = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

export default function Problem() {
  return (
    <section className="py-6 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-[#2020CC] font-semibold uppercase tracking-wide mb-4">
            The Reality
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] leading-tight max-w-2xl mx-auto">
            GRC is broken. We fixed it.
          </h2>
          <p className="font-body text-base text-[#6B7280] mt-4 max-w-lg mx-auto">
            Fragmented tools, manual spreadsheets, and siloed teams cost
            enterprises millions. ComplyVerse powers every role in your GRC
            program.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 text-white md:grid-cols-2 gap-4 md:gap-5">
          {/* Card 1 — tall left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden md:row-span-2"
            style={{ backgroundColor: cards[0].bg, minHeight: 420 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={dotPattern}
            />
            <div
              className="absolute top-0 inset-x-0 h-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
              }}
            />
            <div
              className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
            <div
              className="absolute bottom-4 right-4 w-36 h-36 rounded-full pointer-events-none"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            />

            <div className="relative z-10 mb-auto">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white">
                {cards[0].icon}
              </div>
            </div>

            <div className="relative z-10 mt-10">
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {cards[0].title}
              </h3>
              <p className="font-body text-[15px] text-white/68 leading-relaxed mb-6">
                {cards[0].body}
              </p>
              <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/28 transition-colors">
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </motion.div>

          {/* Card 2 — top right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden"
            style={{ backgroundColor: cards[1].bg, minHeight: 200 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={dotPattern}
            />
            <div
              className="absolute top-0 inset-x-0 h-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />

            <div className="relative z-10 mb-auto">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white">
                {cards[1].icon}
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {cards[1].title}
              </h3>
              <p className="font-body text-sm text-white/68 leading-relaxed mb-4">
                {cards[1].body}
              </p>
              <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/28 transition-colors">
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </motion.div>

          {/* Card 3 — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden"
            style={{ backgroundColor: cards[2].bg, minHeight: 200 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={dotPattern}
            />
            <div
              className="absolute top-0 inset-x-0 h-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
              }}
            />
            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />

            <div className="relative z-10 mb-auto">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white">
                {cards[2].icon}
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {cards[2].title}
              </h3>
              <p className="font-body text-sm text-white/68 leading-relaxed mb-4">
                {cards[2].body}
              </p>
              <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/28 transition-colors">
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Card 4 — full-width bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="relative rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 overflow-hidden mt-5"
          style={{ backgroundColor: cards[3].bg }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={dotPattern}
          />
          <div
            className="absolute top-0 inset-x-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
            }}
          />
          <div
            className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          />

          <div className="relative z-10 w-11 h-11 rounded-xl flex-shrink-0 bg-white/15 flex items-center justify-center text-white">
            {cards[3].icon}
          </div>

          <div className="relative z-10 flex-1">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              {cards[3].title}
            </h3>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              {cards[3].body}
            </p>
          </div>

          <button className="relative z-10 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/28 transition-colors flex-shrink-0">
            <ArrowRight size={16} className="text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
