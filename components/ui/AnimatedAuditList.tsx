"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export type AuditEntry = {
  id: string;
  stage: number;
  label: string;
  detail: string;
};

type AnimatedAuditListProps = {
  entries: AuditEntry[];
  activeStage: number;
  onSelect: (stage: number) => void;
  variant?: "light" | "dark";
};

// Adapted from ReactBits Animated List via the ReactBits MCP.
// The original scroll-list motion is narrowed here to an accessible audit ledger:
// entries animate only when the governed workflow creates them, and each entry
// remains a native button that can return the visitor to its source stage.
export default function AnimatedAuditList({ entries, activeStage, onSelect, variant = "light" }: AnimatedAuditListProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <ol className="m-0 grid list-none gap-2 p-0" aria-live="polite" aria-label="Workflow audit events">
      <AnimatePresence initial={false}>
        {entries.map((entry, index) => (
          <motion.li
            key={entry.id}
            layout={!prefersReducedMotion}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : Math.min(index * 0.025, 0.12) }}
          >
            <button
              type="button"
              onClick={() => onSelect(entry.stage)}
              aria-label={`${entry.label}. ${entry.detail}. Open stage ${entry.stage + 1}`}
              aria-current={activeStage === entry.stage ? "step" : undefined}
              className={`group grid min-h-14 w-full grid-cols-[1.55rem_1fr] gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12d8ff] ${
                isDark
                  ? activeStage === entry.stage
                    ? "border-[#2d8cff] bg-[#0d2a53]"
                    : "border-[#294d7d] bg-[#091d3c] hover:border-[#3d6fa9] hover:bg-[#0c2549]"
                  : activeStage === entry.stage
                    ? "border-[#a8c7f4] bg-[#f2f7ff]"
                    : "border-[#e1e8f1] bg-white hover:border-[#bdd0eb] hover:bg-[#f8fbff]"
              }`}
            >
              <span className={`mt-0.5 grid h-6 w-6 place-items-center rounded-full border ${isDark ? "border-[#2c7180] bg-[#0a3542] text-[#67e6c0]" : "border-[#b9d9cd] bg-[#eff9f5] text-[#14704e]"}`}>
                <CheckCircle2 size={13} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <strong className={`block font-body text-[0.76rem] font-semibold leading-5 ${isDark ? "text-[#e2edfb]" : "text-[#132036]"}`}>{entry.label}</strong>
                <span className={`mt-0.5 block font-body text-[0.67rem] leading-[1.45] ${isDark ? "text-[#82a0c6]" : "text-[#5d6b7f]"}`}>{entry.detail}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}
