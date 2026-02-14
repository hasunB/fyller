import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

// Icons (Using Heroicons SVG strings for simplicity, or install @heroicons/react)
const IconMenu = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const IconInventory = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconChart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>;
const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage(); // To highlight active link

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed">
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <span className="text-xl font-bold tracking-wider text-blue-400">AI INVENTORY</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink href="/dashboard" active={url.startsWith('/dashboard')} icon={<IconDashboard />}>
                        Dashboard
                    </NavLink>
                    <NavLink href="/inventory" active={url.startsWith('/inventory')} icon={<IconInventory />}>
                        Inventory
                    </NavLink>
                    <NavLink href="/forecasts" active={url.startsWith('/forecasts')} icon={<IconChart />}>
                        AI Forecasts
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="text-sm text-slate-400">Logged in as Admin</div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                {/* Top Header */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600 focus:outline-none">
                        <IconMenu />
                    </button>
                    <div className="flex items-center space-x-4">
                        {/* Add User Dropdown or Notifications here later */}
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Helper Component for Navigation Links
function NavLink({ href, active, children, icon }: { href: string; active: boolean; children: React.ReactNode; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
        >
            {icon}
            <span className="font-medium">{children}</span>
        </Link>
    );
}
