import type { Metadata } from "next";
import DemoForm from "@/components/demo/DemoForm";
import { TRUST_BADGES } from "@/data/home";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Book a live demo",
  description:
    "Thirty minutes, scoped to your regulatory stack. We run a live gap analysis against a framework you name.",
  path: "/request-demo",
});

const PROMISES = [
  "Map your regulatory stack against the 25+ frameworks that ship built in",
  "Run a live gap analysis on a framework you name, not a canned tour",
  "Show one artifact satisfying several frameworks at once, on your use case",
];

export default function RequestDemoPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f6fdfb,#ffffff_40%)]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[1fr_460px] lg:gap-16 lg:py-12">
        {/* ---------------- Pitch ---------------- */}
        <div className="lg:pt-4">
          <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-.02em] text-ink sm:text-[40px]">
            See Compliverse on your
            <br className="hidden sm:block" /> frameworks, not ours.
          </h1>

          <p className="mt-5 text-[14px] font-semibold text-ink">
            Thirty minutes, one-on-one. We&apos;ll:
          </p>

          <ul className="mt-3.5 grid gap-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[13.5px] leading-[1.6] text-ink-muted">{p}</span>
              </li>
            ))}
          </ul>

          {/*
            No rating or customer count here on purpose, pre-launch, those would
            be invented. The frameworks we cover are verifiable, so that is what
            carries the proof.
          */}
          <div className="mt-9 border-t border-line pt-6">
            <div className="mb-3 text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-faint">
              Demos are scoped to frameworks like these
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {TRUST_BADGES.map((b) => (
                <span
                  key={b.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-1 pr-2.5 text-[11px] font-semibold text-ink-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt=""
                    className="h-[18px] w-[18px] rounded object-contain"
                    loading="lazy"
                  />
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Form ---------------- */}
        <div className="lg:sticky lg:top-[104px]">
          <DemoForm />
        </div>
      </div>
    </div>
  );
}
