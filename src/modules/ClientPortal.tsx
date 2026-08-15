import React, { useState, useEffect } from 'react';
import { useGlobalStore } from "../store";
import { initialPaymentConfig, initialFilesMock } from '../data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FileText, Clock, CheckCircle, UploadCloud, Download, Activity, LogIn, UserPlus, ArrowRight, CreditCard, DollarSign, Home, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClientCalculator } from '../components/ClientCalculator';

import { Support } from './ClientPortal/Support';
import { Activity as ActivityTab } from './ClientPortal/Activity';
import { ProjectDetails } from './ClientPortal/ProjectDetails';
import { Notifications } from './ClientPortal/Notifications';
import { ContractView } from './ClientPortal/ContractView';
import { generateInvoicePDF } from './ClientPortal/InvoiceGenerator';


const analyticsData = [
  { name: 'Mon', views: 4000, interactions: 2400 },
  { name: 'Tue', views: 3000, interactions: 1398 },
  { name: 'Wed', views: 2000, interactions: 9800 },
  { name: 'Thu', views: 2780, interactions: 3908 },
  { name: 'Fri', views: 1890, interactions: 4800 },
  { name: 'Sat', views: 2390, interactions: 3800 },
  { name: 'Sun', views: 3490, interactions: 4300 },
];

import { ViewState, ProjectFile } from '../types';

interface ClientPortalProps {
  onNavigate?: (view: ViewState) => void;
}


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

export function ClientPortal({ onNavigate }: ClientPortalProps = {}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp'>('login');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'billing' | 'estimator' | 'support' | 'activity'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { files, setFiles, notifications, setNotifications, projects } = useGlobalStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [viewingContract, setViewingContract] = useState<any>(null);
  const [paymentConfig, setPaymentConfig] = useState(initialPaymentConfig);
  const [referenceNo, setReferenceNo] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      const newFile: ProjectFile = {
        id: 'f' + Date.now(),
        name: uploadedFile.name,
        size: (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date().toISOString(),
        direction: 'Received from Client',
        projectId: selectedProject?.id || 'cp1',
        clientName: (localStorage.getItem('gullg_client_name') || 'Demo Client'),
        acknowledged: false,
        fileUrl: URL.createObjectURL(uploadedFile)
      };
      
      setFiles([newFile, ...files]);
      
      const newNotif = {
        id: 'notif-' + Date.now(),
        message: `New file uploaded by ${(localStorage.getItem('gullg_client_name') || 'Demo Client')}: ${uploadedFile.name}`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'file',
        client: (localStorage.getItem('gullg_client_name') || 'Demo Client'),
        project: selectedProject?.name || 'Corporate Website Redesign'
      };
      setNotifications([newNotif, ...notifications]);
      
      
      
      alert(`File "${uploadedFile.name}" uploaded successfully. Admin has been notified.`);
    }
  };

  
  // OTP state
  const [regData, setRegData] = useState({ fullName: '', email: '', password: '' });
  const [otpValue, setOtpValue] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedPayment = localStorage.getItem('gullg_payment_config');
    if (savedPayment) {
      try {
        setPaymentConfig(JSON.parse(savedPayment));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={authMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl ring-1 ring-slate-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-md ring-2 ring-slate-100">
                <img src="/logo.png" alt="GullG Technology Logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {authMode === 'login' ? 'Client Login' : authMode === 'register' ? 'Create Account' : 'Verify Email'}
              </h2>
              <p className="text-slate-500 text-sm">
                {authMode === 'login' ? 'Access your project dashboard and assets.' : authMode === 'register' ? 'Sign up to track your projects with GullG.' : `We sent an OTP to ${regData.email}`}
              </p>
            </div>
            
            <form onSubmit={async (e) => { 
                e.preventDefault(); 
                setAuthError('');
                
                if (authMode === 'login') {
                  const form = e.target as HTMLFormElement;
                  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                  if (emailInput) localStorage.setItem('gullg_client_email', emailInput.value);
                  setIsAuthenticated(true);
                } else if (authMode === 'register') {
                  const form = e.target as HTMLFormElement;
                  const nameInput = form.elements.namedItem('fullName') as HTMLInputElement;
                  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                  const passInput = form.elements.namedItem('password') as HTMLInputElement;
                  
                  const data = {
                    fullName: nameInput.value,
                    email: emailInput.value,
                    password: passInput.value
                  };
                  
                  setRegData(data);
                  setAuthLoading(true);
                  
                  try {
                    const res = await fetch('/api/send-otp', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: data.email, fullName: data.fullName })
                    });
                    
                    if (!res.ok) {
                      throw new Error('Failed to send OTP');
                    }
                    
                    setAuthMode('otp');
                  } catch (err) {
                    setAuthError('Error sending OTP. Please try again.');
                  } finally {
                    setAuthLoading(false);
                  }
                } else if (authMode === 'otp') {
                  setAuthLoading(true);
                  try {
                    const res = await fetch('/api/verify-otp', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: regData.email, otp: otpValue })
                    });
                    
                    if (!res.ok) {
                      throw new Error('Invalid OTP');
                    }
                    
                    localStorage.setItem('gullg_client_name', regData.fullName);
                    localStorage.setItem('gullg_client_email', regData.email);
                    setIsAuthenticated(true);
                  } catch (err) {
                    setAuthError('Invalid or expired OTP. Please try again.');
                  } finally {
                    setAuthLoading(false);
                  }
                }
              }} className="space-y-4">
              
              {authError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium">
                  {authError}
                </div>
              )}
              
              {authMode === 'otp' ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">6-Digit Verification Code</label>
                  <input value={otpValue} onChange={(e) => setOtpValue(e.target.value)} type="text" maxLength={6} required placeholder="123456" className="w-full px-4 py-3 text-center tracking-widest text-lg rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" />
                </div>
              ) : (
                <>
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                      <input name="fullName" type="text" placeholder="John Doe" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                    <input name="email" type="email" required placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                    <input name="password" type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" />
                  </div>
                </>
              )}
              
              <button disabled={authLoading} type="submit" className="w-full py-4 mt-6 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {authLoading ? 'Processing...' : authMode === 'login' ? 'Access Dashboard' : authMode === 'register' ? 'Register Account' : 'Verify & Continue'}
                {!authLoading && <ArrowRight size={18} />}
              </button>
            </form>
            
            {authMode !== 'otp' && (
              <div className="mt-6 text-center text-sm text-slate-500">
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setAuthMode('register')} className="text-slate-700 font-semibold hover:underline">Sign up</button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('login')} className="text-slate-700 font-semibold hover:underline">Log in</button>
                  </>
                )}
              </div>
            )}
            
            {authMode === 'otp' && (
              <div className="mt-6 text-center text-sm text-slate-500">
                <button onClick={() => { setAuthMode('register'); setOtpValue(''); setAuthError(''); }} className="text-slate-700 font-semibold hover:underline">
                  Back to Registration
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-slate-200/50 p-6 rounded-3xl border border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-10 h-10 bg-slate-900 rounded-xl overflow-hidden shadow-sm inline-flex items-center justify-center ring-1 ring-slate-300">
                <img src="/logo.png" alt="GullG Logo" className="w-full h-full object-cover" />
              </span>
              Welcome back, {(localStorage.getItem('gullg_client_name') || 'Demo Client')}
            </h1>
            <p className="text-slate-500 mt-2">Here's the status of your ongoing projects with GullG Technology.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setSelectedProject(null); setViewingContract(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => { setActiveTab('billing'); setSelectedProject(null); setViewingContract(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'billing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Billing & Payments
              </button>
              <button 
                onClick={() => { setActiveTab('estimator'); setSelectedProject(null); setViewingContract(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'estimator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Offers & Inbox
              </button>
              <button 
                onClick={() => { setActiveTab('support'); setSelectedProject(null); setViewingContract(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'support' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Support
              </button>
              <button 
                onClick={() => { setActiveTab('activity'); setSelectedProject(null); setViewingContract(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'activity' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Activity
              </button>
</div>
            
            <Notifications />
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                if (onNavigate) {
                  onNavigate('landing');
                }
              }}
              className="px-4 py-2 rounded-lg bg-white text-slate-600 font-medium ring-1 ring-slate-200 hover:bg-slate-50 :bg-slate-700"
            >
              Log Out
            </button>
  
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {viewingContract ? (
              <ContractView 
                contract={viewingContract} 
                onSign={(name) => {
                  const updatedContract = {
                    ...viewingContract,
                    signed: true,
                    signedBy: name,
                    signedAt: new Date().toISOString()
                  };
                  setViewingContract(updatedContract);
                  if (selectedProject) {
                    setSelectedProject({ ...selectedProject, contract: updatedContract });
                  }
                }} 
              />
            ) : selectedProject ? (
              <ProjectDetails 
                project={selectedProject} 
                onBack={() => setSelectedProject(null)} 
                onViewContract={() => setViewingContract(selectedProject.contract)} 
              />
            ) : (<>
              {/* STATS WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Projects', value: '2', icon: Activity, color: 'text-slate-700' },
            { label: 'Milestones Reached', value: '14', icon: CheckCircle, color: 'text-emerald-500' },
            { label: 'Pending Reviews', value: '3', icon: Clock, color: 'text-amber-500' },
            { label: 'Invoices Paid', value: '$24.5k', icon: FileText, color: 'text-slate-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 ring-1 ring-slate-100 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROJECT TRACKER */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Active Projects Progress</h3>
              <div className="space-y-8">
                {projects.map(project => (
                  <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer group hover:bg-slate-50 p-4 -mx-4 rounded-2xl transition-colors">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{project.name}</h4>
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Phase: {project.status}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-700">{project.progress}%</div>
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
                ))}
              </div>
            </div>

            {/* ANALYTICS */}
            <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Product Analytics Preview</h3>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      />
                      <Bar dataKey="views" fill="#334155" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="interactions" fill="#64748b" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* ASSET MANAGER */}
          <div className="space-y-8">
             <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Deliverables & Assets</h3>
                

                <div 
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-8 relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <UploadCloud size={32} className="mx-auto text-slate-500 mb-3" />
                  <p className="text-sm font-medium text-slate-900">Upload Feedback / Assets</p>
                  <p className="text-xs text-slate-500 mt-1">Drag & drop or click to browse</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Files</h4>
                  {files.map((file) => (
                    <div key={file.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 ring-1 ring-slate-100 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">{file.size} • {new Date(file.date).toLocaleDateString()}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              file.direction === 'Sent to Client' 
                                ? 'bg-indigo-100 text-indigo-700' 
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {file.direction}
                            </span>
                            {file.direction === 'Received from Client' && file.acknowledged && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                                Reviewed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => handleDownload(file)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                          <Download size={18} />
                        </button>
                        <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
             </div>
          </div>
        </div>
        </>
            )}
        </motion.div>
        )}

        {activeTab === 'billing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Invoices & History</h3>
                <div className="space-y-4">
                  {[
                    { id: 'INV-2026-042', amount: '$3,500.00', status: 'Unpaid', date: 'Due Oct 30, 2026', description: 'UI/UX Design System Milestone' },
                    { id: 'INV-2026-038', amount: '$1,500.00', status: 'Paid', date: 'Paid Oct 12, 2026', description: 'Project Kickoff Retainer' },
                    { id: 'INV-2026-015', amount: '$5,000.00', status: 'Paid', date: 'Paid Sep 01, 2026', description: 'Custom Web Application - Phase 1' },
                  ].map((inv) => (
                    <div key={inv.id} className="p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900">{inv.id}</h4>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700' }`}>
                            {inv.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{inv.description}</p>
                        <p className="text-xs text-slate-500 mt-1">{inv.date}</p>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2">
                        <div className="text-lg font-bold text-slate-900">{inv.amount}</div>
                        {inv.status === 'Unpaid' && (
                          <button className="px-3 py-1.5 bg-slate-700 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
                            Pay Now
                          </button>
                        )}
                        {inv.status === 'Paid' && (
                          <button onClick={() => generateInvoicePDF(inv)} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full"><Download size={14} /> Receipt</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="text-slate-500" />
                  <h3 className="text-xl font-bold text-slate-900">Make a Payment</h3>
                </div>
                
                <div className="space-y-6">
                  {paymentConfig.paypal.enabled && (
                    <div className="p-6 rounded-2xl bg-blue-50  border border-blue-200 ">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        Pay via PayPal
                      </h4>
                      <p className="text-sm text-slate-600 mb-4">
                        Send payments directly to our official PayPal account.
                      </p>
                      <div className="bg-white p-3 rounded-xl text-center border border-slate-200 font-mono text-sm mb-4">
                        {paymentConfig.paypal.email}
                      </div>
                      <a href={`https://paypal.me/${paymentConfig.paypal.email}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center bg-[#0070ba] text-white rounded-xl font-bold hover:bg-[#005ea6] transition-colors text-sm">
                        Proceed to PayPal
                      </a>
                    </div>
                  )}

                  {paymentConfig.bankTransfer.enabled && (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        Bank Transfer / Wire
                      </h4>
                      <p className="text-sm text-slate-600 mb-4">
                        Direct bank wire transfer with official invoice details.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm text-slate-500">Bank</span>
                          <span className="text-sm font-bold text-slate-900">{paymentConfig.bankTransfer.bankName}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm text-slate-500">Account Name</span>
                          <span className="text-sm font-bold text-slate-900">{paymentConfig.bankTransfer.accountTitle}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm text-slate-500">Account / IBAN</span>
                          <span className="text-sm font-bold text-slate-900">{paymentConfig.bankTransfer.accountNumber}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm text-slate-500">SWIFT / BIC</span>
                          <span className="text-sm font-bold text-slate-900">{paymentConfig.bankTransfer.swiftCode}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm text-slate-500">Routing / Sort Code</span>
                          <span className="text-sm font-bold text-slate-900">{paymentConfig.bankTransfer.routingNumber}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200 mb-6">
                        {paymentConfig.bankTransfer.instructions}
                      </div>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Transaction Ref / Order ID</label>
                          <input
                            type="text"
                            placeholder="Enter Transaction ID or Reference"
                            value={referenceNo}
                            onChange={(e) => setReferenceNo(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">Upload Receipt (Optional)</label>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 :bg-slate-800 file:text-slate-700 :text-slate-300 hover:file:bg-slate-100 :file:bg-slate-700"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            const btn = e.currentTarget;
                            const ogText = btn.innerText;
                            btn.innerText = 'Details Submitted!';
                            btn.classList.add('!bg-emerald-600');
                            setTimeout(() => {
                              btn.innerText = ogText;
                              btn.classList.remove('!bg-emerald-600');
                              setReferenceNo('');
                            }, 2000);
                          }}
                          className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 :bg-slate-600 transition-colors text-sm mt-2"
                        >
                          Submit Bank Transfer Details
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!paymentConfig.paypal.enabled && !paymentConfig.bankTransfer.enabled && (
                    <div className="text-center p-6 text-slate-500">
                      No payment methods currently available. Please contact support.
                    </div>
                  )}

                  <div className="mt-6 p-4 border border-dashed border-slate-300 rounded-lg bg-emerald-50/50  text-center">
                    <h4 className="text-sm font-semibold text-slate-900">Need Another Payment Method?</h4>
                    <p className="text-xs text-slate-600 mt-1 mb-3">
                      Contact us directly on WhatsApp to ask for alternative bank accounts, local transfers, or custom arrangements.
                    </p>
                    
                    <a
                      href={`https://wa.me/923365656071?text=${encodeURIComponent('Hello! I would like to request alternative bank details / payment methods for my purchase.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md shadow-sm transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Chat on WhatsApp (+92 336 5656071)</span>
                    </a>
                  </div>
                </div>
            </div>
          </div>
          </motion.div>
        )}
        {activeTab === 'support' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <Support />
          </motion.div>
        )}
        {activeTab === 'activity' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <ActivityTab />
          </motion.div>
        )}
        {activeTab === 'estimator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <ClientCalculator />
          </motion.div>
        )}

      </div>
    </div>
  );
}
