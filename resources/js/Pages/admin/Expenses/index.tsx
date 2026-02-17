import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Download, 
    Plus, 
    DollarSign, 
    CreditCard, 
    PieChart, 
    AlertOctagon, 
    ArrowUpRight, 
    ArrowDownRight,
    FileText,
    MoreHorizontal,
    ScanLine,
    CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Expense {
    id: string;
    merchant: string;
    category: 'Infrastructure' | 'Marketing' | 'Operations' | 'Software' | 'Travel';
    amount: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Flagged';
    receipt: boolean;
    aiInsight?: string; // Optional AI note
}

// --- Mock Data ---
const expenses: Expense[] = [
    { id: "EXP-001", merchant: "AWS Cloud Services", category: "Infrastructure", amount: "$2,450.00", date: "Today, 10:00 AM", status: 'Flagged', receipt: true, aiInsight: "Unusual spike (+15% vs avg)" },
    { id: "EXP-002", merchant: "Google Ads", category: "Marketing", amount: "$1,200.00", date: "Yesterday", status: 'Approved', receipt: true },
    { id: "EXP-003", merchant: "Uber Business", category: "Travel", amount: "$45.50", date: "Oct 24, 2025", status: 'Pending', receipt: false },
    { id: "EXP-004", merchant: "Slack Technologies", category: "Software", amount: "$850.00", date: "Oct 22, 2025", status: 'Approved', receipt: true },
    { id: "EXP-005", merchant: "WeWork (Rent)", category: "Operations", amount: "$4,500.00", date: "Oct 01, 2025", status: 'Approved', receipt: true },
];

// --- Components ---

const CategoryBadge = ({ category }: { category: Expense['category'] }) => {
    const styles = {
        'Infrastructure': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Marketing': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        'Operations': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        'Software': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'Travel': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[category]}`}>
            {category}
        </span>
    );
};

const StatusBadge = ({ status, insight }: { status: Expense['status'], insight?: string }) => {
    if (status === 'Flagged') {
        return (
            <div className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertOctagon className="w-3 h-3" /> AI Flagged
                </span>
                {insight && <span className="text-[10px] text-red-300/80 italic">{insight}</span>}
            </div>
        );
    }
    if (status === 'Pending') {
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Review Needed</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Approved</span>;
};

const KPICard = ({ title, value, subtext, icon: Icon, trend }: any) => (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                <Icon className="w-5 h-5" />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {trend === 'up' ? '+12%' : '-5%'}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <p className="text-xs text-gray-500">{title}</p>
            {subtext && <p className="text-[10px] text-gray-600 mt-1">{subtext}</p>}
        </div>
    </div>
);

// --- Main Page ---

export default function ExpensesIndex() {
    return (
        <Layout title="Expense Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Expenses & Audit</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            <span className="text-indigo-400 font-semibold flex items-center gap-1 inline-flex">
                                <ScanLine className="w-3 h-3" /> AI Audit Active:
                            </span> scanning for anomalies and duplicate subscriptions.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors text-sm">
                            <Download className="w-4 h-4" /> Report
                        </button>
                        <a href="/expenses/create" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                            <Plus className="w-4 h-4" /> Add Expense
                        </a>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KPICard 
                        title="Total Spend (Oct)" 
                        value="$42,590" 
                        icon={DollarSign} 
                        trend="up" 
                        subtext="vs $38k Budget Cap" 
                    />
                    <KPICard 
                        title="Software Subscriptions" 
                        value="$8,200" 
                        icon={CreditCard} 
                        trend="down"
                        subtext="3 unused seats detected" 
                    />
                    <KPICard 
                        title="Projected Burn" 
                        value="$55k" 
                        icon={PieChart} 
                        subtext="Based on current velocity"
                    />
                    {/* Anomaly Card */}
                    <div className="bg-gradient-to-br from-red-900/20 to-gray-900 border border-red-500/30 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
                                <AlertOctagon className="w-5 h-5 animate-pulse" />
                            </div>
                            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">Action Required</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-1">2 Flags</h3>
                            <p className="text-xs text-red-300">AI detected unusual patterns.</p>
                            <button className="text-[10px] text-white underline mt-2 hover:text-red-200">View Analysis</button>
                        </div>
                    </div>
                </div>

                {/* Budget Visualization & Recent Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Main Table Section */}
                    <div className="lg:col-span-3 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden flex flex-col">
                        
                        {/* Table Header / Toolbar */}
                        <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row justify-between gap-4 items-center">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                Recent Transactions
                            </h3>
                            <div className="flex gap-2 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Search merchant or category..." 
                                        className="w-full bg-gray-950 border border-gray-800 text-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <button className="px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/50">
                                        <th className="px-6 py-4 font-medium">Merchant</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Status & AI Audit</th>
                                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                                        <th className="px-6 py-4 font-medium text-center">Receipt</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {expenses.map((expense) => (
                                        <motion.tr 
                                            key={expense.id} 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`hover:bg-gray-800/50 transition-colors group ${expense.status === 'Flagged' ? 'bg-red-500/5' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-white">{expense.merchant}</span>
                                                    <span className="text-xs text-gray-500">{expense.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <CategoryBadge category={expense.category} />
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {expense.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={expense.status} insight={expense.aiInsight} />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-white text-right">
                                                {expense.amount}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {expense.receipt ? (
                                                    <CheckCircle2 className="w-4 h-4 text-gray-600 mx-auto" />
                                                ) : (
                                                    <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">Missing</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-800 flex justify-center bg-gray-900/30">
                            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All Expenses</button>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}