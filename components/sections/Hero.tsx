"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ moveLogo }: { moveLogo: boolean }) {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen h-auto bg-[#F0FDFB]   overflow-hidden flex-col flex items-center justify-center max-md:px-6  pt-14 sm:pt-16">
      {!moveLogo && (
        <motion.div
          layout
          layoutId="logo"
          initial={{ rotate: 90, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Image
            src="/compliwerseIcon.png"
            alt="Compliwerse"
            width={45}
            height={40}
            priority
          />
        </motion.div>
      )}

      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
        className="w-full border px-4 py-8   border-gray-300 bg-linear-to-b from-[#10B981] via-[#14B8A6]/80 to-[#F0FDFB] h-full absolute top-0 left-0 rounded-b-[70px]"
      ></motion.div>

      <motion.div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full "
            style={{
              width: `${Math.random() * 10 + 20}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `-${Math.random() * 20 + 5}%`, // start slightly offscreen left
            }}
            animate={{
              x: [`0`, `120vw`], // move across the screen to the right
              y: [`0`, `${Math.random() * 40 - 20}px`], // slight vertical drift
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

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
          height: 0,
          overflow: "hidden",
        }}
        animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
        transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
        className="z-10"
      >
        <Image
          src="/screenshots/slide_01.png"
          alt="hero"
          width={580}
          height={130}
          className="object-cover select-none rounded-lg mt-16"
        />
      </motion.div>

      <div className="flex flex-col gap-2 z-10 font-poppins items-center justify-center mt-6 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold flex flex-wrap justify-center gap-[0.25em]">
          {["Manage", "governance"].map((word, index) => (
            <motion.span
              key={`l1-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 2.1 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <h1 className="text-4xl md:text-5xl font-semibold flex flex-wrap justify-center gap-[0.25em]">
          {["without", "the", "chaos"].map((word, index) => (
            <motion.span
              key={`l2-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 2.1 + (2 + index) * 0.15, // Continue delay where the first line left off
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`inline-block ${
                word === "chaos" ? "text-[#065F46] font-exo italic" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      <motion.div
        className="w-full px-4 md:px-19.5 py-12 flex flex-col md:flex-row items-center justify-between z-10 gap-6 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 3.1, // Wait for the headline words to finish
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <p className="text-xl font-medium max-w-96">
          Keep your teams aligned, your policies on track, and your risks in
          check.
        </p>

        <div className="flex items-center gap-2 font-noto-serif">
          <Link
            href="/request-demo"
            className="text-lg font-semibold bg-[#065F46] text-white px-6 py-4 rounded-full hover:bg-[#054c38] transition-colors focus-visible:outline-none cursor-pointer font-noto-serif whitespace-nowrap"
          >
            Request a Demo
          </Link>

          <button className="text-lg font-semibold bg-transparent text-[#065F46] border border-[#065F46] px-6 py-4 rounded-full hover:bg-[#065F46] hover:text-white transition-colors focus-visible:outline-none cursor-pointer whitespace-nowrap">
            Watch Tour
          </button>
        </div>
      </motion.div>
    </section>
  );
}
