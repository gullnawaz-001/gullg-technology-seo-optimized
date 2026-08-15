import React from 'react';
import { Activity } from 'lucide-react';
import { SaaSAnalyticsDashboard } from './SaaSAnalyticsDashboard';

export function LiveDemoPreview({ work }: { work: any }) {
  if (!work) return null;

  if (work.demoType === 'app-analytics' || work.demoType === 'app-medqbank') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full text-slate-700">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h5 className="font-bold text-slate-900 flex items-center gap-2">
            <Activity size={18} className="text-blue-400" />
            {work.title} Demo
          </h5>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <SaaSAnalyticsDashboard />
        </div>
      </div>
    );
  }

  // Fallback for others
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
        <Activity size={32} className="text-blue-400" />
      </div>
      <h5 className="font-bold text-slate-900 mb-2">{work.title} Demo Available on Request</h5>
      <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
        Due to the nature of {work.category.toLowerCase()}, this project requires a personalized walkthrough.
      </p>
      <a
        href="https://wa.me/923365656071?text=Hello!%20I%20want%20to%20discuss%20a%20project%20related%20to%20your%20expertise."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-slate-900 font-bold text-sm rounded-lg transition-colors"
      >
        Request Live Walkthrough (+92 336 5656071)
      </a>
    </div>
  );
}
