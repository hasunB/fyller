import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import {
    Search,
    Filter,
    Eye,
    ShoppingBag,
    Clock,
    CheckCircle2,
    ArrowUpRight,
} from 'lucide-react';
import AdminPanelHeader from '@/Components/Admin/UI/AdminPanelHeader';
import MiniStat from '@/Components/Admin/UI/AdminMiniStat';
import AiPriorityTag from '@/Components/Admin/UI/AiPriorityTag';
import OrderChannelIcon from '@/Components/Admin/UI/OrderChannelIcon';
import OrderStatusBadge from '@/Components/Admin/UI/OrderStatusBadge';
import CursorPagination from '@/Components/Admin/UI/CursorPagination';

// --- Types ---
interface Props {
    orders: {
        data: Order[];
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
        path: string;
    };
    total_orders: number;
    total_revenue: string;
    return_rate: string;
    total_pending_orders: number;
    total_delivered_orders: number;
    total_failed_orders: number;
}

interface Order {
    id: string;
    channel_type: {
        name: string;
    };
    order_number: string;
    last_sync: string;
    customer: {
        name: string;
        email: string;
    };
    created_at: string;
    payment_status: {
        name: string;
    };
    fulfillment_status: {
        name: string;
    };
    order_items: {
        product: {
            name: string;
        };
        quantity: number;
        price: number;
        total: number;
    }[];
    ai_priority: string; // AI Feature
    total_amount: number | string;
}

// --- Mock Data ---
// const orders: Order[] = [
//     {
//         id: "#ORD-7721",
//         customer: { name: "Alice Freeman", email: "alice@example.com", avatar: "AF" },
//         date: "Just now",
//         channel: 'Web',
//         paymentStatus: 'Paid',
//         fulfillmentStatus: 'Processing',
//         items: 3,
//         total: "$420.50",
//         aiPriority: 'High'
//     },
//     {
//         id: "#ORD-7720",
//         customer: { name: "Mark Taylor", email: "mark.t@gmail.com", avatar: "MT" },
//         date: "15m ago",
//         channel: 'Mobile',
//         paymentStatus: 'Paid',
//         fulfillmentStatus: 'Unfulfilled',
//         items: 1,
//         total: "$85.00",
//         aiPriority: 'Normal'
//     },
//     {
//         id: "#ORD-7719",
//         customer: { name: "Walk-in Guest", email: "-", avatar: "G" },
//         date: "42m ago",
//         channel: 'POS',
//         paymentStatus: 'Paid',
//         fulfillmentStatus: 'Delivered',
//         items: 5,
//         total: "$1,250.00",
//         aiPriority: 'Normal'
//     },
//     {
//         id: "#ORD-7718",
//         customer: { name: "Suspicious User", email: "temp123@guerrillamail.com", avatar: "SU" },
//         date: "1h ago",
//         channel: 'Web',
//         paymentStatus: 'Pending',
//         fulfillmentStatus: 'Unfulfilled',
//         items: 12,
//         total: "$3,400.00",
//         aiPriority: 'Fraud Risk'
//     },
//     {
//         id: "#ORD-7717",
//         customer: { name: "Sarah Connor", email: "sarah@skynet.com", avatar: "SC" },
//         date: "2h ago",
//         channel: 'Web',
//         paymentStatus: 'Failed',
//         fulfillmentStatus: 'Unfulfilled',
//         items: 2,
//         total: "$120.00",
//         aiPriority: 'Normal'
//     },
// ];

export default function OrdersIndex({ orders, total_orders, total_pending_orders, total_revenue, return_rate }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const orderList = orders.data;

    return (
        <Layout title="Orders Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}
                <AdminPanelHeader
                    panelName="orders"
                    title="Orders Management"
                    description="Manage and fulfill customer orders. AI Fraud Detection is Active"
                    descriptionSpanText="Active"
                    descriptionSpanStyle="font-bold text-green-400"
                    showExportButton={true}
                    AddButtonText="Add Order"
                    ExportButtonText="Export CSV"
                />

                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MiniStat title="Today's Orders" value={total_orders.toLocaleString()} icon={ShoppingBag} color="text-indigo-500" />
                    <MiniStat title="Pending Processing" value={total_pending_orders.toLocaleString()} icon={Clock} color="text-amber-500" />
                    <MiniStat title="Returns Rate" value={return_rate} icon={ArrowUpRight} color="text-red-500" />
                    <MiniStat title="Total Revenue" value={total_revenue.toLocaleString()} icon={CheckCircle2} color="text-green-500" />
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

                                {orderList.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <OrderChannelIcon channel={order.channel_type.name} />
                                                <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                                    {order.order_number}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-400">
                                            {order.last_sync}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-200">{order.customer.name}</span>
                                                    <span className="text-xs text-gray-600">{order.customer.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <OrderStatusBadge status={order.payment_status.name} type="payment" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <OrderStatusBadge status={order.fulfillment_status.name} type="fulfillment" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <AiPriorityTag priority={order.ai_priority} />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-white text-right">${order.total_amount}
                                            <span className="text-gray-600 text-xs block">{order.order_items.length} items</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/orders/${order.id}`} className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <CursorPagination data={orders} />
                </motion.div>
            </div>
        </Layout>
    );
}