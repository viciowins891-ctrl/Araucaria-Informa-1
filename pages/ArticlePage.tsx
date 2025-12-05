
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { NewsArticle } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';
import NewsCard from '../components/NewsCard'; // Importação necessária

// Imagem segura para caso a original quebre
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1000';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]); // Estado para notícias relacionadas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState<string>('');

    useEffect(() => {
        const fetchArticleAndRelated = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const currentArticle = await api.getNewsById(Number(id));
                if (currentArticle) {
                    setArticle(currentArticle);
                    setImgSrc(currentArticle.imageUrl);

                    // Busca notícias relacionadas (mock: pega as 3 primeiras que não são a atual)
                    // Num cenário real, filtraria por categoria ou tags
                    const allNews = await api.getNews();
                    const others = allNews
                        .filter(item => item.id !== currentArticle.id)
                        .slice(0, 3); // Pega 3 notícias para sugerir
                    setRelatedArticles(others);

                } else {
                    setError('Artigo não encontrado.');
                }
            } catch (err) {
                setError('Erro ao carregar o artigo.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticleAndRelated();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;

    if (error || !article) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <span className="material-icons-outlined text-6xl text-gray-300 mb-4">article</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Ops!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Artigo não encontrado.'}</p>
            <button 
                onClick={() => navigate('/noticias')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
                Voltar para Notícias
            </button>
        </div>
    );

    return (
        <article className="bg-background-light dark:bg-background-dark min-h-screen pb-20">
            {/* Hero Section do Artigo */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-gray-200 dark:bg-gray-800">
                <img 
                    src={imgSrc || FALLBACK_IMAGE} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
                
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Link 
                        to="/noticias" 
                        className="inline-flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-medium"
                    >
                        <span className="material-icons-outlined text-base">arrow_back</span>
                        Voltar
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-24 relative z-10">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200`}>
                            {article.category}
                        </span>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <span className="material-icons-outlined text-base mr-1">calendar_today</span>
                            <strong>Divulgado no site em:</strong>&nbsp;{article.publishDate}
                        </div>
                        {article.author && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm border-l border-gray-300 dark:border-gray-700 pl-4 ml-2">
                                <span className="material-icons-outlined text-base mr-1">person</span>
                                por {article.author}
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-display leading-tight mb-8">
                        {article.title}
                    </h1>

                    <AdSpace format="horizontal" className="my-6" />

                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />

                    {/* Conteúdo do Artigo */}
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.summary}</p>` }}
                    />
                    
                    {/* Nota de esclarecimento sobre o contexto da data */}
                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border-l-4 border-gray-300 dark:border-gray-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                            Nota: Este conteúdo refere-se a fatos já ocorridos e oficiais. A data apresentada no topo do artigo corresponde ao dia de sua divulgação neste portal.
                        </p>
                    </div>

                    <AdSpace format="horizontal" className="my-8" />

                    {/* Rodapé do Artigo */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {/* Exibição da Fonte Original (Grounding) */}
                        {article.sourceUrl && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-800 w-full md:w-auto">
                                <p className="text-xs text-blue-800 dark:text-blue-300 mb-1 font-semibold uppercase">Fonte Original</p>
                                <a 
                                    href={article.sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                                >
                                    <span className="material-icons-outlined text-base">open_in_new</span>
                                    {article.sourceName || 'Ler matéria completa na fonte'}
                                </a>
                            </div>
                        )}

                        <div className="flex gap-2 ml-auto">
                            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                <span className="material-icons-outlined">share</span>
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                                <span className="material-icons-outlined">favorite_border</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Seção de Notícias Relacionadas / Leia Também */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-1 h-8 bg-primary rounded-full"></span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Leia Também</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map(relArticle => (
                                <NewsCard key={relArticle.id} article={relArticle} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default ArticlePage;
