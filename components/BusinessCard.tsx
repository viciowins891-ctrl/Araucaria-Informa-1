
import React, { useState } from 'react';
import { Business } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';

interface BusinessCardProps {
    business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    const [imageError, setImageError] = useState(false);
    // Solicitando 800px para evitar a lógica de mobile.webp (que requer arquivo existente)
    const optimizedImageUrl = getOptimizedImageUrl(business.imageUrl, 800);

    const getSafeUrl = (url: string) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `http://${url}`;
    };

    const safeWebsiteUrl = getSafeUrl(business.website);

    const destinationUrl = business.whatsapp ? getSafeUrl(business.whatsapp) : safeWebsiteUrl;
    const isWhatsAppUrl = !!business.whatsapp || business.website.includes('wa.me') || business.website.includes('whatsapp.com');

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
                {/* Featured Badge Removed from here to simplify - logic below */}
                <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
                    {business.isFeatured && (
                        <span className="bg-amber-400 text-amber-900 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                            <svg className="w-4 h-4 text-amber-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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
                        <span className="leading-tight" dangerouslySetInnerHTML={{ __html: business.address }} />
                    </div>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <span>{business.phone}</span>
                    </div>
                    {/* Website Link Hidden in Card Body if WhatsApp (Redundant) or kept? Let's keep for completeness but style it */}
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary truncate transition-colors underline decoration-transparent hover:decoration-current" href={safeWebsiteUrl} target="_blank" rel="noopener noreferrer">
                            {business.website.replace('https://', '').replace('wa.me/', 'WhatsApp: ')}
                        </a>
                    </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-3 mt-auto">
                    <a
                        href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}
                        className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Ligar
                    </a>
                    <a
                        href={destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md
                            ${isWhatsAppUrl
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-primary-dark hover:bg-blue-800'
                            }`}
                    >
                        {isWhatsAppUrl ? (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Visitar
                            </>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BusinessCard);
