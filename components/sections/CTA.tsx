"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="cta" className="py-16 md:py-24 px-4 sm:px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto text-center rounded-[42px] border border-green-200/80 bg-linear-to-b from-[#10B981] via-[#14B8A6]/80 to-[#F0FDFB] px-6 md:px-12 py-14 md:py-18 shadow-sm"
      >
        <h2 className="text-4xl md:text-5xl font-semibold font-poppins text-[#052E16] leading-tight">
          Take control of governance today
        </h2>

        <p className="text-lg font-medium max-w-3xl mx-auto text-[#0F172A] mt-5 leading-relaxed">
          Simplify compliance, manage risks, and keep your organization aligned
          with a single platform
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-9 font-noto-serif">
          <button className="text-lg font-semibold bg-[#065F46] text-white px-6 py-4 rounded-full hover:bg-[#054c38] transition-colors focus-visible:outline-none cursor-pointer">
            Request a Demo
          </button>

          <button className="text-lg font-semibold bg-transparent text-[#065F46] border border-[#065F46] px-6 py-4 rounded-full hover:bg-[#065F46] hover:text-white transition-colors focus-visible:outline-none cursor-pointer">
            Watch Tour
          </button>
        </div>

        <p className="text-sm font-medium text-[#1F2937] mt-6">
          No complex setup. Get started quickly with your team
        </p>
      </motion.div>
    </section>
  );
}
