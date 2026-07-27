"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-b-[34px] bg-[#000414] text-white md:rounded-b-[54px]">
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,87,255,0.36),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(18,216,255,0.14),transparent_30%),linear-gradient(180deg,#000414_0%,#020824_50%,#0057ff_78%,#b9c9ff_100%)]"
      />

      <motion.div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#12d8ff]/30"
            style={{
              width: `${Math.random() * 10 + 20}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `-${Math.random() * 20 + 5}%`,
            }}
            animate={{
              x: [`0`, `120vw`],
              y: [`0`, `${Math.random() * 40 - 20}px`],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20 + Math.random() * 15,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-[22%] z-0 h-[270px] mask-fade-edges md:top-[24%]">
        <motion.div
          className="absolute left-1/2 top-1/2 h-36 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0057ff]/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end px-6 pb-20 pt-40 text-center sm:pb-24 md:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#c8f3ff]">
            Governance without drift
          </p>
          <h1
            id="hero-headline"
            className="font-display text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl md:text-7xl"
          >
            Manage governance without the chaos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-white/78 sm:text-lg md:text-xl">
            Keep teams aligned, policies on track, and risks in check with one
            control plane for modern GRC operations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/request-demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#000414] shadow-[0_18px_42px_-22px_rgba(255,255,255,0.9)] transition hover:bg-[#dff7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Request Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#tour"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white/82 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
            >
              Watch Tour
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
