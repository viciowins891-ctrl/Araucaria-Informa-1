
export interface NewsArticle {
    id: number;
    title: string;
    summary: string;
    content?: string; // Campo opcional para o texto completo
    imageUrl: string;
    category: string;
    categoryColor: string;
    publishDate: string;
    author?: string;
    sourceUrl?: string; // Link original da notícia (Google Search Grounding)
    sourceName?: string; // Nome do site original
    internalImageUrl?: string; // Imagem específica para o corpo da notícia (Secondary Image)
    mobileImageUrl?: string; // Imagem específica para dispositivos móveis (Capa Mobile)
}

export interface Event {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string; // Adicionado: Data do evento (ex: 25/12/2025)
    time: string;
    location: string;
    internalImageUrl?: string; // Imagem interna opcional
    mobileImageUrl?: string; // Imagem mobile opcional
}

export interface Business {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    internalImageUrl?: string; // Imagem interna opcional
    mobileImageUrl?: string; // Imagem mobile opcional
    address: string;
    phone: string;
    website: string;
    description?: string;
    isFeatured?: boolean;
}
