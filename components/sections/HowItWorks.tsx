"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect your environment",
    description:
      "Link your existing tools — identity providers, ticketing systems, cloud environments. Compliwerse maps your data into a unified control library automatically.",
  },
  {
    number: "02",
    title: "Configure your frameworks",
    description:
      "Choose the frameworks that matter to your business. Our pre-built control mappings do the heavy lifting — you customize the parts specific to you.",
  },
  {
    number: "03",
    title: "Run your program",
    description:
      "Assign owners, collect evidence, manage audits, and track your compliance posture in real time. Your whole GRC program, in one place.",
  },
];

// Each step enters from a distinct direction
const slideIn = [
  { x: -60, y: 0 },
  { x: 0, y: 50 },
  { x: 60, y: 0 },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.25"],
  });
  const rawLineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const lineWidth = useSpring(rawLineWidth, { stiffness: 70, damping: 22 });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden rounded-xl"
      style={{ backgroundColor: "#2020CC" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Pink blob — top right */}
      <div
        className="absolute -top-24 -right-24 sm:-top-36 sm:-right-36 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#BAE6FD", opacity: 0.13 }}
      />
      {/* Cyan blob — bottom left */}
      <div
        className="absolute -bottom-16 -left-16 sm:-bottom-28 sm:-left-28 w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#A8E6FF", opacity: 0.1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10 pt-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-20 text-center"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-wide mb-4 text-white/50">
            The Process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
            Up and running in days, not months.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Track line (static) */}
          <div className="hidden md:block absolute top-[22px] left-[calc(16.66%)] right-[calc(16.66%)] h-0.5 bg-white/10" />
          {/* Animated progress line */}
          <div className="hidden md:block absolute top-[22px] left-[calc(16.66%)] right-[calc(16.66%)] h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-white/50"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: slideIn[i].x, y: slideIn[i].y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Number bubble — spring bounce on enter */}
                <motion.div
                  initial={{ scale: 0.25, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 16,
                    delay: i * 0.14,
                  }}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-6 z-10"
                  style={{ boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}
                >
                  <span className="font-mono text-sm font-bold text-[#2020CC]">
                    {step.number}
                  </span>
                </motion.div>

                {/* Title slides up separately */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12 + 0.15,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                  className="font-body text-lg font-semibold text-white mb-3"
                >
                  {step.title}
                </motion.h3>

                {/* Description fades in last */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12 + 0.28,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                  className="font-body text-[15px] text-white/60 leading-relaxed"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.55,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center mt-16"
        >
          <a
            href="/#cta"
            className="font-body text-[15px] font-semibold text-white/60 hover:text-white transition-colors"
          >
            See a full walkthrough →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
