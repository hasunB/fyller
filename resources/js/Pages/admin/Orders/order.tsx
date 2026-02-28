import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, MoreHorizontal, Truck, CreditCard, User, MapPin, ShieldAlert, Clock, Package, Mail, Phone } from 'lucide-react';
import OrderChannelIcon from '@/Components/Admin/UI/OrderChannelIcon';
import OrderStatusBadge from '@/Components/Admin/UI/OrderStatusBadge';
import AiPriorityCard from '@/Components/Admin/UI/AiPriorityCard';

// --- Mock Data for a Single Order ---
const order = {
    id: "#ORD-7718",
    date: "Oct 24, 2026 at 1:42 PM",
    channel: 'Web',
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Unfulfilled',
    aiPriority: 'Fraud Risk',
    customer: {
        name: "Suspicious User",
        email: "temp123@guerrillamail.com",
        phone: "+1 (555) 019-2831",
        avatar: "SU",
        ordersCount: 1,
        lifetimeValue: "$0.00",
        accountCreated: "Today"
    },
    shippingAddress: {
        line1: "123 Fraudulent Way",
        city: "Miami",
        state: "FL",
        zip: "33101",
        country: "United States"
    },
    items: [
        { id: 1, name: "4K Ultra-Wide Monitor", sku: "SCR-221", price: 599.00, quantity: 4, total: 2396.00, image: "🖥️" },
        { id: 2, name: "Neural Noise-Cancelling Headphones", sku: "AUD-001", price: 299.00, quantity: 2, total: 598.00, image: "🎧" },
        { id: 3, name: "Mechanical Keyboard", sku: "KEY-004", price: 120.00, quantity: 3, total: 360.00, image: "⌨️" }
    ],
    financials: {
        subtotal: 3354.00,
        tax: 0.00,
        shipping: 46.00,
        total: 3400.00
    },
    timeline: [
        { id: 1, action: "Order Placed", date: "Oct 24, 1:42 PM", desc: "Order received via Web Storefront.", icon: Package, status: "completed" },
        { id: 2, action: "AI Fraud Scan", date: "Oct 24, 1:43 PM", desc: "System flagged transaction as High Risk.", icon: ShieldAlert, status: "alert" },
        { id: 3, action: "Payment Pending", date: "Oct 24, 1:43 PM", desc: "Awaiting manual review before capturing funds.", icon: CreditCard, status: "current" },
        { id: 4, action: "Fulfillment", date: "Pending", desc: "Awaiting payment clearance.", icon: Truck, status: "pending" }
    ]
};

export default function OrderShow() {
    return (
        <Layout title={`Order ${order.id}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/orders" className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{order.id}</h1>
                                <OrderStatusBadge status={order.paymentStatus} type="payment" />
                                <OrderStatusBadge status={order.fulfillmentStatus} type="fulfillment" />
                            </div>
                            <div className="flex items-center gap-1">
                                <p className="text-gray-400 text-sm mt-1 me-3">{order.date}</p>
                                <OrderChannelIcon channel={order.channel} />
                                <p>{order.channel}</p>
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
                                <span className="text-sm text-gray-400">{order.items.length} items</span>
                            </div>
                            <div className="p-6 space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                                                {item.image}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.name}</p>
                                                <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-white">${item.price.toFixed(2)} × {item.quantity}</p>
                                            <p className="text-sm font-bold text-indigo-400">${item.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-950/50 border-t border-gray-800">
                                <div className="flex justify-between items-center">
                                    <button className="text-sm text-indigo-400 hover:text-indigo-300">Edit Items</button>
                                    <p className="text-sm text-gray-400">Total Weight: <span className="text-white">24.5 lbs</span></p>
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
                                {order.timeline.map((event, index) => {
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
                        <AiPriorityCard priority={order.aiPriority} reason="" />

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
                                    {order.customer.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{order.customer.name}</p>
                                    <p className="text-xs text-gray-500">Customer since {order.customer.accountCreated}</p>
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
                                    <p className="text-lg font-bold text-white">{order.customer.ordersCount}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Lifetime Value</p>
                                    <p className="text-lg font-bold text-white">{order.customer.lifetimeValue}</p>
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
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {order.shippingAddress.line1}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Billing Address</h4>
                                    <p className="text-sm text-gray-400 italic">Same as shipping address</p>
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
                                    <span>${order.financials.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Shipping</span>
                                    <span>${order.financials.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Tax</span>
                                    <span>${order.financials.tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-800 my-2 pt-2 flex justify-between text-white text-lg font-bold">
                                    <span>Total</span>
                                    <span>${order.financials.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}