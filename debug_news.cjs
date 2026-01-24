
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

const start = content.indexOf('export const newsArticles');
const end = content.indexOf('export const events');
const newsBlock = content.substring(start, end);

const ids = newsBlock.match(/id:\s*(\d+)/g);
console.log(`IDs encontrados (${ids ? ids.length : 0}):`);
if (ids) {
    // Show first 5 and last 5
    console.log(ids.slice(0, 5));
    console.log('...');
    console.log(ids.slice(-5));
}
