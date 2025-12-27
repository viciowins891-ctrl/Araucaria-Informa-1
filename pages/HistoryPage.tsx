
import React from 'react';

const HistoryPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark font-display">História de Araucária</h1>
                <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark">Descubra as curiosidades e a rica história da nossa cidade.</p>
            </div>

            {/* Hero Image: Portal Polonês (Representação artística: Arco/Arquitetura) */}
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg group relative bg-gray-200 dark:bg-gray-800 h-64 sm:h-96 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <img
                    src="/images/portal_polones_araucaria_real.png"
                    alt="Paisagem e Cultura Local"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 z-20">
                    <p className="text-white text-lg font-semibold">Portal Polonês</p>
                    <p className="text-zinc-300 text-sm">Homenagem à imigração e cultura local</p>
                </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 sm:p-10 rounded-lg shadow-sm mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-text-light dark:text-text-dark font-display">Sobre Araucária</h2>
                <div className="space-y-4 text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    <p>Araucária é um município brasileiro do estado do Paraná, localizado na Região Metropolitana de Curitiba. Com uma rica história que remonta ao século XVII, a cidade se desenvolveu inicialmente como um ponto de passagem para tropeiros que viajavam entre o sul e o norte do país.</p>
                    <p>O nome "Araucária" vem da árvore característica da região, o pinheiro-do-paraná (Araucaria angustifolia), que cobria extensas áreas da cidade. Hoje, Araucária é conhecida por seu importante polo industrial (REPAR), mantendo também suas tradições culturais e históricas fortemente influenciadas pela imigração polonesa.</p>
                    <p>A cidade preserva diversos patrimônios históricos e culturais, incluindo igrejas centenárias, museus como o Tingüi-Cuera e construções que contam a história do desenvolvimento da região sul do Brasil.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark font-display">Patrimônio Histórico</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        A <strong>Casa do Cavalo Baio</strong> e as construções em madeira no estilo polonês são marcos históricos importantes. Elas representam a arquitetura tradicional dos imigrantes que colonizaram a região.
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        O local preserva a memória dos primeiros habitantes e o desenvolvimento da região, sendo um ponto de parada obrigatório para quem deseja conhecer as raízes de Araucária.
                    </p>
                </div>
                {/* Imagem: Arquitetura Rústica/Madeira */}
                <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 h-64 relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <img
                        src="/images/casa_cavalo_baio.jpg"
                        alt="Arquitetura Típica"
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                {/* Imagem: Araucárias e Natureza */}
                <div className="rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 h-64 relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <img
                        src="/images/parque_cachoeira_real.png"
                        alt="Pinheiros e Natureza"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark font-display">Parque Cachoeira</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        O <strong>Parque Cachoeira</strong> é uma das principais áreas de lazer da cidade, abrigando também o <strong>Museu Tingüi-Cuera</strong>. É o palco das principais festas da cidade, como a Festa do Pêssego.
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        O espaço conta com lagos, área verde preservada de Araucárias e estruturas de lazer, sendo o pulmão verde do município.
                    </p>
                </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-light dark:text-text-dark font-display">Venha conhecer Araucária</h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                    Nossa cidade está de portas abertas para receber visitantes e compartilhar sua história, cultura e belezas naturais.
                </p>
            </div>
        </div>
    );
};

export default HistoryPage;
