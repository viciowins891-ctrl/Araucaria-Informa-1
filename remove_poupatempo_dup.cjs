
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia antiga duplicada (Poupatempo)
const id = '103';

// Regex para remover o objeto (considerando formatação minificada/inline)
const blockRegex = /\s*{\s*id:\s*103,[\s\S]*?author: ['"].*?['"]\s*},?/;

if (blockRegex.test(content)) {
    content = content.replace(blockRegex, '');
    // Limpar linhas vazias
    content = content.replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(filePath, content);
    console.log('Notícia duplicada do Poupatempo (ID 103) removida com sucesso!');
} else {
    console.error('Notícia ID 103 não encontrada.');
}

