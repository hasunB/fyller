import React from "react";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface AiPriorityCardProps {
    priority: string;
    reason: string;
    isIgnored: boolean;
    isRefunded: boolean;
}

export default function AiPriorityCard({ priority, reason, isIgnored, isRefunded }: AiPriorityCardProps) {
    if (isIgnored) return null;

    const priorityColors: Record<string, string> = {
        'Fraud Risk': 'from-red-900/20 to-gray-900 backdrop-blur-md border border-red-500/30',
        'High': 'from-indigo-900/20 to-gray-900 backdrop-blur-md border border-indigo-500/30',
    }

    const priorityConfig: Record<string, { title: string, iconColor: string, textColor: string, shadowColor: string, dotColor: string }> = {
        'Fraud Risk': {
            title: 'AI Fraud Alert',
            iconColor: 'text-red-500',
            textColor: 'text-red-200/80',
            shadowColor: 'bg-red-500/10',
            dotColor: 'bg-red-500',
        },
        'High': {
            title: 'High Value Order',
            iconColor: 'text-indigo-500',
            textColor: 'text-indigo-200/80',
            shadowColor: 'bg-indigo-500/10',
            dotColor: 'bg-indigo-500',
        }
    }

    const config = priorityConfig[priority] || priorityConfig['Fraud Risk'];
    const Icon = priority === 'Fraud Risk' ? ShieldAlert : AlertTriangle;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${priorityColors[priority] || priorityColors['Fraud Risk']} rounded-xl p-6 relative overflow-hidden`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${config.shadowColor} blur-[50px] rounded-full pointer-events-none`}></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Icon className={`w-5 h-5 ${config.iconColor} animate-pulse`} />
                    <h3 className="text-lg font-bold text-white">{config.title}</h3>
                </div>
                <ul className={`space-y-2 text-sm ${config.textColor} mb-6`}>
                    {reason ? reason.split('\n').map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor} mt-1.5 shrink-0`} />
                            {r}
                        </li>
                    )) : (
                        <li className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor} mt-1.5 shrink-0`} />
                            No specific reason provided.
                        </li>
                    )}
                </ul>
                <div className="flex gap-2">
                    {!isRefunded && (
                        <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                            Cancel & Refund
                        </button>
                    )}
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-bold border border-gray-700 transition-colors">
                        Ignore Flag
                    </button>
                </div>
            </div>
        </motion.div>
    )
}