
import React, { useState } from 'react';
import { Business } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';

interface BusinessCardProps {
    business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    const [imageError, setImageError] = useState(false);
    // Solicitando 640px para ativar a lógica de mobile.webp (que é suficiente para cards)
    const optimizedImageUrl = getOptimizedImageUrl(business.imageUrl, 640);

    const getSafeUrl = (url: string) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `http://${url}`;
    };

    const safeWebsiteUrl = getSafeUrl(business.website);

    return (
        <div className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700/60 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
                {!imageError ? (
                    <img
                        alt={`Fachada da ${business.name}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
                        src={optimizedImageUrl}
                        loading="lazy"
                        width="800"
                        height="450"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 z-10">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                )}
                <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
                    {business.isFeatured && (
                        <span className="bg-amber-400 text-amber-900 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                            <svg className="w-4 h-4 text-amber-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            Destaque
                        </span>
                    )}
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold text-gray-800 dark:text-white px-3 py-1 rounded-full shadow-sm">
                        {business.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{business.name}</h2>

                {business.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                        {business.description}
                    </p>
                )}

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 flex-grow mt-4">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="leading-tight">{business.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary truncate transition-colors underline decoration-transparent hover:decoration-current" href={safeWebsiteUrl} target="_blank" rel="noopener noreferrer">
                            {business.website}
                        </a>
                    </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-3 mt-auto">
                    <button className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Ligar
                    </button>
                    <a
                        href={safeWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary-dark text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-800 hover:shadow-md transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Visitar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
