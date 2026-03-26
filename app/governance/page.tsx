import { FileText, CheckCircle, Presentation } from 'lucide-react';

export default function Governance() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">Module 1: AI Governance</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Policy Management, Attestation & Board Oversight powered by intelligent agents.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition duration-300">
          <FileText className="text-indigo-600 h-12 w-12 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Policy Automation</h2>
          <p className="text-slate-600">Draft, review, and distribute policies dynamically based on regulatory updates. The AI agent analyzes changes in the legal landscape and proposes policy amendments.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition duration-300">
          <CheckCircle className="text-indigo-600 h-12 w-12 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Smart Attestation</h2>
          <p className="text-slate-600">Track employee understanding and sign-offs with integrated HR sync. Chatbots test employee comprehension in real-time before recording attestation.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition duration-300">
          <Presentation className="text-indigo-600 h-12 w-12 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Board Reporting</h2>
          <p className="text-slate-600">Generate real-time, executive-level governance dashboards and narratives tailored for board meetings and investor updates.</p>
        </div>
      </div>
    </div>
  );
}