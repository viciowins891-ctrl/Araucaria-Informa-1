
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;
let match;
const usedImages = new Set();

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const internalMatch = fullBlock.match(/internalImageUrl:\s*(['"`])(.*?)\1/);
    const internal = internalMatch ? internalMatch[2] : 'MISSING';
    const coverMatch = fullBlock.match(/imageUrl:\s*(['"`])(.*?)\1/);
    const cover = coverMatch ? coverMatch[2] : 'MISSING';

    if (internal !== 'MISSING') usedImages.add(path.basename(internal));
    if (cover !== 'MISSING') usedImages.add(path.basename(cover));
}

const publicDir = path.join(__dirname, 'public/images');
const allFiles = fs.readdirSync(publicDir);

const suspiciousPatterns = ['real_final', 'capa_real', '_ai.', 'print', 'capture'];
const toDelete = allFiles.filter(f => {
    // PROTECT used files
    if (usedImages.has(f)) return false;

    // Delete files matching suspicious patterns
    return suspiciousPatterns.some(p => f.includes(p));
});

console.log(`Deleting ${toDelete.length} unused suspicious files...`);

toDelete.forEach(f => {
    const filePath = path.join(publicDir, f);
    try {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${f}`);
    } catch (e) {
        console.error(`Failed to delete ${f}: ${e.message}`);
    }
});
