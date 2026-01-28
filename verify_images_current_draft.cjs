const fs = require('fs');
const path = require('path');

// Read data.ts to extract image paths
const dataPath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const imageRegex = /(imageUrl|internalImageUrl|mobileImageUrl):\s*['"]([^'"]+)['"]/g;
let match;
const missingImages = [];

console.log('--- Verificando Integridade das Imagens em data.ts ---');

while ((match = imageRegex.exec(content)) !== null) {
    const key = match[1];
    const imgPath = match[2];

    // Skip external URLs or base64
    if (imgPath.startsWith('http') || imgPath.startsWith('data:')) continue;

    // Remove query params for checking file existence (e.g., ?v=final)
    const cleanPath = imgPath.split('?')[0];

    // Construct local path (assuming public folder structure)
    const localPath = path.join(__dirname, 'public', cleanPath);

    if (!fs.existsSync(localPath)) {
        missingImages.push({ key, path: imgPath });
        console.log(`[MISSING] ${key}: ${imgPath}`);
    }
}

if (missingImages.length === 0) {
    console.log('--- SUCESSO: Todas as imagens referenciadas existem! ---');
} else {
    console.log(`--- ATENÇÃO: Encontradas ${missingImages.length} imagens faltando! ---`);
    console.log('Essas imagens quebradas fariam aparecer o fallback da "datilografia".');
}
