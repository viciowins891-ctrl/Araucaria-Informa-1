
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Abrindo seu e-mail...</h3>
                            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                Se o aplicativo de e-mail não abrir automaticamente, envie para <strong>araucariainforma@gmail.com</strong>
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
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
                            Fale com a Gente
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                            Seja para enviar uma pauta, anunciar sua empresa ou tirar dúvidas, estamos aqui para ouvir você.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                            <a href="https://wa.me/5541999904961" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg whitespace-nowrap">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.101 1.588 5.911L.062 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                (41) 99990-4961
                            </a>

                            <a href="mailto:araucariainforma@gmail.com"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-md border border-gray-200 dark:border-gray-700 hover:border-primary">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                araucariainforma@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
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

