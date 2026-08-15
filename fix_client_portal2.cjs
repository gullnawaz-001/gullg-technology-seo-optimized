const fs = require('fs');
let content = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

const estTabContent = `
        {activeTab === 'estimator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <ClientCalculator />
          </motion.div>
        )}
`;

content = content.replace("      </div>\n    </div>\n  );\n}", estTabContent + "\n      </div>\n    </div>\n  );\n}");

fs.writeFileSync('src/modules/ClientPortal.tsx', content);
