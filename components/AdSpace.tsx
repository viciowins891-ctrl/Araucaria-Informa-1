
import React from 'react';

interface AdSpaceProps {
    className?: string;
    format?: 'horizontal' | 'square' | 'vertical';
}

const AdSpace: React.FC<AdSpaceProps> = ({ className = "", format = 'horizontal' }) => {
    // Dimensões sugeridas baseadas nos formatos padrão do AdSense
    let dimensions = "h-24 w-full"; // Leaderboard mobile/desktop
    if (format === 'square') dimensions = "h-64 w-full max-w-[300px]"; // Medium Rectangle
    if (format === 'vertical') dimensions = "h-[600px] w-full max-w-[160px] or max-w-[300px]"; // Skyscraper

    return (
        <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
            <div className={`bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs uppercase tracking-widest font-semibold overflow-hidden ${dimensions}`}>
                <span className="mb-1">Publicidade</span>
                <span className="text-[10px] opacity-60">Espaço reservado Google AdSense</span>
            </div>
        </div>
    );
};

export default AdSpace;
