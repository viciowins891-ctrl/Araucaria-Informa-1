#!/usr/bin/env node
/**
 * 🔍 DEBUG COMPLETO - ARAUCÁRIA INFORMA
 * Script minucioso para verificar integridade do site
 */

const fs = require('fs');
const path = require('path');

console.log('🌲 ========================================');
console.log('🔍 DEBUG COMPLETO - ARAUCÁRIA INFORMA');
console.log('========================================\n');

const results = {
    errors: [],
    warnings: [],
    success: []
};

// ============================================
// 1. VERIFICAÇÃO DE ESTRUTURA DE ARQUIVOS
// ============================================
console.log('📁 [1/7] Verificando estrutura de arquivos...');

const criticalFiles = [
    'package.json',
    'vite.config.ts',
    'index.html',
    'App.tsx',
    'data.ts',
    '.env',
    'vercel.json'
];

const criticalDirs = [
    'components',
    'pages',
    'public',
    'scripts',
    'services'
];

criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        results.success.push(`✅ Arquivo encontrado: ${file}`);
    } else {
        results.errors.push(`❌ Arquivo FALTANDO: ${file}`);
    }
});

criticalDirs.forEach(dir => {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        results.success.push(`✅ Diretório encontrado: ${dir}/`);
    } else {
        results.errors.push(`❌ Diretório FALTANDO: ${dir}/`);
    }
});

// ============================================
// 2. VERIFICAÇÃO DE DEPENDÊNCIAS
// ============================================
console.log('\n📦 [2/7] Verificando dependências...');

try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const nodeModulesExists = fs.existsSync('node_modules');

    if (nodeModulesExists) {
        results.success.push('✅ node_modules instalado');
    } else {
        results.warnings.push('⚠️ node_modules não encontrado - execute: npm install');
    }

    const criticalDeps = [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'vite'
    ];

    criticalDeps.forEach(dep => {
        if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
            results.success.push(`✅ Dependência: ${dep}`);
        } else {
            results.errors.push(`❌ Dependência FALTANDO: ${dep}`);
        }
    });
} catch (e) {
    results.errors.push(`❌ Erro ao ler package.json: ${e.message}`);
}

// ============================================
// 3. VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE
// ============================================
console.log('\n🔐 [3/7] Verificando variáveis de ambiente...');

const envFiles = ['.env', '.env.local', '.env.production.local'];
let envFound = false;

envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
        envFound = true;
        const content = fs.readFileSync(envFile, 'utf8');

        const requiredVars = [
            'VITE_SUPABASE_URL',
            'VITE_SUPABASE_ANON_KEY'
        ];

        requiredVars.forEach(varName => {
            if (content.includes(varName)) {
                results.success.push(`✅ ${envFile}: ${varName} configurado`);
            } else {
                results.warnings.push(`⚠️ ${envFile}: ${varName} não encontrado`);
            }
        });
    }
});

if (!envFound) {
    results.errors.push('❌ Nenhum arquivo .env encontrado!');
}

// ============================================
// 4. VERIFICAÇÃO DE IMAGENS
// ============================================
console.log('\n🖼️ [4/7] Verificando integridade de imagens...');

const imageDir = 'public/images';
if (fs.existsSync(imageDir)) {
    const images = fs.readdirSync(imageDir).filter(f =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
    );

    results.success.push(`✅ ${images.length} imagens encontradas em public/images/`);

    // Verificar imagens críticas
    const criticalImages = [
        'logo.png',
        'share_jobs.jpg',
        'share_services.jpg'
    ];

    criticalImages.forEach(img => {
        const imgPath = path.join(imageDir, img);
        if (fs.existsSync(imgPath)) {
            const stats = fs.statSync(imgPath);
            if (stats.size > 0) {
                results.success.push(`✅ Imagem crítica OK: ${img} (${(stats.size / 1024).toFixed(1)}KB)`);
            } else {
                results.errors.push(`❌ Imagem vazia: ${img}`);
            }
        } else {
            results.warnings.push(`⚠️ Imagem crítica não encontrada: ${img}`);
        }
    });
} else {
    results.errors.push('❌ Diretório public/images/ não encontrado!');
}

// ============================================
// 5. VERIFICAÇÃO DE DATA.TS
// ============================================
console.log('\n📰 [5/7] Verificando data.ts (notícias)...');

try {
    const dataPath = 'data.ts';
    if (fs.existsSync(dataPath)) {
        const content = fs.readFileSync(dataPath, 'utf8');
        const stats = fs.statSync(dataPath);

        results.success.push(`✅ data.ts encontrado (${(stats.size / 1024).toFixed(1)}KB)`);

        // Verificar se tem notícias
        const newsMatches = content.match(/export const newsData/g);
        if (newsMatches) {
            results.success.push('✅ newsData exportado corretamente');
        } else {
            results.warnings.push('⚠️ newsData não encontrado em data.ts');
        }

        // Contar aproximadamente quantas notícias
        const idMatches = content.match(/id:\s*['"`]\d+['"`]/g);
        if (idMatches) {
            results.success.push(`✅ Aproximadamente ${idMatches.length} notícias no data.ts`);
        }
    } else {
        results.errors.push('❌ data.ts não encontrado!');
    }
} catch (e) {
    results.errors.push(`❌ Erro ao verificar data.ts: ${e.message}`);
}

// ============================================
// 6. VERIFICAÇÃO DE ROTAS
// ============================================
console.log('\n🛣️ [6/7] Verificando configuração de rotas...');

try {
    const appPath = 'App.tsx';
    if (fs.existsSync(appPath)) {
        const content = fs.readFileSync(appPath, 'utf8');

        const routes = ['/', '/noticia', '/vagas', '/servicos'];
        routes.forEach(route => {
            if (content.includes(`path="${route}"`) || content.includes(`path='${route}'`)) {
                results.success.push(`✅ Rota configurada: ${route}`);
            } else {
                results.warnings.push(`⚠️ Rota não encontrada: ${route}`);
            }
        });
    }
} catch (e) {
    results.warnings.push(`⚠️ Erro ao verificar rotas: ${e.message}`);
}

// ============================================
// 7. VERIFICAÇÃO DE BUILD
// ============================================
console.log('\n🏗️ [7/7] Verificando configuração de build...');

try {
    const viteConfig = 'vite.config.ts';
    if (fs.existsSync(viteConfig)) {
        results.success.push('✅ vite.config.ts encontrado');
    }

    const vercelJson = 'vercel.json';
    if (fs.existsSync(vercelJson)) {
        const content = JSON.parse(fs.readFileSync(vercelJson, 'utf8'));
        results.success.push('✅ vercel.json configurado');

        if (content.rewrites) {
            results.success.push(`✅ ${content.rewrites.length} rewrites configurados`);
        }
    }
} catch (e) {
    results.warnings.push(`⚠️ Erro ao verificar build: ${e.message}`);
}

// ============================================
// RELATÓRIO FINAL
// ============================================
console.log('\n\n🌲 ========================================');
console.log('📊 RELATÓRIO FINAL DO DEBUG');
console.log('========================================\n');

console.log(`✅ SUCESSOS: ${results.success.length}`);
console.log(`⚠️ AVISOS: ${results.warnings.length}`);
console.log(`❌ ERROS: ${results.errors.length}\n`);

if (results.errors.length > 0) {
    console.log('❌ ERROS CRÍTICOS:');
    results.errors.forEach(err => console.log(`   ${err}`));
    console.log('');
}

if (results.warnings.length > 0) {
    console.log('⚠️ AVISOS:');
    results.warnings.forEach(warn => console.log(`   ${warn}`));
    console.log('');
}

console.log('✅ VERIFICAÇÕES BEM-SUCEDIDAS:');
results.success.slice(0, 10).forEach(succ => console.log(`   ${succ}`));
if (results.success.length > 10) {
    console.log(`   ... e mais ${results.success.length - 10} verificações OK`);
}

console.log('\n========================================');

// Status final
if (results.errors.length === 0) {
    console.log('✅ SITE PRONTO PARA EXECUÇÃO!');
    console.log('   Execute: npm run dev');
    process.exit(0);
} else {
    console.log('❌ CORRIJA OS ERROS ANTES DE CONTINUAR');
    process.exit(1);
}
