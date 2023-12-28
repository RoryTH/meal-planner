'use client';

import React, { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') setDarkMode(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div
            className="relative w-20 h-10 flex items-center cursor-pointer rounded-full p-1 bg-stone-400 dark:bg-black "
            onClick={() => setDarkMode(!darkMode)}
        >
            <FaMoon className="text-stone-100" size={25} />
            <div
                className="absolute bg-stone-100 dark:bg-gray-900 w-8 h-8 rounded-full shadow-md transform transition-transform duration-300"
                style={darkMode ? { left: '2px' } : { right: '2px' }}
            ></div>
            <BsSunFill className="ml-auto text-stone-100" size={25} />
        </div>
    );
};

export default ThemeToggle;
