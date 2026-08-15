const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export interface Testimonial {\n  id: string;\n  name: string;\n  clientName: string;",
  "export interface Testimonial {\n  id: string;\n  name: string;"
);

code = code.replace(
  "export interface Milestone {\n  id: string;\n  name: string;\n  clientName: string;",
  "export interface Milestone {\n  id: string;\n  name: string;"
);

code = code.replace(
  "export interface ProjectFile {\n  id: string;\n  name: string;\n  clientName: string;",
  "export interface ProjectFile {\n  id: string;\n  name: string;"
);

fs.writeFileSync('src/types.ts', code);
