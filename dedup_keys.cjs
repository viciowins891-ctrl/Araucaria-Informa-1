
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log("--- CORREÇÃO DE DUPLICIDADE DE CHAVES E ESPAÇOS ---");

// Regex para encontrar todo o bloco de um artigo
// Assume que começa com `{` e tem `id:`. Termina com `},`
// Esse regex é perigoso em arquivos grandes, mas vamos tentar ir bloco a bloco.

// Abordagem linha a linha é mais segura para remover duplicatas adjacentes ou próximas.
const lines = content.split('\n');
const newLines = [];
let insideArticle = false;
let currentBlockProperties = new Set();
let currentArticleBuffer = [];

// Lista de propriedades que não podem repetir
const uniqueProps = ['id', 'title', 'summary', 'imageUrl', 'mobileImageUrl', 'internalImageUrl', 'category', 'categoryColor', 'publishDate', 'author', 'content'];

// Mapa para guardar o valor da PROPRIEDADE (versão final escolhida)
// Se encontrarmos duplicata, atualizamos o mapa, mas NÃO EXIBIMOS a linha antiga.
// Ao fechar o bloco `},`, despejamos as linhas reconstruídas? Não, perderíamos comentários e formatação.

// Estratégia de "Deduplicação Inteligente":
// Vamos percorrer linha a linha. Se encontrarmos uma propriedade:
// 1. Verificamos se ela já apareceu neste bloco.
// 2. Se sim, removemos a anterior (bufferizando) ou ignoramos a atual?
// O comportamento do JS é "último vence". Se o usuário diz que está quebrado, o último está ruim.
// O meu script anterior inseriu o fallback ANTES do original. Então o ORIGINAL (ruim) está vencendo.
// Então devemos IGNORAR a segunda ocorrência se a primeira (meu fallback) for "melhor"?
// Ou apenas remover a primeira para não ter duplicata e corrigir a segunda?

// Vamos fazer algo simples:
// Se encontrarmos `internalImageUrl` e JÁ passamos por um `internalImageUrl` neste bloco...
// Mantemos o PRIMEIRO (o meu fallback que sei que funciona, pois é clone da capa)
// E descartamos o SEGUNDO (o original que pode estar quebrado).

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('{') && (trimmed.includes('id:') || lines[i + 1]?.includes('id:'))) {
        insideArticle = true;
        currentBlockProperties.clear();
    }

    if (insideArticle) {
        // Detectar propriedade
        const propMatch = trimmed.match(/^(\w+):/);
        if (propMatch) {
            const propName = propMatch[1];
            if (uniqueProps.includes(propName)) {
                if (currentBlockProperties.has(propName)) {
                    // DUPLICATA DETECTADA!
                    console.log(`⚠️ Duplicata removida na linha ${i + 1}: ${propName}`);

                    // Lógica de qual remover:
                    // Se for internalImageUrl, a PRIMEIRA que apareceu foi a minha (adicionada antes). A SEGUNDA é a original.
                    // Eu quero que vença a MINHA (Capa) se a original estiver quebrada.
                    // Mas espera, se eu simplesmente pular essa linha (a segunda), eu mantenho a primeira.
                    // Então: CONTINUE (não adiciona a linha atual ao array final).
                    continue;
                } else {
                    currentBlockProperties.add(propName);
                }
            }
        }
    }

    // Limpeza de Whitespace no Content
    // Se a linha for apenas whitespace dentro de um template string, podemos simplificar?
    // Não vamos mexer nisso cegamente para não quebrar formatação HTML.

    if (trimmed.startsWith('},')) {
        insideArticle = false;
    }

    newLines.push(line);
}

// Reconstruir conteúdo
content = newLines.join('\n');

// CORREÇÃO DE CONTEÚDO VAZIO "VISUAL"
// Procura blocos de content que tenham muito espaço em branco
// `\s+<p>` -> `<p>`
content = content.replace(/content:\s*`\s+(<p>)/g, 'content: `$1');

fs.writeFileSync(filePath, content);
console.log("✅ Limpeza concluída.");

