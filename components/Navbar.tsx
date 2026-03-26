import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-indigo-900 text-white p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold tracking-tight">
          <ShieldAlert className="mr-2" /> ComplyVerse
        </Link>
        <ul className="flex space-x-6 font-medium">
          <li><Link href="/governance" className="hover:text-indigo-200 transition">Governance</Link></li>
          <li><Link href="/risk" className="hover:text-indigo-200 transition">Risk</Link></li>
          <li><Link href="/compliance" className="hover:text-indigo-200 transition">Compliance</Link></li>
          <li><Link href="/roi" className="hover:text-indigo-200 transition">ROI</Link></li>
        </ul>
      </div>
    </nav>
  );
}