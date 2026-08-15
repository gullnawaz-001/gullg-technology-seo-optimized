const fs = require('fs');
let c = fs.readFileSync('src/modules/SaaSAnalyticsDashboard.tsx', 'utf8');

const replacements = [
  ['bg-emerald-950 text-emerald-400 border-emerald-800/50', 'bg-emerald-100 text-emerald-700 border-emerald-200'],
  ['bg-rose-950 text-rose-400 border-rose-800/50', 'bg-rose-100 text-rose-700 border-rose-200'],
  ['hover:bg-slate-800/40', 'hover:bg-slate-50'],
  ['bg-blue-950/40 border-blue-800/40 text-blue-300', 'bg-blue-50 border-blue-200 text-blue-700'],
  ['bg-emerald-950/80 border-emerald-800/40', 'bg-emerald-100 border-emerald-200'],
  ['bg-emerald-500/20 text-emerald-400 border-emerald-500/30', 'bg-emerald-100 text-emerald-700 border-emerald-200'],
  ['text-white', 'text-slate-900'],
  ['text-slate-200', 'text-slate-700'],
  ['border-slate-800', 'border-slate-200'],
];

for(const [s, r] of replacements) {
  c = c.replace(new RegExp(s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), r);
}

fs.writeFileSync('src/modules/SaaSAnalyticsDashboard.tsx', c);
