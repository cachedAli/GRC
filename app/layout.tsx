import type { Metadata } from "next";
import {
  Inter,
  Montserrat,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
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
        className={`${montserrat.variable} ${inter.variable} ${sourceSerif.variable} font-body bg-[#fbfdfc] text-[#0A0A0A] antialiased`}
      >
        <ConditionalNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
