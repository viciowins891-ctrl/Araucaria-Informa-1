
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia de Saúde
const id = '1769252001';

// Novas URLs
// Mantemos a Capa antiga (ou seja, a que já estava, se for diferente)
// Mas definimos a Interna explicitamente para a nova imagem.
const newInternalImage = '/images/saude-recorde-150mil-interna.png';

// Acha o bloco da notícia
// Vamos usar replace direto na linha internalImageUrl dentro do bloco deste ID, se possível.

// Regex para substituir APENAS a internalImageUrl deste artigo específico.
// Procura: id: 1769252001 ... internalImageUrl: '...'
// Como regex multilinha é complexo, vamos usar a abordagem de substituir o bloco conhecido ou localizar strings próximas.

// A linha atual é: internalImageUrl: '/images/saude-recorde-150mil.png',
// Queremos mudar para: internalImageUrl: '/images/saude-recorde-150mil-interna.png',

// Mas temos que garantir que é no bloco da saude.
const saudeBlockRegex = /(id:\s*1769252001[\s\S]*?)internalImageUrl:\s*['"][^'"]*['"]/;

if (saudeBlockRegex.test(content)) {
    content = content.replace(saudeBlockRegex, (match, p1) => {
        return `${p1}internalImageUrl: '${newInternalImage}'`;
    });

    fs.writeFileSync(filePath, content);
    console.log('Imagem interna da notícia de Saúde atualizada com sucesso!');
} else {
    console.error('Bloco da notícia de Saúde não encontrado ou formato inesperado.');
}

