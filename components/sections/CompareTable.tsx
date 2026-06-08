"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";

interface Competitor {
  key: string;
  name: string;
  active: boolean;
}

interface CompareRow {
  capability: string;
  cv: { value: string; type: "yes" | "partial" | "no" };
  sn: { value: string; type: "yes" | "partial" | "no" };
  ar: { value: string; type: "yes" | "partial" | "no" };
  dr: { value: string; type: "yes" | "partial" | "no" };
  va: { value: string; type: "yes" | "partial" | "no" };
  lg: { value: string; type: "yes" | "partial" | "no" };
}

const compareRows: CompareRow[] = [
  {
    capability: "Enterprise Risk Management",
    cv: { value: "Full Suite", type: "yes" },
    sn: { value: "Full", type: "yes" },
    ar: { value: "Full", type: "yes" },
    dr: { value: "—", type: "no" },
    va: { value: "—", type: "no" },
    lg: { value: "Full", type: "yes" },
  },
  {
    capability: "Internal Audit",
    cv: { value: "Full Suite", type: "yes" },
    sn: { value: "Add-on", type: "partial" },
    ar: { value: "Full", type: "yes" },
    dr: { value: "—", type: "no" },
    va: { value: "—", type: "no" },
    lg: { value: "Basic", type: "partial" },
  },
  {
    capability: "Governance & Policy",
    cv: { value: "Full Suite", type: "yes" },
    sn: { value: "Basic", type: "partial" },
    ar: { value: "Full", type: "yes" },
    dr: { value: "Basic", type: "partial" },
    va: { value: "Basic", type: "partial" },
    lg: { value: "Basic", type: "partial" },
  },
  {
    capability: "Vulnerability Management",
    cv: { value: "Built-in", type: "yes" },
    sn: { value: "Via ITSM", type: "yes" },
    ar: { value: "—", type: "no" },
    dr: { value: "Integration", type: "partial" },
    va: { value: "Integration", type: "partial" },
    lg: { value: "—", type: "no" },
  },
  {
    capability: "AI Evidence Assessment",
    cv: { value: "Deep AI", type: "yes" },
    sn: { value: "—", type: "no" },
    ar: { value: "—", type: "no" },
    dr: { value: "Basic", type: "partial" },
    va: { value: "Basic", type: "partial" },
    lg: { value: "—", type: "no" },
  },
  {
    capability: "NL Chatbot (ComplyChat)",
    cv: { value: "GPT-4o", type: "yes" },
    sn: { value: "Now Assist", type: "partial" },
    ar: { value: "—", type: "no" },
    dr: { value: "—", type: "no" },
    va: { value: "—", type: "no" },
    lg: { value: "—", type: "no" },
  },
  {
    capability: "Cross-Framework Mapping",
    cv: { value: "AI-Powered", type: "yes" },
    sn: { value: "Manual", type: "partial" },
    ar: { value: "Manual", type: "partial" },
    dr: { value: "Limited", type: "partial" },
    va: { value: "Limited", type: "partial" },
    lg: { value: "Manual", type: "partial" },
  },
  {
    capability: "Multi-Tenant",
    cv: { value: "Schema Isolation", type: "yes" },
    sn: { value: "Full", type: "yes" },
    ar: { value: "Config", type: "partial" },
    dr: { value: "—", type: "no" },
    va: { value: "—", type: "no" },
    lg: { value: "Basic", type: "partial" },
  },
  {
    capability: "Workflow Automation",
    cv: { value: "Visual Builder", type: "yes" },
    sn: { value: "Full", type: "yes" },
    ar: { value: "Full", type: "yes" },
    dr: { value: "Basic", type: "partial" },
    va: { value: "Basic", type: "partial" },
    lg: { value: "Full", type: "yes" },
  },
  {
    capability: "Implementation Time",
    cv: { value: "Weeks", type: "yes" },
    sn: { value: "6–18 Months", type: "no" },
    ar: { value: "6–12 Months", type: "no" },
    dr: { value: "Weeks", type: "yes" },
    va: { value: "Weeks", type: "yes" },
    lg: { value: "1–3 Months", type: "partial" },
  },
  {
    capability: "Starting Price",
    cv: { value: "Affordable", type: "yes" },
    sn: { value: "$200K+/yr", type: "no" },
    ar: { value: "$150K+/yr", type: "no" },
    dr: { value: "$10K+/yr", type: "partial" },
    va: { value: "$8K+/yr", type: "partial" },
    lg: { value: "$50K+/yr", type: "partial" },
  },
];

const COMPETITORS: Competitor[] = [
  { key: "sn", name: "ServiceNow", active: true },
  { key: "ar", name: "Archer", active: true },
  { key: "dr", name: "Drata", active: true },
  { key: "va", name: "Vanta", active: true },
  { key: "lg", name: "LogicGate", active: true },
];

function CellValue({
  val,
  isCV = false,
}: {
  val: { value: string; type: "yes" | "partial" | "no" };
  isCV?: boolean;
}) {
  if (val.type === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <CheckCircle2
          size={15}
          className={isCV ? "text-[#0057ff]" : "text-[#22C55E]"}
          strokeWidth={2}
        />
        <span
          className={`font-body font-semibold text-sm ${isCV ? "text-[#0057ff]" : "text-[#374151]"}`}
        >
          {val.value}
        </span>
      </span>
    );
  }
  if (val.type === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <AlertTriangle size={14} className="text-[#F59E0B]" strokeWidth={2} />
        <span className="font-body text-sm text-[#92400E]">{val.value}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <XCircle size={14} className="text-[#D1D5DB]" strokeWidth={2} />
      <span className="font-body text-sm text-[#D1D5DB]">—</span>
    </span>
  );
}

export default function CompareTable() {
  const [competitors, setCompetitors] = useState<Competitor[]>(COMPETITORS);

  const toggleCompetitor = (key: string) => {
    setCompetitors((prev) =>
      prev.map((c) => (c.key === key ? { ...c, active: !c.active } : c)),
    );
  };

  const activeCols = competitors.filter((c) => c.active);

  return (
    <section
      id="compare"
      className="relative py-20 md:py-28 px-4 sm:px-6 rounded-xl my-2 bg-[#F8FAFF] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[320px] h-[220px] sm:w-[600px] sm:h-[400px] bg-linear-to-bl from-[#EEF0FF] to-transparent rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[240px] h-[180px] sm:w-[400px] sm:h-[300px] bg-linear-to-tr from-[#E0F2FE] to-transparent rounded-full opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E2DA] rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <Sparkles size={13} className="text-[#0057ff]" />
            <span className="font-mono text-xs text-[#0057ff] font-semibold uppercase tracking-widest">
              Compare
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] leading-tight mb-4">
            See how we stack up.
          </h2>
          <p className="font-body text-base text-[#6B7280] max-w-lg mx-auto">
            Toggle competitors to build your comparison. Full platform, fair
            price — no shortcuts.
          </p>
        </motion.div>

        {/* Toggle controls */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          <div className="inline-flex items-center gap-2 font-body text-sm font-bold px-5 py-2.5 rounded-full bg-[#0057ff] text-white cursor-default select-none shadow-md shadow-[#0057ff]/30">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            ComplyWerse
          </div>
          {competitors.map((comp) => (
            <button
              key={comp.key}
              onClick={() => toggleCompetitor(comp.key)}
              className={`font-body text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 ${
                comp.active
                  ? "bg-white text-[#374151] border-[#E2E2DA] shadow-sm"
                  : "bg-transparent text-[#9CA3AF] border-[#E8EAEF] opacity-60 hover:opacity-80"
              }`}
            >
              {comp.active ? comp.name : <s>{comp.name}</s>}
            </button>
          ))}
        </div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="rounded-2xl overflow-hidden border border-[#E2E2DA] shadow-[0_8px_40px_-8px_rgba(32,32,204,0.12)] bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[700px]">
              <thead>
                <tr>
                  {/* Capability header */}
                  <th className="text-left px-4 sm:px-6 py-4 sm:py-5 bg-[#0A0A0A] text-[#9CA3AF] font-body font-medium text-xs uppercase tracking-wider w-[220px]">
                    Capability
                  </th>
                  {/* ComplyVerse header — highlighted */}
                  <th
                    className="px-4 sm:px-6 py-4 sm:py-5 text-left whitespace-nowrap font-body font-bold text-sm w-[140px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #0057ff 0%, #12d8ff 100%)",
                      color: "white",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={13} className="text-white/70" />
                      ComplyWerse
                    </span>
                  </th>
                  {COMPETITORS.map((comp) => {
                    const isActive = competitors.find(
                      (c) => c.key === comp.key,
                    )?.active;
                    if (!isActive) return null;
                    return (
                      <th
                        key={comp.key}
                        className="px-4 sm:px-6 py-4 sm:py-5 text-left font-body font-medium text-xs uppercase tracking-wider whitespace-nowrap bg-[#111827] text-[#9CA3AF] w-[120px]"
                      >
                        {comp.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.capability}
                    className="border-b border-[#F1F5F9] hover:bg-[#FAFBFF] transition-colors duration-150 group"
                  >
                    {/* Capability */}
                    <td className="px-4 sm:px-6 py-4 font-body font-semibold text-[#0A0A0A] text-sm bg-[#FAFAFA] group-hover:bg-[#F5F7FF] transition-colors">
                      {row.capability}
                    </td>
                    {/* ComplyVerse cell */}
                    <td className="px-4 sm:px-6 py-4 bg-[#F0F4FF]/70 group-hover:bg-[#E8EEFF] transition-colors">
                      <CellValue val={row.cv} isCV />
                    </td>
                    {/* Competitor cells */}
                    {COMPETITORS.map((comp) => {
                      const isActive = competitors.find(
                        (c) => c.key === comp.key,
                      )?.active;
                      if (!isActive) return null;
                      return (
                        <td key={comp.key} className="px-4 sm:px-6 py-4">
                          <CellValue
                            val={
                              row[
                                comp.key as keyof Omit<CompareRow, "capability">
                              ] as {
                                value: string;
                                type: "yes" | "partial" | "no";
                              }
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex gap-6 justify-center mt-6 flex-wrap">
          <span className="font-body text-xs text-[#6B7280] flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#22C55E]" /> Full feature
          </span>
          <span className="font-body text-xs text-[#6B7280] flex items-center gap-1.5">
            <AlertTriangle size={13} className="text-[#F59E0B]" /> Partial /
            add-on
          </span>
          <span className="font-body text-xs text-[#6B7280] flex items-center gap-1.5">
            <XCircle size={13} className="text-[#D1D5DB]" /> Not available
          </span>
        </div>
      </div>
    </section>
  );
}
