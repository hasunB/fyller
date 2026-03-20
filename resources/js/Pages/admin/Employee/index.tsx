import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreHorizontal, Users, Shield, Activity, Mail, CheckCircle2, XCircle, Zap, Briefcase, Eye } from 'lucide-react';
import RoleBadge from '@/Components/Admin/UI/EmployeeRoleBadge';
import StatusDot from '@/Components/Admin/UI/EmployeeStatusDot';
import ProductivityBar from '@/Components/Admin/UI/EmployeeProductivityBar';
import AdminPanelHeader from '@/Components/Admin/UI/AdminPanelHeader';
import CursorPagination from '@/Components/Admin/UI/CursorPagination';
import { Link } from '@inertiajs/react';

// --- Types ---
interface Props {
    employees: {
        data: Employee[];
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
        path: string;
    };
    total_employees: number;
    total_active_employees: number;
    avg_ai_score: number;
}

interface Employee {
    id: number;
    employee_number: string;
    fullName: string;
    email: string;
    enable_ai_forecast: boolean;
    current_status: {
        id: number;
        status: {
            id: number;
            name: string;
        };
    };
    productivityScore: number; // 0-100
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
}

// --- Main Page ---

export default function EmployeeIndex({ employees, total_employees, total_active_employees, avg_ai_score }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title="Team Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}

                <AdminPanelHeader
                    panelName="employees"
                    title="Team & Access"
                    description="Manage roles, monitor activity, and track AI performance metrics."
                    descriptionSpanText=""
                    descriptionSpanStyle=""
                    showExportButton={false}
                    AddButtonText="Add Employee"
                    ExportButtonText="Export CSV"
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Total Members</p>
                            <h4 className="text-2xl font-bold text-white">{total_employees.toLocaleString()}</h4>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Active Now</p>
                            <h4 className="text-2xl font-bold text-white">{total_active_employees.toLocaleString()}</h4>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Avg AI Score</p>
                            <h4 className="text-2xl font-bold text-white">{avg_ai_score.toLocaleString()}<span className="text-sm text-gray-500 font-normal">/100</span></h4>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                            <Filter className="w-4 h-4" /> Department
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-950 border border-gray-800 text-gray-300 rounded-lg text-sm hover:border-gray-700">
                            Status: All
                        </button>
                    </div>
                </div>

                {/* Employee Table */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/50">
                                    <th className="px-6 py-4 font-medium">Employee</th>
                                    <th className="px-6 py-4 font-medium">Role & Access</th>
                                    <th className="px-6 py-4 font-medium">Department</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Performance (AI)</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {employees.data.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400 border border-gray-700">
                                                    {employee.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{employee.fullName}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Mail className="w-3 h-3" /> {employee.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RoleBadge role={employee.roles?.[0]?.name || 'Unknown'} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            <div className="max-w-[150px] truncate" title={employee.roles?.[0]?.department?.name || 'Unassigned'}>
                                                {employee.roles?.[0]?.department?.name || 'Unassigned'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusDot status={employee.current_status?.status?.name || 'Offline'} />
                                            <span className="text-[10px] text-gray-600 ml-4 block mt-0.5">Active: {employee.lastActive}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ProductivityBar score={employee.productivityScore} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/employees/${employee.id}`} className="inline-flex items-center justify-center text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <CursorPagination data={employees} />
                </motion.div>
            </div>
        </Layout>
    );
}