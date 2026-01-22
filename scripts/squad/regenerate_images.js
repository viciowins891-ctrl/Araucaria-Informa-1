
import { runPhotographer } from './3_photographer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data.ts');

const articlesToProcess = [
    { id: 1769112101, title: 'Volta às aulas: Escolas recebem kits de material escolar', content: 'Secretaria de Educação... kits... alunos...' }, // Educação/Escola
    { id: 1769112147, title: 'SMMA alerta para aumento de casos de Dengue no Costeira', content: 'Dengue... mosquito... saúde...' }, // Saúde/Dengue
    { id: 1769112338, title: 'Feira de Empregos oferta 300 vagas no CIAR', content: 'Empregos... vagas... CIAR...' }, // Economia/Emprego
    { id: 1769112325, title: 'Defesa Civil monitora nível do Rio Iguaçu após chuvas de verão', content: 'Rio Iguaçu... chuvas... alagamento...' }, // Cidade/Chuva
    { id: 1769111662, title: 'Obras de pavimentação chegam ao Jardim Plínio', content: 'Pavimentação... asfalto... obras...' }, // Infraestrutura/Obras
    { id: 1769111830, title: 'Araucária Vôlei vence em casa e assume a liderança', content: 'Vôlei... esporte... ginásio...' }, // Esporte/Vôlei
    { id: 1769112488, title: 'Novo semáforo inteligente entra em operação na Archelau', content: 'Semáforo... trânsito... avenida...' } // Cidade/Trânsito
];

async function regenerate() {
    console.log("🍌 [Nano Banana Pro] Regenerating Images for 7 Articles...");

    let fileContent = fs.readFileSync(dataPath, 'utf-8');

    for (const article of articlesToProcess) {
        console.log(`\n📸 Processing: "${article.title}"`);

        // Call Nano Banana Pro
        const result = await runPhotographer(article);

        console.log(`   -> New Wide: ${result.imageUrl}`);
        console.log(`   -> New Close: ${result.internalImageUrl}`);

        // Regex Replace in file content
        // Strategy: Find the block for this ID, then replace the imageUrl and internalImageUrl lines within it.
        // However, regex matching across lines for specific IDs is tricky.
        // Simpler approach: Use a specific regex for the ID block, OR since the file is well formatted:
        // Match:  id: 12345, ... (scan until) ... imageUrl: 'OLD', ... internalImageUrl: 'OLD'

        const idRegex = new RegExp(`id:\\s*${article.id},[\\s\\S]*?imageUrl:\\s*'([^']*)'[\\s\\S]*?internalImageUrl:\\s*'([^']*)'`, 'm');

        // We need to capture the full match to replace just the URLs inside it, OR replace the specific lines.
        // Let's try replacing the specific unique URLs if possible, but old URLs might be duplicates or generic fallbacks.
        // Better: Construct a regex that matches the specific lines *after* the ID match.

        // 1. Find the start index of the ID
        const idMatch = fileContent.match(new RegExp(`id:\\s*${article.id},`));
        if (!idMatch) {
            console.error(`   ❌ ID ${article.id} not found in file.`);
            continue;
        }

        const startIndex = idMatch.index;

        // 2. Find the next 'imageUrl:' after start index
        const imgUrlIndex = fileContent.indexOf('imageUrl:', startIndex);
        const internalImgUrlIndex = fileContent.indexOf('internalImageUrl:', startIndex);

        // Safety check: ensure they belong to this article (e.g. are before the next 'id:')
        const nextIdIndex = fileContent.indexOf('id:', startIndex + 10);

        if (nextIdIndex !== -1 && (imgUrlIndex > nextIdIndex || internalImgUrlIndex > nextIdIndex)) {
            console.error("   ❌ Indices out of bounds (found URL in next article).");
            continue;
        }

        // 3. Replace lines
        // We will perform replacements on the substring to ensure safety, then stitch back.
        // Actually, let's just use string replacement on the chunk.

        const chunkEnd = nextIdIndex !== -1 ? nextIdIndex : fileContent.length;
        let chunk = fileContent.substring(startIndex, chunkEnd);

        // Modify chunk
        const newChunk = chunk
            .replace(/imageUrl:\s*'[^']*'/, `imageUrl: '${result.imageUrl}'`)
            .replace(/internalImageUrl:\s*'[^']*'/, `internalImageUrl: '${result.internalImageUrl}'`)
            // Update fallback too for consistency
            .replace(/mobileImageUrl:\s*'[^']*'/, `mobileImageUrl: '${result.imageUrl}'`);

        // Stitch
        fileContent = fileContent.substring(0, startIndex) + newChunk + fileContent.substring(chunkEnd);
        console.log("   ✅ File Updated in memory.");
    }

    fs.writeFileSync(dataPath, fileContent, 'utf-8');
    console.log("\n💾 data.ts Saved Successfully!");
}

regenerate();
