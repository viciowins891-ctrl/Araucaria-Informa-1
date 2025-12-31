import React, { useState, useMemo, useEffect, useRef } from 'react';
import { allNewsCategories } from '../data';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';

const ITEMS_PER_PAGE = 10;

const NewsPage: React.FC = () => {
    useEffect(() => {
        document.title = "Notícias de Araucária - Araucária Informa";
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return sessionStorage.getItem('news_category') || 'Todas';
    });
    const [currentPage, setCurrentPage] = useState(() => {
        return Number(sessionStorage.getItem('news_page')) || 1;
    });

    // Usamos cache 'news-list' para evitar recarregamento ao voltar
    const { data: articles, loading, error } = useFetch(api.getNews, 'news-list-stable');

    // Persiste categoria ao mudar e RESETA a página (comportamento esperado de filtro novo)
    // Mas se for a mesma categoria inicial (mount), não reseta.
    useEffect(() => {
        sessionStorage.setItem('news_category', selectedCategory);
    }, [selectedCategory]);

    // Reseta página APENAS se o usuário mudou a categoria explicitamente
    // Precisamos diferenciar "mount inicial" de "mudança pelo usuário"
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setCurrentPage(1);
    }, [selectedCategory]);

    // Persiste página ao mudar
    useEffect(() => {
        sessionStorage.setItem('news_page', currentPage.toString());
    }, [currentPage]);

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        if (selectedCategory === 'Todas') {
            return articles;
        }
        return articles.filter(article => article.category === selectedCategory);
    }, [selectedCategory, articles]);

    // Lógica de Paginação
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const currentArticles = filteredArticles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

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

    return (
        <div className="container mx-auto px-6 py-12 flex-grow">
            <section>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-display">Notícias</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Fique por dentro de tudo que acontece em Araucária</p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <label htmlFor="category-filter" className="sr-only">Filtrar por categoria</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            <select
                                id="category-filter"
                                name="category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                                className="block w-full lg:w-64 pl-10 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm cursor-pointer"
                            >
                                {allNewsCategories.map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* FAIXA DE AVISO / DISCLAIMER */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-10 rounded-r-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                <strong>Observação Importante:</strong> As reportagens listadas abaixo tratam de fatos já ocorridos e oficiais, exceto eventos que são atuais ou futuros. As datas exibidas referem-se à divulgação do conteúdo no site.
                            </p>
                        </div>
                    </div>
                </div>

                {loading && <LoadingSpinner />}

                {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">Erro: {error}</div>}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                            {currentArticles.map(article => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                            {filteredArticles.length === 0 && (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nenhuma notícia encontrada</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                                        Não há notícias disponíveis na categoria "<strong>{selectedCategory}</strong>" no momento.
                                    </p>
                                    <button
                                        onClick={() => setSelectedCategory('Todas')}
                                        className="mt-6 text-primary font-semibold hover:underline"
                                    >
                                        Ver todas as notícias
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Paginação Real */}
                        {filteredArticles.length > ITEMS_PER_PAGE && (
                            <nav aria-label="Pagination" className="flex justify-center mt-12 items-center gap-2">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-md transition-colors ${currentPage === 1
                                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    Anterior
                                </button>

                                <span className="text-sm text-gray-600 dark:text-gray-400 px-4 font-medium">
                                    Página {currentPage} de {totalPages}
                                </span>

                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-md transition-colors ${currentPage === totalPages
                                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    Próxima
                                </button>
                            </nav>
                        )}
                    </>
                )}

                {!loading && !error && currentArticles.length > 3 && (
                    <AdSpace format="horizontal" className="mt-12" />
                )}
            </section>
        </div>
    );
};

export default NewsPage;