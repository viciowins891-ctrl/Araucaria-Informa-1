
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURAÇÃO ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        if (!fs.existsSync(envPath)) return {};
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key) envVars[key.trim()] = value.trim();
        });
        return envVars;
    } catch (e) { return {}; }
}

const env = loadEnv();
const supabase = createClient(env['VITE_SupabaseUrl'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function updateCoverImage() {
    console.log("🔄 Configurando Capa manual para 'Plano Diretor'...");

    const targetImage = '/images/camara-araucaria-final-no-logo.png';
    const searchQuery = 'Plano Diretor';
    console.log("🔒 TRAVA ATIVADA: Esta notícia não será mais alterada por scripts automáticos."); // Parte única do título

    // 1. Busca a notícia
    const { data: newsList, error } = await supabase
        .from('news')
        .select('*')
        .ilike('title', `%${searchQuery}%`);

    if (error || !newsList || newsList.length === 0) {
        console.error("❌ Notícia não encontrada ou erro:", error);
        return;
    }

    const targetNews = newsList[0];
    console.log(`✅ Encontrada: "${targetNews.title}" (ID: ${targetNews.id})`);

    // 2. Atualiza APENAS a Capa (image_url)
    const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: targetImage })
        .eq('id', targetNews.id);

    if (updateError) {
        console.error("❌ Falha ao atualizar capa:", updateError.message);
    } else {
        console.log(`🎉 Sucesso! Capa atualizada para: ${targetImage}`);
    }
}

updateCoverImage();
