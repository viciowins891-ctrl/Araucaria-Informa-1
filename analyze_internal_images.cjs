
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const publicDir = path.join(__dirname, 'public/images');
const content = fs.readFileSync(dataPath, 'utf8');
const publicFiles = fs.readdirSync(publicDir);

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;
let match;

const results = [];

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const id = match[2];

    const titleMatch = fullBlock.match(/title:\s*(['"`])(.*?)\1/);
    const title = titleMatch ? titleMatch[2] : 'Unknown';

    const internalMatch = fullBlock.match(/internalImageUrl:\s*(['"`])(.*?)\1/);
    const internal = internalMatch ? internalMatch[2] : 'MISSING';

    const coverMatch = fullBlock.match(/imageUrl:\s*(['"`])(.*?)\1/);
    const cover = coverMatch ? coverMatch[2] : 'MISSING';

    const cleanCover = cover !== 'MISSING' ? path.basename(cover, path.extname(cover)).replace('_mobile', '') : '';

    // Find detailed alternatives
    const alternatives = publicFiles.filter(f => {
        // Simple fuzzy match: contains parts of the cover filename
        if (!cleanCover) return false;
        const parts = cleanCover.split(/[_-]/).filter(p => p.length > 3);
        let matches = 0;
        for (const p of parts) {
            if (f.includes(p)) matches++;
        }
        return matches >= Math.min(2, parts.length) && f !== path.basename(internal);
    });

    results.push({
        id,
        title: title.substring(0, 30),
        currentInternal: internal,
        alternatives: alternatives.slice(0, 10) // Limit to top 10 to avoid huge output
    });
}

console.log(JSON.stringify(results, null, 2));
