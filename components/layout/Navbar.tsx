"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Governance", href: "/governance" },
  { label: "Risk", href: "/risk" },
  { label: "Compliance", href: "/compliance" },
  { label: "Frameworks", href: "/#frameworks" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 font-body text-xs font-semibold text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12d8ff]/70 xl:px-4"
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }

      const headline = document.getElementById("hero-headline");
      if (!headline) {
        setScrolled(window.scrollY > 170);
        return;
      }

      const headlineTop = headline.getBoundingClientRect().top;
      setScrolled(headlineTop <= 112);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 text-white sm:px-5">
        <div
          className={`relative mx-auto h-14 max-w-[1500px] rounded-full transition-all duration-500 md:h-16 ${
            scrolled
              ? "border border-[#12d8ff]/20 bg-[#000414]/82 shadow-[0_18px_54px_-30px_rgba(18,216,255,0.8)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            aria-label="CompliVerse home"
            className="absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2.5 sm:left-0 md:left-2"
          >
            <Image
              src="/compliwerseLogo.png"
              alt="CompliVerse"
              width={154}
              height={40}
              priority
              className="h-auto w-[8.5rem] sm:w-40"
            />
          </Link>

          <div
            className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-full px-2 lg:flex ${
              scrolled
                ? "border border-transparent bg-transparent shadow-none backdrop-blur-none"
                : "border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
            }`}
          >
            {navLinks.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>

          <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
            <a
              href="#"
              className="rounded-full px-3 py-2 font-body text-sm font-bold text-white transition hover:text-[#12d8ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12d8ff]/70"
            >
              Login
            </a>
            <Link
              href="/request-demo"
              className="rounded-full bg-white px-5 py-2.5 font-body text-sm font-bold text-[#000414] transition hover:bg-[#dff7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Request Demo
            </Link>
          </div>

          <button
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full p-2 text-white transition hover:text-[#12d8ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12d8ff]/70 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#000414] px-6 text-white md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-2xl font-bold text-white transition hover:text-[#12d8ff]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-body text-lg font-semibold text-white/80 transition hover:text-[#12d8ff]"
            >
              Login
            </a>
            <Link
              href="/request-demo"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-white px-8 py-3.5 font-body text-base font-bold text-[#000414] transition hover:bg-[#dff7ff]"
            >
              Request Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
