const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract newsArticles array block
const newsBlockMatch = content.match(/export const newsArticles: NewsArticle\[\] = \[([\s\S]*?)\];/);

if (newsBlockMatch) {
    const newsBlock = newsBlockMatch[1];
    const idRegex = /id:\s*(\d{8,})/g; // Match IDs with at least 8 digits (timestamps)
    let match;
    const ids = new Map();
    const duplicates = [];

    while ((match = idRegex.exec(newsBlock)) !== null) {
        const id = match[1];
        if (ids.has(id)) {
            duplicates.push(id);
        } else {
            ids.set(id, true);
        }
    }

    if (duplicates.length > 0) {
        console.log('--- DUPLICATE NEWS IDs FOUND ---');
        console.log(duplicates);
    } else {
        console.log('--- No Duplicate News IDs found ---');
    }
} else {
    console.log('Could not find newsArticles block');
}
