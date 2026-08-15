const fs = require('fs');

let content = fs.readFileSync('src/modules/Calculator.tsx', 'utf8');

// Colors replacement mapping
const replacements = [
  ['bg-[#1C3F36]', 'bg-slate-50'],
  ['bg-[#142E28]', 'bg-white'],
  ['bg-[#0F231E]', 'bg-slate-100'],
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

// Ensure the button text that was 'text-white' stays white when it has an orange background
// Specifically the primary button
content = content.replace(/className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-slate-900/g, 'className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white');

// For the selected checkmark box
content = content.replace(/isSelected \? 'bg-orange-500 text-slate-900'/g, "isSelected ? 'bg-orange-500 text-white'");

// For the selected Scope button
content = content.replace(/projectScope === level\n\s*\? 'bg-orange-500 border-amber-500 text-slate-900'/g, "projectScope === level\n                          ? 'bg-orange-500 border-amber-500 text-white'");

fs.writeFileSync('src/modules/Calculator.tsx', content);
