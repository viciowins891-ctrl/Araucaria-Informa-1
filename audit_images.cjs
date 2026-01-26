
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;
let match;
const usedImages = new Set();
const report = [];

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const id = match[2];
    const titleMatch = fullBlock.match(/title:\s*(['"`])(.*?)\1/);
    const title = titleMatch ? titleMatch[2].substring(0, 20) : 'Unknown';

    const internalMatch = fullBlock.match(/internalImageUrl:\s*(['"`])(.*?)\1/);
    const internal = internalMatch ? internalMatch[2] : 'MISSING';

    if (internal !== 'MISSING') usedImages.add(path.basename(internal));

    report.push({ id, title, internal });
}

console.log('--- Current Internal Images ---');
report.forEach(r => console.log(`${r.id} [${r.title}]: ${r.internal}`));

// List suspicious unused files to potentially delete
const publicDir = path.join(__dirname, 'public/images');
const allFiles = fs.readdirSync(publicDir);

const suspiciousPatterns = ['real_final', 'capa_real', '_ai.', 'print', 'capture'];
const toDelete = allFiles.filter(f => {
    // If it's used, keep it (unless I force change it later)
    if (usedImages.has(f)) return false;

    // If it matches suspicious pattern
    return suspiciousPatterns.some(p => f.includes(p));
});

console.log('\n--- Suspicious Unused Files (Candidate for Deletion) ---');
toDelete.forEach(f => console.log(f));
