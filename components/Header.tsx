
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
    const location = useLocation();

    // Lógica melhorada: Ativo se for a rota exata OU se for uma sub-rota (exceto na home)
    const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 block md:inline-block ${isActive
                    ? 'text-white font-bold bg-white/10 md:bg-transparent rounded-lg md:rounded-none'
                    : 'text-blue-100 hover:text-white hover:bg-white/5 md:hover:bg-transparent rounded-lg md:rounded-none'
                }`}
        >
            {children}
            {isActive && (
                <span className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            )}
        </NavLink>
    );
};

const Header: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fecha o menu mobile ao mudar a orientação da tela
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-primary-dark/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg py-2'
                    : 'bg-primary-dark dark:bg-background-dark py-4'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <NavLink className="flex items-center gap-2 group z-50 relative" to="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2L2,22H22L12,2M12,6L17.5,17H6.5L12,6M12,9.5L14.5,14.5H9.5L12,9.5Z" />
                                <path d="M12 2L6 14H18L12 2Z" fill="currentColor" opacity="0.5" />
                                <path d="M12 22V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                            Araucária<span className="font-light text-blue-200">Informa</span>
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        <NavItem to="/">Início</NavItem>
                        <NavItem to="/noticias">Notícias</NavItem>
                        <NavItem to="/eventos">Eventos</NavItem>
                        <NavItem to="/comercio">Comércio</NavItem>
                        <NavItem to="/historia">História</NavItem>
                    </div>

                    {/* Actions & Mobile Menu Button */}
                    <div className="flex items-center space-x-2 z-50 relative">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                            aria-label="Alternar tema"
                        >
                            <span className="material-icons-outlined text-xl">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <Link
                            to="/contato"
                            className="hidden lg:block bg-white text-primary-dark font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors shadow-md ml-2"
                        >
                            Anuncie
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu principal"
                        >
                            <span className="material-icons text-2xl">
                                {isMobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div
                    className={`md:hidden absolute left-0 right-0 top-full bg-primary-dark dark:bg-background-dark border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 py-4 space-y-2 flex flex-col">
                        <NavItem to="/" onClick={() => setIsMobileMenuOpen(false)}>Início</NavItem>
                        <NavItem to="/noticias" onClick={() => setIsMobileMenuOpen(false)}>Notícias</NavItem>
                        <NavItem to="/eventos" onClick={() => setIsMobileMenuOpen(false)}>Eventos</NavItem>
                        <NavItem to="/comercio" onClick={() => setIsMobileMenuOpen(false)}>Comércio</NavItem>
                        <NavItem to="/historia" onClick={() => setIsMobileMenuOpen(false)}>História</NavItem>

                        <hr className="border-white/10 my-2" />
                        <Link
                            to="/contato"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-center bg-white text-primary-dark font-bold text-sm px-5 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Anuncie seu negócio
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
