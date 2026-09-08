import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";
import FrameworkGuideView from "@/components/frameworks/FrameworkGuideView";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(FRAMEWORK_GUIDES).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const g = FRAMEWORK_GUIDES[params.slug];
  if (!g) return { title: "Framework guides", robots: { index: false } };
  return createMetadata({
    title: `${g.name} compliance guide`,
    description: g.overview,
    path: `/frameworks/${g.slug}`,
  });
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
