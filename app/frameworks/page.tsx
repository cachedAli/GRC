import type { Metadata } from "next";
import Link from "next/link";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";
import { RevealOnScroll } from "@/components/ui/Primitives";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Compliance framework guides",
  description:
    "Guides to every framework Compliverse supports, overview, scope, structure and the journey to compliance, one connected data model behind all of them.",
  path: "/frameworks",
});

export default function FrameworksIndexPage() {
  const guides = Object.values(FRAMEWORK_GUIDES);
  return (
    <div className="bg-white">
      <RevealOnScroll />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eefaf6,#f7fdfb_60%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 20% 0%, rgba(30,212,176,.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[760px] px-6 pb-14 pt-[128px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            Framework guides
          </div>
          <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-.02em] text-ink sm:text-[46px]">
            Every framework, mapped and drawn.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted">
            Overview, scope, structure and the road to compliance for each one.
            Different frameworks, one connected data model underneath.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              data-reveal
              href={`/frameworks/${g.slug}`}
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              className="group relative overflow-hidden rounded-[18px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-26px_rgba(15,23,42,.4)]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: g.accent }}
              />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-line-soft bg-[#f8fafc]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.logo} alt="" className="h-6 w-6 object-contain" loading="lazy" />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[15.5px] font-semibold text-ink">
                    {g.name}
                  </div>
                  <div className="text-[11.5px] text-ink-soft">{g.category}</div>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-[12.5px] leading-[1.55] text-ink-soft">
                {g.overview}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-forest">
                  {g.region}
                </span>
                <span
                  className="text-[12px] font-semibold transition-all group-hover:translate-x-0.5"
                  style={{ color: g.accent }}
                >
                  Open guide
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
