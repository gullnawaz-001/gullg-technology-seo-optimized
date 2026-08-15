const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

code = code.replace(
  "this.files = newFiles;",
  "this.files = newFiles as ProjectFile[];"
);

code = code.replace(
  "this.notifications = newNotifications;",
  "this.notifications = newNotifications as any[];"
);

fs.writeFileSync('src/store.ts', code);
