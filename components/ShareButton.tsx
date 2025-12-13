
import React, { useState } from 'react';

interface ShareButtonProps {
    title: string;
    url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);

    // URL atual (fallback seguro)
    const currentUrl = url || window.location.href;

    // Título codificado para links
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(currentUrl);

    // Links de compartilhamento
    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: 'chat', // Material Icon
            color: 'bg-[#25D366] hover:bg-[#128C7E]',
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
        },
        {
            name: 'Facebook',
            icon: 'facebook',
            color: 'bg-[#1877F2] hover:bg-[#166FE5]',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'Twitter / X',
            icon: 'cancel', // X logo approximation or use custom svg
            color: 'bg-black hover:bg-gray-800',
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        },
        {
            name: 'LinkedIn',
            icon: 'work',
            color: 'bg-[#0A66C2] hover:bg-[#004182]',
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
        },
        {
            name: 'Email',
            icon: 'email',
            color: 'bg-gray-600 hover:bg-gray-700',
            href: `mailto:?subject=${encodedTitle}&body=Confira esta notícia: ${encodedUrl}`
        }
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 3000);
        setIsOpen(false);
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleOpen}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all font-medium active:scale-95"
                title="Compartilhar"
            >
                <span className="material-icons-outlined text-lg">share</span>
                <span className="hidden sm:inline">Compartilhar</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/5"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transform origin-top-right transition-all animate-fade-in-up border border-gray-100 dark:border-gray-700 p-2">
                        <div className="p-2 mb-2 border-b border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2">Compartilhar em</p>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                                    onClick={() => setIsOpen(false)} // Fecha ao clicar
                                >
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${link.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                                        <span className="material-icons text-sm">{link.icon}</span>
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{link.name}</span>
                                </a>
                            ))}

                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors w-full text-left group"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow-sm group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-sm">content_copy</span>
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Copiar Link</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Toast de Cópia - Pequeno e discreto */}
            {showCopiedToast && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap animate-fade-in-up z-50">
                    Link copiado!
                </div>
            )}
        </div>
    );
};

export default ShareButton;
