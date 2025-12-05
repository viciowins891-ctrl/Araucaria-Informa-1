
import { newsArticles as seedNews, events as seedEvents, businesses as seedBusinesses } from '../data';
import { NewsArticle, Event, Business } from '../types';
import { fetchWeeklyNewsWithAI } from './aiService';

// CHAVES DO BANCO DE DADOS LOCAL - Versão 31
const DB_KEYS = {
    NEWS: '@araucaria-app/news_v31',
    EVENTS: '@araucaria-app/events_v31',
    BUSINESSES: '@araucaria-app/businesses_v31',
    LAST_UPDATE: '@araucaria-app/last_ai_update_timestamp'
};

const UPDATE_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; 

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getCollection = <T>(key: string, seedData: T[]): T[] => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
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

    getNewsById: async (id: number): Promise<NewsArticle | undefined> => {
        await delay(400);
        const allNews = getCollection<NewsArticle>(DB_KEYS.NEWS, seedNews);
        return allNews.find(article => article.id === id);
    },

    updateNews: async (newArticles: NewsArticle[]): Promise<void> => {
        try {
            if (!newArticles || newArticles.length === 0) return;

            const currentNews = getCollection<NewsArticle>(DB_KEYS.NEWS, seedNews);
            
            // Filtra duplicatas comparando Títulos normalizados
            const uniqueNewArticles = newArticles.filter(n => {
                const isDuplicate = currentNews.some(c => 
                    c.title.toLowerCase().trim() === n.title.toLowerCase().trim()
                );
                return !isDuplicate;
            });

            if (uniqueNewArticles.length === 0) return;

            // Mantém as 12 notícias mais recentes
            const updatedCollection = [...uniqueNewArticles, ...currentNews].slice(0, 12);
            
            localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(updatedCollection));
        } catch (e) {
            console.error("Erro ao salvar notícias", e);
            throw e;
        }
    },

    checkAndRunBackgroundUpdate: async () => {
        try {
            const lastUpdateStr = localStorage.getItem(DB_KEYS.LAST_UPDATE);
            const now = Date.now();
            
            // Verifica se deve atualizar (Se nunca rodou ou se passou o intervalo)
            const shouldUpdate = !lastUpdateStr || (now - Number(lastUpdateStr) > UPDATE_INTERVAL_MS);

            if (shouldUpdate) {
                console.log("[AutoUpdate] Iniciando atualização silenciosa...");
                
                const newArticles = await fetchWeeklyNewsWithAI();
                
                if (newArticles.length > 0) {
                    await api.updateNews(newArticles);
                    localStorage.setItem(DB_KEYS.LAST_UPDATE, now.toString());
                    console.log("[AutoUpdate] Sucesso: Novas notícias salvas.");
                } else {
                    console.log("[AutoUpdate] Nenhum artigo novo retornado pela IA.");
                }
            }
        } catch (error) {
            console.warn("[AutoUpdate] Falha silenciosa:", error);
        }
    },
    
    getEvents: async (): Promise<Event[]> => {
        await delay(500);
        return getCollection<Event>(DB_KEYS.EVENTS, seedEvents);
    },
    
    getBusinesses: async (): Promise<Business[]> => {
        await delay(500);
        return getCollection<Business>(DB_KEYS.BUSINESSES, seedBusinesses);
    },
    
    getHomeData: async () => {
        await delay(800);
        const news = getCollection<NewsArticle>(DB_KEYS.NEWS, seedNews);
        const events = getCollection<Event>(DB_KEYS.EVENTS, seedEvents);
        const businesses = getCollection<Business>(DB_KEYS.BUSINESSES, seedBusinesses);

        return {
            news: news.slice(0, 3),
            events: events.slice(0, 3), 
            businesses: businesses.slice(0, 4) 
        };
    },

    resetDatabase: async () => {
        localStorage.removeItem(DB_KEYS.NEWS);
        localStorage.removeItem(DB_KEYS.EVENTS);
        localStorage.removeItem(DB_KEYS.BUSINESSES);
        localStorage.removeItem(DB_KEYS.LAST_UPDATE);
        window.location.reload();
    }
};
