
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// A correção precisa ser cirúrgica. Vamos adicionar vírgulas onde faltam entre objetos.
// O padrão é uma chave fechando, quebra de linha (com espaços), e uma chave abrindo.
// Mas cuidado para não pegar blocos dentro de funções (embora neste arquivo seja OK).

// Vamos focar apenas no bloco newsArticles para segurança.
const startMarker = 'export const newsArticles: NewsArticle[] = [';
const endMarker = 'export const events: Event[] = [';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

let articlesBlock = content.substring(startIndex, endIndex);

// Regex para encontrar } seguido de { sem vírgula, permitindo espaços e quebras de linha
// A flag 'g' é global.
const fixedBlock = articlesBlock.replace(/}\s*(\r\n|\n|\r)\s*\{/g, '},\n    {');

// Reconstrói o arquivo
const newContent = content.substring(0, startIndex) + fixedBlock + content.substring(endIndex);

fs.writeFileSync(filePath, newContent);
console.log('Fixed missing commas in data.ts');
