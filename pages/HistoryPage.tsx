
import React from 'react';

const HistoryPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark font-display">História de Araucária</h1>
                <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark">Descubra as curiosidades e a rica história da nossa cidade.</p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 sm:p-10 rounded-lg shadow-sm mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-text-light dark:text-text-dark font-display">Sobre Araucária</h2>
                <div className="space-y-4 text-base text-text-secondary-light dark:text-text-secondary-dark">
                    <p>Araucária é um município brasileiro do estado do Paraná, localizado na Região Metropolitana de Curitiba. Com uma rica história que remonta ao século XVII, a cidade se desenvolveu inicialmente como um ponto de passagem para tropeiros que viajavam entre o sul e o norte do país.</p>
                    <p>O nome "Araucária" vem da árvore característica da região, o pinheiro-do-paraná (Araucaria angustifolia), que cobria extensas áreas da cidade. Hoje, Araucária é conhecida por seu importante polo industrial, mantendo também suas tradições culturais e históricas.</p>
                    <p>A cidade preserva diversos patrimônios históricos e culturais, incluindo igrejas centenárias, museus e construções que contam a história do desenvolvimento da região sul do Brasil.</p>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-8 text-center text-text-light dark:text-text-dark font-display">Curiosidades e Histórias</h2>
                <div className="text-center">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Em breve, mais conteúdo histórico sobre Araucária.</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
