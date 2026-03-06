import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Printer,
    MoreHorizontal,
    AlertOctagon,
    FileText,
    CheckCircle2,
    DollarSign,
    Calendar,
    Building,
    Layers,
    RefreshCw,
    ShieldAlert,
    Image as ImageIcon,
    Download
} from 'lucide-react';
import CategoryBadge from '@/Components/Admin/UI/ExpenseCategoryBadge';
import StatusBadge from '@/Components/Admin/UI/ExpenseStatusBadge';

// --- Types ---
interface ExpenseShowProps {
    expense: {
        id: string;
        expense_number: string;
        name: string;
        merchant: {
            name: string;
        };
        category: {
            name: string;
        };
        created_at: string;
        expense_status: {
            name: string;
        };
        is_recurring: boolean;
        receipt_url: string | null;
        subtotal_amount: number;
        tax_amount: number;
        total_amount: number;
        description: string;
        ai_insight: string | null;
        ai_confidence: number | null;
        ai_flags: string[]; // Specific reasons for flagging
        created_by: string;
    };
}

// --- Mock Data (Remove this if passing actual props from Laravel controller) ---
const mockExpense: ExpenseShowProps['expense'] = {
    id: "9a8b7c6d",
    expense_number: "EXP-001",
    name: "AWS Cloud Services - October",
    merchant: { name: "Amazon Web Services" },
    category: { name: "Infrastructure" },
    created_at: "Oct 24, 2026",
    expense_status: { name: "Flagged" },
    is_recurring: true,
    receipt_url: "#",
    subtotal_amount: 2200.00,
    tax_amount: 250.00,
    total_amount: 2450.00,
    description: "Monthly billing for EC2 instances, RDS databases, and S3 storage across US-East-1 and EU-Central-1 regions.",
    ai_insight: "Unusual spike detected. Total amount is 42% higher than the 6-month historical average for this merchant.",
    ai_confidence: 96,
    ai_flags: [
        "Amount anomaly (+42% variance)",
        "New service charge detected: SageMaker"
    ],
    created_by: "System (Auto-Sync)"
};

export default function ExpenseShow({ expense }: ExpenseShowProps) {

    const dummyTransactions = [
        { id: "TRX-8832", amount: "$1,200.00", date: "Oct 24, 2026", receipt: true, status: "Cleared" },
        { id: "TRX-8833", amount: "$45.50", date: "Oct 22, 2026", receipt: false, status: "Pending" },
        { id: "TRX-8834", amount: "$2,450.00", date: "Oct 15, 2026", receipt: true, status: "Flagged" },
    ];

    return (
        <Layout title={expense.expense_number}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/expenses" className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">#{expense.expense_number}</h1>
                                <StatusBadge status={expense.expense_status.name} />
                                <CategoryBadge category={expense.category.name} />
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{expense.merchant.name} • {new Date(expense.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(expense.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors text-sm">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors text-sm">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {expense.expense_status.name === 'Flagged' || expense.expense_status.name === 'Pending' ? (
                            <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-500/20 transition-all text-sm font-medium">
                                Approve Expense
                            </button>
                        ) : (
                            <button className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg shadow-red-500/20 transition-all text-sm font-medium">
                                Mark as Unpaid
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: Expense Details & Breakdown */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Core Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4">Expense Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Building className="w-4 h-4" /> Merchant</p>
                                    <p className="text-base font-medium text-white">{expense.merchant.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><FileText className="w-4 h-4" /> Expense Name</p>
                                    <p className="text-base font-medium text-white">{expense.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Calendar className="w-4 h-4" /> Created Date</p>
                                    <p className="text-base font-medium text-white">{new Date(expense.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Layers className="w-4 h-4" /> Category</p>
                                    <p className="text-base font-medium text-white">{expense.category.name}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="text-sm text-gray-300 leading-relaxed">{expense.description || 'No description'}</p>
                            </div>
                        </motion.div>

                        {/* 2. expense transactions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden p-6"
                        >
                            <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-gray-400" /> Expense Transactions
                            </h3>

                            {/* Table Container */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/30">
                                            <th className="px-6 ps-2 py-4 font-medium">Transaction ID</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium text-center">Receipt</th>
                                            <th className="px-6 py-4 font-medium text-center">Status</th>
                                            <th className="px-6 pe-2 py-4 font-medium text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {dummyTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors group">

                                                {/* ID Column */}
                                                <td className="px-6 ps-2 py-4 text-sm font-mono text-gray-400 group-hover:text-indigo-400 transition-colors">
                                                    {transaction.id}
                                                </td>

                                                {/* Date Column */}
                                                <td className="px-6 py-4 text-sm text-gray-300">
                                                    {transaction.date}
                                                </td>

                                                {/* Receipt Column */}
                                                <td className="px-6 py-4 text-center">
                                                    {transaction.receipt ? (
                                                        <CheckCircle2 className="w-4 h-4 text-gray-600 mx-auto group-hover:text-emerald-500 transition-colors" />
                                                    ) : (
                                                        <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Status Column */}
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${transaction.status === 'Cleared' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        transaction.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                                        }`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>

                                                {/* Amount Column */}
                                                <td className="px-6 pe-2 py-4 text-sm font-mono text-white font-bold text-right">
                                                    {transaction.amount}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* 2. Financial Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-gray-400" /> Financial Breakdown
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-white font-mono">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Tax / VAT</span>
                                    <span className="text-white font-mono">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-800 pt-4 mt-2">
                                    <span className="text-base font-bold text-white">Total Amount</span>
                                    <span className="text-2xl font-bold text-indigo-400 font-mono">$0.00</span>
                                </div>
                            </div>

                            {expense.is_recurring && (
                                <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3 text-blue-400">
                                    <RefreshCw className="w-5 h-5" />
                                    <div>
                                        <p className="text-sm font-bold">Recurring Subscription</p>
                                        <p className="text-xs text-blue-300/80">This expense is marked as a recurring monthly charge.</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: AI Audit & Evidence */}
                    <div className="space-y-6">

                        {/* 3. AI Audit Panel (Crucial for CFO Dashboard) */}
                        {expense.expense_status.name === 'Unpaid' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-red-900/20 to-gray-900 backdrop-blur-md border border-red-500/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                                            <h3 className="text-lg font-bold text-white">AI Audit Alert</h3>
                                        </div>
                                        <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                                            Conf: 86%
                                        </span>
                                    </div>

                                    <p className="text-sm text-red-200/90 leading-relaxed mb-4">
                                        Unusual spike detected. Total amount is 42% higher than the 6-month historical average for this merchant.
                                    </p>

                                    <div className="bg-black/20 rounded-lg p-3 border border-red-500/20 mb-6">
                                        <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Detected Anomalies</p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2 text-xs text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                                Amount anomaly (+42% variance)
                                            </li>
                                            <li className="flex items-start gap-2 text-xs text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                                                New service charge detected: SageMaker
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium border border-gray-700 transition-colors">
                                            Request Info
                                        </button>
                                        <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-500/20 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. Receipt / Evidence */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 flex flex-col h-[300px]"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gray-400" /> Evidence
                                </h3>
                                {expense.receipt_url && (
                                    <button className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                                        <Download className="w-3 h-3" /> Download
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 border-2 border-dashed border-gray-800 rounded-lg flex flex-col items-center justify-center bg-gray-950/50 relative overflow-hidden group">
                                {expense.receipt_url ? (
                                    <>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                                            <button className="px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-lg shadow-xl">
                                                View Full Size
                                            </button>
                                        </div>
                                        {/* Mocking a receipt image - replace with actual img tag if it's an image */}
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-gray-600" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <AlertOctagon className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm text-gray-400">No receipt attached.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* 5. Audit Trail Metadata */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-gray-500">Metadata</h3>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created By</span>
                                    <span className="text-gray-300 font-medium">{expense.created_by}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Internal ID</span>
                                    <span className="text-gray-300 font-mono">{expense.expense_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">AI Scan Status</span>
                                    <span className="text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Completed
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* <pre className="text-xs font-mono">
                    {JSON.stringify(expense, null, 2)}
                </pre> */}
            </div>
        </Layout>
    );
}