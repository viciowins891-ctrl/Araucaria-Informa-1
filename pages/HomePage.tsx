
import React from 'react';
import { Link } from 'react-router-dom';
import { newsArticles, events, businesses } from '../data';
import NewsCard from '../components/NewsCard';

const HomePage: React.FC = () => {
    return (
        <div>
            <section 
                className="text-white bg-cover bg-center" 
                style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuBAAx5TXdts1I3HdXdvyaff3eTQHPEX8hq3Xavd_BXZlJb-YBxfOjO8czCk-sKsnoNCM_gqumN9IKzxZTUpeZFPFUHD-7o-jHMpcDwpWSfw-Ywert_Vlc1nnMQRpsDC3VUj33PJOoZjxmqRFh9BSgFFgqwvhhnuIZzTQMn8vHx0fagT7ZjfrmgoEXbimIOQL3ytPOm2uBJ798dlUioKQeOkchfJFMo0YpXjt-ZRsjB9Ro2sU9RhFUtakpvwiMQy7jtHsbnPckQK3uy9)"}}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-display">Tudo sobre Araucária<br/>em um só lugar</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-200">Atualizado semanalmente com notícias, eventos e oportunidades locais</p>
                    <div className="mt-8 flex justify-center items-center space-x-4">
                        <Link to="/noticias" className="px-6 py-3 bg-primary-dark text-white font-medium rounded-md hover:opacity-90 transition-opacity">Ver Últimas Notícias</Link>
                        <Link to="/newsletter" className="px-6 py-3 bg-zinc-600/50 text-white font-medium rounded-md backdrop-blur-sm border border-zinc-500 hover:bg-zinc-500/50 transition-colors">Cadastrar Newsletter</Link>
                    </div>
                </div>
            </section>

            <div className="space-y-16 sm:space-y-24 py-16 sm:py-24">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Últimas Notícias</h2>
                        <Link to="/noticias" className="text-primary-dark font-medium hover:underline flex items-center gap-1">Ver todas <span className="material-icons-outlined text-base">arrow_forward</span></Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsArticles.slice(0, 3).map(article => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
                
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Eventos Esta Semana</h2>
                        <Link to="/eventos" className="text-primary-dark font-medium hover:underline flex items-center gap-1">Ver todos <span className="material-icons-outlined text-base">arrow_forward</span></Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                       {events.slice(0, 1).map(event => (
                            <div key={event.id} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1">
                                <img alt={event.title} className="w-full h-56 object-cover" src={event.imageUrl} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{event.title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">{event.description}</p>
                                    <div className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-2"><span className="material-icons-outlined text-lg">schedule</span><span>{event.time}</span></div>
                                        <div className="flex items-center gap-2"><span className="material-icons-outlined text-lg">location_on</span><span>{event.location}</span></div>
                                    </div>
                                </div>
                            </div>
                       ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 font-display">Destaques Comerciais</h2>
                        <Link to="/comercio" className="text-primary-dark font-medium hover:underline flex items-center gap-1">Ver todos <span className="material-icons-outlined text-base">arrow_forward</span></Link>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {businesses.slice(0, 1).map(business => (
                             <div key={business.id} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg overflow-hidden shadow-sm">
                                <img alt={`Fachada da ${business.name}`} className="w-full h-56 object-cover" src={business.imageUrl} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{business.name}</h3>
                                    <span className="text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full my-2 inline-block">{business.category}</span>
                                    <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                                        <div className="flex items-center gap-2"><span className="material-icons-outlined text-lg">location_on</span><span>{business.address}</span></div>
                                        <div className="flex items-center gap-2"><span className="material-icons-outlined text-lg">phone</span><span>{business.phone}</span></div>
                                        <div className="flex items-center gap-2"><span className="material-icons-outlined text-lg">language</span><a className="text-primary-dark hover:underline" href="#">{business.website}</a></div>
                                    </div>
                                    <div className="flex items-stretch space-x-2">
                                        <button className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                                            <span className="material-icons-outlined text-lg">call</span>Ligar
                                        </button>
                                        <a className="flex-1 px-4 py-2 bg-primary-dark text-white font-medium rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2" href="#">
                                            <span className="material-icons-outlined text-lg">visibility</span>Visitar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
