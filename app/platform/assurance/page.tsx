import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cybersecurity assurance",
  description:
    "Assets and vulnerabilities in one pipeline: discover what you own, score what matters, and re-rank every finding by what is genuinely exploitable on the host it sits on.",
  path: "/platform/assurance",
});

export default function AssurancePage() {
  return (
    <iframe
      title="CompliVerse Cybersecurity Assurance"
      src="/compliverse-cybersecurity-assurance.html"
      className="fixed inset-0 z-[100] h-screen w-screen border-0 bg-[#0b1220]"
    />
  );
}
