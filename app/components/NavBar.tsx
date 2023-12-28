'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiBowlFoodFill } from 'react-icons/pi';
import { FiMenu } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    const linkClass = (href: string) =>
        `block py-2 px-3 rounded md:p-0 ${
            isActive(href)
                ? 'bg-green-700 dark:bg-green-500 md:bg-transparent md:dark:bg-transparent text-stone-100 dark:text-gray-800 md:text-green-700 md:dark:text-green-500'
                : 'bg-transparent text-gray-900 dark:text-stone-100'
        } md:hover:text-green-700 md:dark:hover:text-green-500`;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/recipes', label: 'Recipes' },
        { href: '/recipes/new', label: 'Create Recipe' }
    ];

    return (
        <nav className="text-lg bg-stone-200 dark:bg-gray-900 text-gray-800 dark:text-stone-100 fixed w-full z-20 top-0 start-0 border-b border-stone-100 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/">
                    <PiBowlFoodFill size={50} />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ThemeToggle />
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <FiMenu size={30} />
                    </button>
                </div>
                <div
                    className={`${
                        isMenuOpen ? 'flex' : 'hidden'
                    } items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="w-full flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-stone-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={linkClass(href)}
                                    aria-current={
                                        isActive(href) ? 'page' : undefined
                                    }
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
