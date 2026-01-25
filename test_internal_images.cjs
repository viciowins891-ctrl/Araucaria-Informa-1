const fs = require('fs');
const path = require('path');

console.log('🔍 TESTE PROFUNDO - IMAGENS INTERNAS\n');

// Simula o que o ArticlePage.tsx faz
const dataPath = path.join(__dirname, 'data.ts');
const articlePagePath = path.join(__dirname, 'pages', 'ArticlePage.tsx');

console.log('1️⃣ Verificando ArticlePage.tsx...\n');
const articlePageContent = fs.readFileSync(articlePagePath, 'utf-8');

// Verifica se as condições foram removidas
const hasOldCondition1 = articlePageContent.includes('internalImageUrl !== currentArticle.imageUrl');
const hasOldCondition2 = articlePageContent.includes('article.content.includes(secondaryImage)');

if (hasOldCondition1) {
    console.log('❌ PROBLEMA: Ainda tem a restrição !== imageUrl');
} else {
    console.log('✅ Restrição !== imageUrl foi removida');
}

if (hasOldCondition2) {
    console.log('❌ PROBLEMA: Ainda tem a restrição content.includes()');
} else {
    console.log('✅ Restrição content.includes() foi removida');
}

// Verifica a lógica atual
const setSecondaryImageMatch = articlePageContent.match(/if \(currentArticle\.internalImageUrl\) \{[\s\S]*?setSecondaryImage\(currentArticle\.internalImageUrl\)/);

if (setSecondaryImageMatch) {
    console.log('✅ Lógica de setSecondaryImage está correta');
} else {
    console.log('⚠️ Não consegui verificar a lógica de setSecondaryImage');
}

// Verifica a renderização
const renderMatch = articlePageContent.match(/\{secondaryImage && \(/);
if (renderMatch) {
    console.log('✅ Condição de renderização simplificada encontrada');
} else {
    console.log('❌ Condição de renderização ainda tem restrições extras');
}

console.log('\n2️⃣ Testando Notícias Específicas...\n');

// Testa as duas notícias
const testArticles = [
    { id: 105, title: 'Polícia Civil incinera 114 kg' },
    { id: 101, title: 'Araucária zera fila' }
];

const dataContent = fs.readFileSync(dataPath, 'utf-8');

testArticles.forEach(test => {
    console.log(`\n📰 Testando: ${test.title}`);

    // Procura o bloco da notícia
    const idMatch = new RegExp(`id:\\s*${test.id}[,\\s]`, 'g');
    if (!idMatch.test(dataContent)) {
        console.log(`   ❌ ID ${test.id} não encontrado`);
        return;
    }

    // Extrai o bloco
    const lines = dataContent.split('\n');
    let startIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`id: ${test.id}`)) {
            startIdx = i;
            break;
        }
    }

    if (startIdx === -1) {
        console.log('   ❌ Não encontrei o bloco');
        return;
    }

    const block = lines.slice(startIdx, startIdx + 40).join('\n');

    // Extrai internalImageUrl
    const internalMatch = block.match(/internalImageUrl:\s*['"]([^'"]+)['"]/);

    if (!internalMatch) {
        console.log('   ❌ internalImageUrl NÃO DEFINIDO no data.ts');
        return;
    }

    const internalPath = internalMatch[1];
    console.log(`   📸 internalImageUrl: ${internalPath}`);

    // Verifica se o arquivo existe
    const fullPath = path.join(__dirname, 'public', internalPath);
    if (!fs.existsSync(fullPath)) {
        console.log(`   ❌ ARQUIVO NÃO EXISTE: ${fullPath}`);
        return;
    }

    const stats = fs.statSync(fullPath);
    console.log(`   ✅ Arquivo existe (${(stats.size / 1024).toFixed(1)} KB)`);

    // Simula o que React faria
    console.log('\n   🧪 Simulação React:');
    console.log(`   → currentArticle.internalImageUrl = "${internalPath}"`);
    console.log(`   → if (currentArticle.internalImageUrl) { // TRUE`);
    console.log(`   →     setSecondaryImage("${internalPath}")`);
    console.log(`   → }`);
    console.log(`   → Resultado: secondaryImage = "${internalPath}"`);
    console.log(`   → Renderização: {secondaryImage && ( // TRUE`);
    console.log(`   →     <figure><img src="${internalPath}" /></figure>`);
    console.log(`   → )}`);
    console.log('   ✅ DEVE RENDERIZAR A IMAGEM');
});

console.log('\n\n3️⃣ VERIFICAÇÃO FINAL\n');

console.log('🔧 Passos para debug no navegador:');
console.log('   1. Abra http://localhost:3001');
console.log('   2. Clique na notícia "Polícia Civil incinera..."');
console.log('   3. Abra o DevTools (F12)');
console.log('   4. Vá em Console e digite:');
console.log('      → document.querySelector("figure img[src*=\\"operacao_pcpr\\"]")');
console.log('   5. Se retornar NULL → Imagem não está no DOM');
console.log('   6. Se retornar elemento → Imagem está lá (pode ser CSS escondendo)');
console.log('\n   7. Verifique também o Network tab:');
console.log('      → Procure por "operacao_pcpr_viaturas.png"');
console.log('      → Se aparecer com 200 OK → arquivo carregou');
console.log('      → Se aparecer com 404 → caminho errado');

console.log('\n💡 Se AINDA não aparecer após isso:');
console.log('   → Problema pode ser CACHE do Service Worker (PWA)');
console.log('   → Solução: Application tab → Clear storage → Clear site data');
