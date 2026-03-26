export default function ROI() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">Return on Investment</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Quantifiable time savings across all GRC activities using ComplyVerse AI.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-100 text-indigo-900">
            <tr>
              <th className="p-6 font-bold text-lg">Activity</th>
              <th className="p-6 font-bold text-lg">❌ Manual Process</th>
              <th className="p-6 font-bold text-lg">✅ With ComplyVerse AI</th>
              <th className="p-6 font-bold text-lg">⏱ Time Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr className="hover:bg-slate-50 transition">
              <td className="p-6 font-medium text-lg">Policy Drafting & Updates</td>
              <td className="p-6">12-15 hours/policy</td>
              <td className="p-6 font-semibold text-indigo-700">1-2 hours (Review only)</td>
              <td className="p-6 text-green-600 font-bold text-xl">85%</td>
            </tr>
            <tr className="hover:bg-slate-50 transition">
              <td className="p-6 font-medium text-lg">Risk Assessment Cycles</td>
              <td className="p-6">3-4 weeks/dept</td>
              <td className="p-6 font-semibold text-indigo-700">2-3 days</td>
              <td className="p-6 text-green-600 font-bold text-xl">80%</td>
            </tr>
            <tr className="hover:bg-slate-50 transition">
              <td className="p-6 font-medium text-lg">Evidence Collection</td>
              <td className="p-6">100+ hours (Audit Prep)</td>
              <td className="p-6 font-semibold text-indigo-700">Continuous / Automated</td>
              <td className="p-6 text-green-600 font-bold text-xl">95%</td>
            </tr>
            <tr className="hover:bg-slate-50 transition">
              <td className="p-6 font-medium text-lg">Board Reporting Generation</td>
              <td className="p-6">3-5 days</td>
              <td className="p-6 font-semibold text-indigo-700">On-demand (Minutes)</td>
              <td className="p-6 text-green-600 font-bold text-xl">99%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}