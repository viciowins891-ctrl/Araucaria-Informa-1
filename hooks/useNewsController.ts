import { useState, useEffect, useMemo, useRef } from 'react';
import { api } from '../services/api';
import { useFetch } from './useFetch';
import { newsService } from '../services/NewsService';
import { allNewsCategories } from '../data';

const ITEMS_PER_PAGE = 10;

// Tipo de retorno do "Maestro"
interface NewsController {
    currentArticles: any[]; // Ou NewsArticle[]
    loading: boolean;
    error: string | null;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void; // Exposto se precisar setar manual
    totalPages: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    categories: string[];
}

/**
 * Maestro Central (Custom Hook) para a Página de Notícias.
 * Centraliza todo o gerenciamento de estado, efeitos colaterais e coordenação de dados.
 * A View (NewsPage) apenas "pede" os dados e os exibe.
 */
export const useNewsController = (): NewsController => {
    // 1. Gerenciamento de Estado (State Management)
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return sessionStorage.getItem('news_category') || 'Todas';
    });

    const [currentPage, setCurrentPage] = useState(() => {
        return Number(sessionStorage.getItem('news_page')) || 1;
    });

    // 2. Busca de Dados (Data Fetching via API)
    // Cache key 'news-list-stable' garante persistência
    const { data: articles, loading, error } = useFetch(api.getNews, 'news-list-stable');

    // 3. Efeitos Colaterais (Side Effects) - Persistência
    useEffect(() => {
        sessionStorage.setItem('news_category', selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        sessionStorage.setItem('news_page', currentPage.toString());
    }, [currentPage]);

    // Reseta página ao mudar categoria (Mas ignora o mount inicial)
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setCurrentPage(1);
    }, [selectedCategory]);

    // 4. Lógica de Negócios (Delegação para o Singleton Service)
    const filteredArticles = useMemo(() => {
        return newsService.filterByCategory(articles || [], selectedCategory);
    }, [selectedCategory, articles]);

    const currentArticles = useMemo(() => {
        return newsService.paginate(filteredArticles, currentPage, ITEMS_PER_PAGE);
    }, [filteredArticles, currentPage]);

    const totalPages = useMemo(() => {
        return newsService.getTotalPages(filteredArticles.length, ITEMS_PER_PAGE);
    }, [filteredArticles.length]);

    // 5. Handlers de Ação (Action Handlers)
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            scrollToTop();
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            scrollToTop();
        }
    };

    // Retorna a interface pública do "Maestro"
    return {
        currentArticles,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        totalPages,
        handleNextPage,
        handlePrevPage,
        categories: allNewsCategories,
    };
};
