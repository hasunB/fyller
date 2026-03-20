import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

interface PermissionToggleProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    options?: string[]; // Selected options, e.g., ['edit', 'delete']
    availableOptions?: string[]; // Available options to choose from
    onOptionsChange?: (newOptions: string[]) => void; // Added to pass state back to parent
    error?: string;
}

const PermissionToggle = ({ 
    label, 
    checked, 
    onChange, 
    options = [],
    availableOptions = ['edit', 'delete', 'export data'],
    onOptionsChange, 
    error
}: PermissionToggleProps) => {
    
    // Define the available sub-permissions
    const subPermissions = availableOptions;

    // Helper to toggle individual sub-permissions
    const handleSubPermissionToggle = (sub: string) => {
        if (!onOptionsChange) return;

        if (options.includes(sub)) {
            onOptionsChange(options.filter(item => item !== sub));
        } else {
            onOptionsChange([...options, sub]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Main Permission Toggle */}
            <div
                onClick={onChange}
                className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                    ${checked
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-white'
                        : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700'}
                `}
            >
                {checked ? <CheckSquare className="w-5 h-5 text-indigo-400" /> : <Square className="w-5 h-5" />}
                <span className="text-sm font-medium">{label}</span>
            </div>

            {/* Sub-Permissions (Only rendered if parent is checked and options are available) */}
            {checked && onOptionsChange && (
                <div className="ml-6 pl-4 border-l-2 border-gray-800 flex flex-col gap-2 mt-1">
                    {subPermissions.map((sub) => {
                        const isSubChecked = options.includes(sub);
                        return (
                            <div
                                key={sub}
                                onClick={() => handleSubPermissionToggle(sub)}
                                className={`
                                    flex items-center gap-3 p-2 rounded-md border cursor-pointer transition-all
                                    ${isSubChecked
                                        ? 'bg-indigo-500/5 border-indigo-500/20 text-gray-200'
                                        : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'}
                                `}
                            >
                                {isSubChecked ? (
                                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                                ) : (
                                    <Square className="w-4 h-4" />
                                )}
                                <span className="text-xs font-medium capitalize">{sub}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-sm mt-1 ml-1">{error}</div>
            )}
        </div>
    );
};

export default PermissionToggle;