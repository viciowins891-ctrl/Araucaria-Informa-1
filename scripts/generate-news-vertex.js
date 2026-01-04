
import 'cross-fetch/dist/node-polyfill.js'; // <--- O AJUDANTE MÁGICO (Caminho Corrigido)
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
const supabaseKey = env['VITE_SupabaseKey'];
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

// Banco de Imagens para Fallback/Contexto
// Banco de Imagens para Fallback/Contexto (Imagens Locais Seguras - SEM LOGO)
const IMAGE_DB = {
    'Política': '/images/news_budget_chamber.png',
    'Economia': '/images/placeholder_economia.png',
    'Segurança': '/images/placeholder_seguranca.png',
    'Trânsito': '/images/placeholder_infraestrutura.png', // Reuso inteligente
    'Meio ambiente': '/images/news_river_cleanup.png',
    'Clima': '/images/news_cyclone_damage.png',
    'Tecnologia': '/images/news_hackathon_coding.png',
    'Educação': '/images/placeholder_educacao.png',
    'Saúde': '/images/news_context_health.png',
    'Esporte': '/images/placeholder_esporte.png',
    'Cultura': '/images/placeholder_turismo.png',
    'Cidade': '/images/araucaria_smart_city.jpg',
    'Geral': '/images/placeholder_default.png'
};

function getImageForCategory(category) {
    return IMAGE_DB[category] || IMAGE_DB['Geral'];
}

async function generateNews() {
    console.log("\n🤖 Conectando ao Google Gemini...");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Você é um jornalista investigativo local de Araucária, Paraná.
            Gere 3 (TRÊS) notícias urgentes, inéditas e realistas sobre a cidade.
            
            REGRAS OBRIGATÓRIAS:
            1. NÃO use temas genéricos como "dia da árvore" ou "feira de ciências" simples.
            2. Invente fatos concretos: nomes de ruas reais (Av. Victor do Amaral, Rodovia do Xisto), nomes de bairros reais (Costeira, Centro, Capela Velha).
            3. Varie os sentimentos: uma notícia boa (avanço, inauguração), uma de alerta (trânsito, clima) e uma curiosidade ou cultura.
            4. Responda ESTRITAMENTE como um JSON puro (Array de Objetos), sem markdown, sem code blocks.

            Formato do JSON:
            [
                { 
                    "title": "Título Impactante", 
                    "summary": "Resumo curto e direto para a home.", 
                    "content": "<p>Primeiro parágrafo detalhado com local e data.</p><p>Segundo parágrafo com citações fictícias de autoridades ou moradores.</p>", 
                    "category": "Escolha entre: Economia, Política, Segurança, Cidade, Esporte, Cultura, Saúde, Trânsito" 
                }
            ]
        `;

        console.log("📡 Solicitando pauta à IA...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Limpeza do JSON (caso a IA mande markdown)
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const newsList = JSON.parse(text);

        console.log(`\n✅ Recebidas ${newsList.length} notícias. Publicando no Supabase...`);

        for (const news of newsList) {
            console.log(`\n📰 Processando: ${news.title}`);
            const imageUrl = getImageForCategory(news.category);

            const { error } = await supabase.from('news').insert({
                title: news.title,
                summary: news.summary,
                content: news.content,
                category: news.category,
                category_color: 'blue', // Poderia ser dinâmico, mas 'blue' é safe
                image_url: imageUrl,
                publish_date: new Date().toISOString(),
                author: 'Redação IA'
            });

            if (error) {
                console.error(`❌ Erro ao salvar no banco: ${error.message}`);
            } else {
                console.log(`💾 Publicada com sucesso!`);
            }
        }

        console.log("\n🎉 Processo finalizado com sucesso!");

    } catch (error) {
        console.error("❌ Falha crítica na geração:", error);
    }
}

generateNews();
