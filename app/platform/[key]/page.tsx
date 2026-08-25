import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULE_STORIES } from "@/data/modules";
import { CAPABILITY_PAGES } from "@/data/capabilityPages";
import CapabilityPageView from "@/components/platform/CapabilityPageView";

/** One page per module that has capability-page detail. */
export function generateStaticParams() {
  return MODULE_STORIES.filter((m) => CAPABILITY_PAGES[m.key]).map((m) => ({
    key: m.key,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { key: string };
}): Metadata {
  const story = MODULE_STORIES.find((m) => m.key === params.key);
  const page = story ? CAPABILITY_PAGES[story.key] : undefined;
  if (!story || !page) return { title: "Platform, Complyverse AI" };
  return {
    title: `${story.name}, Complyverse AI`,
    description: page.subtitle,
  };
}

export default function PlatformCapabilityPage({
  params,
}: {
  params: { key: string };
}) {
  const story = MODULE_STORIES.find((m) => m.key === params.key);
  if (!story || !CAPABILITY_PAGES[story.key]) notFound();
  return <CapabilityPageView story={story} />;
}
