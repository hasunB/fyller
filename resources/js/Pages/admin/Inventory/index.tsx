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
    CheckCircle2,
    Package
} from 'lucide-react';
import StockStatusBadge from '@/Components/Admin/UI/StockStatusBadge';
import AIInsightBadge from '@/Components/Admin/UI/StockAiInsightBadge';
import StockLevelBar from '@/Components/Admin/UI/StockLevelBar';
import AdminPanelHeader from '@/Components/Admin/UI/AdminPanelHeader';

interface Props {
    products: {
        data: Product[];
        next_page_url: string | null;
        prev_page_url: string | null;
    };
}

// --- Types ---
interface Product {
    id: number;
    name: string;
    sku: string;
    category: {
        id: number;
        name: string;
    } | null;
    stock: number;
    safety_stock: number;
    price: string;
    status: 'In Stock' | 'Low Stock' | 'Critical';
    ai_insight: 'High Demand' | 'Slow Mover' | 'Stable' | 'Reorder';
    last_sync: string;
    image: string | null;
}

export default function InventoryIndex({ products }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const productList = products.data;

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
                                {productList.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 overflow-hidden">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="w-5 h-5 opacity-40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{product.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {product.sku} • {product.category?.name || 'Uncategorized'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StockStatusBadge status={product.status} />
                                            <p className="text-[10px] text-gray-600 mt-1">Updated {product.last_sync}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StockLevelBar current={product.stock} safety={product.safety_stock} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <AIInsightBadge insight={product.ai_insight} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                                            ${parseFloat(product.price).toFixed(2)}
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
                        <span className="text-xs text-gray-500">
                            Showing products {productList.length > 0 ? '1' : '0'} to {productList.length}
                        </span>
                        <div className="flex gap-2">
                            {products.prev_page_url && (
                                <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Previous</button>
                            )}
                            {products.next_page_url && (
                                <button className="px-3 py-1 text-xs text-gray-400 bg-gray-950 border border-gray-800 rounded hover:border-gray-700">Next</button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}