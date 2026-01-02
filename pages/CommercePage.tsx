import React from 'react';
import BusinessCard from '../components/BusinessCard';
import BusinessCardSkeleton from '../components/skeletons/BusinessCardSkeleton';
import RegistrationModal from '../components/RegistrationModal';
import { useCommerceController } from '../hooks/useCommerceController';
import SEO from '../components/SEO';

const CommercePage: React.FC = () => {
    // Instância do Maestro Central
    const {
        filteredBusinesses,
        featuredBusinesses,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        categories
    } = useCommerceController();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
            <SEO
                title="Guia Comercial e Serviços"
                description="Encontre empresas, comércios e prestadores de serviço em Araucária."
                image="/images/commerce_hero.jpg"
            />
            {/* Hero Header Section */}
            <div className="relative bg-zinc-900 py-20 sm:py-28 mb-10 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/commerce_hero_unique_bright.webp"
                        srcSet="/images/commerce_hero_unique_bright_mobile.webp 768w, /images/commerce_hero_unique_bright.webp 1200w"
                        alt="Centro Comercial Movimentado de Araucária"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white font-display mb-6 drop-shadow-md tracking-tight">
                        Guia Comercial
                    </h1>
                    <p className="text-lg sm:text-xl text-zinc-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Descubra os melhores serviços, lojas e gastronomia de Araucária. <br className="hidden sm:block" />
                        Tudo o que você precisa, pertinho de você.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 ring-4 ring-primary/20"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Divulgue seu Negócio
                    </button>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-8 relative z-20">

                {error && (
                    <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Erro ao carregar</h3>
                        <p className="text-gray-500 dark:text-gray-400">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="mb-6">
                        {/* Seção Skeleton Categories (simple pills) */}
                        <div className="flex gap-2 overflow-x-auto mb-8 pb-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse flex-shrink-0" />
                            ))}
                        </div>

                        {/* Grid Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, index) => (
                                <BusinessCardSkeleton key={`skeleton-${index}`} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Seção de Destaques (Featured) */}
                        {featuredBusinesses.length > 0 && selectedCategory === 'Todas' && (
                            <div className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        Destaques da Semana
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredBusinesses.map(business => (
                                        <BusinessCard key={`featured-${business.id}`} business={business} />
                                    ))}

                                    {/* Card Promocional no Grid de Destaques */}
                                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white flex flex-col justify-center items-start shadow-xl">
                                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                                        <span className="inline-block bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full mb-4">Premium</span>
                                        <h3 className="text-2xl font-bold mb-2">Quer aparecer aqui?</h3>
                                        <p className="text-indigo-100 mb-6 text-sm">Aumente a visibilidade da sua empresa e conquiste mais clientes em Araucária.</p>
                                        <button className="bg-white text-indigo-700 font-bold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors text-sm w-full sm:w-auto">
                                            Saiba Mais
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Menu de Filtros (Pills) */}
                        <div className="sticky top-20 z-30 bg-gray-50/95 dark:bg-zinc-900/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                            <div className="bg-white dark:bg-zinc-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700/50 max-w-fit mx-auto overflow-x-auto">
                                <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 min-w-max px-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`
                                                px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-out whitespace-nowrap flex items-center gap-2
                                                ${selectedCategory === category
                                                    ? 'bg-primary text-white shadow-md transform scale-100'
                                                    : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white'}
                                            `}
                                        >
                                            {category === 'Todas' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                                            {category === 'Alimentação' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                            {category === 'Serviços' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                            {category === 'Varejo' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lista Principal */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                {selectedCategory === 'Todas' ? 'Todos os Estabelecimentos' : `Categoria: ${selectedCategory}`}
                            </h2>
                            <span className="text-sm bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                                {filteredBusinesses.length} resultados
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {filteredBusinesses.map(business => (
                                <BusinessCard key={business.id} business={business} />
                            ))}
                        </div>

                        {filteredBusinesses.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-zinc-800 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700">
                                <svg className="w-20 h-20 text-gray-300 dark:text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum comércio encontrado nesta categoria.</p>
                                <button
                                    onClick={() => setSelectedCategory('Todas')}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Ver todas as categorias
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* CTA Banner Section */}
            <div className="bg-primary-dark relative overflow-hidden py-16 sm:py-20">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-0 bottom-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-display">
                        Você tem um negócio em Araucária?
                    </h2>
                    <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Junte-se a centenas de empresas que já estão conectadas. O Araucária Informa é a vitrine digital que faltava para impulsionar suas vendas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-primary-dark font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Cadastrar Grátis
                        </button>
                        <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all text-lg">
                            Ver Planos Premium
                        </button>
                    </div>
                </div>
            </div>
            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CommercePage;
