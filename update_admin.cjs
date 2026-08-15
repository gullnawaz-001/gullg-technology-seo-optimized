const fs = require('fs');

let content = fs.readFileSync('src/components/EstimatorAdmin.tsx', 'utf8');

const replacements = [
  ['bg-[#1C3F36]', 'bg-slate-50'],
  ['bg-[#142E28]', 'bg-white'],
  ['bg-[#0F231E]', 'bg-slate-100'],
  ['bg-[#0F231E]/60', 'bg-slate-100/60'],
  ['border-[#234F44]', 'border-slate-200'],
  ['text-white', 'text-slate-900'],
  ['text-gray-300', 'text-slate-600'],
  ['text-gray-400', 'text-slate-500'],
  ['text-gray-200', 'text-slate-700'],
  ['hover:border-gray-500', 'hover:border-slate-300'],
  ['hover:text-white', 'hover:text-slate-900'],
  // special overrides for selected states
  ['bg-[#E87722]/20', 'bg-orange-50'],
  ['border-[#E87722]', 'border-orange-500'],
  ['text-[#E87722]', 'text-orange-600'],
  ['shadow-[#E87722]/10', 'shadow-orange-500/10'],
  ['shadow-[#E87722]/20', 'shadow-orange-500/20'],
  ['bg-[#E87722]', 'bg-orange-500'],
  ['hover:bg-[#d66b1c]', 'hover:bg-orange-600'],
  ['border-[#F59E0B]', 'border-amber-500'],
  ['text-[#F59E0B]', 'text-amber-600'],
  ['bg-[#F59E0B]', 'bg-amber-500'],
];

for (const [search, replace] of replacements) {
  content = content.split(search).join(replace);
}

// Fix buttons text 
content = content.replace(/activeAdminTab === 'inbox' \? 'bg-orange-500 text-slate-900'/g, "activeAdminTab === 'inbox' ? 'bg-orange-500 text-white'");
content = content.replace(/activeAdminTab === 'pricing' \? 'bg-orange-500 text-slate-900'/g, "activeAdminTab === 'pricing' ? 'bg-orange-500 text-white'");
content = content.replace(/bg-orange-500 hover:bg-orange-600 text-slate-900/g, 'bg-orange-500 hover:bg-orange-600 text-white');
content = content.replace(/bg-rose-900\/80 hover:bg-rose-800 text-slate-900/g, 'bg-rose-500 hover:bg-rose-600 text-white');
content = content.replace(/bg-\[\#234F44\] hover:bg-orange-500 text-slate-900/g, 'bg-slate-800 hover:bg-slate-900 text-white');
// Unread badge
content = content.replace(/bg-amber-500 text-black/g, 'bg-amber-500 text-white');

fs.writeFileSync('src/components/EstimatorAdmin.tsx', content);
