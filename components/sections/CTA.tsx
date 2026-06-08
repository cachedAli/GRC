"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="py-16 md:py-24 px-4 sm:px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto text-center rounded-[42px] border border-[#12d8ff]/24 bg-[radial-gradient(circle_at_50%_0%,rgba(18,216,255,0.22),transparent_38%),linear-gradient(180deg,#000414_0%,#020824_58%,#03113b_100%)] px-6 md:px-12 py-14 md:py-18 shadow-[0_24px_70px_-36px_rgba(0,87,255,0.6)]"
      >
        <h2 className="text-4xl md:text-5xl font-semibold font-poppins text-white leading-tight">
          Take control of governance today
        </h2>

        <p className="text-lg font-medium max-w-3xl mx-auto text-white/78 mt-5 leading-relaxed">
          Simplify compliance, manage risks, and keep your organization aligned
          with a single platform
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-9 font-noto-serif">
          <Link
            href="/request-demo"
            className="text-lg font-semibold bg-[#0057ff] text-white px-6 py-4 rounded-full hover:bg-[#12d8ff] hover:text-[#000414] transition-colors focus-visible:outline-none cursor-pointer"
          >
            Request a Demo
          </Link>

          <button className="text-lg font-semibold bg-transparent text-white border border-[#12d8ff]/70 px-6 py-4 rounded-full hover:bg-[#12d8ff] hover:text-[#000414] transition-colors focus-visible:outline-none cursor-pointer">
            Watch Tour
          </button>
        </div>

        <p className="text-sm font-medium text-white/62 mt-6">
          No complex setup. Get started quickly with your team
        </p>
      </motion.div>
    </section>
  );
}
