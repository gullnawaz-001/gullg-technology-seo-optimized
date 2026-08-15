const fs = require('fs');
let content = fs.readFileSync('src/components/EstimatorAdmin.tsx', 'utf8');

// Remove DEFAULT_EXPERTISE_SERVICES
content = content.replace(/const DEFAULT_EXPERTISE_SERVICES = \[[\s\S]*?\];/g, '');

// Remove services state
content = content.replace(/const \[services, setServices\] = useState\(DEFAULT_EXPERTISE_SERVICES\);\n/g, '');

// Remove handlePriceChange
content = content.replace(/const handlePriceChange = [\s\S]*?};\n/g, '');

// Remove handleResetPrices
content = content.replace(/const handleResetPrices = [\s\S]*?};\n/g, '');

// Remove the pricing tab button
content = content.replace(/<button\s+onClick=\{\(\) => setActiveAdminTab\('pricing'\)\}[\s\S]*?⚙️ Expertise Price Manager\s+<\/button>/g, '');

// Remove the pricing tab content entirely
// This is trickier with regex, I'll use a string split instead
let pricingTabStart = "{activeAdminTab === 'pricing' && (";
if (content.includes(pricingTabStart)) {
  let startIndex = content.indexOf(pricingTabStart);
  let before = content.substring(0, startIndex);
  let after = content.substring(startIndex);
  // Find the end of the pricing tab div
  // The pricing tab starts with `{activeAdminTab === 'pricing' && (`
  // and ends with `)}` at the correct nesting level.
  // Actually, I can just use a simple string replace for the exact block if I know it, but it's long.
}
