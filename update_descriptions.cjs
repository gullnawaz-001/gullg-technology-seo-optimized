const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const updatedOptions = `export const defaultServicesOptions = [
  { id: 'dashboard-design', title: 'Data-Driven Dashboard Design', basePrice: 800, category: 'Design', description: 'Custom analytics dashboards that turn complex data streams into actionable insights.' },
  { id: 'web-mobile-dev', title: 'Modern Web & Mobile App Development', basePrice: 1500, category: 'Development', description: 'High-performance, scalable applications built with cutting-edge modern frameworks.' },
  { id: 'brand-identity', title: 'Graphic & Brand Identity Design', basePrice: 400, category: 'Design', description: 'Distinctive visual identities, logos, and comprehensive brand guidelines.' },
  { id: 'uiux-prototyping', title: 'UI/UX Prototyping & User Research', basePrice: 600, category: 'Design', description: 'High-fidelity Figma prototypes and deep user behavior analysis.' },
  { id: 'workflow-automation', title: 'Intelligent Process & Workflow Automation', basePrice: 500, category: 'Automation', description: 'Streamline repetitive tasks by connecting your favorite enterprise tools.' },
  { id: 'ai-chatbot', title: 'Live AI Chatbot Integration', basePrice: 700, category: 'Automation & AI', description: 'Custom LLM-powered chatbots providing 24/7 intelligent customer support.' },
  { id: 'social-media', title: 'Social Media Management & Strategy', basePrice: 350, category: 'Marketing', description: 'Data-driven content strategies to grow brand awareness and audience engagement.' },
  { id: 'video-production', title: 'Video Creation & Motion Production', basePrice: 450, category: 'Marketing', description: 'High-converting short-form reels, promotional videos, and motion graphics.' },
  { id: 'ad-campaigns', title: 'Ad Campaign Design & Management', basePrice: 550, category: 'Marketing', description: 'Strategic visual creative generation and targeted paid campaign setups.' }
];`;

content = content.replace(/export const defaultServicesOptions = \[[\s\S]*?\];/, updatedOptions);
fs.writeFileSync('src/data.ts', content);

