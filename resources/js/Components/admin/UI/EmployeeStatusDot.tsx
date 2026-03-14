import React from 'react';

interface StatusDotProps {
    status: string;
}

const StatusDot = ({ status }: StatusDotProps) => {
    const color = (() => {
        switch (status) {
            case 'Active':
                return 'bg-emerald-500';
            case 'On Leave':
                return 'bg-amber-500';
            case 'Inactive':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    })();
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
            <span className="text-gray-300 text-sm">{status}</span>
        </div>
    );
};

export default StatusDot;
