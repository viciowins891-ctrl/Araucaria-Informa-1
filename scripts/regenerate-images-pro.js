
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
// Usa Service Role para ter permissão total no Storage
const supabase = createClient(env['VITE_SupabaseUrl'], env['SUPABASE_SERVICE_ROLE_KEY']);

// --- FUNÇÃO DE UPLOAD ---
async function downloadAndUploadImage(imageUrl, prefix = 'img') {
    try {
        // 1. Download da Imagem Gerada (Pollinations)
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.statusText}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2. Define Nome Único
        const timestamp = Date.now();
        const randomId = Math.floor(Math.random() * 10000);
        const fileName = `${prefix}_${timestamp}_${randomId}.jpg`;

        // 3. Upload para o Supabase Storage (Bucket 'news-images')
        const { data, error } = await supabase
            .storage
            .from('news-images')
            .upload(fileName, buffer, {
                contentType: 'image/jpeg',
                upsert: false
            });

        if (error) throw error;

        // 4. Retorna URL Pública
        const { data: publicData } = supabase
            .storage
            .from('news-images')
            .getPublicUrl(fileName);

        return publicData.publicUrl;

    } catch (error) {
        console.error("⚠️ Erro no upload (usando original):", error.message);
        return imageUrl; // Fallback
    }
}

async function startRegeneration() {
    console.log("🔄 Iniciando Regeneração PROFISSIONAL de Imagens (Flux-Realism + Storage Próprio)...");

    // 1. Pega TODAS as notícias
    const { data: newsList, error } = await supabase.from('news').select('*').order('id', { ascending: false });

    if (error) {
        console.error("Erro ao ler notícias:", error);
        return;
    }

    console.log(`📋 Encontradas ${newsList.length} notícias para processar.`);

    let successCount = 0;

    for (const news of newsList) {
        console.log(`\n📸 Processando [ID ${news.id}]: ${news.title.substring(0, 40)}...`);

        // Ignora se for a notícia do Lixo Zero que já arrumamos manualmente (Opcional, mas prudente)
        if (news.title.includes('Lixo Zero')) {
            console.log("   ⏩ Pulando notícia 'Lixo Zero' (já ajustada manualmente).");
            continue;
        }

        // --- LÓGICA DE SANITIZAÇÃO E PROMPT ---
        let visualTitle = news.title
            .replace(/Fênix/gi, "Time de Futebol")
            .replace(/Águia/gi, "Time")
            .replace(/Leão/gi, "Time")
            .replace(/Operário/gi, "Time")
            .replace(/Fantasma/gi, "Time");

        // 1. GERA NOVA CAPA
        const promptCapa = `news reporting photo of ${visualTitle}, showing real people and city environment, ${news.category} context in Araucaria Brazil, realistic, 4k, wide angle, professional journalism style, no text overlay, no animals unless specified, no mythological creatures`;
        const encodedCapa = encodeURIComponent(promptCapa);
        const rawCapaUrl = `https://image.pollinations.ai/prompt/${encodedCapa}?width=1024&height=768&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000)}`;

        console.log("   ☁️ Baixando e subindo nova Capa...");
        const finalCapaUrl = await downloadAndUploadImage(rawCapaUrl, 'cover_fix');

        // 2. GERA NOVA INTERNA
        const promptInterna = `detailed close-up photo relevant to ${visualTitle}, showing specifics of the news, inside view or specific detail, ${news.category} context in Araucaria Brazil, realistic, 4k, professional photography, dslr quality, no cartoon, no illustration, no drawing, no pixel art, no text overlay, no mythological creatures`;
        const encodedInterna = encodeURIComponent(promptInterna);
        const rawInternalUrl = `https://image.pollinations.ai/prompt/${encodedInterna}?width=800&height=600&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000) + 5000}`;

        console.log("   ☁️ Baixando e subindo nova Interna...");
        const finalInternalUrl = await downloadAndUploadImage(rawInternalUrl, 'internal_fix');

        // 3. ATUALIZA HTML
        let newContent = news.content;
        // Limpa images antigas
        newContent = newContent.replace(/<figure[\s\S]*?<\/figure>/g, "");
        newContent = newContent.replace(/<img[^>]*>/g, "");

        // Monta nova tag
        const imgTag = `<figure class="my-8 w-full"><img src="${finalInternalUrl}" alt="Detalhe da notícia" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Registro visual do local (Atualizado via Satélite)</figcaption></figure>`;

        // Injeta logo após primeiro parágrafo
        const pClose = '</p>';
        let injectionIndex = newContent.indexOf(pClose);
        if (injectionIndex !== -1) {
            injectionIndex += pClose.length;
        } else {
            injectionIndex = 0;
        }
        newContent = newContent.slice(0, injectionIndex) + imgTag + newContent.slice(injectionIndex);

        // 4. SALVA NO BANCO
        const { error: updateError } = await supabase
            .from('news')
            .update({
                image_url: finalCapaUrl,
                content: newContent
            })
            .eq('id', news.id);

        if (updateError) {
            console.error("❌ Erro ao atualizar BD:", updateError.message);
        } else {
            console.log("✅ Atualização Concluída!");
            successCount++;
        }
    }

    console.log(`\n🎉 Processo finalizado! ${successCount} notícias renovadas.`);
}

startRegeneration();
