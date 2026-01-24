
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Mapeamento de Fallback (imagens existentes que fazem sentido)
const replacements = {
    "/images/event_camara.png": "/images/camara-araucaria-final-no-logo.png", // Câmara Real
    "/images/event_feira.png": "/images/feira_definitiva_v100.png", // Feira real
    "/images/event_vacinacao.png": "/images/vaccination_vsr_cover_v3.png", // Vacina
    "/images/event_sine.png": "/images/feirao-empregos-ciar-capa.png", // Empregos
    "/images/event_iptu.png": "/images/prefeitura_orcamento_real.png", // Prefeitura/Finanças
    "/images/event_pessego.png": "/images/festa_pessego_real.jpg" // Pêssego Real
};

let updatedCount = 0;

Object.keys(replacements).forEach(placeholder => {
    const realImage = replacements[placeholder];
    if (content.includes(placeholder)) {
        // Replace globalmente caso tenha mais de uma ocorrência
        content = content.split(placeholder).join(realImage);
        updatedCount++;
        console.log(`Substituído: ${placeholder} -> ${realImage}`);
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`Sucesso! ${updatedCount} imagens de eventos foram atualizadas com fallbacks reais.`);
} else {
    console.log('Nenhuma substituição necessária. Os placeholders já não estavam lá?');
}

