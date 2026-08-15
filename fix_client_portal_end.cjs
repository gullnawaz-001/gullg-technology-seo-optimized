const fs = require('fs');
let data = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

// The original replacement string for the end of dashboard was:
// `</>\n            )}\n          </motion.div>\n        )}\n        {activeTab === 'estimator' && (`

// We need to look at how we replaced it before.
// We originally did:
// `              </>\n            )}\n          </motion.div>\n        )}\n        {activeTab === 'support' && (...`

// Wait, looking at the code around line 405:
// In the original file, the dashboard tab ends with the `Recent Documents` div closing, then `</motion.div> \n )} \n {activeTab === 'estimator' && (`.

// Let's just fix it by replacing the bad end.
// We should find the end of "Recent Documents" block which should be:
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     )}

// And our injected `</>\n)}` needs to be after `</div></div></div>`.

data = data.replace(
  /<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/>\n\s*\)}\n\s*<\/motion\.div>/,
  "</div>\n            </div>\n          </div>\n          </>\n            )}\n          </motion.div>"
);

fs.writeFileSync('src/modules/ClientPortal.tsx', data);
