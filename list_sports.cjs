
const fs = require('fs');

const content = fs.readFileSync('data.ts', 'utf8');

// Gambiarra parsing: split by objects roughly
// Melhor: usar regex para capturar títulos onde category é Esporte.

// Regex captura bloco com categoria Esporte e extrai o título.
// Assumindo formato padrão.
const blocks = content.split('id:');
blocks.shift(); // remove lixo inicial

console.log(`Total items found by raw split: ${blocks.length}`);

blocks.forEach((block, index) => {
    if (block.includes("category: 'Esporte'") || block.includes('category: "Esporte"')) {
        const titleMatch = block.match(/title:\s*['"`](.*?)['"`]/);
        const idMatch = block.match(/^\s*(\d+)/); // o ID é o começo do bloco

        console.log(`[Esporte] ID: ${idMatch ? idMatch[1] : '???'} - Título: ${titleMatch ? titleMatch[1] : 'Sem título'}`);
    }
});
