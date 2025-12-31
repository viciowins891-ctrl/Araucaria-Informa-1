
import React, { Suspense, lazy, useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import { api } from './services/api';
import CookieConsent from './components/CookieConsent';
import ErrorBoundary from './components/ErrorBoundary';



// Importação Eager (Imediata) para a Home Page - CRUCIAL PARA LCP E SEO
// Não use Lazy Loading na página inicial, pois atrasa o carregamento da imagem principal
import HomePage from './pages/HomePage';

// Implementando Lazy Loading para outras páginas (Code Splitting)
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const CommercePage = lazy(() => import('./pages/CommercePage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Páginas Legais e de Suporte
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdvertisePage = lazy(() => import('./pages/AdvertisePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

// Página Secreta de Administração
const AdminGeneratorPage = lazy(() => import('./pages/AdminGeneratorPage'));


const Layout: React.FC = () => {
    const location = useLocation();
    const isSimpleFooterPage = location.pathname === '/historia' || location.pathname === '/newsletter';
    const isAdminPage = location.pathname === '/admin';

    // Hook para rodar a verificação de atualização automática
    useEffect(() => {
        // Executa a verificação em "background" sem travar a UI
        setTimeout(() => {
            api.checkAndRunBackgroundUpdate();
        }, 1000);
    }, []);

    const navType = useNavigationType();

    // Scroll to top on route change, UNLESS it's a back/pop navigation
    useEffect(() => {
        if (navType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navType]);



    return (
        <div className="flex flex-col min-h-screen font-body text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300">
            {!isAdminPage && <Header />}
            <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/noticias" element={<NewsPage />} />
                        <Route path="/noticias/:id" element={<ArticlePage />} />
                        <Route path="/eventos" element={<EventsPage />} />
                        <Route path="/eventos/:id" element={<EventDetailsPage />} />
                        <Route path="/comercio" element={<CommercePage />} />
                        <Route path="/vagas" element={<JobsPage />} />
                        <Route path="/historia" element={<HistoryPage />} />
                        <Route path="/quem-somos" element={<AboutPage />} />
                        <Route path="/newsletter" element={<NewsletterPage />} />

                        {/* Rotas Legais */}
                        <Route path="/telefones-uteis" element={<ServicesPage />} />
                        <Route path="/privacidade" element={<PrivacyPolicyPage />} />
                        <Route path="/termos" element={<TermsPage />} />
                        <Route path="/contato" element={<ContactPage />} />

                        {/* Rota Comercial */}
                        <Route path="/anuncie" element={<AdvertisePage />} />

                        {/* Rota Secreta do Gerador */}
                        <Route path="/admin" element={<AdminGeneratorPage />} />


                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
            {!isAdminPage && <Footer simple={isSimpleFooterPage} />}
            {!isAdminPage && <CookieConsent />}
            <Analytics />
        </div>
    );
};

const App: React.FC = () => {
    // Inicialização do OneSignal Push Notifications
    useEffect(() => {
        const runOneSignal = async () => {
            try {
                // DOCUMENTAÇÃO: https://onesignal.com/
                // 1. Crie uma conta no OneSignal
                // 2. Crie um App Web
                // 3. Copie o App ID e cole abaixo
                await OneSignal.init({
                    appId: "SUBSTITUA_PELO_SEU_APP_ID", // <--- COLE SEU ID AQUI
                    allowLocalhostAsSecureOrigin: true, // Permite testar em localhost
                    notifyButton: {
                        enable: true, // Ativa o "Sininho" flutuante
                        size: 'medium',
                        theme: 'default',
                        position: 'bottom-left',
                        showCredit: false,
                        text: {
                            'tip.state.unsubscribed': 'Inscreva-se para receber notícias!',
                            'tip.state.subscribed': 'Você está inscrito para receber notícias.',
                            'message.action.subscribed': "Obrigado por se inscrever!",
                            'message.action.resubscribed': "Você está inscrito novamente.",
                            'message.action.unsubscribed': "Você não receberá mais notificações.",
                            'dialog.main.title': 'Araucária Informa',
                            'dialog.main.button.subscribe': 'INSCREVER',
                            'dialog.main.button.unsubscribe': 'CANCELAR',
                        }
                    },
                });
            } catch (error) {
                console.warn("OneSignal (Push) não configurado corretamente ou bloqueado:", error);
            }
        };

        runOneSignal();
    }, []);

    return (
        <HelmetProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    <Layout />
                </ErrorBoundary>
            </ThemeProvider>
        </HelmetProvider>
    );
};

export default App;
