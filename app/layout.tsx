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
  title: "CompliVerse AI — Compliance that proves itself",
  description:
    "Upload any regulation. CompliVerse drafts the policies, maps the controls, assesses the evidence and hands you the gap list — every framework, one connected graph.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrains.variable} ${sourceSerif.variable} font-body bg-white text-[#1e293b] antialiased`}
      >
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <ComplyChat />
      </body>
    </html>
  );
}
