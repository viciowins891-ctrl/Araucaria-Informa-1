// import { supabase } from './supabaseClient'; // REMOVIDO PARA PERFORMANCE
import { getSupabase } from './supabaseClient';
import { NewsArticle, Event, Business } from '../types';
import { Job } from '../data-jobs';
// import { fetchWeeklyNewsWithAI } from './aiService';

// Constantes de configuração
const DB_KEYS = {
    LAST_UPDATE: '@araucaria-app/last_ai_update_timestamp'
};
const UPDATE_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

// Helper universal para parse de datas (BR e ISO)
// Garante padronização da ordem em todo o site
const parseDate = (dateStr: string): number => {
    if (!dateStr) return 0;

    // Formato BR: DD/MM/YYYY
    if (dateStr.includes('/') && !dateStr.includes('-')) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day).getTime();
    }

    // Tenta parse nativo (ISO, YYYY-MM-DD, etc)
    const timestamp = new Date(dateStr).getTime();
    if (!isNaN(timestamp)) return timestamp;

    return 0;
};

export const api = {
    getNews: async (): Promise<NewsArticle[]> => {
        // MODO DE DEBUG/FIX: Forçando uso de dados locais (data.ts)
        // Isso garante que as correções de IDs e Conteúdo sejam refletidas imediatamente,
        // ignorando dados antigos ou duplicados que possam estar no Supabase/Cache.
        try {
            // Limpa cache antigo para evitar fantasmas
            // localStorage.removeItem('araucaria_news_cache_v1_stable');

            const { newsArticles } = await import('../data');

            // Tratamento de imagens e ordenação
            const sanitizedHelper = newsArticles.map(item => {
                if (!item.imageUrl) item.imageUrl = '/images/placeholder_default.png';
                return item;
            });

            // Ordena e retorna
            return sanitizedHelper.sort((a, b) => {
                // Lógica de ordenação (Datas ou IDs) - Copiada da original mas simplificada
                // Se quiser manter ordenação por data:
                // CORREÇÃO CRÍTICA MOBILE: new Date() falha em alguns browsers móveis
                // Usando parseDate para garantir compatibilidade total
                const dateA = parseDate(a.publishDate);
                const dateB = parseDate(b.publishDate);
                // Critério de desempate: ID (mais recente primeiro)
                if (dateA === dateB) {
                    return Number(b.id) - Number(a.id);
                }
                return dateB - dateA;
            });

        } catch (e) {
            console.error("API: Erro ao carregar dados locais", e);
            return [];
        }
    },

    getNewsById: async (id: number): Promise<NewsArticle | undefined> => {
        // Busca unificada
        const allNews = await api.getNews();
        return allNews.find(n => n.id === Number(id));
    },

    updateNews: async (newArticles: NewsArticle[]): Promise<void> => {
        // Tenta salvar no Supabase, se falhar (RLS), salva no LocalStorage
        const supabase = await getSupabase();

        // Prepara objeto seguro
        const articlesToInsert = newArticles.map(n => {
            let isoDate;
            if (n.publishDate && n.publishDate.includes('/')) {
                const parts = n.publishDate.split('/');
                isoDate = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : new Date().toISOString();
            } else {
                isoDate = n.publishDate || new Date().toISOString();
            }

            return {
                ...n, // Mantém propriedades originais para o cache local
                id: Math.floor(Math.random() * 100000) + 2000,
                image_url: n.imageUrl || '/images/placeholder.jpg',
                category: n.category || 'Geral',
                publish_date: isoDate,
                author: n.author || 'Redação IA',
                created_at: new Date().toISOString()
            };
        });

        console.log("[API] Tentando salvar notícias...");

        const { error } = await supabase.from('news').insert(articlesToInsert.map(n => ({
            title: n.title,
            summary: n.summary,
            content: n.content,
            image_url: n.image_url,
            category: n.category,
            category_color: n.categoryColor,
            publish_date: n.publish_date,
            author: n.author
        })));

        if (error) {
            console.warn('[API] Falha no Supabase. Salvando no Cache Local.', error.message);
            try {
                // Salva no novo cache padrão
                const existingStr = localStorage.getItem('araucaria_news_cache_v1_stable');
                const existing = existingStr ? JSON.parse(existingStr) : [];
                const updated = [...articlesToInsert, ...existing];
                localStorage.setItem('araucaria_news_cache_v1_stable', JSON.stringify(updated.slice(0, 100)));
                console.log("[API] Notícias salvas no Cache Local com sucesso!");
            } catch (e) {
                console.error("[API] Falha ao salvar no local storage", e);
            }
        } else {
            console.log("[API] Notícias salvas no Supabase com sucesso!");
        }
    },

    checkAndRunBackgroundUpdate: async () => {
        try {
            const lastUpdateStr = localStorage.getItem(DB_KEYS.LAST_UPDATE);
            const now = Date.now();
            const shouldUpdate = !lastUpdateStr || (now - Number(lastUpdateStr) > UPDATE_INTERVAL_MS);

            if (shouldUpdate) {
                console.log("[AutoUpdate] Verificando conte\u00A0do novo...");
                console.log("[AutoUpdate] Gerando not\u00EDcias via IA...");
                const { fetchWeeklyNewsWithAI } = await import('./aiService');
                const newArticles = await fetchWeeklyNewsWithAI();

                if (newArticles.length > 0) {
                    console.log(`[AutoUpdate] Sucesso! ${newArticles.length} novas not\u00EDcias.`);
                    // SALVA (Supabase ou LocalStorage Fallback)
                    await api.updateNews(newArticles);
                    localStorage.setItem(DB_KEYS.LAST_UPDATE, now.toString());
                    console.log("[AutoUpdate] Próxima execu\u00E7\u00E3o em 7 dias.");
                } else {
                    console.error("[AutoUpdate] Falha: Nenhuma not\u00EDcia gerada.");
                }
            } else {
                console.log("[AutoUpdate] Conte\u00FAdo recente. Nenhuma a\u00E7\u00E3o.");
            }
        } catch (error) {
            console.error("[AutoUpdate] Erro:", error);
        }
    },

    getEvents: async (): Promise<Event[]> => {
        try {
            // MODO PERFORMANCE: Prioriza dados locais para carregamento instantâneo
            // O Supabase é chamado apenas em segundo plano ou em páginas específicas se necessário.
            // Isso elimina o tempo de espera (loading skeletons) na Home.
            const { events } = await import('../data');

            /* TENTATIVA DE SUPABASE DESABILITADA PARA ESTABILIDADE
            try {
                const supabase = await getSupabase();
                const { data } = await supabase.from('events').select('*');
                if (data && data.length > 0) return data;
            } catch (err) { console.warn("Supabase Events unreachable, using local."); }
            */

            // Filtragem e Ordenação Padronizada
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return events
                .filter(event => parseDate(event.date) >= today.getTime())
                .sort((a, b) => parseDate(a.date) - parseDate(b.date));

        } catch (e) {
            console.error("Erro ao carregar eventos locais:", e);
            return [];
        }
    },

    getEventById: async (id: number): Promise<Event | undefined> => {
        // Busca local direta
        const { events } = await import('../data');
        return events.find(e => e.id === Number(id));
    },

    getBusinesses: async (): Promise<Business[]> => {
        try {
            // MODO PERFORMANCE: Prioriza dados locais
            const { businesses } = await import('../data');

            /* TENTATIVA DE SUPABASE DESABILITADA
            try {
                const supabase = await getSupabase();
                const { data } = await supabase.from('businesses').select('*');
                if (data && data.length > 0) return data;
            } catch (err) { console.warn("Supabase Businesses unreachable, using local."); }
            */

            return businesses;
        } catch (e) {
            console.error("Erro ao carregar comércios locais:", e);
            return [];
        }
    },

    getHomeData: async () => {
        // Wrapper de timeout para evitar travamento eterno (5 segundos)
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout ao carregar dados")), 5000)
        );

        const loadData = async () => {
            console.log("api.getHomeData: Iniciando...");

            // Busca DB e Cache local em paralelo
            // IMPORTANTE: Removemos a chamada direta ao AI Service (evergreenPromise) aqui
            // para evitar travamentos e lentidão no carregamento da Home.
            // A atualização via IA é feita em background pelo checkAndRunBackgroundUpdate no App.tsx.

            const dbNewsPromise = api.getNews().catch(e => { console.error("Falha DB News", e); return []; });
            const eventsPromise = api.getEvents().catch(e => { console.error("Falha Events", e); return []; });
            const businessesPromise = api.getBusinesses().catch(e => { console.error("Falha Biz", e); return []; });

            const [dbNews, events, businesses] = await Promise.all([
                dbNewsPromise,
                eventsPromise,
                businessesPromise
            ]);

            // Como getNews() já retorna ordenado por data e combinado (DB + Cache + Static),
            // podemos usá-lo diretamente.
            const sortedNews = dbNews || [];

            return {
                news: sortedNews.slice(0, 6),
                events: events.slice(0, 3),
                businesses: businesses.slice(0, 4)
            };
        };

        try {
            // Promise.race força o erro se demorar demais
            const result = await Promise.race([loadData(), timeoutPromise]);
            return result as { news: NewsArticle[]; events: Event[]; businesses: Business[]; };
        } catch (error) {
            console.error("api.getHomeData: Erro Fatal ou Timeout REVERTENDO PARA LOCAL", error);
            try {
                // FALLBACK DE EMERGÊNCIA: Dados locais do data.ts
                const { newsArticles, events, businesses } = await import('../data');

                // Ordenação segura (Mobile Fix)
                const news = newsArticles.sort((a, b) => {
                    const dateA = parseDate(a.publishDate);
                    const dateB = parseDate(b.publishDate);
                    if (dateA === dateB) return Number(b.id) - Number(a.id);
                    return dateB - dateA;
                });

                return {
                    news: news.slice(0, 6),
                    events: events.slice(0, 3),
                    businesses: businesses.slice(0, 4)
                };
            } catch (fallbackError) {
                console.error("Critical Failure: Local fallback also failed", fallbackError);
                return { news: [], events: [], businesses: [] };
            }
        }
    },

    resetDatabase: async () => {
        localStorage.removeItem(DB_KEYS.LAST_UPDATE);
        window.location.reload();
    },

    getJobs: async (): Promise<Job[]> => {
        try {
            // MODO DE INTERVENÇÃO: Priorizando dados locais (data-jobs.ts)
            // O banco de dados (Supabase) contém dados antigos ou links quebrados.
            // Para garantir que o usuário veja as vagas reais e curadas (Indeed, etc.),
            // vamos usar diretamente o arquivo local atualizado.

            // Tenta buscar do Supabase apenas para logging/debug, mas não usa o retorno
            /*
            const supabase = await getSupabase();
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .neq('id', 0)
                .order('created_at', { ascending: false });
            */

            console.log("API: Usando lista de vagas local (curada manualmente).");
            const { jobs } = await import('../data-jobs');
            return jobs;

        } catch (e) {
            console.error("Erro ao carregar vagas locais:", e);
            return [];
        }
    }
};
