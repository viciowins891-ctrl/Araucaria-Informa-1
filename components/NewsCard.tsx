
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';
import { getPlaceholderImage } from '../services/aiService';

interface NewsCardProps {
    article: NewsArticle;
}

const colorVariants: { [key: string]: string } = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 border-purple-200 dark:border-purple-800',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 border-green-200 dark:border-green-800',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 border-red-200 dark:border-red-800',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
};

// Imagem genérica de cidade/notícia (Fallback seguro) - Mantemos apenas como última opção se a função falhar
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800';

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const categoryColorClass = colorVariants[article.categoryColor] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200';

    // Otimiza a URL inicial
    const optimizedImageUrl = getOptimizedImageUrl(article.imageUrl, 800);

    // Estado para controlar a URL da imagem atual
    const [imgSrc, setImgSrc] = useState(optimizedImageUrl);
    // Estado para saber se já estamos usando o fallback
    const [isFallback, setIsFallback] = useState(false);
    // Estado para erro final (nem original nem fallback funcionaram)
    const [hasError, setHasError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    // Reseta os estados se a prop article mudar (ex: paginação ou filtro)
    useEffect(() => {
        setImgSrc(getOptimizedImageUrl(article.imageUrl, 800));
        setIsFallback(false);
        setHasError(false);
    }, [article.imageUrl]);

    const handleError = () => {
        if (!isFallback) {
            // Primeira falha: Tenta carregar a imagem de placeholder contextual
            console.warn(`Falha ao carregar imagem: ${article.title}. Tentando placeholder contextual.`);
            setImgSrc(getPlaceholderImage(article.category));
            setIsFallback(true);
        } else {
            // Segunda falha (Fallback também falhou): Mostra o placeholder de erro
            console.error(`Falha crítica: Imagem original e fallback falharam para ${article.title}`);
            setHasError(true);
        }
    };

    return (
        <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <Link to={`/noticias/${article.id}`} className="block relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer">
                {!hasError ? (
                    <img
                        alt={article.title}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={getOptimizedImageUrl(imgSrc, 400)} // Use a smaller size for the card thumbnail
                        loading="lazy"
                        width="400" // Explicit width for layout shift prevention
                        height="250" // Explicit height for layout shift prevention (assuming aspect ratio)
                        onLoad={() => setImageLoaded(true)}
                        onError={handleError}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 flex-col gap-2">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        <span className="text-xs text-gray-400 font-medium">Sem imagem disponível</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                    <span className={`${categoryColorClass} text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm`}>
                        {article.category}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3 font-medium">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{article.publishDate}</span>
                    </div>
                    {article.sourceName && (
                        <div className="flex items-center text-blue-500 max-w-[50%] truncate">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            <span className="truncate">{article.sourceName}</span>
                        </div>
                    )}
                </div>

                <Link to={`/noticias/${article.id}`} className="block">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3 leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>
                </Link>

                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {article.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <Link to={`/noticias/${article.id}`} className="text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors flex items-center gap-1 cursor-pointer">
                        Ler artigo <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
