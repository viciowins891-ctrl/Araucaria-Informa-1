
import React from 'react';

interface AdSpaceProps {
    slotId?: string;
    format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    className?: string;
    style?: React.CSSProperties;
}

const AdSpace: React.FC<AdSpaceProps> = ({ slotId = '', format = 'auto', className = '', style }) => {
    // Modo de desenvolvimento: Mostrar espaço vazio ou nada, sem texto feio
    // Em produção, o script do AdSense injetaria o anúncio aqui.

    // Se quiser ver onde estão os anúncios durante dev, pode descomentar a borda/bg
    const isDev = false; // Mude para true se quiser debugar layout

    return (
        <div
            className={`ad-container ${className} ${isDev ? 'bg-gray-100 border border-gray-300 min-h-[100px] flex items-center justify-center' : ''}`}
            style={style}
        >
            {/* AdSense Script Mock */}
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"></ins>

            {isDev && (
                <span className="text-xs text-gray-400 font-mono">AdSpace: {slotId}</span>
            )}
        </div>
    );
};

export default AdSpace;