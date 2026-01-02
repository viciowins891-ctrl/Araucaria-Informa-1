import OneSignal from 'react-onesignal';

/**
 * Singleton Class para Gerenciamento de Notificações (Push).
 * Implementa Lazy Loading e encapsula a complexidade do OneSignal.
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
     * Deve ser chamado apenas pelo Maestro (Controller) apropriado.
     */
    public async init(): Promise<void> {
        if (this.initialized) return;

        try {
            await OneSignal.init({
                appId: this.appId,
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                    enable: true,
                    size: 'medium',
                    theme: 'default',
                    position: 'bottom-left',
                    showCredit: false,
                    text: {
                        'tip.state.unsubscribed': 'Inscreva-se para receber notícias!',
                        'tip.state.subscribed': 'Você está inscrito para receber notícias.',
                        'message.action.subscribed': "Obrigado por se inscrever!",
                        'message.action.resubscribed': "Você está inscrito novamente.",
                        'message.action.unsubscribed': "Você não receberá mais notificações.",
                        'dialog.main.title': 'Araucária Informa',
                        'dialog.main.button.subscribe': 'INSCREVER',
                        'dialog.main.button.unsubscribe': 'CANCELAR',
                    }
                },
            });
            this.initialized = true;
            console.log("[NotificationService] Inicializado com sucesso.");
        } catch (error) {
            console.warn("[NotificationService] Falha na inicialização ou bloqueado:", error);
        }
    }
}

export const notificationService = NotificationService.getInstance();
