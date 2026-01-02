import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';
import { stripHtml } from '../services/textUtils';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [imageError, setImageError] = useState(false);
    const optimizedImageUrl = getOptimizedImageUrl(event.imageUrl, 640);

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 h-full border border-gray-100 dark:border-gray-700">
            <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center overflow-hidden">
                {!imageError ? (
                    <img
                        alt={stripHtml(event.title)}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        src={optimizedImageUrl}
                        loading="lazy"
                        width="800"
                        height="450"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 z-10">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                )}
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold text-gray-800 dark:text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {event.date}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h2
                    className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                    dangerouslySetInnerHTML={{ __html: event.title }}
                />
                <div
                    className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                />
                <div className="space-y-3 text-slate-500 dark:text-slate-400 mt-auto">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span dangerouslySetInnerHTML={{ __html: event.location }} />
                    </div>
                </div>

                <Link
                    to={`/eventos/${event.id}`}
                    className="mt-6 w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-300 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center"
                >
                    Ver Detalhes
                </Link>
            </div>
        </div>
    );
};

export default EventCard;