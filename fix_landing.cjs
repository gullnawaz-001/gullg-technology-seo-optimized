const fs = require('fs');

let content = fs.readFileSync('src/modules/LandingPage.tsx', 'utf8');

// Replace gradient with solid slate-500
content = content.replace(/className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400"/g, 'className="text-slate-500"');

// Replace bg-slate-700 with bg-slate-800 for buttons
content = content.replace(/bg-slate-700/g, 'bg-slate-800');
content = content.replace(/hover:bg-slate-800/g, 'hover:bg-slate-900');
content = content.replace(/shadow-slate-700\/25/g, 'shadow-slate-800/25');

// Fix broken dark mode removal artifacts (e.g. `bg-white >` or `:bg-slate-800`)
content = content.replace(/bg-white >/g, 'bg-white">');
content = content.replace(/:bg-slate-800/g, 'hover:bg-slate-200'); // Assuming it was hover:bg-slate-800

fs.writeFileSync('src/modules/LandingPage.tsx', content);

