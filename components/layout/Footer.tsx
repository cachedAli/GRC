"use client";

import { Linkedin, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 md:pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="md:hidden space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-body font-semibold text-[#0A0A0A] text-base mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                {[
                  "Contact",
                  "Design Partners",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href={
                        l === "Contact" ? "mailto:hello@complyverse.io" : "#"
                      }
                      className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body font-semibold text-[#0A0A0A] text-base mb-3">
                Product
              </h3>
              <ul className="space-y-2">
                {["Features", "Product Tour", "Frameworks"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-body font-semibold text-[#0A0A0A] text-base mb-3">
              Solutions
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                "Financial Services",
                "Healthcare",
                "Technology & SaaS",
                "Energy & Utilities",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Image
              src="/compliwerseLogo.png"
              alt="Compliwerse Logo"
              width={150}
              height={42}
              className="mb-6"
              priority
            />

            <div className="space-y-1 mb-6">
              <a
                href="mailto:Liztek@liztek.ca"
                className="block font-body text-base text-[#065F46] hover:underline"
              >
                Liztek@liztek.ca
              </a>
              <a
                href="tel:+12896358816"
                className="block font-body text-base text-[#065F46] hover:underline"
              >
                +1 (289) 635-8816
              </a>
            </div>

            <div className="font-body text-sm text-[#9CA3AF] leading-relaxed mb-8">
              <p className="font-medium text-[#6B7280]">Compliwerse Inc.</p>
              <p>2192 Heidi Ave,</p>
              <p>Burlington, ON L7M 3W5</p>
            </div>

            <div className="flex items-center gap-3 mb-8">
              {[
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
                { icon: <Twitter size={16} />, label: "Twitter" },
                { icon: <Facebook size={16} />, label: "Facebook" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#E2E2DA] bg-[#F9F9F7] flex items-center justify-center text-[#6B7280] hover:border-[#065F46] hover:text-[#065F46] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>

            <p className="font-body text-sm text-[#9CA3AF]">
              &copy; 2026 ComplyVerse. All rights reserved.
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col lg:flex-row items-start gap-10 md:gap-16">
          {/* Left — big blue circle with nav links inside */}
          <div className="relative shrink-0 flex items-center justify-center lg:justify-start w-full lg:w-auto">
            {/* Green blob behind circle, top-left */}
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full bg-[#99F6E4] opacity-70 pointer-events-none" />
            {/* Teal blob behind circle, bottom-right */}
            <div className="absolute -bottom-10 right-4 w-44 h-44 rounded-full bg-[#A7F3D0] opacity-60 pointer-events-none" />

            {/* The circle */}
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-linear-to-br from-green-dark via-green to-teal border border-green-900 flex items-center justify-center mx-auto lg:mx-0 z-10">
              <div className="flex gap-5 sm:gap-8 px-5 sm:px-8">
                {/* Company */}
                <div>
                  <h3 className="font-body font-semibold text-white text-base mb-3">
                    Company
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Contact",
                      "Design Partners",
                      "Privacy Policy",
                      "Terms of Service",
                    ].map((l) => (
                      <li key={l}>
                        <a
                          href={
                            l === "Contact"
                              ? "mailto:hello@complyverse.io"
                              : "#"
                          }
                          className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product + Solutions stacked */}
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-body font-semibold text-white text-base mb-3">
                      Product
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Features",
                        "Product Tour",
                        "Compare",
                        "Frameworks",
                      ].map((l) => (
                        <li key={l}>
                          <a
                            href="#"
                            className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-white text-base mb-3">
                      Industry
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Financial Services",
                        "Healthcare",
                        "Technology & SaaS",
                        "Energy & Utilities",
                      ].map((l) => (
                        <li key={l}>
                          <a
                            href="#"
                            className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — logo, contact, address, socials */}
          <div className="flex-1 lg:pt-20 pt-4 md:pt-8 w-full">
            {/* Logo */}
            <Image
              src="/compliwerseLogo.png"
              alt="Compliwerse Logo"
              width={150}
              height={42}
              className="mb-8"
              priority
            />

            {/* Contact links */}
            <div className="space-y-1 mb-6">
              <a
                href="mailto:Liztek@liztek.ca"
                className="block font-body text-base sm:text-lg text-[#065F46] hover:underline"
              >
                Liztek@liztek.ca
              </a>
              <a
                href="tel:+12896358816"
                className="block font-body text-base sm:text-lg text-[#065F46] hover:underline"
              >
                +1 (289) 635-8816
              </a>
            </div>

            {/* Address */}
            <div className="font-body text-sm text-[#9CA3AF] leading-relaxed mb-8">
               <p className="font-medium text-[#6B7280]">Liztek Consulting.</p>
              <p>2192 Heidi Ave,</p>
              <p>Burlington, ON L7M 3W5</p>
            </div>

            {/* Social icon circles */}
            <div className="flex items-center gap-3 mb-10">
              {[
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
                { icon: <Twitter size={16} />, label: "Twitter" },
                { icon: <Facebook size={16} />, label: "Facebook" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-[#E2E2DA] bg-[#F9F9F7] flex items-center justify-center text-[#6B7280] hover:border-[#065F46] hover:text-[#065F46] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="font-body text-sm text-[#9CA3AF]">
              &copy; 2026 ComplyVerse. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-4 mt-3">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
