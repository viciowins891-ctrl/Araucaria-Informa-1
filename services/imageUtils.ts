
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
        // Se a largura solicitada for pequena (mobile/card), tenta servir a versão _mobile.webp
        // Assumimos que o script 'optimize-images.js' já gerou essas variantes para todas as imagens de /images/
        if (width <= 640 && !url.includes('_mobile')) {
            const cleanUrl = url.split('?')[0].split('#')[0];
            const lastDotIndex = cleanUrl.lastIndexOf('.');

            if (lastDotIndex !== -1) {
                const basePath = cleanUrl.substring(0, lastDotIndex);
                // Retorna a versão mobile (que é garantidamente .webp e < 50kb na maioria dos casos)
                return `${basePath}_mobile.webp`;
            }
        }
        return url;
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
    if (normalized.includes('ESPORTE') || normalized.includes('CULTURA')) return '/images/placeholder_esporte.png';
    if (normalized.includes('COMÉRCIO') || normalized.includes('VAREJO')) return '/images/placeholder_comercio.png';

    // Novos mapeamentos
    if (normalized.includes('SAÚDE') || normalized.includes('MÉDICO')) return '/images/news_context_health.png';
    if (normalized.includes('POLÍTICA') || normalized.includes('CÂMARA') || normalized.includes('PREFEITURA')) return '/images/news_budget_chamber.png';
    if (normalized.includes('TECNOLOGIA') || normalized.includes('INOVAÇÃO')) return '/images/news_hackathon_coding.png';
    if (normalized.includes('CIDADE') || normalized.includes('URBANO')) return '/images/araucaria_smart_city.jpg';

    // Default seguro
    return '/images/placeholder_default.png';
};
