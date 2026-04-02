"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We evaluated six GRC platforms over three months. ComplyVerse was the only one that covered ERM, compliance, audit, AND had meaningful AI — not just dashboard widgets.",
    name: "Sarah K.",
    role: "CISO",
    company: "Regional Bank",
    initials: "SK",
  },
  {
    quote:
      "The cross-framework control mapping alone saved us hundreds of hours. We mapped ISO 27001 to SOC 2 in minutes instead of months. This changes the game.",
    name: "Michael R.",
    role: "Head of Compliance",
    company: "Fintech",
    initials: "MR",
  },
  {
    quote:
      "The evidence AI is genuinely impressive — it reads our policies, maps them to framework clauses, and gives us confidence scores. Our auditors were blown away.",
    name: "Amira L.",
    role: "GRC Manager",
    company: "Healthcare",
    initials: "AL",
  },
  {
    quote:
      "We run ISO 27001 and SOC 2 simultaneously. The cross-mapping alone saved us hundreds of hours every year. I genuinely recommend it to every security leader I know.",
    name: "Priya M.",
    role: "Compliance Manager",
    company: "Strata Health",
    initials: "PM",
  },
  {
    quote:
      "The automated control testing cut our audit prep from six weeks to eight days. Our external auditors asked which platform we were using — that says everything.",
    name: "Sofia K.",
    role: "Head of Security & Compliance",
    company: "Meridian Labs",
    initials: "SK",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 460 : -460,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 md:py-28 rounded-xl px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(32,32,204,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-18 blur-3xl"
        style={{ background: "#A8E6FF" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-16 w-72 h-72 rounded-full opacity-12 blur-3xl"
        style={{ background: "#BAE6FD" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs text-[#2020CC] font-semibold uppercase tracking-wide mb-4">
              What People Say
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] leading-tight">
              Trusted by GRC professionals.
            </h2>
          </div>
          {/* Arrow buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#2020CC" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#1414A0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#2020CC")
              }
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#2020CC" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#1414A0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#2020CC")
              }
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 px-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="w-[88vw] sm:w-[75vw] md:w-[420px] shrink-0 grow-0 snap-center rounded-2xl p-6 md:p-8 flex flex-col"
              style={{ background: "#EEF0FF" }}
            >
              {/* Company label */}
              <p className="font-mono text-xs font-semibold text-[#2020CC] uppercase tracking-widest mb-5">
                {t.company}
              </p>

              {/* Quote */}
              <p className="font-body text-base text-[#1A1A4E] leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#8B8FE8" }}
                >
                  <span className="font-body text-xs font-bold text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#0A0A0A]">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
