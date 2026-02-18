import React from 'react';

interface MiniStatProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const MiniStat: React.FC<MiniStatProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gray-800 ${color} bg-opacity-10 text-white`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</p>
            <h4 className="text-xl font-bold text-white">{value}</h4>
        </div>
    </div>
);

export default MiniStat;
