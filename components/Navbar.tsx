import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-[#000414] text-white p-4 shadow-[0_16px_44px_-28px_rgba(18,216,255,0.6)] fixed w-full top-0 z-50 border-b border-[#12d8ff]/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold tracking-tight"
        >
          <ShieldAlert className="mr-2" /> ComplyVerse
        </Link>
        <ul className="flex space-x-6 font-medium">
          <li>
            <Link
              href="/governance"
              className="hover:text-[#12d8ff] transition"
            >
              Governance
            </Link>
          </li>
          <li>
            <Link href="/risk" className="hover:text-[#12d8ff] transition">
              Risk
            </Link>
          </li>
          <li>
            <Link
              href="/compliance"
              className="hover:text-[#12d8ff] transition"
            >
              Compliance
            </Link>
          </li>
          <li>
            <Link href="/roi" className="hover:text-[#12d8ff] transition">
              ROI
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
