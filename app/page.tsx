import Navbar from "@/components/layout/Navbar";
import CTA from "@/components/sections/CTA";
import ConnectedAssurance from "@/components/sections/ConnectedAssurance";
import Features from "@/components/sections/Features";
import FrameworkMarquee from "@/components/sections/FrameworkMarquee";
import Frameworks from "@/components/sections/Frameworks";
import Hero from "@/components/sections/Hero";
import ProductTour from "@/components/sections/ProductTour";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FrameworkMarquee />
      <ConnectedAssurance />
      <Features />
      <ProductTour />
      <Frameworks />
      <CTA />
    </>
  );
}
