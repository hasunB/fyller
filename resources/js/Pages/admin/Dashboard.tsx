import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import {
    TrendingUp,
    AlertTriangle,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    RefreshCw,
    MoreHorizontal,
    BrainCircuit,
    ShoppingBag
} from 'lucide-react';
import { ChartAreaInteractive } from '@/Components/Admin/UI/Admin-Charts';
import StatCard from '@/Components/Admin/UI/Admin-StatCard';
import InsightCard from '@/Components/Admin/UI/Admin-InsightCard';

const ChartData = {
    title: 'Predictive Sales Forecast',
    confidence: 0.92,
    data: [  
        // --- Past Data (Actual Sales) ---
        { date: "2024-06-01", sales: 150, predicted: null },
        { date: "2024-06-02", sales: 180, predicted: null },
        { date: "2024-06-03", sales: 120, predicted: null },
        { date: "2024-06-04", sales: 260, predicted: null },
        { date: "2024-06-05", sales: 290, predicted: null },
        { date: "2024-06-06", sales: 340, predicted: null },
        { date: "2024-06-07", sales: 180, predicted: null },
        { date: "2024-06-08", sales: 320, predicted: null },
        { date: "2024-06-09", sales: 110, predicted: null },
        { date: "2024-06-10", sales: 190, predicted: null },
        { date: "2024-06-11", sales: 350, predicted: null },
        { date: "2024-06-12", sales: 210, predicted: null },
        { date: "2024-06-13", sales: 380, predicted: null },
        { date: "2024-06-14", sales: 220, predicted: null },
        // --- The "Present" Day (Connects both lines) ---
        { date: "2024-06-15", sales: 170, predicted: 170 },
        // --- Future Data (AI Prediction) ---
        { date: "2024-06-16", sales: null, predicted: 190 },
        { date: "2024-06-17", sales: null, predicted: 360 },
        { date: "2024-06-18", sales: null, predicted: 410 },
        { date: "2024-06-19", sales: null, predicted: 180 },
        { date: "2024-06-20", sales: null, predicted: 150 },
        { date: "2024-06-21", sales: null, predicted: 200 },
        { date: "2024-06-22", sales: null, predicted: 170 },
        { date: "2024-06-23", sales: null, predicted: 230 },
        { date: "2024-06-24", sales: null, predicted: 290 },
        { date: "2024-06-25", sales: null, predicted: 250 },
        { date: "2024-06-26", sales: null, predicted: 130 },
        { date: "2024-06-27", sales: null, predicted: 420 },
        { date: "2024-06-28", sales: null, predicted: 180 },
        { date: "2024-06-29", sales: null, predicted: 240 },
        { date: "2024-06-30", sales: null, predicted: 380 },
    ],
}

// --- Main Dashboard Page ---
export default function Dashboard() {
    return (
        <Layout title="Dashboard">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Section 1: Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Financial Overview</h1>
                        <p className="text-gray-400 text-sm">Welcome back, CFO. Here is your AI-driven daily brief.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            System Live • Last Sync: 2m ago
                        </span>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* Section 2: KPI Grid (CFO Dashboard) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Revenue" value="$1.2M" change="+12.5%" trend="up" icon={TrendingUp} color="text-indigo-500" />
                    <StatCard title="Active Inventory" value="8,432" change="-2.1%" trend="down" icon={Package} color="text-blue-500" />
                    <StatCard title="Slow Moving Stock" value="$42k" change="-5.4%" trend="up" icon={AlertTriangle} color="text-amber-500" />
                    <StatCard title="Projected Q3" value="$2.4M" change="+98% Acc" trend="up" icon={BrainCircuit} color="text-purple-500" />
                </div>

                {/* Section 3: Main Layout (Bento Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">

                    {/* Main Chart: Predictive Sales Forecasting */}
                    <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl px-6 flex flex-col">
                        <ChartAreaInteractive data={ChartData} />
                    </div>

                    {/* Side Panel: Actionable Insights */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-indigo-500/50 transition-colors">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            AI Opportunities
                        </h3>
                        <div className="space-y-4">
                            <InsightCard
                                title="Bundle Slow Movers"
                                desc="High inventory of 'Winter Coats'. Bundle with 'Scarves' (High Demand) to clear stock."
                                impact="+$4.2k Rev"
                                type="discount"
                            />
                            <InsightCard
                                title="Restock Alert: Denim"
                                desc="Supplier lead time increased to 14 days. Order now to avoid stockout in 10 days."
                                impact="Prevent Loss"
                                type="restock"
                            />
                            <InsightCard
                                title="Price Optimization"
                                desc="Competitor A increased prices by 10%. Recommend 5% increase on 'Leather Boots'."
                                impact="+3% Margin"
                                type="inventory"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4: Bottom Grid (Safety Stock & Sync) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Smart Safety Stock */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-emerald-500" />
                            Smart Safety Stock Levels
                        </h3>
                        <div className="space-y-5">
                            {[
                                { name: "Electronics", current: 85, safe: 60, volatile: false },
                                { name: "Summer Wear", current: 30, safe: 45, volatile: true },
                                { name: "Home Goods", current: 92, safe: 80, volatile: false },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300 font-medium">{item.name}</span>
                                        <span className={item.current < item.safe ? "text-red-400 font-bold" : "text-gray-500"}>
                                            {item.current} / <span className="text-xs">Safe: {item.safe}</span>
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(item.current / 100) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className={`h-full rounded-full ${item.current < item.safe ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        />
                                        {/* Safety Marker */}
                                        <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-50" style={{ left: `${item.safe}%` }} />
                                    </div>
                                    {item.volatile && (
                                        <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> High volatility detected. Safety stock increased auto-magically.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Real-Time Sync Feed */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 text-blue-500 animate-spin-slow" />
                                Real-Time Sync Stream
                            </h3>
                            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">LIVE</span>
                        </div>
                        <div className="space-y-0">
                            {[
                                { time: '10:42 AM', event: 'POS Sale: Store #4', detail: '-2 items (Nike Air)', source: 'Physical' },
                                { time: '10:41 AM', event: 'Shopify Order #9921', detail: '-1 item (Blue Jeans)', source: 'Web' },
                                { time: '10:38 AM', event: 'Return Processed', detail: '+1 item (Red Tee)', source: 'Mobile App' },
                                { time: '10:35 AM', event: 'Stock Adjustment', detail: '+50 items (Warehouse)', source: 'ERP' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0 group hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                                    <span className="text-xs font-mono text-gray-500 w-16">{log.time}</span>
                                    <div className="w-2 h-2 rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-300 font-medium">{log.event}</p>
                                        <p className="text-xs text-gray-500">{log.detail}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded border border-gray-700 text-gray-400">{log.source}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
