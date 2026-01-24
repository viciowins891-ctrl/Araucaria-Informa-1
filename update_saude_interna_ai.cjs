
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia de Saúde
const id = '1769252001';

// Novas URLs
const newInternalImage = '/images/saude-atendimento-recorde-ai.png';

// Regex para substituir APENAS a internalImageUrl deste artigo específico.
const saudeBlockRegex = /(id:\s*1769252001[\s\S]*?)internalImageUrl:\s*['"][^'"]*['"]/;

if (saudeBlockRegex.test(content)) {
    content = content.replace(saudeBlockRegex, (match, p1) => {
        return `${p1}internalImageUrl: '${newInternalImage}'`;
    });

    fs.writeFileSync(filePath, content);
    console.log('Imagem interna da notícia de Saúde (IA) atualizada com sucesso!');
} else {
    console.error('Bloco da notícia de Saúde não encontrado ou formato inesperado.');
}

