
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import CommercePage from './pages/CommercePage';
import HistoryPage from './pages/HistoryPage';
import NewsletterPage from './pages/NewsletterPage';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const isSimpleFooterPage = location.pathname === '/historia' || location.pathname === '/newsletter';


    return (
        <div className="flex flex-col min-h-screen font-body text-text-light dark:text-text-dark">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/noticias" element={<NewsPage />} />
                    <Route path="/eventos" element={<EventsPage />} />
                    <Route path="/comercio" element={<CommercePage />} />
                    <Route path="/historia" element={<HistoryPage />} />
                    <Route path="/newsletter" element={<NewsletterPage />} />
                </Routes>
            </main>
            <Footer simple={isSimpleFooterPage} />
        </div>
    );
};

export default App;
