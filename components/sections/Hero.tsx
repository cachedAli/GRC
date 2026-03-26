"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative bg-[#2020CC] my-2 rounded-xl overflow-hidden flex flex-col min-h-[76vh] md:min-h-[88vh] pt-14 sm:pt-16">
      {/* Pink organic blob — top right */}
      <div
        className="absolute top-0 right-0 w-[42%] sm:w-[50%] h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 560 700"
          className="w-full h-full"
          preserveAspectRatio="xMaxYMin slice"
        >
          <path
            d="M560,0 L560,700 L220,680 C340,620 460,500 510,360 C545,260 558,140 560,0Z"
            fill="#BAE6FD"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-20 md:py-28 max-w-3xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-8"
        >
          <span className="inline-flex flex-wrap justify-center items-center gap-2 border border-white/20 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 text-white/90 font-body text-[10px] sm:text-xs tracking-widest uppercase backdrop-blur-sm max-w-full">
            <ShieldCheck size={12} />
            Now available for design partners
            <span className="bg-white text-[#2020CC] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-extrabold text-white text-[44px] sm:text-5xl md:text-6xl leading-[0.95] mb-5 sm:mb-6 max-w-[14ch] sm:max-w-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          Governance, Risk &amp;
          <br />
          Compliance - Unified.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          Replace your fragmented GRC stack with one AI-powered
          platform.&nbsp;13 modules, 25+ frameworks, production-ready today.
        </motion.p>

        {/* Email input + CTA pill */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full shadow-xl p-2 sm:p-1.5 sm:pl-6 gap-2"
          >
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent font-body text-[#0A0A0A] text-sm placeholder:text-gray-400 outline-none min-w-0 px-2 sm:px-0"
            />
            <button
              type="submit"
              className="font-body font-semibold text-sm bg-[#2020CC] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-[#1818a8] transition-colors flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-auto"
            >
              Request a Demo <ArrowRight size={14} />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom wave — transitions to white */}
      {/* Bottom wave — white rises from bottom-left, crests center, rolls right */}
      <div className="relative z-10 w-full -mb-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 C120,180 280,60 520,80 C720,95 900,180 1200,160 C1320,152 1400,148 1440,145 L1440,220 L0,220 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Feature strip moved to its own component (HeroStrip) */}
    </section>
  );
}
