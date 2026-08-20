"use client";

import { useMemo, useState } from "react";
import {
  INTEGRATION_CATEGORIES,
  INTEGRATIONS,
  type IntegrationCategory,
} from "@/data/integrations";

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * The full catalogue, filterable by category and searchable by name.
 *
 * Each card states what the connector collects rather than a status, because
 * sync is not live yet and a compliance product must not imply otherwise.
 */
export default function IntegrationsCatalogue() {
  const [cat, setCat] = useState<IntegrationCategory | "All">("All");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    INTEGRATIONS.forEach((i) =>
      i.categories.forEach((c) => m.set(c, (m.get(c) ?? 0) + 1)),
    );
    return m;
  }, []);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return INTEGRATIONS.filter((i) => {
      const inCat = cat === "All" || i.categories.includes(cat);
      if (!inCat) return false;
      if (!needle) return true;
      return (
        i.name.toLowerCase().includes(needle) ||
        i.syncs.some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [cat, q]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-12">
      {/* Filter bar */}
      <div className="mb-7 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCat("All")}
          aria-pressed={cat === "All"}
          className={chip(cat === "All")}
        >
          All
          <span className="ml-1.5 font-mono text-[10px] opacity-70">
            {INTEGRATIONS.length}
          </span>
        </button>
        {INTEGRATION_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={chip(cat === c)}
          >
            {c}
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              {counts.get(c) ?? 0}
            </span>
          </button>
        ))}

        <label htmlFor="int-search" className="sr-only">
          Search integrations
        </label>
        <input
          id="int-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a system or an evidence type…"
          className="ml-auto w-full min-w-[220px] max-w-[300px] rounded-full border border-line bg-white px-4 py-2 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand"
        />
      </div>

      {shown.length === 0 ? (
        <p className="rounded-2xl border border-line bg-[#fbfdfd] px-6 py-10 text-center text-[13.5px] text-ink-soft">
          Nothing matches <b className="text-ink">{q}</b> in this category. Try
          &ldquo;All&rdquo;, or tell us about it in a demo — the parser can take
          systems that are not on this list yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <div
              key={i.id}
              className="flex flex-col rounded-2xl border border-line bg-white p-4 transition-shadow duration-300 hover:border-brand-200 hover:shadow-[0_14px_34px_-22px_rgba(13,148,136,.4)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-[#fbfdfd]">
                  {i.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={i.logo}
                      alt=""
                      className="h-[22px] w-[22px] object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-[12px] font-bold text-brand-ink">
                      {initials(i.name)}
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-[14px] font-semibold text-ink">
                    {i.name}
                  </h2>
                  <div className="mt-0.5 flex flex-wrap gap-1">
                    {i.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-brand-100 px-1.5 py-px text-[9px] font-semibold text-brand-ink"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 border-t border-line-soft pt-3">
                <div className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[.12em] text-ink-faint">
                  Collects
                </div>
                <ul className="grid gap-1.5">
                  {i.syncs.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                      <span className="text-[11.5px] leading-[1.5] text-ink-muted">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center font-mono text-[11px] text-ink-faint">
        Showing {shown.length} of {INTEGRATIONS.length}
      </p>
    </div>
  );
}

function chip(on: boolean) {
  return `rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${
    on
      ? "border-brand bg-brand text-on-brand"
      : "border-line bg-white text-ink-muted hover:border-brand-200 hover:text-brand-ink"
  }`;
}
