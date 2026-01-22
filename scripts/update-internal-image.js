
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

async function updateInternalNewsImage() {
    console.log("🔄 Configurando imagem INTERNA manual para 'Lixo Zero'...");

    const targetInternalImage = '/images/camara-araucaria-interna-manual.png';
    const searchQuery = 'Plano Diretor';

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

    // 2. Manipula o HTML para injetar/substituir a imagem interna (dentro do content)
    let finalContent = targetNews.content;

    // Limpa imagens antigas do content
    finalContent = finalContent.replace(/<figure[\s\S]*?<\/figure>/g, ""); // Remove figures antigas
    finalContent = finalContent.replace(/<img[^>]*>/g, ""); // Remove imgs soltas

    // Cria a nova tag de imagem
    const imgTag = `<figure class="my-8 w-full"><img src="${targetInternalImage}" alt="Detalhe do Lixo Zero" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Registro detalhado da coleta seletiva</figcaption></figure>`;

    // Injeta após o primeiro parágrafo
    const pClose = '</p>';
    let injectionIndex = finalContent.indexOf(pClose);
    if (injectionIndex !== -1) {
        injectionIndex += pClose.length;
    } else {
        injectionIndex = 0;
    }

    // Reconstrói o conteúdo
    finalContent = finalContent.slice(0, injectionIndex) + imgTag + finalContent.slice(injectionIndex);

    // 3. Atualiza no Banco
    const { error: updateError } = await supabase
        .from('news')
        .update({ content: finalContent })
        .eq('id', targetNews.id);

    if (updateError) {
        console.error("❌ Falha ao atualizar conteúdo:", updateError.message);
    } else {
        console.log(`🎉 Sucesso! Imagem interna definida manualmente para: ${targetInternalImage}`);
    }
}

updateInternalNewsImage();
