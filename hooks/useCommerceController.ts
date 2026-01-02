import { useState, useMemo, useEffect } from 'react';
import { api } from '../services/api';
import { useFetch } from './useFetch';
import { commerceService } from '../services/CommerceService';
import { allBusinessCategories } from '../data';
import { Business } from '../types';

interface CommerceController {
    filteredBusinesses: Business[];
    featuredBusinesses: Business[];
    loading: boolean;
    error: string | null;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    categories: string[];
}

/**
 * Maestro Central (Custom Hook) para a Página de Comércio.
 */
export const useCommerceController = (): CommerceController => {
    // 1. Estados
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. Data Fetching
    const { data: businesses, loading, error } = useFetch(api.getBusinesses);

    // 3. Side Effects
    useEffect(() => {
        document.title = "Comércio Local - Araucária Informa";
    }, []);

    // 4. Lógica de Negócios (Delegate)
    const filteredBusinesses = useMemo(() => {
        return commerceService.filterByCategory(businesses || [], selectedCategory);
    }, [selectedCategory, businesses]);

    const featuredBusinesses = useMemo(() => {
        return commerceService.getFeaturedBusinesses(businesses || []);
    }, [businesses]);

    return {
        filteredBusinesses,
        featuredBusinesses,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        categories: allBusinessCategories
    };
};
