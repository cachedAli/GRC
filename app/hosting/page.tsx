import type { Metadata } from "next";
import Link from "next/link";
import { NAV_ICON } from "@/data/nav";
import { Icon } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Hosting, Compliverse AI",
  description:
    "Run Compliverse the way your regulator expects: secure global cloud (SaaS), or on-premise in your own infrastructure.",
};

const OPTIONS = [
  {
    icon: NAV_ICON.globe,
    tag: "Managed",
    title: "Cloud (SaaS)",
    body: "We host and run it. Secure, global data centres sized for your availability and storage needs, kept current for you.",
    points: ["Managed updates and uptime", "Regional data residency", "Tenant-isolated by design"],
  },
  {
    icon: NAV_ICON.racks,
    tag: "Self-hosted",
    title: "On-premise",
    body: "Run Compliverse inside your own environment when policy or jurisdiction requires the data to stay on your infrastructure.",
    points: ["Your infrastructure, your control", "Air-gapped deployments supported", "Same platform, same features"],
  },
];

const PILLARS = [
  {
    icon: NAV_ICON.shieldCheck,
    title: "Security",
    body: "You trust us with sensitive information, so protection is layered: encryption in transit and at rest, least-privilege access, and continuous monitoring.",
  },
  {
    icon: NAV_ICON.globe,
    title: "Cloud services",
    body: "Robust, secure cloud infrastructure that supports your data availability and storage requirements across regions.",
  },
  {
    icon: NAV_ICON.doc,
    title: "Legal & compliance",
    body: "A privacy and security program built to meet the requirements your own auditors and regulators hold you to.",
  },
];

export default function HostingPage() {
  return (
    <div className="bg-white">
      <RevealOnScroll />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#e9fbf6,#f6fdfb_60%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 0%, rgba(30,212,176,.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-6 pb-16 pt-[132px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            <Icon d={NAV_ICON.globe} size={13} />
            Hosting
          </div>
          <h1 className="mx-auto max-w-[680px] font-display text-[34px] font-semibold leading-[1.1] tracking-[-.02em] text-ink sm:text-[46px]">
            Deployed the way your regulator expects.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.65] text-ink-muted">
            Compliverse runs as secure global cloud, or on-premise inside your own
            environment. Same platform either way, so the deployment model is your
            call, not a compromise.
          </p>
        </div>
      </section>

      {/* Two deployment options */}
      <section className="px-6 py-[70px]">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 md:grid-cols-2">
          {OPTIONS.map((o, i) => (
            <div
              key={o.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative overflow-hidden rounded-[22px] border border-line bg-white p-7 transition hover:border-brand-200 hover:shadow-[0_24px_60px_-34px_rgba(13,148,136,.5)]"
            >
              <span className="absolute right-6 top-6 rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-brand-ink">
                {o.tag}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-on-brand">
                <Icon d={o.icon} size={22} />
              </span>
              <h2 className="mt-5 font-display text-[22px] font-semibold text-ink">
                {o.title}
              </h2>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-muted">{o.body}</p>
              <ul className="mt-5 grid gap-2.5 border-t border-line-soft pt-5">
                {o.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M4 12.5l5 5L20 6.5"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[13px] text-ink-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Three pillars */}
      <section className="border-y border-line-warm bg-[#f6f8fa] px-6 py-[70px]">
        <div className="mx-auto max-w-[1000px]">
          <div data-reveal className="mb-10 text-center">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              Built for trust
            </div>
            <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
              Dependable, wherever it runs.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-ink">
                  <Icon d={p.icon} size={20} />
                </span>
                <h3 className="mt-4 font-display text-[16px] font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#d9f3ec] bg-[linear-gradient(160deg,#e9fbf6,#f6fdfb)] px-6 py-[72px]">
        <div data-reveal className="mx-auto max-w-[640px] text-center">
          <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            Not sure which fits your policy?
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Tell us your data-residency and jurisdiction constraints in a demo, and
            we&apos;ll map the right deployment with you.
          </p>
          <div className="mt-7">
            <Link
              href="/request-demo"
              className="inline-block rounded-full bg-brand px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
