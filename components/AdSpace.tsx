import React, { useEffect, useRef } from 'react';

interface AdSpaceProps {
    className?: string;
    format?: 'horizontal' | 'square' | 'vertical';
    slotId?: string; // ID do bloco de anúncio específico (criado no painel do AdSense)
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

const AdSpace: React.FC<AdSpaceProps> = ({
    className = "",
    format = 'horizontal',
    slotId = "1234567890" // ID de exemplo, substitua pelo real do painel AdSense
}) => {
    const adRef = useRef<HTMLModElement>(null);

    // Define o estilo baseado no formato solicitado
    let style: React.CSSProperties = { display: 'block' };

    if (format === 'horizontal') {
        style = { ...style, width: '100%', height: '90px' }; // Leaderboard padrão
    } else if (format === 'square') {
        style = { ...style, width: '300px', height: '250px' }; // Retângulo médio
    } else if (format === 'vertical') {
        style = { ...style, width: '160px', height: '600px' }; // Skyscraper
    }

    useEffect(() => {
        // Tenta carregar o anúncio
        try {
            // Verifica se o anúncio já foi carregado neste container para evitar duplicatas em re-renders
            if (adRef.current && adRef.current.innerHTML === "") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("Erro ao carregar AdSense:", e);
        }
    }, []);

    // DETECÇÃO DE AMBIENTE:
    // O Google AdSense bloqueia anúncios em localhost, gerando o erro "Conteúdo Bloqueado".
    // Para evitar isso, mostramos um placeholder visual quando estamos desenvolvendo.
    const isDevelopment = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (isDevelopment) {
        return (
            <div className={`flex justify-center my-8 ${className}`}>
                <div
                    className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm font-semibold uppercase tracking-widest"
                    style={style}
                >
                    Publicidade (AdSense)
                </div>
            </div>
        );
    }

    return (
        <div className={`flex justify-center my-8 ${className} overflow-hidden`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-1766405844459024" // ID do Araucária Informa
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSpace;