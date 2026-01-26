
const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, 'src/App.tsx');
let content = fs.readFileSync(appPath, 'utf8');
content += `\n// refresh ${Date.now()}`;
fs.writeFileSync(appPath, content);
console.log("App.tsx tocado para recarregar.");
