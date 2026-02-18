import React from 'react';
import { motion } from 'framer-motion';

interface StockLevelBarProps {
    current: number;
    safety: number;
}

const StockLevelBar = ({ current, safety }: StockLevelBarProps) => {
    const max = Math.max(current, safety * 2); // Dynamic scale
    const percentage = Math.min((current / max) * 100, 100);
    const safetyPos = (safety / max) * 100;
    
    // Determine color based on health relative to safety stock
    let color = 'bg-emerald-500';
    if (current <= safety) color = 'bg-amber-500';
    if (current <= safety * 0.5) color = 'bg-red-500';

    return (
        <div className="w-32">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>{current} units</span>
                <span className="text-gray-600">Safe: {safety}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full relative overflow-visible">
                {/* The Stock Bar */}
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color} relative z-10`}
                />
                
                {/* Safety Stock Marker (The vertical line) */}
                <div 
                    className="absolute top-[-2px] bottom-[-2px] w-0.5 bg-white z-20 shadow-[0_0_4px_rgba(255,255,255,0.8)]" 
                    style={{ left: `${safetyPos}%` }} 
                />
            </div>
        </div>
    );
};

export default StockLevelBar;