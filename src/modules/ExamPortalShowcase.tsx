import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Flag, ArrowRight, AlertTriangle, Monitor, User, ShieldAlert, CheckSquare, Search, FileText } from 'lucide-react';
import { examPrototypeData } from '../data/examPrototypeData';

const THEME = {
  bgPrimary: '#F9FAFB',
  bgWhite: '#FFFFFF',
  textMain: '#111827',
  textMuted: '#6B7280',
  borderLight: '#E5E7EB',
  accentBlue: '#3B82F6',
  accentBlueLight: '#DBEAFE',
  successGreen: '#10B981',
  warningOrange: '#F59E0B',
  errorRed: '#EF4444'
};

export default function ExamPortalShowcase({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exam' | 'admin'>('dashboard');

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900" style={{ backgroundColor: THEME.bgPrimary, color: THEME.textMain }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: THEME.borderLight }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-600"
            style={{ color: THEME.textMuted }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: THEME.accentBlue }}>
              <BookOpen size={16} />
            </div>
            <span className="font-bold tracking-wide">ExamPortal Case Study</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 bg-white border-b" style={{ borderColor: THEME.borderLight }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: THEME.accentBlueLight, color: THEME.accentBlue }}>
            UI/UX Research & Prototype
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 leading-tight">
            Redefining the Academic Testing Experience
          </h1>
          <p className="text-xl leading-relaxed text-gray-600 mb-10 max-w-3xl mx-auto">
            Research, Analysis, and Prototype Development for a Modern, Stress-Free Digital Assessment Platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="px-5 py-3 rounded-xl border bg-gray-50 text-sm" style={{ borderColor: THEME.borderLight }}>
              <strong className="block text-gray-900">Role</strong>
              <span className="text-gray-600">Lead UI/UX Designer</span>
            </div>
            <div className="px-5 py-3 rounded-xl border bg-gray-50 text-sm" style={{ borderColor: THEME.borderLight }}>
              <strong className="block text-gray-900">Timeline</strong>
              <span className="text-gray-600">8 Weeks</span>
            </div>
            <div className="px-5 py-3 rounded-xl border bg-gray-50 text-sm" style={{ borderColor: THEME.borderLight }}>
              <strong className="block text-gray-900">Tools</strong>
              <span className="text-gray-600">Figma, React, UserTesting</span>
            </div>
          </div>
        </div>
      </header>

      {/* Case Study Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Phase 1 */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-blue-500">01</span> The Problem Space
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-8">
                Traditional digital testing environments are often plagued by complex navigation, unclear instructions, and platform instability, which significantly exacerbates student anxiety during high-stakes exams.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: THEME.borderLight }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 m-0">Sarah (Student)</h3>
                      <p className="text-sm text-gray-500 m-0">High-anxiety test taker</p>
                    </div>
                  </div>
                  <p className="text-sm"><strong>Frustrations:</strong> Confusing timer displays, fear of accidental submission, lack of clear question status tracking.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white border" style={{ borderColor: THEME.borderLight }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 m-0">Dr. Patel (Instructor)</h3>
                      <p className="text-sm text-gray-500 m-0">Proctor & Grader</p>
                    </div>
                  </div>
                  <p className="text-sm"><strong>Frustrations:</strong> Difficulty tracking active sessions, unclear flagging systems for potential academic integrity violations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-blue-500">02</span> Ideation & Strategy
            </h2>
            <div className="bg-white rounded-2xl p-8 border" style={{ borderColor: THEME.borderLight }}>
              <h3 className="font-bold text-xl mb-6">Information Architecture</h3>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-sm font-medium">
                <div className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Dashboard</div>
                <ArrowRight size={16} className="text-gray-400 rotate-90 md:rotate-0" />
                <div className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Pre-Check</div>
                <ArrowRight size={16} className="text-gray-400 rotate-90 md:rotate-0" />
                <div className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">Focus Mode Exam</div>
                <ArrowRight size={16} className="text-gray-400 rotate-90 md:rotate-0" />
                <div className="px-4 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200">Submission</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Live Prototype */}
      <section className="py-20 bg-gray-900" id="prototype">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Functional Prototype</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Experience the distraction-free "Focus Mode" and dashboard interfaces derived from our research.</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col min-h-[700px] border border-gray-700">
            {/* Prototype Tabs */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              {[
                { id: 'dashboard', label: 'Student Dashboard', icon: Monitor },
                { id: 'exam', label: 'Focus Mode Exam', icon: BookOpen },
                { id: 'admin', label: 'Instructor View', icon: ShieldAlert }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-semibold text-sm transition-colors border-b-2 ${activeTab === tab.id ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Prototype Content Container */}
            <div className="flex-1 bg-gray-50 relative overflow-hidden">
              {activeTab === 'dashboard' && <StudentDashboard />}
              {activeTab === 'exam' && <ActiveExamInterface />}
              {activeTab === 'admin' && <AdminDashboard />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Subcomponents for the Prototype ---

function StudentDashboard() {
  return (
    <div className="p-8 animate-in fade-in duration-500 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {examPrototypeData.studentInfo.name}</h2>
            <p className="text-gray-500">{examPrototypeData.studentInfo.major} | ID: {examPrototypeData.studentInfo.id}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">Upcoming Exams</p>
            <p className="text-3xl font-bold text-gray-900">{examPrototypeData.studentInfo.upcomingExams}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">Completed Exams</p>
            <p className="text-3xl font-bold text-gray-900">{examPrototypeData.pastExams.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">System Status</p>
            <p className="text-lg font-bold text-green-600 flex items-center gap-2 mt-2"><CheckCircle2 size={20} /> All Systems Operational</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Action Required</h3>
        <div className="space-y-4 mb-10">
          {examPrototypeData.upcomingExams.map(exam => (
            <div key={exam.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-shadow hover:shadow-md">
              <div>
                <p className="text-sm font-bold text-blue-600 mb-1">{exam.course}</p>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={16} /> {exam.duration} mins</span>
                  <span className="flex items-center gap-1"><FileText size={16} /> {exam.questions} Questions</span>
                  <span className="flex items-center gap-1">Due: {exam.date}</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap">
                Begin Pre-Check
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Previous Results</h3>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Course</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Exam</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Score</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {examPrototypeData.pastExams.map(exam => (
                <tr key={exam.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{exam.course}</td>
                  <td className="px-6 py-4 text-gray-600">{exam.title}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{exam.score}%</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{exam.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ActiveExamInterface() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(305); // 5 mins 5 secs for demo

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isWarning = timeLeft <= 300; // 5 mins
  const question = examPrototypeData.examQuestions[currentQ];

  const toggleFlag = () => {
    setFlagged(prev => ({ ...prev, [question.id]: !prev[question.id] }));
  };

  return (
    <div className="flex flex-col h-full bg-white absolute inset-0 animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">CS301: Data Structures</p>
          <h2 className="font-bold text-gray-900">Midterm Assessment</h2>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold font-mono text-lg transition-colors ${isWarning ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav (Pallet) */}
        <div className="w-64 border-r border-gray-200 bg-gray-50 p-6 overflow-y-auto shrink-0 hidden md:block">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Question Overview</h3>
          <div className="grid grid-cols-4 gap-2">
            {examPrototypeData.examQuestions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
              const isFlagged = flagged[q.id];
              const isCurrent = idx === currentQ;
              
              let btnClass = "h-10 rounded text-sm font-bold border transition-colors flex items-center justify-center relative ";
              if (isCurrent) btnClass += "border-blue-500 ring-2 ring-blue-200 ";
              else if (isFlagged) btnClass += "border-orange-300 bg-orange-50 text-orange-700 ";
              else if (isAnswered) btnClass += "border-blue-300 bg-blue-50 text-blue-700 ";
              else btnClass += "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 ";

              return (
                <button key={q.id} onClick={() => setCurrentQ(idx)} className={btnClass}>
                  {idx + 1}
                  {isFlagged && <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 space-y-3 text-xs text-gray-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div> Flagged</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Unanswered</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 p-8 md:p-12 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">Question {currentQ + 1} of {examPrototypeData.examQuestions.length}</span>
                <button onClick={toggleFlag} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold transition-colors ${flagged[question.id] ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Flag size={16} className={flagged[question.id] ? 'fill-orange-500' : ''} /> {flagged[question.id] ? 'Flagged' : 'Flag for review'}
                </button>
              </div>

              <h2 className="text-xl font-medium text-gray-900 mb-8 leading-relaxed">
                {question.text}
              </h2>

              <div className="space-y-4">
                {question.type === 'multiple-choice' && question.options?.map((opt, i) => (
                  <label key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[question.id] === opt ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input 
                      type="radio" 
                      name={question.id} 
                      value={opt} 
                      checked={answers[question.id] === opt}
                      onChange={() => setAnswers(prev => ({ ...prev, [question.id]: opt }))}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                ))}
                
                {question.type === 'checkbox' && question.options?.map((opt, i) => {
                  const isChecked = answers[question.id]?.includes(opt);
                  return (
                    <label key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                      <input 
                        type="checkbox" 
                        value={opt} 
                        checked={isChecked || false}
                        onChange={(e) => {
                          const current = answers[question.id] || [];
                          const next = e.target.checked ? [...current, opt] : current.filter((x: string) => x !== opt);
                          setAnswers(prev => ({ ...prev, [question.id]: next }));
                        }}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-800">{opt}</span>
                    </label>
                  );
                })}

                {question.type === 'essay' && (
                  <textarea 
                    rows={8}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-y"
                    placeholder="Enter your answer here..."
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                  ></textarea>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
            <button 
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={18} /> Previous
            </button>

            {currentQ < examPrototypeData.examQuestions.length - 1 ? (
              <button 
                onClick={() => setCurrentQ(prev => Math.min(examPrototypeData.examQuestions.length - 1, prev + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Next Question <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
              >
                Review & Submit <CheckCircle2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-8 animate-in fade-in duration-500 h-full overflow-y-auto">
       <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Live Proctoring Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Active Exams</p>
            <p className="text-4xl font-black text-gray-900">{examPrototypeData.adminStats.activeExams}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Avg Score (Rolling)</p>
            <p className="text-4xl font-black text-gray-900">{examPrototypeData.adminStats.avgScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-orange-200 bg-orange-50/50 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-orange-700 mb-1 flex items-center gap-2"><AlertTriangle size={16} /> Flagged Sessions</p>
            <p className="text-4xl font-black text-orange-600">{examPrototypeData.adminStats.flaggedSessions}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Live Student Sessions</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Student Name</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Exam Title</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Time Remaining</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {examPrototypeData.liveSessions.map(session => (
                <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{session.student}</td>
                  <td className="px-6 py-4 text-gray-600">{session.exam}</td>
                  <td className="px-6 py-4 font-mono text-gray-700">{session.timeRemaining}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      session.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      session.status === 'Flagged' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">View Feed</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       </div>
    </div>
  );
}
