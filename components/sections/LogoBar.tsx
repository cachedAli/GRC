"use client";

import { motion } from "framer-motion";

const logos = [
  {
    name: "Deloitte",
    node: (
      <span className="font-sans font-bold text-[36px] tracking-tight">
        Deloitte<span className="text-[#86BC25]">.</span>
      </span>
    ),
  },
  {
    name: "PwC",
    node: (
      <span className="font-serif font-medium lowercase text-[42px] tracking-tighter text-[#D04A02] scale-y-90 inline-block">
        pwc
      </span>
    ),
  },
  {
    name: "KPMG",
    node: (
      <span className="font-sans font-black text-[34px] tracking-widest text-[#00338D]">
        KPMG
      </span>
    ),
  },
  {
    name: "Microsoft",
    node: (
      <div className="flex items-center gap-2.5">
        <div className="grid grid-cols-2 gap-0.75">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 bg-black"></div>
        </div>
        <span className="font-sans font-semibold text-[32px] tracking-tight">
          Microsoft
        </span>
      </div>
    ),
  },
  {
    name: "Cisco",
    node: (
      <div className="flex flex-col items-center gap-1.5 opacity-90">
        <svg
          width="52"
          height="24"
          viewBox="0 0 52 24"
          fill="currentColor"
          className="text-black"
        >
          <rect x="0" y="10" width="4" height="4" rx="1" />
          <rect x="8" y="6" width="4" height="12" rx="1" />
          <rect x="16" y="2" width="4" height="20" rx="1" />
          <rect x="24" y="0" width="4" height="24" rx="1" />
          <rect x="32" y="2" width="4" height="20" rx="1" />
          <rect x="40" y="6" width="4" height="12" rx="1" />
          <rect x="48" y="10" width="4" height="4" rx="1" />
        </svg>
        <span className="font-sans font-bold text-[13px] tracking-[0.25em] leading-none uppercase text-black">
          CISCO
        </span>
      </div>
    ),
  },
  {
    name: "Okta",
    node: (
      <div className="flex items-center">
        <span className="font-sans font-bold text-[38px] tracking-tighter">
          okta
        </span>
      </div>
    ),
  },
];

// Duplicate for seamless loop
const all = [...logos, ...logos, ...logos];

export default function LogoBar() {
  return (
    <section className=" bg-linear-to-b from-[#F0FDFB] to-[#fbfdfc]  overflow-hidden">
      <div className="relative  py-20 overflow-hidden mask-fade-edges w-full max-w-7xl mx-auto">
        <motion.div
          className="flex gap-24 md:gap-32 items-center whitespace-nowrap w-max px-12"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {all.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-black opacity-90 hover:opacity-100 transition-opacity select-none"
            >
              {logo.node}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
