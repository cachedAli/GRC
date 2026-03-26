"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Globe,
  Shield,
  HeartPulse,
  CreditCard,
  Flag,
  Building2,
  Settings2,
  KeyRound,
  ScrollText,
  Zap,
  Bot,
} from "lucide-react";

const frameworks = [
  { name: "SOC 2 Type II", icon: <Lock size={18} strokeWidth={1.5} /> },
  { name: "ISO 27001", icon: <Globe size={18} strokeWidth={1.5} /> },
  { name: "NIST CSF", icon: <Shield size={18} strokeWidth={1.5} /> },
  { name: "HIPAA", icon: <HeartPulse size={18} strokeWidth={1.5} /> },
  { name: "PCI DSS", icon: <CreditCard size={18} strokeWidth={1.5} /> },
  { name: "GDPR", icon: <Flag size={18} strokeWidth={1.5} /> },
  { name: "SOX", icon: <Building2 size={18} strokeWidth={1.5} /> },
  { name: "CBUAE", icon: <Settings2 size={18} strokeWidth={1.5} /> },
  { name: "SAMA", icon: <KeyRound size={18} strokeWidth={1.5} /> },
  { name: "DORA", icon: <Zap size={18} strokeWidth={1.5} /> },
  { name: "NIS2", icon: <ScrollText size={18} strokeWidth={1.5} /> },
  { name: "ISO 42001", icon: <Bot size={18} strokeWidth={1.5} /> },
];

const row2Frameworks = [
  { name: "COBIT", icon: <Settings2 size={18} strokeWidth={1.5} /> },
  { name: "CIS Controls", icon: <Shield size={18} strokeWidth={1.5} /> },
  { name: "ISO 27701", icon: <KeyRound size={18} strokeWidth={1.5} /> },
  { name: "NIST 800-53", icon: <Building2 size={18} strokeWidth={1.5} /> },
  { name: "ISO 22301", icon: <Flag size={18} strokeWidth={1.5} /> },
  { name: "ISO 31000", icon: <Globe size={18} strokeWidth={1.5} /> },
  { name: "MAS TRM", icon: <CreditCard size={18} strokeWidth={1.5} /> },
  { name: "ARAMCO CCC", icon: <HeartPulse size={18} strokeWidth={1.5} /> },
  { name: "FAIR", icon: <Lock size={18} strokeWidth={1.5} /> },
  { name: "OCTAVE", icon: <Bot size={18} strokeWidth={1.5} /> },
  { name: "Basel III", icon: <ScrollText size={18} strokeWidth={1.5} /> },
  { name: "NCA", icon: <Zap size={18} strokeWidth={1.5} /> },
];

const row1 = frameworks;
const row2 = row2Frameworks;

function FrameworkPill({
  fw,
}: {
  fw: { name: string; icon: React.ReactNode };
}) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-[#E2E2DA] bg-white mx-3 flex-shrink-0 cursor-default hover:border-[#2020CC] hover:bg-[#F0F4FF] transition-all">
      <span className="text-[#2020CC]">{fw.icon}</span>
      <span className="font-body text-sm font-medium text-[#0A0A0A] whitespace-nowrap">
        {fw.name}
      </span>
    </div>
  );
}

export default function Frameworks() {
  return (
    <section
      id="frameworks"
      className="py-28 relative overflow-hidden bg-white"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-wide mb-4 text-[#2020CC]">
            Framework Coverage
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0A0A0A] leading-tight mb-4">
            25+ frameworks.
            <br className="hidden md:block" /> One platform.
          </h2>
          <p className="font-body text-base text-[#6B7280] max-w-xl mx-auto">
            One control library. Every major framework. Implement once, satisfy
            multiple regulators. AI finds control overlaps automatically.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="relative z-10 space-y-4 mb-12">
        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...row1, ...row1].map((fw, i) => (
              <FrameworkPill key={i} fw={fw} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {[...row2, ...row2].map((fw, i) => (
              <FrameworkPill key={i} fw={fw} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center font-body text-sm text-[#9CA3AF]"
        >
          Don&apos;t see your framework?{" "}
          <a
            href="#cta"
            className="text-[#2020CC] underline underline-offset-2 hover:opacity-70 transition-colors"
          >
            We add new ones every quarter. &rarr;
          </a>
        </motion.p>
      </div>
    </section>
  );
}
