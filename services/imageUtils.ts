// Versão global de cache para imagens. Atualize isso para forçar o recarregamento de todas as imagens locais.
const CACHE_VERSION = 'v20250104_1100';

export const getOptimizedImageUrl = (url: string, width: number = 800, quality: number = 80): string => {
    if (!url) return '';

    // Se for URL do Unsplash, adiciona/substitui parâmetros
    if (url.includes('images.unsplash.com')) {
        try {
            const urlObj = new URL(url);
            urlObj.searchParams.set('w', width.toString());
            urlObj.searchParams.set('q', quality.toString());
            urlObj.searchParams.set('auto', 'format');
            urlObj.searchParams.set('fit', 'crop');
            return urlObj.toString();
        } catch (e) {
            return url;
        }
    }

    // Otimização para imagens locais (conversão para WebP mobile)
    if (url.startsWith('/images/')) {
        let finalUrl = url;

        // 1. Tenta servir a versão mobile se for pequena
        if (width <= 640 && !url.includes('_mobile')) {
            const cleanUrl = url.split('?')[0].split('#')[0];
            const lastDotIndex = cleanUrl.lastIndexOf('.');

            if (lastDotIndex !== -1) {
                const basePath = cleanUrl.substring(0, lastDotIndex);
                const queryParams = url.includes('?') ? '&' + url.split('?')[1] : ''; // Atenção: aqui viraria '&' pois vamos adicionar '?' na mobile
                // Mas a mobile é um arquivo novo, então usamos query params originais como secundários OU descartamos.
                // Simplificação robusta:
                const existingParams = url.split('?')[1];
                finalUrl = `${basePath}_mobile.webp`;
                if (existingParams) finalUrl += `?${existingParams}`;
            }
        }

        // 2. APLICAÇÃO GLOBAL DE CACHE BUSTING (PADRONIZAÇÃO)
        // Se a URL ainda não tem um parâmetro de versão ('v='), adicionamos a versão global.
        if (!finalUrl.includes('v=')) {
            const separator = finalUrl.includes('?') ? '&' : '?';
            finalUrl = `${finalUrl}${separator}v=${CACHE_VERSION}`;
        }

        return finalUrl;
    }

    return url;
};

// Função de Placeholder Local (Fallback Seguro)
export const getPlaceholderImage = (category: string): string => {
    // Normaliza a categoria para garantir o match (e aceita o formato UPPERCASE do usuário)
    const normalized = (category || '').toUpperCase();

    // Mapeamento Inteligente: Categoria Interna/Externa -> Arquivo Local
    if (normalized.includes('ECONOMIA') || normalized.includes('INDÚSTRIA')) return '/images/placeholder_economia.png';
    if (normalized.includes('TURISMO') || normalized.includes('LAZER')) return '/images/placeholder_turismo.png';
    if (normalized.includes('EDUCAÇÃO')) return '/images/placeholder_educacao.png';
    if (normalized.includes('INFRAESTRUTURA') || normalized.includes('OBRA')) return '/images/placeholder_infraestrutura.png';
    if (normalized.includes('SEGURANÇA')) return '/images/placeholder_seguranca.png';
    if (normalized.includes('ESPORTE')) return '/images/placeholder_esporte.png';
    if (normalized.includes('CULTURA')) return '/images/placeholder_turismo.png';
    if (normalized.includes('COMÉRCIO') || normalized.includes('VAREJO')) return '/images/placeholder_comercio.png';

    // Novos mapeamentos
    if (normalized.includes('SAÚDE') || normalized.includes('MÉDICO')) return '/images/news_context_health.png';
    if (normalized.includes('POLÍTICA') || normalized.includes('CÂMARA') || normalized.includes('PREFEITURA')) return '/images/news_budget_chamber.png';
    if (normalized.includes('TECNOLOGIA') || normalized.includes('INOVAÇÃO')) return '/images/news_hackathon_coding.png';
    if (normalized.includes('CIDADE') || normalized.includes('URBANO')) return '/images/araucaria_smart_city.jpg';

    // Default seguro
    return '/images/placeholder_default.png';
};

// Função para obter Imagem Secundária (Evita repetição da capa)
export const getSecondaryPlaceholderImage = (category: string): string => {
    const normalized = (category || '').toUpperCase();

    // Secondary Image Mappings (Alternativas contextuais)
    if (normalized.includes('ECONOMIA') || normalized.includes('INDÚSTRIA')) return '/images/araucaria_smart_city.jpg'; // Alternativa geral
    if (normalized.includes('TURISMO') || normalized.includes('LAZER')) return '/images/araucaria_gateway.jpg';
    if (normalized.includes('EDUCAÇÃO')) return '/images/news_hackathon_coding.png'; // Tech/Educação
    if (normalized.includes('INFRAESTRUTURA') || normalized.includes('OBRA')) return '/images/araucaria_smart_city.jpg';
    if (normalized.includes('SEGURANÇA')) return '/images/news_budget_chamber.png'; // Política/Segurança
    if (normalized.includes('ESPORTE')) return '/images/placeholder_turismo.png'; // Outdoor
    if (normalized.includes('CULTURA')) return '/images/placeholder_educacao.png';
    if (normalized.includes('COMÉRCIO')) return '/images/placeholder_economia.png';

    if (normalized.includes('SAÚDE')) return '/images/saude_atendimento_interno.png'; // Nova imagem gerada (Nano Banana Pro)
    if (normalized.includes('POLÍTICA')) return '/images/araucaria_smart_city.jpg'; // Prefeitura/Cidade
    if (normalized.includes('TECNOLOGIA')) return '/images/placeholder_educacao.png';
    if (normalized.includes('CIDADE')) return '/images/placeholder_infraestrutura.png';

    return '/images/araucaria_gateway.jpg';
};
