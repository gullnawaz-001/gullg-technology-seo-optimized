const fs = require('fs');

function updateTheme(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    // Change oranges to slate/blue for a more professional corporate look matching the image
    ['bg-orange-500', 'bg-slate-800'],
    ['hover:bg-orange-600', 'hover:bg-slate-900'],
    ['text-orange-600', 'text-slate-800'],
    ['text-orange-500', 'text-slate-800'],
    ['border-orange-500', 'border-slate-800'],
    ['bg-orange-50', 'bg-slate-100'],
    ['shadow-orange-500', 'shadow-slate-800'],
    
    ['bg-amber-500', 'bg-slate-700'],
    ['text-amber-600', 'text-slate-700'],
    ['border-amber-500', 'border-slate-300'],
    
    // Some residual dark colors if any
    ['bg-slate-900 text-white', 'bg-white text-slate-900'], // Be careful with this, buttons need white text.
  ];

  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }

  // Fix up buttons that should have white text on dark background
  content = content.replace(/className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-slate-900/g, 'className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white');
  content = content.replace(/bg-slate-800 hover:bg-slate-900 text-slate-900/g, 'bg-slate-800 hover:bg-slate-900 text-white');
  content = content.replace(/isSelected \? 'bg-slate-800 text-slate-900'/g, "isSelected ? 'bg-slate-800 text-white'");
  content = content.replace(/activeAdminTab === 'inbox' \? 'bg-slate-800 text-slate-900'/g, "activeAdminTab === 'inbox' ? 'bg-slate-800 text-white'");
  content = content.replace(/activeAdminTab === 'pricing' \? 'bg-slate-800 text-slate-900'/g, "activeAdminTab === 'pricing' ? 'bg-slate-800 text-white'");
  
  // Scoped multiplier buttons
  content = content.replace(/projectScope === level\n\s*\? 'bg-slate-800 border-slate-300 text-slate-900'/g, "projectScope === level\n                          ? 'bg-slate-800 border-slate-800 text-white'");

  // Fix badges
  content = content.replace(/bg-slate-700 text-white px-1.5/g, 'bg-slate-800 text-white px-1.5');
  
  // Make sure EstimatorAdmin has the right bg
  if (filePath.includes('EstimatorAdmin')) {
    content = content.replace('bg-[#1C3F36] rounded-3xl p-6 shadow-sm overflow-hidden text-white font-sans border border-[#234F44]', 'bg-white rounded-3xl p-6 shadow-sm overflow-hidden text-slate-900 font-sans border border-slate-200');
  }

  fs.writeFileSync(filePath, content);
}

updateTheme('src/modules/Calculator.tsx');
updateTheme('src/components/EstimatorAdmin.tsx');

console.log("Updated colors in Calculator and EstimatorAdmin");
