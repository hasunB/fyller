import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Briefcase, Shield, Lock, Sparkles, BrainCircuit, Square, AlertCircle, Phone, Calendar } from 'lucide-react';
import InputField from '@/Components/Admin/UI/Form-InputField';
import Toggle from '@/Components/Admin/UI/StockToggle';
import SelectField from '@/Components/Admin/UI/InputSelectField';
import AdminCreateHeader from '@/Components/Admin/UI/AdminCreateHeader';
import PermissionToggle from '@/Components/Admin/UI/EmployeePermissionToggle';

// --- Main Component ---

export default function CreateEmployee({ permissions = [], departments = [], roles = [] }: { permissions: any[], departments: any[], roles: any[] }) {
    const initialPermissions = permissions.reduce((acc, perm) => {
        const key = perm.name.toLowerCase().replace(/ /g, '_');
        acc[perm.id] = key === 'view_dashboard';
        return acc;
    }, {} as Record<string | number, boolean>);

    // Prioritize selecting a department that actually has roles
    const deptWithRoles = departments.find(d => roles.some((r: any) => r.department_id == d.id));
    const defaultDepartmentId = deptWithRoles ? deptWithRoles.id : (departments?.length > 0 ? departments[0].id : '');
    const initialRole = roles.find((r: any) => r.department_id == defaultDepartmentId)?.id || '';

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        role: initialRole,
        department: defaultDepartmentId,
        job_title: '',
        date_of_joining: new Date().toISOString().split('T')[0],
        mobile_number: '',
        permissions: initialPermissions,
        enable_ai_forecast: true,
        enable_smart_reorder: true,
        password: '',
        password_confirmation: '',
    });

    const [isGenerating, setIsGenerating] = useState(false);

    // Mock AI Logic
    // const generatePermissions = () => { ... }

    const togglePermission = (id: string | number) => {
        const isChecked = !data.permissions[id];
        let updates: any = { [id]: isChecked };
        setData('permissions', { ...data.permissions, ...updates });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/employees/store');
        console.log("Creating Employee:", data);
    };

    return (
        <Layout title="Add Employee">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <AdminCreateHeader
                    title="Add Team Member"
                    description="Create account and configure access policies."
                    onSave={submit}
                    processing={processing}
                    errors={errors}
                    cancelLink="/employees"
                    icon={User}
                    saveText="Create Account"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Personal Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Profile Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="First Name *"
                                    placeholder="e.g. John"
                                    icon={User}
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                    error={errors.first_name}
                                />

                                <InputField
                                    label="Last Name *"
                                    placeholder="e.g. Connor"
                                    icon={User}
                                    value={data.last_name}
                                    onChange={e => setData('last_name', e.target.value)}
                                    error={errors.last_name}
                                />
                            </div>

                            <InputField
                                label="Work Email *"
                                type="email"
                                placeholder="name@fyller.ai"
                                icon={Mail}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                error={errors.email}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Password *"
                                    placeholder="e.g. *********"
                                    icon={User}
                                    type='password'
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    error={errors.password}
                                />

                                <InputField
                                    label="Confirm Password *"
                                    placeholder="e.g. *********"
                                    icon={User}
                                    type='password'
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    error={errors.password_confirmation}
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Mobile Number *"
                                    placeholder="e.g. 1234567890"
                                    icon={Phone}
                                    value={data.mobile_number}
                                    onChange={e => setData('mobile_number', e.target.value)}
                                    error={errors.mobile_number}
                                />
                                <InputField
                                    label="Date of Joining *"
                                    placeholder="e.g. 1990-01-01"
                                    icon={Calendar}
                                    type='date'
                                    value={data.date_of_joining}
                                    onChange={e => setData('date_of_joining', e.target.value)}
                                    error={errors.date_of_joining}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField
                                    label="Department *"
                                    icon={Briefcase}
                                    options={departments.map(d => ({ value: d.id, label: d.name }))}
                                    value={data.department}
                                    onChange={(e: any) => {
                                        const newDeptId = e.target.value;
                                        const firstRole = roles.find((r: any) => r.department_id == newDeptId);
                                        setData(prev => ({
                                            ...prev,
                                            department: newDeptId,
                                            role: firstRole ? firstRole.id : ''
                                        }));
                                    }}
                                    error={errors.department}
                                />
                                <SelectField
                                    label="Role *"
                                    icon={Briefcase}
                                    options={
                                        roles.filter((r: any) => r.department_id == data.department).length > 0
                                            ? roles.filter((r: any) => r.department_id == data.department).map((r: any) => ({ value: r.id, label: r.name }))
                                            : [{ value: '', label: 'No Roles Available' }]
                                    }
                                    value={data.role}
                                    onChange={(e: any) => setData('role', e.target.value)}
                                    error={errors.role}
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

                            {errors.permissions && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-400">{errors.permissions}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {permissions.map((perm) => {
                                    return (
                                        <PermissionToggle
                                            key={perm.id}
                                            label={perm.name}
                                            checked={!!data.permissions[perm.id]}
                                            onChange={() => togglePermission(perm.id)}
                                        />
                                    );
                                })}
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
                                    // onClick={generatePermissions}
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

                        {/* 4. AI Configuration */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-b from-indigo-900/20 to-gray-900/50 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                                AI Intelligence
                            </h3>

                            <div className="space-y-4">
                                <Toggle
                                    label="Predictive Forecasting"
                                    description="Allow AI to analyze sales trends for this product."
                                    checked={data.enable_ai_forecast}
                                    onChange={(val: boolean) => setData('enable_ai_forecast', val)}
                                />
                                <Toggle
                                    label="Smart Reorder Point"
                                    description="Automatically adjust safety stock based on lead time."
                                    checked={data.enable_smart_reorder}
                                    onChange={(val: boolean) => setData('enable_smart_reorder', val)}
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}