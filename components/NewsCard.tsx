
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
    article: NewsArticle;
}

const colorVariants: { [key: string]: string } = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    red: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300',
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const categoryColorClass = colorVariants[article.categoryColor] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <img alt={article.title} className="w-full h-56 object-cover" src={article.imageUrl} />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    <span className={`${categoryColorClass} text-xs font-medium px-2.5 py-0.5 rounded-full`}>{article.category}</span>
                    <div className="flex items-center">
                        <span className="material-icons-outlined text-sm mr-1">calendar_today</span>
                        <span>{article.publishDate}</span>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">{article.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 flex-grow">{article.summary}</p>
                <a className="text-primary font-semibold hover:underline flex items-center self-start" href="#">
                    Ler mais
                    <span className="material-icons-outlined text-lg ml-1">arrow_forward</span>
                </a>
            </div>
        </div>
    );
};

export default NewsCard;
