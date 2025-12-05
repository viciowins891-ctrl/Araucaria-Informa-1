
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
}

export interface Event {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
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
}
