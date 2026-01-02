import React from 'react';
import EventCard from '../components/EventCard';
import EventCardSkeleton from '../components/skeletons/EventCardSkeleton';
import { useEventsController } from '../hooks/useEventsController';
import SEO from '../components/SEO';

const EventsPage: React.FC = () => {
    // O Controller "maestra" tudo: dados, loading, efeitos (como título da página)
    const { events, loading, error } = useEventsController();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <SEO
                title="Eventos e Agenda Cultural"
                description="Confira os próximos eventos, festas e feiras em Araucária."
                image="/images/events_hero.jpg"
            />
            <header className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-display">Eventos</h1>
                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Confira a agenda cultural e eventos da cidade.</p>
            </header>

            {loading && (
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <EventCardSkeleton key={`skeleton-${index}`} />
                    ))}
                </main>
            )}

            {error && <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200">{error}</div>}

            {!loading && !error && events && (
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                    {events.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                            Não há eventos programados para os próximos dias.
                        </p>
                    )}
                </main>
            )}
        </div>
    );
};

export default EventsPage;
