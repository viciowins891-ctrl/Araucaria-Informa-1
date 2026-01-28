const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Regex to extract article objects
const articleRegex = /\{\s*id:\s*(\d+),[\s\S]*?title:\s*(['"`])([\s\S]*?)\2,[\s\S]*?content:\s*`([\s\S]*?)`,[\s\S]*?imageUrl:\s*'([^']*)',[\s\S]*?internalImageUrl:\s*'([^']*)'/g;

let match;
const issues = [];

while ((match = articleRegex.exec(content)) !== null) {
    const id = match[1];
    const title = match[3];
    const rawContent = match[4];
    const imageUrl = match[5];
    const internalImageUrl = match[6];
    const articleIssues = [];

    // 1. Check Image Duplication
    if (imageUrl === internalImageUrl) {
        articleIssues.push('DUPLICATE_IMAGES');
    }

    // 2. Check City Prefix Standard (Start with <p><strong>ARAUCÁRIA|CIDADE</strong>)
    // Relaxed regex to catch slight variations like "<strong> ARAUCÁRIA </strong>"
    const prefixRegex = /^\s*<p>\s*<strong>\s*[A-ZÀ-Ú ]+\s*<\/strong>\s*-\s*/i;
    if (!prefixRegex.test(rawContent.trim())) {
        articleIssues.push('MISSING_PREFIX');
    }

    // 3. Check for Subheadings (<h3>)
    if (!rawContent.includes('<h3>')) {
        articleIssues.push('MISSING_H3');
    }

    if (articleIssues.length > 0) {
        issues.push({
            id,
            title: title.substring(0, 50) + '...',
            issues: articleIssues,
            imageUrl,
            internalImageUrl
        });
    }
}

console.log(JSON.stringify(issues, null, 2));
console.log(`Total articles with issues: ${issues.length}`);
