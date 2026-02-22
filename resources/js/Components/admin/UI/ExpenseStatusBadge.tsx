import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface Expense {
    status: 'Approved' | 'Pending' | 'Flagged';
    insight?: string;
}

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

export default StatusBadge;
