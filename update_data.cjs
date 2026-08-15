const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

code = code.replace(
  "id: 'cp1', \n    name: 'Nexus Mobile App V2', \n    status: 'in-progress',",
  "id: 'cp1', \n    name: 'Nexus Mobile App V2', \n    clientName: 'Alice Freeman',\n    status: 'in-progress',"
);

code = code.replace(
  "{ id: 'cp2', name: 'Logistix AI Integration', status: 'qa', progress: 90, dueDate: 'Oct 20, 2026' }",
  "{ id: 'cp2', name: 'Logistix AI Integration', clientName: 'Bob Smith', status: 'qa', progress: 90, dueDate: 'Oct 20, 2026' }"
);

code = code.replace(
  "{ id: 'cp3', name: 'AlphaCorp Rebranding', status: 'completed', progress: 100, dueDate: 'Sep 01, 2026' }",
  "{ id: 'cp3', name: 'AlphaCorp Rebranding', clientName: 'Bob Smith', status: 'completed', progress: 100, dueDate: 'Sep 01, 2026' }"
);

fs.writeFileSync('src/data.ts', code);
