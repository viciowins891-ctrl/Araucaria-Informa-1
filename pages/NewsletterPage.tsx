
import React, { FormEvent, useState } from 'react';
import { newsletterService } from '../services/newsletterService';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 transition-shadow hover:shadow-lg">
        <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-md text-primary">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">{description}</p>
    </div>
);

const NewsletterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const response = await newsletterService.subscribe(email);
            setStatus('success');
            setMessage(response.message);
            setEmail(''); // Limpa o campo
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || "Ocorreu um erro ao tentar se inscrever.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl">
            <main>
                <section className="text-center mb-16 sm:mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-display">Newsletter Araucária Informa</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Fique por dentro de tudo que acontece em Araucária</p>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 sm:mb-24">
                    <FeatureCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        }
                        title="Notícias em Primeira Mão"
                        description="Receba as últimas notícias de Araucária diretamente no seu email."
                    />
                    <FeatureCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        title="Atualização Semanal"
                        description="Newsletter enviada toda semana com os destaques mais importantes."
                    />
                    <FeatureCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }
                        title="Eventos Exclusivos"
                        description="Fique sabendo dos eventos e atividades culturais da cidade."
                    />
                    <FeatureCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        }
                        title="100% Gratuito"
                        description="Sem custos, sem spam, apenas conteúdo relevante sobre nossa cidade."
                    />
                </section>

                <section className="bg-gray-100 dark:bg-gray-800/50 p-8 sm:p-12 rounded-xl border border-gray-200 dark:border-gray-700/80 text-center max-w-4xl mx-auto mb-16 sm:mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-display">Assine Nossa Newsletter</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">Cadastre seu email abaixo e comece a receber conteúdo exclusivo sobre Araucária.</p>

                    <div className="bg-surface-light dark:bg-gray-800 rounded-lg p-8 sm:p-10 border border-gray-200 dark:border-gray-700 relative overflow-hidden">

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-8 animate-fade-in-up">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Inscrição Confirmada!</h3>
                                <p className="text-gray-600 dark:text-gray-300">{message}</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-primary hover:text-primary-dark font-semibold text-sm"
                                >
                                    Cadastrar outro e-mail
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white font-display">Receba atualizações semanais de Araucária</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Fique por dentro das últimas notícias, eventos e oportunidades da sua cidade.</p>

                                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
                                    <label className="sr-only" htmlFor="email-sub">Seu email</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-md border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-primary focus:border-primary disabled:opacity-50"
                                        id="email-sub"
                                        placeholder="Seu email"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        className={`
                                            bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark 
                                            whitespace-nowrap flex items-center justify-center min-w-[140px]
                                            ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}
                                        `}
                                        type="submit"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : 'Inscrever-se'}
                                    </button>
                                </form>
                                {status === 'error' && (
                                    <p className="text-red-500 mt-4 text-sm font-medium">{message}</p>
                                )}

                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.</p>
                            </>
                        )}
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800/50 p-8 sm:p-10 rounded-lg border border-gray-200 dark:border-gray-700/80 max-w-4xl mx-auto mb-20 sm:mb-32">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 font-display">O que você vai receber?</h2>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start"><span className="text-primary font-bold mr-3 mt-1">•</span><div><strong className="text-gray-800 dark:text-gray-200">Resumo Semanal:</strong> As principais notícias da semana em um formato fácil de ler.</div></li>
                        <li className="flex items-start"><span className="text-primary font-bold mr-3 mt-1">•</span><div><strong className="text-gray-800 dark:text-gray-200">Agenda Cultural:</strong> Eventos, shows, feiras e atividades acontecendo na cidade.</div></li>
                        <li className="flex items-start"><span className="text-primary font-bold mr-3 mt-1">•</span><div><strong className="text-gray-800 dark:text-gray-200">Destaques Locais:</strong> Histórias inspiradoras de pessoas e negócios de Araucária.</div></li>
                        <li className="flex items-start"><span className="text-primary font-bold mr-3 mt-1">•</span><div><strong className="text-gray-800 dark:text-gray-200">Curiosidades:</strong> Fatos históricos e curiosidades sobre nossa cidade.</div></li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default NewsletterPage;
