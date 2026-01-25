const fs = require('fs');

const dataContent = fs.readFileSync('data.ts', 'utf-8');

// Encontra todas as news articles
const newsBlock = dataContent.match(/export const newsArticles[\s\S]*?\[\s*([\s\S]*?)\s*\];/);

if (!newsBlock) {
    console.log('Não encontrei newsArticles');
    process.exit(1);
}

// Procura pela notícia da Polícia Civil
const lines = dataContent.split('\n');
let articleIndex = -1;
let articleId = null;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Polícia Civil incinera 114 kg')) {
        console.log(`\n✅ ENCONTREI na linha ${i + 1}`);

        // Procura o ID nas linhas próximas
        for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 10); j++) {
            const idMatch = lines[j].match(/id:\s*(\d+)/);
            if (idMatch) {
                articleId = parseInt(idMatch[1]);
                console.log(`   ID no data.ts: ${articleId}`);
                break;
            }
        }

        // Verifica se tem internalImageUrl
        for (let j = i; j < Math.min(lines.length, i + 30); j++) {
            if (lines[j].includes('internalImageUrl')) {
                const urlMatch = lines[j].match(/internalImageUrl:\s*['"]([^'"]+)['"]/);
                if (urlMatch) {
                    console.log(`   ✅ internalImageUrl: ${urlMatch[1]}`);
                } else {
                    console.log(`   ⚠️ internalImageUrl encontrado mas sem URL clara`);
                }
                break;
            }
            if (lines[j].includes('},')) {
                console.log('   ❌ NÃO TEM internalImageUrl');
                break;
            }
        }
        break;
    }
}

if (!articleId) {
    console.log('\n❌ Notícia "Polícia Civil incinera 114 kg" NÃO ENCONTRADA');
} else {
    console.log(`\n🔍 A URL correta deve ser: http://localhost:3001/#/noticias/${articleId}`);
    console.log(`   Mas você está acessando: http://localhost:3001/#/noticias/5`);
    console.log('\n⚠️ PROBLEMA: O índice do array está sendo usado ao invés do ID!');
}
