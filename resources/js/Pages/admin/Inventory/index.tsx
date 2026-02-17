import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Download, 
    Plus, 
    MoreHorizontal, 
    AlertTriangle, 
    TrendingUp, 
    BrainCircuit, 
    ShoppingCart,
    ArrowUpDown,
    CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    safetyStock: number;
    price: string;
    status: 'In Stock' | 'Low Stock' | 'Critical';
    aiInsight: 'High Demand' | 'Slow Mover' | 'Stable' | 'Reorder';
    lastSync: string;
}

// --- Mock Data ---
const products: Product[] = [
    { id: 1, name: "Neural Noise-Cancelling Headphones", sku: "AUD-001", category: "Electronics", stock: 124, safetyStock: 40, price: "$299.00", status: 'In Stock', aiInsight: 'High Demand', lastSync: "2m ago" },
    { id: 2, name: "Ergo-Lift Smart Desk", sku: "FUR-882", category: "Furniture", stock: 12, safetyStock: 15, price: "$850.00", status: 'Low Stock', aiInsight: 'Reorder', lastSync: "10m ago" },
    { id: 3, name: "Quantum Speed Processor", sku: "CMP-992", category: "Components", stock: 5, safetyStock: 20, price: "$450.00", status: 'Critical', aiInsight: 'Reorder', lastSync: "1m ago" },
    { id: 4, name: "Vintage Leather Satchel", sku: "ACC-331", category: "Accessories", stock: 85, safetyStock: 30, price: "$120.00", status: 'In Stock', aiInsight: 'Slow Mover', lastSync: "5m ago" },
    { id: 5, name: "4K Ultra-Wide Monitor", sku: "SCR-221", category: "Electronics", stock: 45, safetyStock: 25, price: "$599.00", status: 'In Stock', aiInsight: 'Stable', lastSync: "Syncing..." },
];

// --- Components ---

const StockLevelBar = ({ current, safety }: { current: number, safety: number }) => {
    const max = Math.max(current, safety * 2); // Dynamic scale
    const percentage = Math.min((current / max) * 100, 100);
    const safetyPos = (safety / max) * 100;
    
    // Determine color based on health relative to safety stock
    let color = 'bg-emerald-500';
    if (current <= safety) color = 'bg-amber-500';
    if (current <= safety * 0.5) color = 'bg-red-500';

    return (
        <div className="w-32">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>{current} units</span>
                <span className="text-gray-600">Safe: {safety}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full relative overflow-visible">
                {/* The Stock Bar */}
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color} relative z-10`}
                />
                
                {/* Safety Stock Marker (The vertical line) */}
                <div 
                    className="absolute top-[-2px] bottom-[-2px] w-0.5 bg-white z-20 shadow-[0_0_4px_rgba(255,255,255,0.8)]" 
                    style={{ left: `${safetyPos}%` }} 
                />
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: Product['status'] }) => {
    const styles = {
        'In Stock': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Low Stock': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Critical': 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} flex items-center gap-1 w-fit`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'In Stock' ? 'bg-emerald-400' : status === 'Low Stock' ? 'bg-amber-400' : 'bg-red-400'}`}></div>
            {status}
        </span>
    );
};

const AIInsightBadge = ({ insight }: { insight: Product['aiInsight'] }) => {
    if (insight === 'Stable') return <span className="text-gray-500 text-xs">-</span>;

    const config = {
        'High Demand': { icon: TrendingUp, color: 'text-indigo-400', text: 'Demand Spike' },
        'Slow Mover': { icon: ArrowUpDown, color: 'text-orange-400', text: 'Slow Moving' },
        'Reorder': { icon: ShoppingCart, color: 'text-blue-400', text: 'Auto-Order Ready' },
    };

    const Meta = config[insight] || { icon: BrainCircuit, color: 'text-gray-400', text: 'Analyzing' };
    const Icon = Meta.icon;

    return (
        <div className={`flex items-center gap-1.5 text-xs font-medium ${Meta.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {Meta.text}
        </div>
    );
};

export default function InventoryIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title="Inventory Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Real-time sync active. AI is monitoring <span className="text-indigo-400 font-semibold">8,432</span> SKUs.
                        </p>
                    </div>
                    <div className="flex gap-3">
                         <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors text-sm">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <a href="/inventory/create" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                            <Plus className="w-4 h-4" /> Add Product
                        </a>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search by SKU, Name, or Category..." 
                            className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                            Category: All
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/50">
                                    <th className="px-6 py-4 font-medium">Product Details</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Stock Levels (Smart)</th>
                                    <th className="px-6 py-4 font-medium">AI Insight</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600">
                                                    {/* Placeholder for Product Image */}
                                                    <div className="w-6 h-6 bg-gray-700 rounded-sm"></div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.sku} • {product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={product.status} />
                                            <p className="text-[10px] text-gray-600 mt-1">Updated {product.lastSync}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StockLevelBar current={product.stock} safety={product.safetyStock} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <AIInsightBadge insight={product.aiInsight} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination / Footer */}
                    <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center bg-gray-900/30">
                        <span className="text-xs text-gray-500">Showing 1-5 of 8,432 items</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Previous</button>
                            <button className="px-3 py-1 text-xs text-white bg-indigo-600 rounded shadow-lg shadow-indigo-500/20">1</button>
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">2</button>
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Next</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}