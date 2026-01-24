
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Regex para capturar todos os summaries
// summary: "texto", ou summary: 'texto',
const regex = /id:\s*(\d+).*?summary:\s*(['"`])([\s\S]*?)\2/gs;

let match;
let foundIssues = false;

console.log("Verificando resumos cortados ou suspeitos...\n");

while ((match = regex.exec(content)) !== null) {
    const id = match[1];
    const quote = match[2];
    let summary = match[3].trim();

    // Verifica se termina com "..." ou se não termina com pontuação final
    if (summary.endsWith('...') || summary.endsWith('…')) {
        console.log(`[SUSPEITO] ID ${id}: Termina com reticências.`);
        console.log(`   Texto: "${summary}"\n`);
        foundIssues = true;
    } else if (!/[.!?]$/.test(summary)) {
        // Às vezes o summary pode ser curto e não ter ponto, mas geralmente em news tem.
        console.log(`[AVISO] ID ${id}: Não termina com pontuação final.`);
        console.log(`   Texto: "${summary}"\n`);
        // foundIssues = true; // Decidir se conta como issue crítica. Vamos considerar aviso.
    }
}

if (!foundIssues) {
    console.log("Nenhum resumo terminado explicitamente com '...' foi encontrado.");
}

