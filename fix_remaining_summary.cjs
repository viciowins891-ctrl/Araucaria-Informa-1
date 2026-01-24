
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Correção dos resumos cortados restantes
const updates = [
    {
        id: 1769111662, // Pavimentação Jd Plínio
        summary: 'Máquinas da Prefeitura iniciaram o asfaltamento das ruas principais do Jardim Plínio. A obra, aguardada há 10 anos, trará dignidade aos moradores.'
    }
];

let updatedCount = 0;

updates.forEach(update => {
    const regex = new RegExp(`(id:\\s*${update.id}[\\s\\S]*?summary:\\s*)(['"]|[\`])([\\s\\S]*?)(['"]|[\`])`, 'm');

    if (regex.test(content)) {
        content = content.replace(regex, (match, prefix, q1, oldSummary, q2) => {
            return `${prefix}'${update.summary}'`;
        });
        updatedCount++;
        console.log(`Resumo da Notícia ID ${update.id} corrigido.`);
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`Sucesso! ${updatedCount} resumo(s) restante(s) corrigido(s).`);
} else {
    console.log('Nenhuma correção realizada.');
}

