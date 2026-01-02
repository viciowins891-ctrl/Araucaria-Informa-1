// import OneSignal from 'react-onesignal'; // REMOVIDO para Lazy Loading real

/**
 * Singleton Class para Gerenciamento de Notificações (Push).
 * Implementa Lazy Loading REAL via Dynamic Import.
 */
class NotificationService {
    private static instance: NotificationService;
    private initialized: boolean = false;
    private appId: string = "a5db53d7-9156-4047-92a5-9c5928fdb9d7"; // ID do OneSignal

    private constructor() { }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    /**
     * Inicializa o serviço de notificações de forma assíncrona (Lazy).
     * Carrega o bundle do OneSignal apenas neste momento.
     */
    public async init(): Promise<void> {
        if (this.initialized) return;

        try {
            console.log("[NotificationService] Baixando OneSignal sob demanda...");
            // Dynamic Import: O pulo do gato para o Mobile Score 90+
            const OneSignal = (await import('react-onesignal')).default;

            await OneSignal.init({
                appId: this.appId,
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                    enable: true,
                    prenotify: true,
                    size: 'medium',
                    position: 'bottom-left',
                    showCredit: false,
                    text: {
                        'tip.state.unsubscribed': 'Inscreva-se para receber notícias!',
                        'tip.state.subscribed': 'Você está inscrito para receber notícias.',
                        'tip.state.blocked': 'Você bloqueou as notificações.',
                        'message.action.subscribed': "Obrigado por se inscrever!",
                        'message.action.resubscribed': "Você está inscrito novamente.",
                        'message.action.unsubscribed': "Você não receberá mais notificações.",
                        'message.action.subscribing': "Inscrevendo-se...",
                        'message.prenotify': "Clique para se inscrever nas notificações.",
                        'dialog.main.title': 'Araucária Informa',
                        'dialog.main.button.subscribe': 'INSCREVER',
                        'dialog.main.button.unsubscribe': 'CANCELAR',
                        'dialog.blocked.title': 'Notificações Bloqueadas',
                        'dialog.blocked.message': 'Siga as instruções para desbloquear as notificações.'
                    }
                },
            });
            this.initialized = true;
            console.log("[NotificationService] OneSignal Inicializado.");
        } catch (error) {
            console.warn("[NotificationService] Falha na inicialização:", error);
        }
    }
}

export const notificationService = NotificationService.getInstance();
