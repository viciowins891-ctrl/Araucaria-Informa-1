const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Helper to deduce H3 title based on content keywords
function deduceH3(text) {
    const t = text.toLowerCase();
    if (t.includes('vagas') || t.includes('emprego') || t.includes('trabalho') || t.includes('contratação')) return 'Oportunidade';
    if (t.includes('obra') || t.includes('construção') || t.includes('asfalto') || t.includes('reforma')) return 'Investimento e Melhorias';
    if (t.includes('saúde') || t.includes('vacina') || t.includes('médico') || t.includes('hospital')) return 'Prevenção e Cuidado';
    if (t.includes('escola') || t.includes('aluno') || t.includes('professor') || t.includes('educação')) return 'Educação em Foco';
    if (t.includes('polícia') || t.includes('guarda') || t.includes('segurança') || t.includes('preso')) return 'Segurança Pública';
    if (t.includes('evento') || t.includes('festa') || t.includes('convite') || t.includes('show')) return 'Programação';
    if (t.includes('tecnologia') || t.includes('aplicativo') || t.includes('inovação')) return 'Inovação';
    if (t.includes('meio ambiente') || t.includes('rio') || t.includes('lixo') || t.includes('recicla')) return 'Sustentabilidade';
    return 'Saiba Mais';
}

// Regex to identify article blocks more robustly to avoid messing up imports or other data
// We look for objects inside the newsArticles array specifically if possible, or just look for the structure matching an article
const articleRegex = /(\{\s*id:\s*\d+,[\s\S]*?content:\s*`)([\s\S]*?)(`,[\s\S]*?\})/g;

content = content.replace(articleRegex, (match, part1, body, part2) => {
    let newBody = body;
    let modified = false;

    // 1. Fix Prefix
    const prefixRegex = /^\s*<p>\s*<strong>\s*(ARAUCÁRIA|CIDADE)\s*<\/strong>\s*-\s*/i;
    // Also check if it already has the prefix but maybe formatted differently, or if it lacks it entirely
    // We only want to add it if it's MISSING from the very first paragraph
    if (!prefixRegex.test(newBody.trim())) {
        // Find the first paragraph
        newBody = newBody.replace(/^\s*<p>/i, '<p><strong>ARAUCÁRIA</strong> - ');
        modified = true;
    }

    // 2. Fix H3 (Subheadings)
    if (!newBody.includes('<h3>')) {
        // Split by </p> to find a good insertion point (approx middle)
        const paragraphs = newBody.split('</p>');
        if (paragraphs.length > 2) {
            // Insert before the last paragraph
            const insertIndex = Math.max(1, paragraphs.length - 2);
            // -1 is empty string after last </p>, -2 is the actual last paragraph, so we insert before it
            // Actually, split keeps the delimiter? No.

            const h3Title = deduceH3(newBody);

            // Reconstruct
            // We need to re-add </p> to all but the last element (which is likely empty string due to split)
            // Clean empty strings
            const validPars = paragraphs.filter(p => p.trim().length > 0);

            if (validPars.length >= 2) {
                const insertionPoint = Math.ceil(validPars.length / 2);
                validPars.splice(insertionPoint, 0, `<h3>${h3Title}</h3>`);
                // Join them back with </p>
                newBody = validPars.map(p => p.startsWith('<h3') ? p : p + '</p>').join('\n        ');
                modified = true;
            }
        }
    }

    if (modified) {
        return part1 + newBody + part2;
    }
    return match;
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Fixed text standards in data.ts');
