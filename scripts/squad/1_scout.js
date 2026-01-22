
import Parser from 'rss-parser';

// Configuração de Feeds (Podemos adicionar mais)
// Como não temos os links exatos oficiais agora, usar Google News RSS filtrado por 'Araucaria Parana' é um hack excelente
const RSS_FEEDS = [
    "https://news.google.com/rss/search?q=Araucaria+Parana&hl=pt-BR&gl=BR&ceid=BR:pt-419",
    "https://g1.globo.com/rss/g1/pr/parana/" // Generalista Paraná (filtrar depois)
];

const parser = new Parser();

// Banco de Pautas Realistas para Fallback (Caso falhe a rede)
const MOCK_PAUTAS = [
    {
        title: "SMMA alerta para aumento de casos de Dengue no Costeira",
        content: "A Secretaria Municipal de Meio Ambiente (SMMA) emitiu um alerta nesta manhã sobre o aumento de focos do mosquito Aedes aegypti no bairro Costeira. Mutirões de limpeza serão realizados no fim de semana.",
        category: "Saúde"
    },
    {
        title: "Obras de pavimentação chegam ao Jardim Plínio",
        content: "Máquinas da prefeitura iniciaram hoje o asfaltamento das ruas principais do Jardim Plínio. A obra, aguardada há 10 anos, deve ser concluída em 45 dias, melhorando o acesso ao transporte escolar.",
        category: "Infraestrutura"
    },
    {
        title: "Araucária Vôlei vence em casa e assume a liderança",
        content: "Em uma partida eletrizante no Ginásio Joval de Paula Souza, o time da casa venceu o Maringá por 3 sets a 1. A torcida lotou as arquibancadas e empurrou a equipe rumo à liderança do paranaense.",
        category: "Esporte"
    }
];

export async function runScout(count = 1) {
    console.log(`🔍 [Agente Pesquisador] Buscando notícias reais via RSS...`);

    let foundItems = [];

    try {
        for (const url of RSS_FEEDS) {
            console.log(`   📡 Conectando a: ${url}`);
            try {
                const feed = await parser.parseURL(url);
                console.log(`      ✅ Sucesso! Encontrados ${feed.items.length} itens.`);

                // Filtro Básico: Garantir que fala de Araucária (para feeds generalistas)
                const relevant = feed.items.filter(item =>
                    item.title.toLowerCase().includes('araucária') ||
                    item.content?.toLowerCase().includes('araucária') ||
                    item.contentSnippet?.toLowerCase().includes('araucária') ||
                    url.includes('search?q=Araucaria') // Se for busca específica, aceita tudo
                );

                foundItems.push(...relevant);
            } catch (err) {
                console.warn(`      ⚠️ Falha ao ler feed: ${err.message}`);
            }
        }
    } catch (e) {
        console.error("   ❌ Erro geral no Scout RSS:", e);
    }

    // Se achou pouco, completa com Mock
    if (foundItems.length < count) {
        console.log(`   📉 Apenas ${foundItems.length} notícias reais encontradas. Completando com simulação...`);
        const needed = count - foundItems.length;
        const shuffled = MOCK_PAUTAS.sort(() => 0.5 - Math.random()).slice(0, needed);

        const mockConverted = shuffled.map(p => ({
            title: p.title,
            content: p.content, // Mock content is plain text description
            link: "http://localhost:3001", // Fake link
            pubDate: new Date().toISOString()
        }));

        foundItems.push(...mockConverted);
    }

    // Limitar e Formatar para o Editor
    const selected = foundItems.slice(0, count);

    return selected.map(item => ({
        type: 'rss_feed_real',
        data: {
            title: item.title,
            // O content do RSS pode ser curto, o Editor vai expandir
            content: item.contentSnippet || item.content || item.title,
            link: item.link
        }
    }));
}
