import React from 'react';
import { TrendingUp, ArrowUpDown, ShoppingCart, BrainCircuit } from 'lucide-react';

interface AIInsightBadgeProps {
    insight: 'High Demand' | 'Slow Mover' | 'Stable' | 'Reorder' | 'Overstocked';
}

const AIInsightBadge = ({ insight }: AIInsightBadgeProps) => {

    const config = {
        'High Demand': { icon: TrendingUp, color: 'text-indigo-400', text: 'Demand Spike' },
        'Slow Mover': { icon: ArrowUpDown, color: 'text-orange-400', text: 'Slow Moving' },
        'Reorder': { icon: ShoppingCart, color: 'text-blue-400', text: 'Auto-Order Ready' },
        'Stable': { icon: BrainCircuit, color: 'text-green-400', text: 'Stable' },
        'Overstocked': { icon: BrainCircuit, color: 'text-red-400', text: 'Overstocked' },
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