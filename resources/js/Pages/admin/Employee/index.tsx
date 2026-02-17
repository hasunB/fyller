import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    Users, 
    Shield, 
    Activity, 
    Mail, 
    CheckCircle2,
    XCircle,
    Zap,
    Briefcase
} from 'lucide-react';

// --- Types ---
interface Employee {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Analyst' | 'Sales';
    department: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    productivityScore: number; // 0-100
    lastActive: string;
    avatar: string;
}

// --- Mock Data ---
const employees: Employee[] = [
    { id: 1, name: "Sarah Connor", email: "sarah@fyller.ai", role: "Admin", department: "Executive", status: "Active", productivityScore: 98, lastActive: "Just now", avatar: "SC" },
    { id: 2, name: "John Smith", email: "john@fyller.ai", role: "Manager", department: "Sales", status: "Active", productivityScore: 85, lastActive: "12m ago", avatar: "JS" },
    { id: 3, name: "Emily Chen", email: "emily@fyller.ai", role: "Analyst", department: "Finance", status: "On Leave", productivityScore: 92, lastActive: "2d ago", avatar: "EC" },
    { id: 4, name: "Michael Ross", email: "mike@fyller.ai", role: "Sales", department: "Sales", status: "Inactive", productivityScore: 45, lastActive: "1mo ago", avatar: "MR" },
    { id: 5, name: "David Kim", email: "david@fyller.ai", role: "Analyst", department: "Operations", status: "Active", productivityScore: 78, lastActive: "1h ago", avatar: "DK" },
];

// --- Components ---

const RoleBadge = ({ role }: { role: Employee['role'] }) => {
    const config = {
        'Admin': { color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: Shield },
        'Manager': { color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', icon: Briefcase },
        'Analyst': { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: Activity },
        'Sales': { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Zap },
    };
    const { color, icon: Icon } = config[role];

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
            <Icon className="w-3 h-3" />
            {role}
        </span>
    );
};

const StatusDot = ({ status }: { status: Employee['status'] }) => {
    const color = status === 'Active' ? 'bg-emerald-500' : status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-500';
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
            <span className="text-gray-300 text-sm">{status}</span>
        </div>
    );
};

const ProductivityBar = ({ score }: { score: number }) => {
    let color = 'bg-emerald-500';
    if (score < 80) color = 'bg-amber-500';
    if (score < 50) color = 'bg-red-500';

    return (
        <div className="w-full max-w-[120px]">
            <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-500">AI Score</span>
                <span className={`font-bold ${score >= 90 ? 'text-emerald-400' : 'text-gray-300'}`}>{score}/100</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
};

// --- Main Page ---

export default function EmployeeIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Layout title="Team Management">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Team & Access</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Manage roles, monitor activity, and track AI performance metrics.
                        </p>
                    </div>
                    <a href="/employees/create" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                        <Plus className="w-4 h-4" /> Add Employee
                    </a>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Total Members</p>
                            <h4 className="text-2xl font-bold text-white">24</h4>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Active Now</p>
                            <h4 className="text-2xl font-bold text-white">18</h4>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Avg AI Score</p>
                            <h4 className="text-2xl font-bold text-white">88<span className="text-sm text-gray-500 font-normal">/100</span></h4>
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
                                {employees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400 border border-gray-700">
                                                    {employee.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{employee.name}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Mail className="w-3 h-3" /> {employee.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RoleBadge role={employee.role} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {employee.department}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusDot status={employee.status} />
                                            <span className="text-[10px] text-gray-600 ml-4 block mt-0.5">Active: {employee.lastActive}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ProductivityBar score={employee.productivityScore} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}