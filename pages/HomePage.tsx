import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import NewsCard from '../components/NewsCard';
import EventCard from '../components/EventCard';
import BusinessCard from '../components/BusinessCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = "Araucária Informa - Notícias, Eventos e Comércio Local";
    }, []);

    const { data, loading, error } = useFetch(api.getHomeData);
    
    // Imagem principal: Vista urbana com pôr do sol (Golden Hour)
    const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1444723121867-c612671f26ae?q=80&w=1600&auto=format&fit=crop";
    const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);

    const handleImageError = () => {
        setHeroImage("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop");
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!data) return null;

    const { news, events, businesses } = data;
    
    // Lógica para destacar a última notícia na Hero Section
    const featuredNews = news.length > 0 ? news[0] : null;
    const gridNews = news.length > 0 ? news.slice(1, 4) : []; // Pega as próximas 3 notícias para o grid

    // Se houver uma notícia de destaque, usamos a imagem dela. Se não, usa a padrão.
    const activeHeroImage = featuredNews ? featuredNews.imageUrl : heroImage;

    return (
        <div>
            {/* Hero Section Dinâmica - Altura Flexível e Padding Ajustado */}
            <section className="relative min-h-[600px] lg:min-h-[700px] flex flex-col justify-center overflow-hidden bg-zinc-900 group">
                <div className="absolute inset-0 z-0">
                     <img 
                        src={activeHeroImage}
                        alt={featuredNews ? featuredNews.title : "Vista de Araucária"} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        onError={handleImageError}
                        referrerPolicy="no-referrer"
                    />
                    {/* Gradiente escuro para garantir leitura */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-90"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-16">
                    <div className="max-w-4xl">
                        {featuredNews ? (
                            <>
                                <span className="inline-block py-1.5 px-3 rounded-md bg-primary text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-primary-dark/30 backdrop-blur-sm">
                                    Destaque do Dia
                                </span>
                                <Link to={`/noticias/${featuredNews.id}`} className="block group-hover:opacity-90 transition-opacity py-2">
                                    {/* Ajuste de tipografia: leading-tight -> leading-snug e py-2 para evitar cortes */}
                                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug font-display tracking-tight drop-shadow-lg mb-6 break-words">
                                        {featuredNews.title}
                                    </h1>
                                </Link>
                                <p className="text-gray-200 text-lg sm:text-xl line-clamp-3 max-w-2xl mb-8 font-light drop-shadow-md">
                                    {featuredNews.summary}
                                </p>
                                <div className="flex gap-4">
                                    <Link 
                                        to={`/noticias/${featuredNews.id}`} 
                                        className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1"
                                    >
                                        Ler Matéria Completa
                                        <span className="material-icons-outlined ml-2">arrow_forward</span>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-600/80 border border-blue-400/30 text-blue-50 text-sm font-semibold mb-6 backdrop-blur-md shadow-sm">
                                    Bem-vindo a Araucária
                                </span>
                                <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight font-display tracking-tight drop-shadow-2xl">
                                    A Cidade Símbolo<br/>do Paraná
                                </h1>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <div className="space-y-20 sm:space-y-28 py-16 sm:py-24 bg-gradient-to-b from-zinc-900/5 to-transparent dark:from-zinc-900 dark:to-background-dark">
                
                {/* Ad Placeholder */}
                <div className="container mx-auto px-4">
                    <AdSpace format="horizontal" />
                </div>

                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Mais Notícias</h2>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">O que está acontecendo na cidade agora.</p>
                        </div>
                        <Link to="/noticias" className="text-primary font-semibold hover:text-primary-dark flex items-center gap-1 transition-colors">
                            Ver todas as notícias <span className="material-icons-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridNews.map(article => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
                
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Agenda Cultural</h2>
                                <p className="mt-2 text-zinc-500 dark:text-zinc-400">Não perca os próximos eventos.</p>
                            </div>
                            <Link to="/eventos" className="text-primary font-semibold hover:text-primary-dark flex items-center gap-1 transition-colors">
                                Ver calendário completo <span className="material-icons-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                           {events.map(event => (
                                <EventCard key={event.id} event={event} />
                           ))}
                        </div>
                    </div>
                </section>
                
                {/* Ad Placeholder */}
                <div className="container mx-auto px-4">
                    <AdSpace format="horizontal" />
                </div>

                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Destaques do Comércio</h2>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Apoie o negócio local.</p>
                        </div>
                        <Link to="/comercio" className="text-primary font-semibold hover:text-primary-dark flex items-center gap-1 transition-colors">
                            Guia comercial <span className="material-icons-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {businesses.map(business => (
                             <BusinessCard key={business.id} business={business} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;