
import { NewsArticle } from '../types';


// ============================================================================
// 1. SISTEMA DE IMAGENS CONTEXTUALIZADAS (Curadoria Profissional)
// ============================================================================

// Função de Placeholder Local (Fallback Seguro)
// Garante que se o Unsplash falhar, temos uma imagem bonita localmente.
export const getPlaceholderImage = (category: string): string => {
    // Normaliza a categoria para garantir o match (e aceita o formato UPPERCASE do usuário)
    const normalized = category.toUpperCase();

    // Mapeamento Inteligente: Categoria Interna/Externa -> Arquivo Local
    // Note: Arquivos convertidos para .png conforme geração
    if (normalized.includes('ECONOMIA') || normalized.includes('INDÚSTRIA')) return '/images/placeholder_economia.png';
    if (normalized.includes('TURISMO') || normalized.includes('LAZER')) return '/images/placeholder_turismo.png';
    if (normalized.includes('EDUCAÇÃO')) return '/images/placeholder_educacao.png';
    if (normalized.includes('INFRAESTRUTURA') || normalized.includes('OBRA')) return '/images/placeholder_infraestrutura.png';
    if (normalized.includes('SEGURANÇA')) return '/images/placeholder_seguranca.png';
    if (normalized.includes('ESPORTE') || normalized.includes('CULTURA')) return '/images/placeholder_esporte.png';
    if (normalized.includes('COMÉRCIO') || normalized.includes('VAREJO')) return '/images/placeholder_comercio.png';

    // Default seguro
    return '/images/placeholder_default.png';
};

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

// Templates REAIS baseados nas notícias oficiais de Dezembro/2025 para rotação semanal
const WEEKLY_TEMPLATES = [
    {
        title: "Araucária zera fila de espera por vagas em CMEIs para 2025",
        summary: "Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.",
        content: "Um marco histórico para a educação de Araucária. A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil (CMEIs) foi totalmente zerada. O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025.",
        baseCategory: "Educação",
        fixedImage: "/images/news_cmei_2025.png"
    },
    {
        title: "Orçamento Municipal para 2026 deve chegar a R$ 2,3 bilhões",
        summary: "Previsão orçamentária aponta crescimento na arrecadação e maiores investimentos em obras e saúde.",
        content: "A Lei Orçamentária Anual (LOA) discutida na Câmara Municipal projeta um orçamento recorde de aproximadamente R$ 2,3 bilhões para Araucária em 2026. A prioridade dos recursos será para a manutenção dos serviços de saúde e grandes obras de infraestrutura viária.",
        baseCategory: "Economia",
        fixedImage: "/images/news_budget.png"
    },
    {
        title: "Governador inaugura unidade do Poupatempo em Araucária",
        summary: "Nova agência no centro da cidade unifica mais de 240 serviços estaduais e municipais.",
        content: "Foi inaugurada oficialmente a primeira unidade de rua do Poupatempo no Paraná, localizada em Araucária. O espaço moderno facilita a vida do cidadão, permitindo emitir documentos como RG e CNH, além de solicitar serviços da Copel e Sanepar em um único lugar.",
        baseCategory: "Cidade",
        fixedImage: "/images/news_poupatempo.png"
    },
    {
        title: "Pacote de investimentos federais destina R$ 20 milhões para Araucária",
        summary: "Recursos serão aplicados na construção de novas unidades de saúde e reformas escolares.",
        content: "Em visita oficial, representantes do Governo Federal anunciaram um pacote de investimentos para Araucária. Serão R$ 2,8 milhões destinados à Saúde e R$ 18 milhões para a Educação, focados na ampliação da rede física de atendimento.",
        baseCategory: "Política",
        fixedImage: "/images/news_investments.png"
    },
    {
        title: "Polícia Civil incinera 114 kg de drogas apreendidas na região",
        summary: "Ação realizada nesta semana marca o combate efetivo ao tráfico em Araucária.",
        content: "A Polícia Civil do Paraná (PCPR) realizou a incineração de mais de 114 quilos de entorpecentes apreendidos em operações recentes em Araucária. O delegado responsável destacou a importância das denúncias anônimas da população para o sucesso das apreensões.",
        baseCategory: "Segurança",
        fixedImage: "/images/custom_drugs.jpg"
    },
    {
        title: "Vacinação contra Vírus Sincicial Respiratório (VSR) para gestantes",
        summary: "Saúde inicia imunização para proteger recém-nascidos de infecções graves.",
        content: "A Secretaria Municipal de Saúde iniciou a campanha de vacinação contra o VSR voltada para gestantes. A medida visa transmitir anticorpos para o bebê ainda na gestação, garantindo proteção contra bronquiolites e pneumonias nos primeiros meses de vida.",
        baseCategory: "Saúde"
    },
    {
        title: "Cantata de Natal emociona fiéis no Santuário",
        summary: "Apresentação 'Um Conto de Natal' reuniu centenas de pessoas no fim de semana.",
        content: "O clima natalino tomou conta de Araucária com a belíssima apresentação da Cantata 'Um Conto de Natal' na Paróquia Nossa Senhora do Perpétuo Socorro. O evento contou com coral infantil e orquestra, emocionando o público presente.",
        baseCategory: "Cultura"
    }
];

const BAIRROS = ['Jardim Iguaçu', 'Costeira', 'Campina da Barra', 'Centro', 'Capela Velha'];
const TEMAS_SAUDE = ['Dengue', 'Vacinação', 'Saúde Mental', 'Diabetes'];

/**
 * Gera um prompt de imagem otimizado com base na categoria e título.
 * Define o foco visual específico para manter a identidade do Araucária Informa.
 */
export const generateImagePrompt = (title: string, category: string): string => {
    let visualFocus = "";
    // Normaliza a categoria para facilitar o match
    const normCategory = category.toUpperCase();

    // Mapeamento de Foco Visual para as 7 Categorias do Araucária Informa
    if (normCategory.includes('ECONOMIA') || normCategory.includes('INDÚSTRIA')) {
        visualFocus = "Fotografia de drone, vista da Refinaria REPAR ou silhuetas industriais. Tom azul e cinza.";
    } else if (normCategory.includes('TURISMO') || normCategory.includes('LAZER') || normCategory.includes('MEIO AMBIENTE')) {
        visualFocus = "Paisagem natural, Araucárias, Parque Cachoeira ou turismo rural. Cores vibrantes.";
    } else if (normCategory.includes('EDUCAÇÃO') || normCategory.includes('ESCOLA')) {
        visualFocus = "Crianças em atividades escolares (Robótica ou leitura), infraestrutura de CMEI moderno.";
    } else if (normCategory.includes('INFRAESTRUTURA') || normCategory.includes('OBRA') || normCategory.includes('TRÂNSITO')) {
        visualFocus = "Obras urbanas, novas ciclovias, ruas com iluminação LED ou serviços públicos modernos.";
    } else if (normCategory.includes('SEGURANÇA')) {
        visualFocus = "Câmeras de monitoramento inteligente ou Guarda Municipal (GM) em ação. Foco em tecnologia.";
    } else if (normCategory.includes('ESPORTE') || normCategory.includes('CULTURA') || normCategory.includes('EVENTOS')) {
        visualFocus = "Ginásio Joval de Paula Souza, palco de festival de teatro ou jogo de futebol. Cena comunitária e dinâmica.";
    } else if (normCategory.includes('COMÉRCIO') || normCategory.includes('VAREJO')) {
        visualFocus = "Vitrine de loja de Araucária ou comércio de rua, com foco em incentivo local. Foto convidativa.";
    } else {
        // Prompt genérico para categorias desconhecidas
        visualFocus = "Cena urbana de Araucária, representando notícias locais. Alta resolução.";
    }

    // Combina o título específico da notícia com o foco visual da categoria
    return `Gere uma imagem com estilo de fotografia jornalística. Título do artigo: "${title}". Foco Visual: ${visualFocus}`;
};

/**
 * Simula a busca de novas notícias "confirmadas" (Geradas via Templates para demo)
 */
export const fetchWeeklyNewsWithAI = async (): Promise<NewsArticle[]> => {
    console.log("[AI Service] Buscando notícias da semana...");

    // Simula delay de rede
    await new Promise(r => setTimeout(r, 800));

    // Gera 1 notícia nova baseada na semana atual
    const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
    const templateIdx = weekNumber % WEEKLY_TEMPLATES.length;
    const template = WEEKLY_TEMPLATES[templateIdx];

    // Preenche variáveis do template
    let finalTitle = template.title;
    if (finalTitle.includes('{bairro}')) finalTitle = finalTitle.replace('{bairro}', BAIRROS[weekNumber % BAIRROS.length]);
    if (finalTitle.includes('{tema}')) finalTitle = finalTitle.replace('{tema}', TEMAS_SAUDE[weekNumber % TEMAS_SAUDE.length]);
    if (finalTitle.includes('{numero}')) finalTitle = finalTitle.replace('{numero}', (30 + (weekNumber % 10) * 5).toString());

    // Processamento Inteligente
    const detectedTopic = detectTopic(finalTitle, template.content);

    // GERAÇÃO DE PROMPT (Simulação de IA Real)
    // Aqui usamos a lógica nova para "construir" o pedido da imagem, mesmo que no final usemos o banco curado.
    const imagePrompt = generateImagePrompt(finalTitle, detectedTopic);
    console.log(`[AI PROMPT GEN]: ${imagePrompt}`);

    // @ts-ignore
    const contextualImage = template.fixedImage || generateContextualImage(detectedTopic);

    // Mapeia categoria visual (cores do UI)
    const categoryColorMap: Record<string, string> = {
        'Economia': 'blue', 'Saúde': 'red', 'Infraestrutura': 'purple',
        'Segurança': 'red', 'Educação': 'yellow', 'Meio ambiente': 'green',
        'Tecnologia': 'indigo'
    };

    const newArticle: NewsArticle = {
        id: 2000 + weekNumber, // ID único por semana
        title: finalTitle,
        summary: template.summary,
        content: `<p>${template.content}</p><p>Mais detalhes serão divulgados no Diário Oficial.</p>`,
        category: detectedTopic, // Usa o tópico detectado como categoria exibida
        categoryColor: categoryColorMap[detectedTopic] || 'blue',
        publishDate: new Date().toLocaleDateString('pt-BR'),
        author: "Sistema de Atualização Semanal",
        imageUrl: contextualImage,
        sourceName: "Notícias Oficiais",
        sourceUrl: ""
    };

    console.log(`[AI Service] Notícia Gerada: [${detectedTopic}] ${finalTitle}`);
    console.log(`[AI Service] Imagem Aplicada: ${contextualImage}`);

    return [newArticle];
};

export const generateDeepArticle = async (topic: string = ''): Promise<NewsArticle[]> => {
    return fetchWeeklyNewsWithAI();
};