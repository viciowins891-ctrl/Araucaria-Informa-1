
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const publicDir = path.join(__dirname, 'public/images');
let content = fs.readFileSync(dataPath, 'utf8');
const publicFiles = fs.readdirSync(publicDir);

function findBestImage(currentCover, currentInternal) {
    if (!currentCover) return currentInternal;

    const baseName = path.basename(currentCover, path.extname(currentCover))
        .replace('_mobile', '')
        .replace('_cover', '')
        .replace('-capa', '');

    // Split into searchable parts (ignore small words)
    const parts = baseName.split(/[_-]/).filter(p => p.length > 3 && !['final', 'real', 'v2', 'v3', 'v4', 'v5'].includes(p));

    if (parts.length === 0) return currentInternal;

    // Filter potential candidates
    const candidates = publicFiles.filter(f => {
        let matches = 0;
        for (const p of parts) {
            if (f.includes(p)) matches++;
        }
        return matches >= Math.min(2, parts.length);
    });

    // Score candidates
    // Priority: 'real' > 'final' > 'internal' > others
    const score = (file) => {
        let s = 0;
        if (file.includes('real')) s += 10;
        if (file.includes('final')) s += 5;
        if (file.includes('internal') || file.includes('interna') || file.includes('inner')) s -= 2; // Penalize internal if user said they are bad prints
        if (file.includes('screen') || file.includes('capture') || file.includes('print')) s -= 20;
        if (file.endsWith('.webp')) s -= 1; // Prefer png/jpg for desktop internal if available
        return s;
    };

    candidates.sort((a, b) => score(b) - score(a));

    if (candidates.length > 0) {
        // Only switch if the best candidate is significantly better or different
        const best = candidates[0];
        // console.log(`For ${baseName}: Best found ${best} (current: ${currentInternal})`);
        return '/images/' + best;
    }

    return currentInternal;
}

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match) => {
    const imgMatch = match.match(/imageUrl:\s*'([^']+)'/);
    if (!imgMatch) return match;
    const coverUrl = imgMatch[1];

    const internalMatch = match.match(/internalImageUrl:\s*'([^']+)'/);
    const internalUrl = internalMatch ? internalMatch[1] : null;

    const newInternal = findBestImage(coverUrl, internalUrl);

    if (newInternal && newInternal !== internalUrl) {
        if (internalUrl) {
            return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '${newInternal}'`);
        } else {
            return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '${newInternal}',`);
        }
    }
    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Optimized internal images prioritizing "real" quality.');
