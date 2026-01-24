
const fs = require('fs');

const filePath = 'data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Regex para limpar tags de abertura: < p > -> <p>
content = content.replace(/<\s*([a-zA-Z0-9]+)\s*>/g, '<$1>');

// Regex para limpar tags de fechamento: < / p > -> </p>
content = content.replace(/<\s*\/\s*([a-zA-Z0-9]+)\s*>/g, '</$1>');

// Correção específica que vi: < /strong >
content = content.replace(/<\s*\/strong\s*>/g, '</strong>');

// Limpeza de espaços em atributos, se houver (mas focar nas tags principais p, strong, h3)
// O problema principal relatado é < p > e < h3 >

fs.writeFileSync(filePath, content);
console.log('Fixed broken HTML tags globally in data.ts.');
