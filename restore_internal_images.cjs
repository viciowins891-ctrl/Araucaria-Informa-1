
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const publicDir = path.join(__dirname, 'public/images');
const content = fs.readFileSync(dataPath, 'utf8');
const publicFiles = fs.readdirSync(publicDir);

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match) => {
    // Extract cover
    const imgMatch = match.match(/imageUrl:\s*'([^']+)'/);
    if (!imgMatch) return match;
    const coverUrl = imgMatch[1];

    // Extract current internal
    const internalMatch = match.match(/internalImageUrl:\s*'([^']+)'/);
    const internalUrl = internalMatch ? internalMatch[1] : null;

    // Logic: If current internal is same as cover OR missing, try to find a SPECIFIC internal version (suffix _internal, -interna, etc)
    // that matches the cover name.

    const baseName = path.basename(coverUrl, path.extname(coverUrl))
        .replace('_mobile', '')
        .replace('_cover', '')
        .replace('-capa', '')
        .replace('_real', '')
        .replace('_final', '');

    // Candidates to look for
    // Prefer exact matches with "interna" suffix
    const candidates = publicFiles.filter(f => {
        return (f.includes(baseName) || baseName.includes(f.split('.')[0].replace('-interna', '').replace('_internal', '')))
            && (f.includes('internal') || f.includes('interna') || f.includes('inner'))
            && !f.includes('mobile'); // Avoid mobile versions for desktop field if possible
    });

    // Sort to prioritize exactish matches
    candidates.sort((a, b) => b.length - a.length);

    if (candidates.length > 0) {
        const bestInternal = '/images/' + candidates[0];
        // Only update if it's different from what we have
        if (bestInternal !== internalUrl) {
            // console.log(`Restoring internal for ${baseName}: ${bestInternal}`);
            if (internalUrl) {
                return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '${bestInternal}'`);
            } else {
                return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '${bestInternal}',`);
            }
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Restored distinct internal images.');
