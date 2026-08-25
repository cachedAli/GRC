import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll, Sparkle } from "@/components/ui/Primitives";
import ModuleExplorer from "@/components/home/ModuleExplorer";
import LinkageGraph from "@/components/home/LinkageGraph";

export const metadata: Metadata = {
  title: "Platform overview, Complyverse AI",
  description:
    "Governance, risk and compliance on one data model. Twelve modules, a unified control library and a 360-degree linkage graph, with AI in every module.",
};

export default function PlatformOverviewPage() {
  return (
    <div className="bg-white">
      <RevealOnScroll />

      {/* Hero (pulled under the floating nav so it overlays the gradient) */}
      <section className="relative -mt-[76px] overflow-hidden bg-[linear-gradient(180deg,#e9fbf6,#f6fdfb_60%,#ffffff)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 18% 0%, rgba(30,212,176,.16), transparent 60%)," +
              "radial-gradient(ellipse 45% 40% at 92% 25%, rgba(61,223,194,.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[880px] px-6 pb-16 pt-[136px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-ink backdrop-blur-sm">
            <Sparkle /> The platform
          </div>
          <h1 className="mx-auto max-w-[720px] font-display text-[36px] font-semibold leading-[1.08] tracking-[-.02em] text-ink sm:text-[50px]">
            Governance, risk and compliance on one model.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.65] text-ink-muted">
            Twelve modules, a unified control library and a connected graph
            that ties every framework, policy, control, risk and piece of
            evidence together. AI runs in every one of them.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/request-demo"
              className="rounded-full bg-brand px-7 py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
            >
              Book a live demo
            </Link>
            <a
              href="#linkage"
              className="rounded-full border border-[#d7e3e0] bg-white px-7 py-3.5 font-display text-[14.5px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
            >
              See the linkage model
            </a>
          </div>

          <div className="mx-auto mt-11 flex max-w-[560px] flex-wrap justify-center gap-x-10 gap-y-4 border-t border-brand-200/60 pt-7">
            {[
              { value: "12", label: "connected modules" },
              { value: "25+", label: "frameworks built in" },
              { value: "One", label: "data model" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[22px] font-bold tracking-[-.01em] text-brand-deep">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11.5px] uppercase tracking-[.08em] text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All twelve modules */}
      <ModuleExplorer />

      {/* The 360-degree linkage model (anchor target) */}
      <div id="linkage" className="scroll-mt-24">
        <LinkageGraph />
      </div>

      {/* CTA */}
      <section className="border-t border-[#d9f3ec] bg-[linear-gradient(160deg,#e9fbf6,#f6fdfb)] px-6 py-[72px]">
        <div data-reveal className="mx-auto max-w-[640px] text-center">
          <h2 className="font-display text-[26px] font-semibold tracking-[-.01em] text-ink sm:text-[32px]">
            See the whole platform on your own stack.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Demos are scoped to your frameworks. Pick a slot and we&apos;ll run
            the gap analysis live.
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
