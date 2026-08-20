import type { Metadata } from "next";
import IntegrationsCatalogue from "@/components/integrations/IntegrationsCatalogue";
import { INTEGRATIONS } from "@/data/integrations";

export const metadata: Metadata = {
  title: "Integrations — CompliVerse AI",
  description:
    "Every system CompliVerse connects to, what each one collects as evidence, and which control families it feeds.",
};

export default function IntegrationsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-line bg-[linear-gradient(180deg,#f0fdf9,#ffffff)]">
        <div className="mx-auto max-w-[1120px] px-6 py-16 text-center">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
            Compliance automation
          </div>
          <h1 className="mx-auto max-w-[640px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-.02em] text-ink sm:text-[42px]">
            Every connector, and exactly what it collects.
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.65] text-ink-muted">
            {INTEGRATIONS.length} integrations across eight categories. Each one lists
            the evidence it pulls — so you can check it answers your auditor&apos;s
            question before you connect anything.
          </p>
        </div>
      </div>

      <IntegrationsCatalogue />

      {/*
        Honest status note. The platform's own catalogue carries a comment that
        nothing is connected until the sync backend ships and that a compliance
        product must never show an invented sync time — the same rule applies
        here, so the page states scope rather than implying live syncing.
      */}
      <div className="border-t border-line bg-[#fbfdfd]">
        <div className="mx-auto max-w-[720px] px-6 py-12 text-center">
          <p className="text-[13px] leading-[1.7] text-ink-soft">
            Connector sync is rolling out with the founding-customer program. The
            list above is the supported catalogue and the evidence each connector
            is scoped to collect — not a live status board. If a system you depend
            on is missing, tell us in the demo and we&apos;ll tell you honestly
            where it sits.
          </p>
          <a
            href="/request-demo"
            className="mt-5 inline-block rounded-full bg-brand px-6 py-3 font-display text-[14px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
          >
            Book a live demo →
          </a>
        </div>
      </div>
    </div>
  );
}
