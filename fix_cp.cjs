const fs = require('fs');
let data = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

// The closing for the fragment needs to happen before `</motion.div>` for the dashboard tab.
// Currently it is:
//          </div>
//        </div>
//        </motion.div>
//        )}
//        {activeTab === 'billing' && (

data = data.replace(
  "        </div>\n        </motion.div>\n        )}\n\n        {activeTab === 'billing' && (",
  "        </div>\n        </>\n            )}\n        </motion.div>\n        )}\n\n        {activeTab === 'billing' && ("
);

fs.writeFileSync('src/modules/ClientPortal.tsx', data);
