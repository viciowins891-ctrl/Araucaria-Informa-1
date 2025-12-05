
import React, { useState, useMemo } from 'react';
import { allNewsCategories } from '../data'; // Mantemos categorias estáticas por enquanto
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';

const NewsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const { data: articles, loading, error } = useFetch(api.getNews);

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        if (selectedCategory === 'Todas') {
            return articles;
        }
        return articles.filter(article => article.category === selectedCategory);
    }, [selectedCategory, articles]);

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

                <AdSpace format="horizontal" className="mb-10" />

                {loading && <LoadingSpinner />}
                
                {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">Erro: {error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map(article => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                        {filteredArticles.length === 0 && (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma notícia encontrada nesta categoria.</p>
                            </div>
                        )}
                    </div>
                )}
                
                {!loading && !error && filteredArticles.length > 3 && (
                     <AdSpace format="horizontal" className="mt-12" />
                )}

                {!loading && !error && filteredArticles.length > 0 && (
                    <nav aria-label="Pagination" className="flex justify-center mt-12">
                        <button 
                            disabled 
                            className="px-4 py-2 mx-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        <button 
                            className="px-4 py-2 mx-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => console.log('Próxima página (Simulação)')}
                        >
                            Próxima
                        </button>
                    </nav>
                )}
            </section>
        </div>
    );
};

export default NewsPage;
