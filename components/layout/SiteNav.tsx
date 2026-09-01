"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_MENUS, type NavFeature, type NavLink, type NavMenu } from "@/data/nav";
import { Logo, Sparkle } from "@/components/ui/Primitives";

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
    <header className="pt-3">
      {/*
        A floating island rather than a full-bleed bar. The pt-3 above plus the
        island keep it to ~76px of layout, so inner pages keep their normal top
        spacing; the hero opts into the overlay by pulling itself up under it.
        No `overflow` here - the mega-menu panels are absolutely positioned
        inside and would clip.
      */}
      <div ref={navRef} className="sticky top-3 z-[900] px-3 sm:px-5">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-2 rounded-full border border-line bg-white/80 px-3 shadow-[0_10px_34px_-12px_rgba(15,23,42,.22)] backdrop-blur-xl sm:gap-4 sm:px-5">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Complyverse AI home">
            <Logo size={20} />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
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
              <span className="sm:hidden">Demo</span>
              <span className="hidden sm:inline">Book a demo</span>
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
                          <div className="mb-1 px-1 text-[10.5px] font-semibold uppercase tracking-[.14em] text-ink-faint">
                            {group.label}
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
   * A panel centred on its trigger can run off-screen, a 680px menu on a tab
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
        className="grid gap-7 p-6"
        style={{
          gridTemplateColumns: hasFeature ? "1fr 264px" : "1fr",
        }}
      >
        <div
          className="grid gap-x-8 gap-y-5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
        >
          {menu.groups.map((group) => {
            // A single-group menu spreads its links across two columns so the
            // wide panel reads as one organised board rather than a tall list.
            const twoCol = menu.groups.length === 1 && group.links.length > 3;
            return (
              <div key={group.label}>
                <div className="mb-2.5 px-3 text-[10.5px] font-semibold uppercase tracking-[.15em] text-ink-faint">
                  {group.label}
                </div>
                <div className={twoCol ? "grid grid-cols-2 gap-0.5" : "grid gap-0.5"}>
                  {group.links.map((link) => (
                    <MenuItem key={link.title} link={link} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {menu.feature?.variant === "assistant" && (
          <AssistantPromo feature={menu.feature} onNavigate={onNavigate} />
        )}
        {menu.feature?.variant === "demo" && (
          <DemoPromo feature={menu.feature} onNavigate={onNavigate} />
        )}
      </div>

      {menu.footer && (
        <Link
          href={menu.footer.href}
          onClick={onNavigate}
          className="block border-t border-line-soft bg-[#fbfdfd] py-3 text-center text-[12.5px] font-semibold text-brand-deep transition hover:bg-brand-50"
        >
          {menu.footer.label}
        </Link>
      )}
    </div>
    </div>
  );
}

/**
 * The demo call-to-action card. A dark, premium panel with a brand glow and a
 * short "what the demo shows" checklist, so the column reads as designed rather
 * than an empty box with a button under it.
 */
function DemoPromo({
  feature,
  onNavigate,
}: {
  feature: NavFeature;
  onNavigate: () => void;
}) {
  const shows = ["Your frameworks mapped", "Gaps surfaced live", "Evidence linked back"];
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#0b1220,#0d211d)] p-5">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-brand/20 blur-2xl"
      />
      <div className="relative">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-[15px] text-on-brand shadow-[0_8px_20px_-8px_rgba(30,212,176,.7)]">
          <Sparkle />
        </div>
        <div className="text-[15px] font-semibold tracking-[-.01em] text-white">
          {feature.title}
        </div>
        <p className="mt-1.5 text-[11.5px] leading-[1.6] text-slate-300/75">
          {feature.body}
        </p>
        <div className="mt-4 grid gap-2">
          {shows.map((s) => (
            <div key={s} className="flex items-center gap-2 text-[11px] text-slate-200/85">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {s}
            </div>
          ))}
        </div>
      </div>
      <Link
        href={feature.href}
        onClick={onNavigate}
        className="relative mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2.5 text-[12.5px] font-semibold text-on-brand transition hover:bg-brand-strong"
      >
        {feature.cta}
        
      </Link>
    </div>
  );
}

/**
 * The illustrated AI-assistant promo, in the spirit of the policy-assistant
 * panels competitors run in their product menus. The avatar is drawn, not a
 * stock photo of an invented person, so nothing on the page is fabricated.
 */
function AssistantPromo({
  feature,
  onNavigate,
}: {
  feature: NavFeature;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[0_16px_40px_-24px_rgba(13,148,136,.5)]">
      {/* Illustrated header */}
      <div className="relative overflow-hidden bg-[linear-gradient(150deg,#0b1220,#0e2a24)] px-4 pb-3 pt-4">
        <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand/20 blur-xl" />
        <div className="relative flex items-center gap-3">
          <AssistantAvatar />
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[.12em] text-[#3ddfc2]">
              <Sparkle /> AI assistant
            </div>
            <div className="mt-1 font-display text-[13px] font-semibold text-white">
              {feature.greeting}
            </div>
          </div>
        </div>
        {/* A little chat bubble to sell the interaction. */}
        <div className="relative mt-3 rounded-[12px_12px_12px_4px] bg-white/10 px-2.5 py-1.5 text-[10.5px] leading-[1.5] text-slate-100/90 backdrop-blur-sm">
          &ldquo;Draft an access-control policy for ISO 27001.&rdquo;
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="font-display text-[14px] font-semibold text-ink">
          {feature.title}
        </div>
        <p className="mt-1.5 text-[11.5px] leading-[1.6] text-ink-soft">{feature.body}</p>
        <Link
          href={feature.href}
          onClick={onNavigate}
          className="mt-3.5 inline-flex items-center justify-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 font-display text-[12px] font-semibold text-brand-deep transition hover:border-brand hover:bg-brand-100"
        >
          {feature.cta} 
        </Link>
      </div>
    </div>
  );
}

/** A drawn, abstract assistant avatar. Geometric, on-brand, not a person. */
function AssistantAvatar() {
  return (
    <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(150deg,#1ed4b0,#0c8f76)] shadow-[0_6px_16px_-6px_rgba(30,212,176,.7)]">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* head */}
        <rect x="7" y="9" width="18" height="15" rx="6" fill="#ffffff" />
        {/* eyes */}
        <circle cx="13" cy="16.5" r="1.7" fill="#0b1220" />
        <circle cx="19" cy="16.5" r="1.7" fill="#0b1220" />
        {/* smile */}
        <path d="M13 20c1.5 1.4 4.5 1.4 6 0" stroke="#0b1220" strokeWidth="1.4" strokeLinecap="round" />
        {/* antenna spark */}
        <path d="M16 9V5.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16" cy="4" r="1.6" fill="#ffffff" />
      </svg>
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1220] bg-[#3ddfc2]" />
    </span>
  );
}

/**
 * A menu item, text-first in the Vanta style: a bold heading over a small
 * muted description, generous spacing, no icon chrome. Framework entries are
 * the one exception, showing the bare regulator mark (no box) to the left,
 * because a logo carries recognition an icon can't.
 */
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
      className="group/item flex items-start gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-brand-50"
    >
      {link.logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.logo}
          alt=""
          className="mt-[3px] h-[22px] w-[22px] shrink-0 object-contain"
          loading="lazy"
        />
      )}
      <span className="min-w-0">
        <span className="block text-[13.5px] font-semibold tracking-[-.005em] text-ink transition-colors group-hover/item:text-brand-deep">
          {link.title}
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[12px] leading-[1.5] text-ink-soft">
            {link.desc}
          </span>
        )}
      </span>
    </Link>
  );
}
