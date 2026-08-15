import { ClientProject, Milestone } from '../../types';
import { CheckCircle, Circle, ArrowLeft, PenTool } from 'lucide-react';
import { motion } from 'motion/react';

export function ProjectDetails({ project, onBack, onViewContract }: { project: ClientProject, onBack: () => void, onViewContract: () => void }) {
  
  return (
    <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={onBack} className="text-sm font-semibold text-slate-500 hover:text-slate-900 mb-2 block">
            &larr; Back to Dashboard
          </button>
          <h3 className="text-2xl font-bold text-slate-900">{project.name}</h3>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500 mt-1">Status: {project.status}</p>
        </div>
        {project.contract && (
          <button 
            onClick={onViewContract}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${project.contract.signed ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            <PenTool size={16} />
            {project.contract.signed ? 'View Signed Contract' : 'Sign Agreement'}
          </button>
        )}
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-end mb-2">
          <span className="font-bold text-slate-900">Overall Progress</span>
          <span className="text-lg font-bold text-slate-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-slate-700'}`}
          ></motion.div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-slate-900 mb-6">Milestones</h4>
      
      {project.milestones && project.milestones.length > 0 ? (
        <div className="relative border-l-2 border-slate-100 ml-3 md:ml-4 space-y-8">
          {project.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';
            
            return (
              <motion.div 
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8"
              >
                <div className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-emerald-500 text-white' : 
                  isInProgress ? 'bg-amber-400 text-white ring-4 ring-amber-100' : 
                  'bg-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle size={14} /> : <Circle size={10} className={isInProgress ? 'fill-white' : 'fill-slate-400'} />}
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h5 className="font-bold text-slate-900 text-lg">{milestone.name}</h5>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold w-fit ${
                      isCompleted ? 'bg-emerald-100 text-emerald-700' : 
                      isInProgress ? 'bg-amber-100 text-amber-700' : 
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
                    <p>Target: <strong className="text-slate-700">{new Date(milestone.targetDate).toLocaleDateString()}</strong></p>
                    {milestone.completionDate && (
                      <p>Completed on: <strong className="text-emerald-600">{new Date(milestone.completionDate).toLocaleDateString()}</strong></p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
          No detailed milestones available for this project.
        </div>
      )}
    </div>
  );
}
