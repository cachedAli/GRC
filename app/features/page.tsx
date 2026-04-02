"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ClipboardCheck,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { featureModules } from "@/components/features/featureCatalog";

const defaultOpen: Record<string, string> = {
  governance: "01",
  risk: "01",
  compliance: "01",
};

const moduleMeta: Record<
  string,
  { icon: React.ReactNode; chip: string; tabActive: string }
> = {
  governance: {
    icon: <ShieldCheck className="h-4 w-4" />,
    chip: "Policy + Oversight",
    tabActive:
      "bg-linear-to-r from-green-dark via-green to-teal text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)]",
  },
  risk: {
    icon: <AlertTriangle className="h-4 w-4" />,
    chip: "Risk + Treatment",
    tabActive:
      "bg-linear-to-r from-green-dark via-green to-teal text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)]",
  },
  compliance: {
    icon: <ClipboardCheck className="h-4 w-4" />,
    chip: "Controls + Evidence",
    tabActive:
      "bg-linear-to-r from-green-dark via-green to-teal text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)]",
  },
};

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<
    "governance" | "risk" | "compliance"
  >("governance");
  const [openByModule, setOpenByModule] = useState(defaultOpen);

  const activeModule = useMemo(
    () => featureModules.find((module) => module.id === activeTab)!,
    [activeTab],
  );

  const toggleFeature = (featureId: string) => {
    setOpenByModule((prev) => {
      const currentOpen = prev[activeTab];
      return {
        ...prev,
        [activeTab]: currentOpen === featureId ? "" : featureId,
      };
    });
  };

  return (
    <main className="min-h-screen bg-bg">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="rounded-3xl border border-green/20 bg-white p-2 shadow-[0_12px_34px_rgba(6,95,70,0.08)]">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {featureModules.map((module) => {
              const isActive = activeTab === module.id;
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveTab(module.id)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                    isActive
                      ? moduleMeta[module.id].tabActive
                      : "bg-bg text-gray-700 hover:bg-green/10"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold md:text-base">
                    {moduleMeta[module.id].icon}
                    {module.tabLabel}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-green/10 text-green-dark"
                    }`}
                  >
                    {module.features.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-green/20 bg-white p-6 shadow-[0_14px_36px_rgba(6,95,70,0.08)] md:p-8">
          <div className="mb-7 border-b border-green/15 pb-5">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-dark">
              {moduleMeta[activeModule.id].icon}
              {moduleMeta[activeModule.id].chip}
            </div>
            <h2 className="font-poppins text-3xl font-semibold text-gray-900">
              {activeModule.title}
            </h2>
            <p className="mt-2 text-base text-gray-600">
              {activeModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {activeModule.features.map((feature) => {
              const isOpen = openByModule[activeTab] === feature.id;
              return (
                <article
                  key={feature.id}
                  className="overflow-hidden rounded-2xl border border-green/20 bg-bg shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFeature(feature.id)}
                    className="w-full px-5 py-5 text-left transition-colors hover:bg-green/5 md:px-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="mb-2 inline-flex rounded-full border border-green/25 bg-white px-2.5 py-1 text-xs font-semibold text-green-dark">
                          Feature {feature.id}
                        </span>
                        <h3 className="font-poppins text-xl font-semibold text-gray-900 md:text-2xl">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
                          {feature.preview}
                        </p>
                      </div>
                      <ChevronDown
                        className={`mt-2 h-5 w-5 shrink-0 text-green-dark transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-green/20 bg-white"
                      >
                        <div className="grid gap-5 px-5 py-5 md:px-6 md:py-6">
                          <section className="rounded-xl border border-green/20 bg-linear-to-r from-green/10 to-teal/10 p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-green-dark">
                              AI Capability
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
                              {feature.capability}
                            </p>
                          </section>

                          <section className="rounded-xl border border-green/15 bg-bg p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-green-dark">
                              Sub-Features
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {feature.subFeatures.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-green/20 bg-white px-3 py-1 text-xs font-medium text-gray-700"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </section>

                          <section className="rounded-xl border border-teal/25 bg-teal/8 p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-green-dark">
                              Real-World Example
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
                              {feature.example}
                            </p>
                          </section>

                          <section className="rounded-xl border border-green/30 bg-green/12 p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-green-dark">
                              Business Value
                            </h4>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800 md:text-base">
                              {feature.businessValue}
                            </p>
                          </section>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
