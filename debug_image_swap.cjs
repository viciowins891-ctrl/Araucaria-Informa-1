const fs = require('fs');
const path = require('path');

// Lê o arquivo data.ts
const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf-8');

// Extrai todos os artigos com regex
const articleRegex = /{\s*id:\s*(\d+),\s*title:\s*[`"']([^`"']+)[`"'],[\s\S]*?imageUrl:\s*['"]([^'"]+)['"],[\s\S]*?internalImageUrl:\s*['"]([^'"]+)['"],/g;

const articles = [];
let match;

while ((match = articleRegex.exec(content)) !== null) {
    const [, id, title, coverUrl, internalUrl] = match;
    articles.push({
        id,
        title: title.replace(/<[^>]+>/g, '').substring(0, 60),
        coverUrl,
        internalUrl
    });
}

console.log('\n=== AUDITORIA DE IMAGENS INTERNAS ===\n');

// Verifica duplicações
const duplicates = [];
articles.forEach((article, index) => {
    // Verifica se cover == internal
    if (article.coverUrl === article.internalUrl) {
        duplicates.push({
            type: 'COVER = INTERNAL',
            ...article
        });
    }

    // Verifica se internal de um artigo == cover ou internal de outro
    articles.forEach((other, otherIndex) => {
        if (index !== otherIndex) {
            if (article.internalUrl === other.coverUrl) {
                duplicates.push({
                    type: 'INTERNAL USANDO COVER DE OUTRO',
                    article1: article.title,
                    id1: article.id,
                    internal1: article.internalUrl,
                    article2: other.title,
                    id2: other.id,
                    cover2: other.coverUrl
                });
            }
            if (article.internalUrl === other.internalUrl && article.id !== other.id) {
                duplicates.push({
                    type: 'MESMA INTERNAL EM DOIS ARTIGOS',
                    article1: article.title,
                    id1: article.id,
                    article2: other.title,
                    id2: other.id,
                    sharedUrl: article.internalUrl
                });
            }
        }
    });
});

// Remove duplicatas do relatório
const uniqueDuplicates = [];
const seen = new Set();

duplicates.forEach(dup => {
    const key = JSON.stringify(dup);
    if (!seen.has(key)) {
        seen.add(key);
        uniqueDuplicates.push(dup);
    }
});

if (uniqueDuplicates.length === 0) {
    console.log('✅ Nenhuma troca ou duplicação de imagem detectada!\n');
} else {
    console.log(`❌ ENCONTRADOS ${uniqueDuplicates.length} PROBLEMAS:\n`);
    uniqueDuplicates.forEach((dup, i) => {
        console.log(`${i + 1}. ${dup.type}`);
        if (dup.article1) {
            console.log(`   Artigo 1: "${dup.article1}" (ID: ${dup.id1})`);
            console.log(`   Artigo 2: "${dup.article2}" (ID: ${dup.id2})`);
            if (dup.sharedUrl) {
                console.log(`   URL compartilhada: ${dup.sharedUrl}`);
            }
        } else {
            console.log(`   ID: ${dup.id}`);
            console.log(`   Título: "${dup.title}"`);
            console.log(`   Cover: ${dup.coverUrl}`);
            console.log(`   Internal: ${dup.internalUrl}`);
        }
        console.log('');
    });
}

console.log('\n=== LISTA COMPLETA DE ARTIGOS ===\n');
articles.slice(0, 20).forEach((art, i) => {
    console.log(`${i + 1}. ID ${art.id}: "${art.title}"`);
    console.log(`   Cover: ${art.coverUrl}`);
    console.log(`   Internal: ${art.internalUrl}`);
    console.log('');
});
