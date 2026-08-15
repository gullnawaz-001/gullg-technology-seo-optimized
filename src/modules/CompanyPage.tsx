import React from "react";
import { ArrowRight, Code2, Layers, Cpu, Users, Target, CheckCircle2, Lightbulb, PenTool, LayoutGrid, BrainCircuit, Share2, Video, Rocket, LineChart } from 'lucide-react';
import { ViewState } from '../types';
import { motion } from 'motion/react';

interface CompanyPageProps {
  onNavigate: (view: ViewState) => void;
}

export function CompanyPage({ onNavigate }: CompanyPageProps) {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4 block">
              GullG Technologies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto">
              Transforming Ideas into Meaningful Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Technology • Digital Experience • UI/UX • Creative Solutions
              <br /><br />
              With over 21 years of experience, we sit at the intersection of design thinking, artificial intelligence, automation, and user-centered design to craft solutions that empower people and businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are & Vision/Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                We are a digital innovation agency built on the belief that the best solutions emerge at the intersection of diverse disciplines. We bring together <span className="font-semibold text-slate-900">Technology, Design, AI, Automation, User Experience, and Creativity</span> to solve complex problems simply and elegantly.
              </p>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Target className="text-slate-700" size={24} /> Mission
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To deliver intelligent, human-centric digital solutions that streamline operations, elevate brand experiences, and drive measurable growth.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="text-slate-700" size={24} /> Vision
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    To be the catalyst for meaningful digital transformation, guided by our 7 key pillars:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> User-centered</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Modern</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Simple</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Practical</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Adaptable</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-400" /> Consistent</li>
                    <li className="flex items-center gap-2 col-span-2"><CheckCircle2 size={16} className="text-slate-400" /> AI-enhanced</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-slate-100 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center">
                  <Code2 size={40} className="text-slate-700 mb-4" />
                  <span className="font-bold text-slate-900">Technology</span>
                </div>
                <div className="bg-slate-50 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center border border-slate-200">
                  <BrainCircuit size={40} className="text-slate-700 mb-4" />
                  <span className="font-bold text-slate-900">AI & Automation</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center border border-slate-200">
                  <PenTool size={40} className="text-slate-700 mb-4" />
                  <span className="font-bold text-slate-900">Design</span>
                </div>
                <div className="bg-slate-900 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center">
                  <Users size={40} className="text-white mb-4" />
                  <span className="font-bold text-white">User Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What We Believe</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">The core philosophy that guides every line of code we write and every pixel we place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Technology Should Serve People", desc: "We build systems that adapt to human needs, not the other way around.", icon: <Users size={24} /> },
              { title: "Design Is More Than Appearance", desc: "Good design is how it works. We focus on clarity, functionality, and purpose.", icon: <LayoutGrid size={24} /> },
              { title: "Simplicity Creates Better Experiences", desc: "We remove the unnecessary so the necessary may speak. Complexity is the enemy of usability.", icon: <Layers size={24} /> },
              { title: "Intelligent Technology Creates New Possibilities", desc: "AI and automation aren't just buzzwords; they are tools to augment human capabilities.", icon: <BrainCircuit size={24} /> }
            ].map((belief, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  {belief.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{belief.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{belief.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Expertise</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Comprehensive digital services designed to transform your business end-to-end.</p>
          </div>
          
          <div className="space-y-12">
            {/* 1. Development */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-200"></span>
                1. Development
                <span className="flex-1 h-px bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpertiseCard 
                  num="01" 
                  title="Data-Driven Dashboard Design" 
                  desc="Clear info architecture, data viz, interactive interfaces, decision support." 
                  icon={<LineChart />} 
                />
                <ExpertiseCard 
                  num="02" 
                  title="Modern Web & Mobile App Development" 
                  desc="High-performance scalable apps, responsive design, usability." 
                  icon={<Code2 />} 
                />
              </div>
            </div>

            {/* 2. Design */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-200"></span>
                2. Design
                <span className="flex-1 h-px bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpertiseCard 
                  num="03" 
                  title="Graphic & Brand Identity Design" 
                  desc="Cohesive branding, visual communication, print/digital assets." 
                  icon={<PenTool />} 
                />
                <ExpertiseCard 
                  num="04" 
                  title="UI/UX Prototyping & User Research" 
                  desc="User journeys, wireframes, interactive prototypes, usability evaluation." 
                  icon={<LayoutGrid />} 
                />
              </div>
            </div>

            {/* 3. Automation & AI */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-200"></span>
                3. Automation & AI
                <span className="flex-1 h-px bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpertiseCard 
                  num="05" 
                  title="Intelligent Process & Workflow Automation" 
                  desc="Streamlining operations, system integration, task automation." 
                  icon={<Cpu />} 
                />
                <ExpertiseCard 
                  num="06" 
                  title="Live AI Chatbot Integration" 
                  desc="Context-aware AI assistants, customer support, lead generation." 
                  icon={<BrainCircuit />} 
                />
              </div>
            </div>

            {/* 4. Marketing */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-200"></span>
                4. Marketing
                <span className="flex-1 h-px bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExpertiseCard 
                  num="07" 
                  title="Social Media Management & Strategy" 
                  desc="Content planning, profile growth, campaign support." 
                  icon={<Share2 />} 
                />
                <ExpertiseCard 
                  num="08" 
                  title="Video Creation & Motion Production" 
                  desc="Short-form reels, motion graphics, visual storytelling." 
                  icon={<Video />} 
                />
                <ExpertiseCard 
                  num="09" 
                  title="Ad Campaign Design & Management" 
                  desc="Targeted paid campaigns, visual creatives, performance advertising." 
                  icon={<Rocket />} 
                />
              </div>
            </div>

            {/* 5. Consultancy */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-200"></span>
                5. Consultancy
                <span className="flex-1 h-px bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <ExpertiseCard 
                  num="10" 
                  title="Digital Strategy & Design Consultancy" 
                  desc="UX evaluation, design leadership, digital transformation, team mentoring." 
                  icon={<Target />} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Approach */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Professional Approach</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">A proven 7-step methodology to ensure consistency, quality, and impact.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { num: "01", label: "Understand" },
              { num: "02", label: "Strategize" },
              { num: "03", label: "Design" },
              { num: "04", label: "Build" },
              { num: "05", label: "Automate & Integrate" },
              { num: "06", label: "Refine" },
              { num: "07", label: "Deliver" }
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-slate-300 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white transition-colors mb-4">
                    {step.num}
                  </div>
                  <span className="text-sm font-medium text-slate-300">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden lg:block text-slate-700 -mt-8" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Ecosystem */}
      <section className="py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Experience & Ecosystem</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">21+</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">100%</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">User-Centered</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 mb-2">Enterprise-Level</div>
                  <div className="text-sm font-medium text-slate-600">Experience</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 mb-2">Digital</div>
                  <div className="text-sm font-medium text-slate-600">Transformation</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Core Toolkit</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'Tailwind CSS', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'TypeScript', 'OpenAI / Gemini', 'Vite', 'PHP', 'Java'].map((tool, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="w-16 h-1 bg-slate-900 block mx-auto rounded-full"></span>
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 leading-snug mb-8">
            "We believe that technology should always serve human needs. By combining cutting-edge automation with empathetic design, we create digital experiences that don't just function—they inspire and endure."
          </blockquote>
          <div>
            <div className="font-bold text-slate-900 text-lg">Gull Nawaz</div>
            <div className="text-slate-500 font-medium">Chief Executive Officer — GullG Technologies</div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">Let's Build Something Meaningful</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button onClick={() => onNavigate('portfolio')} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors">
              View Our Portfolio
            </button>
            <button onClick={() => onNavigate('services')} className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 border border-slate-700 transition-colors">
              Explore Our Services
            </button>
            <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 border border-slate-700 transition-colors">
              Contact GullG Technologies
            </button>
          </div>
          
          <div className="border-t border-slate-800 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div>
              <div className="font-bold text-lg mb-2">GullG Technologies</div>
              <div className="text-slate-400 text-sm">Technology • Digital Experience • UI/UX • Creative Solutions</div>
            </div>
            <div>
              <div className="font-bold mb-2">Leadership</div>
              <div className="text-slate-400 text-sm">Gull Nawaz, CEO</div>
            </div>
            <div>
              <div className="font-bold mb-2">Contact</div>
              <div className="text-slate-400 text-sm flex flex-col gap-2">
                <a href="mailto:info@gullgtech.online" className="hover:text-white transition-colors">info@gullgtech.online</a>
                <span className="text-slate-400">+92 336 5656 071</span>
                <a 
                  href="https://wa.me/923365656071" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors w-fit"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExpertiseCard({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-5 hover:bg-white hover:shadow-md transition-all group">
      <div className="shrink-0 text-slate-300 group-hover:text-slate-900 transition-colors font-mono font-bold text-lg">
        {num}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-slate-600">{icon}</div>
          <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
