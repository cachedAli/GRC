"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string; book?: boolean };

const OPENER: Msg = {
  role: "assistant",
  text:
    "Hi there! I'm ComplyChat, CompliVerse's AI. We link frameworks, policies, " +
    "controls and evidence into one 360-degree graph. What compliance challenge " +
    "are you working on today?",
};

const CHIPS = [
  "Which frameworks do you support?",
  "How does evidence reuse work?",
  "How are you different from Vanta or Drata?",
  "What does pricing look like?",
];

export default function ComplyChat() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [teaserDone, setTeaserDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([OPENER]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Nudge once, a couple of seconds in, unless the visitor already engaged.
  useEffect(() => {
    const t = setTimeout(() => {
      setTeaser((prev) => (open || teaserDone ? prev : true));
    }, 2200);
    return () => clearTimeout(t);
  }, [open, teaserDone]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);

  async function ask(text?: string) {
    const q = (text ?? input).trim();
    if (!q || busy) return;

    const next: Msg[] = [...msgs, { role: "user", text: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/complychat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, text }) => ({ role, text })),
        }),
      });
      const data = (await res.json()) as { reply?: string; book?: boolean };
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text:
            data.reply ??
            "Something went wrong on my side — try again, or book a demo and we'll answer live.",
          book: Boolean(data.book),
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: "I couldn't reach the server just then. Try again, or book a live demo and we'll walk you through it.",
          book: true,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const toggle = () => {
    setOpen((v) => !v);
    setTeaser(false);
    setTeaserDone(true);
  };

  const teaserGo = (q: string) => {
    setOpen(true);
    setTeaser(false);
    setTeaserDone(true);
    setTimeout(() => ask(q), 120);
  };

  const lastMsg = msgs[msgs.length - 1];
  const showBook = lastMsg?.role === "assistant" && lastMsg.book;
  const showChips = msgs.length <= 1 && !busy;

  return (
    <div className="fixed bottom-6 right-6 z-[950] flex flex-col items-end gap-3.5">
      {open && (
        <div className="flex h-[560px] max-h-[calc(100vh-7rem)] w-[calc(100vw-3rem)] max-w-[390px] flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_32px_80px_-16px_rgba(0,4,20,.45)]">
          <div className="flex items-center gap-3 bg-ink px-[18px] py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand text-[16px] text-on-brand">
              &#10022;
            </span>
            <div className="flex-1">
              <div className="font-display text-[14px] font-semibold text-white">
                ComplyChat
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#3ddfc2]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3ddfc2]" />
                AI · answers GRC + product questions
              </div>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label="Close ComplyChat"
              className="cursor-pointer p-1 text-[16px] text-white/60 transition hover:text-white"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#f8fafc] p-4"
            role="log"
            aria-live="polite"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] whitespace-pre-wrap px-3.5 py-2.5 text-[13px] leading-[1.6] ${
                    m.role === "user"
                      ? "rounded-[14px_14px_4px_14px] bg-ink text-white"
                      : "rounded-[14px_14px_14px_4px] border border-line bg-white text-[#1e293b]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex">
                <div className="flex gap-1.5 rounded-[14px_14px_14px_4px] border border-line bg-white px-4 py-3">
                  {[0, 0.2, 0.4].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-brand-deep"
                      style={{ animation: `cv-typing 1s ${d}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showChips && (
              <div className="mt-0.5 flex flex-wrap gap-1.5">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => ask(c)}
                    className="cursor-pointer rounded-full border border-brand-200 bg-white px-3 py-[7px] text-left text-[12px] font-medium text-brand-deep transition hover:border-brand hover:bg-brand-100"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {showBook && (
              <Link
                href="/request-demo"
                className="mt-0.5 block rounded-[11px] bg-brand p-2.5 text-center font-display text-[13px] font-semibold text-on-brand transition hover:bg-brand-strong"
              >
                Book a live demo →
              </Link>
            )}
          </div>

          <div className="flex gap-2 border-t border-line bg-white p-3">
            <label htmlFor="complychat-input" className="sr-only">
              Ask ComplyChat a question
            </label>
            <input
              id="complychat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") ask();
              }}
              placeholder="Ask about frameworks, evidence, pricing…"
              className="flex-1 rounded-[11px] border border-line px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={() => ask()}
              disabled={busy}
              aria-label="Send message"
              className="h-10 w-10 shrink-0 cursor-pointer rounded-[11px] bg-brand text-[15px] text-on-brand transition hover:bg-brand-strong disabled:opacity-50"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {teaser && !open && (
        <div
          className="relative w-[274px] rounded-2xl border border-brand-200 bg-white px-4 py-3.5 shadow-[0_24px_56px_-18px_rgba(13,148,136,.45)]"
          style={{ animation: "cv-teaser .5s cubic-bezier(.22,1,.36,1) both" }}
        >
          <button
            type="button"
            onClick={() => {
              setTeaser(false);
              setTeaserDone(true);
            }}
            aria-label="Dismiss"
            className="absolute right-2.5 top-2 cursor-pointer p-0.5 text-[12px] text-ink-faint transition hover:text-[#334155]"
          >
            ✕
          </button>
          <div className="mb-[7px] flex items-center gap-2">
            <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-brand text-[12px] text-on-brand">
              &#10022;
            </span>
            <b className="font-display text-[12.5px] text-ink">Hi! I&apos;m ComplyChat</b>
          </div>
          <div className="mb-2.5 text-[11.5px] leading-[1.5] text-ink-soft">
            I&apos;m CompliVerse&apos;s AI concierge. Try one:
          </div>
          <div className="flex flex-col gap-1.5">
            {["Which frameworks do you support?", "How is this different from Vanta?"].map(
              (q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => teaserGo(q)}
                  className="cursor-pointer rounded-[9px] border border-brand-200 bg-brand-50 px-3 py-2 text-left text-[11.5px] font-medium text-brand-forest transition hover:border-brand"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ),
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        className="flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brand px-[22px] font-display text-[14px] font-semibold text-on-brand shadow-[0_12px_32px_-8px_rgba(30,212,176,.6)] transition hover:bg-brand-strong"
        style={open ? undefined : { animation: "cv-chat-pulse 2.6s infinite" }}
        aria-expanded={open}
      >
        <span className="text-[17px]" aria-hidden="true">
          {open ? "✕" : "✦"}
        </span>
        {open ? "Close" : "Ask ComplyChat"}
      </button>
    </div>
  );
}
