
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdvertisePage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-body transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/5 to-primary/10 dark:from-primary-dark/20 dark:to-primary/5 z-0" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-fade-in-up">
                            PARA EMPRESAS VISIONÁRIAS
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-up delay-100">
                            Não jogue dinheiro fora em <span className="text-primary">sites lentos e inseguros</span>.
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200">
                            Sua marca merece estar em uma plataforma que carrega instantaneamente, oferece segurança de nível bancário e respeita a inteligência do seu cliente.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                            <a
                                href="https://wa.me/5541999999999?text=Olá, quero anunciar no portal mais rápido de Araucária!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.101 1.588 5.911L.062 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Quero Anunciar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparativo Matador */}
            <div className="py-20 bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">A Verdade Sobre a Performance</h2>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Concorrentes */}
                        <div className="bg-gray-50 dark:bg-black/30 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 opacity-70 grayscale transition-all hover:grayscale-0">
                            <h3 className="text-xl font-bold text-gray-500 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Portais Antigos de Araucária
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-gray-500 font-semibold">
                                        <span>Tempo de Carregamento</span>
                                        <span className="text-red-500">8s - 12s (Lento)</span>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-400 w-full animate-pulse"></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Usuários desistem antes de ver seu anúncio.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-gray-500 font-semibold">
                                        <span>Segurança</span>
                                        <span className="text-orange-500">Vulnerável (Nota C)</span>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-400 w-[40%]"></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Plataformas antigas (WordPress) suscetíveis a invasões.</p>
                                </div>
                            </div>
                        </div>

                        {/* Araucária Informa */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border-2 border-primary/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMENDADO</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="text-primary">Araucária Informa</span>
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-bold">
                                        <span className="text-gray-700 dark:text-gray-200">Tempo de Carregamento</span>
                                        <span className="text-green-500">Instântaneo (~1s)</span>
                                    </div>
                                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[15%] group-hover:w-[10%] transition-all duration-1000"></div>
                                    </div>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Seu cliente vê sua marca imediatamente.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-bold">
                                        <span className="text-gray-700 dark:text-gray-200">Segurança</span>
                                        <span className="text-blue-500">Blindado (Nota A+)</span>
                                    </div>
                                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[98%]"></div>
                                    </div>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Arquitetura moderna e segura (Auditoria Externa).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefícios Grid */}
            <div className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <BenefitCard
                        icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Informação Verificada"
                        description="Diferente das redes sociais, aqui seu anúncio aparece ao lado de conteúdo checado e credível. Isso transfere autoridade para sua marca."
                        color="bg-green-500"
                    />
                    <BenefitCard
                        icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                        title="Experiência de App"
                        description="Somos um Progressive Web App (PWA). Seu cliente pode instalar nosso jornal no celular, garantindo que sua marca esteja sempre no bolso dele."
                        color="bg-primary"
                    />
                    <BenefitCard
                        icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        title="Relatórios Reais"
                        description="Chega de 'achismos'. Entregamos dados claros de quantas pessoas viram e clicaram no seu anúncio."
                        color="bg-purple-500"
                    />
                </div>
            </div>

            {/* CTA Final */}
            <div className="bg-primary py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl mx-auto">
                        Pronto para elevar o nível da sua publicidade?
                    </h2>
                    <a
                        href="https://wa.me/5541999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-5 bg-white text-primary font-bold text-xl rounded-full shadow-2xl hover:bg-gray-100 transition-colors"
                    >
                        Chamar no WhatsApp Comercial
                    </a>
                </div>
            </div>
        </div>
    );
};

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, description: string, color: string }> = ({ icon, title, description, color }) => (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300">
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 shadow-md`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
);

export default AdvertisePage;
