
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive 
                ? 'text-white' 
                : 'text-blue-100 hover:text-white'
            }`}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            )}
        </NavLink>
    );
};

const Header: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                ? 'bg-primary-dark/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg py-2' 
                : 'bg-primary-dark dark:bg-background-dark py-4'
            }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <NavLink className="flex items-center gap-2 group" to="/">
                    <div className="bg-white text-primary-dark p-1 rounded-lg">
                        <span className="material-icons-outlined text-2xl">forest</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
                        Araucária<span className="font-light opacity-80">Informa</span>
                    </span>
                </NavLink>

                <div className="hidden md:flex items-center space-x-8 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    <NavItem to="/">Início</NavItem>
                    <NavItem to="/noticias">Notícias</NavItem>
                    <NavItem to="/eventos">Eventos</NavItem>
                    <NavItem to="/comercio">Comércio</NavItem>
                    <NavItem to="/historia">História</NavItem>
                </div>

                <div className="flex items-center space-x-3">
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                        aria-label="Alternar tema"
                    >
                        <span className="material-icons-outlined text-xl">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    
                    <button className="hidden sm:flex p-2 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none">
                        <span className="material-icons-outlined text-xl">search</span>
                    </button>
                    
                    <a className="hidden lg:block bg-white text-primary-dark font-bold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors shadow-md" href="#">
                        Anuncie
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
