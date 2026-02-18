import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, AlertTriangle, Package } from 'lucide-react';

interface InsightCardProps {
    title: string;
    desc: string;
    impact: string;
    type: 'discount' | 'restock' | 'inventory';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, desc, impact, type }) => (
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

export default InsightCard;