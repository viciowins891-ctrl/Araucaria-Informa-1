
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const publicDir = path.join(__dirname, 'public/images');
let content = fs.readFileSync(dataPath, 'utf8');

// Helper to find best internal match
function findInternalMatch(currentImage, publicFiles) {
    if (!currentImage) return null;

    // Remove path and extension
    const baseName = path.basename(currentImage, path.extname(currentImage));

    // Pattern 1: Replace -capa with -interna
    if (baseName.includes('-capa')) {
        const candidate = baseName.replace('-capa', '-interna');
        const match = publicFiles.find(f => f.startsWith(candidate));
        if (match) return '/images/' + match;
    }

    // Pattern 1b: Replace -capa with -interna (variation)
    if (baseName.includes('-capa')) {
        const candidate = baseName.replace('-capa', '-interiror'); // Typo seen in list
        const match = publicFiles.find(f => f.startsWith(candidate));
        if (match) return '/images/' + match;
    }

    // Pattern 2: Replace _cover with _internal or _inner
    if (baseName.includes('_cover')) {
        let candidate = baseName.replace('_cover', '_internal');
        let match = publicFiles.find(f => f.startsWith(candidate));
        if (match) return '/images/' + match;

        candidate = baseName.replace('_cover', '_inner');
        match = publicFiles.find(f => f.startsWith(candidate));
        if (match) return '/images/' + match;

        // Try removing version suffix if strict match fails, e.g. cover_v2 -> internal_real
        // complex.. skip for now
    }

    // Pattern 3: Direct mapping based on specific known files from my analysis
    const mappings = {
        'sitio_ecologico_trilhas_cover_v2': 'sitio_ecologico_trilhas', // fallback logic
        'araucaria-volei-vs-elase-capa_mobile': 'araucaria-volei-spike-interna',
        'crianca-segura-final': 'crianca-segura-botao-interna',
        'araucaria-aniversario-lei-capa': 'araucaria-pinhao-detalhe-interna',
        'pavimentacao-jardim-plinio-final': 'pavimentacao-interiror-faixa',
        'lixo-zero-manual': 'lixo-zero-interna-manual',
        'festival-tropeiro-capa-manual': 'festival-tropeiro-interna-manual',
        'cinema_cover_real_final_v7': 'cinema_parque_interno',
        'hospital_equipment_araucaria_final_v5': 'hospital_pediatric_ward_interior', // Maybe?
        'hortas_escolas_cover_v27': 'school_garden_internal_final_v5',
        'araucaria_smart_city_final_v8': 'araucaria_smart_city_internal_collage_final_v5',
        'gym_volleyball_final_cover_v5': 'gym_volleyball_internal_final_v5',
        'cmei_zerando_fila_cover_v4': 'cmei_interior_pessoas',
        'news_budget': 'news_budget_chamber',
        'news_investments': 'pacote_obras_capela_velha', // heuristic
        'pcpr-drugs-incineration-real': 'news_drugs_seized', // heuristic
        'vaccination_vsr_cover_v3': 'news_vaccine_pregnant',
        'cantata_natal_real': 'news_christmas_cantata',
        'news_cyclone_energy': 'cyclone_repair_internal',
        'custom_gym_official': 'gym_interior_renovation',
        'rural_tourism_araucaria_path': 'rota_turismo_rural',
        'vacinacao_meta_2024': 'vacinacao_campanha_interna',
        'placeholder_educacao': 'childrens_theater_stage_play', // from ID 1769009366
        'ciclovia_industrial_cover_v2': 'new_bike_path_industrial',
        'tapa_buracos_iguacu_cover_v2': 'road_repair_pothole_asphalt',
        'gm_viaturas_cover_v2': 'municipal_guard_real',
        'hma_pediatria_cover_v2': 'hospital_pediatric_ward_interior',
        'robotics_fair_real_final_v2': 'school_robotics_fair_project',
        'supermarket_opening_real_final_v2': 'new_supermarket_interior',
        'limpeza_rio_iguacu_v2': 'river_cleanup_volunteers',
        'news_chess_tournament': 'news_chess_inner_araucaria',
        'vocational_course_real_v2': 'vocational_training_industrial_class',
        'rural_tourism_signage_araucaria': 'rural_tourism_signage_araucaria', // seems same?
        'startup_app_cover_v2': 'school_transport_app_araucaria',
        'plaza_bible_lighting_night': 'plaza_bible_internal_real',
        'hackathon_real_final_v2': 'news_hackathon_coding',
        'araucaria_futsal_cover_v1': 'araucaria_futsal_real',
        'winter_clothing_drive_real_v2': 'campanha_agasalho_internal',
        'binario_centro_cover': 'binario_centro_internal',
        'gastronomic_festival_real_final_v2': 'festival_gastronomico_internal',
        'lousas_digitais_capa_final': 'lousas_digitais_internal',
        'logistica_vagas_internal': 'logistica_vagas_real'
    };

    for (const [key, val] of Object.entries(mappings)) {
        if (baseName.includes(key)) {
            const match = publicFiles.find(f => f.startsWith(val));
            if (match) return '/images/' + match;
        }
    }

    return null;
}

const publicFiles = fs.readdirSync(publicDir);

// Regex to find articles blocks
const articleRegex = /(\{\s*id:\s*\d+,[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match) => {
    // Check if it has imageUrl
    const imgMatch = match.match(/imageUrl:\s*'([^']+)'/);
    if (!imgMatch) return match;

    const imageUrl = imgMatch[1];

    // Find better internal image
    let newInternal = findInternalMatch(imageUrl, publicFiles);

    // Special override logic for specific IDs if general logic fails?

    if (newInternal) {
        // Replace existing internalImageUrl or add if missing (though user said they are identical now)
        if (match.includes('internalImageUrl:')) {
            return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '${newInternal}'`);
        } else {
            // Add it after mobileImageUrl or imageUrl
            if (match.includes('mobileImageUrl:')) {
                return match.replace(/(mobileImageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '${newInternal}',`);
            }
            return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '${newInternal}',`);
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Fixed internal images based on heuristics.');
