import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { Search, Filter, DollarSign, CreditCard, PieChart, AlertOctagon, FileText, Eye, CheckCircle2 } from 'lucide-react';
import CategoryBadge from '@/Components/Admin/UI/ExpenseCategoryBadge';
import StatusBadge from '@/Components/Admin/UI/ExpenseStatusBadge';
import KPICard from '@/Components/Admin/UI/ExpenseKPICard';
import AdminPanelHeader from '@/Components/Admin/UI/AdminPanelHeader';
import CursorPagination from '@/Components/Admin/UI/CursorPagination';
import { Link } from '@inertiajs/react';

// --- Types ---
interface Props {
    expenses: {
        data: Expense[];
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
        path: string;
    };
    total_expenses_this_month: number;
    total_software_expenses: number;
    projected_expenses: number;
    AI_flagged_count: number;
}

interface Expense {
    id: string;
    expense_number: string;
    name: string;
    category: {
        name: string;
    };
    amount: string;
    date: string;
    is_recurring: boolean;
    receipt: boolean;
    aiInsight?: string; // Optional AI note
    last_sync: string;
    subtotal_amount: number | string;
    expense_transactions: {
        id: string;
        expense_status: {
            name: string;
        } | null;
    }[];
}

export default function ExpensesIndex({ expenses, total_expenses_this_month, total_software_expenses, projected_expenses, AI_flagged_count }: Props) {
    return (
        <Layout title="Expense Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header */}
                <AdminPanelHeader
                    panelName="expenses"
                    title="Expenses & Audit"
                    description="AI Audit Active: scanning for anomalies and duplicate subscriptions."
                    descriptionSpanText="AI Audit Active:"
                    descriptionSpanStyle="font-bold text-indigo-400"
                    showExportButton={true}
                    AddButtonText="Add Expense"
                    ExportButtonText="Export CSV"
                />

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KPICard
                        title="Total Spend (Oct)"
                        value={`$` + total_expenses_this_month.toLocaleString()}
                        icon={DollarSign}
                        trend="up"
                        subtext="vs $38k Budget Cap"
                    />
                    <KPICard
                        title="Software Subscriptions"
                        value={`$` + total_software_expenses.toLocaleString()}
                        icon={CreditCard}
                        trend="down"
                        subtext="3 unused seats detected"
                    />
                    <KPICard
                        title="Projected Burn"
                        value={`$` + projected_expenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                            <h3 className="text-2xl font-bold text-white mb-1">{AI_flagged_count} Flags</h3>
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
                                        <th className="px-6 py-4 font-medium text-center">Status & AI Audit</th>
                                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                                        <th className="px-6 py-4 font-medium text-right">Recurring</th>
                                        <th className="px-6 py-4 font-medium text-center">Receipt</th>
                                        <th className="px-6 py-4 font-medium text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {expenses.data.map((expense) => (
                                        <motion.tr
                                            key={expense.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`hover:bg-gray-800/50 transition-colors group ${expense.expense_transactions?.[0]?.expense_status?.name === 'Flagged' ? 'bg-red-500/5' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-white">{expense.name}</span>
                                                    <span className="text-xs text-gray-500">{expense.expense_number}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <CategoryBadge category={expense.category.name} />
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {expense.last_sync}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={expense.expense_transactions?.[0]?.expense_status?.name || 'Unknown'} insight={expense.aiInsight} />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-white text-right">
                                                ${expense.subtotal_amount}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {expense.is_recurring ? (
                                                    <div className="flex justify-center items-center">
                                                        <span className="relative flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center items-center">-</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {expense.receipt ? (
                                                    <CheckCircle2 className="w-4 h-4 text-gray-600 mx-auto" />
                                                ) : (
                                                    <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">Missing</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <Link href={`/expenses/${expense.id}`} className="inline-flex items-center justify-center text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <CursorPagination data={expenses} />
                    </div>

                </div>
            </div>
        </Layout>
    );
}