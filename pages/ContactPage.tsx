
import React, { FormEvent, useState } from 'react';

const ContactPage: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.querySelector('#name') as HTMLInputElement).value;
        const email = (form.querySelector('#email') as HTMLInputElement).value;
        const message = (form.querySelector('#message') as HTMLTextAreaElement).value;

        const subject = encodeURIComponent(`Contato Site: ${name}`);
        const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
        
        setStatus('success');

        // Pequeno delay para mostrar a UI de sucesso antes de abrir o email
        setTimeout(() => {
            window.location.href = `mailto:humberto_485@hotmail.com?subject=${subject}&body=${body}`;
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-display text-center">Fale Conosco</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
                Tem alguma dúvida, sugestão de pauta ou quer anunciar conosco? Entre em contato.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                    
                    {status === 'success' ? (
                        <div className="absolute inset-0 bg-surface-light dark:bg-surface-dark flex flex-col items-center justify-center p-8 animate-fade-in-up z-10">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <span className="material-icons text-3xl">mail_outline</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Abrindo seu e-mail...</h3>
                            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                Se o aplicativo de e-mail não abrir automaticamente, envie para <strong>humberto_485@hotmail.com</strong>
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-primary hover:text-primary-dark font-semibold text-sm underline"
                            >
                                Voltar para o formulário
                            </button>
                        </div>
                    ) : null}

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Envie uma mensagem</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                            <input type="text" id="name" required className="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" id="email" required className="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensagem</label>
                            <textarea id="message" rows={4} required className="w-full px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Informações de Contato</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Para assuntos comerciais, parcerias ou denúncias, você pode nos contatar diretamente pelo e-mail oficial.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                            <span className="material-icons text-primary">email</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <a href="mailto:humberto_485@hotmail.com" className="text-gray-900 dark:text-white font-medium hover:text-primary transition-colors">
                                humberto_485@hotmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                            <span className="material-icons text-primary">location_on</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Localização</p>
                            <p className="text-gray-900 dark:text-white font-medium">
                                Araucária, Paraná - Brasil
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30 mt-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            <strong>Nota:</strong> Respondemos a todas as mensagens em até 48 horas úteis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
