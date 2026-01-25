const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNÓSTICO DE IMAGENS INTERNAS\n');

// Lê o data.ts
const dataPath = path.join(__dirname, 'data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Notícias problemáticas mencionadas pelo usuário
const problematicTitles = [
    'Governador inaugura unidade do Poupatempo em Araucária',
    'Polícia Civil incinera 114 kg de drogas apreendidas na região',
    'Orçamento Municipal para 2026 deve chegar a R$ 2,3 bilhões',
    'Araucária zera fila de espera por vagas em CMEIs para 2025'
];

console.log('📋 Notícias a verificar:');
problematicTitles.forEach((title, i) => console.log(`   ${i + 1}. ${title}`));
console.log('');

// Busca cada notícia no arquivo
const issues = [];

problematicTitles.forEach(title => {
    console.log(`\n🔎 Buscando: "${title}"`);

    // Tenta encontrar a notícia
    const titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleRegex = new RegExp(titleEscaped, 'i');

    if (!titleRegex.test(dataContent)) {
        console.log(`   ❌ NÃO ENCONTRADA no data.ts`);
        issues.push({ title, issue: 'NOTÍCIA NÃO EXISTE' });
        return;
    }

    console.log(`   ✅ Encontrada no data.ts`);

    // Tenta extrair o bloco da notícia
    const lines = dataContent.split('\n');
    let startIdx = -1;

    for (let i = 0; i < lines.length; i++) {
        if (titleRegex.test(lines[i])) {
            startIdx = i;
            break;
        }
    }

    if (startIdx === -1) {
        console.log(`   ⚠️ Não consegui extrair bloco`);
        return;
    }

    // Pega as próximas ~30 linhas para análise
    const block = lines.slice(startIdx, startIdx + 30).join('\n');

    // Verifica imageUrl
    const imageUrlMatch = block.match(/imageUrl:\s*['"]([^'"]+)['"]/);
    const internalImageMatch = block.match(/internalImageUrl:\s*['"]([^'"]+)['"]/);

    if (!imageUrlMatch) {
        console.log(`   ⚠️ imageUrl não encontrado`);
    } else {
        console.log(`   📸 imageUrl: ${imageUrlMatch[1]}`);
    }

    if (!internalImageMatch) {
        console.log(`   ❌ internalImageUrl NÃO CONFIGURADO`);
        issues.push({ title, issue: 'FALTA internalImageUrl' });
    } else {
        const internalPath = internalImageMatch[1];
        console.log(`   📸 internalImageUrl: ${internalPath}`);

        // Verifica se o arquivo existe
        const fullPath = path.join(__dirname, 'public', internalPath);
        if (!fs.existsSync(fullPath)) {
            console.log(`   ❌ ARQUIVO NÃO EXISTE: ${fullPath}`);
            issues.push({ title, issue: `ARQUIVO FALTANDO: ${internalPath}` });
        } else {
            console.log(`   ✅ Arquivo existe: ${fullPath}`);

            // Verifica se é igual ao imageUrl
            if (imageUrlMatch && imageUrlMatch[1] === internalPath) {
                console.log(`   ⚠️ DUPLICADO: imageUrl === internalImageUrl`);
                console.log(`      (Isso está OK agora que consertamos o ArticlePage.tsx)`);
            }
        }
    }
});

console.log('\n\n📊 RESUMO:\n');

if (issues.length === 0) {
    console.log('✅ TODAS AS NOTÍCIAS ESTÃO CONFIGURADAS CORRETAMENTE!');
    console.log('\n💡 Se ainda não aparecem no site:');
    console.log('   1. Limpe o cache do navegador (Ctrl+Shift+R)');
    console.log('   2. Verifique se o servidor dev foi reiniciado após a correção');
    console.log('   3. Acesse http://localhost:3001 em aba anônima');
} else {
    console.log(`❌ ENCONTRADOS ${issues.length} PROBLEMAS:\n`);
    issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue.title}`);
        console.log(`      → ${issue.issue}\n`);
    });
}

console.log('\n🔧 Próximos passos recomendados:');
console.log('   - Se faltam internalImageUrl: Adicionar manualmente ao data.ts');
console.log('   - Se faltam arquivos: Gerar/copiar as imagens para /public/images/');
console.log('   - Executar: npm run dev (restart do servidor)');
