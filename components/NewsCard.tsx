
import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';

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

// Imagem genérica de cidade (Fallback seguro)
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1000';

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const categoryColorClass = colorVariants[article.categoryColor] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200';
    
    // Estado para controlar a URL da imagem atual
    const [imgSrc, setImgSrc] = useState(article.imageUrl);
    // Estado para saber se já estamos usando o fallback
    const [isFallback, setIsFallback] = useState(false);
    // Estado para erro final (nem original nem fallback funcionaram)
    const [hasError, setHasError] = useState(false);

    // Reseta os estados se a prop article mudar (ex: paginação ou filtro)
    useEffect(() => {
        setImgSrc(article.imageUrl);
        setIsFallback(false);
        setHasError(false);
    }, [article.imageUrl]);

    const handleError = () => {
        if (!isFallback) {
            // Primeira falha: Tenta carregar a imagem de fallback
            console.warn(`Falha ao carregar imagem: ${article.title}. Tentando fallback.`);
            setImgSrc(FALLBACK_IMAGE);
            setIsFallback(true);
        } else {
            // Segunda falha (Fallback também falhou): Mostra o placeholder de erro
            console.error(`Falha crítica: Imagem original e fallback falharam para ${article.title}`);
            setHasError(true);
        }
    };

    return (
        <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <div className="relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
                {!hasError ? (
                    <img 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={imgSrc}
                        onError={handleError}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 flex-col gap-2">
                        <span className="material-icons-outlined text-4xl text-gray-400">image_not_supported</span>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                     <span className={`${categoryColorClass} text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm`}>
                        {article.category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3 font-medium">
                    <span className="material-icons-outlined text-sm mr-1">schedule</span>
                    <span>{article.publishDate}</span>
                </div>
                
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                </h3>
                
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {article.summary}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors flex items-center gap-1">
                        Ler artigo <span className="material-icons-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
