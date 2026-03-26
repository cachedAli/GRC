import { Activity, ShieldAlert, Cpu } from 'lucide-react';

export default function Risk() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">Module 2: AI Risk Management</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Continuous Risk Register, Scenario Modeling & Treatment Plans.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-center bg-white p-12 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex-1 space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-indigo-100 p-4 rounded-xl text-indigo-700"><Activity className="h-8 w-8" /></div>
            <div>
              <h3 className="font-bold text-2xl mb-2">Dynamic Risk Register</h3>
              <p className="text-slate-600 leading-relaxed">Automatically identify and classify emerging risks across the enterprise by connecting to internal communication channels and external news APIs.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-indigo-100 p-4 rounded-xl text-indigo-700"><Cpu className="h-8 w-8" /></div>
            <div>
              <h3 className="font-bold text-2xl mb-2">Scenario Modeling</h3>
              <p className="text-slate-600 leading-relaxed">Simulate market and operational shocks using multi-agent LLM systems to dynamically assess impact vectors across your business processes.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-indigo-100 p-4 rounded-xl text-indigo-700"><ShieldAlert className="h-8 w-8" /></div>
            <div>
              <h3 className="font-bold text-2xl mb-2">Automated Treatment</h3>
              <p className="text-slate-600 leading-relaxed">Suggest and assign mitigation tasks based on historical risk resolutions and best practices curated by the AI.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full bg-slate-100 h-96 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <p className="text-slate-400 font-medium">Risk Heatmap Visualization Component</p>
        </div>
      </div>
    </div>
  );
}