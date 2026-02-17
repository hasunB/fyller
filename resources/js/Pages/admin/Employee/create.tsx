import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Save, 
    User, 
    Mail, 
    Briefcase, 
    Shield, 
    Lock, 
    Sparkles, 
    CheckSquare, 
    Square,
    AlertCircle
} from 'lucide-react';
import InputField from '@/Components/Admin/UI/Form-InputField';

// --- Helper Components ---

const SelectField = ({ label, icon: Icon, options, ...props }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />}
            <select 
                {...props}
                className="w-full bg-gray-950/50 border border-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    </div>
);

const PermissionToggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
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
);

// --- Main Component ---

export default function CreateEmployee() {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        role: 'Analyst',
        department: 'Operations',
        job_title: '',
        permissions: {
            view_dashboard: true,
            manage_users: false,
            edit_inventory: false,
            view_financials: false,
            approve_expenses: false,
            export_data: false
        }
    });

    const [isGenerating, setIsGenerating] = useState(false);

    // Mock AI Logic
    const generatePermissions = () => {
        if (!data.job_title) return;
        setIsGenerating(true);
        
        // Simulate AI Thinking
        setTimeout(() => {
            setIsGenerating(false);
            
            // Logic based on keywords
            const title = data.job_title.toLowerCase();
            let newPerms = { ...data.permissions };

            if (title.includes('manager') || title.includes('lead')) {
                newPerms = { view_dashboard: true, manage_users: true, edit_inventory: true, view_financials: true, approve_expenses: true, export_data: true };
            } else if (title.includes('sales')) {
                newPerms = { ...newPerms, edit_inventory: true, view_dashboard: true };
            } else if (title.includes('finance') || title.includes('accountant')) {
                newPerms = { ...newPerms, view_financials: true, approve_expenses: true, export_data: true };
            }

            setData('permissions', newPerms);
        }, 1500);
    };

    const togglePermission = (key: keyof typeof data.permissions) => {
        setData('permissions', { ...data.permissions, [key]: !data.permissions[key] });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // post('/employees');
        console.log("Creating Employee:", data);
    };

    return (
        <Layout title="Add Employee">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <User className="w-6 h-6 text-indigo-500" />
                            Add Team Member
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Create account and configure access policies.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/employees" className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Cancel
                        </Link>
                        <button 
                            onClick={submit}
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium"
                        >
                            <Save className="w-4 h-4" /> Create Account
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Personal Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Profile Details</h3>
                            
                            <InputField 
                                label="Full Name"
                                placeholder="e.g. Sarah Connor"
                                icon={User}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />

                            <InputField 
                                label="Work Email"
                                type="email"
                                placeholder="name@fyller.ai"
                                icon={Mail}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField 
                                    label="Role"
                                    icon={Briefcase}
                                    options={['Admin', 'Manager', 'Analyst', 'Sales', 'Viewer']}
                                    value={data.role}
                                    onChange={(e: any) => setData('role', e.target.value)}
                                />
                                <SelectField 
                                    label="Department"
                                    icon={Briefcase}
                                    options={['Executive', 'Sales', 'Finance', 'Operations', 'Engineering', 'HR']}
                                    value={data.department}
                                    onChange={(e: any) => setData('department', e.target.value)}
                                />
                            </div>
                        </motion.div>

                        {/* Security Policy Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    Access Permissions
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Secure</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PermissionToggle 
                                    label="View Dashboard" 
                                    checked={data.permissions.view_dashboard} 
                                    onChange={() => togglePermission('view_dashboard')}
                                />
                                <PermissionToggle 
                                    label="Manage Users" 
                                    checked={data.permissions.manage_users} 
                                    onChange={() => togglePermission('manage_users')}
                                />
                                <PermissionToggle 
                                    label="Edit Inventory" 
                                    checked={data.permissions.edit_inventory} 
                                    onChange={() => togglePermission('edit_inventory')}
                                />
                                <PermissionToggle 
                                    label="View Financials" 
                                    checked={data.permissions.view_financials} 
                                    onChange={() => togglePermission('view_financials')}
                                />
                                <PermissionToggle 
                                    label="Approve Expenses" 
                                    checked={data.permissions.approve_expenses} 
                                    onChange={() => togglePermission('approve_expenses')}
                                />
                                <PermissionToggle 
                                    label="Export Data" 
                                    checked={data.permissions.export_data} 
                                    onChange={() => togglePermission('export_data')}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: AI Policy Generator */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-b from-indigo-900/20 to-gray-900/50 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                AI Policy Generator
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Don't know which permissions to grant? Enter the job title, and AI will configure the security policy.
                            </p>
                            
                            <div className="space-y-4">
                                <InputField 
                                    label="Exact Job Title"
                                    placeholder="e.g. Senior Sales Manager"
                                    value={data.job_title}
                                    onChange={e => setData('job_title', e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={generatePermissions}
                                    disabled={isGenerating || !data.job_title}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>Generating Policy...</>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" /> Generate Access
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Tip Box */}
                            <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                                <p className="text-xs text-indigo-200">
                                    <strong>Tip:</strong> Try "Junior Accountant" vs "CFO" to see different automated security levels.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}