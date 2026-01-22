
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

async function updateFenixFCImages() {
    console.log("🔄 Configurando imagens manuais para 'Fênix Araucária FC'...");

    const targetCapa = '/images/fenix-fc-capa-manual.png';
    const targetInternal = '/images/fenix-fc-interna-manual.png';
    const searchQuery = 'Fênix Araucária FC';

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
    console.log(`✅ Encontrada: "${targetNews.title}"`);

    // 2. Manipula o HTML para a Interna
    let finalContent = targetNews.content;

    // Limpa imagens antigas
    finalContent = finalContent.replace(/<figure[\s\S]*?<\/figure>/g, "");
    finalContent = finalContent.replace(/<img[^>]*>/g, "");

    // Cria nova tag
    const imgTag = `<figure class="my-8 w-full"><img src="${targetInternal}" alt="Comemoração do Fênix FC" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Jogadoras comemoram a classificação histórica</figcaption></figure>`;

    // Injeta
    const pClose = '</p>';
    let injectionIndex = finalContent.indexOf(pClose);
    if (injectionIndex !== -1) {
        injectionIndex += pClose.length;
    } else {
        injectionIndex = 0;
    }
    finalContent = finalContent.slice(0, injectionIndex) + imgTag + finalContent.slice(injectionIndex);

    // 3. Atualiza TUDO no banco (Capa + Interna)
    const { error: updateError } = await supabase
        .from('news')
        .update({
            image_url: targetCapa,
            content: finalContent
        })
        .eq('id', targetNews.id);

    if (updateError) {
        console.error("❌ Falha ao atualizar:", updateError.message);
    } else {
        console.log(`🎉 Sucesso! Capa e Interna atualizadas para o Fênix FC.`);
    }
}

updateFenixFCImages();
