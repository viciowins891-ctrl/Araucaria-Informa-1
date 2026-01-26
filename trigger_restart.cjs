
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'vite.config.ts');
if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c += `\n// restart ${Date.now()}`;
    fs.writeFileSync(p, c);
    console.log("Vite config tocado.");
} else {
    console.log("vite.config.ts não encontrado na raiz.");
}
