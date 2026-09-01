import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";
import FrameworkGuideView from "@/components/frameworks/FrameworkGuideView";

export function generateStaticParams() {
  return Object.keys(FRAMEWORK_GUIDES).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const g = FRAMEWORK_GUIDES[params.slug];
  if (!g) return { title: "Frameworks, Compliverse AI" };
  return {
    title: `${g.name} guide, Compliverse AI`,
    description: g.overview,
  };
}

export default function FrameworkGuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const g = FRAMEWORK_GUIDES[params.slug];
  if (!g) notFound();
  return <FrameworkGuideView guide={g} />;
}
