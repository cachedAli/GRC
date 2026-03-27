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

export default function Home() {
  return (
    <>
      <Hero />
      <HeroStrip />
      <SectionDivider variant="dots" />
      <LogoBar />
      <SectionDivider variant="rule" />
      <Stats />
      <SectionDivider variant="rule" />
      <Problem />
      <SectionDivider variant="diamonds" />
      <Features />
      <ProductTour />
      <SectionDivider variant="rule" />
      <CompareTable />
      <SectionDivider variant="rule" />
      <HowItWorks />
      <div
        className=""
        style={{ clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 100%)" }}
      >
        <div className="pt-8">
          <Frameworks />
        </div>
      </div>
      <SectionDivider variant="rule" />
      {/* <Testimonials /> */}
      <SectionDivider variant="diamonds" />
      <CTA />
    </>
  );
}
