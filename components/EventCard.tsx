import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { getOptimizedImageUrl } from '../services/imageUtils';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [imageError, setImageError] = useState(false);
    const optimizedImageUrl = getOptimizedImageUrl(event.imageUrl, 800);

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 h-full border border-gray-100 dark:border-gray-700">
            <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center overflow-hidden">
                {!imageError ? (
                    <img
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        src={optimizedImageUrl}
                        loading="lazy"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 z-10">
                        <span className="material-icons text-4xl text-gray-400">event_busy</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold text-gray-800 dark:text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <span className="material-icons-outlined text-sm text-primary">event</span>
                        {event.date}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">{event.description}</p>
                <div className="space-y-3 text-slate-500 dark:text-slate-400 mt-auto">
                    <div className="flex items-center">
                        <span className="material-icons text-xl mr-3 text-primary">schedule</span>
                        <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-xl mr-3 text-primary">place</span>
                        <span>{event.location}</span>
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