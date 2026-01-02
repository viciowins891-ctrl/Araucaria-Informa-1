import { useEffect } from 'react';
import { notificationService } from '../services/NotificationService';

/**
 * Maestro (Hook) para controle de Notificações.
 * Desacopla a View (App.tsx) da lógica de serviço.
 */
export const useNotificationController = () => {
    useEffect(() => {
        // Inicializa o serviço via Singleton
        // O Service cuida internamente do Lazy Loading se necessário no futuro,
        // mas aqui já garantimos que a chamada é limpa.

        // Pequeno delay para garantir que não bloqueie o First Paint
        const timer = setTimeout(() => {
            notificationService.init();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
};
