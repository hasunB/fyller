import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface Expense {
    status: string;
    insight?: string;
}

export default function StatusBadge({ status, insight }: { status: Expense['status'], insight?: string }) {
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
    const getBadgeStyle = (status: string) => {
        switch (status) {
            case 'Paid':
            case 'Approved':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            case 'Pending':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            case 'Review Needed':
                return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'On Hold':
                return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
            case 'Failed':
            case 'Rejected':
            case 'Overdue':
                return 'bg-red-500/10 text-red-400 border border-red-500/20';
            case 'Refunded':
                return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            case 'Unpaid':
                return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
            case 'Cancelled':
            default:
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
        }
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle(status)}`}>
            {status}
        </span>
    );
};
