import type { Metadata } from "next";
import AssuranceView from "@/components/platform/AssuranceView";

export const metadata: Metadata = {
  title: "Cybersecurity Assurance, Complyverse AI",
  description:
    "Assets and vulnerabilities in one pipeline: discover what you own, score what matters, and re-rank every finding by what is genuinely exploitable on the host it sits on.",
};

export default function AssurancePage() {
  return <AssuranceView />;
}
