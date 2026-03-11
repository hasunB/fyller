import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: LucideIcon;
    error?: string; // New prop for the error message
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({label, icon: Icon, error, className = '', disabled, ...props}) => {
    return (
        <div className={`space-y-2 ${className} ${disabled ? 'opacity-50' : ''}`}>
            <label className={`text-sm font-medium text-gray-300 ml-1 ${disabled ? 'cursor-not-allowed' : ''}`}>
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${error ? 'text-red-400' : 'text-gray-500'}`} />
                )}

                <input
                    {...props}
                    disabled={disabled}
                    className={`
                        w-full bg-gray-950/50 rounded-lg py-3
                        transition-all placeholder:text-gray-600 focus:outline-none focus:ring-2
                        disabled:cursor-not-allowed
                        ${Icon ? 'pl-10 pr-4' : 'px-4'}
                        ${error
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 text-red-100'
                        : 'border-gray-800 text-white focus:ring-indigo-500/50 focus:border-indigo-500'
                    }
                    `}
                />
            </div>

            {/* Error Message Display */}
            {error && (
                <p className="text-sm text-red-400 mt-1 ml-1 animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
