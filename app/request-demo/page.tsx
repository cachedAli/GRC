import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RequestDemoPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full  bg-white px-4 py-2 text-sm font-semibold text-green-dark hover:bg-green/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-5 rounded-[36px] border border-green-200/80 bg-white p-6 shadow-[0_16px_40px_-26px_rgba(6,95,70,0.3)] md:p-10">
          <div className="mt-8 overflow-hidden rounded-2xl border border-green/20 bg-white">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfVNCCZKPNS3a9hVsNmzDJ82mJywaDBucNVHFkXHPjHz-jKFg/viewform?embedded=true"
              width="100%"
              height={1201}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Request Demo Form"
              className="block"
            >
              Loading...
            </iframe>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            If the form does not load, open it in a new tab{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfVNCCZKPNS3a9hVsNmzDJ82mJywaDBucNVHFkXHPjHz-jKFg/viewform"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-green-dark hover:underline"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
