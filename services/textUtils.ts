
/**
 * Remove todas as tags HTML de uma string.
 * Útil para tags meta, títulos de janela e atributos alt de imagem.
 * @param html String contendo HTML
 * @returns String de texto puro
 */
export const stripHtml = (html: string | undefined | null): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
};
