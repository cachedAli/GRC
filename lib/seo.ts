import type { Metadata } from "next";

type SeoMetadata = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
}: SeoMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Compliverse AI",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
