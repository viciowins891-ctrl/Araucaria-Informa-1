
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const publicDir = path.join(__dirname, 'public/images');
let content = fs.readFileSync(dataPath, 'utf8');

const publicFiles = fs.readdirSync(publicDir);

// Helper to find best internal match
function findInternalMatch(currentImage) {
    if (!currentImage) return null;

    // Remove path and extension
    let baseName = path.basename(currentImage, path.extname(currentImage));

    // Candidates to check
    const candidates = [
        baseName.replace('-capa', '-interna'),
        baseName.replace('_cover', '_internal'),
        baseName + '-interna',
        baseName + '_internal',
        baseName + '_inner',
        baseName.replace('capa', 'interna'), // aggressive replacement
        baseName.replace('cover', 'internal') // aggressive replacement
    ];

    for (const cand of candidates) {
        // Find a file that starts with this candidate name
        const match = publicFiles.find(f => f.startsWith(cand));
        if (match && match !== path.basename(currentImage)) { // Don't match self
            return '/images/' + match;
        }
    }

    return null;
}

// Regex to find articles blocks
const articleRegex = /(\{\s*id:\s*\d+,[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match) => {
    // Check if it has imageUrl
    const imgMatch = match.match(/imageUrl:\s*'([^']+)'/);
    if (!imgMatch) return match;

    const imageUrl = imgMatch[1];
    const currentInternalMatch = match.match(/internalImageUrl:\s*'([^']+)'/);
    const currentInternal = currentInternalMatch ? currentInternalMatch[1] : null;

    // Skip if internal image is already different from cover (assuming it's correct)
    // AND it's not just a mobile version of the cover
    if (currentInternal && currentInternal !== imageUrl && !currentInternal.includes(imageUrl.replace('.', '_mobile.'))) {
        // It might be correct already due to previous run, but let's re-verify if needed.
        // Actually, let's only fix if they are identical OR if internal is missing
    }

    if (currentInternal === imageUrl || !currentInternal) {
        let newInternal = findInternalMatch(imageUrl);

        if (newInternal) {
            if (match.includes('internalImageUrl:')) {
                return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '${newInternal}'`);
            } else {
                return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '${newInternal}',`);
            }
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Fixed more internal images based on broader heuristics.');
