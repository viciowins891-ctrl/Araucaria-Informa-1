
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

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Credenciais do Supabase não encontradas.");
    process.exit(1);
}

// Configuração do Cliente
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

// --- BANCO DE NOTÍCIAS (SIMULAÇÃO) ---
const bank = [
    {
        title: "Araucária registra queda histórica no desemprego",
        category: "Economia",
        summary: "Novas indústrias e comércio fortalecido geram mais de 2.000 vagas no último trimestre.",
        content: "<p>A economia de Araucária vive um momento de ouro. Dados do CAGED divulgados hoje mostram que o município registrou o menor índice de desemprego dos últimos 5 anos.</p><p>O setor de serviços e a expansão do polo industrial foram os grandes responsáveis pelo resultado.</p>",
        imgKeyword: "industry"
    },
    {
        title: "Parque Cachoeira terá cinema ao ar livre neste sábado",
        category: "Cultura",
        summary: "Projeto 'Cine Família' traz clássicos da animação para telão gigante no parque.",
        content: "<p>Prepare a pipoca! Neste sábado, o Parque Cachoeira se transforma em um cinema a céu aberto. O projeto exibirá filmes infantis a partir das 19h.</p>",
        imgKeyword: "outdoor cinema park"
    },
    {
        title: "Hospital Municipal recebe equipamentos de última geração",
        category: "Saúde",
        summary: "Novos tomógrafos e aparelhos digitais agilizam diagnósticos na rede pública.",
        content: "<p>A saúde pública de Araucária deu um salto de qualidade. Chegaram hoje ao HMA os novos equipamentos de diagnóstico por imagem adquiridos pela prefeitura.</p>",
        imgKeyword: "hospital technology"
    },
    {
        title: "Escolas municipais ganham hortas comunitárias",
        category: "Educação",
        summary: "Alunos aprendem sobre sustentabilidade cultivando os próprios alimentos.",
        content: "<p>Da terra para o prato. Esse é o lema do novo projeto pedagógico implantado em 10 escolas municipais. As hortas são cuidadas pelos próprios alunos.</p>",
        imgKeyword: "gardening school"
    },
    {
        title: "Araucária lidera ranking de cidades inteligentes",
        category: "Tecnologia",
        summary: "Conectividade e serviços digitais colocam o município no topo.",
        content: "<p>Araucária é destaque em tecnologia. O estudo nacional destacou a ampla cobertura de Wi-Fi gratuito e a digitalização dos serviços públicos.</p>",
        imgKeyword: "smart city"
    },
    {
        title: "Ginásio Joval de Paula Souza terá final estadual",
        category: "Esporte",
        summary: "Cidade recebe as melhores equipes de vôlei do Paraná.",
        content: "<p>O esporte respira em Araucária. A federação confirmou que nossa cidade será a sede das finais do Campeonato Paranaense de Vôlei.</p>",
        imgKeyword: "volleyball match"
    },
    {
        title: "Feira de Adoção Pet é sucesso no fim de semana",
        category: "Cidade",
        summary: "Dezenas de animais encontraram um novo lar no evento promovido pela prefeitura.",
        content: "<p>O evento de adoção responsável superou as expectativas. Famílias inteiras compareceram ao parque para levar um novo amigo para casa.</p>",
        imgKeyword: "puppy adoption"
    }
];

// Imagens estáticas confiáveis (Unsplash IDs diretos)
const imageMap = {
    "industry": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    "outdoor cinema park": "https://images.unsplash.com/photo-1517604931442-710536412dad?auto=format&fit=crop&w=800",
    "hospital technology": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800",
    "gardening school": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800",
    "smart city": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800",
    "volleyball match": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800",
    "puppy adoption": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800"
};

async function generateNews() {
    console.log("\n🚀 Iniciando atualização de notícias (Com Cross-Fetch)...");

    // Embaralha para pegar aleatórias se o banco crescer
    const newsList = bank;

    for (const news of newsList) {
        console.log(`\n📰 Processando: ${news.title}`);

        const imageUrl = imageMap[news.imgKeyword] || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800";

        // Gera ID único grande para aparecer no topo
        const fakeId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);

        const { error } = await supabase.from('news').insert({
            title: news.title,
            summary: news.summary,
            content: news.content,
            category: news.category,
            category_color: 'blue',
            image_url: imageUrl,
            publish_date: new Date().toISOString(),
            author: 'Redação Araucária'
        });

        if (error) {
            console.error(`❌ Erro ao salvar: ${error.message}`);
        } else {
            console.log(`💾 Publicada com sucesso!`);
        }
    }
    console.log("\n🎉 Processo finalizado!");
}

generateNews();
