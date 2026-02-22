import React from 'react';

const Toggle = ({ label, description, checked, onChange }: any) => (
    <div className="flex items-start justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800/50 hover:border-indigo-500/30 transition-colors cursor-pointer" onClick={() => onChange(!checked)}>
        <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-200">{label}</h4>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-700'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </div>
);

export default Toggle;
