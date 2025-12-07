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

    // MODO DE DESENVOLVIMENTO:
    // Se não tivermos um ID real configurado ou estivermos em localhost,
    // mostramos o placeholder antigo para não quebrar o layout visualmente.
    // O AdSense não exibe anúncios em localhost/domínios não aprovados.
    const isDevelopment = true; // Mude para false quando for para produção com IDs reais

    if (isDevelopment) {
        let dimensions = "h-24 w-full"; 
        if (format === 'square') dimensions = "h-64 w-full max-w-[300px]";
        if (format === 'vertical') dimensions = "h-[600px] w-full max-w-[160px]";

        return (
            <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
                <div className={`bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs uppercase tracking-widest font-semibold overflow-hidden ${dimensions}`}>
                    <span className="mb-1">Publicidade</span>
                    <span className="text-[10px] opacity-60">Google AdSense (Modo Dev)</span>
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
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Substitua pelo seu ID
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSpace;