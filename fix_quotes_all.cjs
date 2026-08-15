const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Let's replace cases where a space then `>` without quote is found
  content = content.replace(/className="([^"]+?)\s+>/g, 'className="$1">');
  content = content.replace(/className="([^"]+?) >/g, 'className="$1">');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed quotes in', filePath);
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir('./src');
