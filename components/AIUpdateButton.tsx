
import React, { useState } from 'react';
import { fetchWeeklyNewsWithAI } from '../services/aiService';
import { api } from '../services/api';

const AIUpdateButton: React.FC = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        if (!window.confirm("Deseja buscar as notícias mais recentes de Araucária usando Inteligência Artificial? Isso pode levar alguns segundos.")) {
            return;
        }

        try {
            setIsUpdating(true);
            
            // 1. Busca notícias no Gemini (Google Search)
            const newArticles = await fetchWeeklyNewsWithAI();
            
            // 2. Salva no "banco de dados" local
            await api.updateNews(newArticles);
            
            // 3. Recarrega a página para mostrar o conteúdo novo
            window.location.reload();
            
        } catch (error) {
            alert("Erro ao atualizar notícias. Tente novamente mais tarde.");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <button 
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all
                ${isUpdating 
                    ? 'bg-gray-400 cursor-wait text-gray-800' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:-translate-y-0.5'
                }
            `}
            title="Atualizar Notícias da Semana"
        >
            {isUpdating ? (
                <>
                    <span className="material-icons-outlined animate-spin text-lg">sync</span>
                    <span>Buscando...</span>
                </>
            ) : (
                <>
                    <span className="material-icons-outlined text-lg">auto_awesome</span>
                    <span className="hidden sm:inline">Atualizar (IA)</span>
                </>
            )}
        </button>
    );
};

export default AIUpdateButton;
