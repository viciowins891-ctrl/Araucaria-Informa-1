
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log("--- CORREÇÃO DE INDENTAÇÃO EXCESSIVA EM CONTEÚDO HTML ---");

// Regex para capturar e substituir o conteúdo dentro de content: `...`
// Atenção: O conteúdo pode ter tags HTML e múltiplas linhas.
// A abordagem mais segura é capturar o bloco e processar.

content = content.replace(/content:\s*`([\s\S]*?)`/g, (match, innerContent) => {
    // Process single content block
    const lines = innerContent.split('\n');
    const cleanedLines = lines.map(line => {
        const trimmed = line.trim();
        // Preserva linhas vazias se necessário, mas remove espaços gigantes
        return trimmed.length > 0 ? `        ${trimmed}` : '';
    });

    // Rejoin, mantendo uma indentação básica bonita (8 espaços)
    const newInner = cleanedLines.join('\n');
    return `content: \`\n${newInner}\n    \``;
});

// Correção extra: Remover linhas vazias consecutivas excessivas geradas
content = content.replace(/(\n\s*){3,}/g, '\n\n');

fs.writeFileSync(filePath, content);
console.log("✅ Indentação e espaços em branco corrigidos em todo o arquivo data.ts");
