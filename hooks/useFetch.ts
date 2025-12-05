
import { useState, useEffect, useCallback, useRef } from 'react';

// Hook genérico para buscar dados
export function useFetch<T>(fetchFunction: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // Ref para rastrear se o componente está montado
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const execute = useCallback(async () => {
        // Reinicia estados
        setLoading(true);
        setError(null);
        
        try {
            const result = await fetchFunction();
            // Só atualiza o estado se o componente ainda estiver montado
            if (isMounted.current) {
                setData(result);
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
    }, [fetchFunction]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: execute };
}
