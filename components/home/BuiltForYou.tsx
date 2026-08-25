import Link from "next/link";
import { ARTICLES } from "@/data/home";

export function Articles() {
  return (
    <section className="bg-white px-6 py-[66px]">
      <div className="mx-auto max-w-[1150px]">
        <div
          data-reveal
          className="mb-6 flex flex-wrap items-end justify-between gap-5"
        >
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-brand-ink">
              From the library
            </div>
            <h2 className="font-display text-[23px] font-semibold text-ink sm:text-[27px]">
              Guides your auditor would approve of
            </h2>
          </div>
          <Link
            href="/resources"
            className="whitespace-nowrap text-[13.5px] font-semibold text-brand-deep hover:text-[#086e5b]"
          >
            All articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Link
              key={a.title}
              data-reveal
              href={a.href}
              className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-[21px] text-inherit transition hover:border-brand hover:shadow-[0_14px_34px_-20px_rgba(13,148,136,.35)]"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="self-start rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-bold tracking-[.08em] text-brand-ink">
                {a.tag}
              </span>
              <span className="font-display text-[15.5px] font-semibold leading-[1.38] text-ink">
                {a.title}
              </span>
              <span className="text-[12.5px] leading-[1.6] text-ink-soft">{a.teaser}</span>
              <span className="mt-auto text-[12px] font-semibold text-brand-deep">
                {a.read} · Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-[#d9f3ec] bg-[linear-gradient(160deg,#e9fbf6,#f6fdfb)] px-6 py-[72px]">
      <div data-reveal className="mx-auto max-w-[720px] text-center">
        <h2 className="font-display text-[27px] font-semibold tracking-[-.01em] text-ink sm:text-[34px]">
          See your frameworks in it, not ours.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
          Demos are scoped to your regulatory stack, pick a slot, name your frameworks,
          and we&apos;ll run the gap analysis live.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/request-demo"
            className="rounded-full bg-brand px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong"
          >
            Book a live demo
          </Link>
          <Link
            href="/roi"
            className="rounded-full border border-[#d7e3e0] bg-white px-[30px] py-3.5 font-display text-[14.5px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
          >
            See the ROI
          </Link>
        </div>
      </div>
    </section>
  );
}
