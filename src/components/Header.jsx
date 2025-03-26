import React from 'react';
import '../styles/Header.css';

export default function Header({ toggleDarkMode, isDarkMode }) {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <button onClick={toggleDarkMode} className="dark-mode-button">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
}