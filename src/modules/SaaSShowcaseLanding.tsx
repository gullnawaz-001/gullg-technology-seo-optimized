import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ArrowRight, CheckCircle2, BarChart3, Users, Zap, LayoutDashboard } from 'lucide-react';
import { CorporateSaaSDashboard } from '../components/demos/CorporateSaaSDashboard';

export function SaaSShowcaseLanding({ onNavigate }: { onNavigate: (view: any) => void }) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F8FAFC', color: '#1E293B' }}>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-700 font-semibold text-sm mb-8 ring-1 ring-sky-200"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Featured Case Study
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            style={{ color: '#0A1325' }}
          >
            Enterprise SaaS Analytics & <br className="hidden md:block" />
            <span style={{ color: '#0EA5E9' }}>Financial Platform</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-10"
            style={{ color: '#475569' }}
          >
            A dual-view corporate financial control center with real-time telemetry and client-facing metrics. Designed for scale, speed, and precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setShowDemo(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-sky-500/40"
              style={{ backgroundColor: '#0EA5E9' }}
            >
              <span className="text-xl">🚀</span> View Live Interactive Demo
            </button>
            <button 
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold hover:bg-slate-50 transition-colors ring-1 ring-slate-200 flex items-center justify-center gap-2"
            >
              Back to Portfolio <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>
      </div>

      {/* Value Props */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Dual-View Architecture</h3>
              <p style={{ color: '#475569' }}>Seamlessly toggle between internal admin telemetry and clean client-facing executive reports.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Financials</h3>
              <p style={{ color: '#475569' }}>Interactive charting for MRR/ARR, churn rates, and unit economics (LTV:CAC).</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Glass & Slate UI</h3>
              <p style={{ color: '#475569' }}>A premium corporate aesthetic using clean light-blue backgrounds and minimalist components.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[1400px] h-[90vh] bg-[#F0F4F8] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col ring-1 ring-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0EA5E9', color: '#FFF' }}>
                    <LayoutDashboard size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Live Demo Viewer</h3>
                    <p className="text-xs text-slate-500">SaaS Analytics & Financial Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-medium">copyright@gullgtech.com</span>
                  <button 
                    onClick={() => setShowDemo(false)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Render Dashboard Component inside the Modal */}
              <div className="flex-1 overflow-hidden relative">
                <CorporateSaaSDashboard />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
