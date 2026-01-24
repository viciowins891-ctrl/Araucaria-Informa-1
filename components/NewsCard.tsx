
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { getOptimizedImageUrl, getPlaceholderImage } from '../services/imageUtils';
import { stripHtml } from '../services/textUtils';
import { formatDateBR } from '../services/dateUtils';
// import { getPlaceholderImage } from '../services/aiService';

interface NewsCardProps {
    article: NewsArticle;
}

const colorVariants: { [key: string]: string } = {
    blue: 'bg-blue-600/[0.25] text-blue-600 border-blue-600 dark:bg-blue-500/[0.25] dark:text-blue-400 dark:border-blue-400',
    purple: 'bg-purple-600/[0.25] text-purple-600 border-purple-600 dark:bg-purple-500/[0.25] dark:text-purple-400 dark:border-purple-400',
    green: 'bg-green-600/[0.25] text-green-600 border-green-600 dark:bg-green-500/[0.25] dark:text-green-400 dark:border-green-400',
    red: 'bg-red-600/[0.25] text-red-600 border-red-600 dark:bg-red-500/[0.25] dark:text-red-400 dark:border-red-400',
    yellow: 'bg-yellow-600/[0.25] text-yellow-600 border-yellow-600 dark:bg-yellow-500/[0.25] dark:text-yellow-400 dark:border-yellow-400',
    indigo: 'bg-indigo-600/[0.25] text-indigo-600 border-indigo-600 dark:bg-indigo-500/[0.25] dark:text-indigo-400 dark:border-indigo-400',
    gray: 'bg-gray-600/[0.25] text-gray-600 border-gray-600 dark:bg-gray-500/[0.25] dark:text-gray-400 dark:border-gray-400',
};

// --- PADRÃO VISUAL BLOQUEADO ---
// Mapeamento Estrito de Cores por Categoria (Solicitação do Usuário: "Não alterar sem aval")
const STANDARD_CATEGORY_COLORS: { [key: string]: string } = {
    'Lazer': 'yellow',
    'Cultura': 'yellow',
    'Economia': 'blue',
    'Esporte': 'indigo',
    'Educação': 'red',
    'Saúde': 'green',
    'Infraestrutura': 'purple',
    'Cidade': 'blue',
    'Segurança': 'red',
    'Política': 'gray',
    'Geral': 'gray'
};

// Imagem genérica de cidade/notícia (Fallback seguro) - Mantemos apenas como última opção se a função falhar
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800';

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    // Lógica Blindada: Primeiro tenta o mapa padrão, se falhar usa a cor do objeto, se falhar usa cinza.
    const standardColor = STANDARD_CATEGORY_COLORS[article.category] || article.categoryColor || 'gray';
    const categoryColorClass = colorVariants[standardColor] || colorVariants['gray'];

    // Otimiza a URL inicial. Se houver uma imagem mobile definida explicitamente, usa ela.
    // Caso contrário, tenta gerar a versão otimizada da imagem principal.
    const initialImage = article.mobileImageUrl || getOptimizedImageUrl(article.imageUrl, 640);

    // Estado para controlar a URL da imagem atual
    const [imgSrc, setImgSrc] = useState(initialImage);
    // Estado para saber se já estamos usando o fallback
    const [isFallback, setIsFallback] = useState(false);
    // Estado para erro final (nem original nem fallback funcionaram)
    const [hasError, setHasError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    // Reseta os estados se a prop article mudar (ex: paginação ou filtro)
    useEffect(() => {
        setImgSrc(article.mobileImageUrl || getOptimizedImageUrl(article.imageUrl, 640));
        setIsFallback(false);
        setHasError(false);
    }, [article.imageUrl]);

    const handleError = () => {
        // Lógica de Fallback em Cascata:
        // 1. Tenta imagem inicial (Mobile ou Otimizada) -> Já foi tentado no render
        // 2. Se falhar, tenta a imagem ORIGINAL (sem _mobile, sem otimização)
        // 3. Se falhar, tenta o Placeholder Contextual
        // 4. Se falhar, mostra erro genérico

        if (imgSrc !== article.imageUrl && !isFallback) {
            // Nível 2: Tenta a original (pode ser pesada, mas é melhor que erro)
            // Verificamos se imgSrc é diferente da original para evitar loop infinito
            console.log(`Tentativa de recuperação: Usando imagem original para ${stripHtml(article.title)}`);
            setImgSrc(article.imageUrl);
        } else if (!isFallback) {
            // Nível 3: Placeholder Contextual (já tentamos original e não deu)
            console.warn(`Falha ao carregar imagem: ${stripHtml(article.title)}. Tentando placeholder contextual.`);
            setImgSrc(getPlaceholderImage(article.category));
            setIsFallback(true);
        } else {
            // Nível 4: Erro Final
            console.error(`Falha crítica: Todas as tentativas falharam para ${stripHtml(article.title)}`);
            setHasError(true);
        }
    };

    return (
        <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full hover:-translate-y-1">
            <Link to={`/noticias/${article.id}`} className="block relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer">
                {!hasError ? (
                    <img
                        alt={stripHtml(article.title)}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={(imgSrc === article.imageUrl || imgSrc.includes('?v=new')) ? imgSrc : getOptimizedImageUrl(imgSrc, 400)}
                        loading="lazy"
                        width="400"
                        height="250"
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
                {/* Category badge removed per user request - was appearing as watermark on images */}
                {/* <div className="absolute top-4 left-4">
                    <span className={`${categoryColorClass} text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm`}>
                        {article.category}
                    </span>
                </div> */}
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3 font-medium">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{formatDateBR(article.publishDate)}</span>
                    </div>
                    {article.sourceName && (
                        <div className="flex items-center text-blue-500 max-w-[50%] truncate">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            <span className="truncate">{article.sourceName}</span>
                        </div>
                    )}
                </div>

                <Link to={`/noticias/${article.id}`} className="block">
                    <h3
                        className="text-xl font-bold text-text-light dark:text-text-dark mb-3 leading-snug group-hover:text-primary transition-colors"
                        dangerouslySetInnerHTML={{ __html: article.title }}
                    />
                </Link>

                <div
                    className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm leading-relaxed line-clamp-3 flex-grow"
                    dangerouslySetInnerHTML={{ __html: article.summary }}
                />

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <Link to={`/noticias/${article.id}`} className="text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors flex items-center gap-1 cursor-pointer">
                        Ler artigo <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NewsCard);
