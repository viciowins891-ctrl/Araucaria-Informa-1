
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

// Conta ocorrências de id: dentro do bloco newsArticles
const start = content.indexOf('export const newsArticles');
const end = content.indexOf('export const events');
const newsBlock = content.substring(start, end);

const count = (newsBlock.match(/id:\s*\d+/g) || []).length;
console.log(`Total real de notícias no arquivo: ${count}`);
