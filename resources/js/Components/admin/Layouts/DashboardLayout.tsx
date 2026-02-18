import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Shared/Sidebar';
import ChatBot from '@/Components/Admin/Shared/ChatBot';

interface DashboardLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex font-sans selection:bg-indigo-500/30">
            <Head title={title} />
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Header (Optional, simplified for now as sidebar covers nav) */}
                {/* We can add a top bar here if needed for user profile, etc. */}

                <main className="flex-1 p-4">
                    <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-0 shadow-2xl relative overflow-hidden">
                        {children}
                    </div>
                </main>
            </div>

            <ChatBot />
        </div>
    );
}
