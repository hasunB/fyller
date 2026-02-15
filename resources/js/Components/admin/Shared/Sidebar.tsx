
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    BarChart3,
    BaggageClaim,
    LogOut,
    Wallet
} from 'lucide-react';

const Sidebar = () => {
    const { url } = usePage();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Inventory', href: '/inventory', icon: ShoppingBag },
        { name: 'Orders', href: '/orders', icon: BaggageClaim },
        { name: 'Expenses', href: '/expenses', icon: Wallet },
        { name: 'Users', href: '/users', icon: Users },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 pt-3 h-screen w-64 bg-gray-950 text-gray-100 transition-transform">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">F</div>
                    <span>Fyller</span>
                </Link>
            </div>

            <div className="flex flex-col justify-between h-[calc(100vh-4rem)] px-3 py-4">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-gray-800 pt-3 mb-2">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
