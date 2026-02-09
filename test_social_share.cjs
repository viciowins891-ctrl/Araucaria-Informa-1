#!/usr/bin/env node
/**
 * 🧪 TESTE DE COMPARTILHAMENTO SOCIAL
 * Verifica se as imagens e meta tags estão corretas para WhatsApp/Facebook
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 ========================================');
console.log('   TESTE DE COMPARTILHAMENTO SOCIAL');
console.log('========================================\n');

const results = {
    passed: [],
    failed: [],
    warnings: []
};

// ============================================
// TESTE 1: Verificar arquivos de imagem
// ============================================
console.log('📸 [1/4] Verificando arquivos de imagem...\n');

const images = [
    { file: 'public/images/share_jobs.jpg', context: 'Vagas de Emprego', minSize: 50000 },
    { file: 'public/images/share_services.jpg', context: 'Serviços', minSize: 50000 }
];

images.forEach(img => {
    if (fs.existsSync(img.file)) {
        const stats = fs.statSync(img.file);
        const sizeKB = (stats.size / 1024).toFixed(1);

        if (stats.size >= img.minSize) {
            results.passed.push(`✅ ${img.context}: ${img.file} (${sizeKB}KB) - Tamanho adequado`);
        } else {
            results.warnings.push(`⚠️ ${img.context}: ${img.file} (${sizeKB}KB) - Imagem pequena demais`);
        }
    } else {
        results.failed.push(`❌ ${img.context}: ${img.file} - Arquivo não encontrado!`);
    }
});

// ============================================
// TESTE 2: Verificar meta tags em vagas.html
// ============================================
console.log('\n🏷️ [2/4] Verificando meta tags em vagas.html...\n');

const vagasHtml = 'public/vagas.html';
if (fs.existsSync(vagasHtml)) {
    const content = fs.readFileSync(vagasHtml, 'utf8');

    const checks = [
        { tag: 'og:title', regex: /<meta property="og:title" content="([^"]+)"/, context: 'Título OG' },
        { tag: 'og:description', regex: /<meta property="og:description"[\s\S]*?content="([^"]+)"/, context: 'Descrição OG' },
        { tag: 'og:image', regex: /<meta property="og:image" content="([^"]+share_jobs\.jpg[^"]*)"/, context: 'Imagem OG' },
        { tag: 'twitter:image', regex: /<meta property="twitter:image" content="([^"]+share_jobs\.jpg[^"]*)"/, context: 'Imagem Twitter' }
    ];

    checks.forEach(check => {
        const match = content.match(check.regex);
        if (match) {
            results.passed.push(`✅ vagas.html - ${check.context}: "${match[1]}"`);
        } else {
            results.failed.push(`❌ vagas.html - ${check.context} não encontrado ou incorreto`);
        }
    });
} else {
    results.failed.push(`❌ Arquivo vagas.html não encontrado!`);
}

// ============================================
// TESTE 3: Verificar meta tags em servicos.html
// ============================================
console.log('\n🏷️ [3/4] Verificando meta tags em servicos.html...\n');

const servicosHtml = 'public/servicos.html';
if (fs.existsSync(servicosHtml)) {
    const content = fs.readFileSync(servicosHtml, 'utf8');

    const checks = [
        { tag: 'og:title', regex: /<meta property="og:title" content="([^"]+)"/, context: 'Título OG' },
        { tag: 'og:description', regex: /<meta property="og:description"[\s\S]*?content="([^"]+)"/, context: 'Descrição OG' },
        { tag: 'og:image', regex: /<meta property="og:image" content="([^"]+share_services\.jpg[^"]*)"/, context: 'Imagem OG' },
        { tag: 'twitter:image', regex: /<meta property="twitter:image" content="([^"]+share_services\.jpg[^"]*)"/, context: 'Imagem Twitter' }
    ];

    checks.forEach(check => {
        const match = content.match(check.regex);
        if (match) {
            results.passed.push(`✅ servicos.html - ${check.context}: "${match[1]}"`);
        } else {
            results.failed.push(`❌ servicos.html - ${check.context} não encontrado ou incorreto`);
        }
    });
} else {
    results.failed.push(`❌ Arquivo servicos.html não encontrado!`);
}

// ============================================
// TESTE 4: Verificar URLs completas
// ============================================
console.log('\n🌐 [4/4] Verificando URLs completas...\n');

const urlTests = [
    { file: vagasHtml, expectedUrl: 'https://araucariainforma.com/images/share_jobs.jpg', context: 'Vagas' },
    { file: servicosHtml, expectedUrl: 'https://araucariainforma.com/images/share_services.jpg', context: 'Serviços' }
];

urlTests.forEach(test => {
    if (fs.existsSync(test.file)) {
        const content = fs.readFileSync(test.file, 'utf8');
        if (content.includes(test.expectedUrl)) {
            results.passed.push(`✅ ${test.context} - URL completa correta: ${test.expectedUrl}`);
        } else {
            results.warnings.push(`⚠️ ${test.context} - URL pode estar usando caminho relativo`);
        }
    }
});

// ============================================
// RELATÓRIO FINAL
// ============================================
console.log('\n\n🌲 ========================================');
console.log('   RELATÓRIO DE TESTES');
console.log('========================================\n');

console.log(`✅ PASSOU: ${results.passed.length}`);
console.log(`❌ FALHOU: ${results.failed.length}`);
console.log(`⚠️ AVISOS: ${results.warnings.length}\n`);

if (results.failed.length > 0) {
    console.log('❌ TESTES FALHADOS:');
    results.failed.forEach(fail => console.log(`   ${fail}`));
    console.log('');
}

if (results.warnings.length > 0) {
    console.log('⚠️ AVISOS:');
    results.warnings.forEach(warn => console.log(`   ${warn}`));
    console.log('');
}

console.log('✅ TESTES BEM-SUCEDIDOS:');
results.passed.forEach(pass => console.log(`   ${pass}`));

console.log('\n========================================');

// ============================================
// INSTRUÇÕES DE TESTE MANUAL
// ============================================
console.log('\n📱 COMO TESTAR NO WHATSAPP:\n');
console.log('1. Acesse: https://araucariainforma.com/vagas');
console.log('   Copie o link e cole no WhatsApp');
console.log('   Deve aparecer: Imagem de aperto de mãos\n');

console.log('2. Acesse: https://araucariainforma.com/servicos');
console.log('   Copie o link e cole no WhatsApp');
console.log('   Deve aparecer: Imagem do ponto de ônibus Triar\n');

console.log('🔧 FERRAMENTAS DE DEBUG:\n');
console.log('• Facebook Debugger: https://developers.facebook.com/tools/debug/');
console.log('• LinkedIn Inspector: https://www.linkedin.com/post-inspector/');
console.log('• Twitter Card Validator: https://cards-dev.twitter.com/validator\n');

console.log('💡 DICA: Se a imagem não aparecer, limpe o cache:');
console.log('   - WhatsApp: Aguarde 24h ou use o Facebook Debugger');
console.log('   - Facebook: Use o Debugger e clique em "Scrape Again"\n');

console.log('========================================\n');

// Status final
if (results.failed.length === 0) {
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('   As imagens de compartilhamento estão configuradas corretamente.\n');
    process.exit(0);
} else {
    console.log('❌ ALGUNS TESTES FALHARAM');
    console.log('   Corrija os erros antes de fazer deploy.\n');
    process.exit(1);
}
