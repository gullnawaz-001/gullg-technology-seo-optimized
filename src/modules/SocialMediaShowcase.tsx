import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Share2, Calendar, Users, BarChart3, Sparkles, CheckCircle2, Layout, MessageCircle, Play, Eye } from 'lucide-react';
import { socialMediaDemoData } from '../data/socialMediaDemoData';

const THEME = {
  bgBase: '#0A1325',
  bgCard: '#101E38',
  accentPrimary: '#6366F1', // Electric Indigo
  accentSecondary: '#14B8A6', // Vibrant Teal
  textMain: '#FFFFFF',
  textMuted: '#94A3B8',
  border: '#1B2F54'
};

export default function SocialMediaShowcase({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'analytics' | 'platform'>('calendar');
  const [analyticsPeriod, setAnalyticsPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [activePlatform, setActivePlatform] = useState('instagram');

  return (
    <div className="min-h-screen font-sans selection:bg-[#6366F1]/30" style={{ backgroundColor: THEME.bgBase, color: THEME.textMain }}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: THEME.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
            style={{ color: THEME.textMuted }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#6366F1] to-[#14B8A6] flex items-center justify-center text-white font-bold">
              <Share2 size={16} />
            </div>
            <span className="font-bold tracking-wide">Social Growth Hub</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none" 
             style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: THEME.accentSecondary }}>
            <Sparkles size={16} /> Premium Digital Agency Services
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight max-w-5xl mx-auto">
            Transform Your Social Media Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#14B8A6]">High-Performing Digital Growth Engine</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: THEME.textMuted }}>
            Build a stronger digital presence with a strategic, creative, and results-driven social media approach. From content creation to community engagement and analytics—we turn views into business growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]" style={{ backgroundColor: THEME.accentPrimary }}>
              Explore Live Campaign Demo
            </button>
            <button className="px-8 py-4 rounded-full font-bold transition-colors border-2 hover:bg-white/5" style={{ borderColor: THEME.border, color: THEME.textMain }}>
              Request Custom Strategy
            </button>
          </div>
          
          {/* Floating Metric Anchor */}
          <div className="mt-16 flex justify-center">
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex items-center gap-8 shadow-2xl backdrop-blur-sm max-w-2xl w-full mx-auto">
              <div className="flex-1 text-center border-r border-[#334155]">
                <p className="text-sm text-[#94A3B8] font-semibold mb-1">Reach Growth</p>
                <p className="text-3xl font-black text-[#14B8A6]">+142%</p>
              </div>
              <div className="flex-1 text-center border-r border-[#334155]">
                <p className="text-sm text-[#94A3B8] font-semibold mb-1">Engagement Rate</p>
                <p className="text-3xl font-black text-white">8.4%</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm text-[#94A3B8] font-semibold mb-1">Impressions</p>
                <p className="text-3xl font-black text-white">250K+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Ecosystem Grid */}
      <section className="py-24" style={{ backgroundColor: '#0B1120' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Core Service Pillars</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: THEME.textMuted }}>Our comprehensive approach to building dominating social brands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Social Media Strategy', desc: 'Customized platform roadmaps, audience persona mapping, tone-of-voice definition, and business objective alignment.' },
              { icon: Layout, title: 'Content Planning & Creation', desc: 'Graphics, video short-forms (Reels/TikToks), high-converting captions, educational slides, and promotional assets.' },
              { icon: Calendar, title: 'Content Calendar Management', desc: 'Multi-channel scheduling matrix, seasonal campaign mapping, brand activity tracking, and automated publishing previews.' },
              { icon: Share2, title: 'Platform Management', desc: 'Multi-platform execution across Facebook, Instagram, LinkedIn, TikTok, X (Twitter), and Pinterest.' },
              { icon: Users, title: 'Community Management', desc: 'Active comment moderation, direct message response systems, brand monitoring, and relationship building.' },
              { icon: BarChart3, title: 'Analytics & Performance', desc: 'Real-time KPI dashboards, reach tracking, click-through optimization, and monthly executive summaries.' }
            ].map((service, i) => (
              <div key={i} className="p-8 rounded-2xl border transition-all hover:-translate-y-2 group cursor-pointer" style={{ backgroundColor: THEME.bgCard, borderColor: THEME.border }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: THEME.accentSecondary }}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: THEME.textMuted }}>{service.desc}</p>
                <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: THEME.accentPrimary }}>
                    <ArrowLeft size={16} className="rotate-135" style={{ transform: 'rotate(135deg)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Flow */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Strategic Execution Flow</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: THEME.textMuted }}>Our proven 5-step methodology for scaling digital presence.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden lg:block" style={{ backgroundColor: THEME.border }}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'Discover', desc: 'Brand audit, competitor analysis, audience profiling.' },
                { step: '02', title: 'Strategize', desc: 'Content pillars, channel matrix, ROI targets.' },
                { step: '03', title: 'Create', desc: 'Asset production, copy editing, video styling.' },
                { step: '04', title: 'Publish', desc: 'Automated publishing, real-time responses.' },
                { step: '05', title: 'Analyze', desc: 'Data evaluation, A/B testing, refinement.' }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-4" style={{ backgroundColor: THEME.bgBase, borderColor: THEME.accentPrimary, color: THEME.accentPrimary }}>
                    {s.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                  <p className="text-sm" style={{ color: THEME.textMuted }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Demo Widgets */}
      <section className="py-24" style={{ backgroundColor: '#0B1120' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Live Interactive Dashboard Demo</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: THEME.textMuted }}>Experience the tools and workflows we use to manage and grow brands.</p>
          </div>

          <div className="rounded-3xl overflow-hidden border shadow-2xl" style={{ backgroundColor: THEME.bgBase, borderColor: THEME.border }}>
            {/* Widget Tabs */}
            <div className="flex border-b" style={{ borderColor: THEME.border, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
              {[
                { id: 'calendar', label: 'Content Calendar', icon: Calendar },
                { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
                { id: 'platform', label: 'Multi-Platform Preview', icon: Layout }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-bold text-sm transition-colors border-b-2 ${activeTab === tab.id ? 'text-white' : 'border-transparent'}`}
                  style={{ borderColor: activeTab === tab.id ? THEME.accentPrimary : 'transparent', color: activeTab !== tab.id ? THEME.textMuted : undefined }}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Widget Content */}
            <div className="p-8 min-h-[500px]">
              
              {/* Calendar Demo */}
              {activeTab === 'calendar' && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Upcoming Schedule</h3>
                    <button className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: THEME.accentPrimary }}>+ Create Post</button>
                  </div>
                  <div className="space-y-4">
                    {socialMediaDemoData.calendar.map(item => (
                      <div key={item.id} className="flex items-center gap-6 p-4 rounded-xl border transition-colors hover:bg-white/5" style={{ backgroundColor: THEME.bgCard, borderColor: THEME.border }}>
                        <div className="w-24 shrink-0">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            item.status === 'Scheduled' ? 'bg-indigo-500/20 text-indigo-400' : 
                            item.status === 'Approved' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="w-48 shrink-0 text-sm font-medium" style={{ color: THEME.textMuted }}>{item.date}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-sm" style={{ color: THEME.textMuted }}>{item.type}</p>
                        </div>
                        <div className="flex gap-2">
                          {item.platforms.map(p => (
                            <span key={p} className="px-2 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: '#0A1325', border: `1px solid ${THEME.border}` }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Demo */}
              {activeTab === 'analytics' && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Performance Overview</h3>
                    <div className="flex bg-[#0A1325] rounded-lg p-1 border" style={{ borderColor: THEME.border }}>
                      <button onClick={() => setAnalyticsPeriod('weekly')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${analyticsPeriod === 'weekly' ? 'bg-[#334155] text-white' : 'text-[#94A3B8]'}`}>Weekly</button>
                      <button onClick={() => setAnalyticsPeriod('monthly')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${analyticsPeriod === 'monthly' ? 'bg-[#334155] text-white' : 'text-[#94A3B8]'}`}>Monthly</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: 'Total Reach', value: socialMediaDemoData.analytics[analyticsPeriod].reach, trend: '+12%' },
                      { label: 'Engagement Rate', value: socialMediaDemoData.analytics[analyticsPeriod].engagement, trend: '+1.5%' },
                      { label: 'Follower Growth', value: socialMediaDemoData.analytics[analyticsPeriod].followers, trend: '+8%' },
                      { label: 'Link Clicks', value: socialMediaDemoData.analytics[analyticsPeriod].clicks, trend: '+24%' }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-xl border" style={{ backgroundColor: THEME.bgCard, borderColor: THEME.border }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: THEME.textMuted }}>{stat.label}</p>
                        <h4 className="text-3xl font-black mb-2">{stat.value}</h4>
                        <span className="text-xs font-bold text-[#14B8A6]">{stat.trend} vs last period</span>
                      </div>
                    ))}
                  </div>
                  {/* Simulated Chart Area */}
                  <div className="h-64 rounded-xl border flex items-end gap-2 p-6" style={{ backgroundColor: THEME.bgCard, borderColor: THEME.border }}>
                    {[30, 45, 60, 40, 75, 55, 90, 85, 100, 70, 80, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-md transition-all hover:opacity-80 relative group" style={{ height: `${h}%`, backgroundColor: THEME.accentPrimary }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A1325] text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Data Point
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Platform Preview Demo */}
              {activeTab === 'platform' && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex justify-center gap-4 mb-10">
                    {socialMediaDemoData.platforms.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => setActivePlatform(p.id)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activePlatform === p.id ? 'text-white' : 'hover:bg-white/5'}`}
                        style={{ 
                          backgroundColor: activePlatform === p.id ? THEME.accentPrimary : THEME.bgCard,
                          borderColor: activePlatform === p.id ? THEME.accentPrimary : THEME.border,
                          color: activePlatform !== p.id ? THEME.textMuted : undefined
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div className="w-full max-w-sm rounded-2xl border overflow-hidden shadow-xl" style={{ backgroundColor: THEME.bgCard, borderColor: THEME.border }}>
                      <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: THEME.border }}>
                        <div className="w-10 h-10 rounded-full bg-[#0A1325]"></div>
                        <div>
                          <p className="font-bold text-sm">Your Brand</p>
                          <p className="text-xs text-[#94A3B8]">Sponsored</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm mb-4">Discover the ultimate strategy to scale your business this quarter. 🚀 Click the link to learn more! #Growth #Marketing</p>
                      </div>
                      {/* Dynamic aspect ratio box */}
                      {socialMediaDemoData.platforms.map(p => p.id === activePlatform && (
                        <div key={p.id} className="bg-[#0A1325] flex items-center justify-center w-full" style={{ aspectRatio: p.ratio.replace(':', '/') }}>
                           <span className="text-[#94A3B8] font-semibold tracking-wider uppercase">{p.ratio} Asset</span>
                        </div>
                      ))}
                      <div className="p-4 flex justify-between text-[#94A3B8]">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1"><CheckCircle2 size={16} /> Like</span>
                          <span className="flex items-center gap-1"><MessageCircle size={16} /> Comment</span>
                        </div>
                        <Share2 size={16} />
                      </div>
                    </div>
                    <div className="max-w-sm">
                      <h3 className="text-2xl font-bold mb-4">Optimized for {socialMediaDemoData.platforms.find(p => p.id === activePlatform)?.name}</h3>
                      <p className="text-lg leading-relaxed mb-6" style={{ color: THEME.textMuted }}>
                        {socialMediaDemoData.platforms.find(p => p.id === activePlatform)?.description}
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-[#14B8A6]" size={20} /> Correct Asset Dimensions</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-[#14B8A6]" size={20} /> Platform-Specific Copy</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-[#14B8A6]" size={20} /> Strategic Hashtag Density</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t" style={{ borderColor: THEME.border, backgroundColor: THEME.bgBase }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to dominate your social channels?</h2>
          <p className="text-xl mb-10 text-[#94A3B8]">Let's turn your social media presence into a powerful digital growth channel with our data-driven strategies.</p>
          <button className="px-10 py-5 rounded-full font-black text-lg text-white transition-all hover:scale-105 shadow-2xl" style={{ backgroundColor: THEME.accentPrimary }}>
            Start Your Custom Strategy
          </button>
        </div>
      </section>
    </div>
  );
}
