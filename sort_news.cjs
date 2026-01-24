
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Isolate newsArticles block
const startMarker = 'export const newsArticles: NewsArticle[] = [';
const endMarker = 'export const events: Event[] = [';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers');
    process.exit(1);
}

const beforeArticles = content.substring(0, startIndex + startMarker.length);
const articlesBlockWithEnd = content.substring(startIndex + startMarker.length, endIndex);

// Find the actual end of the array (last closing bracket before export const events)
const lastBracketIndex = articlesBlockWithEnd.lastIndexOf('];');
const articlesBlock = articlesBlockWithEnd.substring(0, lastBracketIndex);
const betweenBlock = articlesBlockWithEnd.substring(lastBracketIndex); // This contains '];\n\n'
const afterArticles = content.substring(endIndex);

// 2. Parse articles
// We assume each article starts with "    {" and ends with "    }," or "    }"
// This is fragile. Better to match { ... } blocks knowing they are top level in the array.
// But we have nested braces in `content`.
// However, the `id` field seems unique and top level.
// Let's split by `    {` at the start of lines, which seems consistent in your file view.

const articles = [];
let currentArticle = '';
const lines = articlesBlock.split('\n');
let bracketCount = 0;
let inArticle = false;

for (let line of lines) {
    if (line.trim().startsWith('{') && !inArticle) {
        inArticle = true;
        currentArticle += line + '\n';
        bracketCount = 1;
        continue;
    }

    if (inArticle) {
        currentArticle += line + '\n';
        // Simple brace counting (ignoring braces in strings for simplicity, assuming standard formatting)
        // This is risky if content has braces.
        // Let's count open and close braces
        const open = (line.match(/\{/g) || []).length;
        const close = (line.match(/\}/g) || []).length;
        bracketCount += open - close;

        if (bracketCount === 0 && (line.trim().endsWith('},') || line.trim().endsWith('}'))) {
            // End of article
            articles.push(currentArticle);
            currentArticle = '';
            inArticle = false;
        }
    } else {
        // preserve comments or empty lines outside? No, we just want the articles.
    }
}

console.log(`Found ${articles.length} articles.`);

// 3. Extract dates and sort
const parsedArticles = articles.map(art => {
    const match = art.match(/publishDate:\s*'([^']+)'/);
    const date = match ? match[1] : '1900-01-01';
    return { text: art, date };
});

parsedArticles.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
});

// 4. Reconstruct file
const newArticlesBlock = parsedArticles.map(a => a.text.trimEnd()).join('\n');

const newContent = beforeArticles + '\n' + newArticlesBlock + '\n' + betweenBlock + afterArticles;

fs.writeFileSync(filePath, newContent);
console.log('Successfully sorted articles by date.');
