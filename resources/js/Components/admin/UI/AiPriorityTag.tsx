import React from "react";
import { ArrowUpRight, AlertTriangle } from "lucide-react";

interface AiPriorityTagProps {
    priority: string;
}

const AiPriorityTag: React.FC<AiPriorityTagProps> = ({ priority }) => {
    if (priority === 'High') {
        return (
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded border border-indigo-400/20">
                <ArrowUpRight className="w-3 h-3" /> VIP
            </div>
        );
    }
    if (priority === 'Fraud Risk') {
        return (
            <div className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> High Risk
            </div>
        );
    }
    return <span className="text-gray-600 text-xs">-</span>;
}

export default AiPriorityTag;
