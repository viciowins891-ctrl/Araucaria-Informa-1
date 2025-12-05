
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
    
    // Imagem principal: Vista urbana com pôr do sol (Golden Hour), similar à referência de Araucária/Cidade Símbolo.
    // Usamos Unsplash por ser estável e de alta qualidade.
    const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1444723121867-c612671f26ae?q=80&w=1600&auto=format&fit=crop");

    const handleImageError = () => {
        // Fallback secundário: Horizonte urbano alternativo caso a primeira falhe
        setHeroImage("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop");
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!data) return null;

    const { news, events, businesses } = data;

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 z-0">
                     <img 
                        src={heroImage}
                        alt="Vista aérea de Araucária - Cidade Símbolo" 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        referrerPolicy="no-referrer"
                    />
                    {/* Gradiente escuro para garantir leitura do texto branco */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-zinc-900"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/80 border border-blue-400/30 text-blue-50 text-sm font-semibold mb-6 backdrop-blur-md shadow-sm">
                        Bem-vindo a Araucária
                    </span>
                    <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight font-display tracking-tight drop-shadow-2xl">
                        A Cidade Símbolo<br/>do Paraná
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-zinc-100 font-light drop-shadow-lg text-shadow">
                        Notícias, cultura, eventos e o melhor do comércio local em um só lugar.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/noticias" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
                            Ver Notícias
                        </Link>
                        <Link to="/newsletter" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg transform hover:-translate-y-1">
                            Receber Novidades
                        </Link>
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
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Últimas Notícias</h2>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">O que está acontecendo na cidade agora.</p>
                        </div>
                        <Link to="/noticias" className="text-primary font-semibold hover:text-primary-dark flex items-center gap-1 transition-colors">
                            Ver todas as notícias <span className="material-icons-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map(article => (
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
