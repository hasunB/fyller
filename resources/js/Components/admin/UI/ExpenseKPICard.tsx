import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string;
    subtext?: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: 'up' | 'down';
}

const KPICard = ({ title, value, subtext, icon: Icon, trend }: KPICardProps) => (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                <Icon className="w-5 h-5" />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {trend === 'up' ? '+12%' : '-5%'}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <p className="text-xs text-gray-500">{title}</p>
            {subtext && <p className="text-[10px] text-gray-600 mt-1">{subtext}</p>}
        </div>
    </div>
);

export default KPICard;
