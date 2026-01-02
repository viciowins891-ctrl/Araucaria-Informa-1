import React from 'react';
import { useJobsController } from '../hooks/useJobsController';
import JobCardSkeleton from '../components/skeletons/JobCardSkeleton';
import SEO from '../components/SEO';

const JobsPage: React.FC = () => {
    const { jobs, loading, error, getTypeColor } = useJobsController();

    return (
        <div className="bg-gray-50 dark:bg-background-dark min-h-screen">
            <SEO
                title="Vagas de Emprego"
                description="Oportunidades de emprego e vagas abertas em Araucária hoje."
                image="/images/jobs_hero.jpg"
            />
            {/* Header Hero */}
            <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white pt-24 pb-16 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-100 text-sm font-semibold mb-4 backdrop-blur-sm">
                        Balcão de Oportunidades
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">Vagas de Emprego em Araucária</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Conectando talentos locais às melhores empresas da cidade. Atualizado diariamente.
                    </p>

                    <div className="mt-8">
                        <a href="https://wa.me/5541999904961?text=Quero%20anunciar%20uma%20vaga%20no%20site" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Sou Empresa e Quero Anunciar Vaga
                        </a>
                    </div>
                </div>
            </section>

            {loading && (
                <section className="container mx-auto px-4 py-12 -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <JobCardSkeleton key={`skeleton-${index}`} />
                        ))}
                    </div>
                </section>
            )}

            {error && (
                <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Lista de Vagas */}
            {!loading && !error && jobs && (
                <section className="container mx-auto px-4 py-12 -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full group relative overflow-hidden">
                                {/* Efeito de hover da borda */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{job.company}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${getTypeColor(job.type)}`}>
                                        {job.type}
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Publicado: {job.date}
                                    </div>
                                </div>

                                <a href={job.contactLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gray-50 hover:bg-primary hover:text-white text-gray-700 font-bold py-3 rounded-lg border border-gray-200 hover:border-primary transition-all duration-200">
                                    Candidatar-se Agora
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center p-8 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sua empresa está contratando?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Divulgue suas vagas gratuitamente no Araucária Informa e encontre os melhores profissionais da cidade.
                        </p>
                        <a href="https://wa.me/5541999904961?text=Olá,%20tenho%20interesse%20em%20divulgar%20uma%20vaga" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold hover:underline">
                            Entrar em contato para anunciar <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                    </div>
                </section>
            )}
        </div>
    );
};

export default JobsPage;
