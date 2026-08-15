const fs = require('fs');
let content = fs.readFileSync('src/modules/FeaturedWorksShowcase.tsx', 'utf8');

// Replace remaining colors
content = content.replace(/bg-\[\#1C3F36\]/g, 'bg-slate-50');
content = content.replace(/bg-\[\#142E28\]/g, 'bg-slate-100');
content = content.replace(/border-\[\#E87722\]\/30/g, 'border-slate-300');
content = content.replace(/shadow-\[\#E87722\]\/30/g, 'shadow-slate-300');
content = content.replace(/ring-\[\#F59E0B\]/g, 'ring-slate-400');
content = content.replace(/bg-\[\#234F44\]/g, 'bg-slate-200');
content = content.replace(/border-\[\#234F44\]/g, 'border-slate-300');
content = content.replace(/text-gray-300/g, 'text-slate-600');

fs.writeFileSync('src/modules/FeaturedWorksShowcase.tsx', content);
