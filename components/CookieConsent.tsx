
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Pequeno delay para não assustar o usuário imediatamente
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:flex md:items-center md:justify-between gap-6">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Valorizamos sua privacidade</p>
                    <p>
                        Utilizamos cookies para melhorar sua experiência e personalizar publicidade. 
                        Ao continuar navegando, você concorda com nossa <a href="#/privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                    <button 
                        onClick={handleAccept}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm whitespace-nowrap"
                    >
                        Aceitar e Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
