
import React, { useState, useMemo } from 'react';
import { businesses, allBusinessCategories } from '../data';
import BusinessCard from '../components/BusinessCard';

const CommercePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const filteredBusinesses = useMemo(() => {
        if (selectedCategory === 'Todas') {
            return businesses;
        }
        return businesses.filter(business => business.category === selectedCategory);
    }, [selectedCategory]);
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-text-light dark:text-text-dark font-display">Comércio Local</h1>
                <p className="mt-2 text-lg text-muted-light dark:text-muted-dark">Conheça e apoie os negócios de Araucária</p>
            </header>
            <div className="flex items-center gap-x-4 mb-10">
                <label htmlFor="category" className="text-sm font-medium text-muted-light dark:text-muted-dark">Filtrar por categoria:</label>
                <select 
                    id="category" 
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-48 rounded-md border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:ring-primary focus:border-primary"
                >
                    {allBusinessCategories.map(category => (
                        <option key={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map(business => (
                    <BusinessCard key={business.id} business={business} />
                ))}
            </div>
        </div>
    );
};

export default CommercePage;
