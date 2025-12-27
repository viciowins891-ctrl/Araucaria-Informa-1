
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Leitor simples de .env
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envVars[key.trim()] = value.trim();
            }
        });
        return envVars;
    } catch (e) {
        console.error("Erro ao ler .env", e);
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env['VITE_SupabaseUrl'];
const supabaseKey = env['VITE_SupabaseKey'];

if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: Credenciais do Supabase não encontradas no .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateReparImage() {
    console.log("Buscando notícia sobre REPAR/Turbinas...");

    // Busca pela notícia (usando ILIKE para case insensitive parcial)
    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .ilike('title', '%Novas turbinas da REPAR%')
        .limit(1);

    if (error) {
        console.error("Erro ao buscar notícia:", error);
        return;
    }

    if (!news || news.length === 0) {
        console.log("Nenhuma notícia encontrada com este título.");
        return;
    }

    const targetNews = news[0];
    console.log(`Encontrada: [${targetNews.id}] ${targetNews.title}`);
    console.log(`Imagem atual: ${targetNews.image_url}`);

    const newImageUrl = '/images/repar_turbines_new_final.jpg';

    // Update
    const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: newImageUrl })
        .eq('id', targetNews.id);

    if (updateError) {
        console.error("Erro ao atualizar imagem:", updateError);
    } else {
        console.log(`✅ SUCESSO: Imagem atualizada para '${newImageUrl}'`);
    }
}

updateReparImage();
