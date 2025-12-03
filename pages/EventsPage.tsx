
import React from 'react';
import { events } from '../data';
import EventCard from '../components/EventCard';

const EventsPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <header className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-display">Eventos</h1>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Confira a agenda cultural e eventos da cidade.</p>
            </header>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </main>
        </div>
    );
};

export default EventsPage;
