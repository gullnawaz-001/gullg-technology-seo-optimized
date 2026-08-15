import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Play, Calculator, PieChart, Video, Image as ImageIcon, Zap, Send, MessageSquare, Phone, CheckSquare, Square, ArrowRight, MessageCircle, ShoppingCart } from 'lucide-react';

import { CorporateSaaSDashboard } from '../components/demos/CorporateSaaSDashboard';

const COLORS = {
  bgBase: '#F8FAFC',
  bgCard: '#FFFFFF',
  bgDark: '#F1F5F9',
  border: '#E2E8F0',
  accent: '#0A1325',
  badge: '#64748B',
  textMain: '#0A1325',
  textMuted: '#475569'
};

const FEATURED_WORKS = [
  { id: 'w01', category: 'Data-Driven Dashboard Design', title: 'SaaS Analytics & Financial Dashboard', summary: 'A high-performance financial analytics workspace solving complex data visualization challenges for SaaS companies. It features live MRR/ARR tracking, interactive waterfall revenue movements, and transaction feeds to improve business intelligence ROI.', techStack: ['React', 'Tailwind UI', 'Recharts', 'Chart.js'], demoType: 'dashboard-saas', price: 1200 },
  { id: 'w02', category: 'Data-Driven Dashboard Design', title: 'We MedQBank Student Performance Analytics', summary: 'Includes timed exam simulations, category score heatmaps, and progress tracking.', techStack: ['React', 'Chart.js', 'PostgreSQL'], demoType: 'medqbank-showcase', price: 1500 },
  { id: 'w03', category: 'Modern Web & Mobile App Development', title: 'Cheela Cafe Web Ordering Application', summary: 'Interactive food menu, real-time cart state management, and kitchen admin order view.', techStack: ['React', 'Node.js', 'WebSockets'], demoType: 'cheela-showcase', price: 2000 },
  { id: 'w04', category: 'Modern Web & Mobile App Development', title: 'Custom Canvas Art E-Commerce Storefront', summary: 'Gallery view, dynamic cart, PayPal redirect & direct bank payment modules.', techStack: ['React', 'PayPal SDK', 'Stripe API'], demoType: 'app', price: 1800 },
  { id: 'w05', category: 'Graphic & Brand Identity Design', title: 'NADRA Official Institutional Branding Suite', summary: 'Identity collateral specs, vector layout guidelines.', techStack: ['Adobe Illustrator', 'InDesign', 'Vector Lines'], demoType: 'brand', price: 800, liveLink: 'https://www.nadra.gov.pk/brand' },
  { id: 'w05b', category: 'Graphic & Brand Identity Design', title: 'Complete Design Portfolio', summary: 'A comprehensive collection of my graphic design and brand identity projects.', techStack: ['Behance', 'Portfolio', 'Design'], demoType: 'brand', price: 0, liveLink: 'https://www.behance.net/gullnawaz' },
  { id: 'w06', category: 'Data-Driven Dashboard Design', title: 'Ora Grande Luxury Event & Invitation Suite', summary: 'Luxury typography showcase, border line art, and RSVP preview.', techStack: ['Photoshop', 'After Effects', 'Gold Foil Vectors'], demoType: 'ora-grande', price: 600 },
  { id: 'w07', category: 'UI/UX Prototyping & User Research', title: 'Exam Portal UI/UX Research & Prototype', summary: 'Distraction-free exam viewport, WCAG AAA accessibility standards.', techStack: ['Figma', 'Protopie', 'UserTesting'], demoType: 'ux', price: 1000 },
  { id: 'w08', category: 'UI/UX Prototyping & User Research', title: 'Mobile Ordering UX Workflow & Micro-Interactions', summary: 'Interactive 3-step checkout funnel.', techStack: ['Figma', 'Framer', 'Motion'], demoType: 'ux-wip', price: 900 },
  { id: 'w09', category: 'Intelligent Process & Workflow Automation', title: 'Photoshop Automated Design & Mockup Workflows', summary: 'Action scripts guide, multi-size banner batch generation pipelines.', techStack: ['Adobe Scripts', 'JavaScript', 'Batch Actions'], demoType: 'auto', price: 500 },
  { id: 'w10', category: 'Intelligent Process & Workflow Automation', title: 'Pinterest & Social Cross-Posting Automation', summary: 'Content scheduler and cross-platform publishing matrix.', techStack: ['Python', 'Selenium', 'Social APIs'], demoType: 'auto', price: 750 },
  { id: 'w11', category: 'Live AI Chatbot Integration', title: 'E-Commerce AI Customer Support Assistant', summary: 'Interactive 24/7 conversational widget for order FAQs and payment support.', techStack: ['OpenAI', 'React', 'Node.js'], demoType: 'ai', price: 1200 },
  { id: 'w11b', category: 'Live AI Chatbot Integration', title: 'Cheela Cafe Chatbot Services', summary: 'App Integration with Website live Demo.', techStack: ['PHP', 'React', 'Integration'], demoType: 'ai', price: 0, liveLink: 'https://maroon-seahorse-863430.hostingersite.com/' },
  { id: 'w11c', category: 'Live AI Chatbot Integration', title: 'Art Gallery Ai Art Advisor', summary: 'Interactive AI-powered art advisor for gallery visitors.', techStack: ['PHP', 'React'], demoType: 'ai', price: 0, liveLink: 'https://www.gullg.com' },
  { id: 'w12', category: 'Social Media Management & Strategy', title: 'Art Portfolio Growth & Channel Handling', summary: 'Cross-channel analytics for Pinterest, Facebook, and YouTube.', techStack: ['Meta Business Suite', 'Buffer', 'Analytics'], demoType: 'social', price: 600 },
  { id: 'w13', category: 'Social Media Management & Strategy', title: 'Cheela Cafe Local Brand Launch Strategy', summary: 'Visual Instagram grid planning and campaign calendar.', techStack: ['Later', 'Canva Pro', 'Instagram Graph API'], demoType: 'social', price: 500 },
  { id: 'w14', category: 'Video Creation & Motion Production', title: 'Impasto Painting Macro Texture Reels', summary: 'Short-form video preview container with audio/rhythm sync specs.', techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'], demoType: 'video', price: 1100 },
  { id: 'w15', category: 'Video Creation & Motion Production', title: 'Cheela Cafe Promotional Motion Video', summary: 'Kinetic typography ad showcase.', techStack: ['After Effects', 'Cinema 4D'], demoType: 'video', price: 1300 },
  { id: 'w16', category: 'Ad Campaign Design & Management', title: 'Direct Purchase 50% Off Artwork Ad Campaign', summary: 'Carousel ad set previews, copy strategy, and Meta/Google ad metrics.', techStack: ['Meta Ads Manager', 'Google Ads', 'A/B Testing'], demoType: 'ad', price: 850 },
  { id: 'w17', category: 'Ad Campaign Design & Management', title: 'Cheela Cafe Local App Install Campaign', summary: 'Geofenced target ad creative showcase.', techStack: ['Meta Ads Manager', 'Geofencing APIs'], demoType: 'ad', price: 950 }
];

export function FeaturedWorksShowcase({ onNavigate }: { onNavigate?: (view: any) => void }) {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWork]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const categories = Array.from(new Set(FEATURED_WORKS.map(w => w.category)));

  return (
    <div className="min-h-screen pb-20 font-sans" style={{ backgroundColor: COLORS.bgBase, color: COLORS.textMain }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ color: COLORS.accent }}>
            Featured Works & Interactive Demos
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: COLORS.textMuted }}>
            Explore our complete portfolio spanning across 9 core expertise categories. 
            Click any card to view detailed specifications and interact with live prototypes.
          </p>
        </div>

        {/* Portfolio Grid Grouped by Category */}
        <div className="space-y-16">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: COLORS.border, color: COLORS.textMain }}>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_WORKS.filter(w => w.category === category).map((work) => (
                  <div 
                    key={work.id} 
                    className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
                    style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}
                    onClick={() => {
                      if (work.liveLink) {
                        window.open(work.liveLink, '_blank', 'noopener,noreferrer');
                      } else if (work.demoType === 'social' && onNavigate) {
                        onNavigate('social-media-showcase');
                      } else if (work.demoType === 'ux' && onNavigate) {
                        onNavigate('ux-showcase');
                      } else if (work.demoType === 'ai' && onNavigate) {
                        onNavigate('ai-showcase');
                      } else if (work.demoType === 'ora-grande' && onNavigate) {
                        onNavigate('ora-grande-showcase');
                      } else {
                        setSelectedWork(work);
                      }
                    }}
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-slate-600 transition-colors" style={{ color: COLORS.textMain }}>
                        {work.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>{work.summary}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: COLORS.border }}>
                      <div className="flex flex-wrap gap-2">
                        {work.techStack.slice(0,2).map(t => (
                          <span key={t} className="text-xs px-2 py-1 rounded-md font-medium" style={{ backgroundColor: COLORS.bgDark, color: COLORS.badge }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 text-sm font-bold" style={{ color: COLORS.accent }}>
                        View Details & Live Demo <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>



      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
            onClick={() => setSelectedWork(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start p-6 border-b" style={{ borderColor: COLORS.border }}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: COLORS.badge }}>
                    {selectedWork.category}
                  </span>
                  <div className="flex items-center gap-4 flex-wrap">
                    <h2 className="text-2xl font-black" style={{ color: COLORS.textMain }}>{selectedWork.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedWork(null)}
                  className="p-2 rounded-full transition-colors hover:bg-slate-100 shrink-0 ml-4"
                >
                  <X size={24} style={{ color: COLORS.textMuted }} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <ModalTabs work={selectedWork} onNavigate={onNavigate} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModalTabs({ work, onNavigate }: { work: any; onNavigate?: (view: any) => void }) {
  const [activeTab, setActiveTab] = useState<'specs' | 'demo'>('specs');

  return (
    <div className="flex flex-col h-full">
      <div className="flex px-6 border-b" style={{ borderColor: COLORS.border }}>
        <button 
          onClick={() => setActiveTab('specs')}
          className={`py-4 px-6 font-bold text-sm transition-colors border-b-2 ${activeTab === 'specs' ? 'border-slate-900' : 'border-transparent'}`}
          style={{ color: activeTab === 'specs' ? COLORS.accent : COLORS.textMuted }}
        >
          Project Specs
        </button>
        <button 
          onClick={() => {
            if (work.demoType === 'dashboard-saas' && onNavigate) {
              onNavigate('saas-showcase');
            } else if (work.demoType === 'medqbank-showcase' && onNavigate) {
              onNavigate('medqbank-showcase');
            } else if (work.demoType === 'cheela-showcase' && onNavigate) {
              onNavigate('cheela-showcase');
            } else {
              setActiveTab('demo');
            }
          }}
          className={`py-4 px-6 font-bold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'demo' ? 'border-slate-900' : 'border-transparent'}`}
          style={{ color: activeTab === 'demo' ? COLORS.accent : COLORS.textMuted }}
        >
          <Play size={16} />
          Live Interactive Prototype
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'specs' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold mb-3" style={{ color: COLORS.textMain }}>Overview</h3>
              <p className="leading-relaxed" style={{ color: COLORS.textMuted }}>{work.summary} This project represents a state-of-the-art implementation tailored precisely to the domain of {work.category.toLowerCase()}. It encompasses high-fidelity design patterns, robust architectural considerations, and a relentless focus on end-user experience.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl" style={{ backgroundColor: COLORS.bgDark }}>
                <h4 className="text-sm font-bold uppercase mb-3" style={{ color: COLORS.badge }}>Tech Stack & Setup</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.techStack.map((t: string) => (
                    <span key={t} className="px-3 py-1 rounded-md text-sm font-medium" style={{ backgroundColor: COLORS.bgCard, color: COLORS.textMain, border: `1px solid ${COLORS.border}` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-sm font-bold uppercase mb-2" style={{ color: COLORS.badge }}>Estimated Timeline</h4>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>4 to 8 Weeks depending on complexity</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: COLORS.bgDark }}>
                <h4 className="text-sm font-bold uppercase mb-3" style={{ color: COLORS.badge }}>Deliverables & Accomplishments</h4>
                <ul className="space-y-2 text-sm" style={{ color: COLORS.textMuted }}>
                  <li className="flex items-start gap-2"><CheckSquare size={14} className="mt-0.5 shrink-0" style={{ color: COLORS.accent }} /> <span>Full Source Code & Production Ready Build</span></li>
                  <li className="flex items-start gap-2"><CheckSquare size={14} className="mt-0.5 shrink-0" style={{ color: COLORS.accent }} /> <span>Responsive Design across Desktop, Tablet & Mobile</span></li>
                  <li className="flex items-start gap-2"><CheckSquare size={14} className="mt-0.5 shrink-0" style={{ color: COLORS.accent }} /> <span>Key Accomplishment: Reduced interaction latency by 40%</span></li>
                  <li className="flex items-start gap-2"><CheckSquare size={14} className="mt-0.5 shrink-0" style={{ color: COLORS.accent }} /> <span>Key Accomplishment: Passed WCAG AAA Accessibility</span></li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <InteractiveDemo placeholder={work.demoType} title={work.title} />
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveDemo({ placeholder, title }: { placeholder: string, title: string }) {
  const [activeState, setActiveState] = useState(0);

  const renderContent = () => {
    switch (placeholder) {
      case 'dashboard-saas':
        return <CorporateSaaSDashboard />;
        
      case 'dashboard':
        return (
          <div className="w-full text-left">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg" style={{ color: COLORS.textMain }}>Revenue Analytics</h4>
              <select className="bg-slate-100 text-slate-700 text-sm p-2 rounded-lg border border-slate-200 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex items-end gap-2 h-40 mb-4 border-b border-slate-200 pb-2">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-slate-800 hover:bg-slate-900 transition-colors relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs" style={{ color: COLORS.textMuted }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        );
      
      case 'app':
        return (
          <div className="w-full max-w-sm mx-auto text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <ShoppingCart size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Live Demo Available</h4>
              <p className="text-sm text-slate-600 mb-6">Experience the full featured e-commerce application live.</p>
              <a 
                href="https://gullg.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-sm"
                style={{ backgroundColor: COLORS.accent }}
              >
                <span>Live Website Demo</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="w-full max-w-md mx-auto text-left bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-80 shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold flex items-center gap-2 text-slate-900">
              <Zap size={16} className="text-slate-500" /> AI Support
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-slate-100 p-3 rounded-r-xl rounded-bl-xl max-w-[80%] text-sm text-slate-700">
                Hello! I'm the AI assistant. How can I help you today?
              </div>
              {activeState > 0 && (
                <div className="bg-slate-900 text-white p-3 rounded-l-xl rounded-br-xl max-w-[80%] ml-auto text-sm">
                  What is the status of my order?
                </div>
              )}
              {activeState > 0 && (
                <div className="bg-slate-100 p-3 rounded-r-xl rounded-bl-xl max-w-[80%] text-sm mt-2 animate-in fade-in slide-in-from-bottom-2 text-slate-700">
                  Your order #12345 is currently out for delivery and will arrive by 5 PM.
                </div>
              )}
            </div>
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex gap-2">
              <input type="text" placeholder="Type a message..." disabled={activeState > 0} className="flex-1 bg-white rounded-lg px-3 py-2 text-sm outline-none border border-slate-200 focus:border-slate-400 transition-colors text-slate-900" />
              <button 
                onClick={() => setActiveState(1)}
                disabled={activeState > 0}
                className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        );
        
      case 'brand':
        return (
          <div className="w-full max-w-sm mx-auto text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <ExternalLink size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Live Brand Identity Demo</h4>
              <p className="text-sm text-slate-600 mb-6">Explore the official branding suite live.</p>
              <button 
                disabled
                className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all shadow-sm opacity-50 cursor-not-allowed"
                style={{ backgroundColor: COLORS.accent }}
              >
                <span>Coming Soon</span>
              </button>
            </div>
          </div>
        );

      case 'ux-wip':
        return (
          <div className="w-full max-w-sm mx-auto text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <ExternalLink size={32} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Interactive Prototype</h4>
              <p className="text-sm text-slate-600 mb-6">Explore the UX workflow & micro-interactions.</p>
              <button 
                disabled
                className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all shadow-sm opacity-50 cursor-not-allowed"
                style={{ backgroundColor: COLORS.accent }}
              >
                <span>Coming Soon</span>
              </button>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="w-full max-w-4xl mx-auto bg-[#0A1325] rounded-2xl overflow-hidden shadow-xl border border-slate-700">
            <video 
              controls 
              autoPlay 
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            >
              <source src="/cheela-commercial.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed" style={{ borderColor: COLORS.border, backgroundColor: COLORS.bgDark }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: COLORS.bgCard }}>
              <Play size={40} style={{ color: COLORS.accent }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.textMain }}>Interactive Widget Loaded</h3>
            <p className="max-w-md" style={{ color: COLORS.textMuted }}>
              The live prototype for <strong>{title}</strong> ({placeholder}) is running in simplified preview mode.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      {renderContent()}
    </div>
  );
}
