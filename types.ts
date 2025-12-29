
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
}

export interface Event {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string; // Adicionado: Data do evento (ex: 25/12/2025)
    time: string;
    location: string;
}

export interface Business {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    address: string;
    phone: string;
    website: string;
    description?: string;
    isFeatured?: boolean;
}
