"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const productLinks = [
    { label: "Features", href: "/features" },
    { label: "Product Tour", href: "/#tour" },
    { label: "Frameworks", href: "/#frameworks" },
  ];

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
                {["Contact", "Terms of Service"].map((l) => (
                  <li key={l}>
                    {l === "Contact" ? (
                      <a
                        href="mailto:hello@complyverse.io"
                        className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                      >
                        {l}
                      </a>
                    ) : (
                      <Link
                        href="/terms"
                        className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                      >
                        {l}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body font-semibold text-[#0A0A0A] text-base mb-3">
                Product
              </h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                    >
                      {link.label}
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
              width={160}
              height={42}
              className="mb-6"
              priority
            />

            <div className="space-y-1 mb-6">
              <a
                href="mailto:Liztek@liztek.ca"
                className="block font-body text-base text-[#021a48] hover:underline"
              >
                Liztek@liztek.ca
              </a>
              <a
                href="tel:+12896358816"
                className="block font-body text-base text-[#021a48] hover:underline"
              >
                +1 (289) 635-8816
              </a>
            </div>

            <div className="font-body text-sm text-[#9CA3AF] leading-relaxed mb-8">
              <p className="font-medium text-[#6B7280]">Compliwerse Inc.</p>
              <p>2192 Heidi Ave,</p>
              <p>Burlington, ON L7M 3W5</p>
            </div>

            <p className="font-body text-sm text-[#9CA3AF]">
              &copy; 2026 CompliVerse. All rights reserved.
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col lg:flex-row items-start gap-10 md:gap-16">
          {/* Left — big blue circle with nav links inside */}
          <div className="relative shrink-0 flex items-center justify-center lg:justify-start w-full lg:w-auto">
            {/* Green blob behind circle, top-left */}
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full bg-green-200 opacity-70 pointer-events-none" />
            {/* Teal blob behind circle, bottom-right */}
            <div className="absolute -bottom-10 right-4 w-44 h-44 rounded-full bg-bg-mint opacity-60 pointer-events-none" />

            {/* The circle */}
            <div className="relative w-80 h-80 sm:w-100 sm:h-100 md:w-125 md:h-125 rounded-full bg-linear-to-br from-green-dark via-green to-teal border border-green-900 flex items-center justify-center mx-auto lg:mx-0 z-10">
              <div className="flex gap-5 sm:gap-8 px-5 sm:px-8">
                {/* Company */}
                <div>
                  <h3 className="font-body font-semibold text-white text-base mb-3">
                    Company
                  </h3>
                  <ul className="space-y-2">
                    {["Contact", "Terms of Service"].map((l) => (
                      <li key={l}>
                        {l === "Contact" ? (
                          <a
                            href="mailto:hello@complyverse.io"
                            className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {l}
                          </a>
                        ) : (
                          <Link
                            href="/terms"
                            className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {l}
                          </Link>
                        )}
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
                      {productLinks.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="font-body text-xs sm:text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {link.label}
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
                className="block font-body text-base sm:text-lg text-[#021a48] hover:underline"
              >
                Liztek@liztek.ca
              </a>
              <a
                href="tel:+12896358816"
                className="block font-body text-base sm:text-lg text-[#021a48] hover:underline"
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

            {/* Copyright */}
            <p className="font-body text-sm text-[#9CA3AF]">
              &copy; 2026 CompliVerse. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-4 mt-3">
              {["Terms of Service"].map((item) =>
                item === "Terms of Service" ? (
                  <Link
                    key={item}
                    href="/terms"
                    className="font-body text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="font-body text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
