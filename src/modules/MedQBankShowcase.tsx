import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Rocket, MonitorPlay, CheckCircle2, LayoutDashboard, 
  User, PlusCircle, Archive, BarChart3, Database, BookOpen, 
  FileText, Search, Bell, ChevronDown, Check, Activity, Target, Zap, 
  Bookmark, Clock, CalendarDays, Award
} from 'lucide-react';

// Main Showcase Component
export function MedQBankShowcase({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [showDemo, setShowDemo] = useState(false);
  
  if (showDemo) {
    return <MedQBankLiveDemo onBack={() => setShowDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-500/30">
      {/* Portfolio Landing Page Content */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <div className="font-bold text-slate-900">GullG Technology <span className="text-slate-400 font-normal">| Case Study</span></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6 shadow-sm">
            <MonitorPlay size={16} /> Live Demo Available
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            We MedQBank: Student Test Performance Analytics Platform
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            High-yield medical QBank engine & candidate analytics dashboard for USMLE, FCPS, and regional board exams.
          </p>
          <button 
            onClick={() => setShowDemo(true)}
            className="inline-flex items-center gap-2 bg-[#E14B27] hover:bg-[#C83F1E] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-orange-500/20"
          >
            <Rocket size={20} /> View Live Interactive Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              MedQBank is a comprehensive educational platform designed to help medical students and professionals prepare for rigorous board exams like the USMLE and FCPS. It features an advanced testing engine, predictive performance analytics, and targeted remediation tools.
            </p>
            <ul className="space-y-3">
              {[
                "Adaptive QBank Testing Engine",
                "Predictive Performance Analytics",
                "High-Yield Clinical Pearls",
                "Institutional Admin Controls"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="text-[#E14B27] shrink-0 mt-0.5" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm border border-slate-800">
            <h3 className="text-2xl font-bold mb-4">Technical Stack</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Built for high concurrency, low-latency test sessions, and robust data security to protect proprietary medical content and student privacy.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Live Demo Viewer Chrome
function MedQBankLiveDemo({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<'candidate' | 'admin'>('candidate');

  return (
    <div className="flex flex-col h-screen w-full bg-[#F9FAFB] font-sans overflow-hidden">
      {/* Demo Viewer Chrome (Sticky Top Bar) */}
      <div className="bg-slate-900 text-white h-14 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Exit Demo
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <span className="font-bold text-slate-300 hidden sm:inline-block">MedQBank Demo Viewer</span>
        </div>
        <div className="flex items-center bg-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('candidate')}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'candidate' ? 'bg-[#E14B27] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="hidden sm:inline">👨‍⚕️</span> Candidate View
          </button>
          <button 
            onClick={() => setViewMode('admin')}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'admin' ? 'bg-[#E14B27] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="hidden sm:inline">🏛️</span> Faculty View
          </button>
        </div>
      </div>

      {/* App Container */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {viewMode === 'candidate' ? <CandidateDashboard /> : <AdminDashboardPlaceholder />}
      </div>
    </div>
  );
}

// ================= CANDIDATE DASHBOARD =================

function CandidateDashboard() {
  const [activePage, setActivePage] = useState('Main Dashboard');

  return (
    <div className="flex flex-col h-full w-full bg-[#F9FAFB] text-slate-800 overflow-hidden">
      {/* 1. Top Header & Alert Bar */}
      <div className="flex flex-col shrink-0">
        {/* Narrow Banner */}
        <div className="flex text-xs font-bold uppercase tracking-wider text-white">
          <div className="bg-[#E14B27] px-4 py-1.5 flex-1 truncate">
            INTERFACE MEDICAL QBANK ENGINE & HIGH-YIELD LEARNING PORTAL (.edu.pk)
          </div>
          <div className="bg-[#374151] px-4 py-1.5 shrink-0 hidden sm:block">
            USMLE Step 1 & FCPS Part 1 Updated 2026 <span className="mx-2 opacity-50">|</span> interface.edu.pk
          </div>
        </div>

        {/* Main Header Row */}
        <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
          <div className="flex items-center gap-6">
            <div className="font-extrabold text-2xl tracking-tight text-[#374151] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E14B27] to-orange-500 flex items-center justify-center text-white">
                <Activity size={20} />
              </div>
              MedQBank
            </div>
            
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search medical topics, ICD codes, clinical vignettes..."
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-slate-200">
              USMLE-S1 <ChevronDown size={14} />
            </button>
            <button className="hidden sm:block px-4 py-1.5 bg-orange-100 text-[#E14B27] hover:bg-orange-200 font-bold rounded-lg text-sm transition-colors">
              Free Demo
            </button>
            <button className="hidden sm:block px-4 py-1.5 bg-[#E14B27] hover:bg-[#C83F1E] text-white font-bold rounded-lg text-sm transition-colors shadow-sm shadow-orange-500/20">
              Premium
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>
            <button className="p-2 text-slate-400 hover:text-slate-700 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E14B27] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Guest Candidate</p>
                <p className="text-xs text-slate-500 font-medium">FCPS Part 1 Demo</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-sm">
                GC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-slate-200 flex-col py-6 hidden lg:flex overflow-y-auto custom-scrollbar z-20">
          
          <div className="px-4 mb-6">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-3">Learning Portal</h3>
            <nav className="space-y-1">
              <SidebarItem onClick={() => setActivePage('Main Dashboard')} icon={LayoutDashboard} label="Main Dashboard" active={activePage === 'Main Dashboard'} badge={null} />
              <SidebarItem onClick={() => setActivePage('My Profile')} icon={User} label="My Profile" active={activePage === 'My Profile'} badge="Candidate" />
              <SidebarItem onClick={() => setActivePage('Create Custom Test')} icon={PlusCircle} label="Create Custom Test" active={activePage === 'Create Custom Test'} badge="20 New" badgeColor="bg-[#E14B27]" />
              <SidebarItem onClick={() => setActivePage('All Tests & Archive')} icon={Archive} label="All Tests & Archive" active={activePage === 'All Tests & Archive'} badge="2 Active" badgeColor="bg-emerald-500" />
              <SidebarItem onClick={() => setActivePage('Performance Analytics')} icon={BarChart3} label="Performance Analytics" active={activePage === 'Performance Analytics'} badge="88th%" badgeColor="bg-slate-800" />
              <SidebarItem onClick={() => setActivePage('Qbanks & Subscriptions')} icon={Database} label="Qbanks & Subscriptions" active={activePage === 'Qbanks & Subscriptions'} badge="4 Plans" />
            </nav>
          </div>

          <div className="px-4 flex-1">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-3">Clinical Tools & Resources</h3>
            <nav className="space-y-1">
              <SidebarItem onClick={() => setActivePage('High-Yield First Aid Index')} icon={BookOpen} label="High-Yield First Aid Index" active={activePage === 'High-Yield First Aid Index'} />
              <SidebarItem onClick={() => setActivePage('Pakistan CPSP & USMLE Guidelines')} icon={FileText} label="Pakistan CPSP & USMLE Guidelines" active={activePage === 'Pakistan CPSP & USMLE Guidelines'} />
            </nav>
          </div>

          <div className="px-7 mt-auto pt-6 text-xs text-slate-400 font-medium">
            copyright@gullgtech.com
          </div>
        </div>

        {/* 3. Main Dashboard Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8">
          
          {activePage === 'Main Dashboard' && (
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* WIDE LEFT COLUMN */}
              <div className="flex-1 space-y-6 min-w-0">
                
                {/* Welcome Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <Target size={120} />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                    <CheckCircle2 size={14} /> Verified Medical Candidate Profile
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Welcome back, Dr. Sarah Ahmed</h2>
                  <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">
                    Targeting FCPS Part 1 Internal Medicine & USMLE Step 1. Your overall question accuracy is sitting strong at <strong className="text-slate-900">74.2%</strong> (88th national percentile).
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="bg-[#E14B27] hover:bg-[#C83F1E] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-orange-500/20 flex items-center gap-2">
                      <PlusCircle size={18} /> Create New Test
                    </button>
                    <button className="bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
                      <BarChart3 size={18} /> View Analytics
                    </button>
                  </div>
                </div>

                {/* KPI Score Cards (4 Grid Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard title="Questions Solved" value="1,420" subtext="+120 this past week" icon={CheckCircle2} color="text-emerald-500" />
                  <KPICard title="Overall Accuracy" value="74.2%" subtext="Top 12% of national test-takers" icon={Target} color="text-[#E14B27]" />
                  <KPICard title="Practice Time" value="38.5 hrs" subtext="Avg 54 sec / question" icon={Clock} color="text-sky-500" />
                  <KPICard title="Plan Expiry" value="142 days" subtext="USMLE Step 1 QBank" icon={CalendarDays} color="text-amber-500" />
                </div>

                {/* Subscribed Medical Qbanks Grid (2x2 Grid) */}
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <Database size={20} className="text-slate-400" /> Subscribed Medical Qbanks
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QBankCard 
                      title="USMLE Step 1 Comprehensive" 
                      status="Active" 
                      progress={32} 
                      expiry="Exp: 2026-12-31" 
                      color="emerald"
                    />
                    <QBankCard 
                      title="FCPS Part 1 Internal Medicine & Surgery" 
                      status="Active" 
                      progress={33} 
                      expiry="Exp: 2026-10-15" 
                      color="emerald"
                    />
                    <QBankCard 
                      title="MBBS Final Year Clinical Surgery" 
                      status="Free Demo" 
                      progress={3} 
                      color="orange"
                    />
                    <QBankCard 
                      title="INBDE / Dental Surgery Board" 
                      status="Expired" 
                      progress={30} 
                      color="slate"
                    />
                  </div>
                </div>
              </div>

              {/* NARROW RIGHT COLUMN */}
              <div className="w-full xl:w-80 space-y-6 shrink-0">
                
                {/* High-Yield Clinical Pearl of the Day Card */}
                <div className="rounded-2xl shadow-md border border-orange-200 overflow-hidden bg-gradient-to-br from-[#E14B27] to-orange-600 text-white relative">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Zap size={64} />
                  </div>
                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-2 text-orange-100 text-xs font-bold uppercase tracking-wider mb-4">
                      <Zap size={14} className="text-yellow-300" /> High-Yield Pearl of the Day
                    </div>
                    <h3 className="text-xl font-extrabold mb-3 leading-tight">DKA Potassium Management Rule</h3>
                    <p className="text-orange-50 text-sm leading-relaxed mb-6 font-medium">
                      In Diabetic Ketoacidosis (DKA), total body potassium is ALWAYS depleted due to osmotic diuresis, despite initial serum hyperkalemia. Always check serum K+ before starting insulin. If K+ &lt; 3.3 mEq/L, hold insulin and give potassium first.
                    </p>
                    
                    <div className="pt-4 border-t border-orange-400/50 flex flex-col gap-3">
                      <div className="text-xs font-semibold text-orange-200">
                        Pathophysiology / Emergency Medicine
                      </div>
                      <button className="w-full bg-white text-[#E14B27] hover:bg-orange-50 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <Bookmark size={16} /> Save Pearl
                      </button>
                    </div>
                  </div>
                </div>

                {/* Target Weakness Zones Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-slate-900">Target Weakness Zones</h3>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-200">
                      Action Needed
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                    Based on your last 5 test performances, our analytics engine identified 3 subtopics where your accuracy is below 60%:
                  </p>

                  <div className="space-y-4">
                    <WeaknessItem topic="Renal System - Glomerulonephritis & Nephrotic Syndrome" accuracy={52} />
                    <WeaknessItem topic="Cardiology - Antiarrhythmic Pharmacology" accuracy={48} />
                    <WeaknessItem topic="Biochemistry - Glycogen Storage Diseases" accuracy={34} />
                  </div>
                  
                  <button className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-sm transition-colors">
                    Generate Remediation Test
                  </button>
                </div>

              </div>
            </div>
          )}

          {activePage === 'My Profile' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <User size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">My Profile</h2>
              <p className="text-slate-500 max-w-md">Manage your account details, academic credentials, and subscription settings.</p>
            </div>
          )}

          {activePage === 'Create Custom Test' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <PlusCircle size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Custom Test</h2>
              <p className="text-slate-500 max-w-md">Select subjects, systems, and difficulty levels to generate a tailored mock exam.</p>
            </div>
          )}

          {activePage === 'All Tests & Archive' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <Archive size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">All Tests & Archive</h2>
              <p className="text-slate-500 max-w-md">Review your previous test attempts, access score reports, and resume saved sessions.</p>
            </div>
          )}

          {activePage === 'Performance Analytics' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <BarChart3 size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Performance Analytics</h2>
              <p className="text-slate-500 max-w-md">Deep dive into your accuracy metrics, peer percentile rankings, and targeted weakness graphs.</p>
            </div>
          )}

          {activePage === 'Qbanks & Subscriptions' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <Database size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Qbanks & Subscriptions</h2>
              <p className="text-slate-500 max-w-md">Browse available question banks, purchase new packages, and track expiry dates.</p>
            </div>
          )}

          {activePage === 'High-Yield First Aid Index' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <BookOpen size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">High-Yield First Aid Index</h2>
              <p className="text-slate-500 max-w-md">Quick reference for essential medical knowledge and board-relevant facts.</p>
            </div>
          )}

          {activePage === 'Pakistan CPSP & USMLE Guidelines' && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 animate-in fade-in duration-500 h-96 max-w-4xl mx-auto">
              <FileText size={48} className="text-[#E14B27] mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">CPSP & USMLE Guidelines</h2>
              <p className="text-slate-500 max-w-md">Official examination guidelines, structure formats, and passing criteria information.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Components for Candidate Dashboard

function SidebarItem({ icon: Icon, label, active = false, badge, badgeColor = "bg-slate-200 text-slate-700", onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-orange-50 text-[#E14B27]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 group'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? 'text-[#E14B27]' : 'text-slate-400 group-hover:text-slate-600'} />
        <span className={`text-sm ${active ? 'font-bold' : 'font-semibold'}`}>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${active ? 'bg-orange-100' : badgeColor} ${badgeColor !== 'bg-slate-200 text-slate-700' && !active ? 'text-white' : ''}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function KPICard({ title, value, subtext, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2.5 rounded-xl bg-slate-50 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-2xl font-extrabold text-slate-900 mb-1">{value}</h4>
        <p className="text-xs font-medium text-slate-500">{subtext}</p>
      </div>
    </div>
  );
}

function QBankCard({ title, status, progress, expiry, color }: any) {
  const isExpired = status === 'Expired';
  const badgeColors: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <div className={`bg-white p-5 rounded-2xl shadow-sm border flex flex-col justify-between h-48 transition-colors ${isExpired ? 'border-slate-200 bg-slate-50 opacity-75' : 'border-slate-200 hover:border-orange-200'}`}>
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h4 className={`font-bold leading-tight ${isExpired ? 'text-slate-500' : 'text-slate-900'}`}>{title}</h4>
          <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeColors[color]}`}>
            {status}
          </span>
        </div>
        
        {expiry && (
          <p className="text-xs font-medium text-slate-500 mb-4">{expiry}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-600">Completion</span>
          <span className="text-slate-900">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200/50">
          <div className={`h-full rounded-full ${isExpired ? 'bg-slate-400' : 'bg-[#E14B27]'}`} style={{ width: `${progress}%` }}></div>
        </div>
        <button 
          disabled={isExpired}
          className={`w-full py-2 rounded-lg font-bold text-sm transition-colors border-2 ${isExpired ? 'bg-transparent border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-[#E14B27] text-[#E14B27] hover:bg-orange-50'}`}
        >
          {isExpired ? 'Renew Access' : 'Launch Test'}
        </button>
      </div>
    </div>
  );
}

function WeaknessItem({ topic, accuracy }: { topic: string, accuracy: number }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-start mb-1.5 gap-2">
        <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-[#E14B27] transition-colors line-clamp-2">{topic}</p>
        <span className="text-xs font-extrabold text-[#E14B27] shrink-0">{accuracy}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400" style={{ width: `${accuracy}%` }}></div>
      </div>
    </div>
  );
}

// ================= ADMIN DASHBOARD PLACEHOLDER =================

function AdminDashboardPlaceholder() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#F9FAFB]">
      <div className="w-24 h-24 rounded-3xl bg-slate-200 flex items-center justify-center mb-6 text-slate-400">
        <MonitorPlay size={48} />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Faculty / Admin View</h2>
      <p className="text-slate-500 max-w-lg mb-8 text-lg leading-relaxed">
        The Institutional Dashboard provides faculty with cohort-level analytics, performance benchmarking, and question authoring tools.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 text-[#E14B27] font-bold text-sm border border-orange-200">
        <Check size={16} /> Wireframes Approved - Development Pending
      </div>
    </div>
  );
}
