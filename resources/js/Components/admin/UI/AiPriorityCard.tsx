import React from "react";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface AiPriorityCardProps {
    priority: string;
    reason: string;
}

export default function AiPriorityCard({ priority, reason }: AiPriorityCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-900/20 to-gray-900 backdrop-blur-md border border-red-500/30 rounded-xl p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                    <h3 className="text-lg font-bold text-white">AI Fraud Alert</h3>
                </div>
                <ul className="space-y-2 text-sm text-red-200/80 mb-6">
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        Email address is from a known disposable domain provider.
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        High-value multi-quantity order from a first-time user.
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        Billing IP address (Russia) does not match Shipping Address (Florida).
                    </li>
                </ul>
                <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                        Cancel & Refund
                    </button>
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-bold border border-gray-700 transition-colors">
                        Ignore Flag
                    </button>
                </div>
            </div>
        </motion.div>
    )
}