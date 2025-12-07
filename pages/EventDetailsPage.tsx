import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Event } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await api.getEventById(Number(id));
                if (data) {
                    setEvent(data);
                } else {
                    setError('Evento não encontrado.');
                }
            } catch (err) {
                setError('Erro ao carregar o evento.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;

    if (error || !event) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <span className="material-icons-outlined text-6xl text-gray-300 mb-4">event_busy</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Ops!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Evento não encontrado.'}</p>
            <button 
                onClick={() => navigate('/eventos')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
                Voltar para Agenda
            </button>
        </div>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20">
             {/* Hero Section */}
             <div className="relative h-[400px] w-full bg-gray-900">
                <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
                
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Link 
                        to="/eventos" 
                        className="inline-flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-medium"
                    >
                        <span className="material-icons-outlined text-base">arrow_back</span>
                        Voltar
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                     <div className="container mx-auto">
                        <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-4 shadow-lg">
                            {event.date}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
                            {event.title}
                        </h1>
                     </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sobre o Evento</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {event.description}
                            </p>
                             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                Este é um evento imperdível em Araucária. Reúna sua família e amigos para aproveitar o melhor da cultura e entretenimento da nossa cidade.
                            </p>
                        </div>

                         <AdSpace format="horizontal" />
                    </div>

                    {/* Sidebar de Informações */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informações</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                                        <span className="material-icons text-primary">calendar_today</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Data</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">{event.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                                        <span className="material-icons text-primary">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Horário</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">{event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                                        <span className="material-icons text-primary">place</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Local</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">{event.location}</p>
                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ' Araucária')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-sm hover:underline mt-1 inline-block"
                                        >
                                            Ver no mapa
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2">
                                    <span className="material-icons-outlined">share</span>
                                    Compartilhar Evento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;