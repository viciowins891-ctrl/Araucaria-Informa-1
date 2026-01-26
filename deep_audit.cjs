
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const publicDir = path.join(__dirname, 'public/images');
const dataPath = path.join(__dirname, 'data.ts');

// 1. Map all files in public/images with size and hash to detect visual duplicates
const fileStats = {};
const files = fs.readdirSync(publicDir);

files.forEach(f => {
    const fullPath = path.join(publicDir, f);
    try {
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
            const content = fs.readFileSync(fullPath);
            const hash = crypto.createHash('md5').update(content).digest('hex');
            fileStats[f] = { size: stats.size, hash: hash };
        }
    } catch (e) { console.error(`Error reading ${f}: ${e.message}`); }
});

// 2. Parse data.ts
const content = fs.readFileSync(dataPath, 'utf8');
const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

const report = [];
let match;
let missingFiles = 0;
let duplicateVisuals = 0;
let sameName = 0;

while ((match = articleRegex.exec(content)) !== null) {
    const fullBlock = match[1];
    const id = match[2];
    const titleMatch = fullBlock.match(/title:\s*(['"`])(.*?)\1/);
    const title = titleMatch ? titleMatch[2].substring(0, 30) + '...' : 'Unknown';

    const coverMatch = fullBlock.match(/imageUrl:\s*['"]\/images\/([^'"]+)['"]/);
    const internalMatch = fullBlock.match(/internalImageUrl:\s*['"]\/images\/([^'"]+)['"]/);

    const cover = coverMatch ? coverMatch[1] : null;
    const internal = internalMatch ? internalMatch[1] : null;

    const issue = [];

    if (!cover || !fileStats[cover]) {
        issue.push('COVER_MISSING');
        missingFiles++;
    }

    if (internal && !fileStats[internal]) {
        issue.push('INTERNAL_MISSING');
        missingFiles++;
    }

    let isVisualDuplicate = false;
    if (cover && internal && fileStats[cover] && fileStats[internal]) {
        if (cover === internal) {
            issue.push('SAME_FILENAME');
            sameName++;
            isVisualDuplicate = true;
        } else if (fileStats[cover].hash === fileStats[internal].hash) {
            issue.push('VISUAL_DUPLICATE (Different Name, Same Content)');
            duplicateVisuals++;
            isVisualDuplicate = true;
        }
    } else if (cover && !internal) {
        issue.push('NO_INTERNAL_DEFINED');
    }

    report.push({
        id,
        title,
        cover,
        internal,
        status: issue.length > 0 ? 'WARNING' : 'OK',
        issues: issue.join(', ')
    });
}

console.log('--- DEEP AUDIT REPORT ---');
console.log(JSON.stringify(report.filter(r => r.status !== 'OK'), null, 2));
console.log('\n--- SUMMARY ---');
console.log(`Total Articles Checked: ${report.length}`);
console.log(`Missing Files: ${missingFiles}`);
console.log(`Same Filename (Capa=Interna): ${sameName}`);
console.log(`Visual Duplicates (Sobrescritos): ${duplicateVisuals}`);
console.log(`Clean Articles: ${report.filter(r => r.status === 'OK').length}`);

// Suggest available alternatives for the problematic ones
const unusedFiles = files.filter(f => {
    // Basic filter to ignore icons or small assets if any
    return !report.some(r => r.cover === f || (r.internal === f && r.status === 'OK'));
});
console.log(`\nAvailable Unused Images (Potential Fixes): ${unusedFiles.length}`);
