"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

const stats = [
  {
    value: 13,
    suffix: "+",
    label: "Integrated Modules",
    sub: [
      "Risk, Compliance, Audit, Governance",
      "Vulnerability & Evidence Management",
    ],
  },
  {
    value: 25,
    suffix: "+",
    label: "Compliance Frameworks",
    sub: [
      "ISO 27001, SOC 2, NIST, SAMA, CBUAE",
      "New frameworks every quarter",
    ],
  },
  {
    value: 90,
    suffix: "%",
    label: "Faster Audit Prep",
    sub: ["Evidence collected automatically", "No more spreadsheet chaos"],
  },
  {
    value: 70,
    suffix: "%",
    label: "Cost Reduction",
    sub: ["Replace your entire GRC tool stack", "One platform, one price"],
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden my-2 rounded-xl bg-[#000414] py-20 md:py-24 px-4 sm:px-6">
      {/* Pink blob — top left */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#BAE6FD] opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      {/* Cyan blob — bottom right */}
      <div
        className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-[#A8E6FF] opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="font-display font-extrabold text-white text-3xl md:text-4xl mb-4 leading-tight"
        >
          Built for Enterprise GRC at Scale
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-body text-white/65 text-base md:text-lg leading-relaxed"
        >
          One AI-powered platform that replaces your entire GRC tool stack.
        </motion.p>
      </div>

      {/* White stat cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="rounded-2xl px-6 md:px-8 py-7 md:py-8 border"
            style={{
              background: "#EEF2FF",
              borderColor: "rgba(32,32,204,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <p className="font-body text-xs text-[#6B7280] uppercase tracking-widest mb-3 leading-relaxed">
              {stat.label}
            </p>
            <div className="font-body font-extrabold text-[#0057ff] text-4xl md:text-5xl mb-5">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="space-y-2">
              {stat.sub.map((s) => (
                <p
                  key={s}
                  className="font-body text-sm text-[#6B7280] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B8FE8] shrink-0" />
                  {s}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
