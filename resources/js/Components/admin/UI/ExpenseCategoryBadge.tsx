import React from "react";

interface Expense {
    category: 'Infrastructure' | 'Marketing' | 'Operations' | 'Software' | 'Travel';
}

const CategoryBadge = ({ category }: Expense) => {
    const styles = {
        'Infrastructure': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Marketing': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        'Operations': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        'Software': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'Travel': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[category]}`}>
            {category}
        </span>
    );
};

export default CategoryBadge;
