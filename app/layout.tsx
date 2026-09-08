import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ComplyChat from "@/components/chat/ComplyChat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.compliverse.ai"),
  title: {
    default: "Compliverse AI, Compliance that proves itself",
    template: "%s | Compliverse AI",
  },
  description:
    "Every framework, document, control, risk and piece of evidence in one connected system. Governance, risk and compliance on a single data model, with the links between them mapped for you.",
  applicationName: "Compliverse AI",
  creator: "Compliverse AI",
  publisher: "Compliverse AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Compliverse AI",
    title: "Compliverse AI, Compliance that proves itself",
    description:
      "Every framework, document, control, risk and piece of evidence in one connected system. Governance, risk and compliance on a single data model, with the links between them mapped for you.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Compliverse AI, Compliance that proves itself",
    description:
      "Every framework, document, control, risk and piece of evidence in one connected system.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compliverse AI",
  alternateName: "Compliverse",
  url: "https://www.compliverse.ai/",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compliverse AI",
  alternateName: "Compliverse",
  url: "https://www.compliverse.ai/",
  logo: "https://www.compliverse.ai/logo/complyverse-mark.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrains.variable} ${sourceSerif.variable} font-body bg-[linear-gradient(180deg,#cfeee5_0px,#dcf4ed_70px,#e9faf5_150px,#ffffff_340px)] text-[#1e293b] antialiased`}
      >
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <ComplyChat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
