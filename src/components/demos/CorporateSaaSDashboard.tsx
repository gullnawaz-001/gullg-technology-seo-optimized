import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, BarChart3, Receipt, CreditCard, Users, Settings,
  Search, Bell, ChevronDown, Calendar, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, Download, Menu
} from 'lucide-react';

const COLORS = {
  primary: '#0EA5E9',
  primaryDark: '#0369A1',
  secondary: '#38BDF8',
  bgMain: '#F0F4F8',
  bgCard: '#FFFFFF',
  textMain: '#1E293B',
  textMuted: '#64748B',
  border: '#E2E8F0',
  positive: '#10B981',
  negative: '#EF4444'
};

const MOCK_TRANSACTIONS = [
  { id: 'TRX-1092', client: 'Acme Corp', plan: 'Enterprise', amount: 2400, method: 'Wire Transfer', status: 'Paid', date: 'Oct 24, 2026' },
  { id: 'TRX-1091', client: 'Nexus Tech', plan: 'Growth', amount: 899, method: 'Credit Card', status: 'Pending', date: 'Oct 23, 2026' },
  { id: 'TRX-1090', client: 'Global Media', plan: 'Starter', amount: 299, method: 'Credit Card', status: 'Failed', date: 'Oct 22, 2026' },
  { id: 'TRX-1089', client: 'CloudSynergy', plan: 'Enterprise', amount: 2400, method: 'Wire Transfer', status: 'Paid', date: 'Oct 21, 2026' },
];

const MOCK_INVOICES = [
  { id: 'INV-2026-10', amount: 2400, status: 'Unpaid', date: 'Oct 1, 2026', due: 'Oct 31, 2026' },
  { id: 'INV-2026-09', amount: 2400, status: 'Paid', date: 'Sep 1, 2026', due: 'Sep 30, 2026' },
  { id: 'INV-2026-08', amount: 2400, status: 'Paid', date: 'Aug 1, 2026', due: 'Aug 31, 2026' },
];

const REV_EXPENSES_DATA = [
  { name: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { name: 'Feb', revenue: 45000, expenses: 29000, profit: 16000 },
  { name: 'Mar', revenue: 48000, expenses: 31000, profit: 17000 },
  { name: 'Apr', revenue: 52000, expenses: 32000, profit: 20000 },
  { name: 'May', revenue: 58000, expenses: 34000, profit: 24000 },
  { name: 'Jun', revenue: 64000, expenses: 35000, profit: 29000 },
];

const TELEMETRY_DATA = [
  { name: 'Mon', apiCalls: 120, computeCost: 45 },
  { name: 'Tue', apiCalls: 132, computeCost: 52 },
  { name: 'Wed', apiCalls: 101, computeCost: 38 },
  { name: 'Thu', apiCalls: 145, computeCost: 58 },
  { name: 'Fri', apiCalls: 190, computeCost: 75 },
  { name: 'Sat', apiCalls: 85, computeCost: 30 },
  { name: 'Sun', apiCalls: 75, computeCost: 28 },
];

const REGIONAL_DATA = [
  { name: 'North America', value: 55 },
  { name: 'Europe', value: 30 },
  { name: 'APAC', value: 15 },
];
const PIE_COLORS = ['#0EA5E9', '#38BDF8', '#7DD3FC'];

const USAGE_DATA = [
  { name: 'Week 1', database: 4000, storage: 2400, bandwidth: 2400 },
  { name: 'Week 2', database: 3000, storage: 1398, bandwidth: 2210 },
  { name: 'Week 3', database: 2000, storage: 9800, bandwidth: 2290 },
  { name: 'Week 4', database: 2780, storage: 3908, bandwidth: 2000 },
];

export function CorporateSaaSDashboard() {
  const [viewMode, setViewMode] = useState<'admin' | 'client'>('admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="flex h-full w-full font-sans overflow-hidden bg-slate-50 text-slate-900">
      
      {/* Sidebar */}
      <div className={`bg-[#1E293B] text-white transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-700">
          {sidebarOpen && <span className="font-bold text-lg tracking-tight"><span className="text-sky-400">SaaS</span>Analytics</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar flex flex-col">
          <nav className="space-y-1 px-2">
            {[
              { icon: LayoutDashboard, label: 'Dashboard' },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Receipt, label: 'Invoices' },
              { icon: CreditCard, label: 'Transactions' },
              { icon: Users, label: 'Team' },
              { icon: Settings, label: 'Settings' },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActivePage(item.label)} 
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activePage === item.label ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <item.icon size={20} className="min-w-[20px]" />
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-sm font-bold shadow-lg">JD</div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Jane Doe</p>
                <p className="text-xs text-slate-400 truncate">jane@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            
            {/* Role Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('admin')}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'admin' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Admin Mode
              </button>
              <button 
                onClick={() => setViewMode('client')}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'client' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Client Mode
              </button>
            </div>
            
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all" />
            </div>
            
            <div className="hidden sm:flex items-center gap-2 border-r border-slate-200 pr-4">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 px-2 py-1.5 rounded-md">
                <Calendar size={16} /> Last 30 Days
              </button>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 px-2 py-1.5 rounded-md">
                USD ($) <ChevronDown size={14} />
              </button>
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-[#F0F4F8]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {activePage === 'Dashboard' && (
              viewMode === 'admin' ? (
                // ================= ADMIN VIEW =================
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Admin KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: 'Total ARR', value: '$579,000', trend: '+14.2% YoY', icon: DollarSign, positive: true },
                    { title: 'Net Rev vs Churn', value: '108% / 1.8%', trend: 'Healthy', icon: Activity, positive: true },
                    { title: 'Active Subs', value: '1,248', trend: '+8.2%', icon: Users, positive: true },
                    { title: 'LTV : CAC', value: '$1.8k : $142', trend: '13.0x Ratio', icon: CreditCard, positive: true },
                  ].map((kpi, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                          <kpi.icon size={20} />
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {kpi.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {kpi.trend}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</p>
                      <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Admin Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Revenue Chart */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue vs. Expenses</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REV_EXPENSES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.border} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} tickFormatter={(v) => `$${v/1000}k`} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontWeight: 'bold' }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke={COLORS.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          <Area type="monotone" dataKey="expenses" name="Operating Expenses" stroke={COLORS.negative} strokeWidth={2} fill="none" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Regional Donut */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Regional Distribution</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={REGIONAL_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {REGIONAL_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Telemetry & Transactions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Telemetry Bar Chart */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">System Telemetry & Costs</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={TELEMETRY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.border} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} />
                          <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} tickFormatter={(v) => `$${v}`} />
                          <Tooltip cursor={{ fill: COLORS.bgMain }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="apiCalls" name="API Calls (k)" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
                          <Bar yAxisId="right" dataKey="computeCost" name="Compute Cost ($)" fill={COLORS.primaryDark} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                      <h3 className="text-lg font-bold text-slate-900">Enterprise Transactions</h3>
                      <button className="text-sm font-semibold text-sky-600 hover:text-sky-700">View All</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                            <th className="px-5 py-3">ID / Client</th>
                            <th className="px-5 py-3">Amount</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3 text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {MOCK_TRANSACTIONS.map((txn, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3">
                                <p className="font-bold text-slate-900">{txn.client}</p>
                                <p className="text-xs text-slate-500 font-mono">{txn.id} • {txn.plan}</p>
                              </td>
                              <td className="px-5 py-3 font-bold text-slate-900">${txn.amount.toLocaleString()}</td>
                              <td className="px-5 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  txn.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                                  txn.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {txn.status}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-right text-slate-500 text-xs">{txn.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              // ================= CLIENT VIEW =================
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Client Executive Summary Header */}
                <div className="bg-gradient-to-br from-sky-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                  
                  <h2 className="text-3xl font-bold mb-2">Welcome back, Acme Corp</h2>
                  <p className="text-sky-100 mb-8 max-w-xl text-lg">Here's your high-level executive report and billing summary for the current cycle.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div>
                      <p className="text-sky-200 text-sm font-medium mb-1">Total Spent This Cycle</p>
                      <h3 className="text-3xl font-bold">$2,400.00</h3>
                    </div>
                    <div className="hidden sm:block w-px bg-white/20"></div>
                    <div>
                      <p className="text-sky-200 text-sm font-medium mb-1">Next Billing Date</p>
                      <h3 className="text-3xl font-bold">Nov 1, 2026</h3>
                    </div>
                    <div className="hidden sm:block w-px bg-white/20"></div>
                    <div>
                      <p className="text-sky-200 text-sm font-medium mb-1">Active Plan Tier</p>
                      <div className="flex items-center gap-2">
                        <h3 className="text-3xl font-bold">Enterprise</h3>
                        <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-sky-50 text-sky-600">
                      <Activity size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total API Consumption</p>
                      <h3 className="text-2xl font-bold text-slate-900">1.24M <span className="text-base font-normal text-slate-400">/ 2M calls</span></h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-sky-50 text-sky-600">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Account Credits</p>
                      <h3 className="text-2xl font-bold text-slate-900">$500.00</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-sky-50 text-sky-600">
                      <Receipt size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Outstanding Invoices</p>
                      <h3 className="text-2xl font-bold text-red-600">1 <span className="text-base font-normal text-slate-400">($2,400)</span></h3>
                    </div>
                  </div>
                </div>

                {/* Client Charts & Billing Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Monthly Usage Stacked Bar */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Resource Usage Trends</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.border} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: COLORS.textMuted }} />
                          <Tooltip cursor={{ fill: COLORS.bgMain }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Legend />
                          <Bar dataKey="database" name="Database I/O" stackId="a" fill={COLORS.primaryDark} />
                          <Bar dataKey="storage" name="Storage" stackId="a" fill={COLORS.primary} />
                          <Bar dataKey="bandwidth" name="Bandwidth" stackId="a" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-900">Billing History</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                      {MOCK_INVOICES.map((inv, idx) => (
                        <div key={idx} className="flex flex-wrap items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${inv.status === 'Paid' ? 'bg-slate-100 text-slate-500' : 'bg-red-50 text-red-500'}`}>
                              <Receipt size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{inv.id}</p>
                              <p className="text-xs text-slate-500">Issued: {inv.date} • Due: {inv.due}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 mt-4 sm:mt-0">
                            <div className="text-right">
                              <p className="font-bold text-slate-900">${inv.amount.toLocaleString()}</p>
                              <span className={`text-xs font-bold ${inv.status === 'Paid' ? 'text-emerald-600' : 'text-red-600'}`}>{inv.status}</span>
                            </div>
                            {inv.status === 'Unpaid' ? (
                              <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-sky-600/20 transition-colors">
                                Pay Now
                              </button>
                            ) : (
                              <button className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                                <Download size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
              )
            )}
            
            {activePage === 'Analytics' && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96">
                <BarChart3 size={48} className="text-sky-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics</h2>
                <p className="text-slate-500 max-w-md">Detailed performance metrics, user behavior flow, and custom report generation are available in the full version.</p>
              </div>
            )}

            {activePage === 'Invoices' && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96">
                <Receipt size={48} className="text-sky-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Invoices</h2>
                <p className="text-slate-500 max-w-md">Manage your billing cycles, download past invoices, and update payment methods.</p>
              </div>
            )}

            {activePage === 'Transactions' && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96">
                <CreditCard size={48} className="text-sky-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Transactions</h2>
                <p className="text-slate-500 max-w-md">Real-time ledger of all account activities, charges, and refunds.</p>
              </div>
            )}

            {activePage === 'Team' && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96">
                <Users size={48} className="text-sky-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Management</h2>
                <p className="text-slate-500 max-w-md">Invite members, manage role-based access control, and assign licenses.</p>
              </div>
            )}

            {activePage === 'Settings' && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96">
                <Settings size={48} className="text-sky-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Settings</h2>
                <p className="text-slate-500 max-w-md">Configure workspace preferences, API keys, integrations, and notification rules.</p>
              </div>
            )}

          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}</style>
    </div>
  );
}
