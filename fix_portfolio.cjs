const fs = require('fs');
let content = fs.readFileSync('src/modules/FeaturedWorksShowcase.tsx', 'utf8');

// Replace dark green body background
content = content.replace(/className="min-h-screen bg-\[\#0F231E\]/g, 'className="min-h-screen bg-slate-50');
content = content.replace(/bg-\[\#142E28\]/g, 'bg-white');
content = content.replace(/border-\[\#234F44\]/g, 'border-slate-200');
content = content.replace(/text-gray-400/g, 'text-slate-500');
content = content.replace(/text-gray-300/g, 'text-slate-600');
content = content.replace(/text-white/g, 'text-slate-900');
// Some buttons had text-white that should remain text-white probably? 
// Or maybe I should just surgically target the card map function.

// Let's do it manually.
