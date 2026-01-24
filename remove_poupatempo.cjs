
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia do Poupatempo para remover
const idToRemove = '1769250512';

// Regex para remover o objeto inteiro da lista
// Procura por { id: 1769250512 ... },
const blockRegex = /\s*{\s*id:\s*1769250512[\s\S]*?author: 'Redação Squad'\s*},?/m;

if (blockRegex.test(content)) {
    content = content.replace(blockRegex, '');
    // Limpar linhas vazias extras que podem ter sobrado
    content = content.replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(filePath, content);
    console.log('Notícia do Poupatempo removida com sucesso!');
} else {
    console.error('Bloco da notícia do Poupatempo não encontrado.');
}

