const fs = require('fs');
let types = fs.readFileSync('src/types.ts', 'utf8');
if (!types.includes('ProjectFile')) {
  types = types.replace('export interface ActivityEntry', `export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  date: string;
  direction: 'Sent to Client' | 'Received from Client';
  projectId?: string;
  clientName?: string;
  acknowledged?: boolean;
  adminComment?: string;
}

export interface ActivityEntry`);
  fs.writeFileSync('src/types.ts', types);
  console.log('Added ProjectFile to types.ts');
}
