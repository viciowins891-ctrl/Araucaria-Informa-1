
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { NewsArticle } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';
import NewsCard from '../components/NewsCard';
import ShareButton from '../components/ShareButton';
import { getPlaceholderImage, generateContextualImage } from '../services/aiService';

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
    const [showShareToast, setShowShareToast] = useState(false);
    const [secondaryImage, setSecondaryImage] = useState<string>('');

    useEffect(() => {
        const fetchArticleAndRelated = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const currentArticle = await api.getNewsById(Number(id));
                if (currentArticle) {
                    setArticle(currentArticle);
                    setImgSrc(currentArticle.imageUrl);
                    if (currentArticle.id === 36) {
                        setImgSrc('/images/iptu_real_queue_final.jpg');
                    }
                    if (currentArticle.id === 37) {
                        setImgSrc('/images/bus_schedule_real_final_v5.png');
                    }
                    if (currentArticle.id === 38) {
                        setImgSrc('/images/environment_week_real_final_v1.jpg');
                    }
                    if (currentArticle.id === 40) {
                        setImgSrc('/images/healthy_cooking_real_final_v1.jpg');
                    }
                    if (currentArticle.id === 44) {
                        setImgSrc('/images/pioneers_homage_inner_real_final.jpg');
                    }

                    setImageError(false);


                    // Lógica para Imagem Secundária:
                    // 1. Definição da Imagem Secundária (Interior da Notícia)
                    // Por padrão, carregamos um placeholder baseado na categoria (Imagens com 'Print'/Tema)
                    let secImg = getPlaceholderImage(currentArticle.category);

                    // Mapeamento explícito para categorias que usam os placeholders "com print"
                    if (currentArticle.category === 'Educação' || currentArticle.title.toLowerCase().includes('escola')) {
                        secImg = '/images/placeholder_educacao.png';
                    } else if (currentArticle.category === 'Infraestrutura' || currentArticle.title.toLowerCase().includes('obra')) {
                        secImg = '/images/placeholder_infraestrutura.png';
                    } else if (currentArticle.category === 'Segurança' || currentArticle.title.toLowerCase().includes('polícia')) {
                        secImg = '/images/placeholder_seguranca.png';
                    } else if (currentArticle.category === 'Esporte' || currentArticle.title.toLowerCase().includes('jogo')) {
                        secImg = '/images/placeholder_esporte.png';
                    } else if (currentArticle.category === 'Turismo') {
                        secImg = '/images/placeholder_turismo.png';
                    } else if (currentArticle.category === 'Economia' || currentArticle.title.toLowerCase().includes('emprego')) {
                        secImg = '/images/placeholder_economia.png';
                    } else if (currentArticle.category === 'Cidade' && currentArticle.title.toLowerCase().includes('comércio')) {
                        secImg = '/images/placeholder_comercio.png';
                    }

                    // Ajustes para temas sem placeholder oficial, usando imagens contextuais
                    if (currentArticle.category === 'Saúde' || currentArticle.title.toLowerCase().includes('vacina')) {
                        secImg = '/images/news_context_health.png';
                    }
                    if (currentArticle.title.toLowerCase().includes('orçamento') || currentArticle.title.toLowerCase().includes('câmara')) {
                        secImg = '/images/news_budget_chamber.png';
                    }

                    // 2. Override de segurança (caso específico - Drogas)
                    if (currentArticle.title.toLowerCase().includes('drogas') || currentArticle.title.toLowerCase().includes('incinera')) {
                        secImg = '/images/custom_drugs.jpg';
                    }

                    // 3. Mapeamento Específico por ID (Tem PRECEDÊNCIA sobre tudo)
                    // Garante que as notícias principais (1-10) mantenham suas fotos internas exclusivas
                    const idNum = Number(id);
                    if (idNum === 1 || idNum === 101) secImg = '/images/cmei_interior_pessoas.png'; // CMEI
                    if (idNum === 2 || idNum === 102) secImg = '/images/prefeitura_orcamento_real.png'; // Orçamento
                    if (idNum === 3 || idNum === 103) secImg = '/images/poupatempo_atendimento_pessoas.png'; // Poupatempo
                    if (idNum === 4 || idNum === 104) secImg = '/images/investimento_federal_real.png'; // Investimentos
                    if (idNum === 5 || idNum === 105) secImg = '/images/operacao_pcpr_viaturas.png'; // Drogas/PCPR
                    if (idNum === 6) secImg = '/images/rural_tourism_araucaria_path.png'; // Turismo Rural (Interna)
                    if (idNum === 106) secImg = '/images/news_vaccine_pregnant.png';
                    if (idNum === 107) secImg = '/images/news_christmas_cantata.png';
                    if (idNum === 7) secImg = '/images/news_vaccination_indoor_campaign.png'; // Campanha de Vacinação (Interior)
                    if (idNum === 8) secImg = '/images/childrens_theater_stage_play.png'; // Teatro Infantil (Interna)
                    if (idNum === 9) secImg = '/images/new_bike_path_industrial.png'; // Ciclovia Industrial (Interna)
                    if (idNum === 10) secImg = '/images/road_repair_pothole_asphalt.png'; // Tapa Buraco (Interna)
                    if (idNum === 11) secImg = '/images/municipal_guard_real.png'; // Viaturas GM (Interna)
                    if (idNum === 109) secImg = '/images/gym_interior_renovation.png'; // Ginásio Joval (Interior)
                    if (idNum === 16) secImg = '/images/news_chess_inner_araucaria.png'; // Torneio de Xadrez (Interna)
                    if (idNum === 17) secImg = '/images/vocational_training_industrial_class.png'; // Curso SENAI (Interna)
                    if (idNum === 18) secImg = '/images/rural_tourism_signage_araucaria.png'; // Sinalização Caminho do Vinho (Interna)
                    if (idNum === 14) secImg = '/images/new_supermarket_interior.png'; // Novo Supermercado (Interna)
                    if (idNum === 15) secImg = '/images/river_cleanup_volunteers.png'; // Limpeza Rio Iguaçu (Interna)
                    if (idNum === 12) secImg = '/images/hospital_pediatric_ward_interior.png'; // Hospital Ala Pediátrica (Interna)
                    if (idNum === 19) secImg = '/images/school_transport_app_araucaria.png'; // App Transporte Escolar (Interna)
                    if (idNum === 20) secImg = '/images/plaza_bible_internal_real.jpg'; // Praça da Bíblia (Interna)
                    if (idNum === 13) secImg = '/images/school_robotics_fair_project.png'; // Feira Robótica (Interna)
                    if (idNum === 108) secImg = '/images/copel_repair_real_v2.png'; // Ciclone (Interna) - Fix Duplicação
                    if (idNum === 21) secImg = '/images/news_hackathon_coding.png'; // Hackathon (Interna)
                    if (idNum === 23) secImg = '/images/araucaria_futsal_real.jpg'; // Futsal (Interna)
                    if (idNum === 32) secImg = '/images/feira_definitiva_v100.png'; // Feira Produtor (Interna)
                    if (idNum === 24) secImg = '/images/campanha_agasalho_internal.jpg'; // Campanha Agasalho (Internacom)
                    if (idNum === 25) secImg = '/images/binario_centro_internal.jpg'; // Binário Centro (Interna)
                    if (idNum === 26) secImg = '/images/festival_gastronomico_internal.jpg'; // Festival Gastronômico (Interna)
                    if (idNum === 27) secImg = '/images/lousas_digitais_internal.jpg'; // Lousas Digitais (Interna)
                    if (idNum === 28) secImg = '/images/logistica_vagas_internal.jpg'; // Vagas Logística (Interna)
                    if (idNum === 28) secImg = '/images/logistica_vagas_internal.jpg'; // Vagas Logística (Interna)
                    if (idNum === 29) secImg = '/images/iluminacao_led_internal.jpg'; // Iluminação LED (Interna)
                    if (idNum === 29) secImg = '/images/iluminacao_led_internal.jpg'; // Iluminação LED (Interna)
                    if (idNum === 30) secImg = '/images/feira_livros_internal_real.jpg'; // Feira de Livros (Interna Real)
                    if (idNum === 31) secImg = '/images/vacinacao_pet_internal.png'; // Vacinação Pet (Interna)
                    if (idNum === 32) secImg = '/images/feira_produtor_roof_internal.png'; // Feira Produtor Cobertura (Interna)
                    if (idNum === 33) secImg = '/images/coral_municipal_internal_v2.png'; // Coral (Interna v2)
                    if (idNum === 34) secImg = '/images/parque_cachoeira_internal_v2.png'; // Parque Cachoeira (Interna v2)
                    if (idNum === 35) secImg = '/images/carros_antigos_internal_v2.png'; // Carros Antigos (Interna v2)
                    if (idNum === 37) secImg = '/images/bus_schedule_real_final_v5.png'; // Novos Horários (Interna)
                    if (idNum === 38) secImg = '/images/environment_week_real_final_v1.jpg'; // Semana Meio Ambiente (Interna)
                    if (idNum === 36) secImg = '/images/iptu_real_queue_final.jpg'; // IPTU (Interna)
                    if (idNum === 39) secImg = '/images/araucaria_volei_inner_final.png'; // Vôlei (Interna)

                    if (idNum === 40) secImg = '/images/healthy_cooking_real_final_v1.jpg'; // Culinária (Interna)
                    if (idNum === 41) secImg = '/images/photography_contest_camera_internal.jpg'; // Fotografia (Interna)
                    if (idNum === 42) secImg = '/images/ubs_california_inner_real_final.jpg'; // UBS Noturna (Interna)
                    if (idNum === 43) secImg = '/images/festa_junina_inner_real_final.jpg'; // Festa Junina (Interna)
                    if (idNum === 44) secImg = '/images/pioneers_homage_inner_real_final.jpg'; // Pioneiros (Interna)
                    if (idNum === 45) secImg = '/images/school_games_torch_internal.jpg'; // Jogos Escolares (Interna)


                    setSecondaryImage(secImg);

                    // Busca notícias relacionadas
                    const allNews = await api.getNews();
                    const others = allNews
                        .filter(item => item.id !== currentArticle.id)
                        .slice(0, 3);
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

    // Reading Progress Listener
    useEffect(() => {
        const updateReadingProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener('scroll', updateReadingProgress);
        return () => window.removeEventListener('scroll', updateReadingProgress);
    }, []);

    const handleImageError = () => {
        if (!imageError && article) {
            setImgSrc(getPlaceholderImage(article.category));
            setImageError(true);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
    };



    if (loading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;

    if (error || !article) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
            <svg className="w-16 h-16 text-gray-300 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
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

    return (
        <article className="bg-background-light dark:bg-background-dark min-h-screen pb-20 font-body">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-800">
                <div
                    className="h-full bg-primary transition-all duration-150 ease-out"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

            {/* Share Toast */}
            {showShareToast && (
                <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
                    <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>Link copiado para a área de transferência!</span>
                    </div>
                </div>
            )}

            {/* SEO & Meta Tags Dinâmicas */}
            <Helmet>
                <title>{article.title} - Araucária Informa</title>
                <meta name="description" content={article.summary || article.title} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.summary || article.title} />
                <meta property="og:image" content={article.imageUrl?.startsWith('http') ? article.imageUrl : `https://araucariainforma.com${article.imageUrl}`} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={article.title} />
                <meta property="twitter:description" content={article.summary || article.title} />
                <meta property="twitter:image" content={article.imageUrl?.startsWith('http') ? article.imageUrl : `https://araucariainforma.com${article.imageUrl}`} />
            </Helmet>

            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-gray-900 overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700 z-10"></div>
                <img
                    src={imgSrc || FALLBACK_IMAGE}
                    alt={article.title}
                    className="w-full h-full object-cover animate-slow-zoom md:animate-none md:transition-transform md:duration-[2s] md:group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/60 z-10"></div>

                {/* Navigation/Breadcrumbs Overlay */}
                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <div className="container mx-auto">
                        <nav className="flex items-center space-x-2 text-sm text-white/80 font-medium">
                            <Link to="/" className="hover:text-white transition-colors">Início</Link>
                            <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            <Link to="/noticias" className="hover:text-white transition-colors">Notícias</Link>
                            <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            <span className="text-white truncate max-w-[200px]">{article.title}</span>
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
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20`}>
                                {article.category}
                            </span>
                            <time className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {article.publishDate}
                            </time>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white font-display leading-[1.15] tracking-tight">
                            {article.title}
                        </h1>

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
                                <ShareButton title={article.title} />
                                <button
                                    className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95"
                                    title="Salvar (Favorito)"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Resumo/Lead */}
                        {article.summary && (
                            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 italic border-l-4 border-primary pl-6">
                                {article.summary}
                            </div>
                        )}

                        {/* Imagem Secundária Decorativa */}
                        {secondaryImage && (
                            <figure className="mt-8 mb-2 rounded-xl overflow-hidden shadow-lg h-64 md:h-80 w-full relative group">
                                <img
                                    src={secondaryImage}
                                    alt={`Imagem ilustrativa - ${article.category}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'; // Esconde se quebrar de vez
                                        e.currentTarget.parentElement!.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </figure>
                        )}

                        <AdSpace format="horizontal" className="mb-6" />

                        {/* Conteúdo Principal */}
                        <div
                            className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg"
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

                        <div className="my-12 h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

                        {/* Tags (Mock) */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {['Araucária', 'Notícias', article.category, 'Paraná', 'Atualidade'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                    </div>

                    {/* Seção de Notícias Relacionadas */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-20">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-display">
                                        Conteúdo Relacionado
                                    </h2>
                                </div>
                                <Link to="/noticias" className="text-primary hover:text-primary-dark font-medium hidden md:inline-flex items-center gap-1">
                                    Ver tudo <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map(relArticle => (
                                    <NewsCard key={relArticle.id} article={relArticle} />
                                ))}
                            </div>

                            <div className="mt-8 text-center md:hidden">
                                <Link to="/noticias" className="btn-primary inline-flex">
                                    Ver todas as notícias
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ArticlePage;
