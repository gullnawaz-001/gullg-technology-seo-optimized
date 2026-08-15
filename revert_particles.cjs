const fs = require('fs');

let code = fs.readFileSync('src/modules/LandingPage.tsx', 'utf8');

code = code.replace(
  "import { ParticlesBackground } from '../components/ParticlesBackground';\n",
  ""
);

code = code.replace(
  "import { ParticlesBackground } from '../components/ParticlesBackground';",
  ""
);

code = code.replace(
  "          <ParticlesBackground />\n",
  ""
);

code = code.replace(
  "          <ParticlesBackground />",
  ""
);

fs.writeFileSync('src/modules/LandingPage.tsx', code);
