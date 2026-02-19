
import React, { useState } from 'react';

interface ShareButtonProps {
    title: string;
    url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);

    // URL atual (fallback seguro, forçando domínio de produção)
    const productionUrl = 'https://araucariainforma.com';
    const currentUrl = url || window.location.href.replace(window.location.origin, productionUrl);

    // Título codificado para links
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(currentUrl);

    // Interface local para os links
    interface ShareLink {
        name: string;
        icon: string;
        color: string;
        href: string;
        onClick?: (e: React.MouseEvent) => void;
    }

    // Links de compartilhamento
    const shareLinks: ShareLink[] = [
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
        },
        {
            name: 'Instagram',
            icon: 'camera',
            color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90',
            href: '#',
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                handleCopyLink();
                window.open('https://instagram.com', '_blank');
            }
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
                onClick={() => {
                    // Verificação simples de Mobile para priorizar experiência nativa APENAS em celulares
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                    // Se for mobile E tiver suporte nativo, usa o nativo (melhor UX no celular)
                    if (isMobile && navigator.share) {
                        navigator.share({
                            title: title,
                            text: `Confira no Araucária Informa: ${title}`,
                            url: currentUrl,
                        })
                            .then(() => console.log('Compartilhado com sucesso'))
                            .catch((error) => console.log('Erro ao compartilhar ou cancelado', error));
                    } else {
                        // No Desktop (ou sem suporte), abre SEMPRE o menu customizado (onde tem a opção do Instagram)
                        toggleOpen();
                    }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary dark:text-primary-light border-2 border-primary/20 dark:border-primary-light/30 rounded-full transition-all font-medium active:scale-95 shadow-sm"
                title="Compartilhar"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span className="inline">Compartilhar</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/5"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Container responsivo: Dropdown no Desktop, Modal/Bottom Sheet no Mobile */}
                    <div className="
                        absolute right-0 mt-2 w-72 rounded-xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transform origin-top-right transition-all animate-fade-in-up border border-gray-100 dark:border-gray-700 p-2
                        sm:static sm:absolute sm:right-0 sm:mt-2
                        fixed bottom-4 left-4 right-4 sm:bottom-auto sm:left-auto sm:top-auto sm:w-72
                    ">
                        <div className="p-2 mb-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sm:block">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2">Compartilhar em</p>
                            <button onClick={() => setIsOpen(false)} className="sm:hidden text-gray-400 p-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                            {shareLinks.map((link) => {
                                const isInstagram = link.name === 'Instagram';
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer"
                                        onClick={(e) => {
                                            if (link.onClick) {
                                                link.onClick(e);
                                            }
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full ${link.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                                            {link.name === 'WhatsApp' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.101 1.588 5.911L.062 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>}
                                            {link.name === 'Facebook' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>}
                                            {link.name === 'Twitter / X' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
                                            {link.name === 'Instagram' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>}
                                            {link.name === 'LinkedIn' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 5.432-5.63 5.432 0v8.306h5v-10.5c0-5.356-5.148-7.225-9.982-4.306v-1.194z" /></svg>}
                                            {link.name === 'Email' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {link.name}
                                        </span>
                                    </a>
                                );
                            })}
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors w-full text-left group"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
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
