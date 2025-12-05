
import React, { useState, useMemo, useEffect } from 'react';
import { allNewsCategories } from '../data';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';

const ITEMS_PER_PAGE = 6;

const NewsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [currentPage, setCurrentPage] = useState(1);
    const { data: articles, loading, error } = useFetch(api.getNews);

    // Reseta para a página 1 sempre que trocar a categoria
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-display">Notícias</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Fique por dentro de tudo que acontece em Araucária</p>
                    </div>
                    
                    <div>
                        <label htmlFor="category-filter" className="sr-only">Filtrar por categoria</label>
                        <select
                            id="category-filter"
                            name="category"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                            className="block w-full min-w-[200px] pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                        >
                            {allNewsCategories.map(category => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* FAIXA DE AVISO / DISCLAIMER */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-10 rounded-r-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="material-icons text-amber-500 dark:text-amber-400">info</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                <strong>Observação Importante:</strong> As reportagens listadas abaixo tratam de fatos já ocorridos e oficiais, exceto eventos que são atuais ou futuros. As datas exibidas referem-se à divulgação do conteúdo no site.
                            </p>
                        </div>
                    </div>
                </div>

                <AdSpace format="horizontal" className="mb-10" />

                {loading && <LoadingSpinner />}
                
                {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">Erro: {error}</div>}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                            {currentArticles.map(article => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                            {filteredArticles.length === 0 && (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma notícia encontrada nesta categoria.</p>
                                </div>
                            )}
                        </div>

                        {/* Paginação Real */}
                        {filteredArticles.length > ITEMS_PER_PAGE && (
                            <nav aria-label="Pagination" className="flex justify-center mt-12 items-center gap-2">
                                <button 
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-md transition-colors ${
                                        currentPage === 1 
                                        ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Anterior
                                </button>
                                
                                <span className="text-sm text-gray-600 dark:text-gray-400 px-2">
                                    Página {currentPage} de {totalPages}
                                </span>

                                <button 
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-md transition-colors ${
                                        currentPage === totalPages
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
