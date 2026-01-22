
// import 'cross-fetch/dist/node-polyfill.js'; 
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
            if (key && value) {
                envVars[key.trim()] = value.trim();
            }
        });
        return envVars;
    } catch (e) {
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env['VITE_SupabaseUrl'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['VITE_SupabaseKey'];
const geminiApiKey = env['VITE_GEMINI_API_KEY'] || env['GOOGLE_API_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Credenciais do Supabase não encontradas.");
    process.exit(1);
}

if (!geminiApiKey) {
    console.error("❌ ERRO: Chave da API do Gemini (VITE_GEMINI_API_KEY) não encontrada.");
    process.exit(1);
}

// Configuração dos Clientes
const genAI = new GoogleGenerativeAI(geminiApiKey);
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

// --- FUNÇÃO AUXILIAR: DOWNLOAD & UPLOAD PARA SUPABASE ---
async function downloadAndUploadImage(imageUrl, prefix = 'img') {
    try {
        // 1. Download da Imagem Gerada
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
        console.error("⚠️ Erro no processamento da imagem (usando original):", error.message);
        return imageUrl; // Fallback para a URL original se der ruim
    }
}

async function generateNews() {
    console.log("\n🤖 Conectando ao Google Gemini...");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Revertendo para 2.0 (único encontrado)

        const prompt = `
            Você é um jornalista investigativo sênior de Araucária, Paraná, conhecido por matérias profundas e detalhadas.
            Gere 10 (DEZ) notícias inéditas, realistas e COMPLETAS sobre a cidade (para preencher uma página inteira).
            
            REGRAS DE CONTEÚDO (CRÍTICO - EVITE TEXTOS RASOS):
            1. CADA notícia deve ter no mínimo 4 a 6 parágrafos bem desenvolvidos.
            2. USE HTML RICO no campo 'content':
               - Use <h3> para subtítulos que dividam a matéria (ex: "Impacto na Comunidade", "O que dizem as autoridades").
               - Use <strong> para destacar dados importantes ou nomes.
               - Use <ul><li> para listas de benefícios, etapas ou consequências.
               - Use <blockquote> para citações de moradores ou especialistas fictícios.
            3. Invente fatos concretos: nomes de ruas reais (Av. Victor do Amaral, Rodovia do Xisto, Av. Archelau), bairros (Costeira, Centro, Capela Velha, Iguaçu).
            4. O tom deve ser profissional, jornalístico e evitar clichês.
            5. Responda ESTRITAMENTE como um JSON puro (Array), sem markdown.

            Formato do JSON:
            [
                { 
                    "title": "Título Jornalístico e Impactante", 
                    "summary": "Lead jornalístico de 2 linhas que resume a notícia para a capa.", 
                    "content": "<p>Primeiro parágrafo forte introduzindo o fato com data e local.</p><p>Contexto detalhado do problema ou novidade.</p><h3>Impacto Local</h3><p>Análise de como isso afeta o morador do bairro X.</p><blockquote>'Citação realista de um morador ou secretária municipal fictícia', afirmou...</blockquote><ul><li>Detalhe técnico 1</li><li>Detalhe técnico 2</li></ul><p>Conclusão prospectiva sobre os próximos passos.</p>", 
                    "category": "Escolha entre: Economia, Política, Segurança, Cidade, Esporte, Cultura, Saúde, Trânsito" 
                }
            ]
        `;

        console.log("📡 Solicitando pauta à IA...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Limpeza do JSON (Robustez Extrema com Regex)
        const jsonMatch = text.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
            text = jsonMatch[0];
        } else {
            throw new Error("Não foi possível encontrar um JSON array válido na resposta da IA.");
        }

        const newsList = JSON.parse(text);

        console.log(`\n✅ Recebidas ${newsList.length} notícias. Iniciando processamento Profissional (Upload)...`);

        for (const news of newsList) {
            console.log(`\n📰 Processando: ${news.title.substring(0, 50)}...`);

            // MELHORIA DE PROMPT: Sanitização de Metáforas
            let visualTitle = news.title
                .replace(/Fênix/gi, "Time de Futebol")
                .replace(/Águia/gi, "Time")
                .replace(/Leão/gi, "Time")
                .replace(/Operário/gi, "Time")
                .replace(/Fantasma/gi, "Time");

            // 1. CAPA (Wide/Geral) - GERAÇÃO + UPLOAD
            console.log("   📸 Gerando e salvando Capa...");
            const promptCapa = `news reporting photo of ${visualTitle}, showing real people and city environment, ${news.category} context in Araucaria Brazil, realistic, 4k, wide angle, professional journalism style, no text overlay, no animals unless specified, no mythological creatures`;
            const encodedCapa = encodeURIComponent(promptCapa);
            const rawCapaUrl = `https://image.pollinations.ai/prompt/${encodedCapa}?width=1024&height=768&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000)}`;
            const finalCapaUrl = await downloadAndUploadImage(rawCapaUrl, 'cover');

            // 2. INTERNA (Detalhe/Close-up) - GERAÇÃO + UPLOAD
            console.log("   📸 Gerando e salvando Imagem Interna...");
            const promptInterna = `detailed close-up photo relevant to ${visualTitle}, showing specifics of the news, inside view or specific detail, ${news.category} context in Araucaria Brazil, realistic, 4k, professional photography, dslr quality, no cartoon, no illustration, no drawing, no pixel art, no text overlay, no mythological creatures`;
            const encodedInterna = encodeURIComponent(promptInterna);
            const rawInternalUrl = `https://image.pollinations.ai/prompt/${encodedInterna}?width=800&height=600&nologo=true&model=flux-realism&seed=${Math.floor(Math.random() * 1000) + 5000}`;
            const finalInternalUrl = await downloadAndUploadImage(rawInternalUrl, 'internal');

            console.log(`      ↳ Capa: ${finalCapaUrl}`);
            console.log(`      ↳ Interna: ${finalInternalUrl}`);

            // INJEÇÃO NO HTML (ROBUSTEZ TOTAL)
            let finalContent = news.content;

            // Tenta injetar após o primeiro parágrafo
            const pClose = '</p>';
            let injectionIndex = finalContent.indexOf(pClose);

            if (injectionIndex !== -1) {
                injectionIndex += pClose.length;
            } else {
                injectionIndex = 0;
            }

            const imgTag = `<figure class="my-8 w-full"><img src="${finalInternalUrl}" alt="Detalhe da notícia" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Registro visual detalhado sobre o caso</figcaption></figure>`;

            finalContent = finalContent.slice(0, injectionIndex) + imgTag + finalContent.slice(injectionIndex);

            const { error } = await supabase.from('news').insert({
                title: news.title,
                summary: news.summary,
                content: finalContent, // Conteúdo agora tem a imagem embutida!
                category: news.category,
                category_color: 'blue',
                image_url: finalCapaUrl, // URL Própria do Supabase
                publish_date: new Date().toISOString(),
                author: 'Redação IA'
            });

            if (error) {
                console.error(`❌ Erro ao salvar no banco: ${error.message}`);
            } else {
                console.log(`💾 Publicada com sucesso!`);
            }

            // Delay para evitar Rate Limit (Gemini + Pollinations)
            console.log("⏳ Aguardando 5 segundos para evitar sobrecarga...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // --- LIMPEZA AUTOMÁTICA (REGRAS DE RETENÇÃO) ---
        // Regra: Manter 6 páginas com 10 notícias cada = 60 notícias no total.
        console.log("\n🧹 Executando limpeza de notícias antigas...");

        // 1. Busca todas as IDs ordenadas da mais recente para a mais antiga
        const { data: allNews, error: fetchError } = await supabase
            .from('news')
            .select('id')
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error("❌ Erro ao listar notícias para limpeza:", fetchError.message);
        } else if (allNews && allNews.length > 60) {
            // 2. Identifica quais devem sumir (a partir da 61ª)
            const idsToDelete = allNews.slice(60).map(n => n.id);
            console.log(`🗑️ Encontradas ${idsToDelete.length} notícias excedentes (acima de 60). Excluindo...`);

            // 3. Deleta
            const { error: deleteError } = await supabase
                .from('news')
                .delete()
                .in('id', idsToDelete);

            if (deleteError) {
                console.error("❌ Erro ao deletar antigas:", deleteError.message);
            } else {
                console.log("✨ Limpeza concluída! Apenas as 60 mais recentes permanecem.");
            }
        } else {
            console.log(`✅ Nenhuma limpeza necessária (Total atual: ${allNews?.length || 0} / Limite: 60).`);
        }

        console.log("\n🎉 Processo finalizado com sucesso!");

    } catch (error) {
        console.error("❌ Falha crítica na geração:", error);
    }
}

generateNews();
