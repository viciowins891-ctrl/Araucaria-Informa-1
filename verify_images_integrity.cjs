
const fs = require('fs');
const path = require('path');

// Read data.ts manually because we can't import TypeScript directly in this simple script 
// without compilation, so we'll use regex to extract image paths.
const dataPath = path.join(__dirname, 'data.ts');
const publicImagesPath = path.join(__dirname, 'public', 'images');

const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Regex to find all imageUrl, mobileImageUrl, internalImageUrl
const regex = /(?:imageUrl|mobileImageUrl|internalImageUrl):\s*['"](\/images\/[^'"]+)['"]/g;

let match;
const missingFiles = [];
const foundFiles = new Set();
const allPaths = new Set();

while ((match = regex.exec(dataContent)) !== null) {
    const relativePath = match[1].split('?')[0]; // Strip query params like ?v=123
    allPaths.add(relativePath);

    // Remove leading slash for filesystem check
    const fileName = relativePath.replace(/^\/images\//, '');
    const fullPath = path.join(publicImagesPath, fileName);

    if (!fs.existsSync(fullPath)) {
        missingFiles.push({
            path: relativePath,
            context: dataContent.substring(Math.max(0, match.index - 50), Math.min(dataContent.length, match.index + 100)).trim()
        });
    } else {
        foundFiles.add(relativePath);
    }
}

console.log('--- RELATÓRIO DE IMAGENS FALTANTES ---');
if (missingFiles.length === 0) {
    console.log('Nenhuma imagem faltando! Tudo 100%.');
} else {
    console.log(`Encontradas ${missingFiles.length} referencias para imagens inexistentes:`);
    missingFiles.forEach(item => {
        console.log(`\n❌ FALTANDO: ${item.path}`);
        console.log(`   Contexto: ...${item.context.replace(/\s+/g, ' ')}...`);
    });
}
console.log('\n--- FIM DO RELATÓRIO ---');
