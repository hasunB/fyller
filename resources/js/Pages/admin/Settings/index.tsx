import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Lock, 
    Bell, 
    CreditCard, 
    BrainCircuit, 
    Globe, 
    Save, 
    LogOut,
    Smartphone,
    Shield,
    Camera,
    Building,
    Mail,
    Briefcase
} from 'lucide-react';
import InputField from '@/Components/Admin/UI/Form-InputField';
import { useForm } from '@inertiajs/react';

// --- Helper Components ---

const Toggle = ({ label, description, checked, onChange }: any) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0">
        <div className="flex-1 pr-4">
            <h4 className="text-sm font-medium text-white">{label}</h4>
            <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
        <button 
            onClick={() => onChange(!checked)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-700'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    </div>
);

const TabButton = ({ active, id, icon: Icon, label, onClick }: any) => (
    <button 
        onClick={() => onClick(id)}
        className={`
            w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
            ${active === id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
        `}
    >
        <Icon className="w-5 h-5" />
        {label}
    </button>
);

// --- New Profile Section ---

const ProfileSettings = () => {
    const { data, setData } = useForm({
        name: 'John Doe',
        email: 'john@fyller.ai',
        title: 'Chief Financial Officer',
        bio: 'Passionate about AI and financial forecasting.',
        avatar: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('avatar', e.target.files[0]);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold text-white mb-1">My Profile</h3>
                <p className="text-xs text-gray-500">Manage your personal information and public profile.</p>
            </div>

            {/* Avatar Section */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 flex items-center gap-6">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl font-bold border-2 border-indigo-500/30 overflow-hidden">
                        {data.avatar ? (
                            <img src={URL.createObjectURL(data.avatar)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            "JD"
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full text-white cursor-pointer hover:bg-indigo-600 transition-colors shadow-lg border border-gray-700">
                        <Camera className="w-4 h-4" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                </div>
                <div>
                    <h4 className="text-white font-medium">Profile Picture</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-3">Supports JPG, PNG or GIF. Max size 2MB.</p>
                    <div className="flex gap-3">
                        <label className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer border border-gray-700">
                            Upload New
                            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </label>
                        <button className="px-3 py-1.5 text-red-400 hover:text-red-300 text-xs font-medium transition-colors">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                    label="Full Name" 
                    icon={User}
                    value={data.name} 
                    onChange={(e) => setData('name', e.target.value)} 
                />
                <InputField 
                    label="Email Address" 
                    icon={Mail}
                    type="email"
                    value={data.email} 
                    onChange={(e) => setData('email', e.target.value)} 
                    disabled
                />
                <InputField 
                    label="Job Title" 
                    icon={Briefcase}
                    value={data.title} 
                    onChange={(e) => setData('title', e.target.value)} 
                />
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Bio</label>
                    <textarea 
                        className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 min-h-[50px]"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

// --- Other Sections (kept same as before) ---

const GeneralSettings = () => {
    const { data, setData } = useForm({
        company_name: 'Fyller AI',
        support_email: 'support@fyller.ai',
        timezone: 'UTC-5 (EST)',
        currency: 'USD ($)',
    });

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-1">General Information</h3>
                <p className="text-xs text-gray-500">Configure your company profile and regional settings.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Company Name" icon={Building} value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} />
                <InputField label="Support Email" icon={Mail} value={data.support_email} onChange={(e) => setData('support_email', e.target.value)} />
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Timezone</label>
                    <select className="w-full bg-gray-950/50 border border-gray-800 text-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500">
                        <option>UTC-5 (EST)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+5:30 (IST)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Currency</label>
                    <select className="w-full bg-gray-950/50 border border-gray-800 text-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const AISettings = () => {
    const [settings, setSettings] = useState({
        auto_forecast: true,
        smart_restock: true,
        sentiment_analysis: false,
        fraud_detection: true
    });

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-indigo-500" />
                    AI Configuration
                </h3>
                <p className="text-xs text-gray-500">Fine-tune how Fyller's AI interacts with your data.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                <Toggle 
                    label="Auto-Forecast Sales" 
                    description="Allow AI to update sales projections daily based on new data."
                    checked={settings.auto_forecast}
                    onChange={(v: boolean) => setSettings({...settings, auto_forecast: v})}
                />
                <Toggle 
                    label="Smart Restock Triggers" 
                    description="Automatically create purchase orders when stock hits safety levels."
                    checked={settings.smart_restock}
                    onChange={(v: boolean) => setSettings({...settings, smart_restock: v})}
                />
                <Toggle 
                    label="Customer Sentiment Analysis" 
                    description="Scan support tickets and reviews to gauge customer mood."
                    checked={settings.sentiment_analysis}
                    onChange={(v: boolean) => setSettings({...settings, sentiment_analysis: v})}
                />
                <Toggle 
                    label="Fraud Detection" 
                    description="Flag high-risk orders based on IP, location, and purchase history."
                    checked={settings.fraud_detection}
                    onChange={(v: boolean) => setSettings({...settings, fraud_detection: v})}
                />
            </div>
        </div>
    );
};

const SecuritySettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-1">Security & Access</h3>
                <p className="text-xs text-gray-500">Manage password policies and 2FA.</p>
            </div>
            
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-xs text-gray-400 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600/10 text-emerald-400 border border-emerald-600/20 rounded-lg text-xs font-bold">
                        Enabled
                    </button>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-medium text-white mb-4">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Current Password" type="password" placeholder="••••••••" icon={Lock} />
                        <InputField label="New Password" type="password" placeholder="••••••••" icon={Lock} />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-medium text-white mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-white">Chrome on Windows</p>
                                    <p className="text-xs text-green-400">Current Session</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">192.168.1.1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-white">Safari on iPhone 13</p>
                                    <p className="text-xs text-gray-500">Last active: 2h ago</p>
                                </div>
                            </div>
                            <button className="text-xs text-red-400 hover:text-red-300">Revoke</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Page ---

export default function SettingsIndex() {
    const [activeTab, setActiveTab] = useState('profile'); // Default to profile

    return (
        <Layout title="Settings">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Settings</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your account preferences and system configurations.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 space-y-2">
                        {/* New Profile Tab */}
                        <TabButton 
                            id="profile" 
                            label="My Profile" 
                            icon={User} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                        <TabButton 
                            id="general" 
                            label="Company General" 
                            icon={Building} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                        <TabButton 
                            id="ai" 
                            label="AI Intelligence" 
                            icon={BrainCircuit} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                        <TabButton 
                            id="security" 
                            label="Security" 
                            icon={Lock} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                        <TabButton 
                            id="notifications" 
                            label="Notifications" 
                            icon={Bell} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                        <TabButton 
                            id="billing" 
                            label="Billing & Plan" 
                            icon={CreditCard} 
                            active={activeTab} 
                            onClick={setActiveTab} 
                        />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 min-h-[500px]"
                        >
                            {activeTab === 'profile' && <ProfileSettings />}
                            {activeTab === 'general' && <GeneralSettings />}
                            {activeTab === 'ai' && <AISettings />}
                            {activeTab === 'security' && <SecuritySettings />}
                            {activeTab === 'notifications' && (
                                <div className="text-center text-gray-500 py-20">
                                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Notification settings coming soon...</p>
                                </div>
                            )}
                            {activeTab === 'billing' && (
                                <div className="text-center text-gray-500 py-20">
                                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Billing integration coming soon...</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}