const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataPath = path.join(__dirname, 'data.ts');
const publicImagesPath = path.join(__dirname, 'public');

// Helper to get file hash
function getFileHash(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        return crypto.createHash('md5').update(buffer).digest('hex');
    } catch (e) {
        return null; // File not found or error
    }
}

const content = fs.readFileSync(dataPath, 'utf8');
const articleRegex = /\{\s*id:\s*(\d+),[\s\S]*?title:\s*(['"`])([\s\S]*?)\2,[\s\S]*?imageUrl:\s*'([^']*)',[\s\S]*?internalImageUrl:\s*'([^']*)'/g;

let match;
const visualDuplicates = [];

console.log('--- Checking for VISUAL duplicates (Content Hash) ---');

while ((match = articleRegex.exec(content)) !== null) {
    const id = match[1];
    const title = match[3];
    const imageUrl = match[4]; // relative path e.g. /images/foo.png
    const internalImageUrl = match[5];

    // Resolve absolute paths
    const absCoverPath = path.join(publicImagesPath, imageUrl.split('?')[0]); // remove query params if any
    const absInternalPath = path.join(publicImagesPath, internalImageUrl.split('?')[0]);

    const hashCover = getFileHash(absCoverPath);
    const hashInternal = getFileHash(absInternalPath);

    if (hashCover && hashInternal && hashCover === hashInternal) {
        visualDuplicates.push({
            id,
            title: title.substring(0, 30),
            cover: imageUrl,
            internal: internalImageUrl,
            reason: 'Identical file content (Hash match)'
        });
    } else if (imageUrl === internalImageUrl) {
        visualDuplicates.push({
            id,
            title: title.substring(0, 30),
            cover: imageUrl,
            internal: internalImageUrl,
            reason: 'Identical filename'
        });
    }
}

if (visualDuplicates.length > 0) {
    console.log(`FOUND ${visualDuplicates.length} ARTICLES WITH DUPLICATE IMAGES:`);
    console.log(JSON.stringify(visualDuplicates, null, 2));
} else {
    console.log('No visual duplicates found via Hash check.');
}
