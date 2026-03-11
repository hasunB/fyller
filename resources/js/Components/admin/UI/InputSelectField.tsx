import React, { SelectHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    icon?: LucideIcon;
    error?: string;
    options: (string | { value: string | number; label: string })[];
    addOption?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, icon: Icon, options, error, addOption, ...props }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>
        <div className="flex gap-2 items-center">
            <div className="relative flex-1">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />}
                <select
                    {...props}
                    className="w-full bg-gray-950/50 border border-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                >
                    {options.map((opt) => {
                        const value = typeof opt === 'string' ? opt : opt.value;
                        const label = typeof opt === 'string' ? opt : opt.label;
                        return (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        );
                    })}
                </select>
                {/* Custom Arrow */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            {addOption && (
                <button
                    type="button"
                    className="flex items-center justify-center p-3 bg-gray-950/50 hover:bg-indigo-600 text-gray-300 hover:text-white border border-gray-800 hover:border-indigo-500 rounded-lg transition-colors shrink-0"
                    title={`Add new ${label.replace(' *', '')}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                </button>
            )}
        </div>

        {/* Error Message Display */}
        {error && (
            <p className="text-sm text-red-400 mt-1 ml-1 animate-pulse">
                {error}
            </p>
        )}
    </div>
);

export default SelectField;
