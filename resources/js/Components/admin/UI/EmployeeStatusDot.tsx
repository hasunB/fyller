import React from 'react';

interface StatusDotProps {
    status: 'Active' | 'On Leave' | 'Inactive';
}

const StatusDot = ({ status }: StatusDotProps) => {
    const color = status === 'Active' ? 'bg-emerald-500' : status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-500';
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
            <span className="text-gray-300 text-sm">{status}</span>
        </div>
    );
};

export default StatusDot;
