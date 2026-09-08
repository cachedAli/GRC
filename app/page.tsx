import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FrameworkMarquee from "@/components/home/FrameworkMarquee";
import CapabilityGrid from "@/components/home/CapabilityGrid";
import CapabilityCatalogue from "@/components/home/CapabilityCatalogue";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import ModuleExplorer from "@/components/home/ModuleExplorer";
import LinkageGraph from "@/components/home/LinkageGraph";
import StageCards from "@/components/home/StageCards";
import { Articles, FinalCta } from "@/components/home/BuiltForYou";
import { RevealOnScroll } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Hero />
      <FrameworkMarquee />
      <CapabilityGrid />
      <CapabilityCatalogue />
      <IntegrationsSection />
      <ModuleExplorer />
      <LinkageGraph />
      <StageCards />
      <Articles />
      <FinalCta />
    </>
  );
}
