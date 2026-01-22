
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

async function updateSpecificNews() {
    console.log("🔄 Atualizando imagem manual para notícia do 'Lixo Zero'...");

    const targetImage = '/images/lixo-zero-manual.png';
    const searchQuery = 'Lixo Zero Araucária';

    // 1. Busca a notícia
    const { data: newsList, error } = await supabase
        .from('news')
        .select('*')
        .ilike('title', `%${searchQuery}%`);

    if (error || !newsList || newsList.length === 0) {
        console.error("❌ Notícia não encontrada ou erro:", error);
        return;
    }

    const targetNews = newsList[0]; // Pega a primeira que achar
    console.log(`✅ Encontrada: "${targetNews.title}" (ID: ${targetNews.id})`);

    // 2. Atualiza
    const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: targetImage })
        .eq('id', targetNews.id);

    if (updateError) {
        console.error("❌ Falha ao atualizar:", updateError.message);
    } else {
        console.log(`🎉 Sucesso! Imagem atualizada para: ${targetImage}`);
    }
}

updateSpecificNews();
