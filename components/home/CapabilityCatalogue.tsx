import Link from "next/link";
import { CAPABILITIES } from "@/data/modules";
import { Icon } from "@/components/ui/Primitives";

/**
 * The capability catalogue, everything the platform does, on one dark grid.
 *
 * Hairline dividers rather than card borders, so twelve cells read as a single
 * table a buyer can scan in one pass. Each cell carries its own verb, because
 * "Learn more" twelve times tells nobody anything.
 */
export default function CapabilityCatalogue() {
  return (
    <section className="bg-[#0b1220] px-6 py-[78px]">
      <div className="mx-auto max-w-[1180px]">
        {/* Header row, ruled off from the grid like the rest of the table. */}
        <div
          data-reveal
          className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-8"
        >
          <div>
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-[#3ddfc2]">
              The whole surface area
            </div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-.02em] text-white sm:text-[36px]">
              Discover the Complyverse difference
            </h2>
          </div>
          <Link
            href="/request-demo"
            className="shrink-0 rounded-full bg-brand px-5 py-2.5 font-display text-[13px] font-semibold text-on-brand shadow-[0_10px_26px_-10px_rgba(30,212,176,.6)] transition hover:bg-brand-strong"
          >
            Book a demo
          </Link>
        </div>

        {/*
          Hairlines come from a 1px grid gap with the divider colour behind the
          cells, not from nth-child border math, that collided at `lg` and left
          some columns unruled. This version is correct at any column count.
        */}
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              data-reveal
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              className="group/cell relative flex flex-col gap-3 bg-[#0b1220] px-6 py-7 transition-colors duration-300 hover:bg-[#101a2e]"
            >
              <span className="text-brand transition-transform duration-300 group-hover/cell:-translate-y-0.5">
                <Icon d={c.icon} size={24} strokeWidth={1.7} />
              </span>

              <h3 className="font-display text-[15.5px] font-semibold text-white">
                {c.title}
              </h3>

              <p className="text-[12.5px] leading-[1.6] text-slate-300/65">{c.body}</p>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[12px] font-semibold text-[#3ddfc2]">
                {c.cta}
                
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
