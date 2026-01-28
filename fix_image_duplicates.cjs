const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Mapeamento de correções específicas
const fixes = [
    // 1. Volta às Aulas - usar imagem interna diferente
    {
        id: '1769112101',
        newInternal: '/images/volta-aulas-kits-interna-v2.png',
        reason: 'Cover = Internal'
    },
    // 2. Ginásio Joval - usar imagem interna diferente
    {
        id: '1769008352',
        newInternal: '/images/gym_interior_renovation.png',
        reason: 'Cover = Internal'
    },
    // 3. Limpeza do Rio - usar imagem específica de limpeza
    {
        id: '1769012743',
        newInternal: '/images/limpeza_rio_iguacu_real.jpg',
        reason: 'Compartilhando imagem com Tapa-Buracos'
    },
    // 4. Torneio de Xadrez - usar imagem específica de xadrez
    {
        id: '1769013037',
        newInternal: '/images/news_chess_inner_araucaria.png',
        reason: 'Usando imagem de orçamento'
    },
    // 5. Rota de Turismo Rural - usar imagem específica de turismo
    {
        id: '1769014746',
        newInternal: '/images/rural_tourism_araucaria_path.png',
        reason: 'Compartilhando pinhão com 4 artigos'
    },
    // 6. Araucária Futsal - usar imagem de futsal
    {
        id: '1769016347',
        newInternal: '/images/araucaria_futsal_real.jpg',
        reason: 'Compartilhando pinhão'
    },
    // 7. Sessão Ordinária da Câmara - usar imagem da câmara
    {
        id: '1769019227',
        newInternal: '/images/news_budget_chamber.png',
        reason: 'Compartilhando pinhão'
    },
    // 8. Dia D Multivacinação - usar imagem específica
    {
        id: '3',
        newInternal: '/images/vacinacao_campanha_interna.png',
        reason: 'Compartilhando com VSR'
    },
    // 9. Mutirão SINE - usar imagem diferente de emprego
    {
        id: '4',
        newInternal: '/images/logistica_vagas_internal.jpg',
        reason: 'Compartilhando com CIAR'
    }
];

console.log('\n=== CORRIGINDO DUPLICAÇÕES DE IMAGENS ===\n');

let fixCount = 0;

fixes.forEach(fix => {
    // Regex para encontrar o artigo pelo ID e capturar a linha do internalImageUrl
    const regex = new RegExp(
        `(id:\\s*${fix.id},[\\s\\S]*?internalImageUrl:\\s*['"])([^'"]+)(['"])`,
        'g'
    );

    const match = regex.exec(content);
    if (match) {
        const oldUrl = match[2];
        console.log(`✓ ID ${fix.id}:`);
        console.log(`  Motivo: ${fix.reason}`);
        console.log(`  Antiga: ${oldUrl}`);
        console.log(`  Nova: ${fix.newInternal}`);

        // Substitui apenas para este artigo específico
        content = content.replace(
            new RegExp(`(id:\\s*${fix.id},[\\s\\S]*?internalImageUrl:\\s*['"])${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
            `$1${fix.newInternal}$2`
        );

        fixCount++;
        console.log('');
    } else {
        console.log(`✗ ID ${fix.id} não encontrado\n`);
    }
});

// Salva o arquivo atualizado
fs.writeFileSync(dataPath, content, 'utf-8');

console.log(`\n=== CONCLUÍDO: ${fixCount}/${fixes.length} correções aplicadas ===\n`);
