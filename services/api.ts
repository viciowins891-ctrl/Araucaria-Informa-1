// import { supabase } from './supabaseClient'; // REMOVIDO PARA PERFORMANCE
import { getSupabase } from './supabaseClient';
import { NewsArticle, Event, Business } from '../types';
// import { fetchWeeklyNewsWithAI } from './aiService';

// Constantes de configuração
const DB_KEYS = {
    LAST_UPDATE: '@araucaria-app/last_ai_update_timestamp'
};
const UPDATE_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

export const api = {
    getNews: async (): Promise<NewsArticle[]> => {
        // BUSCA HÍBRIDA: Supabase + LocalStorage (Cache) + Estático
        try {
            // 1. Tenta Supabase
            const supabase = await getSupabase();
            const { data: dbNews } = await supabase
                .from('news')
                .select('*')
                .order('publish_date', { ascending: false });

            // 2. Busca Cache Local (Fallback para erro de RLS)
            let cachedNews: NewsArticle[] = [];
            try {
                const stored = localStorage.getItem('araucaria_news_cache_v22');
                if (stored) cachedNews = JSON.parse(stored);
            } catch (e) { console.warn("Erro ao ler cache local de news"); }

            // 3. Busca Dados Estáticos
            const { newsArticles: staticNews } = await import('../data');

            // COMBINAÇÃO: Cache > DB > Estático
            // Remove duplicatas baseado no título (já que IDs podem conflitar entre local e server)
            const allNews = [...cachedNews, ...(dbNews || []), ...staticNews];

            const uniqueNews = Array.from(new Map(allNews.map(item => [item.title, item])).values());

            // 4. SANITIZAÇÃO DE DADOS
            const sanitizedNews = uniqueNews.map(item => {
                // Removidos overrides manuais para permitir que as imagens do banco/IA sejam exibidas
                return item;
            });

            // Ordena por data (mais recente primeiro) e limita a 100 itens (~10 páginas)
            return sanitizedNews
                .sort((a, b) => {
                    const dateA = new Date(a.publishDate).getTime();
                    const dateB = new Date(b.publishDate).getTime();
                    if (dateA !== dateB) return dateB - dateA; // Ordena por data (mais recente primeiro)
                    return b.id - a.id; // Desempate por ID (maior ID primeiro)
                })
                .slice(0, 100) as NewsArticle[];

        } catch (e) {
            console.error("API: Falha crítica em getNews", e);
            const { newsArticles } = await import('../data');
            return newsArticles;
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

        // Prepara objeto seguro (como antes)
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
                id: Math.floor(Math.random() * 100000) + 2000, // Gera ID temporário para o cache local
                image_url: n.imageUrl || '/images/placeholder.jpg',
                category: n.category || 'Geral',
                publish_date: isoDate,
                author: n.author || 'Redação IA',
                created_at: new Date().toISOString()
            };
        });

        console.log("[API] Tentando salvar notícias...");

        // Tenta Supabase (pode falhar por RLS)
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
            console.warn('[API] Falha no Supabase (Provável RLS). Salvando no Cache Local do Navegador.', error.message);

            // FALLBACK: Salva no LocalStorage
            try {
                const existingStr = localStorage.getItem('araucaria_news_cache');
                const existing = existingStr ? JSON.parse(existingStr) : [];
                // Adiciona novas no topo
                const updated = [...articlesToInsert, ...existing];
                // Mantém apenas as últimas 100 para não estourar memória (aprox 10 páginas)
                localStorage.setItem('araucaria_news_cache_v22', JSON.stringify(updated.slice(0, 100)));
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
            const supabase = await getSupabase();
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });

            // Fallback para Eventos
            if (error || !data || data.length === 0) {
                const { events } = await import('../data');
                return events;
            }

            return (data || []).map((e: any) => ({
                ...e,
                imageUrl: e.image_url
            }));
        } catch (e) {
            const { events } = await import('../data');
            return events;
        }
    },

    getEventById: async (id: number): Promise<Event | undefined> => {
        try {
            const supabase = await getSupabase();
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
        } catch (e) { }

        // Fallback para Eventos
        const { events } = await import('../data');
        return events.find(e => e.id === Number(id));
    },

    getBusinesses: async (): Promise<Business[]> => {
        try {
            const supabase = await getSupabase();
            const { data, error } = await supabase
                .from('businesses')
                .select('*');

            // Fallback para Comércios
            if (error || !data || data.length === 0) {
                const { businesses } = await import('../data');
                return businesses;
            }

            return (data || []).map((b: any) => ({
                ...b,
                imageUrl: b.id === 1 ? '/images/panificadora_araucaria_real.jpg' : b.image_url
            }));
        } catch (e) {
            const { businesses } = await import('../data');
            return businesses;
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
            console.error("api.getHomeData: Erro Fatal ou Timeout", error);
            // Em caso de erro fatal/timeout, tenta retornar dados estáticos via getNews (cache/static)
            // se possível, ou lança erro. Para segurança, chamamos getNews direto síncrono (static fallback)
            // mas aqui vamos apenas relançar por enquanto ou retornar vazio.
            return { news: [], events: [], businesses: [] };
        }
    },

    resetDatabase: async () => {
        localStorage.removeItem(DB_KEYS.LAST_UPDATE);
        window.location.reload();
    }
};
