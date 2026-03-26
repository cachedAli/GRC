import { BookOpen, Search, Check } from 'lucide-react';

export default function Compliance() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">Module 3: AI Compliance</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Framework Ingestion, Evidence Management & Reporting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-indigo-900 text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <BookOpen className="absolute -right-10 -top-10 text-indigo-800 opacity-50 h-64 w-64" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Framework Ingestion</h2>
          <p className="opacity-90 mb-8 text-lg relative z-10">Instantly map controls across SOC 2, ISO 27001, GDPR, and custom frameworks using LLM-powered parsing.</p>
          <ul className="space-y-4 relative z-10 font-medium text-lg">
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> Cross-framework mapping</li>
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> Gap analysis automation</li>
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> Real-time regulatory updates</li>
          </ul>
        </div>

        <div className="bg-purple-900 text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <Search className="absolute -right-10 -top-10 text-purple-800 opacity-50 h-64 w-64" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Evidence Collection</h2>
          <p className="opacity-90 mb-8 text-lg relative z-10">Agentic bots gather proof from AWS, GitHub, HRIS, and Identity providers continuously without human intervention.</p>
          <ul className="space-y-4 relative z-10 font-medium text-lg">
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> API-driven data sync</li>
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> Automated screenshot capturing</li>
            <li className="flex items-center"><Check className="text-green-400 mr-3 h-6 w-6" /> Auditor-ready export packages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}