const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    ['bg-slate-900', 'bg-white'],
    ['bg-[#0f172a]', 'bg-slate-50'], // if any
    ['bg-slate-950', 'bg-slate-50'],
    ['border-slate-800', 'border-slate-200'],
    ['text-slate-200', 'text-slate-700'],
    ['text-white', 'text-slate-900'],
    ['text-slate-400', 'text-slate-500'],
    ['text-slate-300', 'text-slate-600'],
  ];

  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }

  fs.writeFileSync(filePath, content);
}

updateFile('src/modules/SaaSAnalyticsDashboard.tsx');
updateFile('src/modules/LiveDemoPreview.tsx');
