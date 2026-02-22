import React from 'react';
import { Shield, Briefcase, Activity, Zap } from 'lucide-react';

interface Role {
    role: 'Admin' | 'Manager' | 'Analyst' | 'Sales';
}

const RoleBadge = ({ role }: Role) => {
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

export default RoleBadge;
