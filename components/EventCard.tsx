
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="bg-surface-light dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
            <img alt={event.title} className="w-full h-56 object-cover" src={event.imageUrl} />
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">{event.description}</p>
                <div className="space-y-3 text-slate-500 dark:text-slate-400">
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
