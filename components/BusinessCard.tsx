
import React, { useState } from 'react';
import { Business } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';

interface BusinessCardProps {
    business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    const [imageError, setImageError] = useState(false);
    const optimizedImageUrl = getOptimizedImageUrl(business.imageUrl, 800);

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
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 z-10">
                        <span className="material-icons text-4xl text-gray-400">storefront</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 z-20">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold text-gray-800 dark:text-white px-3 py-1 rounded-full shadow-sm">
                        {business.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{business.name}</h2>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 flex-grow mt-4">
                    <div className="flex items-start gap-3">
                        <span className="material-icons-outlined text-primary text-lg mt-0.5">location_on</span>
                        <span className="leading-tight">{business.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-icons-outlined text-primary text-lg">call</span>
                        <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-icons-outlined text-primary text-lg">language</span>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary truncate transition-colors underline decoration-transparent hover:decoration-current" href={safeWebsiteUrl} target="_blank" rel="noopener noreferrer">
                            {business.website}
                        </a>
                    </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-3 mt-auto">
                    <button className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 transition-all">
                        <span className="material-icons-outlined text-lg">call</span>
                        Ligar
                    </button>
                    <a
                        href={safeWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary-dark text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-800 hover:shadow-md transition-all"
                    >
                        <span className="material-icons-outlined text-lg">visibility</span>
                        Visitar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
