import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 text-center">
      <div className="container mx-auto px-4">
        <h2 className="flex items-center justify-center text-2xl font-bold text-white mb-4">
          <ShieldAlert className="mr-2" /> ComplyVerse
        </h2>
        <p className="mb-6">Empowering enterprises with intelligent GRC automation.</p>
        <p className="text-sm border-t border-slate-800 pt-8">&copy; {new Date().getFullYear()} ComplyVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}