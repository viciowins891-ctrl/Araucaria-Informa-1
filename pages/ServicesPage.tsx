
import React, { useEffect } from 'react';

const ServicesPage: React.FC = () => {
    useEffect(() => {
        document.title = "Telefones Úteis e Farmácias de Plantão - Araucária Informa";
        window.scrollTo(0, 0);
    }, []);

    const emergencyNumbers = [
        { name: 'Guarda Municipal', number: '153', color: 'bg-blue-600', description: 'Emergências e Denúncias' },
        { name: 'Polícia Militar', number: '190', color: 'bg-red-600', description: 'Crimes e Ocorrências' },
        { name: 'SAMU', number: '192', color: 'bg-red-500', description: 'Urgência Médica' },
        { name: 'Bombeiros', number: '193', color: 'bg-orange-500', description: 'Incêndios e Resgates' },
        { name: 'Defesa Civil', number: '199', color: 'bg-yellow-600', description: 'Desastres Naturais' },
    ];

    const healthServices = [
        { name: 'Hospital Municipal de Araucária', number: '(41) 3614-8000', type: 'Hospital' },
        { name: 'UIA - Unidade de Pronto Atendimento', number: '(41) 3614-7500', type: 'UPA' },
        { name: 'Vigilância Sanitária', number: '(41) 3901-5134', type: 'Saúde' },
    ];

    const publicServices = [
        { name: 'Prefeitura Municipal', number: '(41) 3614-1400', type: 'Administração' },
        { name: 'Câmara Municipal', number: '(41) 3641-5200', type: 'Legislativo' },
        { name: 'Companhia de Transporte (Triar)', number: '(41) 3614-1772', type: 'Transporte' },
        { name: 'Sanepar', number: '0800 200 0115', type: 'Água' },
        { name: 'Copel', number: '0800 51 00 116', type: 'Energia' },
    ];

    // Placeholder data - in a real app this could be dynamic
    const pharmacies = [
        { name: 'Farmácia Nissei (24h)', address: 'Rua Pedro Druszcz, 140 - Centro', phone: '(41) 3232-3232' },
        { name: 'Farmácia São João', address: 'Av. Dr. Victor do Amaral, 1020', phone: '(41) 3642-1234' },
    ];

    return (
        <div className="bg-gray-50 dark:bg-background-dark min-h-screen pb-16">

            {/* Header / Hero */}
            <div className="bg-primary dark:bg-primary-dark pt-24 pb-12 px-4 shadow-md">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">Telefones Úteis e Plantão</h1>
                    <p className="text-blue-100 text-lg">Guarde esta página para emergências.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-6">

                {/* Botões de Emergência (Grid principal) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {emergencyNumbers.map((item, index) => (
                        <a
                            key={index}
                            href={`tel:${item.number}`}
                            className={`${item.color} hover:brightness-110 active:scale-95 transition-all transform duration-200 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between group`}
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                                <p className="text-white/80 text-sm font-medium">{item.description}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                                <span className="text-2xl font-bold font-mono tracking-wider">{item.number}</span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Seção de Saúde e Hospital */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b border-red-100 dark:border-red-900/30 flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg text-red-600 dark:text-red-100">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Saúde e Hospitais</h2>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {healthServices.map((item, idx) => (
                            <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="mb-2 sm:mb-0">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.name}</h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.type}</span>
                                </div>
                                <a href={`tel:${item.number.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-primary font-bold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors w-full sm:w-auto justify-center">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    {item.number}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Farmácias de Plantão */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 border-b border-green-100 dark:border-green-900/30 flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg text-green-600 dark:text-green-100">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Farmácias (Plantão/24h)</h2>
                            <p className="text-xs text-gray-500">Consulte sempre por telefone antes de ir.</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pharmacies.map((pharmacy, idx) => (
                                <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex flex-col justify-between hover:border-green-500 transition-colors bg-gray-50 dark:bg-white/5">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                                            {pharmacy.name}
                                            {pharmacy.name.includes("24h") && <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full">ABERTO AGORA</span>}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{pharmacy.address}</p>
                                    </div>
                                    <a href={`tel:${pharmacy.phone.replace(/[^0-9]/g, '')}`} className="text-center w-full py-2 rounded-lg border border-green-600 text-green-700 dark:text-green-400 font-bold hover:bg-green-600 hover:text-white transition-all">
                                        Ligar: {pharmacy.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <a href="https://araucaria.pr.gov.br/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                Ver escala oficial completa no site da Prefeitura &rarr;
                            </a>
                        </div>
                    </div>
                </div>

                {/* Serviços Públicos */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Órgãos Públicos e Serviços</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:gap-px bg-gray-100 dark:bg-gray-700">
                        {publicServices.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-surface-dark p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.type}</span>
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-1 mb-3">{item.name}</h3>
                                <a href={`tel:${item.number.replace(/[^0-9]/g, '')}`} className="text-primary font-mono font-medium hover:underline">
                                    {item.number}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServicesPage;
