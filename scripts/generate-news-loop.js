
// import 'cross-fetch/dist/node-polyfill.js'; // <--- O AJUDANTE MÁGICO (Caminho Corrigido)
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
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(geminiApiKey);
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

const TARGET_TOTAL = 60;

async function main() {
    console.log("🚀 Iniciando Auto-Fill de Notícias...");

    while (true) {
        // 1. Verifica contagem atual
        const { count, error } = await supabase.from('news').select('*', { count: 'exact', head: true });

        if (error) {
            console.error("❌ Erro ao contar notícias:", error.message);
            break;
        }

        console.log(`\n📊 Status Atual: ${count} / ${TARGET_TOTAL} notícias.`);

        if (count >= TARGET_TOTAL) {
            console.log("\n✅ Meta de 60 notícias atingida! Parando geração.");
            break;
        }

        console.log(`⚡ Preciso de mais ${TARGET_TOTAL - count} notícias. Iniciando lote...`);

        // Executa geração de um lote (6)
        await generateNewsBatch();

        // Pequena pausa para evitar rate limit
        console.log("⏳ Aguardando 5 segundos para o próximo lote...");
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

async function generateNewsBatch() {
    console.log("\n🤖 Conectando ao Google Gemini...");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            Você é um jornalista investigativo sênior de Araucária, Paraná.
            Gere 6 (SEIS) notícias inéditas e EXTREMAMENTE REALISTAS sobre a cidade (diferentes das anteriores).
            
            REGRAS:
            1. Mínimo 4 parágrafos.
            2. HTML RICO no campo 'content' (h3, strong, ul, blockquote).
            3. Fatos e locais reais (Centro, Costeira, Tindiquera, CSU, Parque Cachoeira, HMA).
            4. Retorne APENAS o JSON Array.
            
            Formato: [{ "title": "...", "category": "Economia|Política|Segurança|Cidade|Esporte|Cultura|Saúde", "summary": "...", "content": "..." }]
        `;

        console.log("📡 Solicitando lote à IA...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) text = jsonMatch[0];

        const newsList = JSON.parse(text);

        console.log(`\n✅ Lote de ${newsList.length} recebido. Processando...`);

        for (const news of newsList) {
            // 1. CAPA (Wide/Geral)
            const promptCapa = `news reporting photo of ${news.title}, ${news.category} context in Araucaria Brazil, realistic, 4k, wide angle, professional journalism style, no text overlay`;
            const encodedCapa = encodeURIComponent(promptCapa);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedCapa}?width=1024&height=768&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;

            // 2. INTERNA (Detalhe)
            const promptInterna = `detailed close-up photo relevant to ${news.title}, inside view or specific detail, ${news.category} context in Araucaria Brazil, realistic, 4k, professional photography, no text overlay`;
            const encodedInterna = encodeURIComponent(promptInterna);
            const internalImageUrl = `https://image.pollinations.ai/prompt/${encodedInterna}?width=800&height=600&nologo=true&seed=${Math.floor(Math.random() * 100000) + 5000}`;

            console.log(`Processando: ${news.title.substring(0, 40)}...`);

            // INJEÇÃO NO HTML
            let finalContent = news.content;
            const firstP = finalContent.indexOf('</p>');
            if (firstP !== -1) {
                const imgTag = `<figure class="my-8 w-full"><img src="${internalImageUrl}" alt="Detalhe" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Registro visual do local</figcaption></figure>`;
                finalContent = finalContent.slice(0, firstP + 4) + imgTag + finalContent.slice(firstP + 4);
            } else {
                finalContent += `<img src="${internalImageUrl}" class="w-full rounded-xl my-6" />`;
            }

            await supabase.from('news').insert({
                title: news.title,
                summary: news.summary,
                content: finalContent,
                category: news.category,
                category_color: 'blue',
                image_url: imageUrl,
                publish_date: new Date().toISOString(),
                author: 'Redação IA'
            });
        }
    } catch (error) {
        console.error("❌ Falha no lote:", error);
    }
}

main();
