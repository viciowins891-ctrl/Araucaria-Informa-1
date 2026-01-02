import { Business } from '../types';

/**
 * Singleton Class para Lógica de Negócios de Comércio.
 */
class CommerceService {
    private static instance: CommerceService;

    private constructor() { }

    public static getInstance(): CommerceService {
        if (!CommerceService.instance) {
            CommerceService.instance = new CommerceService();
        }
        return CommerceService.instance;
    }

    public filterByCategory(businesses: Business[], category: string): Business[] {
        if (!businesses) return [];
        if (category === 'Todas') {
            return businesses;
        }
        return businesses.filter(business => business.category === category);
    }

    public getFeaturedBusinesses(businesses: Business[]): Business[] {
        if (!businesses) return [];
        return businesses.filter(b => b.isFeatured);
    }
}

export const commerceService = CommerceService.getInstance();
