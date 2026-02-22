import React from 'react';
import { motion } from 'framer-motion';

const ProductivityBar = ({ score }: { score: number }) => {
    let color = 'bg-emerald-500';
    if (score < 80) color = 'bg-amber-500';
    if (score < 50) color = 'bg-red-500';

    return (
        <div className="w-full max-w-[120px]">
            <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-500">AI Score</span>
                <span className={`font-bold ${score >= 90 ? 'text-emerald-400' : 'text-gray-300'}`}>{score}/100</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
};

export default ProductivityBar;
