import type { MetadataRoute } from "next";
import { CAPABILITY_PAGES } from "@/data/capabilityPages";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";
import { MODULE_STORIES } from "@/data/modules";

const SITE_URL = "https://www.compliverse.ai";

const staticRoutes = [
  "",
  "/platform",
  "/platform/assurance",
  "/frameworks",
  "/integrations",
  "/hosting",
  "/resources",
  "/resources/glossary",
  "/request-demo",
  "/governance",
  "/risk",
  "/compliance",
  "/roi",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const capabilityRoutes = MODULE_STORIES.filter(
    (story) =>
      CAPABILITY_PAGES[story.key] && story.key !== "vulnerabilities",
  ).map((story) => `/platform/${story.key}`);
  const frameworkRoutes = Object.keys(FRAMEWORK_GUIDES).map(
    (slug) => `/frameworks/${slug}`,
  );

  return [...staticRoutes, ...capabilityRoutes, ...frameworkRoutes].map(
    (route) => ({ url: `${SITE_URL}${route}` }),
  );
}
