const fs = require('fs');
let content = fs.readFileSync('src/modules/Calculator.tsx', 'utf8');

// I will just replace the entire content of Calculator.tsx 
// to render a clean pricing list.
const newContent = `import React, { useState, useEffect } from 'react';
import { defaultServicesOptions } from '../data';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Calculator() {
  const [services, setServices] = useState(defaultServicesOptions);

  useEffect(() => {
    const savedPricing = localStorage.getItem('gullg_services_pricing_v2');
    if (savedPricing) {
      try {
        setServices(JSON.parse(savedPricing));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Organize services by category
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans py-24 px-4 md:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-800/30 shadow-sm">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-4">Our Prices</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Clear, upfront base pricing for our core expertise services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex flex-col h-full"
            >
              <div className="mb-6 flex-grow">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
                  <Sparkles size={24} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{service.category}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{service.description}</p>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Starting from</div>
                  <div className="text-3xl font-black text-slate-900">$\\{service.basePrice}</div>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  Base Rate
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/modules/Calculator.tsx', newContent.replace(/\\\\/g, ''));
