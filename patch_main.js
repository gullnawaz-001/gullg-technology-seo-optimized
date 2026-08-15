const fs = require('fs');
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');

if (!mainTsx.includes('HelmetProvider')) {
  mainTsx = mainTsx.replace(
    "import App from './App.tsx';",
    "import App from './App.tsx';\nimport { HelmetProvider } from 'react-helmet-async';"
  );
  mainTsx = mainTsx.replace(
    "<App />",
    "<HelmetProvider>\n      <App />\n    </HelmetProvider>"
  );
  fs.writeFileSync('src/main.tsx', mainTsx);
}
