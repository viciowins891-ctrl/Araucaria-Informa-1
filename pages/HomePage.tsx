import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import NewsCard from '../components/NewsCard';
import EventCard from '../components/EventCard';
import BusinessCard from '../components/BusinessCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';


import { getPlaceholderImage } from '../services/aiService';

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = "Araucária Informa - Notícias, Eventos e Comércio Local";
    }, []);

    const { data, loading, error } = useFetch(api.getHomeData, 'home-data');

    // Imagem principal: Usando imagem local gerada/enviada para garantir carregamento offline/online
    const DEFAULT_HERO_IMAGE = "/images/final_nature.png";

    // Estado para controlar erro de carregamento da imagem
    const [imageError, setImageError] = useState(false);

    // Determina a notícia de destaque (se houver dados)
    const featuredNews = data?.news && data.news.length > 0 ? data.news[0] : null;

    // Lógica direta de seleção de imagem (Sem useEffect para evitar flash)
    // 1. Se houve erro, usa fallback
    // 2. Se tem notícia destaque com imagem, usa ela
    // 3. Se não, usa imagem padrão
    const getHeroImage = () => {
        if (imageError) {
            return featuredNews ? getPlaceholderImage(featuredNews.category) : DEFAULT_HERO_IMAGE;
        }
        return featuredNews?.imageUrl || DEFAULT_HERO_IMAGE;
    };

    const finalDisplayImage = getHeroImage();

    const handleImageError = () => {
        console.log("Falha ao carregar imagem principal. Ativando fallback.");
        setImageError(true);
    };

    // Renderização Condicional
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!data) return null;

    const { news, events, businesses } = data;
    const gridNews = news.length > 0 ? news.slice(1, 4) : []; // Pega as próximas 3 notícias para o grid

    return (
        <div>
            {/* Hero Section Dinâmica - Altura Flexível e Padding Ajustado */}
            <section className="relative min-h-[600px] lg:min-h-[700px] flex flex-col justify-center overflow-hidden bg-zinc-900 group">
                <div className="absolute inset-0 z-0">
                    <img
                        src={finalDisplayImage}
                        alt="Imagem de destaque - Araucária"
                        className="w-full h-full object-cover animate-slow-zoom md:animate-none md:transition-transform md:duration-1000 md:group-hover:scale-105"
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

                                <Link to={`/noticias/${featuredNews.id}`} className="block transition-opacity py-2 hover:opacity-90">
                                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 break-words">
                                        {featuredNews.title}
                                    </h1>
                                </Link>

                                <p className="text-gray-100 text-lg sm:text-xl line-clamp-3 max-w-2xl mb-8 font-light">
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
                                <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
                                    A Cidade Símbolo<br />do Paraná
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

                {/* Seção de Texto/Lista para SEO e Densidade de Conteúdo (AdSense Friendly) */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-zinc-800/30 rounded-2xl p-8 border border-zinc-100 dark:border-zinc-700/30">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-icons-outlined text-primary">feed</span>
                            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-display">
                                Resumo das Últimas Notícias
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {news.slice(0, 5).map(item => (
                                <div key={item.id} className="border-b border-zinc-100 dark:border-zinc-700/50 last:border-0 pb-6 last:pb-0">
                                    <Link to={`/noticias/${item.id}`} className="group block">
                                        <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-200 group-hover:text-primary transition-colors mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-3xl">
                                            {item.summary}
                                        </p>
                                        <div className="mt-2 flex items-center text-xs text-zinc-400 font-medium">
                                            <span className="capitalize">{item.category}</span>
                                            <span className="mx-2">•</span>
                                            <span>{item.publishDate}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-700/50">
                            <Link to="/noticias" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1">
                                Ver arquivo completo de notícias <span className="material-icons-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Seção Textual SEO (Para AdSense) */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-800/50 rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-100 dark:border-zinc-700/50">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Nossa Missão</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 mt-2 font-display">
                            Informação com Credibilidade para Araucária
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg text-justify">
                        <div>
                            <p className="mb-6">
                                O <strong>Araucária Informa</strong> nasceu com o propósito de conectar os moradores da Cidade Símbolo do Paraná aos acontecimentos mais importantes da região. Mais do que um portal de notícias, somos um guia completo de utilidade pública, cultura e desenvolvimento econômico local.
                            </p>
                            <p>
                                Nossa cobertura abrange desde as decisões políticas no Paço Municipal até os eventos culturais que movimentam o Parque Cachoeira e as praças da cidade. Valorizamos o jornalismo sério, a apuração rigorosa dos fatos e, acima de tudo, o respeito pelo cidadão araucariense.
                            </p>
                        </div>
                        <div>
                            <p className="mb-6">
                                Além de informar, buscamos fortalecer o comércio local através do nosso Guia Comercial, dando visibilidade para empreendedores e facilitando a vida de quem procura serviços na cidade. Acreditamos que uma cidade bem informada é uma cidade que cresce mais forte e unida.
                            </p>
                            <p>
                                Seja no Centro, no Costeira, no Capela Velha ou na área rural, o Araucária Informa está presente, trazendo a notícia em tempo real, com a qualidade e a agilidade que você merece. Obrigado por nos escolher como sua fonte diária de informação!
                            </p>
                        </div>
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
        </div >
    );
};

export default HomePage;