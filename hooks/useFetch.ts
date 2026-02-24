import { useState, useEffect, useCallback, useRef } from 'react';

const globalCache = new Map<string, any>();

interface UseFetchOptions<T> {
    cacheKey?: string;
    initialData?: T;
}

// Hook genérico para buscar dados com Cache e suporte a dados iniciais síncronos
export function useFetch<T>(
    fetchFunction: () => Promise<T>,
    cacheKeyOrOptions?: string | UseFetchOptions<T>
) {
    // Suporte a string (legado) ou objeto de opções
    const cacheKey = typeof cacheKeyOrOptions === 'string'
        ? cacheKeyOrOptions
        : cacheKeyOrOptions?.cacheKey;
    const initialData = typeof cacheKeyOrOptions === 'object'
        ? cacheKeyOrOptions?.initialData
        : undefined;

    const [data, setData] = useState<T | null>(() => {
        // 1. Prioridade máxima: cache em memória (navegação entre páginas)
        if (cacheKey && globalCache.has(cacheKey)) {
            return globalCache.get(cacheKey);
        }
        // 2. Dados iniciais síncronos (elimina flash de conteúdo vazio)
        if (initialData !== undefined) {
            return initialData;
        }
        return null;
    });

    // Se temos dados iniciais ou cache, NÃO mostramos loading -> sem flash!
    const [loading, setLoading] = useState<boolean>(() => {
        if (cacheKey && globalCache.has(cacheKey)) return false;
        if (initialData !== undefined) return false;
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

        // Só mostra loading se não tiver nenhum dado para exibir
        if (!data && initialData === undefined) setLoading(true);

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
