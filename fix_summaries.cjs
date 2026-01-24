
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Correção dos resumos cortados (...)
const updates = [
    {
        id: 1769112338, // Feirão CIAR (O que o usuário reclamou)
        summary: 'O polo industrial de Araucária (CIAR) realiza nesta sexta-feira um feirão de empregos com 300 vagas para os níveis técnico e operacional.'
    },
    {
        id: 1769112101, // Volta às aulas
        summary: 'A Secretaria de Educação iniciou a distribuição dos kits de material escolar e uniforme para todos os alunos da rede municipal.'
    },
    {
        id: 1769112325, // Defesa Civil
        summary: 'As fortes chuvas colocaram a Defesa Civil em estado de atenção. O monitoramento no Rio Iguaçu indica nível elevado, mas sob controle.'
    },
    {
        id: 1769112488, // Semáforo Inteligente
        summary: 'Motoristas que trafegam pela Av. Archelau já sentem a diferença com o novo sistema semafórico inteligente que reduz filas.'
    },
    {
        id: 1769112147, // Dengue
        summary: 'A Secretaria de Meio Ambiente emitiu um alerta sobre o aumento de focos do mosquito Aedes aegypti no bairro Costeira.'
    }
];

let updatedCount = 0;

updates.forEach(update => {
    // Regex para encontrar o summary dentro do bloco do ID
    // Procura: id: ID, ... title: ..., summary: 'ANTIGO',
    // O summary antigo pode ter aspas simples ou doubles e pode ter quebras de linha

    const regex = new RegExp(`(id:\\s*${update.id}[\\s\\S]*?summary:\\s*)(['"]|[\`])([\\s\\S]*?)(['"]|[\`])`, 'm');

    if (regex.test(content)) {
        content = content.replace(regex, (match, prefix, q1, oldSummary, q2) => {
            // Mantém o prefixo e troca só o miolo do summary
            return `${prefix}'${update.summary}'`;
        });
        updatedCount++;
        console.log(`Resumo da Notícia ID ${update.id} corrigido.`);
    } else {
        console.warn(`Não foi possível encontrar o resumo da Notícia ID ${update.id} para correção.`);
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`Sucesso! ${updatedCount} resumos foram corrigidos e não estão mais cortados.`);
} else {
    console.log('Nenhuma correção realizada.');
}

