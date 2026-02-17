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

// --- Components for the Dashboard ---

// 1. KPI Card Component
//@ts-ignore
const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg bg-gray-800 ${color} bg-opacity-10 text-white`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-gray-400 font-medium text-sm">{title}</span>
            </div>
            <div className="flex items-end gap-3">
                <h3 className="text-3xl font-bold text-white">{value}</h3>
                <span className={`flex items-center text-sm font-medium mb-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {change}
                </span>
            </div>
        </div>
    </motion.div>
);

// 2. Custom Animated Line Chart (Forecast)
const ForecastChart = () => {
    return (
        <div className="h-64 w-full relative mt-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-600">
                {[100, 75, 50, 25, 0].map((val, i) => (
                    <div key={i} className="border-b border-gray-800 w-full h-full last:border-0 relative">
                        <span className="absolute -top-3 left-0">{val}k</span>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pl-8 pt-2">
                <defs>
                    <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Historical Data (Solid Line) */}
                <motion.path
                    d="M0,150 C50,140 100,100 150,110 C200,120 250,80 300,90 C350,100 400,60 450,70"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                />

                {/* AI Prediction (Glowing Gradient Line) */}
                <motion.path
                    d="M450,70 C500,60 550,20 600,30 C650,40 700,10 800,5"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    filter="url(#glow)"
                />

                {/* Area Fill under prediction */}
                <motion.path
                    d="M450,70 C500,60 550,20 600,30 C650,40 700,10 800,5 V200 H450 Z"
                    fill="url(#gradientArea)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />

                {/* Floating Tooltip Point */}
                <motion.circle
                    cx="600" cy="30" r="4" fill="#fff"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </svg>

            {/* Legend */}
            <div className="absolute top-0 right-0 flex gap-4 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-3 h-0.5 bg-gray-400 border-dashed border-t border-gray-400"></div> Historical
                </div>
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div> AI Forecast
                </div>
            </div>
        </div>
    );
};

// 3. Actionable Insights Component
//@ts-ignore
const AIInsightCard = ({ title, desc, impact, type }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-800 mb-3">
        <div className={`mt-1 p-2 rounded-full ${type === 'discount' ? 'bg-amber-500/10 text-amber-500' :
            type === 'restock' ? 'bg-red-500/10 text-red-500' :
                'bg-indigo-500/10 text-indigo-500'
            }`}>
            {type === 'discount' ? <Zap className="w-4 h-4" /> :
                type === 'restock' ? <AlertTriangle className="w-4 h-4" /> :
                    <Package className="w-4 h-4" />}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-gray-200">{title}</h4>
                <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded">{impact}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
            <button className="mt-3 text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Apply Recommendation <ArrowUpRight className="w-3 h-3" />
            </button>
        </div>
    </div>
);

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
                    <StatCard
                        title="Total Revenue"
                        value="$1.2M"
                        change="+12.5%"
                        trend="up"
                        icon={TrendingUp}
                        color="text-indigo-500"
                    />
                    <StatCard
                        title="Active Inventory"
                        value="8,432"
                        change="-2.1%"
                        trend="down"
                        icon={Package}
                        color="text-blue-500"
                    />
                    <StatCard
                        title="Slow Moving Stock"
                        value="$42k"
                        change="-5.4%"
                        trend="up" // Good that it's going down (logic handled by color usually, simplified here)
                        icon={AlertTriangle}
                        color="text-amber-500"
                    />
                    <StatCard
                        title="Projected Q3"
                        value="$2.4M"
                        change="+98% Acc"
                        trend="up"
                        icon={BrainCircuit}
                        color="text-purple-500"
                    />
                </div>

                {/* Section 3: Main Layout (Bento Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">

                    {/* Main Chart: Predictive Sales Forecasting */}
                    <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <BrainCircuit className="w-5 h-5 text-indigo-500" />
                                    Predictive Sales Forecast
                                </h3>
                                <p className="text-sm text-gray-500">AI model confidence: <span className="text-green-400 font-mono">98.4%</span></p>
                            </div>
                            <select className="bg-gray-950 border border-gray-800 text-gray-300 text-sm rounded-lg px-3 py-1 outline-none focus:border-indigo-500">
                                <option>Next 30 Days</option>
                                <option>Next Quarter</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <ForecastChart />
                        </div>
                    </div>

                    {/* Side Panel: Actionable Insights */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 overflow-y-auto custom-scrollbar">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            AI Opportunities
                        </h3>
                        <div className="space-y-4">
                            <AIInsightCard
                                title="Bundle Slow Movers"
                                desc="High inventory of 'Winter Coats'. Bundle with 'Scarves' (High Demand) to clear stock."
                                impact="+$4.2k Rev"
                                type="discount"
                            />
                            <AIInsightCard
                                title="Restock Alert: Denim"
                                desc="Supplier lead time increased to 14 days. Order now to avoid stockout in 10 days."
                                impact="Prevent Loss"
                                type="restock"
                            />
                            <AIInsightCard
                                title="Price Optimization"
                                desc="Competitor A increased prices by 10%. Recommend 5% increase on 'Leather Boots'."
                                impact="+3% Margin"
                                type="price"
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
