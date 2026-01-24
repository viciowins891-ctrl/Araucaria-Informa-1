
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

const regex = /title:\s*['"`].*?Festival da Canção.*?['"`]/gi;
const matches = content.match(regex);

console.log('--- Ocorrências de "Festival da Canção" ---');
if (matches) {
    matches.forEach(m => console.log(m));
    console.log(`Total: ${matches.length}`);
} else {
    console.log('Nenhuma ocorrência encontrada.');
}

// Check IDs associated
const blocks = content.split('id:');
blocks.shift();
blocks.forEach(block => {
    if (block.match(/title:\s*['"`].*?Festival da Canção.*?['"`]/i)) {
        const idMatch = block.match(/^\s*(\d+)/);
        const imgMatch = block.match(/imageUrl:\s*['"`](.*?)['"`]/);
        console.log(`ID: ${idMatch[1]} - Imagem: ${imgMatch ? imgMatch[1] : 'Sem imagem'}`);
    }
});
