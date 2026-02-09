#!/usr/bin/env node
/**
 * 🧪 TESTE DE REDIRECIONAMENTO
 * Verifica se os scripts de redirecionamento estão corretos
 */

const fs = require('fs');

console.log('🧪 ========================================');
console.log('   TESTE DE REDIRECIONAMENTO');
console.log('========================================\n');

const results = {
    passed: [],
    failed: []
};

// ============================================
// TESTE 1: Verificar script em vagas.html
// ============================================
console.log('🔀 [1/2] Verificando redirecionamento em vagas.html...\n');

const vagasHtml = 'public/vagas.html';
if (fs.existsSync(vagasHtml)) {
    const content = fs.readFileSync(vagasHtml, 'utf8');

    // Verifica se tem o script de redirecionamento
    if (content.includes("window.location.hash !== '#/vagas'")) {
        results.passed.push('✅ vagas.html - Script de redirecionamento encontrado');
    } else {
        results.failed.push('❌ vagas.html - Script de redirecionamento NÃO encontrado');
    }

    // Verifica se redireciona para a rota correta
    if (content.includes("window.location.replace('/#/vagas')")) {
        results.passed.push('✅ vagas.html - Redireciona para /#/vagas');
    } else {
        results.failed.push('❌ vagas.html - Redirecionamento incorreto');
    }
} else {
    results.failed.push('❌ Arquivo vagas.html não encontrado!');
}

// ============================================
// TESTE 2: Verificar script em servicos.html
// ============================================
console.log('\n🔀 [2/2] Verificando redirecionamento em servicos.html...\n');

const servicosHtml = 'public/servicos.html';
if (fs.existsSync(servicosHtml)) {
    const content = fs.readFileSync(servicosHtml, 'utf8');

    // Verifica se tem o script de redirecionamento
    if (content.includes("window.location.hash !== '#/servicos'")) {
        results.passed.push('✅ servicos.html - Script de redirecionamento encontrado');
    } else {
        results.failed.push('❌ servicos.html - Script de redirecionamento NÃO encontrado');
    }

    // Verifica se redireciona para a rota correta
    if (content.includes("window.location.replace('/#/servicos')")) {
        results.passed.push('✅ servicos.html - Redireciona para /#/servicos');
    } else {
        results.failed.push('❌ servicos.html - Redirecionamento incorreto');
    }
} else {
    results.failed.push('❌ Arquivo servicos.html não encontrado!');
}

// ============================================
// RELATÓRIO FINAL
// ============================================
console.log('\n\n🌲 ========================================');
console.log('   RELATÓRIO DE TESTES');
console.log('========================================\n');

console.log(`✅ PASSOU: ${results.passed.length}`);
console.log(`❌ FALHOU: ${results.failed.length}\n`);

if (results.failed.length > 0) {
    console.log('❌ TESTES FALHADOS:');
    results.failed.forEach(fail => console.log(`   ${fail}`));
    console.log('');
}

console.log('✅ TESTES BEM-SUCEDIDOS:');
results.passed.forEach(pass => console.log(`   ${pass}`));

console.log('\n========================================');

// ============================================
// INSTRUÇÕES DE TESTE MANUAL
// ============================================
console.log('\n📱 COMO TESTAR:\n');
console.log('1. Acesse: https://araucariainforma.com/vagas');
console.log('   Deve redirecionar para: https://araucariainforma.com/#/vagas');
console.log('   E mostrar a página de VAGAS DE EMPREGO\n');

console.log('2. Acesse: https://araucariainforma.com/servicos');
console.log('   Deve redirecionar para: https://araucariainforma.com/#/servicos');
console.log('   E mostrar a página de SERVIÇOS\n');

console.log('💡 IMPORTANTE:');
console.log('   - O redirecionamento é INSTANTÂNEO');
console.log('   - Funciona mesmo com cache do WhatsApp');
console.log('   - Preserva as meta tags para compartilhamento\n');

console.log('========================================\n');

// Status final
if (results.failed.length === 0) {
    console.log('✅ TODOS OS REDIRECIONAMENTOS CONFIGURADOS!');
    console.log('   Os links compartilhados vão direto para as páginas corretas.\n');
    process.exit(0);
} else {
    console.log('❌ ALGUNS REDIRECIONAMENTOS FALHARAM');
    console.log('   Corrija os erros antes de fazer deploy.\n');
    process.exit(1);
}
