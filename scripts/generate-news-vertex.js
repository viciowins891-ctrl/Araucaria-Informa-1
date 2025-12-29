
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
const IMAGE_DB = {
    'Política': 'https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&q=80&w=1000',
    'Economia': 'https://images.unsplash.com/photo-1611974765270-ca1258822981?auto=format&fit=crop&q=80&w=1000',
    'Segurança': 'https://images.unsplash.com/photo-1555627034-7033509618f0?auto=format&fit=crop&q=80&w=1000',
    'Trânsito': 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&q=80&w=1000',
    'Meio ambiente': 'https://images.unsplash.com/photo-1542601906990-24d4c16419d0?auto=format&fit=crop&q=80&w=1000',
    'Clima': 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=1000',
    'Tecnologia': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    'Educação': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
    'Saúde': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000',
    'Esporte': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=1000',
    'Cultura': 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=1000',
    'Cidade': 'https://images.unsplash.com/photo-1449824913929-2b3a3e36e65b?auto=format&fit=crop&q=80&w=1000',
    'Geral': 'https://images.unsplash.com/photo-1449824913929-2b3a3e36e65b?auto=format&fit=crop&q=80&w=1000'
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
