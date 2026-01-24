
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

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

// Acha o último ]; antes de events
const lastBracketIndex = articlesBlockWithEnd.lastIndexOf('];');
if (lastBracketIndex === -1) { console.error('Last bracket not found'); process.exit(1); }

const articlesBlock = articlesBlockWithEnd.substring(0, lastBracketIndex);
const betweenBlock = articlesBlockWithEnd.substring(lastBracketIndex);
const afterArticles = content.substring(endIndex);

// Parser robusto suficiente para o formato atual
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
        const open = (line.match(/\{/g) || []).length;
        const close = (line.match(/\}/g) || []).length;
        bracketCount += open - close;

        if (bracketCount === 0 && (line.trim().endsWith('},') || line.trim().endsWith('}'))) {
            articles.push(currentArticle);
            currentArticle = '';
            inArticle = false;
        }
    }
}

console.log(`Found ${articles.length} raw articles.`);

// Filtragem e Deduplicação
const seenIds = new Set();
const seenTitles = new Set();
const uniqueArticles = [];

// Vamos processar de cima para baixo.
// Mas queremos manter o ID novo 1769253501.

const parsedArticles = articles.map(text => {
    const idMatch = text.match(/id:\s*(\d+)/);
    const titleMatch = text.match(/title:\s*['"`](.*?)['"`]/);
    const dateMatch = text.match(/publishDate:\s*'([^']+)'/);

    return {
        text,
        id: idMatch ? idMatch[1] : null,
        title: titleMatch ? titleMatch[1] : null,
        date: dateMatch ? dateMatch[1] : '1900-01-01'
    };
});

// Ordenar primeiro por data (Decrescente)
parsedArticles.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
});

parsedArticles.forEach(art => {
    const cleanTitle = art.title ? art.title.replace(/['"]/g, '').trim() : '';

    // Filtro Explícito
    if (art.id === '1769252003' || art.id === '1769111830') {
        console.log(`Removing specific duplicate ID: ${art.id}`);
        return;
    }

    // Deduplicação por Título (Mantém o primeiro que aparecer, que será o mais recente)
    // O título "Araucária Vôlei vence em casa e assume a liderança" vai dar match
    if (cleanTitle && seenTitles.has(cleanTitle)) {
        console.log(`Removing duplicate title: "${cleanTitle}" (ID: ${art.id})`);
        return;
    }

    seenIds.add(art.id);
    if (cleanTitle) seenTitles.add(cleanTitle);
    uniqueArticles.push(art);
});

console.log(`Final unique articles: ${uniqueArticles.length}`);

const newArticlesBlock = uniqueArticles.map(a => {
    let t = a.text.trim();
    if (t.endsWith(',')) t = t.slice(0, -1); // remove trailing comma if any
    return t;
}).join(',\n    '); // Add commas back cleanly

// Reconstruct
// Cuidado para não deixar trailing comma no ultimo se TS reclamar, mas array aceita.
const newContent = beforeArticles + '\n    ' + newArticlesBlock + '\n' + betweenBlock + afterArticles;

fs.writeFileSync(filePath, newContent);
console.log('Successfully deduplicated and sorted articles.');
