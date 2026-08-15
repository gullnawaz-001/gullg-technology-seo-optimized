import { activityLogMock } from '../../data';
import { ActivityEntry } from '../../types';
import { Clock, FileText, CheckCircle, PenTool, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Activity() {
  const getIcon = (desc: string) => {
    if (desc.includes('Milestone')) return <CheckCircle size={18} className="text-emerald-500" />;
    if (desc.includes('Contract')) return <PenTool size={18} className="text-blue-500" />;
    if (desc.includes('File')) return <FileText size={18} className="text-purple-500" />;
    if (desc.includes('ticket')) return <AlertCircle size={18} className="text-amber-500" />;
    return <Clock size={18} className="text-slate-500" />;
  };

  return (
    <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <Clock size={24} className="text-slate-700" /> Activity Log
      </h3>
      
      <div className="space-y-6">
        {activityLogMock.map((entry: ActivityEntry, i: number) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={entry.id} 
            className="flex gap-4"
          >
            <div className="mt-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center">
                {getIcon(entry.description)}
              </div>
            </div>
            <div className="flex-1 pb-6 border-b border-slate-100">
              <p className="text-slate-900 font-medium">{entry.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-500">{new Date(entry.timestamp).toLocaleString()}</span>
                <span className="text-slate-300">•</span>
                <span className={`text-xs font-bold ${entry.triggeredBy === 'Client' ? 'text-blue-600' : 'text-emerald-600'}`}>
                  {entry.triggeredBy === 'Client' ? 'You' : 'GullG Admin'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
