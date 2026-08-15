const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.dependencies['react-router-dom'] = "^8.3.0";
pkg.devDependencies['esbuild'] = "^0.28.1";
if (pkg.overrides && pkg.overrides.esbuild) {
  pkg.overrides.esbuild = "^0.28.1";
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
