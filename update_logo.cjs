const fs = require('fs');
let code = fs.readFileSync('src/modules/CheelaCafeShowcase.tsx', 'utf8');

code = code.replace(
  /<div className="w-8 h-8 rounded-lg bg-\[#EA580C\] flex items-center justify-center text-white">\s*<Coffee size=\{20\} \/>\s*<\/div>/g,
  `<div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <Coffee size={20} className="hidden" />
            </div>`
);

code = code.replace(
  /<div className="w-8 h-8 rounded bg-\[#EA580C\] flex items-center justify-center">\s*<Coffee size=\{18\} \/>\s*<\/div>/g,
  `<div className="w-8 h-8 rounded bg-[#EA580C] flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <Coffee size={18} className="text-white hidden" />
            </div>`
);

fs.writeFileSync('src/modules/CheelaCafeShowcase.tsx', code);
