
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.join(__dirname, 'public/images');
const dataPath = path.join(__dirname, 'data.ts');

// 1. Index All Files (Hash & Size)
const fileStats = {};
const files = fs.readdirSync(publicDir);

files.forEach(f => {
    // Ignore obviously bad files or mobile vertical crops for desktop internal if avoidable
    // if (f.includes('mobile')) return; 

    const fullPath = path.join(publicDir, f);
    try {
        const content = fs.readFileSync(fullPath);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        fileStats[f] = { size: content.length, hash: hash, name: f };
    } catch (e) { }
});

// 2. Read current Data to identify problems
let content = fs.readFileSync(dataPath, 'utf8');
const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match, fullBlock, id) => {

    // Extract current pointers
    const coverMatch = match.match(/imageUrl:\s*['"]\/images\/([^'"]+)['"]/);
    const internalMatch = match.match(/internalImageUrl:\s*['"]\/images\/([^'"]+)['"]/);

    if (!coverMatch) return match; // Skip if no cover (service blocks etc)

    const coverFile = coverMatch[1];
    let internalFile = internalMatch ? internalMatch[1] : null;

    const coverHash = fileStats[coverFile]?.hash;
    const internalHash = internalFile ? fileStats[internalFile]?.hash : null;

    // Condition to Fix: Internal is missing OR Internal is visually identical to Cover
    if (!internalFile || !internalHash || coverHash === internalHash) {

        // Strategy: Find a better image
        // 1. Must share some keywords with cover filename
        const baseKeywords = coverFile.split(/[_\-\.]/).filter(w => w.length > 3 && !['capa', 'cover', 'mobile', 'png', 'jpg', 'webp', 'real', 'final'].includes(w));

        // 2. Score candidates
        const candidates = files.filter(f => {
            if (!fileStats[f]) return false;
            // critical: must NOT be same visually as cover
            if (fileStats[f].hash === coverHash) return false;

            // basic matching
            let keywordMatches = 0;
            baseKeywords.forEach(k => {
                if (f.includes(k)) keywordMatches++;
            });

            return keywordMatches >= 1;
        });

        if (candidates.length > 0) {
            // Sort candidates by quality
            candidates.sort((a, b) => {
                let scoreA = 0;
                let scoreB = 0;

                // Prefer 'interna', 'internal', 'inner'
                if (a.includes('intern')) scoreA += 5;
                if (b.includes('intern')) scoreB += 5;

                // Prefer NOT mobile (for desktop internal)
                if (!a.includes('mobile')) scoreA += 2;
                if (!b.includes('mobile')) scoreB += 2;

                // Prefer 'real', 'final'
                // if (a.includes('real')) scoreA += 1;
                // if (b.includes('real')) scoreB += 1;

                return scoreB - scoreA;
            });

            const bestPick = candidates[0];
            // Update the usage
            // console.log(`[Fixing ${id}] Replaced duplicate ${internalFile} with ${bestPick}`);

            if (internalMatch) {
                return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '/images/${bestPick}'`);
            } else {
                return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '/images/${bestPick}',`);
            }
        } else {
            // console.log(`[Warning ${id}] No alternative found for ${coverFile}. Keeping duplicate.`);
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Smart De-duplication complete.');
