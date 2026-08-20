"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_MENUS, type NavLink, type NavMenu } from "@/data/nav";
import { Icon, Logo } from "@/components/ui/Primitives";

export default function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /**
   * A short grace period on leave, so crossing the gap between the trigger and
   * the panel does not snap the menu shut mid-movement.
   */
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  return (
    <header>
      {/* Announcement bar — the honest pre-revenue signal. */}
      <div className="flex items-center justify-center gap-2.5 bg-[#0b1220] px-5 py-2.5 text-center text-[12.5px] text-white/85">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
          style={{ animation: "cv-pulse-dot 2s infinite" }}
        />
        <span className="hidden sm:inline">
          Founding-customer program open — shaped pricing for the first 10 teams
        </span>
        <span className="sm:hidden">Founding-customer program open</span>
        <Link href="/about" className="font-semibold text-[#3ddfc2] hover:underline">
          Apply →
        </Link>
      </div>

      {/*
        A floating island rather than a full-bleed bar. It still occupies its own
        76px of layout, so inner pages keep their normal top spacing; the hero
        opts into the overlay by pulling itself up under it. No `overflow` here —
        the mega-menu panels are absolutely positioned inside and would clip.
      */}
      <div ref={navRef} className="sticky top-3 z-[900] px-3 sm:px-5">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-2 rounded-full border border-line bg-white/80 px-3 shadow-[0_10px_34px_-12px_rgba(15,23,42,.22)] backdrop-blur-xl sm:gap-4 sm:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Logo size={22} />
            <span className="font-display text-[15px] font-bold tracking-[-.01em] text-ink sm:text-[16px]">
              CompliVerse<span className="text-brand-deep"> AI</span>
            </span>
          </Link>

          <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 lg:flex">
            {NAV_MENUS.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpen(menu.label);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === menu.label ? null : menu.label)}
                  aria-expanded={open === menu.label}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    open === menu.label
                      ? "bg-brand-50 text-brand-deep"
                      : "text-[#334155] hover:bg-brand-50 hover:text-brand-deep"
                  }`}
                >
                  {menu.label}
                  <Chevron open={open === menu.label} />
                </button>

                {open === menu.label && (
                  <MenuPanel menu={menu} onNavigate={() => setOpen(null)} />
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3.5">
            <Link
              href="/request-demo"
              className="whitespace-nowrap rounded-full bg-brand px-3.5 py-2.5 font-display text-[13px] font-semibold text-on-brand shadow-[0_8px_20px_-8px_rgba(30,212,176,.55)] transition hover:bg-brand-strong sm:px-[19px]"
            >
              <span className="sm:hidden">Demo →</span>
              <span className="hidden sm:inline">Book a demo →</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            >
              <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile: same structure as accordions. */}
        {mobileOpen && (
          <div className="mx-auto mt-2 max-h-[calc(100vh-9rem)] max-w-[1200px] overflow-y-auto rounded-3xl border border-line bg-white/95 px-4 py-3 shadow-[0_18px_44px_-16px_rgba(15,23,42,.3)] backdrop-blur-xl lg:hidden">
            {NAV_MENUS.map((menu) => {
              const isOpen = mobileSection === menu.label;
              return (
                <div key={menu.label} className="border-b border-line-soft last:border-0">
                  <button
                    type="button"
                    onClick={() => setMobileSection(isOpen ? null : menu.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-1 py-3 text-[14.5px] font-semibold text-ink"
                  >
                    {menu.label}
                    <Chevron open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="pb-3">
                      {menu.groups.map((group) => (
                        <div key={group.label} className="mb-2">
                          <div className="mb-1 px-1 font-mono text-[10px] font-semibold tracking-[.14em] text-brand-ink">
                            [ {group.label.toUpperCase()} ]
                          </div>
                          {group.links.map((link) => (
                            <MenuItem
                              key={link.title}
                              link={link}
                              compact
                              onNavigate={() => {
                                setMobileOpen(false);
                                setMobileSection(null);
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

/** Drawn rather than a text glyph, so it rotates crisply at any size. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const hasFeature = Boolean(menu.feature);
  // A single-group menu stays one column; two groups sit side by side.
  const cols = menu.groups.length > 1 ? menu.groups.length : 1;
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  /**
   * A panel centred on its trigger can run off-screen — a 680px menu on a tab
   * near the left edge is the obvious case. Measure before paint and nudge it
   * back inside so wide menus stay usable at any window width.
   *
   * The shift lives on this wrapper, never on the animated child: a keyframe
   * that touches `transform` would overwrite it when the animation settles.
   */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const margin = 16;
    const r = el.getBoundingClientRect();
    // Wider than the viewport: pin to the left margin, no point centring.
    if (r.width > window.innerWidth - margin * 2) {
      setShift((s) => s + (margin - r.left));
      return;
    }
    // The rect already includes the current shift, so accumulate rather than set.
    if (r.left < margin) setShift((s) => s + (margin - r.left));
    else if (r.right > window.innerWidth - margin) {
      setShift((s) => s + (window.innerWidth - margin - r.right));
    }
  }, [menu.label, shift]);

  return (
    <div
      ref={ref}
      /* Offset clears the island's lower edge, not just the trigger button, so
         the panel reads as a separate floating card. */
      className="absolute left-1/2 top-[calc(100%+22px)]"
      style={{ width: menu.width, transform: `translateX(calc(-50% + ${shift}px))` }}
    >
    <div
      className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_30px_70px_-18px_rgba(15,23,42,.22)]"
      style={{ animation: "cv-menu-in .16s cubic-bezier(.22,1,.36,1) both" }}
      role="menu"
    >
      <div
        className="grid gap-5 p-5"
        style={{ gridTemplateColumns: hasFeature ? "1fr 210px" : "1fr" }}
      >
        <div
          className="grid gap-x-5 gap-y-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
        >
          {menu.groups.map((group) => (
            <div key={group.label}>
              <div className="mb-2 ml-1 font-mono text-[10px] font-semibold tracking-[.14em] text-brand-ink">
                [ {group.label.toUpperCase()} ]
              </div>
              <div
                className={
                  // The capability list is long; run it in two columns.
                  group.links.length > 6 ? "grid grid-cols-2 gap-0.5" : "grid gap-0.5"
                }
              >
                {group.links.map((link) => (
                  <MenuItem key={link.title} link={link} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {menu.feature && (
          <div className="flex flex-col justify-between rounded-2xl bg-[#0b1220] p-4">
            <div>
              <div className="font-display text-[13.5px] font-semibold text-white">
                {menu.feature.title}
              </div>
              <p className="mt-1.5 text-[11.5px] leading-[1.55] text-slate-200/65">
                {menu.feature.body}
              </p>
            </div>
            <Link
              href={menu.feature.href}
              onClick={onNavigate}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-3 py-2 font-display text-[12px] font-semibold text-on-brand transition hover:bg-brand-strong"
            >
              {menu.feature.cta} →
            </Link>
          </div>
        )}
      </div>

      {menu.footer && (
        <Link
          href={menu.footer.href}
          onClick={onNavigate}
          className="block border-t border-line-soft bg-[#fbfdfd] py-3 text-center text-[12.5px] font-semibold text-brand-deep transition hover:bg-brand-50"
        >
          {menu.footer.label} →
        </Link>
      )}
    </div>
    </div>
  );
}

function MenuItem({
  link,
  onNavigate,
  compact = false,
}: {
  link: NavLink;
  onNavigate: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      role="menuitem"
      className="group/item flex items-start gap-3 rounded-[10px] px-2.5 py-2 transition-colors hover:bg-brand-50"
    >
      <span className="mt-px flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] border border-brand-200 bg-brand-100 text-brand-ink transition-colors group-hover/item:border-brand group-hover/item:bg-brand group-hover/item:text-on-brand">
        {link.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.logo}
            alt=""
            className="h-[17px] w-[17px] object-contain"
            loading="lazy"
          />
        ) : (
          <Icon d={link.icon ?? ""} size={16} strokeWidth={1.6} />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] font-semibold text-ink">{link.title}</span>
        {!compact && (
          <span className="mt-0.5 block text-[11px] leading-[1.4] text-ink-soft">
            {link.desc}
          </span>
        )}
      </span>
    </Link>
  );
}
