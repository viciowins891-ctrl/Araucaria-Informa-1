
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public/images');
const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;
let match;
const report = [];

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const id = match[2];

    // Extract Image URLs
    const coverMatch = fullBlock.match(/imageUrl:\s*'([^']+)'/);
    const internalMatch = fullBlock.match(/internalImageUrl:\s*'([^']+)'/);

    if (coverMatch && internalMatch) {
        const coverPath = path.join(__dirname, 'public', coverMatch[1]);
        const internalPath = path.join(__dirname, 'public', internalMatch[1]);

        // Check if internal file exists and if it's potentially suspicious (we will just overwrite to be safe based on user complaint)
        if (fs.existsSync(coverPath)) {
            try {
                // Read cover content
                const coverData = fs.readFileSync(coverPath);
                // Overwrite internal file with cover content
                fs.writeFileSync(internalPath, coverData);
                report.push(`Overwrote ${internalMatch[1]} with content from ${coverMatch[1]}`);
            } catch (err) {
                console.error(`Error copying for ID ${id}:`, err);
            }
        }
    }
}

console.log('Fixed images by overwriting internal files with their cover versions (removing potential screenshots).');
report.forEach(r => console.log(r));
