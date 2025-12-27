
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
