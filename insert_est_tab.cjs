const fs = require('fs');
let content = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

const estTabContent = `
        {activeTab === 'estimator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <ClientCalculator />
          </motion.div>
        )}
`;

content = content.replace("        {/* END BILLING TAB */}", "        {/* END BILLING TAB */}\n" + estTabContent);
// Hmm I don't see END BILLING TAB. Let's look for the end of the billing tab.
