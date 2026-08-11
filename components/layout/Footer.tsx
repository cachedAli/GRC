import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@complyverse.io" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Product Tour", href: "/#tour" },
      { label: "Frameworks", href: "/#frameworks" },
    ],
  },
  {
    title: "Industry",
    links: [
      { label: "Financial Services", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Technology & SaaS", href: "#" },
      { label: "Energy & Utilities", href: "#" },
    ],
  },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className="group inline-flex items-center gap-1 transition-colors hover:text-[#0057ff]">
        {label}
        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    );
  }

  return (
    <Link href={href} className="group inline-flex items-center gap-1 transition-colors hover:text-[#0057ff]">
      {label}
      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#fbfdfc] text-[#020824]">
      <div className="mx-auto max-w-[1480px] px-6 pb-8 pt-16 sm:px-8 md:pt-20 lg:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-x-12">
          <div className="col-span-2 max-w-[250px] md:col-span-1">
            <Link href="/" aria-label="CompliVerse home" className="inline-block">
              <Image
                src="/Gemini_Generated_Image_eoorvaeoorvaeoor-removebg-preview(2).png"
                alt="CompliVerse AI"
                width={455}
                height={83}
                className="h-auto w-[160px]"
              />
            </Link>
            <a href="mailto:Liztek@liztek.ca" className="mt-6 inline-block font-body text-sm font-semibold text-[#020824] transition-colors hover:text-[#0057ff]">
              Liztek@liztek.ca
            </a>
            <div className="mt-5 font-body text-sm leading-6 text-[#020824]/52">
              <p className="font-medium text-[#020824]/70">Liztek Consulting.</p>
              <p>2192 Heidi Ave,</p>
              <p>Burlington, ON L7M 3W5</p>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-body text-sm font-bold tracking-[-0.01em] text-[#000414]">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3 font-body text-sm text-[#020824]/56">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#d8ebfa] pt-6 font-body text-xs text-[#020824]/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CompliVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
