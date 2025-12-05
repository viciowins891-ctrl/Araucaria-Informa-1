
import React, { FormEvent } from 'react';

interface FooterProps {
    simple?: boolean;
}

const SocialIcon: React.FC<{ href: string, iconPath: string }> = ({ href, iconPath }) => (
    <a href={href} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={iconPath} />
        </svg>
    </a>
);


const Footer: React.FC<FooterProps> = ({ simple = false }) => {
    
    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input[type="email"]') as HTMLInputElement;
        
        if (input && input.value) {
            alert(`Obrigado! O email ${input.value} foi inscrito com sucesso.`);
            input.value = '';
        }
    };

    if (simple) {
        return (
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sobre</h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">Portal de informações sobre Araucária, atualizado semanalmente com notícias, eventos e oportunidades locais.</p>
                             <span className="inline-flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                                <span className="material-icons-outlined text-base">verified</span>
                                Informações verificadas
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Links Rápidos</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#/">Início</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#/noticias">Notícias</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#/eventos">Eventos</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#/comercio">Comércio</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#/historia">História</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#">Sobre</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#">Política de Privacidade</a></li>
                                <li><a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" href="#">Contato</a></li>
                            </ul>
                        </div>
                         <div className="col-span-2 md:col-span-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
                            <form className="flex flex-col space-y-2" onSubmit={handleSubscribe}>
                                <label className="sr-only" htmlFor="footer-email">Seu email</label>
                                <input className="w-full text-sm px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-primary focus:border-primary" id="footer-email" placeholder="Seu email" required type="email"/>
                                <button className="w-full bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark" type="submit">Inscrever-se</button>
                            </form>
                        </div>
                    </div>
                </div>
                 <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-8 border-t border-gray-200 dark:border-gray-700/80">
                    © 2025 Araucária Informa. Todos os direitos reservados.
                </div>
            </footer>
        )
    }

    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Sobre</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Portal de informações sobre Araucária, atualizado semanalmente com notícias, eventos e oportunidades locais.</p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <span className="material-icons-outlined text-base">verified</span>
                            <span>Informações verificadas</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Links Rápidos</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#/">Início</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#/noticias">Notícias</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#/eventos">Eventos</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#/comercio">Comércio</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#/historia">História</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Legal</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#">Sobre</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#">Política de Privacidade</a></li>
                            <li><a className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" href="#">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Redes Sociais</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Siga-nos nas redes sociais</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Newsletter</h3>
                        <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubscribe}>
                            <input className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-background-light dark:bg-zinc-800 focus:ring-primary focus:border-primary" placeholder="Seu email" required type="email" />
                            <button className="px-4 py-2 bg-primary-dark text-white font-medium rounded-md hover:opacity-90 transition-opacity" type="submit">Inscrever-se</button>
                        </form>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>© 2025 Araucária Informa. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
