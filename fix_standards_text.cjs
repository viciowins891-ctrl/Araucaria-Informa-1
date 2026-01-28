const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Helper to deduce H3 title based on content keywords
function deduceH3(text) {
    const t = text.toLowerCase();
    if (t.includes('vagas') || t.includes('emprego') || t.includes('trabalho') || t.includes('contratação') || t.includes('sine')) return 'Oportunidade';
    if (t.includes('obra') || t.includes('construção') || t.includes('asfalto') || t.includes('reforma') || t.includes('pavimentação') || t.includes('infraestrutura')) return 'Investimento e Melhorias';
    if (t.includes('saúde') || t.includes('vacina') || t.includes('médico') || t.includes('hospital') || t.includes('dengue') || t.includes('doença')) return 'Prevenção e Cuidado';
    if (t.includes('escola') || t.includes('aluno') || t.includes('professor') || t.includes('educação') || t.includes('ifpr')) return 'Educação em Foco';
    if (t.includes('polícia') || t.includes('guarda') || t.includes('segurança') || t.includes('preso') || t.includes('drogas')) return 'Segurança Pública';
    if (t.includes('evento') || t.includes('festa') || t.includes('convite') || t.includes('show') || t.includes('corrida') || t.includes('natal')) return 'Programação';
    if (t.includes('tecnologia') || t.includes('aplicativo') || t.includes('inovação')) return 'Inovação';
    if (t.includes('meio ambiente') || t.includes('rio') || t.includes('lixo') || t.includes('recicla')) return 'Sustentabilidade';
    return 'Saiba Mais';
}

// Regex to identify article blocks
const articleRegex = /(\{\s*id:\s*\d+,[\s\S]*?content:\s*`)([\s\S]*?)(`,[\s\S]*?\})/g;

content = content.replace(articleRegex, (match, part1, body, part2) => {
    let newBody = body;
    let modified = false;

    // 1. Standardize Prefix
    // Regex matches the pattern <p><strong>City</strong> - 
    // We allow explicit variations to be caught and standardized
    const prefixRegex = /<p>\s*<strong>\s*(ARAUCÁRIA|CIDADE)\s*<\/strong>\s*-\s*/i;

    // Canonical format: Uppercase, standard spacing
    const canonicalPrefix = '<p><strong>ARAUCÁRIA</strong> - ';

    if (prefixRegex.test(newBody)) {
        // It exists, so we replace it with the canonical version to ensure standardization
        // This fixes cases like "Araucária", "CIDADE", or weird spacing "ARAUCÁRIA "
        // check if it is already canonical to avoid useless writes? 
        // We'll just replace.
        const originalUser = newBody.match(prefixRegex)[0];
        if (originalUser !== canonicalPrefix) {
            newBody = newBody.replace(prefixRegex, canonicalPrefix);
            modified = true;
        }
    } else {
        // Missing? Add it to the first paragraph
        if (newBody.includes('<p>')) {
            newBody = newBody.replace(/^\s*<p>/i, canonicalPrefix);
            modified = true;
        }
    }

    // 2. Fix H3 (Subheadings)
    if (!newBody.includes('<h3>')) {
        const paragraphs = newBody.split('</p>');
        // logic from before...
        const validPars = paragraphs.filter(p => p.trim().length > 0);

        // Only add if we have enough content (at least 2 paragraphs)
        if (validPars.length >= 2) {
            const h3Title = deduceH3(newBody);
            // Insert in the middle
            const insertionPoint = Math.ceil(validPars.length / 2);
            validPars.splice(insertionPoint, 0, `<h3>${h3Title}</h3>`);

            // Rejoin. NB: split removed </p>, so we must add it back to all except the newly inserted H3 (or add H3 as full block?)
            // Actually, when we join, we need to be careful.
            // Simplest is to map pars:
            newBody = validPars.map(p => {
                if (p.trim().startsWith('<h3')) return p; // It's our H3
                return p + '</p>';
            }).join('\n        ');

            modified = true;
        }
    }

    if (modified) {
        return part1 + newBody + part2;
    }
    return match;
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Fixed and Standardized text in data.ts');
