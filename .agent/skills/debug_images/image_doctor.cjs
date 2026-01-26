
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '../../../');
const publicDir = path.join(rootDir, 'public/images');
const dataPath = path.join(rootDir, 'data.ts');

// --- 1. Golden Map (O Mapa do Tesouro - Escolhas Manuais Conhecidas) ---
// Baseado no histórico de interações do usuário
const manualMap = {
    '1769252001': ['saude_atendimento_interno.png', 'saude-recorde-150mil-interna.png'], // Saude Recorde
    '1769253501': ['araucaria_volei_match_action.png', 'araucaria-volei-spike-interna.png'], // Volei Decisão
    '1769252002': ['crianca-segura-botao-interna.png'], // Criança Segura
    '1769250291': ['araucaria-pinhao-detalhe-interna.png'], // Araucaria Lei
    '1769250987': ['interconexoes-parana-japao-interna.png'], // Japão
    '1769250568': ['veiculo-furtado-araucaria-interna.png'], // Veiculo Furtado
    '1769250610': ['concurso-araucaria-banca-interna.png'], // Concurso
    '1769111662': ['pavimentacao-interiror-faixa.png'], // Pavimentação
    '1769118198': ['ifpr-obras-interna.png'], // IFPR
    '1769112101': ['volta-aulas-kits-interna-v2.png'], // Kits
    '1769112147': ['smma-dengue-costeira-interna.jpg'], // Dengue
    '1769112338': ['feirao-empregos-ciar-interna.png'], // Feirão
    '1769112325': ['defesa-civil-rio-iguacu-interna.png'], // Defesa Civil
    '1769112488': ['semaforo-archelau-interno-real.png'], // Semaforo
    '1769000146': ['saneamento-iguacu-interna.png'], // Sanepar
    '1769000232': ['lixo-zero-interna-manual-v2.png'], // Lixo Zero
    '1769000473': ['festival-tropeiro-interna-manual.png'], // Tropeiro
    '1769001982': ['cinema_parque_interno.png'], // Cinema
    '1769002173': ['food_trucks_internal_v26.png'], // Food Trucks
    '1769002660': ['hospital_pediatric_ward_interior.png'], // Hospital
    '1769003490': ['school_garden_internal_final_v5.png'], // Hortas
    '1769003522': ['araucaria_smart_city_internal_collage_final_v5.png'], // App
    '1769004272': ['gym_volleyball_internal_final_v5.png'], // Volei Final
    '1769005049': ['cmei_interior_pessoas.png'], // CMEI
    '1769005176': ['news_budget_chamber.png'], // Orçamento
    '1769006114': ['pacote_obras_capela_velha.jpg'], // Obras
    '1769006673': ['news_drugs_seized.png'], // Drogas
    '1769006754': ['news_vaccine_pregnant.png'], // Vacina
    '1769007605': ['news_christmas_cantata.png'], // Natal
    '1769007953': ['cyclone_repair_internal.png'], // Ciclone
    '1769008352': ['gym_interior_renovation.png'], // Ginasio Reforma
    '1769008601': ['rota_turismo_rural.jpg'], // Turismo Rural
    '1769008740': ['vacinacao_campanha_interna.png'], // Vacina Meta
    '1769009366': ['childrens_theater_stage_play.png'], // Teatro
    '1769010006': ['new_bike_path_industrial.png'], // Ciclovia
    '1769010550': ['road_repair_pothole_asphalt.png'], // Tapa Buracos
    '1769010785': ['municipal_guard_real.png'], // GM
    '1769011351': ['hospital_pediatric_ward_interior.png'], // HMA Pediatria
    '1769011624': ['school_robotics_fair_project.png'], // Robotica
    '1769011870': ['new_supermarket_interior.png'], // Supermercado
    '1769012743': ['river_cleanup_volunteers.png'], // Rio Limpeza
    '1769013037': ['news_chess_inner_araucaria.png'], // Xadrez
    '1769013799': ['vocational_training_industrial_class.png'], // Cursos
    '1769014746': ['rural_tourism_signage_araucaria.png'], // Placas
    '1769015223': ['school_transport_app_araucaria.png'], // App Van
    '1769015403': ['plaza_bible_internal_real.jpg'], // Praça Biblia
    '1769015471': ['news_hackathon_coding.png'], // Hackathon
    '1769015642': ['sitio_ecologico_trilhas.jpg'], // Sitio
    '1769016347': ['araucaria_futsal_real.jpg'], // Futsal
    '1769016822': ['campanha_agasalho_internal.jpg'], // Agasalho
    '1769017500': ['binario_centro_internal.jpg'], // Binario
    '1769017510': ['festival_gastronomico_internal.jpg'], // Gastronomico
    '1769018194': ['lousas_digitais_internal.jpg'], // Lousas
    '1769018855': ['logistica_vagas_real.png'] // Logistica
};

// --- 2. Index Files ---
console.log('Indexing files...');
const fileStats = {};
const files = fs.readdirSync(publicDir);
files.forEach(f => {
    try {
        const fullPath = path.join(publicDir, f);
        const content = fs.readFileSync(fullPath);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        fileStats[f] = { size: content.length, hash: hash };
    } catch (e) { }
});

// --- 3. Process Data ---
let content = fs.readFileSync(dataPath, 'utf8');
const articleRegex = /(\{\s*id:\s*(\d+),[\s\S]*?\})/g;

let updatedContent = content.replace(articleRegex, (match, fullBlock, id) => {

    let cover = (match.match(/imageUrl:\s*['"]\/images\/([^'"]+)['"]/) || [])[1];
    let internal = (match.match(/internalImageUrl:\s*['"]\/images\/([^'"]+)['"]/) || [])[1];

    let action = 'KEEP';
    let newInternal = internal;

    // Check if we have a manual map for this ID
    if (manualMap[id]) {
        // Try candidates in order
        for (const candidate of manualMap[id]) {
            if (fileStats[candidate]) {
                // Check if candidate is duplicate of cover
                const coverHash = cover ? fileStats[cover]?.hash : null;
                const candHash = fileStats[candidate].hash;

                // SPECIAL: If duplicate hash, check if it's the ONLY option.
                // If user manually mapped it, they might accept it, OR we messed up and overwrote it.
                // Assuming "image_doctor" implies fixing broken things:
                if (coverHash === candHash) {
                    console.log(`[ID ${id}] Golden candidate ${candidate} is visually same as cover. Looking for better alternative...`);
                    continue; // Try next candidate
                }

                newInternal = candidate;
                action = 'RESTORE_GOLDEN';
                break;
            }
        }
    }

    // Secondary check: Is current (or restored) internal duplicate of cover?
    const coverHash = cover ? fileStats[cover]?.hash : null;
    const internalHash = newInternal ? fileStats[newInternal]?.hash : null;

    if (coverHash && internalHash && coverHash === internalHash) {
        console.log(`[ID ${id}] Visual duplicate detected (${newInternal} == ${cover}). Hunting for alternative...`);

        // HUNT MODE
        const keywords = cover.split(/[_\-\.]/).filter(w => w.length > 3 && !['capa', 'cover', 'mobile', 'png', 'jpg', 'webp'].includes(w));

        const alternatives = files.filter(f => {
            if (!fileStats[f]) return false;
            // Must NOT be same hash
            if (fileStats[f].hash === coverHash) return false;

            // Score match
            let score = 0;
            keywords.forEach(k => { if (f.includes(k)) score++; });

            if (score > 0) return true;
            return false;
        });

        // Sort alternatives
        alternatives.sort((a, b) => {
            let scoreA = 0, scoreB = 0;
            if (a.includes('intern')) scoreA += 5;
            if (b.includes('intern')) scoreB += 5;
            if (a.includes('real')) scoreA += 2;
            if (b.includes('real')) scoreB += 2;
            return scoreB - scoreA;
        });

        if (alternatives.length > 0) {
            newInternal = alternatives[0];
            action = 'SMART_FIX';
            console.log(`[ID ${id}] Found smart fix: ${newInternal}`);
        } else {
            console.log(`[ID ${id}] No alternative found. Keeping as is.`);
        }
    }

    if (newInternal && newInternal !== internal) {
        if (match.includes('internalImageUrl:')) {
            return match.replace(/internalImageUrl:\s*'[^']+'/, `internalImageUrl: '/images/${newInternal}'`);
        } else {
            return match.replace(/(imageUrl:\s*'[^']+',)/, `$1\n        internalImageUrl: '/images/${newInternal}',`);
        }
    }

    return match;
});

fs.writeFileSync(dataPath, updatedContent);
console.log('Image Doctor finished.');
