import React from 'react';
import { useGlobalStore } from '../store';
import { ClientProject } from '../types';
import { Users } from 'lucide-react';

export function AdminProjects() {
  const { projects, setProjects } = useGlobalStore();

  const handleProgressChange = (id: string, newProgress: number) => {
    setProjects(projects.map((p: ClientProject) => 
      p.id === id ? { ...p, progress: newProgress } : p
    ));
  };

  const handleStatusChange = (id: string, newStatus: ClientProject['status']) => {
    setProjects(projects.map((p: ClientProject) => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const groupedProjects = projects.reduce((acc, project) => {
    const client = project.clientName || 'Unknown Client';
    if (!acc[client]) acc[client] = [];
    acc[client].push(project);
    return acc;
  }, {} as Record<string, ClientProject[]>);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Management</h2>
          <p className="text-slate-500 mt-1">Update client project phases and progress indicators.</p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedProjects).map(([clientName, clientProjects]) => (
          <div key={clientName} className="bg-white rounded-3xl ring-1 ring-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Users size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{clientName}</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phase / Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientProjects.map(project => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{project.name}</span>
                      <div className="text-xs text-slate-500 mt-1">Due: {project.dueDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value as any)}
                        className="bg-slate-100 border-transparent rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 py-2 px-3"
                      >
                        <option value="planning">Planning</option>
                        <option value="design">Design</option>
                        <option value="development">Development</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="qa">QA</option>
                        <option value="deployment">Deployment</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={project.progress}
                          onChange={(e) => handleProgressChange(project.id, parseInt(e.target.value, 10))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="text-sm font-bold text-slate-700 w-12 text-right">{project.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
