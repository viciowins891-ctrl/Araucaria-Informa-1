const fs = require('fs');
const path = require('path');

// Ler o arquivo data.ts manualmente para evitar lidar com modules TS/transpile agora
const filePath = path.join(__dirname, 'data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Gambiarra inteligente para extrair o array sem executar o TS
// Vamos achar o inicio do array "export const newsArticles"
const startMarker = 'export const newsArticles: NewsArticle[] = [';
const startIndex = fileContent.indexOf(startMarker);

if (startIndex === -1) {
    console.error("Não achei o array newsArticles no arquivo data.ts");
    process.exit(1);
}

// Extrair o bloco do array (aproximado, assumindo que termina com ];)
// Na prática, vamos usar eval com cuidado ou regex, mas como é um arquivo de dados estruturado,
// vou tentar extrair objetos individuais com regex para ser robusto a sintaxe TS ao redor.

console.log("--- DIAGNÓSTICO DE INTEGRIDADE ---");

// Regex para capturar objetos { id: ... } 
// Ajustado para capturar propriedades chaves
const objectRegex = /{\s*id:\s*(\d+|['"]\d+['"])([\s\S]*?)\s*},?/g;

let match;
const foundIds = new Map();
const issues = [];
const internalImageMissing = [];
const contentMissing = [];

let count = 0;

while ((match = objectRegex.exec(fileContent)) !== null) {
    count++;
    const idRaw = match[1].replace(/['"]/g, ''); // Tira aspas se tiver
    const body = match[2];

    // Checa Título (para log)
    const titleMatch = body.match(/title:\s*(['"`])([\s\S]*?)\1/);
    const title = titleMatch ? titleMatch[2].substring(0, 30) + "..." : "SEM TITULO";

    // 1. Checa Duplicidade
    if (foundIds.has(idRaw)) {
        issues.push({
            type: 'DUPLICATE_ID',
            id: idRaw,
            title: title,
            originalTitle: foundIds.get(idRaw)
        });
    } else {
        foundIds.set(idRaw, title);
    }

    // 2. Checa Imagem Interna
    // Pode estar como internalImageUrl: '...' ou "..."
    const internalImgMatch = body.match(/internalImageUrl:\s*(['"`])(.*?)\1/);
    if (!internalImgMatch || !internalImgMatch[2] || internalImgMatch[2].trim() === '') {
        internalImageMissing.push({ id: idRaw, title });
    }

    // 3. Checa Conteúdo
    // content: `...`
    const contentMatch = body.match(/content:\s*`([\s\S]*?)`/);
    if (!contentMatch || (contentMatch[1] && contentMatch[1].length < 50)) {
        contentMissing.push({ id: idRaw, title });
    }
}

console.log(`\nTotal de Itens Analisados: ${count}`);

if (issues.length > 0) {
    console.log("\n🔴 [CRÍTICO] IDs DUPLICADOS ENCONTRADOS:");
    issues.forEach(i => console.log(`   - ID ${i.id}: "${i.title}" conflita com "${i.originalTitle}"`));
} else {
    console.log("\n✅ Nenhum ID duplicado encontrado.");
}

if (internalImageMissing.length > 0) {
    console.log(`\n🟠 [ALERTA] ${internalImageMissing.length} Notícias sem Imagem Interna (ou vazias):`);
    internalImageMissing.forEach(i => console.log(`   - ID ${i.id}: ${i.title}`));
} else {
    console.log("\n✅ Todas as notícias têm internalImageUrl.");
}

if (contentMissing.length > 0) {
    console.log(`\n🟠 [ALERTA] ${contentMissing.length} Notícias sem Conteúdo (Content < 50 chars):`);
    contentMissing.forEach(i => console.log(`   - ID ${i.id}: ${i.title}`));
} else {
    console.log("\n✅ Todas as notícias têm conteúdo válido.");
}
