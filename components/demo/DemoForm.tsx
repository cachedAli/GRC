"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { addDays, format, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FRAMEWORK_GUIDES } from "@/data/frameworks";

const TEAM_SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"];

/** Every framework the platform supports, searchable in the picker below. */
const ALL_FRAMEWORKS = [
  ...Object.values(FRAMEWORK_GUIDES).map((g) => g.name),
  "Other",
  "Not sure yet",
];

type Errors = Record<string, string>;

const CALENDLY_URL = "https://calendly.com/animeblk2003/30min";

export default function DemoForm() {
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [calendlyEventUri, setCalendlyEventUri] = useState("");
  const [calendlyInviteeUri, setCalendlyInviteeUri] = useState("");
  const [prefill, setPrefill] = useState({ name: "", email: "" });
  const [popupRoot, setPopupRoot] = useState<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Kept only for the retired in-file picker markup below; Calendly is now the active scheduler.
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const timezoneOptions = ["UTC"];

  useEffect(() => {
    setPopupRoot(document.body);
  }, []);

  useCalendlyEventListener({
    onEventScheduled: (event) => {
      setCalendlyEventUri(event.data.payload.event.uri);
      setCalendlyInviteeUri(event.data.payload.invitee.uri);
      setErrors((current) => ({ ...current, schedule: "" }));
      setScheduleOpen(false);
    },
  });

  useEffect(() => {
    if (!scheduleOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setScheduleOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [scheduleOpen]);

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
    setErrors({});
    if (!calendlyEventUri || !calendlyInviteeUri) {
      setErrors({ schedule: "Choose and confirm a time in Calendly first." });
      setScheduleOpen(true);
      return;
    }

    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"),
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      company: fd.get("company"),
      teamSize: fd.get("teamSize"),
      notes: fd.get("notes"),
      frameworks,
      calendlyEventUri,
      calendlyInviteeUri,
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
          Request sent successfully
        </h2>
        <p className="mx-auto mt-2 max-w-[340px] text-[13.5px] leading-[1.6] text-ink-muted">
          Your details and Calendly booking have been sent to our team. Calendly
          has also emailed your invitation and the reschedule or cancellation links.
        </p>
        <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-brand-ink">
          You can safely close this page
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef}
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

      {errors.schedule && (
        <p role="alert" className="mt-3 text-[12.5px] font-medium text-[#b91c1c]">
          {errors.schedule}
        </p>
      )}

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-2.5">
        <button
          type="button"
          onClick={() => {
            const form = formRef.current;
            if (form) {
              const data = new FormData(form);
              setPrefill({
                name: `${String(data.get("firstName") ?? "")} ${String(data.get("lastName") ?? "")}`.trim(),
                email: String(data.get("email") ?? ""),
              });
            }
            setScheduleOpen(true);
          }}
          className={`flex min-h-[50px] items-center justify-center gap-2 rounded-xl border px-3 font-display text-[12.5px] font-semibold transition ${
            calendlyEventUri
              ? "border-brand bg-brand-50 text-brand-forest"
              : "border-line bg-white text-ink-muted hover:border-brand hover:text-brand-deep"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="min-w-0 truncate">
            {calendlyEventUri ? "Time selected" : "Choose time in Calendly"}
          </span>
        </button>
        <button
          type="submit"
          disabled={busy}
          className="min-h-[50px] rounded-xl bg-brand px-3 font-display text-[14px] font-semibold text-on-brand shadow-[0_12px_28px_-10px_rgba(30,212,176,.55)] transition hover:bg-brand-strong disabled:opacity-60"
        >
          {busy ? "Sending…" : "Book a live demo"}
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] leading-[1.5] text-ink-faint">
        One hour, focused on your use case. By submitting you agree to our{" "}
        <Link href="/terms" className="font-semibold text-brand-deep hover:underline">
          privacy policy
        </Link>
        .
      </p>

      {false && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-night/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setScheduleOpen(false);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[680px] overflow-y-auto rounded-t-[24px] border border-brand-200 bg-white shadow-[0_28px_90px_-24px_rgba(11,18,32,.45)] sm:rounded-[24px]">
            <div className="flex items-start justify-between border-b border-line-soft bg-[linear-gradient(145deg,#f0fdf9,#ffffff_75%)] px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <div className="font-mono text-[9.5px] font-bold uppercase tracking-[.16em] text-brand-ink">Preferred meeting time</div>
                <h2 id="schedule-title" className="mt-1 font-display text-[19px] font-semibold text-ink">Choose a date and time</h2>
                <p className="mt-1 text-[12px] text-ink-soft">Request a one-hour Microsoft Teams demo.</p>
              </div>
              <button type="button" onClick={() => setScheduleOpen(false)} aria-label="Close scheduler" className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition hover:border-brand hover:text-brand-deep">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-[1.12fr_.88fr] sm:p-6">
              <div className="demo-calendar rounded-2xl border border-line bg-white p-2">
                <DayPicker
                  mode="single"
                  selected={selectedDate ? new Date(`${selectedDate}T12:00:00`) : undefined}
                  onSelect={(day) => {
                    setSelectedDate(day ? format(day, "yyyy-MM-dd") : "");
                    setErrors((current) => ({ ...current, schedule: "" }));
                  }}
                  disabled={{ before: startOfDay(new Date()), after: addDays(startOfDay(new Date()), 89) }}
                  startMonth={startOfDay(new Date())}
                  endMonth={addDays(startOfDay(new Date()), 89)}
                  showOutsideDays
                  fixedWeeks
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="demo-time" className="text-[10px] font-bold uppercase tracking-[.12em] text-ink-soft">Start time</label>
                <input
                  id="demo-time"
                  type="time"
                  step="60"
                  value={selectedTime}
                  onChange={(event) => {
                    setSelectedTime(event.target.value);
                    setErrors((current) => ({ ...current, schedule: "" }));
                  }}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-3 font-display text-[15px] font-semibold text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100"
                />
                <p className="mt-1.5 text-[10.5px] leading-4 text-ink-faint">Choose any preferred start time. One hour will be reserved after admin approval.</p>

                <label htmlFor="timezone" className="mt-5 text-[10px] font-bold uppercase tracking-[.12em] text-ink-soft">Your timezone</label>
                <select id="timezone" value={timezone} onChange={(event) => setTimezone(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-[12px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100">
                  {timezoneOptions.map((zone) => <option key={zone} value={zone}>{zone.replace(/_/g, " ")}</option>)}
                </select>

                <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-3.5">
                  <div className="text-[9.5px] font-bold uppercase tracking-[.12em] text-brand-ink">Requested slot</div>
                  <div className="mt-1.5 font-display text-[13px] font-semibold text-brand-forest">
                    {selectedDate ? format(new Date(`${selectedDate}T12:00:00`), "EEEE, MMMM d") : "Select a date"}
                  </div>
                  <div className="mt-0.5 text-[11px] text-ink-soft">
                    {selectedTime ? format(new Date(`2000-01-01T${selectedTime}:00`), "h:mm a") : "Select a time"} · {timezone.replace(/_/g, " ")}
                  </div>
                </div>

                <button type="button" disabled={!selectedDate || !selectedTime} onClick={() => setScheduleOpen(false)} className="mt-4 min-h-[46px] rounded-xl bg-brand px-4 font-display text-[13px] font-semibold text-on-brand transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40 sm:mt-auto">
                  Confirm preferred time
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {popupRoot && (
        <PopupModal
          url={CALENDLY_URL}
          open={scheduleOpen}
          onModalClose={() => setScheduleOpen(false)}
          rootElement={popupRoot}
          prefill={{ name: prefill.name, email: prefill.email }}
          pageSettings={{
            primaryColor: "1ed4b0",
            textColor: "0f172a",
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      )}
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
