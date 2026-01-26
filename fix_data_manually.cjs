
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');
const publicDir = path.join(__dirname, 'public/images');
const publicFiles = fs.readdirSync(publicDir);

// Manual map for specific corrections requested by user context
const manualOverrides = {
    // Saude Recorde -> Imagem interna de atendimento real
    '1769252001': 'saude_atendimento_interno.png',

    // Vôlei -> Ação de jogo
    '1769253501': 'araucaria_volei_match_action.png',

    // Criança Segura -> Vou tentar achar uma diferente da capa. 
    // Se não tiver, mantém a atual por enquanto para não gerar aleatório.
};

const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match) => {
    const idMatch = match.match(/id:\s*(\d+)/);
    if (!idMatch) return match;
    const id = idMatch[1];

    if (manualOverrides[id]) {
        if (fs.existsSync(path.join(publicDir, manualOverrides[id]))) {
            if (match.includes('internalImageUrl:')) {
                return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '/images/${manualOverrides[id]}'`);
            } else {
                return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '/images/${manualOverrides[id]}',`);
            }
        }
    }

    // Auto-fix for duplicates: If internal == cover (same filename or content logic), try to find a better one
    const coverMatch = match.match(/imageUrl:\s*['"]\/images\/([^'"]+)['"]/);
    const internalMatch = match.match(/internalImageUrl:\s*['"]\/images\/([^'"]+)['"]/);

    if (coverMatch && internalMatch) {
        const coverFile = coverMatch[1];
        const internalFile = internalMatch[1];
        const coverPath = path.join(publicDir, coverFile);
        const internalPath = path.join(publicDir, internalFile);

        let isDuplicate = false;
        try {
            if (coverFile === internalFile) isDuplicate = true;
            else if (fs.statSync(coverPath).size === fs.statSync(internalPath).size) isDuplicate = true;
        } catch (e) { }

        if (isDuplicate) {
            // Try to find a file that contains part of the name but ends with _internal, _real, etc AND has different size
            const baseName = path.basename(coverFile, path.extname(coverFile))
                .replace('_mobile', '')
                .replace('-capa', '')
                .replace('_cover', '');

            const candidates = publicFiles.filter(f =>
                (f.includes(baseName) || baseName.includes(f.split('.')[0])) &&
                f !== coverFile &&
                !f.includes('mobile') &&
                (f.includes('internal') || f.includes('interna') || f.includes('action') || f.includes('detail'))
            );

            // Filter by size difference
            const validCandidates = candidates.filter(f => {
                try {
                    return fs.statSync(path.join(publicDir, f)).size !== fs.statSync(coverPath).size;
                } catch (e) { return false; }
            });

            if (validCandidates.length > 0) {
                // Sort by length to find most specific, or prioritize 'internal'
                validCandidates.sort((a, b) => {
                    const aScore = a.includes('internal') ? 1 : 0;
                    const bScore = b.includes('internal') ? 1 : 0;
                    return bScore - aScore;
                });

                const newInternal = validCandidates[0];
                return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '/images/${newInternal}'`);
            }
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Applied manual overrides and auto-corrected duplicates.');
