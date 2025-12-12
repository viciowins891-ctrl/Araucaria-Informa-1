
import React, { useState, useMemo, useEffect } from 'react';
import { allBusinessCategories } from '../data';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import BusinessCard from '../components/BusinessCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CommercePage: React.FC = () => {
    useEffect(() => {
        document.title = "Comércio Local - Araucária Informa";
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const { data: businesses, loading, error } = useFetch(api.getBusinesses);

    const filteredBusinesses = useMemo(() => {
        if (!businesses) return [];
        if (selectedCategory === 'Todas') {
            return businesses;
        }
        return businesses.filter(business => business.category === selectedCategory);
    }, [selectedCategory, businesses]);

    const featuredBusinesses = useMemo(() => {
        if (!businesses) return [];
        return businesses.filter(b => b.isFeatured);
    }, [businesses]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
            {/* Hero Header Section */}
            <div className="relative bg-zinc-900 py-20 sm:py-28 mb-10 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1600&auto=format&fit=crop"
                        alt="Centro Comercial"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white font-display mb-6 drop-shadow-md tracking-tight">
                        Guia Comercial
                    </h1>
                    <p className="text-lg sm:text-xl text-zinc-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Descubra os melhores serviços, lojas e gastronomia de Araucária. <br className="hidden sm:block" />
                        Tudo o que você precisa, pertinho de você.
                    </p>

                    <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 ring-4 ring-primary/20">
                        <span className="material-icons-outlined">storefront</span>
                        Divulgue seu Negócio
                    </button>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-8 relative z-20">

                {loading && <LoadingSpinner />}

                {error && (
                    <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 mb-4">
                            <span className="material-icons text-3xl">error_outline</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Erro ao carregar</h3>
                        <p className="text-gray-500 dark:text-gray-400">{error}</p>
                    </div>
                )}

                {!loading && businesses && (
                    <>
                        {/* Seção de Destaques (Featured) */}
                        {featuredBusinesses.length > 0 && selectedCategory === 'Todas' && (
                            <div className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-icons text-amber-500 text-2xl">star</span>
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
                            <div className="bg-white dark:bg-zinc-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700/50 max-w-4xl mx-auto overflow-x-auto">
                                <div className="flex flex-nowrap sm:flex-wrap items-center sm:justify-center gap-2 min-w-max px-2">
                                    {allBusinessCategories.map(category => (
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
                                            {category === 'Todas' && <span className="material-icons text-sm">widgets</span>}
                                            {category === 'Alimentação' && <span className="material-icons text-sm">restaurant</span>}
                                            {category === 'Serviços' && <span className="material-icons text-sm">build</span>}
                                            {category === 'Varejo' && <span className="material-icons text-sm">shopping_bag</span>}
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
                                <span className="material-icons text-6xl text-gray-300 dark:text-zinc-600 mb-4">store_front</span>
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
                        <button className="bg-white text-primary-dark font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                            Cadastrar Grátis
                        </button>
                        <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all text-lg">
                            Ver Planos Premium
                        </button>
                    </div>
                    <p className="text-indigo-200/60 text-sm mt-8">
                        * Cadastro básico gratuito para MEI e pequenas empresas locais.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommercePage;
