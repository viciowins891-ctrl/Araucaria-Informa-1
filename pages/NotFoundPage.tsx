
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 text-center">
            <span className="material-icons-outlined text-9xl text-gray-300 dark:text-gray-700 mb-4">error_outline</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-display">Página não encontrada (404)</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                Ops! A página que você está procurando não existe ou foi movida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    to="/" 
                    className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors shadow-lg"
                >
                    Voltar para o Início
                </Link>
                <Link 
                    to="/noticias" 
                    className="px-8 py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-bold rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                >
                    Ver Notícias
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
