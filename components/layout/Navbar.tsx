"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Platform", href: "/#tour" },
  { label: "AI Agents", href: "/#compare" },
  { label: "Frameworks", href: "/#frameworks" },
];

export default function Navbar({ moveLogo }: { moveLogo: boolean }) {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFullLogo, setShowFullLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);

    if (!moveLogo) {
      setShowFullLogo(false);
      return;
    }

    setShowFullLogo(false);
    const timer = setTimeout(() => setShowFullLogo(true), 420);
    return () => clearTimeout(timer);
  }, [moveLogo, pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-[calc(100%_-_1rem)] md:w-[90%] mx-auto text-white mt-3 md:mt-4 rounded-lg z-50 transition-all duration-500 delay-100 ${
          showFullLogo
            ? "bg-[#000414]/88 backdrop-blur-md shadow-[0_18px_48px_-28px_rgba(18,216,255,0.55)] border border-[#12d8ff]/22"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {moveLogo && (
              <motion.div
                layout={isHomeRoute}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                layoutId={isHomeRoute ? "logo" : undefined}
                onLayoutAnimationComplete={() => {
                  if (isHomeRoute) {
                    setShowFullLogo(true);
                  }
                }}
              >
                {!showFullLogo ? (
                  <Image
                    src="/compliwerseIcon.png"
                    alt="Compliwerse Icon"
                    width={55}
                    height={45}
                    priority
                  />
                ) : (
                  <Image
                    src="/compliwerseLogo.png"
                    alt="Compliwerse Logo"
                    width={160}
                    height={40}
                    priority
                  />
                )}
              </motion.div>
            )}
          </Link>

          {/* Desktop nav links — center */}
          <motion.div
            key={`desktop-links-${pathname}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: showFullLogo ? 1 : 0,
              y: showFullLogo ? 0 : -10,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm px-4 py-2 rounded-full text-white/78 hover:text-[#12d8ff] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm px-4 py-2 rounded-full text-white/78 hover:text-[#12d8ff] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ),
            )}
          </motion.div>

          {/* Right — Login + Get Started */}
          <motion.div
            key={`desktop-actions-${pathname}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: showFullLogo ? 1 : 0,
              y: showFullLogo ? 0 : -10,
            }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="hidden md:flex items-center gap-3"
          >
            <motion.a
              href="/request-demo"
              className="text-sm font-noto-serif font-semibold bg-[#0057ff] text-white px-6 py-2.5 rounded-full hover:bg-[#12d8ff] hover:text-[#000414] transition-colors focus-visible:outline-none "
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15 }}
            >
              Demo
            </motion.a>
            {/* <a
              href="#"
              className={`text-sm font-semibold bg-transparent text-white border border-[#12d8ff]/70 px-6 py-2.5 rounded-full hover:bg-[#12d8ff] hover:text-[#000414] transition-colors focus-visible:outline-none cursor-pointer `}
            >
              Login
            </a> */}
          </motion.div>

          {/* Mobile toggle */}
          <motion.button
            key={`mobile-toggle-${pathname}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: showFullLogo ? 1 : 0 }}
            className="md:hidden p-2 rounded transition-colors text-white hover:text-[#12d8ff]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#000414] flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-2xl font-bold text-white hover:text-[#12d8ff] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-2xl font-bold text-white hover:text-[#12d8ff] transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href="/#cta"
              onClick={() => setMenuOpen(false)}
              className="font-body text-base font-semibold bg-[#0057ff] text-white px-8 py-3.5 rounded-full mt-4 hover:bg-[#12d8ff] hover:text-[#000414] transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
