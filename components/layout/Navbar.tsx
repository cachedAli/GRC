"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#tour" },
  { label: "Compare", href: "#compare" },
  { label: "Results", href: "#proof" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onHero = !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-[calc(100%-1rem)] md:w-[80%] mx-auto mt-3 md:mt-4 rounded-lg z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-t border-x border-[#E2E2DA]"
            : "bg-transparent border-t border-x border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${onHero ? "bg-white/20" : "bg-[#2020CC]"}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 2L25.5 8.5V19.5L14 26L2.5 19.5V8.5L14 2Z"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </div>
            <span
              className={`font-body font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${onHero ? "text-white" : "text-[#0A0A0A]"}`}
            >
              Compliwerse
            </span>
          </a>

          {/* Desktop nav links — center */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-body text-sm px-4 py-2 rounded-full transition-colors duration-200 ${
                  onHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#F5F5F0]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — Login + Get Started */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className={`font-body text-sm transition-colors duration-300 ${onHero ? "text-white/80 hover:text-white" : "text-[#6B7280] hover:text-[#0A0A0A]"}`}
            >
              Login
            </a>
            <motion.a
              href="#cta"
              className="font-body text-sm font-semibold bg-[#2020CC] text-white px-6 py-2.5 rounded-full hover:bg-[#1818a8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2020CC]"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15 }}
            >
              Demo
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded transition-colors ${onHero ? "text-white" : "text-[#0A0A0A]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-2xl font-bold text-[#0A0A0A] hover:text-[#2020CC] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="font-body text-base font-semibold bg-[#2020CC] text-white px-8 py-3.5 rounded-full mt-4"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
