
import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
    business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden border border-border-light dark:border-border-dark">
            <img alt={`Fachada da ${business.name}`} className="w-full h-48 object-cover" src={business.imageUrl} />
            <div className="p-6 flex flex-col space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">{business.name}</h2>
                    <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-muted-light dark:text-muted-dark mt-2">{business.category}</span>
                </div>
                <div className="space-y-3 text-sm text-muted-light dark:text-muted-dark">
                    <div className="flex items-center gap-x-3">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                        <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <span className="material-symbols-outlined text-lg">call</span>
                        <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <span className="material-symbols-outlined text-lg">public</span>
                        <a className="text-primary hover:underline" href={`http://${business.website}`} target="_blank" rel="noopener noreferrer">{business.website}</a>
                    </div>
                </div>
                <div className="pt-2 grid grid-cols-2 gap-x-4">
                    <button className="flex items-center justify-center gap-x-2 w-full rounded-md border border-border-light dark:border-border-dark px-4 py-2 text-sm font-medium text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined text-base">call</span>
                        Ligar
                    </button>
                    <a href={`http://${business.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-x-2 w-full rounded-md bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors">
                        <span className="material-symbols-outlined text-base">travel_explore</span>
                        Visitar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
