import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/client/Shared/Header';
import Footer from '@/Components/client/Shared/Footer';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col selection:bg-indigo-500/30">
            <Head title={title} />

            <Header />

            {/* Main content area */}
            <main className="flex-grow pt-16">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
