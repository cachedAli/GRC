"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type DemoFormState = {
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  phone: string;
  message: string;
};

const initialForm: DemoFormState = {
  fullName: "",
  workEmail: "",
  company: "",
  role: "",
  phone: "",
  message: "",
};

export default function RequestDemoPage() {
  const [form, setForm] = useState<DemoFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setResult({
          ok: false,
          message: data.message ?? "Unable to submit your request right now.",
        });
        return;
      }

      setResult({
        ok: true,
        message:
          "Thanks, your demo request has been received. We will contact you shortly.",
      });
      setForm(initialForm);
    } catch {
      setResult({
        ok: false,
        message: "Network error. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-green-900/20 bg-white px-4 py-2 text-sm font-semibold text-green-dark hover:bg-green/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-5 rounded-[36px] border border-green-200/80 bg-white p-6 shadow-[0_16px_40px_-26px_rgba(6,95,70,0.3)] md:p-10">
          <h1 className="text-4xl font-semibold text-gray-900 font-poppins mt-3">
            Request a Demo
          </h1>
          <p className="text-lg font-medium max-w-2xl text-gray-600 mt-4">
            Share your details and we will show you how Compliwerse maps
            frameworks, controls, and evidence for your team.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">
                Full Name
              </span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={onFieldChange}
                required
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="Jane Doe"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">
                Work Email
              </span>
              <input
                type="email"
                name="workEmail"
                value={form.workEmail}
                onChange={onFieldChange}
                required
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="jane@company.com"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">
                Company
              </span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onFieldChange}
                required
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="Acme Inc"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Role</span>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={onFieldChange}
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="Head of Risk"
              />
            </label>

            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-gray-700">
                Phone (optional)
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={onFieldChange}
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="+1 555 000 0000"
              />
            </label>

            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-gray-700">
                What do you want to solve?
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={onFieldChange}
                rows={5}
                className="rounded-2xl border border-green/25 bg-bg px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green"
                placeholder="Tell us your primary compliance or risk workflow challenge."
              />
            </label>

            <div className="md:col-span-2 flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-fit rounded-full bg-[#065F46] px-7 py-3 text-base font-semibold text-white transition-colors cursor-pointer hover:bg-[#054c38] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>

              {result && (
                <p
                  className={`text-sm font-medium ${
                    result.ok ? "text-green-dark" : "text-red-600"
                  }`}
                >
                  {result.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
