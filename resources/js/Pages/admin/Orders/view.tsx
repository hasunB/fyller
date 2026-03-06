import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, MoreHorizontal, Truck, CreditCard, User, MapPin, ShieldAlert, Clock, Package, Mail, Phone } from 'lucide-react';
import OrderChannelIcon from '@/Components/Admin/UI/OrderChannelIcon';
import OrderStatusBadge from '@/Components/Admin/UI/OrderStatusBadge';
import AiPriorityCard from '@/Components/Admin/UI/AiPriorityCard';

interface OrderShowProps {
    order: {
        id: string;
        channel_type: {
            name: string;
        };
        order_number: string;
        last_sync: string;
        customer: {
            name: string;
            email: string;
            phone: string;
            address: string;
            created_at: string;
            orders_count: number;
            lifetime_value: string;
        };
        created_at: string;
        payment_status: {
            name: string;
        };
        fulfillment_status: {
            name: string;
        };
        order_items: {
            id: string;
            product: {
                id: string;
                name: string;
                sku: string;
                image: string;
            } | null;
            quantity: number;
            price: string;
            total: string;
        }[];
        ai_priority: string; // AI Feature
        total_amount: number | string;
        shipping_amount: number;
        tax_amount: number | string;
        subtotal_amount: number | string;
    };
}

// --- Mock Data for a Single Order ---
const Order = {
    timeline: [
        { id: 1, action: "Order Placed", date: "Oct 24, 1:42 PM", desc: "Order received via Web Storefront.", icon: Package, status: "completed" },
        { id: 2, action: "AI Fraud Scan", date: "Oct 24, 1:43 PM", desc: "System flagged transaction as High Risk.", icon: ShieldAlert, status: "alert" },
        { id: 3, action: "Payment Pending", date: "Oct 24, 1:43 PM", desc: "Awaiting manual review before capturing funds.", icon: CreditCard, status: "current" },
        { id: 4, action: "Fulfillment", date: "Pending", desc: "Awaiting payment clearance.", icon: Truck, status: "pending" }
    ]
};

export default function OrderShow({ order }: OrderShowProps) {
    return (
        <Layout title={`${order.order_number}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/orders" className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">#{order.order_number}</h1>
                                <OrderStatusBadge status={order.payment_status.name} type="payment" />
                                <OrderStatusBadge status={order.fulfillment_status.name} type="fulfillment" />
                            </div>
                            <div className="flex items-center gap-1">
                                <p className="text-gray-400 text-sm mt-1 me-3">
                                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(order.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </p>
                                <OrderChannelIcon channel={order.channel_type.name} />
                                <p>{order.channel_type.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors text-sm">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors text-sm">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                            Capture Payment
                        </button>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: Items & Timeline */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Order Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Package className="w-5 h-5 text-gray-400" /> Order Items
                                </h3>
                                <span className="text-sm text-gray-400">{order.order_items.length} items</span>
                            </div>
                            <div className="p-6 space-y-4">
                                {order.order_items?.map((item) => (
                                    <div key={item.product?.id} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                                                {item.product?.image ? (
                                                    <img src={'/storage/' + item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-5 h-5 opacity-40" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.product?.name}</p>
                                                <p className="text-xs text-gray-500">SKU: {item.product?.sku}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-white">
                                                $ {parseFloat(item.price).toFixed(2)} × {item.quantity}
                                            </p>
                                            <p className="text-sm font-bold text-indigo-400">
                                                $ {parseFloat(item.total).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-950/50 border-t border-gray-800">
                                <div className="flex justify-between items-center">
                                    <button className="text-sm text-indigo-400 hover:text-indigo-300">Edit Items</button>
                                    <p className="text-sm text-gray-400">Total Weight: <span className="text-white">0.00 lbs</span></p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Order Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" /> Activity Timeline
                            </h3>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
                                {Order.timeline.map((event, index) => {
                                    const Icon = event.icon;
                                    let colorClass = "bg-gray-800 text-gray-500 border-gray-700";
                                    if (event.status === 'completed') colorClass = "bg-emerald-500/20 text-emerald-500 border-emerald-500/50";
                                    if (event.status === 'alert') colorClass = "bg-red-500/20 text-red-500 border-red-500/50";
                                    if (event.status === 'current') colorClass = "bg-indigo-500/20 text-indigo-500 border-indigo-500/50";

                                    return (
                                        <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 z-10 ${colorClass}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 p-4 rounded-xl border border-gray-800 bg-gray-900/50">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-white text-sm">{event.action}</h4>
                                                    <span className="text-xs text-gray-500">{event.date}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 leading-relaxed">{event.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Customer, AI, Financials */}
                    <div className="space-y-6">


                        {/* 3. AI Risk Analysis Card (Crucial for CFO theme) */}
                        <AiPriorityCard priority={order.ai_priority} reason="" isIgnored={false} isRefunded={order.payment_status.name === 'Refunded'} />

                        {/* 4. Customer Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" /> Customer
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
                                    lk
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{order.customer.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Customer since {new Date(order.customer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail className="w-4 h-4 text-gray-500" /> {order.customer.email}
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Phone className="w-4 h-4 text-gray-500" /> {order.customer.phone}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                                    <p className="text-lg font-bold text-white">{order.customer.orders_count}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Lifetime Value</p>
                                    <p className="text-lg font-bold text-white">{order.customer.lifetime_value}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Shipping & Billing */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" /> Addresses
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Address</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed w-50">
                                        {order.customer.address}<br />
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 6. Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-400" /> Financial Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>$ {order.total_amount}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Shipping</span>
                                    <span>$ {Number(order.shipping_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Tax</span>
                                    <span>$ {Number(order.tax_amount).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-800 my-2 pt-2 flex justify-between text-white text-lg font-bold">
                                    <span>Total</span>
                                    <span>$ {Number(order.subtotal_amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}