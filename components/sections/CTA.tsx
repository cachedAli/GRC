"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="relative bg-[#fbfdfc] px-3 py-5 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[2.5rem] border border-[#12d8ff]/24 bg-[radial-gradient(circle_at_50%_18%,rgba(0,87,255,0.36),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(18,216,255,0.14),transparent_30%),linear-gradient(180deg,#000414_0%,#020824_50%,#0057ff_78%,#b9c9ff_100%)] px-6 py-20 text-center shadow-[0_24px_70px_-36px_rgba(0,87,255,0.6)] md:px-12 md:py-28"
      >
        <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          Take control of governance today
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[#eef7ff]/88">
          Simplify compliance, manage risks, and keep your organization aligned
          with a single platform
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 font-body">
          <Link
            href="/request-demo"
            className="cursor-pointer rounded-full bg-white px-6 py-4 text-lg font-semibold text-[#000414] shadow-[0_18px_42px_-22px_rgba(255,255,255,0.9)] transition-colors hover:bg-[#dff7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            Request a Demo
          </Link>

          <button className="cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#000414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
            Watch Tour
          </button>
        </div>

        <p className="mt-6 text-sm font-medium text-[#eef7ff]/72">
          No complex setup. Get started quickly with your team
        </p>
      </motion.div>
    </section>
  );
}
