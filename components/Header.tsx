
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`transition-colors ${
                isActive 
                ? 'font-semibold text-white border-b-2 border-white pb-1' 
                : 'text-gray-200 hover:text-white'
            }`}
        >
            {children}
        </NavLink>
    );
};

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <header className="bg-primary text-white shadow-md sticky top-0 z-50 font-display">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink className="text-2xl font-bold" to="/">Araucária Informa</NavLink>
                <div className="hidden md:flex items-center space-x-6">
                    <NavItem to="/">Início</NavItem>
                    <NavItem to="/noticias">Notícias</NavItem>
                    <NavItem to="/eventos">Eventos</NavItem>
                    <NavItem to="/comercio">Comércio</NavItem>
                    <NavItem to="/historia">História</NavItem>
                    <NavItem to="/newsletter">Newsletter</NavItem>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleDarkMode} className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors">
                        <span className="material-icons-outlined">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <button className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors">
                        <span className="material-icons-outlined">search</span>
                    </button>
                    <a className="bg-white text-primary font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition-colors hidden sm:block" href="#">
                        Anuncie Aqui
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
