const fs = require('fs');
let content = fs.readFileSync('src/components/EstimatorAdmin.tsx', 'utf8');

content = content.replace(/ \}\)\}\n\s*\{\/\* TAB 2: RESET & EDIT ALL EXPERTISE PRICES \*\/\}/g, '');

fs.writeFileSync('src/components/EstimatorAdmin.tsx', content);
