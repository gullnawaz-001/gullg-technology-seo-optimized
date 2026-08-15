import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Code2, ArrowRight, Compass, Settings, RefreshCw, LayoutDashboard, BrainCircuit, Palette } from 'lucide-react';
import { ViewState } from '../types';

export function Services({ onNavigate, onNavigateWithService }: { onNavigate?: (view: ViewState) => void, onNavigateWithService?: (service: string) => void }) {
  const services = [
    {
      caseStudySlug: 'ux-showcase',
      title: 'Discovery & Consultation',
      description: "A low-commitment first step for clients exploring a project. Includes an initial audit or strategy session, exploratory design concepts, and a scoping discussion. Perfect for new clients who aren't ready to commit to a full build yet.",
      icon: <Compass size={32} className="text-slate-700" />,
      tags: ['Design', 'Creativity', 'UX'],
    },
    {
      caseStudySlug: 'ora-grande-showcase',
      title: 'Full Project Build',
      description: "The core offering — end-to-end delivery combining design and development, with AI and automation integrated where relevant. Includes UX research, UI design, working prototype/build, and one round of revisions. Designed for clients ready to commission a complete product or platform.",
      icon: <Code2 size={32} className="text-slate-700" />,
      tags: ['Technology', 'Design', 'AI', 'Automation', 'UX', 'Creativity'],
    },
    {
      caseStudySlug: 'social-media-showcase',
      title: 'Ongoing / Retainer',
      description: "For clients who need continued support after launch — iteration, feature additions, or an ongoing design and technology partner. Includes scheduled check-ins, priority support, and continuous improvement cycles.",
      icon: <RefreshCw size={32} className="text-slate-700" />,
      tags: ['Technology', 'Automation', 'Creativity'],
    },
    {
      caseStudySlug: 'saas-showcase',
      title: 'Custom Dashboards & Platforms',
      description: "Bespoke management platforms and internal tools built around how your business actually works. From client CRMs to event and workflow dashboards, we design and build systems that replace spreadsheets and guesswork with a single, purpose-built tool.",
      icon: <LayoutDashboard size={32} className="text-slate-700" />,
      tags: ['Technology', 'Design', 'Automation', 'UX'],
    },
    {
      caseStudySlug: 'ai-showcase',
      title: 'AI Integration',
      description: "Embedding AI-driven features into your products and workflows — from intelligent automation and content generation to smart recommendations and data-driven decision support. We integrate AI where it genuinely adds value, not as a buzzword.",
      icon: <BrainCircuit size={32} className="text-slate-700" />,
      tags: ['Technology', 'AI', 'Automation'],
    },
    {
      caseStudySlug: 'cheela-showcase',
      title: 'Brand & Creative Design',
      description: "Visual identity, branding, and creative direction that gives your business a distinct, memorable presence. From logo and brand systems to full creative campaigns, we bring an artist's eye to commercial work.",
      icon: <Palette size={32} className="text-slate-700" />,
      tags: ['Design', 'Creativity', 'UX'],
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-medium text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Engagement Models</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            Digital Services & Solutions
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 font-medium leading-relaxed"
          >
            Every project is scoped individually based on complexity and requirements — the packages below outline how we work, not fixed pricing.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              
              <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="mb-8 flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              
              
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button 
                  onClick={() => { if(onNavigateWithService) { onNavigateWithService(service.title) } else if(onNavigate) { onNavigate('contact') } }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Get a Custom Quote
                  <ArrowRight size={16} />
                </button>
                {service.caseStudySlug && (
                  <Link 
                    to={`/portfolio/${service.caseStudySlug}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    See case study
                  </Link>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
