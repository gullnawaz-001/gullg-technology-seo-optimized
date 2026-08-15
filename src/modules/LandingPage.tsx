import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, PlayCircle, Sparkles, X } from 'lucide-react';
import { servicesData, portfolioData } from '../data';
import { useState } from 'react';
import { ViewState, Service, PortfolioProject } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  const categories = ['All', 'Development', 'Design', 'Marketing', 'Automation & AI', 'Consultancy'];
  const filteredServices = activeFilter === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeFilter);

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32">
        {/* Dynamic Light Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
          
          <div
            className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-indigo-300/30 rounded-full blur-3xl z-0 animate-float1"
          />
          <div
            className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-sky-300/30 rounded-full blur-3xl z-0 animate-float2"
          />
          <div
            className="absolute -bottom-32 left-1/3 w-[35rem] h-[35rem] bg-violet-300/30 rounded-full blur-3xl z-0 animate-float3"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-slate-700 font-semibold text-sm mb-8 ring-1 ring-slate-300">
            <Sparkles size={16} />
            <span>Bridging Creative Excellence with Technical Precision</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-8"
          >
            Transforming Digital Complexity into{' '}
            <span className="text-slate-500">High-Performance</span> Products
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-12"
          >
            GullG Technologies is a digital innovation agency built on the belief that the best solutions emerge at the intersection of diverse disciplines. We bring together Technology, Design, AI, Automation, User Experience, and Creativity to solve complex problems simply and elegantly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-colors shadow-lg shadow-slate-800/25 flex items-center justify-center gap-2"
            >
              Explore Services
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-50 hover:bg-slate-200 transition-colors ring-1 ring-slate-200 flex items-center justify-center gap-2"
            >
              Get an Estimate
              <ChevronRight size={18} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-200 pt-12"
          >
            {[
              { label: 'Years of Experience', value: '20+' },
              { label: 'Core Disciplines', value: '6' },
              { label: 'Reliable Delivery', value: '100%' },
              { label: 'Unified Studio', value: '1' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES SHOWCASE */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Our Expertise</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive solutions tailored for modern digital enterprises.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white rounded-3xl p-8 ring-1 ring-slate-200 hover:ring-slate-400 :ring-slate-500 transition-all shadow-sm hover:shadow-xl hover:shadow-slate-500/10 cursor-pointer overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5  rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase">{service.timeline}</span>
                  <button className="text-slate-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS REMOVED - NOW A DEDICATED VIEW */}

      {/* CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to scale your digital presence?</h2>
          <p className="text-xl text-slate-600 mb-12">Let's discuss how GullG Technology can bridge your creative vision with technical precision.</p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-900 transition-colors inline-flex items-center gap-2"
          >
            Contact Us Today
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full relative ring-1 ring-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedService(null)} 
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6">
                <Sparkles size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedService.title}</h3>
              <div className="inline-flex px-3 py-1 bg-slate-200 rounded-full text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">
                {selectedService.category}
              </div>
              <p className="text-slate-600 text-lg mb-8">{selectedService.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Core Deliverables</h4>
                  <ul className="space-y-3">
                    {selectedService.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 size={20} className="text-slate-500 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-50 ring-1 ring-slate-200 text-sm font-medium text-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-bold text-slate-900 mb-2">Estimated Timeline</h4>
                    <p className="text-slate-600">{selectedService.timeline}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full relative ring-1 ring-slate-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white backdrop-blur-md transition-colors z-20 text-slate-900"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProject.image} 
                  alt={`${selectedProject.title} - ${selectedProject.category}`} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto">
                <div className="inline-flex px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  {selectedProject.category}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedProject.title}</h3>
                <p className="text-slate-600 text-lg mb-8">{selectedProject.description}</p>
                
                <h4 className="font-bold text-slate-900 mb-4">Project Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.stats.map((stat, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 ring-1 ring-slate-100">
                      <div className="text-3xl font-bold text-slate-700 mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-slate-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <button className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2">
                    View Live Case Study
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
