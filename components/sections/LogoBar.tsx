"use client";

import { motion } from "framer-motion";

const frameworks = [
  "ISO 27001",
  "SOC 2",
  "PCI-DSS",
  "NIST CSF",
  "GDPR",
  "HIPAA",
  "SOX",
  "CBUAE",
  "SAMA",
  "DORA",
  "NIS2",
  "COBIT",
];

// Duplicate for seamless loop
const all = [...frameworks, ...frameworks];

export default function LogoBar() {
  return (
    <section className="py-16 overflow-hidden">
      <p className="font-body text-xs text-[#9CA3AF] uppercase tracking-widest text-center mb-8">
        Frameworks Supported Out of the Box
      </p>
      <div className="relative overflow-hidden mask-fade-edges">
        <motion.div
          className="flex gap-6 items-center whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {all.map((name, i) => (
            <span
              key={i}
              className="font-body text-sm font-semibold text-[#6B7280] border border-[#E2E2DA] bg-[#F8FAFC] rounded-lg px-5 py-2.5 hover:text-[#2020CC] hover:border-[#2020CC] hover:bg-[#F0F4FF] transition-all cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
