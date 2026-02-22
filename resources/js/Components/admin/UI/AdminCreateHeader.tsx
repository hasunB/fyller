import React from 'react';
import { Link } from '@inertiajs/react';
import { LucideIcon, Save } from 'lucide-react';

interface AdminCreateHeaderProps {
    title: string;
    description: string;
    onSave: any;
    processing: boolean;
    errors: any;
    cancelLink: string;
    icon: LucideIcon;
    saveText: string;
}

const AdminCreateHeader = ({ title, description, onSave, processing, errors, cancelLink, icon: Icon, saveText }: AdminCreateHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Icon className="w-6 h-6 text-indigo-500" />
                    {title}
                </h1>
                <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
            <div className="flex gap-3">
                <Link href={cancelLink} className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    Cancel
                </Link>
                <button
                    onClick={onSave}
                    disabled={processing}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium"
                >
                    <Save className="w-4 h-4" />{saveText}
                </button>
            </div>
        </div>
    );
};

export default AdminCreateHeader;