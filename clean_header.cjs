const fs = require('fs');
let content = fs.readFileSync('src/components/EstimatorAdmin.tsx', 'utf8');

// The activeAdminTab was already removed, so this onClick will throw error
content = content.replace(/onClick=\{\(\) => setActiveAdminTab\('inbox'\)\}/g, '');
content = content.replace(/activeAdminTab === 'inbox' \? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-900'/g, "'bg-slate-800 text-white'");
content = content.replace(/\{activeAdminTab === 'inbox' && \(/g, '');
// Wait, I already did that, but let's check if it exists
fs.writeFileSync('src/components/EstimatorAdmin.tsx', content);
