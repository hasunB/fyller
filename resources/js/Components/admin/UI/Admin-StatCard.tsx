import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg bg-gray-800 ${color} bg-opacity-10 text-white`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-gray-400 font-medium text-sm">{title}</span>
            </div>
            <div className="flex items-end gap-3">
                <h3 className="text-3xl font-bold text-white">{value}</h3>
                <span className={`flex items-center text-sm font-medium mb-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {change}
                </span>
            </div>
        </div>
    </motion.div>
);

export default StatCard;