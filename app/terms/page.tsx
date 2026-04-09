import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ComplyVerse AI",
  description: "Terms of Service for ComplyVerse AI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <article className="rounded-2xl border border-green-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(2,26,72,0.38)] sm:p-8">
          <header className="border-b border-green-100 pb-5">
            <h1 className="text-2xl font-semibold text-green-dark sm:text-3xl">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-[#1f4d78]">
              Effective date: April 9, 2026
            </p>
          </header>

          <div className="mt-7 space-y-8 text-sm leading-7 text-[#1f4d78] sm:text-base">
            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                Overview
              </h2>
              <div className="mt-2 space-y-3">
                <p>
                  ComplyVerse AI is a governance, risk, and compliance platform
                  designed to help teams manage frameworks, controls, evidence,
                  findings, and remediation tracking.
                </p>
                <p>
                  By accessing or using this service, you agree to these Terms
                  of Service. If you use the service for an organization, you
                  confirm that you are authorized to agree to these terms on
                  behalf of that organization.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                Online service terms
              </h2>
              <div className="mt-2 space-y-3">
                <p>
                  You must use the service only for lawful governance, risk,
                  compliance, and audit activities, and in accordance with
                  applicable laws and internal policy.
                </p>
                <p>
                  You may not use the service to violate rights, security
                  obligations, or any legal or regulatory requirement.
                </p>
              </div>

              <ol className="mt-4 list-inside list-decimal space-y-2 border-l-2 border-[#f3c24d] pl-4">
                <li>
                  You must not transmit any malware, harmful code, or
                  unauthorized automation.
                </li>
                <li>
                  You must not attempt to bypass platform security controls,
                  restrictions, or permissions.
                </li>
                <li>
                  You must not falsify controls, evidence, findings,
                  attestations, or related records.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                GRC data and responsibilities
              </h2>
              <div className="mt-2 space-y-3">
                <p>
                  You are responsible for the quality, legality, and accuracy of
                  all frameworks, controls, evidence, and findings uploaded by
                  your users.
                </p>
                <p>
                  You retain ownership of your data. ComplyVerse AI processes
                  your data only to operate, secure, and support the service.
                </p>
                <p>
                  The platform supports compliance workflows but does not
                  replace legal advice, external audit judgment, or regulatory
                  interpretation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                Security and confidentiality
              </h2>
              <div className="mt-2 space-y-3">
                <p>
                  You are responsible for account security, user access control,
                  and prompt removal of unauthorized access.
                </p>
                <p>
                  Each party agrees to protect confidential information
                  disclosed under these terms and use it only for authorized
                  service-related purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                Suspension, termination, and liability
              </h2>
              <div className="mt-2 space-y-3">
                <p>
                  Access may be suspended or terminated for material breach,
                  misuse, security risk, or non-payment, as permitted by your
                  governing agreement.
                </p>
                <p>
                  To the extent permitted by law, the service is provided on an
                  as-is and as-available basis, and liability is limited under
                  applicable contract terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-green-dark sm:text-lg">
                Contact
              </h2>
              <p className="mt-2">
                Questions about these terms can be sent to
                <a
                  href="mailto:Liztek@liztek.ca"
                  className="ml-1 font-semibold text-green-dark hover:underline"
                >
                  Liztek@liztek.ca
                </a>
                .
              </p>
            </section>
          </div>

          <footer className="mt-8 border-t border-green-100 pt-4 text-xs text-[#6b7280]">
            If a signed customer agreement exists, that agreement governs in
            case of conflict with this page.
          </footer>
        </article>
      </section>
    </main>
  );
}
