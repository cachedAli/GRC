import type { Metadata } from "next";
import {
  Poppins,
  Inter,
  JetBrains_Mono,
  Exo,
  Noto_Serif,
} from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "CompliVerse AI — GRC Platform for Modern Security Teams",
  description:
    "CompliVerse AI brings your risk registers, audit workflows, and framework mappings into one place. The GRC platform built for modern security teams.",
  icons: {
    icon: "/compliwerseIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${notoSerif.variable} ${exo.variable} font-noto-serif bg-[#fbfdfc] text-[#0A0A0A] antialiased`}
      >
        <ConditionalNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
