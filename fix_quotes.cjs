const fs = require('fs');
const path = require('path');

function fixQuotes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix broken quotes from our sed command 
  // Wait, let's just do a manual replace for the broken classes we found.
  
  content = content.replace(/bg-slate-50 >/g, 'bg-slate-50">');
  content = content.replace(/border-slate-200 >/g, 'border-slate-200">');
  content = content.replace(/text-slate-900 \/>/g, 'text-slate-900" />');
  content = content.replace(/text-slate-900 \n/g, 'text-slate-900" \n');
  content = content.replace(/ring-white >/g, 'ring-white">');
  
  // Specific to ChatbotWidget:
  content = content.replace(/bg-slate-200 :bg-slate-700/g, 'bg-slate-200');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
}

fixQuotes('src/components/ChatbotWidget.tsx');
