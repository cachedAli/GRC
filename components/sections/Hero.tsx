"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function CompliVerseWaveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[8%] z-0 h-[92%] overflow-hidden"
    >
      <svg
        viewBox="0 0 1600 620"
        preserveAspectRatio="xMidYMid slice"
        className="absolute -left-[2%] top-0 h-full w-[104%]"
      >
        <defs>
          <linearGradient id="cv-ribbon-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#12d8ff" stopOpacity="0.08" />
            <stop offset="0.58" stopColor="#0057ff" stopOpacity="0.2" />
            <stop offset="1" stopColor="#143d9a" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="cv-ribbon-middle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b77cf" stopOpacity="0.1" />
            <stop offset="0.55" stopColor="#0057ff" stopOpacity="0.17" />
            <stop offset="1" stopColor="#12d8ff" stopOpacity="0.07" />
          </linearGradient>
          <linearGradient id="cv-ribbon-bottom" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#16d7f4" stopOpacity="0.28" />
            <stop offset="0.58" stopColor="#0a3f9c" stopOpacity="0.34" />
            <stop offset="1" stopColor="#151f66" stopOpacity="0.38" />
          </linearGradient>
        </defs>

        <g transform="translate(90 0)">
          <path
            d="M -40 360 C 75 380 296 324 502 170 C 724 22 1008 15 1350 101 C 1408 116 1441 151 1426 250 C 1118 143 878 154 650 259 C 412 369 75 430 -40 360 Z"
            fill="url(#cv-ribbon-top)"
          />
          <path
            d="M -55 405 C 70 420 380 417 646 290 C 903 157 1177 184 1537 318 L 1450 406 C 1168 296 969 301 759 407 C 430 500 70 495 -55 405 Z"
            fill="url(#cv-ribbon-middle)"
            transform="translate(0 -14)"
          />
          <path
            d="M -40 412 C 60 430 482 486 760 390 C 1000 308 1210 320 1405 380 C 1463 395 1496 478 1480 525 C 1255 464 1040 474 850 516 C 660 558 60 505 -40 412 Z"
            fill="url(#cv-ribbon-bottom)"
            transform="translate(0 10)"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-b-[34px] bg-[#000414] text-white md:rounded-b-[54px]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,87,255,0.36),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(18,216,255,0.14),transparent_30%),linear-gradient(180deg,#000414_0%,#020824_50%,#0057ff_78%,#b9c9ff_100%)]"
      />

      <CompliVerseWaveBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end px-6 pb-10 pt-40 text-center sm:pb-12 md:px-8 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#c8f3ff]">
            Connected GRC operations
          </div>
          <h1
            id="hero-headline"
            className="font-display text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl md:text-6xl"
          >
            Turn framework requirements into connected GRC work
          </h1>
          <div className="mx-auto mt-5 max-w-2xl font-body text-base font-medium leading-7 text-white/90 sm:text-lg md:text-lg">
            Map requirements to reusable controls, assign ownership, link
            supporting evidence, connect risks and actions, and keep the full
            history ready for review and reporting.
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/request-demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#000414] shadow-[0_18px_42px_-22px_rgba(255,255,255,0.9)] transition hover:bg-[#dff7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Request Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {/* <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white/82 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
            >
              See How It Works
            </Link> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
