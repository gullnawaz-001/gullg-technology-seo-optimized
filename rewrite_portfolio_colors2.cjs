const fs = require('fs');
let content = fs.readFileSync('src/modules/FeaturedWorksShowcase.tsx', 'utf8');

// Container
content = content.replace(/min-h-screen bg-\[\#0F231E\] text-white font-sans selection:bg-\[\#E87722\]\/30/g, 'min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-700/30');
content = content.replace(/text-\[\#E87722\]/g, 'text-slate-500');

// Header
content = content.replace(/text-white mb-6/g, 'text-slate-900 mb-6');
content = content.replace(/text-gray-400 max-w-2xl mx-auto text-lg/g, 'text-slate-600 max-w-2xl mx-auto text-lg');

// Categories
content = content.replace(/bg-\[\#142E28\] text-gray-300 border-\[\#234F44\] hover:bg-\[\#E87722\]\/10 hover:border-\[\#E87722\] hover:text-\[\#E87722\]/g, 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900');
content = content.replace(/bg-\[\#E87722\] text-white border-\[\#E87722\] shadow-\[\#E87722\]\/20/g, 'bg-slate-800 text-white border-slate-800 shadow-sm');

// Card
content = content.replace(/bg-\[\#142E28\] border border-\[\#234F44\] hover:border-\[\#E87722\] rounded-2xl overflow-hidden shadow-lg hover:shadow-\[\#E87722\]\/20/g, 'bg-white border border-slate-200 hover:border-slate-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl');
content = content.replace(/bg-gradient-to-br from-\[\#0F231E\] via-\[\#142E28\] to-\[\#0F231E\] p-5 flex flex-col justify-between relative overflow-hidden border-b border-\[\#234F44\]/g, 'bg-slate-50 p-6 flex flex-col justify-between relative overflow-hidden border-b border-slate-100');
content = content.replace(/bg-\[\#E87722\] text-white shadow/g, 'bg-slate-800 text-white shadow-sm');
content = content.replace(/text-\[\#F59E0B\]/g, 'text-slate-500');
content = content.replace(/text-gray-300 font-medium/g, 'text-slate-500 font-medium');
content = content.replace(/text-xl font-bold text-white line-clamp-2/g, 'text-xl font-bold text-slate-900 line-clamp-2');
content = content.replace(/text-gray-400 text-sm line-clamp-2/g, 'text-slate-600 text-sm line-clamp-2');
content = content.replace(/bg-\[\#0F231E\] text-gray-300 border-\[\#234F44\]/g, 'bg-slate-100 text-slate-600 border-slate-200');
content = content.replace(/text-\[\#E87722\] font-bold text-sm flex/g, 'text-slate-700 font-bold text-sm flex');
content = content.replace(/border-t border-\[\#234F44\]/g, 'border-t border-slate-100');
content = content.replace(/text-white font-medium/g, 'text-slate-900 font-medium');
content = content.replace(/group-hover:translate-x-1 transition-transform/g, 'group-hover:translate-x-1 transition-transform');
content = content.replace(/text-gray-400 text-xs/g, 'text-slate-500 text-xs');
// Modals
content = content.replace(/bg-\[\#142E28\] border border-\[\#234F44\] overflow-hidden shadow-2xl/g, 'bg-white border border-slate-200 overflow-hidden shadow-2xl');
content = content.replace(/from-\[\#0F231E\] via-\[\#142E28\] to-\[\#0F231E\] border-b border-\[\#234F44\]/g, 'from-slate-50 via-white to-slate-50 border-b border-slate-200');
content = content.replace(/text-gray-300 text-lg/g, 'text-slate-600 text-lg');
content = content.replace(/bg-\[\#0F231E\] border border-\[\#234F44\]/g, 'bg-slate-50 border border-slate-200');
content = content.replace(/text-\[\#E87722\] mb-1/g, 'text-slate-600 mb-1');
content = content.replace(/bg-\[\#0F231E\] rounded-xl p-4 border border-\[\#234F44\]/g, 'bg-slate-50 rounded-xl p-4 border border-slate-200');
content = content.replace(/bg-\[\#E87722\] hover:bg-\[\#d46a1e\] text-white/g, 'bg-slate-800 hover:bg-slate-900 text-white');
content = content.replace(/text-white/g, 'text-slate-900'); // Note: some buttons might want white text, but I will fix them after

fs.writeFileSync('src/modules/FeaturedWorksShowcase.tsx', content);
