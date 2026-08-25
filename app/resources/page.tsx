import type { Metadata } from "next";
import Link from "next/link";
import { Icon, RevealOnScroll } from "@/components/ui/Primitives";
import { NAV_ICON } from "@/data/nav";

export const metadata: Metadata = {
  title: "Resources, Complyverse AI",
  description:
    "Framework guides, a compliance glossary and the integrations catalog. Practical references for building and running a GRC programme.",
};

const RESOURCES = [
  {
    icon: NAV_ICON.book,
    title: "Framework guides",
    body: "Overview, scope, structure and the road to compliance for every framework we support, drawn as its own diagram.",
    href: "/frameworks",
    cta: "Browse guides",
    live: true,
  },
  {
    icon: NAV_ICON.glossary,
    title: "Compliance glossary",
    body: "The vocabulary of GRC, plainly defined: frameworks, controls, evidence, risk, assessments, audit and the rest.",
    href: "/resources/glossary",
    cta: "Open the glossary",
    live: true,
  },
  {
    icon: NAV_ICON.plug,
    title: "Integrations catalog",
    body: "The 40 connectors that pull evidence from the tools you already run, across cloud, code, endpoint, ticketing and HR.",
    href: "/integrations",
    cta: "See integrations",
    live: true,
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      <RevealOnScroll />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eefaf6,#f7fdfb_60%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 20% 0%, rgba(30,212,176,.15), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[760px] px-6 pb-14 pt-[132px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            Resources
          </div>
          <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-.02em] text-ink sm:text-[46px]">
            References for the work, not the marketing.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted">
            Guides, definitions and connectors you can actually use while
            building a programme.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 pt-4">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 md:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Link
              key={r.title}
              data-reveal
              href={r.href}
              style={{ transitionDelay: `${i * 70}ms` }}
              className="group flex flex-col rounded-[20px] border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_24px_60px_-34px_rgba(13,148,136,.5)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-on-brand">
                <Icon d={r.icon} size={22} />
              </span>
              <h2 className="mt-5 font-display text-[19px] font-semibold text-ink">
                {r.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.6] text-ink-muted">
                {r.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-deep transition-all group-hover:gap-2">
                {r.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto mt-6 max-w-[1080px] rounded-[20px] border border-dashed border-line bg-[#f8fafc] px-7 py-6 text-center"
        >
          <p className="text-[13.5px] leading-[1.6] text-ink-soft">
            Long-form articles and product documentation are being written
            alongside the founding-customer program.{" "}
            <Link href="/request-demo" className="font-semibold text-brand-deep hover:underline">
              Book a demo
            </Link>{" "}
            and we&apos;ll walk you through anything you need in the meantime.
          </p>
        </div>
      </section>
    </div>
  );
}
