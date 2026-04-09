"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, Activity, ShieldCheck, PieChart } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
}

const featuresData: Feature[] = [
  {
    id: 1,
    title: "Smart Policy & Governance",
    description:
      "Create, manage, and update policies with clarity and control.",
    imageSrc: "/screenshots/slide_10.png",
    icon: <FileText className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "AI Risk Intelligence",
    description: "Identify, assess, and prioritize risks instantly.",
    imageSrc: "/screenshots/slide_22.png",
    icon: <Activity className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: "Compliance & Audit Readiness",
    description: "Stay audit-ready with structured reporting and evidence.",
    imageSrc: "/screenshots/slide_05.png",
    icon: <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "AI Insights & Executive Visibility",
    description:
      "Get real-time insights and decisions without digging through data.",
    imageSrc: "/screenshots/slide_75.png",
    icon: <PieChart className="w-7 h-7" strokeWidth={1.5} />,
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which feature is active based on scroll (0 to 1)
    const step = 1 / featuresData.length;
    const index = Math.min(featuresData.length - 1, Math.floor(latest / step));
    setActiveFeature(index);
  });

  return (
    // Make the container tall enough to scroll through 4 items
    <section
      ref={containerRef}
      className="bg-bg relative h-[300vh] border-t border-b border-gray-100 my-16 md:mt-24"
    >
      <div className=" px-4 text-center w-full">
        <h2 className="text-4xl font-semibold text-gray-900 font-poppins mt-3">
          Everything you need
        </h2>
        <p className="text-lg font-medium max-w-2xl mx-auto text-gray-600 mt-4">
          From policy creation to audit readiness, Complyverse connects the dots
          across your entire governance lifecycle.
        </p>
      </div>
      {/* Sticky inner container that stays on screen while scrolling */}
      <div className="sticky top-0 min-h-screen h-auto py-12 md:pt-24 w-full flex items-center justify-center overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left Side: Image Displays */}
          <div className="w-full md:w-[40%] flex items-center justify-center py-10 md:py-0">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[580px] rounded-[40px] overflow-hidden bg-linear-to-br from-green-dark via-green to-teal border-b-[6px] border border-green-900 shadow-2xl flex items-center justify-end p-0">
              {/* Glass/blur gradient overlay effect (optional, makes it look premium) */}
              <div className="absolute inset-0 bg-linear-to-b from-white/10 to-black/20 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-[90%] h-[55%] bg-white/40 shadow-2xl rounded-l-[32px] border-y border-l border-white/60 overflow-hidden backdrop-blur-md"
                >
                  <Image
                    src={featuresData[activeFeature].imageSrc}
                    alt={featuresData[activeFeature].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-left-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: 2x2 Text Grid */}
          <div className="w-full md:w-[60%] flex flex-col justify-center py-4 md:py-0">
            {/* Header for context, optional but helps anchor the section */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-12 lg:gap-y-6 relative">
              {featuresData.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    // We can also let users click to jump to the feature, but scroll primarily controls it
                    className="relative p-6 lg:p-8 rounded-[32px] cursor-pointer group flex flex-col justify-start"
                  >
                    {/* Animated Background / Border that moves to the active item */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureBackground"
                        className="absolute inset-0 border-[2px] border-green bg-green/5 shadow-[0_4px_30px_rgba(1,69,123,0.1)] rounded-[32px] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                      />
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className={`mb-5 transition-colors duration-300 ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <h3
                        className={`text-xl lg:text-2xl font-semibold font-poppins mb-3 transition-colors duration-300 ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-800"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-[17px] leading-relaxed transition-colors duration-300 ${
                          isActive
                            ? "text-gray-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 px-6 w-full flex justify-end">
              <Link
                href="/features"
                className="text-lg font-semibold bg-transparent text-[#01457b] border border-[#01457b] px-6 py-4 rounded-full hover:bg-[#008abe]  hover:text-white transition-colors focus-visible:outline-none cursor-pointer "
              >
                View All Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
