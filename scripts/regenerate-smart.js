
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

// --- FUNÇÃO DE UPLOAD ---
async function downloadAndUploadImage(imageUrl, prefix = 'img') {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;

        const { data, error } = await supabase.storage.from('news-images').upload(fileName, buffer, { contentType: 'image/jpeg', upsert: false });
        if (error) throw error;

        const { data: publicData } = supabase.storage.from('news-images').getPublicUrl(fileName);
        return publicData.publicUrl;
    } catch (error) {
        console.error("⚠️ Erro upload:", error.message);
        return imageUrl;
    }
}

// --- GERADOR DE PROMPT BASEADO EM PALAVRAS-CHAVE (Sem API Limit) ---
function getRegexSmartPrompt(title, category) {
    const t = title.toLowerCase();
    const c = category.toLowerCase();

    // 1. Definições de Contexto por Palavra-Chave
    if (t.includes('futebol') || t.includes('time') || t.includes('campeonato') || t.includes('jogo') || c.includes('esporte')) {
        return "soccer match action in stadium, football players on field, realistic sports photography";
    }

    if (t.includes('hospital') || t.includes('upa') || t.includes('médico') || t.includes('saúde') || t.includes('vacina') || c.includes('saúde')) {
        return "modern hospital building facade, medical professionals working, healthcare context, realistic";
    }

    if (t.includes('escola') || t.includes('colégio') || t.includes('aluno') || t.includes('educação') || t.includes('cmei') || c.includes('educação')) {
        return "students in modern classroom, school building facade, education context, realistic learning environment";
    }

    if (t.includes('polícia') || t.includes('segurança') || t.includes('crime') || t.includes('furto') || t.includes('preso') || t.includes('guarda') || c.includes('segurança')) {
        return "police car patrolling city street, security context, urban night scene, photojournalism style";
    }

    if (t.includes('trânsito') || t.includes('carro') || t.includes('ônibus') || t.includes('avenida') || t.includes('acidente') || t.includes('obra') || c.includes('trânsito')) {
        return "busy city avenue with traffic, cars and buses on street, urban infrastructure, daytime";
    }

    if (t.includes('ambiente') || t.includes('parque') || t.includes('árvore') || t.includes('verde') || t.includes('lixo') || t.includes('recicla')) {
        return "city park with green trees, nature in urban context, environmental journalism";
    }

    if (t.includes('indústria') || t.includes('fábrica') || t.includes('empresa') || t.includes('dinheiro') || t.includes('economia')) {
        return "industrial factory exterior, business district with buildings, economic context";
    }

    if (t.includes('cultura') || t.includes('festa') || t.includes('show') || t.includes('arte') || t.includes('festival')) {
        return "cultural street festival, people celebrating outdoors, artistic event context";
    }

    if (t.includes('câmara') || t.includes('prefeitura') || t.includes('vereador') || t.includes('lei') || t.includes('política')) {
        return "government building facade, city council meeting context, political journalism";
    }

    // Contexto Geral Araucária (Fallback)
    return "city street scene in Araucaria Brazil, realistic daily life, urban environment, photojournalism";
}

async function startSmartRegeneration() {
    console.log("⚡ Iniciando Regeneração RÁPIDA (RegEx Context + Flux)...");

    const { data: newsList, error } = await supabase.from('news').select('*').order('id', { ascending: false });
    if (error) return console.error("Erro BD:", error);

    const SKIP_TITLES = [
        'Lixo Zero Araucária',
        'Novo Plano Diretor de Araucária',
        'Fênix Araucária FC'
    ];

    let processedCount = 0;

    for (const news of newsList) {
        // Verifica Trava
        if (SKIP_TITLES.some(t => news.title.includes(t))) {
            console.log(`⏩ Pulando (Manual/Travado): ${news.title.substring(0, 30)}...`);
            continue;
        }

        console.log(`\n🤖 Processando: ${news.title.substring(0, 40)}...`);

        // Gera Prompt via Lógica
        let basePrompt = getRegexSmartPrompt(news.title, news.category);

        // Adiciona estilo padrão robusto
        let fullPrompt = `${basePrompt}, realistic, 4k, dslr quality, professional photojournalism, no text, no watermark, no logo, no signature`;

        const encodedPrompt = encodeURIComponent(fullPrompt);

        // 1. Capa
        console.log(`   📸 [Capa] Prompt: "${basePrompt}"`);
        const rawCapaUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 10000)}`;
        const finalCapaUrl = await downloadAndUploadImage(rawCapaUrl, 'smart_v2_cover');

        // 2. Interna
        console.log("   📸 [Interna] Gerando...");
        const rawInternalUrl = `https://image.pollinations.ai/prompt/closeup detail of ${encodedPrompt}?width=800&height=600&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 10000) + 5000}`;
        const finalInternalUrl = await downloadAndUploadImage(rawInternalUrl, 'smart_v2_internal');

        // 3. Atualiza BD
        let newContent = news.content;
        newContent = newContent.replace(/<figure[\s\S]*?<\/figure>/g, "").replace(/<img[^>]*>/g, "");
        const imgTag = `<figure class="my-8 w-full"><img src="${finalInternalUrl}" alt="Registro da notícia" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Imagem ilustrativa gerada automaticamente</figcaption></figure>`;

        const pClose = '</p>';
        let injectionIndex = newContent.indexOf(pClose);
        injectionIndex = injectionIndex !== -1 ? injectionIndex + pClose.length : 0;
        newContent = newContent.slice(0, injectionIndex) + imgTag + newContent.slice(injectionIndex);

        const { error: upErr } = await supabase.from('news').update({ image_url: finalCapaUrl, content: newContent }).eq('id', news.id);

        if (upErr) console.error("❌ Erro Update:", upErr.message);
        else console.log("✅ Atualizado!");

        processedCount++;
    }

    console.log(`\n🎉 Finalizado! ${processedCount} notícias regeneradas com contexto visual.`);
}

startSmartRegeneration();
