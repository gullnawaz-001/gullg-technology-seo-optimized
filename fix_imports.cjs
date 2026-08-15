const fs = require('fs');

let cp = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');
cp = cp.replace("import { Activity } from './ClientPortal/Activity';", "import { Activity as ActivityTab } from './ClientPortal/Activity';");
cp = cp.replace("<Activity />", "<ActivityTab />");
fs.writeFileSync('src/modules/ClientPortal.tsx', cp);

let cv = fs.readFileSync('src/modules/ClientPortal/ContractView.tsx', 'utf8');
cv = "import React from 'react';\n" + cv;
fs.writeFileSync('src/modules/ClientPortal/ContractView.tsx', cv);

let sp = fs.readFileSync('src/modules/ClientPortal/Support.tsx', 'utf8');
sp = "import React from 'react';\n" + sp;
fs.writeFileSync('src/modules/ClientPortal/Support.tsx', sp);

