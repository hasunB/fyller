import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Printer,
    CreditCard,
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
        is_recurring: boolean;
        recurring_rule: {
            frequency: string;
            interval: number;
            start_date: string;
            end_date: string;
            next_run_date: string;
            amount: string;
        };
        expense_transactions: {
            id: string;
            transaction_number: string;
            amount: string;
            transaction_date: string;
            receipt: string | null;
            expense_status: {
                name: string;
            };
        }[];
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
// --- TODO: add sections for predicted next payment
export default function ExpenseShow({ expense }: ExpenseShowProps) {
    const latestTransactionStatus = expense.expense_transactions?.length > 0
        ? [...expense.expense_transactions].sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())[0].expense_status?.name
        : 'Unknown';

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
                                <StatusBadge status={latestTransactionStatus || 'Unknown'} />
                                <CategoryBadge category={expense.category.name} />
                                {expense.is_recurring ? (
                                    <div className="flex justify-center items-center">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </div>
                                ) : null}
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
                        {latestTransactionStatus === 'Flagged' || latestTransactionStatus === 'Pending' ? (
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
                            <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" /> Expense Details</h3>
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

                        {/* 2. Recurring Subscription */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            {expense.is_recurring && (
                                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-gray-400" /> Recurring Subscription
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Calendar className="w-4 h-4" /> Frequency</p>
                                            <p className="text-base font-medium text-white capitalize">{expense.recurring_rule.frequency}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Layers className="w-4 h-4" /> Interval</p>
                                            <p className="text-base font-medium text-white">Every {expense.recurring_rule.interval} {expense.recurring_rule.frequency.replace(/ly$/i, 's')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4" /> Amount</p>
                                            <p className="text-base font-medium text-white">${expense.recurring_rule.amount.toLocaleString()} <span className="text-xs text-gray-500 font-normal">/ {expense.recurring_rule.frequency.replace(/ly$/i, '')}</span></p>
                                        </div>
                                    </div>
                                    {expense.recurring_rule.end_date && (
                                        <div className="mt-6 pt-4 border-t border-gray-800">
                                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                                <AlertOctagon className="w-4 h-4 text-amber-500" />
                                                Subscription ends on {new Date(expense.recurring_rule.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>

                        {/* 3. expense transactions */}
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
                                        {[...expense.expense_transactions]
                                            .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
                                            .map((transaction) => (
                                                <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors group">

                                                    {/* ID Column */}
                                                    <td className="px-6 ps-2 py-4 text-sm font-mono text-gray-400 group-hover:text-indigo-400 transition-colors">
                                                        {transaction.transaction_number}
                                                    </td>

                                                    {/* Date Column */}
                                                    <td className="px-6 py-4 text-sm text-gray-300">
                                                        {transaction.transaction_date}
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
                                                        <StatusBadge status={transaction.expense_status?.name || 'Unknown'} />
                                                    </td>

                                                    {/* Amount Column */}
                                                    <td className="px-6 pe-2 py-4 text-sm font-mono text-white font-bold text-right">
                                                        ${transaction.amount.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: AI Audit & Evidence */}
                    <div className="space-y-6">

                        {/* 3. AI Audit Panel (Crucial for CFO Dashboard) */}
                        {latestTransactionStatus === 'Unpaid' && (
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

                        {/* 4. Next Payment */}
                        {expense.is_recurring && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-900/50 backdrop-blur-md border border-gray-600 rounded-xl p-6 ring-1 ring-gray-600/50 shadow-[0_0_15px_rgba(156,163,175,0.15)] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                            >
                                <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" /> Next Payment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Calendar className="w-4 h-4" /> Date</p>
                                    <p className="text-white font-medium">{new Date(expense.recurring_rule.next_run_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4" /> Amount</p>
                                    <p className="text-white font-bold text-green-400 text-xl">${expense.recurring_rule.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        </motion.div>
                        )}

                        {/* 5. Receipt / Evidence */}
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
                    </div>
                </div>
                <pre>{JSON.stringify(expense, null, 2)}</pre>
            </div>
        </Layout>
    );
}