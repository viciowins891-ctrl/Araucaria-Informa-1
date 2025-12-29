
import { NewsArticle } from '../types';


// ============================================================================
// 1. SISTEMA DE IMAGENS CONTEXTUALIZADAS (Curadoria Profissional)
// ============================================================================



// Banco de Imagens Curado: Estilo Jornalístico, Sem Pessoas (focado em objetos/cenários), Alta Resolução
// Mapeia Tópicos -> Lista de IDs do Unsplash garantidos
const IMAGE_DB: Record<string, string[]> = {

    'Política': [
        'https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&q=80&w=1000', // Prédio governamental abstrato / Caneta
        'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=1000', // Documentos / Martelo
        'https://images.unsplash.com/photo-1529101091760-6149d4c46b95?auto=format&fit=crop&q=80&w=1000'  // Fachada clássica
    ],
    'Economia': [
        'https://images.unsplash.com/photo-1611974765270-ca1258822981?auto=format&fit=crop&q=80&w=1000', // Gráfico financeiro (azul/clean)
        'https://images.unsplash.com/photo-1565514020176-dbf2277cc16d?auto=format&fit=crop&q=80&w=1000', // Moedas / Calculadora
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000'  // Ambiente corporativo abstrato
    ],
    'Segurança': [
        'https://images.unsplash.com/photo-1555627034-7033509618f0?auto=format&fit=crop&q=80&w=1000', // Viatura (detalhe/luzes)
        'https://images.unsplash.com/photo-1455735459330-969720ae058c?auto=format&fit=crop&q=80&w=1000', // Cadeado digital
        'https://images.unsplash.com/photo-1590422749870-13a83017a224?auto=format&fit=crop&q=80&w=1000'  // Câmera de segurança
    ],
    'Trânsito': [
        'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&q=80&w=1000', // Rodovia noturna (longa exposição)
        'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=1000', // Semáforo
        'https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&q=80&w=1000' // Cone de trânsito / Obras
    ],
    'Meio ambiente': [
        'https://images.unsplash.com/photo-1542601906990-24d4c16419d0?auto=format&fit=crop&q=80&w=1000', // Folha / Reciclagem
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000', // Campo verde
        'https://images.unsplash.com/photo-1611273426728-6536b694ddda?auto=format&fit=crop&q=80&w=1000' // Rio limpo
    ],
    'Clima': [
        'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=1000', // Céu nublado / Tempestade
        'https://images.unsplash.com/photo-1504386106331-1fd61157add3?auto=format&fit=crop&q=80&w=1000', // Sol forte
        'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=1000' // Chuva na janela
    ],
    'Tecnologia': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000', // Circuito / Chip
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000', // Rede digital / Globo
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000' // Código / Matrix
    ],
    'Educação': [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000', // Lápis / Livros
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000', // Biblioteca moderna
        'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1000' // Mesa de estudo
    ],
    'Saúde': [
        'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000', // Estetoscópio
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000', // Ambiente hospitalar clean
        'https://images.unsplash.com/photo-1584036561566-b93a901668d4?auto=format&fit=crop&q=80&w=1000' // Microscópio / Laboratório
    ],
    'Energia': [
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000', // Lâmpada ideia / LED
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000', // Painel Solar / Eólica
        'https://images.unsplash.com/photo-1569762825000-c971033d5966?auto=format&fit=crop&q=80&w=1000' // Torres de transmissão
    ],
    'Transporte': [
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1000', // Ônibus moderno
        'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=1000', // Ponto de ônibus / Terminal
        'https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?auto=format&fit=crop&q=80&w=1000' // Trem / Trilho
    ],
    'Eventos locais': [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', // Plateia desfocada
        'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=1000', // Palco / Luzes
        'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000' // Confete / Celebração
    ],
    'Infraestrutura': [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000', // Construção / Guindaste
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000', // Pavimentação / Obra
        'https://images.unsplash.com/photo-1590486803833-1c5dc8ce4721?auto=format&fit=crop&q=80&w=1000' // Ponte / Concreto
    ],
    'Geral': [
        'https://images.unsplash.com/photo-1449824913929-2b3a3e36e65b?auto=format&fit=crop&q=80&w=1000'  // Cidade vista de cima (neutra)
    ]
};

// Palavras-chave para detecção
const KEYWORDS: Record<string, string[]> = {
    'Política': ['câmara', 'prefeito', 'vereador', 'lei', 'decreto', 'votação', 'eleição', 'posse', 'mandato'],
    'Economia': ['dinheiro', 'imposto', 'repar', 'indústria', 'emprego', 'vaga', 'loja', 'varejo', 'investimento', 'PIB'],
    'Segurança': ['polícia', 'guarda', 'segurança', 'roubo', 'furto', 'crime', 'delegacia', 'viatura', 'arma'],
    'Trânsito': ['trânsito', 'carro', 'ônibus', 'rua', 'avenida', 'semáforo', 'acidente', 'engarrafamento', 'multa'],
    'Meio ambiente': ['árvore', 'rio', 'lixo', 'reciclagem', 'preservação', 'parque', 'animais', 'poluição'],
    'Clima': ['chuva', 'sol', 'frio', 'calor', 'tempestade', 'tempo', 'previsão', 'granizo'],
    'Tecnologia': ['internet', 'app', 'aplicativo', 'wifi', '5g', 'computador', 'celular', 'digital', 'inovação'],
    'Educação': ['escola', 'aluno', 'professor', 'aula', 'curso', 'cmei', 'faculdade', 'ensino', 'matrícula'],
    'Saúde': ['hospital', 'médico', 'vacina', 'doença', 'paciente', 'ubs', 'remédio', 'saúde', 'dengue'],
    'Energia': ['luz', 'copel', 'apagão', 'poste', 'energia', 'elétrica', 'solar', 'consumo'],
    'Transporte': ['triar', 'terminal', 'passageiro', 'linha', 'cartão'],
    'Eventos locais': ['festa', 'show', 'feira', 'festival', 'evento', 'teatro', 'cinema', 'música'],
    'Infraestrutura': ['obra', 'buraco', 'asfalto', 'pavimentação', 'ponte', 'viaduto', 'construção'],
};

// ============================================================================
// 2. FUNÇÕES DE PROCESSAMENTO
// ============================================================================

/**
 * Detecta o tema principal da notícia com base no título e conteúdo.
 * Retorna uma das categorias oficiais do sistema.
 */
export const detectTopic = (title: string, content: string): string => {
    const fullText = `${title} ${content}`.toLowerCase();
    let bestMatch = 'Geral';
    let maxCount = 0;

    for (const [topic, words] of Object.entries(KEYWORDS)) {
        let count = 0;
        words.forEach(word => {
            if (fullText.includes(word)) count++;
        });

        if (count > maxCount) {
            maxCount = count;
            bestMatch = topic;
        }
    }

    // Fallback inteligente para termos muito fortes
    if (fullText.includes('repar') || fullText.includes('petrobras')) return 'Economia';
    if (fullText.includes('parque cachoeira')) return 'Meio ambiente';

    return bestMatch;
};

/**
 * Gera uma imagem 100% contextualizada baseada no Tópico detectado.
 * Seleciona aleatoriamente do pool curado para garantir variedade e qualidade.
 */
export const generateContextualImage = (topic: string): string => {
    const images = IMAGE_DB[topic] || IMAGE_DB['Geral'];
    // Hash do dia para variar imagem mas manter consistência no mesmo update
    const randomIdx = Math.floor(Math.random() * images.length);
    return images[randomIdx];
};


// ============================================================================
// 3. SIMULAÇÃO DE UPDATE SEMANAL (Conteúdo Fresco)
// ============================================================================

// ============================================================================
// 3. GERAÇÃO REAL COM GOOGLE GEMINI (Conteúdo Fresco e Único)
// ============================================================================

export const fetchWeeklyNewsWithAI = async (): Promise<NewsArticle[]> => {
    console.log("[AI Service] Iniciando geração em lote (3 notícias) via Google Gemini...");
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Fallback de Emergência: Gera 3 notícias distintas
    const fallbackNews = () => {
        const topics = [
            { t: 'Feira de Adoção Pet acontece neste fim de semana no Parque Cachoeira', c: 'Cidade', focus: 'Animais' },
            { t: 'Novas turbinas da REPAR aumentam eficiência energética em 15%', c: 'Economia', focus: 'Indústria' },
            { t: 'Prefeitura inicia revitalização da Av. Archelau de Almeida Torres', c: 'Infraestrutura', focus: 'Obras' },
            { t: 'Araucária Vôlei vence mais uma e segue líder na Superliga', c: 'Esporte', focus: 'Vôlei' },
            { t: 'Festival de Food Trucks agita o Centro Cívico nesta sexta', c: 'Cultura', focus: 'FoodTruck' },
            { t: 'Campanha de Vacinação contra a Gripe bate meta em Araucária', c: 'Saúde', focus: 'Saúde' },
            { t: 'Guarda Municipal recebe novas viaturas tecnológicas', c: 'Segurança', focus: 'Segurança' }
        ];

        // Imagens Curadas HD (Fallback)
        const topicImages: Record<string, string> = {
            'Animais': 'https://images.unsplash.com/photo-1601758228041-f3b2795255db?auto=format&fit=crop&q=80&w=1000',
            'Indústria': '/images/repar_turbines_new_final.jpg?v=final_fix_v5',
            'Obras': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000',
            'Vôlei': 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=1000',
            'FoodTruck': '/images/food_trucks_final_v6.png',
            'Saúde': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
            'Segurança': 'https://images.unsplash.com/photo-1590422749870-13a83017a224?auto=format&fit=crop&q=80&w=1000'
        };

        // Embaralha e seleciona 6 tópicos únicos
        const shuffled = topics.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);

        return selected.map((topic, index) => ({
            id: Date.now() + index,
            title: topic.t,
            summary: "Confira os detalhes sobre este importante acontecimento recente em nossa cidade.",
            content: `<p>${topic.t}. A cidade de Araucária segue em constante desenvolvimento com ações que beneficiam toda a comunidade. Mais informações serão divulgadas nos canais oficiais.</p>`,
            category: topic.c,
            categoryColor: 'blue',
            publishDate: new Date().toISOString().split('T')[0],
            author: "Redação IA Autoservice",
            imageUrl: topicImages[topic.focus] || generateContextualImage(topic.c),
            internalImageUrl: topicImages[topic.focus] || generateContextualImage(topic.c), // Garante que a imagem interna também seja definida
            sourceName: "Araucária Urgente"
        }));
    };

    if (!apiKey) {
        console.warn("[AI Service] Sem chave de API. Usando fallback em lote.");
        return fallbackNews();
    }

    try {
        const prompt = `
            Atue como um jornalista sênior de Araucária, Paraná.
            Gere 6 (SEIS) notícias curtas, inéditas e realistas sobre a cidade (evite "Poupatempo" ou "CMEI").
            Varie os temas entre: Clima, Trânsito, Cultura, Esporte e Economia.
            Responda EXATAMENTE como um ARRAY JSON:
            [
                { "title": "...", "summary": "...", "content": "...", "category": "..." },
                ...
            ]
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!generatedText) throw new Error("Sem resposta da IA");

        generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
        const newsArray = JSON.parse(generatedText);

        if (!Array.isArray(newsArray)) throw new Error("Resposta não é um array");

        // Processa o lote de notícias geradas
        return newsArray.map((newsData: any, index: number) => {
            const detectedTopic = newsData.category || detectTopic(newsData.title, newsData.summary);
            const colors: Record<string, string> = { 'Economia': 'blue', 'Esporte': 'green', 'Cultura': 'purple', 'Segurança': 'red' };

            return {
                id: Date.now() + index,
                title: newsData.title,
                summary: newsData.summary,
                content: newsData.content,
                category: detectedTopic,
                categoryColor: colors[detectedTopic] || 'gray',
                publishDate: new Date().toISOString().split('T')[0],
                author: "IA Reporter - Araucária Informa",
                imageUrl: generateContextualImage(detectedTopic),
                sourceName: "IA Gen"
            };
        });

    } catch (error) {
        console.error("[AI Service] Falha na geração em lote, revertendo para fallback:", error);
        return fallbackNews();
    }
};

export const generateDeepArticle = async (topic: string = ''): Promise<NewsArticle[]> => {
    return fetchWeeklyNewsWithAI();
};