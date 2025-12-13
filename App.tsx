
import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import { api } from './services/api';
import CookieConsent from './components/CookieConsent';

// Implementando Lazy Loading para performance (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const CommercePage = lazy(() => import('./pages/CommercePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Páginas Legais e de Suporte
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

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

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);



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
                        <Route path="/historia" element={<HistoryPage />} />
                        <Route path="/quem-somos" element={<AboutPage />} />
                        <Route path="/newsletter" element={<NewsletterPage />} />

                        {/* Rotas Legais */}
                        <Route path="/privacidade" element={<PrivacyPolicyPage />} />
                        <Route path="/termos" element={<TermsPage />} />
                        <Route path="/contato" element={<ContactPage />} />

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
    return (
        <HelmetProvider>
            <ThemeProvider>
                <Layout />
            </ThemeProvider>
        </HelmetProvider>
    );
};

export default App;
