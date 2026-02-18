import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    BrainCircuit,
    AlertTriangle,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    BarChart3,
    Smile,
    Meh,
    Frown,
    Sliders,
    Zap,
    RefreshCcw,
    AlertCircle
} from 'lucide-react';
import { ChartAreaInteractive } from '@/Components/Admin/UI/Admin-Charts';
import StatCard from '@/Components/Admin/UI/Admin-StatCard';
// import InsightCard from '@/Components/Admin/UI/Admin-InsightCard';

// --- Components ---

// --- Types ---
type ForecastType = 'Revenue' | 'Inventory' | 'Workforce';

const PredictiveForecaster = () => {
    const [activeTab, setActiveTab] = useState<ForecastType>('Revenue');
    const [marketingSpend, setMarketingSpend] = useState(15); // % increase
    const [seasonality, setSeasonality] = useState(true);
    const [marketTrend, setMarketTrend] = useState('Stable');

    // Mock Calculation for AI Insight
    const projectedGrowth = (marketingSpend * 1.2) + (seasonality ? 10 : 0) + (marketTrend === 'Bullish' ? 5 : 0);

    return (
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[500px]">

            {/* LEFT PANEL: Controls & Configuration */}
            <div className="w-full lg:w-80 bg-gray-900/80 border-r border-gray-800 p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-indigo-500" />
                        Scenario Planner
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Simulate business outcomes using AI.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800">
                    {['Revenue', 'Inventory', 'Workforce'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as ForecastType)}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === tab
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dynamic Controls based on Tab */}
                <div className="space-y-6 flex-1">

                    {/* Control 1: Range Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-gray-300">
                                {activeTab === 'Revenue' ? 'Ad Spend Increase' : activeTab === 'Workforce' ? 'Hiring Rate' : 'Stock Levels'}
                            </span>
                            <span className="text-indigo-400">+{marketingSpend}%</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="50"
                            value={marketingSpend}
                            onChange={(e) => setMarketingSpend(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Control 2: Toggle */}
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-800">
                        <span className="text-xs text-gray-300">
                            {activeTab === 'Revenue' ? 'Include Seasonality' : activeTab === 'Workforce' ? 'Remote Work Impact' : 'Supplier Delays'}
                        </span>
                        <button
                            onClick={() => setSeasonality(!seasonality)}
                            className={`w-10 h-5 rounded-full p-1 transition-colors ${seasonality ? 'bg-indigo-600' : 'bg-gray-700'}`}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full transform transition-transform ${seasonality ? 'translate-x-5' : ''}`} />
                        </button>
                    </div>

                    {/* Control 3: Select */}
                    <div className="space-y-2">
                        <label className="text-xs text-gray-300">Market Condition</label>
                        <select
                            value={marketTrend}
                            onChange={(e) => setMarketTrend(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 text-xs text-white rounded-lg p-2.5 outline-none focus:border-indigo-500"
                        >
                            <option value="Stable">Stable</option>
                            <option value="Bullish">Bullish (High Growth)</option>
                            <option value="Bearish">Bearish (Recession)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> AI Prediction
                    </h4>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                        Increasing {activeTab === 'Revenue' ? 'ad spend' : 'resources'} by <strong>{marketingSpend}%</strong> in a <strong>{marketTrend}</strong> market is projected to yield <strong>{projectedGrowth.toFixed(1)}% growth</strong> in Q4.
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL: Visualization */}
            <div className="flex-1 p-6 relative flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                            {activeTab === 'Revenue' ? 'Revenue Forecast' : activeTab === 'Workforce' ? 'Headcount Velocity' : 'Inventory Demand'}
                        </h3>
                        <p className="text-xs text-gray-500">
                            Solid Line: Baseline • <span className="text-indigo-400 font-bold">Dashed: Simulated Scenario</span>
                        </p>
                    </div>
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                {/* THE CHART */}
                <div className="flex-1 relative w-full h-full min-h-[250px]">
                    {/* Background Grid */}
                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-600 z-0">
                        {[100, 75, 50, 25, 0].map((v) => (
                            <div key={v} className="border-b border-gray-800 w-full h-full relative">
                                <span className="absolute -top-2 left-0">{v}</span>
                            </div>
                        ))}
                    </div>

                    <svg className="absolute inset-0 w-full h-full overflow-visible z-10 pl-6 pt-4">
                        <defs>
                            <linearGradient id="gradSim" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Baseline (Historical) Path - Static */}
                        <path
                            d="M0,200 C100,190 200,150 300,160 C400,170 500,120 600,130"
                            fill="none"
                            stroke="#4b5563"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />

                        {/* SIMULATED PATH - Reacts to State */}
                        {/* We use the state 'marketingSpend' to adjust the Y values of the curve dynamically */}
                        <motion.path
                            animate={{
                                d: `M0,200 C100,190 200,150 300,160 C400,170 500,${120 - marketingSpend * 1.5} 600,${100 - marketingSpend * 2}`
                            }}
                            transition={{ type: "spring", stiffness: 50 }}
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="3"
                        />

                        {/* Filled Area under Simulation */}
                        <motion.path
                            animate={{
                                d: `M0,200 C100,190 200,150 300,160 C400,170 500,${120 - marketingSpend * 1.5} 600,${100 - marketingSpend * 2} V300 H0 Z`
                            }}
                            fill="url(#gradSim)"
                            transition={{ type: "spring", stiffness: 50 }}
                        />

                        {/* End Point Dot */}
                        <motion.circle
                            animate={{ cx: 600, cy: 100 - marketingSpend * 2 }}
                            r="6" fill="#6366f1" stroke="#fff" strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-800">
                        <p className="text-xs text-gray-500 mb-1">Projected {activeTab}</p>
                        <p className="text-lg font-bold text-white flex items-center gap-1">
                            {activeTab === 'Revenue' ? '$2.4M' : activeTab === 'Workforce' ? '124' : '45k Units'}
                            <span className="text-xs text-emerald-400 font-normal">+{projectedGrowth.toFixed(1)}%</span>
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-800">
                        <p className="text-xs text-gray-500 mb-1">Confidence Interval</p>
                        <p className="text-lg font-bold text-white flex items-center gap-1">
                            92% <AlertCircle className="w-3 h-3 text-gray-500" />
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-800">
                        <p className="text-xs text-gray-500 mb-1">Risk Factor</p>
                        <p className={`text-lg font-bold ${marketTrend === 'Bearish' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {marketTrend === 'Bearish' ? 'High' : 'Low'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SentimentBar = ({ label, value, color, icon: Icon }: any) => (
    <div className="flex items-center gap-4">
        <div className="w-8 flex justify-center">
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-bold">{value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-current ${color}`}
                />
            </div>
        </div>
    </div>
);

const ChurnRiskList = () => (
    <div className="space-y-4">
        {[
            { name: "Acme Corp", risk: "High", score: 85, reason: "Reduced usage -40%" },
            { name: "Globex Inc", risk: "Medium", score: 62, reason: "Support ticket spike" },
            { name: "Soylent Corp", risk: "Low", score: 24, reason: "Stable" },
        ].map((client, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-800">
                <div>
                    <p className="text-sm font-bold text-white">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.reason}</p>
                </div>
                <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${client.risk === 'High' ? 'bg-red-500/10 text-red-400' :
                            client.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-emerald-500/10 text-emerald-400'
                        }`}>
                        {client.risk} Risk
                    </span>
                    <p className="text-[10px] text-gray-600 mt-1">Score: {client.score}/100</p>
                </div>
            </div>
        ))}
    </div>
);

// --- Main Page ---
export default function AnalyticsIndex() {
    return (
        <Layout title="AI Analytics">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <BrainCircuit className="w-6 h-6 text-indigo-500" />
                            AI Insights & Analytics
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Deep learning analysis of your entire business ecosystem.
                        </p>
                    </div>
                    <select className="bg-gray-950 border border-gray-800 text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>

                {/* Top KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Predicted Revenue" value="$145.2k" change="+12.5%" trend="up" icon={TrendingUp} color="text-indigo-500" />
                    <StatCard title="Churn Probability" value="4.2%" change="-0.8%" trend="up" icon={Users} color="text-red-500" />
                    <StatCard title="Conversion Rate" value="3.8%" change="+0.5%" trend="up" icon={Target} color="text-emerald-500" />
                    <StatCard title="Anomalies Detected" value="2" change="Critical" trend="down" icon={AlertTriangle} color="text-amber-500" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 1. Revenue Forecast Chart */}
                    <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white">Revenue Forecast (AI Model v4)</h3>
                            <button className="text-xs text-indigo-400 hover:text-indigo-300">View Details</button>
                        </div>
                        {/* <RevenueForecastChart /> */}
                    </div>

                    {/* 2. Customer Sentiment Analysis */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Customer Sentiment</h3>
                            <p className="text-xs text-gray-500 mb-6">AI analysis of 1,240 support tickets & reviews.</p>

                            <div className="space-y-6">
                                <SentimentBar label="Positive" value={68} color="text-emerald-500" icon={Smile} />
                                <SentimentBar label="Neutral" value={24} color="text-gray-400" icon={Meh} />
                                <SentimentBar label="Negative" value={8} color="text-red-500" icon={Frown} />
                            </div>
                        </div>

                        <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                            <p className="text-xs font-bold text-indigo-300 uppercase mb-1">AI Recommendation</p>
                            <p className="text-xs text-indigo-100 leading-relaxed">
                                Negative sentiment is correlated with "Shipping Delays". Recommend switching to Carrier B for West Coast orders.
                            </p>
                        </div>
                    </div>

                    {/* 3. Churn Prediction */}
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">At-Risk Accounts</h3>
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded font-bold">High Priority</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">AI identified these clients showing pre-churn behavior.</p>
                        <ChurnRiskList />
                        <button className="w-full mt-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg transition-colors">
                            View All Risks
                        </button>
                    </div>

                    {/* 4. Inventory Optimization */}
                    <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white">Inventory Optimization</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-xs text-emerald-400">
                                    <ArrowUpRight className="w-3 h-3" /> Efficiency +12%
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "Overstocked", count: "14 SKUs", action: "Run Flash Sale", color: "border-amber-500/30 bg-amber-500/5 text-amber-500" },
                                { title: "Stockout Risk", count: "5 SKUs", action: "Reorder Now", color: "border-red-500/30 bg-red-500/5 text-red-500" },
                                { title: "Dead Stock", count: "8 SKUs", action: "Bundle/Liquidate", color: "border-gray-500/30 bg-gray-500/5 text-gray-400" },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${item.color}`}>
                                    <p className="text-sm font-medium mb-1 opacity-80">{item.title}</p>
                                    <h4 className="text-2xl font-bold mb-3">{item.count}</h4>
                                    <button className="text-xs font-bold underline opacity-80 hover:opacity-100">
                                        {item.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Scenario Planner (Takes full width) */}
                <div className="lg:col-span-3 mb-6">
                    <PredictiveForecaster />
                </div>
            </div>
        </Layout>
    );
}