const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace('bg-slate-950 text-slate-400 py-12 border-t border-slate-900', 'bg-slate-50 text-slate-600 py-12 border-t border-slate-200');
content = content.replace('bg-slate-700 flex items-center justify-center text-white', 'bg-slate-900 flex items-center justify-center text-white');
content = content.replace('<span className="font-bold text-white">GullG Technology</span>', '<span className="font-bold text-slate-900">GullG Technology</span>');
content = content.replace('hover:text-white transition-colors', 'hover:text-slate-900 transition-colors');
content = content.replace('hover:text-white transition-colors', 'hover:text-slate-900 transition-colors');
fs.writeFileSync('src/App.tsx', content);
