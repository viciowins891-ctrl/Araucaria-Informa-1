
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Mapeamento de problemas encontrados
// Poupatempo já foi removido (mas podemos garantir)
// Festival da Canção (ID 1769260001): Edição/Data incorretas

const idsToRemove = ['1769260001'];

let removedCount = 0;

idsToRemove.forEach(id => {
    const regex = new RegExp(`\\s*{\\s*id:\\s*${id}[\\s\\S]*?author: ['"].*?['"]\\s*},?`, 'm');
    if (regex.test(content)) {
        content = content.replace(regex, '');
        removedCount++;
        console.log(`Notícia ID ${id} (Festival da Canção) removida.`);
    }
});

if (removedCount > 0) {
    // Limpeza de linhas vazias
    content = content.replace(/^\s*[\r\n]/gm, '');
    fs.writeFileSync(filePath, content);
    console.log('Limpeza concluída.');
} else {
    console.log('Nenhuma notícia crítica encontrada para remover.');
}

