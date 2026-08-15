import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, Bell, Home, Users, Calendar, Mail, 
  CreditCard, Settings, ChevronRight, CheckCircle2, Circle, 
  MoreVertical, FileText, Download, TrendingUp, DollarSign, X
} from 'lucide-react';
import { ViewState } from '../types';

interface OraGrandeShowcaseProps {
  onNavigate: (view: ViewState) => void;
}

export function OraGrandeShowcase({ onNavigate }: OraGrandeShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'crm' | 'events' | 'invitations' | 'payments' | 'settings'>('dashboard');
  const [isNewInquiryOpen, setIsNewInquiryOpen] = useState(false);
  const [inquiries, setInquiries] = useState([
    { id: 'INQ-001', name: 'Fatima & Ali', type: 'Wedding (2 Days)', date: '10-Dec-2026', budget: '₨ 2.5M - 3M', stage: 'Inquiry', contact: 'WhatsApp' },
    { id: 'INQ-002', name: 'TechCorp Annual', type: 'Corporate Dinner', date: '05-Jan-2027', budget: '₨ 1M', stage: 'Proposal Sent', contact: 'Email' },
    { id: 'INQ-003', name: 'Sara Bridal Shower', type: 'Private Event', date: '20-Nov-2026', budget: '₨ 500k', stage: 'Booked', contact: 'Call' },
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans selection:bg-[#D4AF37]/30 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center text-slate-500 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
        </div>
        
        <div className="p-6">
          <span className="text-xl font-bold tracking-tight text-slate-900 block">Ora Grande</span>
          <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1 font-semibold">Luxury Suite</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<Home size={18} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Users size={18} />} label="Inquiries & CRM" active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} />
          <NavItem icon={<Calendar size={18} />} label="Event Management" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <NavItem icon={<Mail size={18} />} label="Invitations & Print" active={activeTab === 'invitations'} onClick={() => setActiveTab('invitations')} />
          <NavItem icon={<CreditCard size={18} />} label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center md:hidden">
            <button onClick={() => onNavigate('portfolio')} className="text-slate-500 mr-4" aria-label="Back to Portfolio"><ArrowLeft size={20} /></button>
            <span className="text-lg font-bold">Ora Grande</span>
          </div>
          
          <div className="hidden md:flex relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search clients, events, or invoices..." 
              className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border-none rounded-full text-sm focus:ring-2 focus:ring-[#D4AF37]/50 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-[#D4AF37] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              OG
            </div>
          </div>
        </header>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView onNewInquiry={() => setIsNewInquiryOpen(true)} />}
            {activeTab === 'crm' && <CRMView inquiries={inquiries} onNewInquiry={() => setIsNewInquiryOpen(true)} />}
            {activeTab === 'events' && <EventsView />}
            {activeTab === 'invitations' && <InvitationsView />}
            {activeTab === 'payments' && <PaymentsView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Modals */}
      {isNewInquiryOpen && (
        <NewInquiryModal 
          onClose={() => setIsNewInquiryOpen(false)} 
          onSave={(newInquiry) => {
            setInquiries([{ id: `INQ-00${inquiries.length + 1}`, ...newInquiry, stage: 'Inquiry' }, ...inquiries]);
            setIsNewInquiryOpen(false);
            setActiveTab('crm');
          }} 
        />
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-gradient-to-r from-[#D4AF37]/10 to-transparent text-[#D4AF37] border-l-2 border-[#D4AF37]' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
      }`}
    >
      <span className={`mr-3 ${active ? 'text-[#D4AF37]' : 'text-slate-400'}`}>{icon}</span>
      {label}
    </button>
  );
}

// -------------------------------------------------------------
// MODULES
// -------------------------------------------------------------

function DashboardView({ onNewInquiry }: { onNewInquiry: () => void }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Studio Overview & Event Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back. Here's what's happening this month.</p>
        </div>
        <button onClick={onNewInquiry} className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-[#D4AF37]/20 transition-all flex items-center gap-2">
          <Plus size={16} /> New Inquiry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Pipeline Value" value="₨ 12.4M" trend="+15%" icon={<TrendingUp size={20} />} />
        <StatCard title="Upcoming Events (30d)" value="8" trend="Steady" icon={<Calendar size={20} />} />
        <StatCard title="Pending Payments" value="₨ 1.2M" trend="-5%" icon={<DollarSign size={20} />} isAlert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#D4AF37] rounded-full"></span> Events This Month
          </h3>
          <div className="space-y-4">
            {[
              { client: "Aisha & Bilal Wedding", type: "3-Day Wedding (Mehndi, Baraat, Walima)", date: "15-Nov-2026", status: "In Progress" },
              { client: "Zainab Corporate Launch", type: "Corporate Gala", date: "22-Nov-2026", status: "Final Checks" },
            ].map((event, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
                <div>
                  <h4 className="font-bold text-slate-900">{event.client}</h4>
                  <p className="text-sm text-slate-500 mt-1">{event.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-700">{event.date}</div>
                  <div className="text-xs font-medium text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-md inline-block mt-2">
                    {event.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#D4AF37] rounded-full"></span> Tasks Due Week
          </h3>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <TaskItem text="Finalize Aisha's Walima Menu" done={false} />
            <TaskItem text="Send E-Invites for Zainab Launch" done={true} />
            <TaskItem text="Collect 2nd Installment - Hassan" done={false} />
            <TaskItem text="Decor Vendor Meeting @ PC Hotel" done={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isAlert = false }: { title: string, value: string, trend: string, icon: React.ReactNode, isAlert?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl ${isAlert ? 'bg-red-50 text-red-500' : 'bg-[#F8F9FA] text-[#D4AF37]'}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
          {trend}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

function TaskItem({ text, done }: { text: string, done: boolean }) {
  return (
    <div className="flex items-start gap-3 group cursor-pointer">
      <div className={`mt-0.5 ${done ? 'text-[#D4AF37]' : 'text-slate-300 group-hover:text-[#D4AF37]/50'}`}>
        {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
      </div>
      <span className={`text-sm ${done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{text}</span>
    </div>
  );
}

function CRMView({ inquiries, onNewInquiry }: { inquiries: any[], onNewInquiry: () => void }) {
  const [stage, setStage] = useState('all');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-slate-900">Inquiries & CRM</h2>
        <button onClick={onNewInquiry} className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
          Add Lead
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-px">
        {['all', 'Inquiry', 'Proposal Sent', 'Booked'].map(s => (
          <button 
            key={s}
            onClick={() => setStage(s)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${stage === s ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            {s === 'all' ? 'All Leads' : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Event Type</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Est. Budget</th>
              <th className="p-4 font-semibold">Stage</th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inquiries.filter(i => stage === 'all' || i.stage === stage).map(inq => (
              <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{inq.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    {inq.contact}
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-700">{inq.type}</td>
                <td className="p-4 text-sm text-slate-700">{inq.date}</td>
                <td className="p-4 text-sm font-medium text-slate-900">{inq.budget}</td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    inq.stage === 'Booked' ? 'bg-green-100 text-green-700' :
                    inq.stage === 'Proposal Sent' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {inq.stage}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-[#D4AF37]"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EventsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-slate-900">Event Management</h2>
      </div>

      {/* Featured Complex Event */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-gradient-to-r from-slate-50 to-white">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-slate-900">Aisha & Bilal Wedding</h3>
              <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-2 py-0.5 rounded">In Progress</span>
            </div>
            <p className="text-sm text-slate-500">Primary Contact: Aisha Khan (Bride) • Total Budget: ₨ 4.5M</p>
          </div>
          <button className="text-sm font-semibold text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">
            Manage Budget
          </button>
        </div>

        <div className="p-6">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Sub-Events Workflow</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EventSubCard title="Mehndi" date="14-Nov-2026" venue="Haveli Gardens" guests="250" status="Finalized" />
            <EventSubCard title="Baraat" date="15-Nov-2026" venue="PC Hotel Marquee" guests="500" status="Pending Vendors" active />
            <EventSubCard title="Walima" date="17-Nov-2026" venue="Royal Palm" guests="400" status="Planning" />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Baraat - Vendor Directory</h4>
            <button className="text-[#D4AF37] text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add Vendor</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VendorTag category="Catering" name="Nadeem Tikka" status="Booked" amount="₨ 800k" />
            <VendorTag category="Decor" name="Floral Elegance" status="Pending Deposit" amount="₨ 450k" />
            <VendorTag category="Photography" name="M. Ali Studios" status="Booked" amount="₨ 250k" />
            <VendorTag category="Venue" name="PC Marquee" status="Paid" amount="₨ 1.2M" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EventSubCard({ title, date, venue, guests, status, active = false }: { title: string, date: string, venue: string, guests: string, status: string, active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${active ? 'border-[#D4AF37] bg-white ring-2 ring-[#D4AF37]/20' : 'border-slate-200 bg-white'}`}>
      <div className="flex justify-between items-start mb-3">
        <h5 className="font-bold text-slate-900">{title}</h5>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${active ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-slate-100 text-slate-500'}`}>{status}</span>
      </div>
      <div className="space-y-1.5 text-sm text-slate-600">
        <p className="flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {date}</p>
        <p className="flex items-center gap-2"><Home size={14} className="text-slate-400" /> {venue}</p>
        <p className="flex items-center gap-2"><Users size={14} className="text-slate-400" /> {guests} Guests</p>
      </div>
    </div>
  );
}

function VendorTag({ category, name, status, amount }: { category: string, name: string, status: string, amount: string }) {
  return (
    <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm">
      <div className="text-xs text-slate-400 mb-1">{category}</div>
      <div className="font-semibold text-slate-900 truncate">{name}</div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-500">{status}</span>
        <span className="text-xs font-bold text-slate-900">{amount}</span>
      </div>
    </div>
  );
}

function InvitationsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-slate-900">Design & Print Tracker</h2>
        <button className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
          New Invite Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { id: 'INV-088', client: 'Aisha & Bilal', type: 'Physical + E-Invite', status: 'Printing', qty: 350, due: '20-Oct-2026', style: 'Gold Foil, Velvet Envelope' },
          { id: 'INV-089', client: 'Zainab Launch', type: 'E-Invite (WhatsApp)', status: 'Design Draft', qty: 'Unlimited', due: '25-Oct-2026', style: 'Corporate Modern, Dark Theme' },
        ].map(inv => (
          <div key={inv.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1">{inv.id}</div>
                  <h3 className="text-lg font-bold text-slate-900">{inv.client}</h3>
                </div>
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full">{inv.status}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2 font-medium">{inv.type}</p>
              <p className="text-sm text-slate-500 italic">"{inv.style}"</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <div className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Qty:</span> {inv.qty}</div>
              <div className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Due:</span> {inv.due}</div>
              <button className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-2 rounded-full transition-colors">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* RSVP Manager Preview */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Live RSVP Tracker (Aisha & Bilal)</h3>
          <button className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"><Download size={14} /> Export CSV</button>
        </div>
        <div className="p-6 flex gap-8 justify-center border-b border-slate-100">
          <div className="text-center"><div className="text-2xl font-bold text-green-600">312</div><div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Confirmed</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-amber-500">85</div><div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Pending</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-red-400">12</div><div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Declined</div></div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={18} />;
}

function PaymentsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-slate-900">Invoicing & Payments</h2>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
          Generate Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="p-4 font-semibold">Invoice ID</th>
              <th className="p-4 font-semibold">Client / Project</th>
              <th className="p-4 font-semibold">Amount (PKR)</th>
              <th className="p-4 font-semibold">Stage (30/40/30)</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 'INV-2026-101', name: 'Aisha & Bilal (Wedding)', amount: '₨ 1,350,000', stage: '40% Mid Payment', status: 'Paid' },
              { id: 'INV-2026-102', name: 'Zainab (Corporate)', amount: '₨ 300,000', stage: '30% Advance', status: 'Overdue' },
              { id: 'INV-2026-103', name: 'Fatima (Inquiry)', amount: '₨ 750,000', stage: '30% Advance', status: 'Pending' },
            ].map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-500">{inv.id}</td>
                <td className="p-4">
                  <div className="font-bold text-slate-900">{inv.name}</div>
                </td>
                <td className="p-4 text-sm font-bold text-slate-900">{inv.amount}</td>
                <td className="p-4 text-sm text-slate-600">{inv.stage}</td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                    inv.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-[#D4AF37]"><FileText size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-white font-bold text-2xl shadow-sm">
            OG
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ora Grande Studio</h3>
            <p className="text-sm text-slate-500">Luxury Event & Invitation Suite</p>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Business Profile</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Company Name</label>
              <input type="text" defaultValue="Ora Grande" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Email</label>
              <input type="email" defaultValue="hello@oragrande.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Preferences</h4>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
              <div>
                <div className="font-semibold text-slate-800 text-sm">Email Notifications</div>
                <div className="text-xs text-slate-500">Receive alerts for new inquiries</div>
              </div>
              <div className="w-10 h-6 bg-[#D4AF37] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
              <div>
                <div className="font-semibold text-slate-800 text-sm">Dark Mode</div>
                <div className="text-xs text-slate-500">Not available in current theme</div>
              </div>
              <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-not-allowed">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewInquiryModal({ onClose, onSave }: { onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ name: '', type: 'Wedding (2 Days)', date: '', budget: '', contact: 'WhatsApp' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">New Inquiry</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Client Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" placeholder="e.g. Sana & Ahmed" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50">
                <option>Wedding (2 Days)</option>
                <option>Wedding (3 Days)</option>
                <option>Corporate Gala</option>
                <option>Private Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
              <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" placeholder="e.g. 15-Nov-2026" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Est. Budget (PKR)</label>
              <input required type="text" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50" placeholder="e.g. ₨ 1M" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Method</label>
              <select value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50">
                <option>WhatsApp</option>
                <option>Call</option>
                <option>Email</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button type="submit" className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-[#D4AF37]/20 transition-all">Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}
