const fs = require('fs');

let content = fs.readFileSync('src/components/EstimatorAdmin.tsx', 'utf8');

const lines = content.split('\n');

let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("onClick={() => setActiveAdminTab('pricing')}")) {
    // Skip this button which is 6 lines long
    // The <button starts 1 line before.
    newLines.pop(); // remove <button
    i += 5; // skip the next 5 lines
    continue;
  }
  
  if (line.includes("{activeAdminTab === 'pricing' && (")) {
    skip = true;
    continue;
  }
  
  if (skip && line.trim() === ")} && false /* Just to find end, we'll look for )} */") {
     // Wait, the end is line 255 which is just `        )}`
  }
  
  if (skip && line.trim() === ")}") {
    skip = false;
    continue;
  }
  
  if (!skip) {
    newLines.push(line);
  }
}

// Remove the `activeAdminTab` state since there's only one tab now
let finalContent = newLines.join('\n');
finalContent = finalContent.replace(/const \[activeAdminTab, setActiveAdminTab\] = useState\('inbox'\);\n/g, '');
finalContent = finalContent.replace(/\{activeAdminTab === 'inbox' && \(\n/g, '');
// Remove the closing )} for inbox
finalContent = finalContent.replace(/\s*\}\)\}\s*<\/section>/g, '\n      </section>');

fs.writeFileSync('src/components/EstimatorAdmin.tsx', finalContent);
