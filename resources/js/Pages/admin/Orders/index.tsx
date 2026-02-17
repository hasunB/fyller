import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    Eye,
    Plus,
    MoreHorizontal,
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Smartphone,
    Globe,
    Store,
    AlertTriangle,
    ArrowUpRight,
    Truck
} from 'lucide-react';

// --- Types ---
interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        avatar: string; // Initials or URL
    };
    date: string;
    channel: 'Web' | 'Mobile' | 'POS';
    paymentStatus: 'Paid' | 'Pending' | 'Failed';
    fulfillmentStatus: 'Unfulfilled' | 'Processing' | 'Shipped' | 'Delivered';
    items: number;
    total: string;
    aiPriority: 'High' | 'Normal' | 'Fraud Risk'; // AI Feature
}

// --- Mock Data ---
const orders: Order[] = [
    {
        id: "#ORD-7721",
        customer: { name: "Alice Freeman", email: "alice@example.com", avatar: "AF" },
        date: "Just now",
        channel: 'Web',
        paymentStatus: 'Paid',
        fulfillmentStatus: 'Processing',
        items: 3,
        total: "$420.50",
        aiPriority: 'High'
    },
    {
        id: "#ORD-7720",
        customer: { name: "Mark Taylor", email: "mark.t@gmail.com", avatar: "MT" },
        date: "15m ago",
        channel: 'Mobile',
        paymentStatus: 'Paid',
        fulfillmentStatus: 'Unfulfilled',
        items: 1,
        total: "$85.00",
        aiPriority: 'Normal'
    },
    {
        id: "#ORD-7719",
        customer: { name: "Walk-in Guest", email: "-", avatar: "G" },
        date: "42m ago",
        channel: 'POS',
        paymentStatus: 'Paid',
        fulfillmentStatus: 'Delivered',
        items: 5,
        total: "$1,250.00",
        aiPriority: 'Normal'
    },
    {
        id: "#ORD-7718",
        customer: { name: "Suspicious User", email: "temp123@guerrillamail.com", avatar: "SU" },
        date: "1h ago",
        channel: 'Web',
        paymentStatus: 'Pending',
        fulfillmentStatus: 'Unfulfilled',
        items: 12,
        total: "$3,400.00",
        aiPriority: 'Fraud Risk'
    },
    {
        id: "#ORD-7717",
        customer: { name: "Sarah Connor", email: "sarah@skynet.com", avatar: "SC" },
        date: "2h ago",
        channel: 'Web',
        paymentStatus: 'Failed',
        fulfillmentStatus: 'Unfulfilled',
        items: 2,
        total: "$120.00",
        aiPriority: 'Normal'
    },
];

// --- Components ---

const StatusBadge = ({ status, type }: { status: string, type: 'payment' | 'fulfillment' }) => {
    const styles: any = {
        // Payment Styles
        'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Failed': 'bg-red-500/10 text-red-400 border-red-500/20',

        // Fulfillment Styles
        'Unfulfilled': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        'Processing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Shipped': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'Delivered': 'bg-green-500/10 text-green-400 border-green-500/20',
    };

    const Icons: any = {
        'Paid': CheckCircle2,
        'Pending': Clock,
        'Failed': XCircle,
        'Unfulfilled': AlertTriangle,
        'Processing': Clock,
        'Shipped': Truck,
        'Delivered': CheckCircle2
    };

    const Icon = Icons[status] || Clock;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} flex items-center gap-1.5 w-fit`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    );
};

const ChannelIcon = ({ channel }: { channel: Order['channel'] }) => {
    if (channel === 'Web') return <Globe className="w-4 h-4 text-indigo-400" />;
    if (channel === 'Mobile') return <Smartphone className="w-4 h-4 text-purple-400" />;
    return <Store className="w-4 h-4 text-orange-400" />;
};

const AIPriorityTag = ({ priority }: { priority: Order['aiPriority'] }) => {
    if (priority === 'High') {
        return (
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded border border-indigo-400/20">
                <ArrowUpRight className="w-3 h-3" /> VIP
            </div>
        );
    }
    if (priority === 'Fraud Risk') {
        return (
            <div className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> High Risk
            </div>
        );
    }
    return <span className="text-gray-600 text-xs">-</span>;
};

const MiniStat = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gray-800 ${color} bg-opacity-10 text-white`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</p>
            <h4 className="text-xl font-bold text-white">{value}</h4>
        </div>
    </div>
);

// --- Main Page ---

export default function OrdersIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title="Orders Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Orders</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Manage and fulfill customer orders. AI Fraud Detection is <span className="text-green-400 font-semibold">Active</span>.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors text-sm">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <a href="/orders/create" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                            <Plus className="w-4 h-4" /> Add Order
                        </a>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MiniStat title="Today's Orders" value="142" icon={ShoppingBag} color="text-indigo-500" />
                    <MiniStat title="Pending Processing" value="12" icon={Clock} color="text-amber-500" />
                    <MiniStat title="Returns Rate" value="2.4%" icon={ArrowUpRight} color="text-red-500" />
                    <MiniStat title="Total Revenue" value="$12.4k" icon={CheckCircle2} color="text-green-500" />
                </div>

                {/* Filters & Search */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search orders, customers, or SKUs..."
                            className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                            <Filter className="w-4 h-4" /> Filter Status
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/50">
                                    <th className="px-6 py-4 font-medium">Order</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Customer</th>
                                    <th className="px-6 py-4 font-medium">Payment</th>
                                    <th className="px-6 py-4 font-medium">Fulfillment</th>
                                    <th className="px-6 py-4 font-medium">AI Priority</th>
                                    <th className="px-6 py-4 font-medium text-right">Total</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <ChannelIcon channel={order.channel} />
                                                <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                                    {order.id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-400">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold border border-indigo-500/30">
                                                    {order.customer.avatar}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-200">{order.customer.name}</span>
                                                    <span className="text-xs text-gray-600">{order.customer.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.paymentStatus} type="payment" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.fulfillmentStatus} type="fulfillment" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <AIPriorityTag priority={order.aiPriority} />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-white text-right">
                                            {order.total}
                                            <span className="text-gray-600 text-xs block">{order.items} items</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center bg-gray-900/30">
                        <span className="text-xs text-gray-500">Showing 1-5 of 142 orders</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Previous</button>
                            <button className="px-3 py-1 text-xs text-white bg-indigo-600 rounded shadow-lg shadow-indigo-500/20">1</button>
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Next</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}