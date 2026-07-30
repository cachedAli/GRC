"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  FileSearch,
  MessageSquare,
  Route,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type AgentRoute = {
  id: "regulatory" | "evidence" | "risk" | "workflow" | "chat";
  tab: string;
  label: string;
  title: string;
  description: string;
  output: string;
  steps: Array<[string, string]>;
  Icon: LucideIcon;
};

const agentRoutes: AgentRoute[] = [
  {
    id: "regulatory",
    tab: "Regulatory analyst",
    label: "Regulatory intelligence",
    title: "From circular to approved tasks.",
    description:
      "AI interprets regulatory obligations, connects them to the affected controls, and prepares a change plan for the accountable owner.",
    output: "A review-ready impact assessment and owner-approved task plan.",
    steps: [
      ["Ingest", "Regulation"],
      ["Extract", "Obligations"],
      ["Connect", "Controls"],
      ["Recommend", "Gaps"],
      ["Approve", "Human"],
    ],
    Icon: Route,
  },
  {
    id: "evidence",
    tab: "Evidence inspector",
    label: "Evidence intelligence",
    title: "From upload to cross-framework assurance.",
    description:
      "AI reads evidence, evaluates its quality and freshness, then suggests where it can be reused across the control library.",
    output: "A source-linked evidence assessment, ready for owner review.",
    steps: [
      ["Read", "OCR"],
      ["Assess", "Match"],
      ["Score", "Quality"],
      ["Reuse", "Controls"],
      ["Review", "Owner"],
    ],
    Icon: FileSearch,
  },
  {
    id: "risk",
    tab: "Risk advisor",
    label: "Risk intelligence",
    title: "From signals to explainable decisions.",
    description:
      "Control failures, KRIs, and risk signals are analyzed together to make treatment options easier to understand and act on.",
    output: "A traceable treatment recommendation for the risk owner.",
    steps: [
      ["Monitor", "Signals"],
      ["Detect", "Breaches"],
      ["Model", "Scenario"],
      ["Advise", "Treatment"],
      ["Decide", "Owner"],
    ],
    Icon: ShieldCheck,
  },
  {
    id: "workflow",
    tab: "Workflow architect",
    label: "Governed automation",
    title: "From intent to governed automation.",
    description:
      "A natural-language request becomes a controlled workflow draft with permissions, approvals, and monitoring built into its path.",
    output: "A versioned workflow draft, ready to validate and publish.",
    steps: [
      ["Describe", "Rule"],
      ["Generate", "Draft"],
      ["Validate", "Permissions"],
      ["Publish", "Version"],
      ["Monitor", "Runs"],
    ],
    Icon: Workflow,
  },
  {
    id: "chat",
    tab: "ComplyChat",
    label: "Grounded answers",
    title: "From question to source-linked facts.",
    description:
      "ComplyChat respects user permissions, queries authorized GRC data, and explains its answer with the underlying operational sources.",
    output: "A role-aware answer with the sources needed to verify it.",
    steps: [
      ["Ask", "Language"],
      ["Authorize", "Role"],
      ["Query", "Data"],
      ["Explain", "Context"],
      ["Open", "Sources"],
    ],
    Icon: MessageSquare,
  },
];

export default function ProductTour() {
  const [activeId, setActiveId] = useState<AgentRoute["id"]>("regulatory");
  const reduceMotion = useReducedMotion();
  const activeRoute = agentRoutes.find((route) => route.id === activeId)!;

  return (
    <section
      id="ai"
      className="bg-[#fbfdfc] px-3 py-5 sm:px-6 md:px-8"
      aria-labelledby="ai-heading"
    >
      <div
        className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[2.5rem] px-4 py-20 text-white sm:px-6 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, #0a356f 0%, #0e3d7e 48%, #0e3d7e 90%, #174d98 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(216,235,250,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(216,235,250,0.09) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
          }}
        />
        <div aria-hidden="true" className="absolute -right-48 top-32 h-[34rem] w-[34rem] rounded-full bg-[#0057ff]/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-[800px] text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#12d8ff]">
            Orchestrate with AI
          </p>
          <h2 id="ai-heading" className="mt-3 font-display text-[2.25rem] font-semibold leading-[1.15] text-white">
            AI recommends.<br />Humans approve.
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] font-body text-base leading-relaxed text-[#eef7ff]/90">
            Built for regulated teams that need speed without surrendering
            accountability. AI does the analysis; people retain authority to
            decide, publish, and act.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="ComplyVerse AI routes"
          className="mt-12 flex gap-2 overflow-x-auto border-y border-[#d8ebfa]/16 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {agentRoutes.map((route) => {
            const Icon = route.Icon;
            const active = route.id === activeId;
            return (
              <button
                key={route.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="ai-route-panel"
                onClick={() => setActiveId(route.id)}
                className={`relative inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border px-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.09em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#12d8ff] ${
                  active
                    ? "border-[#719dff] bg-[#5d89ef] text-[#000414]"
                    : "border-[#d8ebfa]/32 bg-[#0b3976]/42 text-[#eef7ff]/88 hover:border-[#d8ebfa]/60 hover:bg-[#0b3976]/70 hover:text-white"
                }`}
              >
                <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
                {route.tab}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              id="ai-route-panel"
              key={activeRoute.id}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg"
            >
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#12d8ff]">
                [{activeRoute.label}]
              </p>
              <h3 className="mt-5 font-display text-[1.85rem] font-semibold leading-[1.1] text-white sm:text-[2rem]">
                {activeRoute.title}
              </h3>
              <p className="mt-6 font-body text-base leading-relaxed text-[#eef7ff]/88 md:text-lg">
                {activeRoute.description}
              </p>
              <div className="mt-8 border-l border-[#12d8ff] pl-5">
                <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#12d8ff]">
                  Output
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#eef7ff]/92">
                  {activeRoute.output}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="relative min-w-0">
            <div aria-hidden="true" className="absolute -inset-4 bg-[#0057ff]/18 blur-3xl" />
            <div className="relative overflow-hidden border border-[#d8ebfa]/34 bg-[#0d4389]/88 shadow-[0_36px_92px_-48px_rgba(0,87,255,0.9)]">
              <div className="flex items-center justify-between border-b border-[#d8ebfa]/14 px-5 py-4">
                <div className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-[#eef7ff]/78">
                  <BrainCircuit size={15} className="text-[#12d8ff]" aria-hidden="true" />
                  Agent route / active
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#12d8ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12d8ff]" />
                  Traceable
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeRoute.id}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-5 sm:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-45"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(216,235,250,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(216,235,250,0.07) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-[#eef7ff]/72">
                        Execution trace
                      </p>
                      <p className="font-mono text-[0.62rem] font-semibold text-[#eef7ff]/72">
                        05 STEPS
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-5 sm:gap-0">
                      {activeRoute.steps.map(([verb, object], index) => {
                        const humanGate = index === activeRoute.steps.length - 1 && activeRoute.id !== "chat";
                        return (
                          <div key={`${verb}-${object}`} className="relative flex min-w-0 items-center sm:block">
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 + index * 0.07, duration: 0.25 }}
                              className={`relative z-10 w-full border px-3 py-3 sm:min-h-27 ${
                                humanGate
                                  ? "border-[#12d8ff] bg-[#0057ff] text-white shadow-[0_0_26px_rgba(18,216,255,0.34)]"
                                  : "border-[#d8ebfa]/34 bg-[#0b3976] text-[#eef7ff]"
                              }`}
                            >
                              <span className={`font-mono text-[0.55rem] font-semibold uppercase tracking-[0.12em] ${humanGate ? "text-white/68" : "text-[#12d8ff]"}`}>
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <strong className="mt-3 block font-body text-sm font-semibold leading-tight">
                                {verb}
                              </strong>
                              <span className={`mt-1 block font-body text-xs leading-tight ${humanGate ? "text-white/84" : "text-[#eef7ff]/78"}`}>
                                {object}
                              </span>
                            </motion.div>
                            {index < activeRoute.steps.length - 1 ? (
                              <div className="relative z-0 hidden h-px flex-1 bg-[#d8ebfa]/20 sm:block">
                                <motion.span
                                  className="absolute inset-y-0 left-0 w-5 bg-[#12d8ff]"
                                  initial={false}
                                  animate={reduceMotion ? undefined : { x: [0, 36, 0] }}
                                  transition={reduceMotion ? undefined : { duration: 0.8, delay: index * 0.08, repeat: Infinity, ease: "linear" }}
                                />
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-start gap-3 border border-[#12d8ff]/38 bg-[#1957a8] px-4 py-4">
                      <BadgeCheck size={19} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[#12d8ff]" aria-hidden="true" />
                      <div>
                        <p className="font-body text-sm font-semibold text-white">Human approval stays in the loop.</p>
                        <p className="mt-1 font-body text-xs leading-relaxed text-[#eef7ff]/82">
                          AI suggestions remain tenant-scoped, source-linked, and attributable. No governed action publishes without the required owner decision.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#d8ebfa]/16 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-[#eef7ff]/82">
            Faster analysis. Clearer accountability. No black-box decisions.
          </p>
          <a
            href="/landing-2/ai.html"
            className="group inline-flex min-h-11 items-center gap-3 self-start font-body text-sm font-semibold text-white transition-colors hover:text-[#12d8ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12d8ff]"
          >
            Explore ComplyVerse AI
            <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
