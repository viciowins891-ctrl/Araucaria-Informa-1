import { useState, useEffect, useCallback, useRef } from 'react';

const globalCache = new Map<string, any>();

// Hook genérico para buscar dados com Cache opcional
export function useFetch<T>(fetchFunction: () => Promise<T>, cacheKey?: string) {
    const [data, setData] = useState<T | null>(() => {
        if (cacheKey && globalCache.has(cacheKey)) {
            return globalCache.get(cacheKey);
        }
        return null;
    });

    const [loading, setLoading] = useState<boolean>(() => {
        if (cacheKey && globalCache.has(cacheKey)) {
            return false;
        }
        return true;
    });

    const [error, setError] = useState<string | null>(null);

    // Ref para rastrear se o componente está montado
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const execute = useCallback(async (forceReload = false) => {
        // Se temos cache e não é forceReload, não faz nada (já carregou no initial state)
        if (!forceReload && cacheKey && globalCache.has(cacheKey)) {
            return;
        }

        // Se não tem cache, mostra loading (apenas se não tiver dados anteriores pra evitar flash branco)
        if (!data) setLoading(true);

        setError(null);

        try {
            const result = await fetchFunction();
            if (isMounted.current) {
                setData(result);
                if (cacheKey) {
                    globalCache.set(cacheKey, result);
                }
            }
        } catch (err) {
            if (isMounted.current) {
                setError('Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.');
                console.error(err);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [fetchFunction, cacheKey]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: () => execute(true) };
}
