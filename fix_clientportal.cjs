const fs = require('fs');
let data = fs.readFileSync('src/modules/ClientPortal.tsx', 'utf8');

data = data.replace(
  ") : (\\n              {/* STATS WIDGETS */}  ",
  ") : (<>\\n              {/* STATS WIDGETS */}  "
);

data = data.replace(
  / \(\n\s*\{\/\* STATS WIDGETS \*\/\}/,
  " (<>\n              {/* STATS WIDGETS */}"
);

// We need to also close the fragment at the end.
// The end was `</>)}` from the previous patch, but I need to make sure. Let's do a direct replacement.
const badPattern = `) : (
              {/* STATS WIDGETS */}`;
const fixPattern = `) : (<>
              {/* STATS WIDGETS */}`;
data = data.replace(badPattern, fixPattern);

fs.writeFileSync('src/modules/ClientPortal.tsx', data);
