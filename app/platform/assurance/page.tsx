import type { Metadata } from "next";
import AssuranceEmbed from "@/components/platform/AssuranceEmbed";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cybersecurity assurance",
  description:
    "Assets and vulnerabilities in one pipeline: discover what you own, score what matters, and re-rank every finding by what is genuinely exploitable on the host it sits on.",
  path: "/platform/assurance",
});

export default function AssurancePage() {
  return (
    <div className="assurance-page-shell">
      <AssuranceEmbed />
    </div>
  );
}
