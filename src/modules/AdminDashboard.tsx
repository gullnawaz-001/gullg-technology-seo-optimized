import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, MessageSquare, Settings, Bell, Search, Activity, ShieldAlert, ArrowRight, ArrowLeft, DollarSign, CreditCard, Calculator, Upload, FolderKanban, BookOpen } from 'lucide-react';
import { EstimatorAdmin } from '../components/EstimatorAdmin';
import { AdminUploads } from './AdminUploads';
import { AdminProjects } from './AdminProjects';
import { AdminKnowledgeHub } from './AdminKnowledgeHub';
import { ViewState } from '../types';
import { defaultServicesOptions, initialPaymentConfig } from '../data';
import { useGlobalStore } from '../store';

interface AdminDashboardProps {
  onNavigate: (view: ViewState) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('overview');
  const [servicesOptions, setServicesOptions] = useState(defaultServicesOptions);
  const [paymentConfig, setPaymentConfig] = useState(initialPaymentConfig);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, setNotifications } = useGlobalStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;


  useEffect(() => {
    const savedPricing = localStorage.getItem('gullg_services_pricing_v2');
    if (savedPricing) {
      try {
        setServicesOptions(JSON.parse(savedPricing));
      } catch (e) {
        console.error(e);
      }
    }
    const savedPayment = localStorage.getItem('gullg_payment_config');
    if (savedPayment) {
      try {
        setPaymentConfig(JSON.parse(savedPayment));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePriceChange = (id: string, newPrice: number) => {
    const updated = servicesOptions.map(s => s.id === id ? { ...s, basePrice: newPrice } : s);
    setServicesOptions(updated);
    localStorage.setItem('gullg_services_pricing_v2', JSON.stringify(updated));
  };

  const handlePaymentConfigChange = (section: 'paypal' | 'bankTransfer', field: string, value: string | boolean) => {
    const updated = {
      ...paymentConfig,
      [section]: {
        ...paymentConfig[section],
        [field]: value
      }
    };
    setPaymentConfig(updated);
    localStorage.setItem('gullg_payment_config', JSON.stringify(updated));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-sm font-semibold text-slate-500 mb-1">New Leads Today</div>
                <div className="text-3xl font-bold text-slate-900">12</div>
                <div className="text-xs text-emerald-500 font-medium mt-2">+24% from yesterday</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-sm font-semibold text-slate-500 mb-1">Active Client Portals</div>
                <div className="text-3xl font-bold text-slate-900">8</div>
                <div className="text-xs text-slate-400 font-medium mt-2">2 pending invites</div>
              </div>
              <div className="bg-slate-700 p-6 rounded-3xl border border-slate-600 text-white shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-semibold text-slate-300">System Status</div>
                  <ShieldAlert size={20} className="text-slate-300" />
                </div>
                <div className="text-3xl font-bold">Optimal</div>
                <div className="text-xs text-slate-300 font-medium mt-2">All services running</div>
              </div>
            </motion.div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Recent Lead Submissions</h3>
                <button className="text-sm font-semibold text-slate-700 flex items-center gap-1">View All <ArrowRight size={16} /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 ">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name / Company</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Needed</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { name: 'Alice Walker', company: 'TechNova', service: 'UI/UX Design', status: 'New' },
                      { name: 'John Doe', company: 'LogiFlow', service: 'AI Automation', status: 'Contacted' },
                      { name: 'Sarah Smith', company: 'RetailX', service: 'Web Development', status: 'In Progress' },
                    ].map((lead, i) => (
                      <tr key={i} className="hover:bg-slate-50 /50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{lead.name}</div>
                          <div className="text-xs text-slate-500">{lead.company}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{lead.service}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                            lead.status === 'New' ? 'bg-emerald-100 text-emerald-700' :
                            lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-200 text-slate-700' 
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm font-semibold text-slate-700 hover:text-slate-900 :text-white">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'leads':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Lead Management</h2>
             <p className="text-slate-600 mb-4">View and manage all incoming leads and inquiries from the contact form and calculator.</p>
             <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
               <Users size={48} className="mx-auto mb-4 opacity-50" />
               <p>No new leads in the queue.</p>
             </div>
          </motion.div>
        );
      case 'estimator':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
            <EstimatorAdmin />
          </motion.div>
        );

      case 'chatbot':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Chatbot Logs & Training</h2>
             <p className="text-slate-600 mb-4">Review historical conversations, train intents, and manage live handoffs.</p>
             <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
               <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
               <p>Chatbot analytics and logs will appear here.</p>
             </div>
          </motion.div>
        );
      case 'system':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">System Health & APIs</h2>
             <p className="text-slate-600 mb-4">Monitor API endpoints, database latency, and deployment status.</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {['Main API Server', 'PostgreSQL DB', 'Redis Cache', 'Background Workers'].map((sys, idx) => (
                 <div key={idx} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                   <span className="font-semibold text-slate-900">{sys}</span>
                   <span className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online</span>
                 </div>
               ))}
             </div>
          </motion.div>
        );
      case 'pricing':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Pricing</h2>
             <p className="text-slate-600 mb-6">Update base prices for the Project Estimator calculator.</p>
             <div className="space-y-4">
                {servicesOptions.map(service => (
                  <div key={service.id} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="font-bold text-slate-900">{service.title}</h4>
                      <p className="text-sm text-slate-500">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">$</span>
                      <input 
                        type="number"
                        value={service.basePrice}
                        onChange={(e) => handlePriceChange(service.id, Number(e.target.value))}
                        className="w-24 px-3 py-2 rounded-lg bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 font-bold"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </motion.div>
        );
      case 'payments':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Methods Configuration</h2>
               <p className="text-slate-600 mb-8">Manage the payment methods available to clients in the portal.</p>
               
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                 {/* PayPal Settings */}
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold text-slate-900">PayPal Integration</h3>
                     <label className="flex items-center cursor-pointer">
                       <div className="relative">
                         <input type="checkbox" className="sr-only" checked={paymentConfig.paypal.enabled} onChange={(e) => handlePaymentConfigChange('paypal', 'enabled', e.target.checked)} />
                         <div className={`block w-10 h-6 rounded-full transition-colors ${paymentConfig.paypal.enabled ? 'bg-emerald-500' : 'bg-slate-300' }`}></div>
                         <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${paymentConfig.paypal.enabled ? 'transform translate-x-4' : ''}`}></div>
                       </div>
                     </label>
                   </div>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-semibold text-slate-900 mb-2">PayPal Email</label>
                       <input 
                         type="email" 
                         value={paymentConfig.paypal.email}
                         onChange={(e) => handlePaymentConfigChange('paypal', 'email', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Mode</label>
                       <select 
                         value={paymentConfig.paypal.mode}
                         onChange={(e) => handlePaymentConfigChange('paypal', 'mode', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       >
                         <option value="sandbox">Sandbox (Testing)</option>
                         <option value="live">Live (Production)</option>
                       </select>
                     </div>
                   </div>
                 </div>

                 {/* Bank Transfer Settings */}
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold text-slate-900">Manual Bank Transfer</h3>
                     <label className="flex items-center cursor-pointer">
                       <div className="relative">
                         <input type="checkbox" className="sr-only" checked={paymentConfig.bankTransfer.enabled} onChange={(e) => handlePaymentConfigChange('bankTransfer', 'enabled', e.target.checked)} />
                         <div className={`block w-10 h-6 rounded-full transition-colors ${paymentConfig.bankTransfer.enabled ? 'bg-emerald-500' : 'bg-slate-300' }`}></div>
                         <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${paymentConfig.bankTransfer.enabled ? 'transform translate-x-4' : ''}`}></div>
                       </div>
                     </label>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="sm:col-span-2">
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Bank Name</label>
                       <input 
                         type="text" 
                         value={paymentConfig.bankTransfer.bankName}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'bankName', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div className="sm:col-span-2">
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Account Title / Name</label>
                       <input 
                         type="text" 
                         value={paymentConfig.bankTransfer.accountTitle}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'accountTitle', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div className="sm:col-span-2">
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Account Number / IBAN</label>
                       <input 
                         type="text" 
                         value={paymentConfig.bankTransfer.accountNumber}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'accountNumber', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-slate-900 mb-2">SWIFT/BIC Code</label>
                       <input 
                         type="text" 
                         value={paymentConfig.bankTransfer.swiftCode}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'swiftCode', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Routing/Sort Code</label>
                       <input 
                         type="text" 
                         value={paymentConfig.bankTransfer.routingNumber}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'routingNumber', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     
                     <div className="sm:col-span-2">
                       <label className="block text-sm font-semibold text-slate-900 mb-2">Payment Instructions</label>
                       <textarea 
                         rows={3}
                         value={paymentConfig.bankTransfer.instructions}
                         onChange={(e) => handlePaymentConfigChange('bankTransfer', 'instructions', e.target.value)}
                         className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                       />
                     </div>
                     <div className="sm:col-span-2 pt-2">
                       <button 
                         onClick={() => {
                           const btn = document.getElementById('save-payment-btn');
                           if (btn) {
                             const ogText = btn.innerText;
                             btn.innerText = 'Configuration Saved!';
                             btn.classList.add('!bg-emerald-600');
                             setTimeout(() => {
                               btn.innerText = ogText;
                               btn.classList.remove('!bg-emerald-600');
                             }, 2000);
                           }
                         }}
                         id="save-payment-btn"
                         className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 :bg-slate-600 transition-colors text-sm"
                       >
                         Save Configuration
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h2 className="text-2xl font-bold text-slate-900 mb-2">Invoices</h2>
                   <p className="text-slate-600">Track received payments and generate new invoices.</p>
                 </div>
                 <button className="px-5 py-2.5 bg-slate-700 text-white rounded-xl font-bold hover transition-colors text-sm">
                   Generate Invoice
                 </button>
               </div>
               
               <div className="space-y-4">
                  {[
                    { client: 'TechNova', amount: '$3,500', status: 'Paid', date: 'Oct 12, 2026' },
                    { client: 'LogiFlow', amount: '$5,000', status: 'Pending', date: 'Oct 14, 2026' },
                  ].map((payment, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                          <DollarSign size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{payment.client}</h4>
                          <p className="text-sm text-slate-500">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{payment.amount}</div>
                        <span className={`text-xs font-bold ${payment.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{payment.status}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        );
      case 'projects':
        return <AdminProjects />;
      case 'uploads':
        return <AdminUploads />;
      case 'knowledge-hub':
        return <AdminKnowledgeHub />;
      case 'settings':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Admin Settings</h2>
             <p className="text-slate-600 mb-6">Manage platform configuration, team access, and billing.</p>
             <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Platform Details</h4>
                  <p className="text-sm text-slate-500">Configure global site settings and metadata.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Team Members</h4>
                  <p className="text-sm text-slate-500">Invite new team members and assign roles.</p>
                </div>
             </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'gullnawaz@gmail.com' && password === 'EYAANlaiba@123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Website
          </button>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-md ring-2 ring-slate-100">
                <img src="/logo.png" alt="GullG Admin Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Engine</h1>
              <p className="text-slate-500 text-sm">Sign in to manage the platform</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium">
                  {loginError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Admin Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900" 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
              >
                Access System
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0 min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed bottom-0 top-0 left-0">
        <div className="p-6 border-b border-slate-200">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 :text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Website
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-slate-900 overflow-hidden shadow-sm flex items-center justify-center ring-1 ring-slate-800">
              <img src="/logo.png" alt="GullG Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-tight">GullG Admin</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Engine Control</span>
            </div>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'knowledge-hub', label: 'Knowledge Hub', icon: BookOpen },
              { id: 'uploads', label: 'Client Uploads', icon: Upload },
              { id: 'leads', label: 'Lead Management', icon: Users },
              { id: 'estimator', label: 'Client Offers', icon: Calculator },
              { id: 'pricing', label: 'Pricing', icon: DollarSign },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'chatbot', label: 'Chatbot Logs', icon: MessageSquare },
              { id: 'system', label: 'System Health', icon: Activity },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-slate-100 text-slate-900'  
                    : 'text-slate-600 hover:bg-slate-50 '
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Engine</h1>
            <p className="text-sm text-slate-500">Manage incoming leads, content, and system health.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm outline-none focus:border-slate-400 shadow-sm"
              />
            </div>
            <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 relative shadow-sm hover:bg-slate-50"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Notifications</h3>
                    <button 
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-sm">No notifications yet.</div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {notifications.map(notif => (
                          <div 
                            key={notif.id} 
                            onClick={() => {
                              setActiveTab('uploads');
                              setShowNotifications(false);
                              setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
                            }} className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.read ? 'bg-indigo-50/30' : ''}`}>
                            <div className="flex gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                              <div>
                                <p className="text-sm text-slate-900 font-medium">{notif.message}</p>
                                {notif.client && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    {notif.client} • {notif.project}
                                  </p>
                                )}
                                <p className="text-xs text-slate-400 mt-1">
                                  {new Date(notif.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
