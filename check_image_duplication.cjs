const fs = require('fs');
const path = require('path');

// Read data.ts manually (simple regex approach as it is a TS file, but effectively JS-like object)
// Note: In a real environment we might import it, but regex is safer for a standalone script without transpilation
const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Regex to find object blocks
const articleRegex = /\{\s*id:\s*(\d+),[\s\S]*?imageUrl:\s*'([^']*)',[\s\S]*?internalImageUrl:\s*'([^']*)'/g;

let match;
const suspiciousArticles = [];

while ((match = articleRegex.exec(content)) !== null) {
    const id = match[1];
    const imageUrl = match[2];
    const internalImageUrl = match[3];

    // Check if duplicate
    if (imageUrl === internalImageUrl) {
        suspiciousArticles.push({
            id,
            image: imageUrl
        });
    }
}

console.log('--- DUPLICATE IMAGE ANALYSIS ---');
console.log(`Found ${suspiciousArticles.length} articles with identical Cover and Internal images.`);
suspiciousArticles.forEach(a => {
    console.log(`- ID: ${a.id} | Image: ${a.image}`);
});

if (suspiciousArticles.length === 0) {
    console.log('No duplicates found! All articles have distinct internal images.');
}
