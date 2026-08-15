const fs = require('fs');
let content = fs.readFileSync('src/modules/AdminDashboard.tsx', 'utf8');

// Change pricing item background to white
content = content.replace(/className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"/g, 'className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm"');

fs.writeFileSync('src/modules/AdminDashboard.tsx', content);
