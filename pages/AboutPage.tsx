
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    useEffect(() => {
        document.title = "Quem Somos - Araucária Informa";
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-display">Quem Somos</h1>

            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-12">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    O <strong>Araucária Informa</strong> é um portal de notícias independente, dedicado a trazer informações relevantes, precisas e atualizadas para os cidadãos de Araucária e região metropolitana.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Nossa missão é fortalecer a identidade local, valorizar a cultura da nossa cidade e fornecer serviços de utilidade pública que facilitem o dia a dia da comunidade. Acreditamos no jornalismo como ferramenta de cidadania e desenvolvimento social.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nossa Missão</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400">Informar com imparcialidade e ética.</span>
                        </li>
                        <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400">Promover a cultura e o turismo local.</span>
                        </li>
                        <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400">Apoiar o comércio e o desenvolvimento econômico.</span>
                        </li>
                        <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400">Dar voz às demandas da comunidade.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Política Editorial</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Seguimos rigorosos padrões de verificação de fatos. Todo o conteúdo publicado passa por revisão para garantir a precisão das informações. Respeitamos a pluralidade de ideias e o direito de resposta.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Nossas reportagens buscam sempre ouvir todos os lados envolvidos na notícia, priorizando o interesse público acima de tudo.
                    </p>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fale com a Redação</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Tem uma sugestão de pauta, encontrou um erro ou quer fazer uma denúncia? Entre em contato conosco.
                </p>
                <Link
                    to="/contato"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md"
                >
                    Entrar em Contato
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;
