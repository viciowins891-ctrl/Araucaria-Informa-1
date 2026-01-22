
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

async function updateImages() {
    console.log("🔄 Regenerando imagens para todas as notícias existentes usando motor 'Flux-Realism'...");

    // 1. Pega TODAS as notícias
    const { data: newsList, error } = await supabase.from('news').select('*');

    if (error) {
        console.error("Erro ao ler notícias:", error);
        return;
    }

    console.log(`📋 Encontradas ${newsList.length} notícias para atualizar.`);

    for (const news of newsList) {
        console.log(`\n📸 Atualizando: ${news.title.substring(0, 40)}...`);

        // Lógica de Sanitização (IGUAL AO GERADOR NOVO)
        let visualTitle = news.title
            .replace(/Fênix/gi, "Time de Futebol")
            .replace(/Águia/gi, "Time")
            .replace(/Leão/gi, "Time")
            .replace(/Operário/gi, "Time")
            .replace(/Fantasma/gi, "Time");

        // Gera URLs Novas com '&model=flux-realism'
        const promptCapa = `news reporting photo of ${visualTitle}, showing real people and city environment, ${news.category} context in Araucaria Brazil, realistic, 4k, wide angle, professional journalism style, no text overlay, no animals unless specified, no mythological creatures`;
        const encodedCapa = encodeURIComponent(promptCapa);
        const newCapaUrl = `https://image.pollinations.ai/prompt/${encodedCapa}?width=1024&height=768&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000)}`;

        const promptInterna = `detailed close-up photo relevant to ${visualTitle}, showing specifics of the news, inside view or specific detail, ${news.category} context in Araucaria Brazil, realistic, 4k, professional photography, dslr quality, no cartoon, no illustration, no drawing, no pixel art, no text overlay, no mythological creatures`;
        const encodedInterna = encodeURIComponent(promptInterna);
        const newInternalUrl = `https://image.pollinations.ai/prompt/${encodedInterna}?width=800&height=600&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000) + 5000}`;

        // Atualiza HTML Content (Injeta a nova imagem interna no lugar da velha)
        let newContent = news.content;

        // Remove imagens antigas (regex simples para limpar tags img ou figure inseridas anteriormente)
        // Isso é meio bruto, mas eficaz: remove qualquer <figure>...</figure> ou <img ...> fora do padrão.
        newContent = newContent.replace(/<figure[\s\S]*?<\/figure>/g, ""); // Remove figures antigas
        newContent = newContent.replace(/<img[^>]*>/g, ""); // Remove imgs soltas

        // Re-injeta a nova imagem
        const imgTag = `<figure class="my-8 w-full"><img src="${newInternalUrl}" alt="Detalhe da notícia" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Registro visual detalhado sobre o caso (Atualizado)</figcaption></figure>`;

        // Injeta
        const pClose = '</p>';
        let injectionIndex = newContent.indexOf(pClose);
        if (injectionIndex !== -1) {
            injectionIndex += pClose.length;
        } else {
            injectionIndex = 0;
        }
        newContent = newContent.slice(0, injectionIndex) + imgTag + newContent.slice(injectionIndex);

        // Salva no Banco
        const { error: updateError } = await supabase
            .from('news')
            .update({
                image_url: newCapaUrl,
                content: newContent
            })
            .eq('id', news.id);

        if (updateError) console.error("❌ Falha ao salvar:", updateError.message);
        else console.log("✅ Imagens atualizadas!");

        // Pausa curta para não rate-limiting
        // await new Promise(r => setTimeout(r, 500)); 
    }

    console.log("\n🎉 Todas as imagens foram regeneradas com sucesso!");
}

updateImages();
