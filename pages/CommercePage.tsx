
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
    
    return (
        <div>
            {/* Hero Header Section */}
            <div className="relative bg-zinc-900 py-16 sm:py-20 mb-8 sm:mb-12">
                <div className="absolute inset-0 overflow-hidden bg-gray-900">
                    {/* Imagem: Rua comercial charmosa, mais adequada ao contexto que um skyline gigante */}
                    <img 
                        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1600&auto=format&fit=crop" 
                        alt="Centro Urbano e Comercial" 
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-display mb-4 drop-shadow-sm">Comércio Local</h1>
                    <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
                        Conheça e apoie os negócios de Araucária. Encontre os melhores serviços e lojas da cidade.
                    </p>
                    
                    {/* Filtro estilizado dentro do header */}
                    <div className="inline-flex items-center bg-white dark:bg-zinc-800 rounded-full p-1 pl-4 pr-1 shadow-lg ring-1 ring-black/5 mx-auto">
                        <label htmlFor="category" className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-3 hidden sm:block">Filtrar por:</label>
                        <div className="relative">
                            <select 
                                id="category" 
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none bg-primary-dark hover:bg-blue-700 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {allBusinessCategories.map(category => (
                                    <option key={category} className="bg-white text-gray-900">{category}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                                <span className="material-icons text-sm">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {loading && <LoadingSpinner />}
                
                {error && (
                    <div className="text-center py-10">
                         <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-3">
                            <span className="material-icons">error_outline</span>
                         </div>
                         <p className="text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {!loading && businesses && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBusinesses.map(business => (
                                <BusinessCard key={business.id} business={business} />
                            ))}
                        </div>
                        
                        {filteredBusinesses.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                <span className="material-icons text-4xl text-gray-400 mb-2">store_mall_directory</span>
                                <p className="text-gray-500 dark:text-gray-400">Nenhum comércio encontrado nesta categoria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CommercePage;
