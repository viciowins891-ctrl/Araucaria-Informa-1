import { useEffect } from 'react';
import { api } from '../services/api';
import { useFetch } from './useFetch';
import { eventService } from '../services/EventService';
import { Event } from '../types';

interface EventsController {
    events: Event[];
    loading: boolean;
    error: string | null;
}

/**
 * Maestro Central (Custom Hook) para a Página de Eventos.
 */
export const useEventsController = (): EventsController => {
    // 1. Data Fetching
    const { data, loading, error } = useFetch(api.getEvents);

    // 2. Side Effects
    useEffect(() => {
        document.title = "Eventos e Agenda Cultural - Araucária Informa";
    }, []);

    // 3. Business Logic Delegate
    // Mesmo que simples agora, garante que se quisermos filtrar front-end,
    // faremos aqui através do Service, sem tocar na View.
    const events = eventService.filterUpcomingEvents(data || []);

    return {
        events,
        loading,
        error
    };
};
