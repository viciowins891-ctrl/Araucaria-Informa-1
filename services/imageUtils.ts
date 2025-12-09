
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

    return url;
};
