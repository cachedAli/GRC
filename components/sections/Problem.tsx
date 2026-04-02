"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FileSpreadsheet, Clock, EyeOff, AlertTriangle } from "lucide-react";

interface Card {
  title: string;
  bg: string;
  rotation: number;
  offset: string;
}

const problemCards: Card[] = [
  {
    title: "Scattered data across spreadsheets and tools",
    bg: "bg-bg border-t-[6px] border-green-900",
    rotation: -12,
    offset: "left-[-5%] md:left-[25%] top-[30%] z-0",
  },
  {
    title: "Manual processes that waste time and cause errors",
    bg: "bg-bg border-b-[6px] border-green-900",
    rotation: 6,
    offset: "left-[10%] md:left-[30%] top-[5%] z-10",
  },
  {
    title: "No clear visibility into risks and compliance status",
    bg: "bg-bg border-b-[6px] border-green-900",
    rotation: -4,
    offset: "left-[30%] md:left-[50%] top-[40%] z-20",
  },
  {
    title: "Audits become stressful and unorganized",
    bg: "bg-bg border-t-[6px] border-green-900",
    rotation: 10,
    offset: "left-[50%] md:left-[55%] top-[10%] z-30",
  },
];

export default function Problem() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Set initially on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveCard(null);
      }
    };
    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  return (
    <section className=" px-4 sm:px-6 overflow-hidden flex items-center justify-center flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <h2 className="text-4xl font-semibold text-white font-poppins">
          Governance should not be this hard
        </h2>
        <p className="text-lg font-medium max-w-162.5 text-center text-bg">
          Managing compliance, risk, and policies across disconnected tools
          slows teams down and creates costly gaps
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative w-full max-w-7xl min-h-[500px] md:min-h-[600px] flex justify-center items-center scale-75 md:scale-100"
      >
        {problemCards.map((card, index) => {
          const isActive = isMobile && activeCard === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 150, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotation }}
              animate={
                isActive
                  ? { scale: 1.05, rotate: 0, zIndex: 39 }
                  : { scale: 1, rotate: card.rotation, zIndex: index * 10 }
              }
              onClick={() => isMobile && setActiveCard(isActive ? null : index)}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 39,
                      transition: {
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.2,
                      },
                    }
                  : {}
              }
              viewport={{ once: true, margin: "0px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
                delay: isMobile && activeCard !== null ? 0 : index * 0.15,
              }}
              className={`absolute flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-white border-2 ${card.bg} shadow-xl w-[320px] h-[220px] ${card.offset} cursor-pointer hover:shadow-2xl`}
              style={{
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
              }}
            >
              {/* <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                {card.icon}
              </div> */}
              <h3 className="font-poppins font-medium text-[20px] leading-snug text-center mt-2">
                {card.title}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
