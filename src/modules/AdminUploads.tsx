import React, { useState, useRef } from 'react';
import { Download, Filter, Search, CheckCircle, MessageSquare, FileText, Image, FileArchive, Video, UploadCloud, X, Send, Trash2 } from 'lucide-react';
import { ProjectFile } from '../types';
import { useGlobalStore } from '../store';

// Helper to get file icon based on extension
const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['zip', 'rar', 'tar', 'gz'].includes(ext || '')) return <FileArchive size={18} className="text-amber-500" />;
  if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || '')) return <Image size={18} className="text-emerald-500" />;
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext || '')) return <Video size={18} className="text-rose-500" />;
  return <FileText size={18} className="text-blue-500" />;
};

const getProjectName = (id?: string) => {
  if (id === 'cp1') return 'Corporate Website Redesign';
  if (id === 'cp2') return 'Logistix AI Integration';
  if (id === 'cp3') return 'AlphaCorp Rebranding';
  return id || 'Unknown Project';
};


const handleDownload = (file: ProjectFile) => {
  if (file.fileUrl) {
    const a = document.createElement('a');
    a.href = file.fileUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    const blob = new Blob(['Mock file content for ' + file.name], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export function AdminUploads() {
  // Use all files initially, then filter. Mock backend state.
  const { files, setFiles } = useGlobalStore();
  
  const [filterProject, setFilterProject] = useState('');
  const [filterClient, setFilterClient] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [replyingToFile, setReplyingToFile] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAcknowledge = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, acknowledged: !f.acknowledged } : f));
  };

  const handleSendReply = (targetFileId: string) => {
    const targetFile = files.find(f => f.id === targetFileId);
    if (!targetFile) return;

    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const uploadedFile = fileInputRef.current.files[0];
      const newFile: ProjectFile = {
        id: 'f' + Date.now(),
        name: uploadedFile.name,
        size: (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date().toISOString(),
        direction: 'Sent to Client',
        projectId: targetFile.projectId,
        clientName: targetFile.clientName,
        adminComment: replyComment,
        fileUrl: URL.createObjectURL(uploadedFile),
      };
      
      setFiles([newFile, ...files]);
      
      // Auto-acknowledge the file we are replying to
      setFiles(prev => prev.map(f => f.id === targetFileId ? { ...f, acknowledged: true } : f));

      setReplyingToFile(null);
      setReplyComment('');
      alert(`File sent back to \${targetFile.clientName}.`);
    } else {
      alert('Please select a file to send.');
    }
  };
  
  // Base filtering only shows files received from client in the main table,
  // but let's show all if we want, or maybe just "Received from Client" 
  // since the prompt says "Display all client-uploaded files in a table".
  const displayFiles = files;

  const filteredFiles = displayFiles.filter(f => {
    if (filterProject && f.projectId !== filterProject) return false;
    if (filterClient && f.clientName !== filterClient) return false;
    if (filterStatus) {
      if (filterStatus === 'new' && f.acknowledged) return false;
      if (filterStatus === 'reviewed' && !f.acknowledged) return false;
    }
    if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Extract unique clients for the dropdown
  const uniqueClients = Array.from(new Set(displayFiles.map(f => f.clientName).filter(Boolean)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Client Uploads</h2>
          <p className="text-slate-500">Files sent by clients across all active projects.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by file name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        
        <div className="relative w-full md:w-48 shrink-0">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none"
          >
            <option value="">All Projects</option>
            <option value="cp1">Corporate Website Redesign</option>
            <option value="cp2">Logistix AI Integration</option>
            <option value="cp3">AlphaCorp Rebranding</option>
          </select>
        </div>

        <div className="relative w-full md:w-48 shrink-0">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none"
          >
            <option value="">All Clients</option>
            {uniqueClients.map(client => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-40 shrink-0">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {displayFiles.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-slate-50/50">
              <UploadCloud size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No client uploads yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Files clients send through their portal will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">File Details</th>
                <th className="px-6 py-4">Uploaded By</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFiles.map(file => (
                <React.Fragment key={file.id}>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          {getFileIcon(file.name)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{file.name}</div>
                          <div className="text-xs text-slate-500">{file.size} • {new Date(file.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {file.direction === 'Sent to Client' ? (
                        <span className="text-slate-400">Admin <span className="text-xs font-normal">(to: {file.clientName})</span></span>
                      ) : (
                        file.clientName || 'Unknown'
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{getProjectName(file.projectId)}</td>
                    <td className="px-6 py-4">
                      {file.direction === 'Sent to Client' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                          Sent to Client
                        </span>
                      ) : file.acknowledged ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          Reviewed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleAcknowledge(file.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors \${
                            file.acknowledged 
                              ? 'text-slate-500 hover:bg-slate-200 bg-slate-100' 
                              : 'text-emerald-700 hover:bg-emerald-200 bg-emerald-100'
                          }`}
                        >
                          {file.acknowledged ? 'Mark New' : 'Mark Reviewed'}
                        </button>
                        
                        <button 
                          onClick={() => setReplyingToFile(replyingToFile === file.id ? null : file.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                        >
                          Send Back
                        </button>

                        <button 
                          onClick={() => handleDownload(file)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors ml-1"
                          title="Download File"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={() => setFiles(files.filter(f => f.id !== file.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100 bg-slate-100 rounded-lg transition-colors ml-1"
                          title="Delete File"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline Reply Form */}
                  {replyingToFile === file.id && (
                    <tr className="bg-indigo-50/50">
                      <td colSpan={5} className="px-6 py-4 border-t border-indigo-100">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="flex-1 w-full">
                            <input 
                              type="text" 
                              placeholder="Add a short note for the client (optional)..." 
                              value={replyComment}
                              onChange={(e) => setReplyComment(e.target.value)}
                              className="w-full px-4 py-2 bg-white border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                            />
                            <button 
                              onClick={() => handleSendReply(file.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                              <Send size={16} />
                              Send
                            </button>
                            <button 
                              onClick={() => setReplyingToFile(null)}
                              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredFiles.length === 0 && displayFiles.length > 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No uploads match your selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
