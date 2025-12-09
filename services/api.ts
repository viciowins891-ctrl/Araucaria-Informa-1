import { supabase } from './supabaseClient';
import { NewsArticle, Event, Business } from '../types';
import { fetchWeeklyNewsWithAI } from './aiService';

// Constantes de configuração
const DB_KEYS = {
    LAST_UPDATE: '@araucaria-app/last_ai_update_timestamp'
};
const UPDATE_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

export const api = {
    getNews: async (): Promise<NewsArticle[]> => {
        const { data, error } = await supabase
            .from('news_articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao buscar notícias:', error);
            return [];
        }

        return (data || []).map((n: any) => ({
            ...n,
            imageUrl: n.imageurl,
            categoryColor: n.categorycolor,
            publishDate: n.publishdate,
            sourceUrl: n.sourceurl,
            sourceName: n.sourcename
        }));
    },

    getNewsById: async (id: number): Promise<NewsArticle | undefined> => {
        const { data, error } = await supabase
            .from('news_articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Erro ao buscar notícia por ID:', error);
            return undefined;
        }

        return {
            ...data,
            imageUrl: data.imageurl,
            categoryColor: data.categorycolor,
            publishDate: data.publishdate,
            sourceUrl: data.sourceurl,
            sourceName: data.sourcename
        };
    },

    updateNews: async (newArticles: NewsArticle[]): Promise<void> => {
        const articlesToInsert = newArticles.map(n => ({
            title: n.title,
            summary: n.summary,
            content: n.content,
            imageurl: n.imageUrl,
            category: n.category,
            categorycolor: n.categoryColor,
            publishdate: n.publishDate,
            author: n.author,
            sourceurl: n.sourceUrl,
            sourcename: n.sourceName
        }));

        const { error } = await supabase.from('news_articles').insert(articlesToInsert);

        if (error) {
            console.error('Erro ao salvar notícias no Supabase:', error);
            throw error;
        }
    },

    checkAndRunBackgroundUpdate: async () => {
        try {
            const lastUpdateStr = localStorage.getItem(DB_KEYS.LAST_UPDATE);
            const now = Date.now();
            const shouldUpdate = !lastUpdateStr || (now - Number(lastUpdateStr) > UPDATE_INTERVAL_MS);

            if (shouldUpdate) {
                console.log("[AutoUpdate] Iniciando atualização via IA (simulado)...");
                const newArticles = await fetchWeeklyNewsWithAI();

                if (newArticles.length > 0) {
                    // await api.updateNews(newArticles); // Comentado para evitar flood no banco, já usamos evergreen direto
                    localStorage.setItem(DB_KEYS.LAST_UPDATE, now.toString());
                }
            }
        } catch (error) {
            console.warn("[AutoUpdate] Falha:", error);
        }
    },

    getEvents: async (): Promise<Event[]> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) {
            console.error('Erro ao buscar eventos:', error);
            return [];
        }

        return (data || []).map((e: any) => ({
            ...e,
            imageUrl: e.imageurl
        }));
    },

    getEventById: async (id: number): Promise<Event | undefined> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return undefined;

        return {
            ...data,
            imageUrl: data.imageurl
        };
    },

    getBusinesses: async (): Promise<Business[]> => {
        const { data, error } = await supabase
            .from('businesses')
            .select('*');

        if (error) {
            console.error('Erro ao buscar comércios:', error);
            return [];
        }

        return (data || []).map((b: any) => ({
            ...b,
            imageUrl: b.imageurl
        }));
    },

    getHomeData: async () => {
        // Wrapper de timeout para evitar travamento eterno (8 segundos)
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout ao carregar dados")), 8000)
        );

        const loadData = async () => {
            console.log("api.getHomeData: Iniciando...");

            // Busca DB e Evergreen em paralelo com tratamento de erro individual
            const dbNewsPromise = api.getNews().catch(e => { console.error("Falha DB News", e); return []; });
            const evergreenPromise = fetchWeeklyNewsWithAI().catch(e => { console.error("Falha Evergreen", e); return []; });
            const eventsPromise = api.getEvents().catch(e => { console.error("Falha Events", e); return []; });
            const businessesPromise = api.getBusinesses().catch(e => { console.error("Falha Biz", e); return []; });

            const [dbNews, evergreen, events, businesses] = await Promise.all([
                dbNewsPromise,
                evergreenPromise,
                eventsPromise,
                businessesPromise
            ]);

            // Combina: Evergreen PRIMEIRO
            const allNews = [...evergreen, ...dbNews];

            return {
                news: allNews.slice(0, 6),
                events: events.slice(0, 3),
                businesses: businesses.slice(0, 4)
            };
        };

        try {
            // Promise.race força o erro se demorar demais
            const result = await Promise.race([loadData(), timeoutPromise]);
            return result as { news: NewsArticle[]; events: Event[]; businesses: Business[]; };
        } catch (error) {
            console.error("api.getHomeData: Erro Fatal ou Timeout", error);
            throw error;
        }
    },

    resetDatabase: async () => {
        localStorage.removeItem(DB_KEYS.LAST_UPDATE);
        window.location.reload();
    }
};
