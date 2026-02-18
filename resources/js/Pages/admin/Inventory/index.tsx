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
import StockStatusBadge from '@/Components/Admin/UI/StockStatusBadge';
import AIInsightBadge from '@/Components/Admin/UI/StockAiInsightBadge';
import StockLevelBar from '@/Components/Admin/UI/StockLevelBar';
import AdminPanelHeader from '@/Components/Admin/UI/AdminPanelHeader';

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


export default function InventoryIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title="Inventory Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}
                <AdminPanelHeader 
                    panelName="inventory"
                    title="Inventory Management"
                    description="Real-time sync active. AI is monitoring 8,432 SKUs."
                    descriptionSpanText="8,432"
                    descriptionSpanStyle="font-bold text-indigo-400" 
                    showExportButton={true}
                    AddButtonText="Add Product"
                    ExportButtonText="Export CSV"
                />

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
                                            <StockStatusBadge status={product.status} />
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