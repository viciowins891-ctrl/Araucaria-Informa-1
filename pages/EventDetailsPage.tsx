
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Event } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSpace from '../components/AdSpace';
import ShareButton from '../components/ShareButton';

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weatherMock, setWeatherMock] = useState({ temp: 18, condition: 'Céu Limpo', icon: 'wb_sunny' });
    const [isRegistered, setIsRegistered] = useState(false);

    const handleConfirmPresence = () => {
        if (isRegistered) return;
        // Simulação de delay de rede
        const originalText = document.title;
        setIsRegistered(true);
        alert(`Presença confirmada para o evento: ${event?.title}!`);
    };

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await api.getEventById(Number(id));
                if (data) {
                    setEvent(data);
                    // Mock simple weather randomization based on event ID
                    const temps = [18, 22, 25, 15];
                    const conditions = [
                        { text: 'Céu Limpo', icon: 'wb_sunny' },
                        { text: 'Parcialmente Nublado', icon: 'cloud_queue' },
                        { text: 'Pancadas de Chuva', icon: 'umbrella' }
                    ];
                    setWeatherMock({
                        temp: temps[data.id % temps.length],
                        condition: conditions[data.id % conditions.length].text,
                        icon: conditions[data.id % conditions.length].icon
                    });
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

    const addToCalendar = () => {
        alert("Funcionalidade simulada: Evento adicionado ao seu calendário!");
    };

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
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20 font-body">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full bg-gray-900 group overflow-hidden">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[3s]"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent z-10"></div>

                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Link
                        to="/eventos"
                        className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md transition-colors text-sm font-medium border border-white/10"
                    >
                        <span className="material-icons-outlined text-base">arrow_back</span>
                        Voltar para Agenda
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="animate-fade-in-up">
                                <span className="inline-block bg-primary/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg border border-primary/20">
                                    {event.date}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white font-display drop-shadow-lg leading-tight">
                                    {event.title}
                                </h1>
                                <div className="flex items-center text-white/90 mt-4 text-lg">
                                    <span className="material-icons-outlined mr-2">place</span>
                                    {event.location}
                                </div>
                            </div>

                            {/* Ticket / CTA Button */}
                            <div className="flex-shrink-0 animate-fade-in-up delay-100">
                                <button
                                    onClick={handleConfirmPresence}
                                    disabled={isRegistered}
                                    className={`
                                        font-bold py-4 px-8 rounded-full shadow-xl transition-all transform flex items-center gap-3
                                        ${isRegistered
                                            ? 'bg-green-500 text-white cursor-default'
                                            : 'bg-white text-gray-900 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl'
                                        }
                                    `}
                                >
                                    <span className={`material-icons ${isRegistered ? 'text-white' : 'text-primary'}`}>
                                        {isRegistered ? 'check_circle' : 'confirmation_number'}
                                    </span>
                                    {isRegistered ? 'Presença Confirmada' : 'Confirmar Presença'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Weather Widget (Mock) */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white dark:bg-blue-900/30 rounded-full shadow-sm text-yellow-500">
                                    <span className="material-icons-outlined text-3xl">{weatherMock.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-blue-300 font-medium uppercase tracking-wide">Previsão para o dia</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        {weatherMock.temp}°C
                                        <span className="text-base font-normal text-gray-600 dark:text-blue-200">| {weatherMock.condition}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-xs text-gray-400">Dados meteorológicos</p>
                                <p className="text-xs text-gray-400">Simepar (Simulado)</p>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-display">Sobre o Evento</h2>
                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                                <p className="leading-relaxed">
                                    {event.description}
                                </p>
                                <p className="leading-relaxed mt-4">
                                    Prepare-se para uma experiência única em Araucária. Este evento foi planejado para proporcionar momentos inesquecíveis, valorizando a cultura local e promovendo o encontro da comunidade.
                                </p>
                                <h3>O que esperar:</h3>
                                <ul>
                                    <li>Ambiente seguro e familiar</li>
                                    <li>Opções de gastronomia local</li>
                                    <li>Acessibilidade para todos os públicos</li>
                                </ul>
                            </div>
                        </div>

                        <AdSpace format="horizontal" />
                    </div>

                    {/* Sidebar de Informações */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                                Detalhes e Ingressos
                            </h3>

                            <div className="space-y-8">
                                <div className="group flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors">
                                        <span className="material-icons text-primary text-xl">calendar_month</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Data</p>
                                        <p className="text-gray-900 dark:text-white font-bold text-lg">{event.date}</p>
                                        <button
                                            onClick={addToCalendar}
                                            className="text-primary text-xs font-bold uppercase tracking-wider mt-1 hover:underline"
                                        >
                                            + Adicionar ao Calendário
                                        </button>
                                    </div>
                                </div>

                                <div className="group flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors">
                                        <span className="material-icons text-primary text-xl">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Horário</p>
                                        <p className="text-gray-900 dark:text-white font-bold text-lg">{event.time}</p>
                                    </div>
                                </div>

                                <div className="group flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors">
                                        <span className="material-icons text-primary text-xl">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Localização</p>
                                        <p className="text-gray-900 dark:text-white font-bold text-lg">{event.location}</p>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ' Araucária')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-gray-500 hover:text-primary text-sm mt-2 transition-colors border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-lg hover:border-primary"
                                        >
                                            <span className="material-icons text-sm mr-1">map</span> Ver no mapa
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                                <button
                                    onClick={addToCalendar}
                                    className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <img src="/images/google_calendar.svg" alt="Google" className="w-5 h-5" />
                                    Google Calendar
                                </button>
                                <div className="w-full">
                                    <ShareButton title={`Confira este evento: ${event.title}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;