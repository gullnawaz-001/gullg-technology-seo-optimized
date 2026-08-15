import { Code2, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: 'landing' },
    { label: 'Company', view: 'company' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Services', view: 'services' },
    { label: 'Knowledge Hub', view: 'knowledge-hub' },
    { label: 'Contact Us', view: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80  backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('landing')}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover="hover"
        >
          <motion.div 
            className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md relative overflow-hidden ring-1 ring-slate-800"
            variants={{
              hover: { scale: 1.05, rotate: 3 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img src="/logo.png" alt="GullG Technology Logo" className="w-full h-full object-cover relative z-10" />
            {/* Shine sweep */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
              initial={{ x: '-150%' }}
              variants={{
                hover: { x: '150%' }
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="flex flex-col justify-center">
            <span className="text-xl font-extrabold text-slate-900 leading-none mb-1 group-hover:text-slate-700 transition-colors">
              GullG Technology
            </span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold leading-none">Bridging Excellence</p>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-slate-700",
                currentView === item.view ? "text-slate-700 font-semibold" : "text-slate-600" 
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('admin')}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            Admin
          </button>
          <button 
            onClick={() => onNavigate('client-portal')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Client Portal
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-lg font-medium text-slate-900 py-2 border-b border-slate-100 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => {
                onNavigate('client-portal');
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-center inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Client Portal
            </button>
            <button 
              onClick={() => {
                onNavigate('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-slate-500 text-center py-2"
            >
              Admin Simulation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
