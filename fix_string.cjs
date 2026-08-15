const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Let's replace cases where a space then ` :` without quote is found inside a template literal expression
  content = content.replace(/text-emerald-700\s+:/g, "text-emerald-700' :");
  content = content.replace(/text-amber-700\s+:/g, "text-amber-700' :");
  
  // also fix client portal
  content = content.replace(/bg-emerald-900\/30\s+:/g, "bg-emerald-900/30' :");
  content = content.replace(/bg-amber-900\/30\s+:/g, "bg-amber-900/30' :");
  content = content.replace(/text-emerald-700  :/g, "text-emerald-700' :");
  content = content.replace(/text-amber-700  :/g, "text-amber-700' :");

  // 'bg-slate-200 text-slate-700   
  content = content.replace(/text-slate-700\s+`/g, "text-slate-700'`");
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed quotes in', filePath);
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir('./src');
