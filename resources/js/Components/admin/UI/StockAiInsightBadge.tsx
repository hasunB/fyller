import React from 'react';
import { TrendingUp, ArrowUpDown, ShoppingCart, BrainCircuit } from 'lucide-react';

interface AIInsightBadgeProps {
    insight: 'High Demand' | 'Slow Mover' | 'Stable' | 'Reorder';
}

const AIInsightBadge = ({ insight }: AIInsightBadgeProps) => {
    if (insight === 'Stable') return <span className="text-gray-500 text-xs">-</span>;

    const config = {
        'High Demand': { icon: TrendingUp, color: 'text-indigo-400', text: 'Demand Spike' },
        'Slow Mover': { icon: ArrowUpDown, color: 'text-orange-400', text: 'Slow Moving' },
        'Reorder': { icon: ShoppingCart, color: 'text-blue-400', text: 'Auto-Order Ready' },
    };

    const Meta = config[insight] || { icon: BrainCircuit, color: 'text-gray-400', text: 'Analyzing' };
    const Icon = Meta.icon;

    return (
        <div className={`flex items-center gap-1.5 text-xs font-medium ${Meta.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {Meta.text}
        </div>
    );
};

export default AIInsightBadge;