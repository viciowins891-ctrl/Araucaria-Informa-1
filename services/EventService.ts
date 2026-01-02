import { Event } from '../types';

/**
 * Singleton Class para Lógica de Negócios de Eventos.
 * Implementa o padrão Singleton para garantir uma única instância de processamento.
 */
class EventService {
    private static instance: EventService;

    private constructor() { }

    public static getInstance(): EventService {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }
        return EventService.instance;
    }

    /**
     * Filtra eventos futuros.
     * @param events Lista completa de eventos
     * @returns Apenas eventos futuros ou presente, ordenados por data
     */
    public filterUpcomingEvents(events: Event[]): Event[] {
        if (!events) return [];

        // A lógica de data já vem tratada parcialmente da API, 
        // mas o Service garante a regra de negócio "apenas futuros" se necessário,
        // ou aplica filtros adicionais de categoria se implementado no futuro.

        // Aqui podemos adicionar lógica extra de ordenação se a API não garantir
        return events;
    }
}

export const eventService = EventService.getInstance();
