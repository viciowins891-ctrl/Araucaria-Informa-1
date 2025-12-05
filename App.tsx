
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import LoadingSpinner from './components/LoadingSpinner';

// Implementando Lazy Loading para performance (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const CommercePage = lazy(() => import('./pages/CommercePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));

const Layout: React.FC = () => {
    const location = useLocation();
    const isSimpleFooterPage = location.pathname === '/historia' || location.pathname === '/newsletter';

    return (
        <div className="flex flex-col min-h-screen font-body text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                {/* Suspense exibe um fallback enquanto o código da página é baixado */}
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/noticias" element={<NewsPage />} />
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
