const fs = require('fs');
let content = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

// add import
content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { ClientCalculator } from '../components/ClientCalculator';\nimport { Calculator } from 'lucide-react';");

// add tab button
const billingTabStr = "className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'billing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 :text-slate-300'}`}\n              >\n                Billing\n              </button>";

const estimatorTabBtn = `
              <button
                onClick={() => setActiveTab('estimator')}
                className={\`px-4 py-2 rounded-lg text-sm font-bold transition-colors \${activeTab === 'estimator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 :text-slate-300'}\`}
              >
                Project Estimator
              </button>
`;
content = content.replace(billingTabStr, billingTabStr + estimatorTabBtn);

// add tab content
const billingContentEnd = "        {/* END BILLING TAB */}\n      </div>\n    </div>";
// Wait, I need to find where the billing tab ends precisely to insert the estimator tab.
