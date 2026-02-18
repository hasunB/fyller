import React from 'react';
import { Download, Plus } from 'lucide-react';

interface AdminPanelHeaderProps {
    panelName: string;
    title: string;
    description: string;
    descriptionSpanText: string;
    descriptionSpanStyle: string;
    showExportButton?: boolean;
    AddButtonText: string;
    ExportButtonText: string;
}

const AdminPanelHeader = ({ 
    panelName, 
    title, 
    description, 
    descriptionSpanText, 
    descriptionSpanStyle, 
    showExportButton, 
    AddButtonText, 
    ExportButtonText 
}: AdminPanelHeaderProps) => {

    // Helper function to process the text
    const renderDescription = () => {
        if (!descriptionSpanText) return description;

        // split with capture group () to keep the delimiter
        // 'gi' = global match, case insensitive
        const parts = description.split(new RegExp(`(${descriptionSpanText})`, 'gi'));

        return parts.map((part, index) => {
            // Check if this part matches the target text (case insensitive)
            if (part.toLowerCase() === descriptionSpanText.toLowerCase()) {
                return (
                    <span 
                        key={index} 
                        className={descriptionSpanStyle} 
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <p className="text-gray-400 text-sm mt-1">
                    {/* Call the helper function here */}
                    {renderDescription()}
                </p>
            </div>
            <div className="flex gap-3">
                {showExportButton && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors text-sm">
                        <Download className="w-4 h-4" /> {ExportButtonText}
                    </button>
                )}
                <a href={`/${panelName}/create`} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                    <Plus className="w-4 h-4" /> {AddButtonText}
                </a>
            </div>
        </div>
    );
};

export default AdminPanelHeader;