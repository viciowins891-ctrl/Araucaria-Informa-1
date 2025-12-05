
import React, { useState } from 'react';
import { Event } from '../types';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 h-full border border-gray-100 dark:border-gray-700">
             <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center overflow-hidden">
                {!imageError ? (
                    <img 
                        alt={event.title} 
                        className="absolute inset-0 w-full h-full object-cover z-10" 
                        src={event.imageUrl} 
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 z-10">
                        <span className="material-icons text-4xl text-gray-400">event_busy</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">{event.description}</p>
                <div className="space-y-3 text-slate-500 dark:text-slate-400 mt-auto">
                    <div className="flex items-center">
                        <span className="material-icons text-xl mr-3">schedule</span>
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-xl mr-3">place</span>
                        <span>{event.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
