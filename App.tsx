
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';
import { api } from './services/api';

// Implementando Lazy Loading para performance (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage')); // Nova página
const EventsPage = lazy(() => import('./pages/EventsPage'));
const CommercePage = lazy(() => import('./pages/CommercePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));

const Layout: React.FC = () => {
    const location = useLocation();
    const isSimpleFooterPage = location.pathname === '/historia' || location.pathname === '/newsletter';

    // Hook para rodar a verificação de atualização automática
    useEffect(() => {
        // Executa a verificação em "background" sem travar a UI
        // O setTimeout(..., 0) joga a execução para o final da fila de eventos
        setTimeout(() => {
            api.checkAndRunBackgroundUpdate();
        }, 1000); // Espera 1 segundo após carregar o app para iniciar a verificação
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-body text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                {/* Suspense exibe um fallback enquanto o código da página é baixado */}
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/noticias" element={<NewsPage />} />
                        <Route path="/noticias/:id" element={<ArticlePage />} /> {/* Rota Dinâmica */}
                        <Route path="/eventos" element={<EventsPage />} />
                        <Route path="/comercio" element={<CommercePage />} />
                        <Route path="/historia" element={<HistoryPage />} />
                        <Route path="/newsletter" element={<NewsletterPage />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer simple={isSimpleFooterPage} />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
};

export default App;
