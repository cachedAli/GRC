import Link from "next/link";
import { FRAMEWORKS } from "@/data/home";

export default function FrameworkMarquee() {
  return (
    <section className="overflow-hidden bg-white pb-11 pt-[34px]">
      <div className="mb-[18px] text-center text-[11px] font-bold uppercase tracking-[.22em] text-ink-soft">
        Frameworks built in
      </div>

      <div className="cv-marquee-mask">
        <div
          className="cv-marquee-track gap-3"
          style={{ animation: "cv-marquee 48s linear infinite" }}
        >
          {[...FRAMEWORKS, ...FRAMEWORKS].map((f, i) => (
            <Link
              key={`${f.name}-${i}`}
              href={`/frameworks/${f.slug}`}
              aria-label={`${f.name} guide`}
              className="inline-flex items-center gap-[11px] whitespace-nowrap rounded-full border border-line-warm bg-white py-2 pl-2.5 pr-[22px] shadow-[0_8px_20px_-12px_rgba(15,23,42,.18)] transition hover:border-brand hover:shadow-[0_10px_24px_-12px_rgba(13,148,136,.4)]"
            >
              <span className="inline-flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border border-[#eef2f7] bg-[#f8fafc]">
                {/* Regulator marks are already sized and trimmed in the platform's
                    asset folder, so a plain img keeps them crisp at 26px. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.name}
                  className="h-[26px] w-[26px] rounded object-contain"
                  loading="lazy"
                />
              </span>
              <span className="inline-flex flex-col leading-[1.25]">
                <b className="font-display text-[13px] font-semibold text-ink">{f.name}</b>
                <span className="text-[10.5px] text-ink-soft">{f.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-[22px] text-center">
        <Link
          href="/frameworks"
          className="text-[13.5px] font-semibold text-brand-deep hover:text-[#086e5b]"
        >
          Browse the full framework library
        </Link>
      </div>
    </section>
  );
}
