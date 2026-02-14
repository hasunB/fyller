import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">

                {/* Brand / Logo */}
                <div className="flex items-center mb-4 md:mb-0">
                    <BrainCircuit className="h-6 w-6 text-indigo-500" />
                    <span className="ml-2 text-lg font-bold text-gray-300 tracking-tight">
                        Fyller
                    </span>
                </div>

                {/* Copyright / Links */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} Fyller AI. All rights reserved.
                    </div>

                    <div className="flex gap-4 text-sm text-gray-500">
                        <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
