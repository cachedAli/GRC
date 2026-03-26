"use client";

import { motion } from "framer-motion";

const trustItems = [
  "No commitment required",
  "Setup in under a day",
  "Your data never leaves your region",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-16 md:py-20 px-4 sm:px-6 rounded-xl relative overflow-hidden bg-[#F0F4FF]"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs text-[#2020CC] font-semibold uppercase tracking-wide mb-4"
        >
          Get started
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="font-display text-3xl sm:text-4xl md:text-6xl text-[#0A0A0A] mb-6 leading-tight"
        >
          Ready to unify your GRC program?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="font-body text-lg text-[#6B7280] mb-10 leading-relaxed"
        >
          Join our Design Partner program. Get early access at a discounted
          rate. Shape the platform. Lock in your advantage.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-4 mb-10"
        >
          <motion.a
            href="mailto:hello@complyverse.io"
            className="font-body text-[15px] font-bold bg-[#2020CC] text-white px-6 sm:px-8 py-3.5 rounded-full inline-block hover:bg-[#1414A0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2020CC]"
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.2 }}
          >
            Become a Design Partner &rarr;
          </motion.a>
          <motion.a
            href="#tour"
            className="font-body text-[15px] text-[#0A0A0A] border border-[#E2E2DA] px-6 sm:px-8 py-3.5 rounded-full inline-block hover:bg-white hover:border-[#0A0A0A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
            whileHover={{ backgroundColor: "#ffffff" }}
            transition={{ duration: 0.2 }}
          >
            Explore Platform
          </motion.a>
        </motion.div>

        {/* Trust items */}
        {/* <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8"
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="font-body text-sm text-[#9CA3AF] flex items-center gap-2"
            >
              <span className="text-[#F5A623] text-base font-bold">✓</span>
              {item}
            </span>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
}
