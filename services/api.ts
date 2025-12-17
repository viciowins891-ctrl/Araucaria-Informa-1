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
        // FORÇANDO USO DE DADOS LOCAIS (data.ts) PARA GARANTIR ATUALIZAÇÃO DO SITE
        // Isso bypassa o Supabase temporariamente para validar as mudanças do AdSense.
        // const { data, error } = await supabase
        //     .from('news')
        //     .select('*')
        //     .order('publish_date', { ascending: false });

        console.log("API: Modo Estático Ativado - Usando data.ts");
        const { newsArticles } = await import('../data');
        return newsArticles;
    },

    getNewsById: async (id: number): Promise<NewsArticle | undefined> => {
        // FORÇANDO USO DE DADOS LOCAIS

        // const { data, error } = await supabase ... (Código comentado)

        // Fallback 1: Dados estáticos (data.ts)
        const { newsArticles } = await import('../data');
        const localArticle = newsArticles.find(n => n.id === Number(id));
        if (localArticle) return localArticle;

        // Fallback 2: Dados gerados/AI (aiService.ts) ...

        // Nota: IDs de AI começam em 1000 geralmente
        const { fetchWeeklyNewsWithAI } = await import('./aiService');
        const aiArticles = await fetchWeeklyNewsWithAI();
        const aiArticle = aiArticles.find(n => n.id === Number(id));

        return aiArticle;
    },

    updateNews: async (newArticles: NewsArticle[]): Promise<void> => {
        const articlesToInsert = newArticles.map(n => ({
            title: n.title,
            summary: n.summary,
            content: n.content,
            image_url: n.imageUrl,
            category: n.category,
            category_color: n.categoryColor,
            publish_date: n.publishDate,
            author: n.author,
            // source_url: n.sourceUrl, // Columns didn't exist in my create script, commenting out to avoid error
            // source_name: n.sourceName
        }));

        const { error } = await supabase.from('news').insert(articlesToInsert);

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
                console.log("[AutoUpdate] Verificando agendamento semanal...");
                console.log(`[AutoUpdate] Última atualização: ${lastUpdateStr ? new Date(Number(lastUpdateStr)).toLocaleString() : 'Nunca'}`);

                console.log("[AutoUpdate] Iniciando processo de atualização via IA...");
                const newArticles = await fetchWeeklyNewsWithAI();

                if (newArticles.length > 0) {
                    console.log(`[AutoUpdate] Sucesso! ${newArticles.length} novas notícias geradas.`);
                    // Em produção: salvar no DB
                    // await api.updateNews(newArticles); 

                    localStorage.setItem(DB_KEYS.LAST_UPDATE, now.toString());
                    console.log("[AutoUpdate] Timestamp atualizado. Próxima execução em 7 dias.");
                } else {
                    console.error("[AutoUpdate] Falha: Nenhuma notícia foi retornada do serviço.");
                }
            } else {
                console.log("[AutoUpdate] Sistema atualizado. Nenhuma ação necessária.");
            }
        } catch (error) {
            console.error("[AutoUpdate] Erro Crítico durante execução:", error);
        }
    },

    getEvents: async (): Promise<Event[]> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        // Fallback para Eventos
        if (!data || data.length === 0) {
            const { events } = await import('../data');
            return events;
        }

        return (data || []).map((e: any) => ({
            ...e,
            imageUrl: e.image_url
        }));
    },

    getEventById: async (id: number): Promise<Event | undefined> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (!error && data) {
            return {
                ...data,
                imageUrl: data.image_url
            };
        }

        // Fallback para Eventos
        const { events } = await import('../data');
        return events.find(e => e.id === Number(id));
    },

    getBusinesses: async (): Promise<Business[]> => {
        const { data, error } = await supabase
            .from('businesses')
            .select('*');

        // Fallback para Comércios
        if (!data || data.length === 0) {
            const { businesses } = await import('../data');
            return businesses;
        }

        return (data || []).map((b: any) => ({
            ...b,
            imageUrl: b.id === 1 ? '/images/panificadora_araucaria_real.jpg' : b.image_url
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

            // Combina: DB News PRIMEIRO (Prioridade para curadoria manual/local)
            const allNews = [...dbNews, ...evergreen];

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
