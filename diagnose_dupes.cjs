
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.join(__dirname, 'public/images');
const dataPath = path.join(__dirname, 'data.ts');

// 1. Index hashes
const fileHashes = {};
const files = fs.readdirSync(publicDir);
files.forEach(f => {
    try {
        const content = fs.readFileSync(path.join(publicDir, f));
        fileHashes[f] = crypto.createHash('md5').update(content).digest('hex');
    } catch (e) { }
});

// 2. Scan Data
const content = fs.readFileSync(dataPath, 'utf8');
const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let match;
const report = [];

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const id = match[2];
    const title = (fullBlock.match(/title:\s*(['"`])(.*?)\1/) || [])[2]?.substring(0, 25);

    const cover = (fullBlock.match(/imageUrl:\s*['"]\/images\/([^'"]+)['"]/) || [])[1];
    const internal = (fullBlock.match(/internalImageUrl:\s*['"]\/images\/([^'"]+)['"]/) || [])[1];

    if (cover && internal && fileHashes[cover] && fileHashes[internal]) {
        const isVisualDupe = fileHashes[cover] === fileHashes[internal];
        if (isVisualDupe) {
            // Find alternatives
            const keywords = cover.split(/[_\-\.]/).filter(w => w.length > 3 && !['capa', 'cover', 'final'].includes(w));
            const alts = files.filter(f => {
                if (fileHashes[f] === fileHashes[cover]) return false; // Must be different content
                let score = 0;
                keywords.forEach(k => { if (f.includes(k)) score++; });
                return score > 0;
            });

            report.push({
                id, title, cover, internal,
                status: 'DUPLICATE',
                suggestions: alts.slice(0, 3)
            });
        }
    }
}

console.log(JSON.stringify(report, null, 2));
