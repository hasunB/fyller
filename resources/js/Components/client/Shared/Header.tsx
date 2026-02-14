import React, { useState } from 'react';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navLinks = [
        { name: 'Features', href: '/#features' },
        { name: 'How it Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/#pricing' },
    ];

    return (
        <nav className="fixed w-full z-40">
            <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-5 pt-1">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <BrainCircuit className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
                        <span className="ml-2 text-xl font-bold text-white tracking-tight">
                            Fyller
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 items-center">
                        {navLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors font-medium text-lg"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:block space-x-2">
                        <a href="login" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-500 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5 border border-indigo-500/50">
                            Sign In
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:flex md:items-center md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-800">
                            <button className="w-full bg-indigo-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-indigo-500 transition-all">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
