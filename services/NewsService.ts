import { NewsArticle } from '../types';

/**
 * Singleton Class para Lógica de Negócios de Notícias.
 * Implementa o padrão Singleton para garantir uma única instância de processamento.
 * Responsável por filtrar, ordenar e paginar dados, desacoplando a lógica da View.
 */
class NewsService {
    private static instance: NewsService;

    // Construtor privado para impedir 'new NewsService()' direto
    private constructor() { }

    // Ponto de acesso global (Singleton)
    public static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService();
        }
        return NewsService.instance;
    }

    /**
     * Filtra notícias por categoria.
     * @param articles Lista completa de notícias
     * @param category Categoria selecionada
     * @returns Lista filtrada
     */
    public filterByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
        if (!articles) return [];
        if (category === 'Todas') {
            return articles;
        }
        return articles.filter(article => article.category === category);
    }

    /**
     * Pagina uma lista de notícias.
     * @param articles Lista (já filtrada)
     * @param page Página atual (1-based)
     * @param itemsPerPage Itens por página
     * @returns Subconjunto de notícias para a página atual
     */
    public paginate(articles: NewsArticle[], page: number, itemsPerPage: number): NewsArticle[] {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return articles.slice(startIndex, endIndex);
    }

    /**
     * Calcula o total de páginas.
     * @param totalItems Total de itens filtrados
     * @param itemsPerPage Itens por página
     */
    public getTotalPages(totalItems: number, itemsPerPage: number): number {
        return Math.ceil(totalItems / itemsPerPage);
    }
}

// Exporta a instância única (Singleton prático em JS/TS)
export const newsService = NewsService.getInstance();
