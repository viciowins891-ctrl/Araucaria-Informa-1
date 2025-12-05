
import { newsArticles as seedNews, events as seedEvents, businesses as seedBusinesses } from '../data';
import { NewsArticle, Event, Business } from '../types';

// CHAVES DO BANCO DE DADOS LOCAL - Versão 29 (Correção Imagens Eventos)
const DB_KEYS = {
    NEWS: '@araucaria-app/news_v29',
    EVENTS: '@araucaria-app/events_v29',
    BUSINESSES: '@araucaria-app/businesses_v29'
};

// Simula um delay de rede para parecer uma API real
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função auxiliar para inicializar ou recuperar dados do LocalStorage
const getCollection = <T>(key: string, seedData: T[]): T[] => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Verificação básica de integridade
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
        // Se não existir ou estiver corrompido, inicializa com o seed data e salva
        localStorage.setItem(key, JSON.stringify(seedData));
        return seedData;
    } catch (error) {
        console.error(`Erro ao acessar banco local (${key}):`, error);
        return seedData;
    }
};

export const api = {
    getNews: async (): Promise<NewsArticle[]> => {
        await delay(600);
        return getCollection<NewsArticle>(DB_KEYS.NEWS, seedNews);
    },
    
    getEvents: async (): Promise<Event[]> => {
        await delay(500);
        return getCollection<Event>(DB_KEYS.EVENTS, seedEvents);
    },
    
    getBusinesses: async (): Promise<Business[]> => {
        await delay(500);
        return getCollection<Business>(DB_KEYS.BUSINESSES, seedBusinesses);
    },
    
    // Simula buscar destaques agregados
    getHomeData: async () => {
        await delay(800);
        // Para a Home, sempre garantimos dados frescos das chaves atuais
        const news = getCollection<NewsArticle>(DB_KEYS.NEWS, seedNews);
        const events = getCollection<Event>(DB_KEYS.EVENTS, seedEvents);
        const businesses = getCollection<Business>(DB_KEYS.BUSINESSES, seedBusinesses);

        return {
            news: news.slice(0, 3),
            events: events.slice(0, 3), 
            businesses: businesses.slice(0, 4) 
        };
    },

    // Função de utilidade para resetar o banco
    resetDatabase: async () => {
        localStorage.removeItem(DB_KEYS.NEWS);
        localStorage.removeItem(DB_KEYS.EVENTS);
        localStorage.removeItem(DB_KEYS.BUSINESSES);
        window.location.reload();
    }
};
