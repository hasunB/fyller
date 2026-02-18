import React from 'react';

interface StockStatusBadgeProps {
    status: 'In Stock' | 'Low Stock' | 'Critical';
}

const StockStatusBadge = ({ status }: StockStatusBadgeProps) => {
    const styles = {
        'In Stock': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Low Stock': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Critical': 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} flex items-center gap-1 w-fit`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'In Stock' ? 'bg-emerald-400' : status === 'Low Stock' ? 'bg-amber-400' : 'bg-red-400'}`}></div>
            {status}
        </span>
    );
};

export default StockStatusBadge;