
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');
const matches = content.match(/publishDate: '2026-01-24'/g);
console.log(`Notícias datadas de hoje (2026-01-24): ${matches ? matches.length : 0}`);

const allMatches = content.match(/id: \d+/g);
console.log(`Total de notícias ativas: ${allMatches ? allMatches.length : 0}`);
