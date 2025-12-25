
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsletterService } from '../services/newsletterService';

// ==================================================================================
// 🟢 CONFIGURAÇÃO FÁCIL DE REDES SOCIAIS
//
// Para ativar um ícone no site, basta colar o link da sua rede social dentro das aspas.
// Se deixar as aspas vazias (""), o ícone fica escondido automaticamente.
//
// NÃO SOU PROGRAMADOR: Apenas edite as linhas abaixo:
// ==================================================================================
const SOCIAL_LINKS = {
    facebook: "",    // Exemplo: "https://facebook.com/araucaria-informa"
    instagram: "",   // Exemplo: "https://instagram.com/araucaria-informa"
    twitter: "",     // Exemplo: "https://twitter.com/araucaria"
    linkedin: ""     // Exemplo: "https://linkedin.com/in/seu-perfil"
};
// ==================================================================================


interface FooterProps {
    simple?: boolean;
}

// Componente auxiliar para ícones sociais com SVG paths
const SocialIcon: React.FC<{ href: string, iconPath: string, label: string }> = ({ href, iconPath, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
    >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d={iconPath} />
        </svg>
    </a>
);

const Footer: React.FC<FooterProps> = ({ simple = false }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Verifica se existe alguma rede social ativa para decidir se mostra a coluna
    const hasSocialLinks = Object.values(SOCIAL_LINKS).some(link => link !== "");

    const handleSubscribe = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await newsletterService.subscribe(email);
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    if (simple) {
        return (
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {/* Sobre */}
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sobre</h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">Portal de informações sobre Araucária, atualizado semanalmente com notícias, eventos e oportunidades locais.</p>
                            <span className="inline-flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                Informações verificadas
                            </span>
                        </div>

                        {/* Links Rápidos */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Links Rápidos</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/">Início</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/noticias">Notícias</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/eventos">Eventos</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/comercio">Comércio</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/historia">História</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/contato">Contato</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/privacidade">Política de Privacidade</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/termos">Termos de Uso</Link></li>
                                <li><Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary" to="/quem-somos">Quem Somos</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter (Ocupa o resto se não houver redes sociais) */}
                        <div className={`col-span-2 ${hasSocialLinks ? 'md:col-span-2' : 'md:col-span-2'}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
                            {status === 'success' ? (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3 text-center">
                                    <p className="text-green-800 dark:text-green-300 text-sm font-semibold">Inscrição realizada com sucesso!</p>
                                </div>
                            ) : (
                                <form className="flex flex-col space-y-2" onSubmit={handleSubscribe}>
                                    <label className="sr-only" htmlFor="footer-email">Seu email</label>
                                    <input
                                        className="w-full text-sm px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-primary focus:border-primary disabled:opacity-50"
                                        id="footer-email"
                                        placeholder="Seu email"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        className="w-full bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-wait"
                                        type="submit"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Enviando...' : 'Inscrever-se'}
                                    </button>
                                </form>
                            )}
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

                    {/* Sobre */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Sobre</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Portal de informações sobre Araucária, atualizado semanalmente com notícias, eventos e oportunidades locais.</p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                            <span>Informações verificadas</span>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Links Rápidos</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/">Início</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/noticias">Notícias</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/eventos">Eventos</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/comercio">Comércio</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/historia">História</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Legal</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/contato">Contato</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/privacidade">Política de Privacidade</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/termos">Termos de Uso</Link></li>
                            <li><Link className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary" to="/quem-somos">Quem Somos</Link></li>
                        </ul>
                    </div>

                    {/* Redes Sociais - Renderização Condicional */}
                    {hasSocialLinks ? (
                        <div>
                            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Redes Sociais</h3>
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">Siga-nos nas redes sociais</p>
                            <div className="flex space-x-5">
                                {SOCIAL_LINKS.facebook && (
                                    <SocialIcon
                                        label="Facebook"
                                        href={SOCIAL_LINKS.facebook}
                                        iconPath="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    />
                                )}
                                {SOCIAL_LINKS.instagram && (
                                    <SocialIcon
                                        label="Instagram"
                                        href={SOCIAL_LINKS.instagram}
                                        iconPath="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.465c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    />
                                )}
                                {SOCIAL_LINKS.twitter && (
                                    <SocialIcon
                                        label="Twitter"
                                        href={SOCIAL_LINKS.twitter}
                                        iconPath="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                    />
                                )}
                                {SOCIAL_LINKS.linkedin && (
                                    <SocialIcon
                                        label="LinkedIn"
                                        href={SOCIAL_LINKS.linkedin}
                                        iconPath="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                    />
                                )}
                            </div>
                        </div>
                    ) : null}

                    {/* Newsletter - Expande se não houver Redes Sociais */}
                    <div className={`col-span-2 ${hasSocialLinks ? 'md:col-span-1' : 'md:col-span-1 lg:col-span-1'}`}>
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">Newsletter</h3>
                        {status === 'success' ? (
                            <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-4 text-center mt-4 animate-fade-in-up">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-1 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                <p className="text-green-800 dark:text-green-300 text-sm font-semibold">Inscrição realizada!</p>
                            </div>
                        ) : (
                            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubscribe}>
                                <input
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-background-light dark:bg-zinc-800 focus:ring-primary focus:border-primary disabled:opacity-50"
                                    placeholder="Seu email"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                />
                                <button
                                    className="px-4 py-2 bg-primary-dark text-white font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-wait"
                                    type="submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? '...' : 'Inscrever-se'}
                                </button>
                            </form>
                        )}
                        {status === 'error' && (
                            <p className="text-red-500 text-xs mt-2">Erro ao inscrever-se.</p>
                        )}
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>© 2025 <Link to="/admin" className="hover:text-white transition-colors cursor-default">Araucária Informa</Link>. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
