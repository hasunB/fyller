import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Edit,
    MoreHorizontal,
    Mail,
    Phone,
    Calendar,
    Shield,
    Key,
    Activity,
    BrainCircuit,
    Lock,
    Clock,
    CheckCircle2
} from 'lucide-react';
import RoleBadge from '@/Components/Admin/UI/EmployeeRoleBadge';
import StatusDot from '@/Components/Admin/UI/EmployeeStatusDot';
import ProductivityBar from '@/Components/Admin/UI/EmployeeProductivityBar';

// --- Types ---
interface Props {
    employee: {
        id: number;
        employee_number: string;
        fullName: string;
        email: string;
        phone: string;
        hire_date: string;
        enable_ai_forecast: boolean;
        current_status: {
            id: number;
            status: {
                id: number;
                name: string;
            };
        };
        productivityScore: number;
        lastActive: string;
        avatar: string;
        roles: {
            id: number;
            name: string;
            department: {
                id: number;
                name: string;
            };
        }[];
    };
    recent_activity: {
        id: number;
        action: string;
        timestamp: string;
        ip_address: string;
    }[];
}

const mockActivity: Props['recent_activity'] = [
    { id: 1, action: "Approved Expense EXP-001", timestamp: "10 mins ago", ip_address: "192.168.1.45" },
    { id: 2, action: "Logged in via Web Portal", timestamp: "2 hours ago", ip_address: "192.168.1.45" },
    { id: 3, action: "Updated Inventory SKU-882", timestamp: "Yesterday, 4:30 PM", ip_address: "10.0.0.12" },
];

export default function EmployeeShow({ employee, recent_activity = mockActivity }: Props) {
    const primaryRole = employee.roles?.[0]?.name || 'Unknown';
    const departmentName = employee.roles?.[0]?.department?.name || 'Unassigned';

    return (
        <Layout title={`${employee.fullName} - Employee Profile`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/employees" className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{employee.fullName}</h1>
                                <StatusDot status={employee.current_status?.status?.name || 'Offline'} />
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{employee.employee_number}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors text-sm">
                            <Lock className="w-4 h-4" /> Reset Password
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                            <Edit className="w-4 h-4" /> Edit Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: Profile & Contact */}
                    <div className="space-y-6">

                        {/* 1. Identity Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-b border-gray-800" />

                            <div className="relative z-10 flex flex-col items-center mt-6">
                                <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-900 flex items-center justify-center text-2xl font-bold text-gray-400 shadow-xl mb-4">
                                    {employee.avatar}
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{employee.fullName}</h2>
                                <p className="text-sm text-gray-400 mb-4">{departmentName}</p>
                                <RoleBadge role={primaryRole} />
                            </div>
                        </motion.div>

                        {/* 2. Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-4"
                        >
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Info</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Mail className="w-4 h-4 text-gray-500" />
                                {employee.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Phone className="w-4 h-4 text-gray-500" />
                                {employee.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                Joined {new Date(employee.hire_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: AI Stats & Security */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 3. AI Performance Metrics */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-indigo-900/20 to-gray-900 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
                        >
                            <div className={`flex justify-between items-start border-b border-gray-800/50 pb-4 ${employee.enable_ai_forecast ? 'mb-6' : 'mb-0'}`}>
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <BrainCircuit className="w-5 h-5 text-indigo-400" />
                                        AI Productivity Analysis
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">System-generated metrics based on platform activity.</p>
                                </div>
                                {employee.enable_ai_forecast ? (
                                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase rounded border border-indigo-500/20">
                                        AI Tracking Enabled
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase rounded border border-red-500/20">
                                        AI Tracking Disabled
                                    </span>
                                )}
                            </div>

                            {employee.enable_ai_forecast && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">Overall Efficiency Score</p>
                                        <div className="flex items-end gap-3 mb-2">
                                            <span className="text-4xl font-bold text-white">{employee.productivityScore}</span>
                                            <span className="text-sm text-gray-500 mb-1">/ 100</span>
                                        </div>
                                        <ProductivityBar score={employee.productivityScore} />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-800 flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Tasks Completed (30d)</span>
                                            <span className="text-sm font-bold text-white">142</span>
                                        </div>
                                        <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-800 flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Response SLA</span>
                                            <span className="text-sm font-bold text-emerald-400">98%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* 4. Security & Access Level */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-gray-400" />
                                Security & Permissions
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm text-gray-300">Two-Factor Auth (2FA) Enrolled</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded-lg">
                                    <Key className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-300">Password last changed 45d ago</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <p className="text-sm font-bold text-gray-400 mb-3">Active Policies</p>
                                <div className="flex flex-wrap gap-2">
                                    {['View Dashboard', 'Manage Inventory', 'Approve Expenses', 'View Analytics'].map((perm, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                                            {perm}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Recent Activity Log */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-gray-400" />
                                    Recent Activity
                                </h3>
                                <button className="text-xs text-indigo-400 hover:text-indigo-300">View Full Audit Log</button>
                            </div>

                            <div className="space-y-0">
                                {recent_activity.map((log) => (
                                    <div key={log.id} className="flex items-start gap-4 py-3 border-b border-gray-800 last:border-0 group">
                                        <div className="mt-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500/30 group-hover:bg-indigo-500 transition-colors"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-200">{log.action}</p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.timestamp}</span>
                                                <span>IP: {log.ip_address}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
            <pre>{JSON.stringify(employee, null, 2)}</pre>
        </Layout>
    );
}