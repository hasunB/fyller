import React, { TextareaHTMLAttributes } from 'react';
import { Sparkles } from 'lucide-react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, error, ...props }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <button type="button" className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Sparkles className="w-3 h-3" /> Generate with AI
            </button>
        </div>
        <textarea
            {...props}
            className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600 min-h-[120px]"
        />
        {error && (
            <p className="text-sm text-red-400 mt-1 ml-1 animate-pulse">
                {error}
            </p>
        )}
    </div>
);

export default TextAreaField;