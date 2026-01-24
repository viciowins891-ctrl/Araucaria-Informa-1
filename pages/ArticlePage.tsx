// Force Refresh

import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { NewsArticle } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';
import ShareButton from '../components/ShareButton';
import { getPlaceholderImage, getSecondaryPlaceholderImage } from '../services/imageUtils';
import { stripHtml } from '../services/textUtils';
import TextToSpeech from '../components/TextToSpeech';
import NewsCard from '../components/NewsCard';
import { formatDateBR } from '../services/dateUtils';

// Imagem segura para caso a original quebre (Final fallback)
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1000';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState<string>('');
    const [imageError, setImageError] = useState(false);

    // UI States
    const [readingProgress, setReadingProgress] = useState(0);
    const [secondaryImage, setSecondaryImage] = useState<string>('');

    // Save/Bookmark States
    const [isSaved, setIsSaved] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Check if article is saved on load
    useEffect(() => {
        if (article) {
            const saved = localStorage.getItem('araucaria_saved_articles');
            if (saved) {
                const ids = JSON.parse(saved);
                setIsSaved(ids.includes(article.id));
            }
        }
    }, [article]);

    useEffect(() => {
        const fetchArticleAndRelated = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const currentArticle = await api.getNewsById(Number(id));
                if (currentArticle) {
                    setArticle(currentArticle);

                    // Set Main Hero Image (Cover) - Directly from Data Source
                    // Initial set (will be overridden by responsive effect if mobile)
                    setImgSrc(currentArticle.imageUrl);
                    setImageError(false);

                    // Set Secondary Image (Internal)
                    // Priority 1: Explicit Internal Image from Data (ONLY if different from cover)
                    if (currentArticle.internalImageUrl && currentArticle.internalImageUrl !== currentArticle.imageUrl) {
                        setSecondaryImage(currentArticle.internalImageUrl);
                    } else {
                        // Priority 2: Smart Secondary Placeholder
                        // DESATIVADO: Para evitar imagens antigas/repetidas. 
                        // Agora confiamos apenas na imagem injetada no 'content' pelo backend.
                        setSecondaryImage('');
                    }

                    // Busca notícias relacionadas com Inteligência (Prioriza Mesma Categoria)
                    const allNews = await api.getNews();

                    // 1. Mesma Categoria (excluindo atual)
                    const sameCategory = allNews.filter(item => item.id !== currentArticle.id && item.category === currentArticle.category);

                    // 2. Outras (para preencher)
                    const others = allNews.filter(item => item.id !== currentArticle.id && item.category !== currentArticle.category);

                    // Merge: Prioridade Categoria + Resto, limita a 3
                    const smartRelated = [...sameCategory, ...others].slice(0, 3);
                    setRelatedArticles(smartRelated);

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

    // Responsive Image Switcher (Forces Mobile Image if available)
    useEffect(() => {
        if (!article) return;

        const updateImageSource = () => {
            // Check if mobile (md breakpoint is 768px)
            const isMobile = window.innerWidth < 768;

            if (isMobile && article.mobileImageUrl) {
                setImgSrc(article.mobileImageUrl);
            } else {
                setImgSrc(article.imageUrl);
            }
        };

        // Initial check
        updateImageSource();

        // Add listener
        window.addEventListener('resize', updateImageSource);

        return () => window.removeEventListener('resize', updateImageSource);
    }, [article]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleImageError = () => {
        if (!imageError) {
            console.warn("Imagem principal falhou. Tentando fallback seguro.");
            setImageError(true);
            setImgSrc(FALLBACK_IMAGE);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error || !article) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Ops!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Artigo não encontrado.'}</p>
            <button
                onClick={() => navigate('/noticias')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
            >
                Voltar para Notícias
            </button>
        </div>
    );

    const plainTitle = stripHtml(article.title);
    const plainSummary = stripHtml(article.summary || article.title);

    return (
        <article className="bg-background-light dark:bg-background-dark min-h-screen pb-20 font-body">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-800">
                <div
                    className="h-full bg-primary transition-all duration-150 ease-out"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

            {/* Generic Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
                    <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* SEO & Meta Tags Dinâmicas (Centralizado via Componente) */}
            <SEO
                title={plainTitle}
                description={plainSummary}
                image={article.imageUrl}
                type="article"
                author={article.author}
                publishedTime={article.publishDate}
            />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full bg-gray-900 overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
                <img
                    src={imgSrc || FALLBACK_IMAGE}
                    alt={plainTitle}
                    className="w-full h-full object-cover animate-slow-zoom md:animate-none md:transition-transform md:duration-[2s] md:group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/40 z-10"></div>

                {/* Navigation/Breadcrumbs Overlay */}
                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <div className="container mx-auto">
                        <nav className="flex items-center space-x-2 text-sm text-white/80 font-medium">
                            <Link to="/" className="hover:text-white transition-colors">Início</Link>
                            <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            <Link to="/noticias" className="hover:text-white transition-colors">Notícias</Link>
                            <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            <span className="text-white truncate max-w-[200px]">{plainTitle}</span>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-32 relative z-30">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 backdrop-blur-sm">

                    {/* Header do Artigo */}
                    <div className="flex flex-col gap-6 mb-8">
                        <Link
                            to="/noticias"
                            onClick={(e) => {
                                if (window.history.state && window.history.state.idx > 0) {
                                    e.preventDefault();
                                    navigate(-1);
                                }
                            }}
                            className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-2 w-fit cursor-pointer relative z-50 p-1 -ml-1 group/back"
                        >
                            <svg className="w-4 h-4 mr-1 transform transition-transform group-hover/back:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            <span className="text-sm font-medium">Voltar</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm backdrop-blur-sm ${(() => {
                                const colorVariants: { [key: string]: string } = {
                                    blue: 'bg-blue-600/[0.25] text-blue-600 border-blue-600 dark:bg-blue-500/[0.25] dark:text-blue-400 dark:border-blue-400',
                                    purple: 'bg-purple-600/[0.25] text-purple-600 border-purple-600 dark:bg-purple-500/[0.25] dark:text-purple-400 dark:border-purple-400',
                                    green: 'bg-green-600/[0.25] text-green-600 border-green-600 dark:bg-green-500/[0.25] dark:text-green-400 dark:border-green-400',
                                    red: 'bg-red-600/[0.25] text-red-600 border-red-600 dark:bg-red-500/[0.25] dark:text-red-400 dark:border-red-400',
                                    yellow: 'bg-yellow-600/[0.25] text-yellow-600 border-yellow-600 dark:bg-yellow-500/[0.25] dark:text-yellow-400 dark:border-yellow-400',
                                    indigo: 'bg-indigo-600/[0.25] text-indigo-600 border-indigo-600 dark:bg-indigo-500/[0.25] dark:text-indigo-400 dark:border-indigo-400',
                                    gray: 'bg-gray-600/[0.25] text-gray-600 border-gray-600 dark:bg-gray-500/[0.25] dark:text-gray-400 dark:border-gray-400',
                                };

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

                                const standardColor = STANDARD_CATEGORY_COLORS[article.category] || article.categoryColor || 'gray';
                                return colorVariants[standardColor] || colorVariants['gray'];
                            })()}`}>
                                {article.category}
                            </span>
                            <time className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {formatDateBR(article.publishDate)}
                            </time>
                        </div>

                        <h1
                            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white font-display leading-[1.15] tracking-tight"
                            dangerouslySetInnerHTML={{ __html: article.title }}
                        />

                        <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300 uppercase">
                                    {article.author ? article.author[0] : 'R'}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{article.author || 'Redação'}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Jornalista / Colunista</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <TextToSpeech text={stripHtml(article.content || article.summary || '')} />
                                <ShareButton title={plainTitle} />
                                <button
                                    onClick={() => {
                                        const saved = localStorage.getItem('araucaria_saved_articles');
                                        let savedIds: number[] = saved ? JSON.parse(saved) : [];

                                        if (isSaved) {
                                            savedIds = savedIds.filter(id => id !== article.id);
                                            setIsSaved(false);
                                            // Optional: Show removed toast
                                        } else {
                                            savedIds.push(article.id);
                                            setIsSaved(true);
                                            setToastMessage("Notícia salva nos favoritos!");
                                            setShowToast(true);
                                            setTimeout(() => setShowToast(false), 3000);
                                        }
                                        localStorage.setItem('araucaria_saved_articles', JSON.stringify(savedIds));
                                    }}
                                    className={`p-2.5 rounded-full transition-all active:scale-95 ${isSaved
                                        ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                                        }`}
                                    title={isSaved ? "Remover dos favoritos" : "Salvar (Favorito)"}
                                >
                                    {isSaved ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Anúncio Topo do Artigo */}
                        <div className="w-full flex justify-center mb-8">
                            <AdSpace format="horizontal" className="w-full" slotId="topo-artigo" />
                        </div>

                        {/* Resumo/Lead */}
                        {article.summary && (
                            <div
                                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 italic border-l-4 border-primary pl-6"
                                dangerouslySetInnerHTML={{ __html: article.summary }}
                            />
                        )}

                        {/* Imagem Secundária Decorativa - REMOVIDO PARA EVITAR DUPLICIDADE COM CONTEÚDO */}
                        {/* O usuário prefere controlar imagens via HTML no content ou apenas Hero */}




                        {/* Conteúdo Principal */}
                        <div
                            className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg
                        text-justify hyphens-auto"
                            dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.summary}</p>` }}
                        />

                        {/* Nota de rodapé do conteúdo */}
                        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    Este conteúdo é de responsabilidade do autor e não reflete necessariamente a opinião do portal Araucária Informa. Dados e datas referem-se ao momento da publicação.
                                </p>
                            </div>
                        </div>

                        {/* Fonte Original Button */}
                        {article.sourceUrl && (
                            <div className="mt-8 flex justify-center">
                                <a
                                    href={article.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    Ler matéria completa na fonte original ({article.sourceName || 'Link'})
                                </a>
                            </div>
                        )}


                        {/* Anúncio Fim do Artigo */}
                        <div className="w-full flex justify-center mt-8 mb-4">
                            <AdSpace format="horizontal" className="w-full" slotId="fim-artigo" />
                        </div>

                        <div className="my-12 h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                        {/* Tags (Mock) */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {['Araucária', 'Notícias', article.category, 'Paraná', 'Atualidade'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Seção Inteligente: Leia Também (Retenção de Usuário) */}
            {
                relatedArticles.length > 0 && (
                    <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/20 py-12 mt-0">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                            <div className="flex items-center gap-2 mb-8">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                                    Continue Lendo
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map(item => (
                                    <NewsCard key={item.id} article={item} />
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }
        </article >
    );
};

export default ArticlePage;
