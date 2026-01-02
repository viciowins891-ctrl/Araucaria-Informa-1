import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { NewsArticle, Event, Business } from '../types';

interface SearchResult {
    type: 'noticia' | 'evento' | 'comercio';
    id: number;
    title: string;
    description: string;
    date?: string;
    url: string;
}

const GlobalSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 3) {
                performSearch(query);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
            // Atalho CTRL+K para abrir
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const performSearch = async (searchTerm: string) => {
        setLoading(true);
        const lowerQuery = searchTerm.toLowerCase();
        const allResults: SearchResult[] = [];

        try {
            // 1. Search News
            const news = await api.getNews();
            news.forEach((n: NewsArticle) => {
                if (n.title.toLowerCase().includes(lowerQuery) || n.summary.toLowerCase().includes(lowerQuery)) {
                    allResults.push({
                        type: 'noticia',
                        id: n.id,
                        title: n.title,
                        description: n.summary,
                        date: n.publishDate,
                        url: `/noticia/${n.id}`
                    });
                }
            });

            // 2. Search Events
            const events = await api.getEvents();
            events.forEach((e: Event) => {
                if (e.title.toLowerCase().includes(lowerQuery) || e.description.toLowerCase().includes(lowerQuery)) {
                    allResults.push({
                        type: 'evento',
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        date: e.date,
                        url: `/evento/${e.id}`
                    });
                }
            });

            // 3. Search Businesses
            const businesses = await api.getBusinesses();
            businesses.forEach((b: Business) => {
                if (b.name.toLowerCase().includes(lowerQuery) || b.description.toLowerCase().includes(lowerQuery) || b.category.toLowerCase().includes(lowerQuery)) {
                    allResults.push({
                        type: 'comercio',
                        id: b.id,
                        title: b.name,
                        description: b.description,
                        url: '/comercio' // Poderia ser url específica se tivesse
                    });
                }
            });

            setResults(allResults.slice(0, 10)); // Top 10 matches
        } catch (e) {
            console.error("Erro na busca global:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = (url: string) => {
        setIsOpen(false);
        setQuery('');
        navigate(url);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 mr-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:flex items-center gap-2 group"
                title="Pesquisar (Ctrl+K)"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span className="text-xs font-medium text-blue-200 group-hover:text-white hidden lg:block">Buscar</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in">
            <div className="bg-white dark:bg-zinc-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                {/* Search Header */}
                <div className="flex items-center p-4 border-b border-gray-100 dark:border-zinc-700">
                    <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar notícias, eventos, serviços..."
                        className="flex-grow bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 px-2 text-xs font-bold bg-gray-100 dark:bg-zinc-700 text-gray-500 rounded border border-gray-200 dark:border-zinc-600 ml-2"
                    >
                        ESC
                    </button>
                </div>

                {/* Results Area */}
                <div className="overflow-y-auto flex-grow bg-white dark:bg-zinc-800 p-2">
                    {loading && (
                        <div className="p-8 text-center text-gray-500">
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-primary mr-2"></span>
                            Pesquisando...
                        </div>
                    )}

                    {!loading && query.length >= 3 && results.length === 0 && (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            Nenhum resultado encontrado para "{query}".
                        </div>
                    )}

                    {!loading && query.length < 3 && results.length === 0 && (
                        <div className="p-8 text-center text-sm text-gray-400">
                            Digite pelo menos 3 caracteres para buscar.
                        </div>
                    )}

                    <div className="space-y-1">
                        {results.map((result, idx) => (
                            <button
                                key={`${result.type}-${result.id}-${idx}`}
                                onClick={() => handleResultClick(result.url)}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700/50 group transition-colors flex items-start gap-4"
                            >
                                <div className={`mt-1 p-2 rounded-lg flex-shrink-0 
                                    ${result.type === 'noticia' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                                    ${result.type === 'evento' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                                    ${result.type === 'comercio' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                                `}>
                                    {result.type === 'noticia' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                                    {result.type === 'evento' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                    {result.type === 'comercio' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-900 dark:text-white truncate pr-4 group-hover:text-primary transition-colors">
                                            {result.title}
                                        </h4>
                                        {result.date && <span className="text-xs text-gray-500 whitespace-nowrap">{result.date}</span>}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{result.description}</p>
                                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400 mt-1 inline-block">{result.type}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
