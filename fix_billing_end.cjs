const fs = require('fs');
let data = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

data = data.replace(
  "          </div>\n          </>\n            )}\n          </motion.div>\n        )}\n        {activeTab === 'support' && (",
  "          </div>\n          </motion.div>\n        )}\n        {activeTab === 'support' && ("
);

fs.writeFileSync('src/modules/ClientPortal.tsx', data);
