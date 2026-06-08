"use client";

import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Zap } from "lucide-react";

const heroFeatures = [
  {
    icon: <ShieldCheck size={18} strokeWidth={1.8} />,
    title: "13 MODULES",
    desc: "Risk, compliance, audit, governance, vulnerability — all in one unified platform.",
  },
  {
    icon: <Zap size={18} strokeWidth={1.8} />,
    title: "25+ FRAMEWORKS",
    desc: "ISO 27001, SOC 2, NIST, HIPAA, SAMA, CBUAE and more — pre-mapped and ready.",
  },
  {
    icon: <BarChart3 size={18} strokeWidth={1.8} />,
    title: "PRODUCTION-READY",
    desc: "From zero to audit-ready in days, not months.",
  },
];

export default function HeroStrip() {
  return (
    <>
      {/* Feature strip — white background */}
      <div className="relative z-10 bg-white rounded-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-[#E2E2DA]">
            {/* CTA pill */}
            <div className="flex flex-wrap items-center py-6 gap-3 md:pr-10">
              <motion.a
                href="/#cta"
                className="font-body font-bold text-sm bg-[#0057ff] text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full uppercase tracking-widest whitespace-nowrap hover:bg-[#12d8ff] hover:text-[#000414] transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                Get Started
              </motion.a>
              <motion.a
                href="/#tour"
                className="font-body font-bold text-sm border border-[#E2E2DA] text-[#0A0A0A] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full tracking-widest whitespace-nowrap hover:bg-[#F5F5F0] transition-colors hidden lg:flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                See the Platform
              </motion.a>
            </div>
            {heroFeatures.map((f) => (
              <div
                key={f.title}
                className="px-0 md:px-8 py-6 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl border border-[#E2E2DA] flex items-center justify-center text-[#0057ff] shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs text-[#0A0A0A] tracking-widest mb-1.5">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
