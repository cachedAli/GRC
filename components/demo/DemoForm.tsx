"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";

const TEAM_SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"];

/** Every framework the platform supports, searchable in the picker below. */
const ALL_FRAMEWORKS = [
  ...Object.values(FRAMEWORK_GUIDES).map((g) => g.name),
  "Other",
  "Not sure yet",
];

type Errors = Record<string, string>;

export default function DemoForm() {
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Framework picker (searchable popup) state.
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropUp, setDropUp] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Open above the field when there isn't room below, so the popup never
  // clips off the bottom of a short viewport.
  const openPicker = () => {
    const el = triggerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      setDropUp(below < 300 && r.top > below);
    }
    setPickerOpen(true);
  };

  useEffect(() => {
    if (!pickerOpen) return;
    const onClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node))
        setPickerOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  const toggle = (f: string) =>
    setFrameworks((cur) =>
      cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f],
    );

  const filtered = ALL_FRAMEWORKS.filter((f) =>
    f.toLowerCase().includes(query.trim().toLowerCase()),
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"),
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      company: fd.get("company"),
      teamSize: fd.get("teamSize"),
      notes: fd.get("notes"),
      frameworks,
    };

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setDone(true);
        return;
      }
      const data = (await res.json()) as { errors?: Errors };
      setErrors(data.errors ?? { form: "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Could not reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[20px] border border-brand-200 bg-white p-8 text-center shadow-[0_20px_50px_-30px_rgba(15,23,42,.25)]">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-on-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="font-display text-[20px] font-semibold text-ink">
          Request received
        </h2>
        <p className="mx-auto mt-2 max-w-[340px] text-[13.5px] leading-[1.6] text-ink-muted">
          We&apos;ll be in touch within one business day to find a slot and confirm
          which frameworks you want us to run live.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-line px-5 py-2.5 font-display text-[13px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
        >
          Back to the site
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[20px] border border-line bg-white p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,.25)] sm:p-6"
    >
      <Field label="Work email" name="email" error={errors.email} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={input(errors.email)}
        />
      </Field>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={errors.firstName} required>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            className={input(errors.firstName)}
          />
        </Field>
        <Field label="Last name" name="lastName" error={errors.lastName} required>
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            className={input(errors.lastName)}
          />
        </Field>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Company" name="company" error={errors.company} required>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={input(errors.company)}
          />
        </Field>
        <Field label="Team size" name="teamSize">
          <select id="teamSize" name="teamSize" className={input()} defaultValue="">
            <option value="">Select…</option>
            {TEAM_SIZES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-4">
        <legend className="text-[12.5px] font-semibold text-ink">
          Which frameworks should we run live?
          <span className="ml-1.5 font-normal text-ink-faint">Optional</span>
        </legend>
        <div ref={pickerRef} className="relative mt-2">
          {/* Trigger, shows selected frameworks as removable chips */}
          <div
            ref={triggerRef}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={pickerOpen}
            onClick={() => (pickerOpen ? setPickerOpen(false) : openPicker())}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                pickerOpen ? setPickerOpen(false) : openPicker();
              }
            }}
            className="flex min-h-[44px] w-full cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 transition-colors hover:border-brand-200 focus:border-brand focus:outline-none"
          >
            <span className="flex flex-1 flex-wrap items-center gap-1.5">
              {frameworks.length === 0 ? (
                <span className="px-0.5 text-[13px] text-ink-faint">
                  Search and select frameworks…
                </span>
              ) : (
                frameworks.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 rounded-md border border-brand-200 bg-brand-50 py-0.5 pl-2 pr-1 text-[11.5px] font-medium text-brand-forest"
                  >
                    {f}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(f);
                      }}
                      aria-label={`Remove ${f}`}
                      className="flex h-4 w-4 items-center justify-center rounded text-brand-deep transition hover:bg-brand-100"
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </button>
                  </span>
                ))
              )}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-ink-faint transition-transform"
              style={{ transform: pickerOpen ? "rotate(180deg)" : "none" }}
            >
              <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Popup: search + scrollable list, absolutely positioned so it never grows the card */}
          {pickerOpen && (
            <div
              className={`absolute left-0 right-0 z-30 overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_50px_-16px_rgba(15,23,42,.35)] ${
                dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
              }`}
            >
              <div className="border-b border-line-soft p-2">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search frameworks…"
                  className="w-full rounded-lg border border-line bg-[#f8fafc] px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-brand focus:bg-white"
                />
              </div>
              <div
                className="max-h-[190px] overflow-y-auto p-1.5"
                role="listbox"
                aria-multiselectable="true"
              >
                {filtered.length === 0 ? (
                  <div className="px-2.5 py-3 text-center text-[12.5px] text-ink-faint">
                    No frameworks match that search.
                  </div>
                ) : (
                  filtered.map((f) => {
                    const on = frameworks.includes(f);
                    return (
                      <label
                        key={f}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                          on ? "bg-brand-50 text-brand-forest" : "text-ink-muted hover:bg-[#f4f9f8]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(f)}
                          className="h-3.5 w-3.5 shrink-0 accent-[#1ed4b0]"
                        />
                        {f}
                      </label>
                    );
                  })
                )}
              </div>
              {frameworks.length > 0 && (
                <div className="flex items-center justify-between border-t border-line-soft px-3 py-2 text-[11.5px]">
                  <span className="text-ink-soft">{frameworks.length} selected</span>
                  <button
                    type="button"
                    onClick={() => setFrameworks([])}
                    className="font-semibold text-brand-deep hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </fieldset>

      <Field label="Anything specific you want to see?" name="notes" className="mt-3">
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="Optional"
          className={`${input()} resize-none`}
        />
      </Field>

      {errors.form && (
        <p role="alert" className="mt-3 text-[12.5px] font-medium text-[#b91c1c]">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-4 w-full rounded-xl bg-brand py-3.5 font-display text-[14.5px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong disabled:opacity-60"
      >
        {busy ? "Sending…" : "Book a live demo"}
      </button>

      <p className="mt-3 text-center text-[11px] leading-[1.5] text-ink-faint">
        30 minutes, no slide deck. By submitting you agree to our{" "}
        <Link href="/terms" className="font-semibold text-brand-deep hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function input(error?: string) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand ${
    error ? "border-[#f87171]" : "border-line"
  }`;
}

function Field({
  label,
  name,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-brand-deep">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-[11.5px] font-medium text-[#b91c1c]">
          {error}
        </p>
      )}
    </div>
  );
}
