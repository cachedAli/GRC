import Link from "next/link";
import { TRUST_BADGES } from "@/data/home";
import { Logo } from "@/components/ui/Primitives";

type Column = { title: string; links: { label: string; href: string }[] };

const COLUMNS: Column[] = [
  {
    title: "Product",
    links: [
      { label: "Platform overview", href: "/features" },
      { label: "All 14 modules", href: "/features" },
      { label: "AI catalog", href: "/features" },
      { label: "360° linkage", href: "/features" },
      { label: "ROI and time savings", href: "/roi" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Document Management", href: "/governance" },
      { label: "Vendor Risk (TPRM)", href: "/features" },
      { label: "Vulnerability Mgmt", href: "/features" },
      { label: "Evidence Management", href: "/features" },
      { label: "Enterprise Risk", href: "/risk" },
      { label: "Business Continuity", href: "/features" },
      { label: "Asset Management", href: "/features" },
      { label: "Gap Analysis", href: "/compliance" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { label: "SOC 2", href: "/compliance" },
      { label: "ISO 27001", href: "/compliance" },
      { label: "ISO 22301", href: "/compliance" },
      { label: "PCI DSS", href: "/compliance" },
      { label: "NIST CSF", href: "/compliance" },
      { label: "NIST 800-53", href: "/compliance" },
      { label: "GDPR", href: "/compliance" },
      { label: "HIPAA", href: "/compliance" },
      { label: "DORA", href: "/compliance" },
      { label: "NIS2", href: "/compliance" },
      { label: "CIS Controls", href: "/compliance" },
      { label: "COBIT 2019", href: "/compliance" },
      { label: "SOX ITGC", href: "/compliance" },
      { label: "HITRUST", href: "/compliance" },
    ],
  },
  {
    title: "Regional",
    links: [
      { label: "SAMA CSF", href: "/compliance" },
      { label: "NCA ECC", href: "/compliance" },
      { label: "CBUAE Art. 13", href: "/compliance" },
      { label: "SBP ETGRMF", href: "/compliance" },
      { label: "SBP Cloud Outsourcing", href: "/compliance" },
      { label: "SBP Internet Banking", href: "/compliance" },
      { label: "MAS TRM", href: "/compliance" },
      { label: "SWIFT CSCF", href: "/compliance" },
      { label: "ARAMCO CCC", href: "/compliance" },
      { label: "SABIC CyberTrust", href: "/compliance" },
      { label: "Sri Lanka BSS", href: "/compliance" },
      { label: "Custom (AI upload)", href: "/compliance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "SAMA CSF guide", href: "/resources" },
      { label: "NCA ECC checklist", href: "/resources" },
      { label: "Evidence reuse", href: "/resources" },
      { label: "Vendor questionnaires", href: "/resources" },
      { label: "Policy gap analysis", href: "/resources" },
      { label: "ISO 22301 BCM", href: "/resources" },
      { label: "All articles", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Security posture", href: "/about" },
      { label: "Founding customers", href: "/about" },
      { label: "Book a demo", href: "/request-demo" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#0b1220] text-slate-200/[.72]">
      <div className="mx-auto max-w-[1240px] px-7 pt-[72px]">
        <div className="grid grid-cols-2 gap-8 pb-[54px] md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr_1fr_1.05fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Logo size={24} tone="dark" />
              <span className="font-display text-[16px] font-bold text-white">
                CompliVerse<span className="text-[#3ddfc2]"> AI</span>
              </span>
            </div>
            <p className="mb-5 max-w-[230px] text-[13px] leading-[1.7]">
              The AI-native GRC platform. Frameworks, policies, controls, evidence, risks
              and audits — one connected graph.
            </p>
            <div className="mb-[22px] flex flex-wrap gap-1.5">
              {["14 modules", "25+ frameworks", "AI-native"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-[#3ddfc2]"
                >
                  {b}
                </span>
              ))}
            </div>
            <Link
              href="/request-demo"
              className="inline-block rounded-full bg-brand px-[22px] py-2.5 font-display text-[13px] font-semibold text-on-brand transition hover:bg-brand-strong"
            >
              Book a demo →
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 font-display text-[12px] font-semibold uppercase tracking-[.12em] text-white">
                {col.title}
              </div>
              <div className="flex flex-col gap-2.5 text-[13px]">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="transition-colors hover:text-[#3ddfc2]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip — the frameworks we get you ready for, not badges we hold. */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-slate-400/15 py-[26px]">
          <div className="text-[11px] font-bold uppercase tracking-[.16em] text-slate-400/70">
            Get audit-ready with CompliVerse
          </div>
          <div className="flex flex-wrap gap-3.5">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.name}
                className="inline-flex w-[84px] flex-col items-center gap-1.5"
              >
                <span className="inline-flex h-[58px] w-[58px] items-center justify-center rounded-full border-[2.5px] border-brand bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt={b.name}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                </span>
                <span className="text-[10px] font-semibold text-slate-200/75">
                  {b.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-400/15 pb-[26px] pt-5 text-[12px] text-slate-400/70">
          <span>© {new Date().getFullYear()} CompliVerse AI. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/terms" className="hover:text-[#3ddfc2]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#3ddfc2]">
              Terms
            </Link>
            <Link href="/about" className="hover:text-[#3ddfc2]">
              Trust
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
