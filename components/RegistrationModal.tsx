import React from 'react';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    // Reset when opening
    React.useEffect(() => {
        if (isOpen) {
            setIsLoading(false);
            setIsSuccess(false);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2500);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/75 transition-opacity backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 dark:border-zinc-700">

                    {/* Success State Overlay */}
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-zinc-800 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                                <span className="material-icons text-5xl text-green-500">check_circle</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Solicitação Enviada!</h3>
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                Recebemos os dados da sua empresa. <br />
                                Entraremos em contato via WhatsApp em breve.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="bg-primary px-4 py-6 sm:px-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                <h3 className="text-xl font-bold leading-6 text-white relative z-10" id="modal-title">
                                    Cadastre seu Negócio
                                </h3>
                                <p className="mt-1 text-sm text-primary-light relative z-10">
                                    Junte-se ao guia comercial de Araucária
                                </p>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-4 py-6 sm:p-6">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                    <div>
                                        <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Nome da Empresa
                                        </label>
                                        <input
                                            type="text"
                                            id="business-name"
                                            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            placeholder="Ex: Padaria Central"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Categoria
                                            </label>
                                            <select
                                                id="category"
                                                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            >
                                                <option>Alimentação</option>
                                                <option>Varejo</option>
                                                <option>Serviços</option>
                                                <option>Outros</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                WhatsApp
                                            </label>
                                            <input
                                                type="tel"
                                                id="whatsapp"
                                                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                                placeholder="(41) 99999-9999"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            E-mail Comercial
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            placeholder="contato@suaempresa.com"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 dark:bg-zinc-900/50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100 dark:border-zinc-700">
                                <button
                                    type="button"
                                    className={`inline-flex w-full justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors sm:ml-3 sm:w-auto ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-dark transform hover:scale-105'
                                        }`}
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Enviando...
                                        </span>
                                    ) : 'Enviar Solicitação'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-zinc-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-600 sm:mt-0 sm:w-auto transition-colors"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
