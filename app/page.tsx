"use client";

import Hero from "@/components/sections/Hero";
import HeroStrip from "@/components/sections/HeroStrip";
import LogoBar from "@/components/sections/LogoBar";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import ProductTour from "@/components/sections/ProductTour";
import CompareTable from "@/components/sections/CompareTable";
import HowItWorks from "@/components/sections/HowItWorks";
import Frameworks from "@/components/sections/Frameworks";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import SectionDivider from "@/components/ui/SectionDivider";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { LayoutGroup } from "framer-motion";
import Solutions from "@/components/sections/Solutions";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const [moveLogo, setMoveLogo] = useState(false);
  const [homeAnimationKey, setHomeAnimationKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Adding useSpring here gives you "transition control" so the scroll feels buttery smooth!
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const marginX = useTransform(
    smoothProgress,
    [0.1, 0.2, 0.4, 1],
    ["48px", "0px", "0px", "48px"],
  );
  const borderRadius = useTransform(
    smoothProgress,
    [0.1, 0.2, 0.4, 1],
    ["40px", "0px", "0px", "40px"],
  );

  useEffect(() => {
    setHomeAnimationKey((current) => current + 1);
    setMoveLogo(false);

    const timer = setTimeout(() => {
      setMoveLogo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <LayoutGroup key={homeAnimationKey}>
        <Navbar key={`home-navbar-${homeAnimationKey}`} moveLogo={moveLogo} />
        <Hero key={`home-hero-${homeAnimationKey}`} moveLogo={moveLogo} />
      </LayoutGroup>
      {/* <HeroStrip /> */}
      {/* <LogoBar /> */}

      <SectionDivider variant="dots" />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{
          marginLeft: marginX,
          marginRight: marginX,
          borderRadius: borderRadius,
        }}
        className=" mt-10 bg-linear-to-br from-green-dark via-green to-teal border-b-[6px] border border-green-900 pt-20"
      >
        <Problem />
        <Solutions />
      </motion.div>
      {/* <Stats />
      <SectionDivider variant="rule" />
      <SectionDivider variant="diamonds" /> */}
      <Features />
      <Frameworks />
      <ProductTour />
      {/* <SectionDivider variant="rule" /> */}
      {/* <CompareTable /> */}
      {/* <SectionDivider variant="rule" /> */}
      {/* <HowItWorks /> */}
      {/* <div
        className=""
        style={{ clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 100%)" }}
      >
        <div className="pt-8">
          <Frameworks />
        </div>
      </div> */}
      {/* <SectionDivider variant="rule" /> */}
      {/* <Testimonials /> */}
      {/* <SectionDivider variant="diamonds" /> */}
      <CTA />
    </>
  );
}
