"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuLink = {
  title: string;
  description: string;
  href: string;
};

type MenuGroup = {
  label: string;
  links: MenuLink[];
};

type NavItem = {
  label: string;
  href: string;
  summary?: string;
  groups?: MenuGroup[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Platform",
    href: "/platform",
    summary:
      "See how CompliVerse connects requirements, ownership, evidence, risk and review.",
    groups: [
      {
        label: "Explore the platform",
        links: [
          {
            title: "Platform overview",
            description:
              "Understand the connected system behind governance, risk and compliance work.",
            href: "/platform",
          },
          {
            title: "How it works",
            description:
              "Follow work from a framework requirement through evidence and review.",
            href: "/how-it-works",
          },
        ],
      },
      {
        label: "Platform capabilities",
        links: [
          {
            title: "ComplyChat and AI assistance",
            description:
              "Explore programme records and keep assisted outputs subject to review.",
            href: "/ai",
          },
          {
            title: "Reporting and audit readiness",
            description:
              "Bring controls, evidence, findings and review activity together.",
            href: "/platform/reporting-audit",
          },
          {
            title: "Workflow automation",
            description:
              "Coordinate assignments, reviews, approvals and recurring work.",
            href: "/platform/workflow-automation",
          },
        ],
      },
      {
        label: "Enterprise foundation",
        links: [
          {
            title: "Security and architecture",
            description:
              "Review the verified controls and boundaries behind the platform.",
            href: "/security",
          },
          {
            title: "Integrations",
            description:
              "Connect supported services to evidence and operating workflows.",
            href: "/integrations",
          },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/features",
    summary:
      "Explore the product modules used to operate compliance, governance and risk programmes.",
    groups: [
      {
        label: "Compliance and governance",
        links: [
          {
            title: "Controls and evidence",
            description:
              "Connect requirements to owned controls, testing work and evidence.",
            href: "/products/controls-evidence",
          },
          {
            title: "Governance and policy",
            description:
              "Manage document versions, reviews, approvals and attestations.",
            href: "/products/governance-policy",
          },
        ],
      },
      {
        label: "Risk management",
        links: [
          {
            title: "Enterprise risk and RCSA",
            description:
              "Assess enterprise risk, run self-assessments and manage treatment.",
            href: "/products/enterprise-risk",
          },
          {
            title: "Third-party risk",
            description:
              "Organize vendor review, evidence, findings and remediation.",
            href: "/products/third-party-risk",
          },
        ],
      },
      {
        label: "Operational assurance",
        links: [
          {
            title: "Security operations",
            description:
              "Track operational security records that support compliance work.",
            href: "/products/security-operations",
          },
          {
            title: "View all product capabilities",
            description:
              "Review the complete set of verified and developing capabilities.",
            href: "/features",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/compliance-teams",
    summary:
      "Find the CompliVerse workflow that matches your team or programme outcome.",
    groups: [
      {
        label: "By team",
        links: [
          {
            title: "Compliance teams",
            description:
              "Organize frameworks, controls, evidence, ownership and reviews.",
            href: "/solutions/compliance-teams",
          },
          {
            title: "Risk teams",
            description:
              "Assess, treat and monitor enterprise and third-party risk.",
            href: "/solutions/risk-teams",
          },
          {
            title: "Internal audit",
            description:
              "Review evidence, findings, actions and programme history.",
            href: "/solutions/internal-audit",
          },
          {
            title: "Security teams",
            description:
              "Connect security operations with controls, risk and evidence.",
            href: "/solutions/security-teams",
          },
        ],
      },
      {
        label: "By outcome",
        links: [
          {
            title: "Multi-framework programmes",
            description:
              "Relate requirements and reuse control work across frameworks.",
            href: "/solutions/multi-framework",
          },
          {
            title: "Audit preparation",
            description:
              "Bring evidence, control status and findings into reviewable packages.",
            href: "/solutions/audit-preparation",
          },
          {
            title: "Evidence operations",
            description:
              "Version, map and review evidence against control requirements.",
            href: "/solutions/evidence-operations",
          },
          {
            title: "Policy governance",
            description:
              "Manage policy review, approval, attestation and change history.",
            href: "/solutions/policy-governance",
          },
        ],
      },
    ],
  },
  {
    label: "Frameworks",
    href: "/frameworks",
    summary:
      "Browse global and regional framework catalogs by programme and region.",
    groups: [
      {
        label: "Global frameworks",
        links: [
          {
            title: "ISO/IEC 27001",
            description: "Information security management requirements.",
            href: "/frameworks/iso-27001",
          },
          {
            title: "PCI DSS",
            description: "Payment-card security requirements and evidence.",
            href: "/frameworks/pci-dss",
          },
          {
            title: "NIST CSF",
            description: "Cybersecurity outcomes, controls and risk context.",
            href: "/frameworks/nist-csf",
          },
        ],
      },
      {
        label: "Regional and assurance",
        links: [
          {
            title: "SAMA CSF",
            description: "Saudi financial-sector cybersecurity requirements.",
            href: "/frameworks/sama-csf",
          },
          {
            title: "SOC 2",
            description: "Trust Services Criteria control and evidence work.",
            href: "/frameworks/soc-2",
          },
          {
            title: "View framework library",
            description: "Explore the available framework catalog.",
            href: "/frameworks",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    summary:
      "Use practical reference material to understand the product and its framework vocabulary.",
    groups: [
      {
        label: "Learn",
        links: [
          {
            title: "Documentation",
            description: "Read product guidance and implementation references.",
            href: "/resources/documentation",
          },
          {
            title: "Framework guides",
            description:
              "Understand the standards and regulations represented in CompliVerse.",
            href: "/resources/framework-guides",
          },
          {
            title: "Compliance glossary",
            description:
              "Clarify the terms used across controls, risk, evidence and review.",
            href: "/resources/glossary",
          },
        ],
      },
      {
        label: "Explore",
        links: [
          {
            title: "Resource center",
            description: "Browse all available CompliVerse reference material.",
            href: "/resources",
          },
          {
            title: "Framework library",
            description: "Browse the available global and regional catalogs.",
            href: "/frameworks",
          },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    summary:
      "Learn what CompliVerse is building and speak with the team about your programme.",
    groups: [
      {
        label: "CompliVerse",
        links: [
          {
            title: "About",
            description: "Learn about the product direction and the company behind it.",
            href: "/about",
          },
          {
            title: "Contact",
            description: "Ask a product, partnership or company question.",
            href: "/contact",
          },
        ],
      },
      {
        label: "Talk to the team",
        links: [
          {
            title: "Request a demo",
            description: "Discuss your frameworks, workflows and programme needs.",
            href: "/request-demo",
          },
        ],
      },
    ],
  },
];

function DesktopNavItem({
  item,
  activeMenu,
  setActiveMenu,
}: {
  item: NavItem;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}) {
  const hasMenu = Boolean(item.groups?.length);
  const isOpen = activeMenu === item.label;

  if (!hasMenu) {
    return (
      <Link
        href={item.href}
        className="rounded-full px-3 py-2 font-body text-xs font-semibold text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12d8ff]/70 xl:px-4"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={() => setActiveMenu(item.label)}
      onFocus={() => setActiveMenu(item.label)}
      onClick={() => setActiveMenu(isOpen ? null : item.label)}
      aria-expanded={isOpen}
      aria-controls={"desktop-menu-" + item.label.toLowerCase()}
      className={
        "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 font-body text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12d8ff]/70 xl:px-4 " +
        (isOpen
          ? "bg-white/10 text-white"
          : "text-white/80 hover:text-white")
      }
    >
      {item.label}
      <ChevronDown
        size={14}
        strokeWidth={2.25}
        className={
          "transition-transform duration-200 " +
          (isOpen ? "rotate-180" : "rotate-0")
        }
        aria-hidden="true"
      />
    </button>
  );
}

function MegaMenu({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  if (!item.groups) return null;

  return (
    <motion.div
      id={"desktop-menu-" + item.label.toLowerCase()}
      role="region"
      aria-label={item.label + " menu"}
      initial={{ opacity: 0, y: -8, scale: 0.992 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.992 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-[calc(100%+0.85rem)] hidden w-[min(calc(100vw-2.5rem),1420px)] -translate-x-1/2 overflow-hidden rounded-[20px] bg-white text-[#12202B] shadow-[0_30px_90px_-38px_rgba(18,32,43,0.42)] lg:block"
    >
      <div className="grid min-h-[340px] grid-cols-[250px_minmax(0,1fr)]">
        <aside className="flex flex-col border-r border-[#1D47B5] bg-[#2457D6] p-7 text-white">
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
            {item.label}
          </div>
          <div className="mt-5 max-w-[185px] font-body text-[13px] font-medium leading-[1.65] text-white/90">
            {item.summary}
          </div>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="mt-auto inline-flex items-center gap-2 rounded-md font-body text-sm font-bold text-white transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            View {item.label.toLowerCase()}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <div
          className="grid gap-x-7 p-7 xl:p-8"
          style={{
            gridTemplateColumns:
              "repeat(" + item.groups.length + ", minmax(0, 1fr))",
          }}
        >
          {item.groups.map((group) => (
            <section key={group.label}>
              <h3 className="px-3 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#607080]">
                {group.label}
              </h3>
              <div className="mt-3 space-y-1.5">
                {group.links.map((link) => (
                  <Link
                    key={group.label + "-" + link.title}
                    href={link.href}
                    onClick={onNavigate}
                    className="group block rounded-xl px-3 py-3 transition hover:bg-[#EEF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457D6]/35"
                  >
                    <span className="flex items-center justify-between gap-3 font-body text-sm font-bold text-[#12202B] transition group-hover:text-[#2457D6]">
                      {link.title}
                      <ArrowRight
                        size={15}
                        className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1.5 block font-body text-xs leading-5 text-[#607080]">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDesktopMenu = (menu: string | null) => {
    clearCloseTimer();
    setActiveMenu(menu);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

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
    setActiveMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMenuOpen(false);
        setMobileSection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearCloseTimer();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentMenu = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 text-white sm:px-5">
        <div
          className={
            "relative mx-auto h-14 max-w-[1500px] rounded-full transition-all duration-500 md:h-16 " +
            (scrolled
              ? "border border-[#12d8ff]/20 bg-[#000414]/82 shadow-[0_18px_54px_-30px_rgba(18,216,255,0.8)] backdrop-blur-xl"
              : "border border-transparent bg-transparent")
          }
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
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
            className={
              "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-full px-2 lg:flex " +
              (scrolled
                ? "border border-transparent bg-transparent shadow-none backdrop-blur-none"
                : "border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md")
            }
          >
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                activeMenu={activeMenu}
                setActiveMenu={openDesktopMenu}
              />
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
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <AnimatePresence mode="wait">
            {currentMenu && (
              <MegaMenu
                key={currentMenu.label}
                item={currentMenu}
                onNavigate={() => setActiveMenu(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {activeMenu && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 hidden cursor-default bg-[#12202B]/10 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-[#000414] px-6 pb-10 pt-24 text-white md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mx-auto flex w-full max-w-md flex-col gap-2">
              {navItems.map((item) => {
                const hasMenu = Boolean(item.groups?.length);
                const isOpen = mobileSection === item.label;

                if (!hasMenu) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-3 font-body text-xl font-bold text-white transition hover:bg-white/5 hover:text-[#12d8ff]"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="overflow-hidden rounded-2xl border border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection(isOpen ? null : item.label)
                      }
                      className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left font-body text-xl font-bold text-white"
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={20}
                        className={
                          "transition-transform duration-200 " +
                          (isOpen ? "rotate-180" : "rotate-0")
                        }
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 border-t border-white/10 px-4 py-5">
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="inline-flex items-center gap-2 font-body text-sm font-bold text-[#12d8ff]"
                            >
                              View {item.label.toLowerCase()}
                              <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                            {item.groups?.map((group) => (
                              <section key={group.label}>
                                <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                                  {group.label}
                                </h3>
                                <div className="mt-2 space-y-1">
                                  {group.links.map((link) => (
                                    <Link
                                      key={group.label + "-" + link.title}
                                      href={link.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block rounded-lg px-2 py-2 font-body text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-white"
                                    >
                                      {link.title}
                                    </Link>
                                  ))}
                                </div>
                              </section>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-xl px-4 py-3 font-body text-lg font-semibold text-white/80 transition hover:bg-white/5 hover:text-[#12d8ff]"
              >
                Login
              </a>
              <Link
                href="/request-demo"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-white px-8 py-3.5 text-center font-body text-base font-bold text-[#000414] transition hover:bg-[#dff7ff]"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
