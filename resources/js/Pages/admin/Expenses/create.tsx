import React, { useState, useEffect } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    UploadCloud,
    ScanLine,
    DollarSign,
    Calendar,
    RefreshCw,
    Layers,
    Briefcase,
    Loader2,
    CheckCircle2,
    X,
    BrainCircuit
} from 'lucide-react';
import InputField from '@/Components/Client/UI/Form-InputField';
import SelectField from '@/Components/Admin/UI/InputSelectField';
import TextAreaField from '@/Components/Admin/UI/TextAreaField';
import AdminCreateHeader from '@/Components/Admin/UI/AdminCreateHeader';

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

type Category = {
    id: number;
    name: string;
};

type Merchant = {
    id: number;
    name: string;
};

export default function CreateExpense({ categories, merchants }: { categories: Category[], merchants: Merchant[] }) {
    const { data, setData, post, processing, errors } = useForm({
        merchant: merchants[0].id || '',
        name:'',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: categories[0].id || '',
        description: '',
        expiry_date: '',
        is_recurring: false,
        recurring_frequency: 'monthly',
        recurring_interval: 1,
        recurring_amount: '',
        recurring_start_date: '',
        recurring_end_date: '',
        recurring_next_run_date: '',
        enable_ai_forecast: true,
        enable_anomaly_detection: true,
        receipt: null as File | null,
    });

    const [dragActive, setDragActive] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

    // Mock AI Scan Logic
    const handleFile = (file: File) => {
        setData('receipt', file);
        setIsScanning(true);
        setScanComplete(false);

        // Simulate AI Processing
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);

            // Mock Auto-Fill
            setData(prev => ({
                ...prev,
                receipt: file,
                merchant: 'AWS Web Services', // Simulated extracted data
                amount: '245.50',
                category: 'Infrastructure',
                description: 'Monthly EC2 Instance Billing'
            }));
        }, 2000);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/expenses/store');
    };

    return (
        <Layout title="Add Expense">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <AdminCreateHeader
                    title="Log New Expense"
                    description="Upload a receipt to auto-fill details via AI."
                    onSave={submit}
                    processing={processing}
                    errors={errors}
                    cancelLink="/expenses"
                    icon={DollarSign}
                    saveText="Save Expense"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Expense Details Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-800 pb-2">Expense Details</h3>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Merchant *"
                                        icon={Briefcase}
                                        options={merchants.map(m => ({ value: m.id, label: m.name }))}
                                        value={data.merchant}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('merchant', e.target.value)}
                                        className={scanComplete ? "animate-pulse-once" : ""}
                                        error={errors.merchant}
                                        addOption={true}
                                    />
                                    <InputField
                                        label="Name *"
                                        placeholder="e.g. AWS Hosting services"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={scanComplete ? "animate-pulse-once" : ""}
                                        error={errors.name}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Transaction date *"
                                        type="date"
                                        icon={Calendar}
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        error={errors.date}
                                    />

                                    <InputField
                                        label="Amount *"
                                        type="number"
                                        placeholder="0.00"
                                        icon={DollarSign}
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        className={scanComplete ? "animate-pulse-once" : ""}
                                        error={errors.amount}
                                        disabled={data.is_recurring}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Category *"
                                        icon={Layers}
                                        options={categories.map(c => ({ value: c.id, label: c.name }))}
                                        value={data.category}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('category', e.target.value)}
                                        error={errors.category}
                                        addOption={true}
                                    />

                                    <InputField
                                        label="Date of Expiry *"
                                        type="date"
                                        icon={Calendar}
                                        value={data.expiry_date}
                                        onChange={e => setData('expiry_date', e.target.value)}
                                        error={errors.expiry_date}
                                        disabled={data.is_recurring}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <TextAreaField
                                        label="Description / Notes"
                                        placeholder="Describe the expense..."
                                        value={data.description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                        error={errors.description}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Toggle
                                        label="Recurring Subscription"
                                        description="Is this a monthly or yearly recurring cost? (e.g. SaaS)"
                                        checked={data.is_recurring}
                                        onChange={(val: boolean) => {
                                            setData(prev => ({
                                                ...prev,
                                                is_recurring: val,
                                                amount: val ? '0.00' : prev.amount,
                                                expiry_date: val ? '' : prev.expiry_date,
                                                
                                            }));
                                        }}
                                    />

                                    <AnimatePresence>
                                        {data.is_recurring && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-800/50 mt-4">
                                                    <SelectField
                                                        label="Frequency *"
                                                        icon={RefreshCw}
                                                        options={[
                                                            { value: 'daily', label: 'Daily' },
                                                            { value: 'weekly', label: 'Weekly' },
                                                            { value: 'monthly', label: 'Monthly' },
                                                            { value: 'yearly', label: 'Yearly' }
                                                        ]}
                                                        value={data.recurring_frequency}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('recurring_frequency', e.target.value)}
                                                        error={(errors as any).recurring_frequency}
                                                    />
                                                    <InputField
                                                        label="Interval *"
                                                        type="number"
                                                        placeholder="e.g. 1"
                                                        value={data.recurring_interval}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('recurring_interval', Number(e.target.value))}
                                                        error={(errors as any).recurring_interval}
                                                    />
                                                    <InputField
                                                        label="Recurring Amount *"
                                                        type="number"
                                                        placeholder="0.00"
                                                        icon={DollarSign}
                                                        value={data.recurring_amount}
                                                        onChange={e => setData('recurring_amount', e.target.value)}
                                                        className={scanComplete ? "animate-pulse-once" : ""}
                                                        error={errors.recurring_amount}
                                                    />
                                                    <InputField
                                                        label="Start Date *"
                                                        type="date"
                                                        icon={Calendar}
                                                        value={data.recurring_start_date}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('recurring_start_date', e.target.value)}
                                                        error={(errors as any).recurring_start_date}
                                                    />
                                                    <InputField
                                                        label="End Date"
                                                        type="date"
                                                        icon={Calendar}
                                                        value={data.recurring_end_date}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('recurring_end_date', e.target.value)}
                                                        error={(errors as any).recurring_end_date}
                                                    />
                                                    <InputField
                                                        label="Next Run Date"
                                                        type="date"
                                                        icon={Calendar}
                                                        value={data.recurring_next_run_date}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('recurring_next_run_date', e.target.value)}
                                                        error={(errors as any).recurring_next_run_date}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Receipt Scanning */}
                    <div className="space-y-6 flex flex-col h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 flex-1 flex flex-col"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <ScanLine className="w-5 h-5 text-indigo-400" />
                                Smart Receipt Scan
                            </h3>

                            <div
                                className={`
                                    flex-1 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden min-h-[300px]
                                    ${dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/30'}
                                    ${data.receipt ? 'border-indigo-500/50 bg-gray-950' : ''}
                                `}
                                onClick={() => document.getElementById('receipt-upload')?.click()}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {/* Background Scan Animation */}
                                {isScanning && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent w-full h-full z-0"
                                        initial={{ top: '-100%' }}
                                        animate={{ top: '100%' }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    />
                                )}

                                {data.receipt ? (
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                        {isScanning ? (
                                            <>
                                                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                                                <p className="text-indigo-400 font-medium animate-pulse">Analyzing Receipt...</p>
                                                <p className="text-xs text-gray-500 mt-2">Extracting Merchant & Amount</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                                <p className="text-white font-medium mb-1">Scan Complete</p>
                                                <p className="text-xs text-gray-500 mb-6">{data.receipt.name}</p>

                                                <div className="bg-gray-800/50 rounded-lg p-3 w-full text-left border border-gray-700">
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">AI Extracted</p>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-300">Merchant</span>
                                                        <span className="text-white font-bold">AWS Web Services</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-300">Total</span>
                                                        <span className="text-white font-bold">$245.50</span>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); setData('receipt', null); setScanComplete(false); }}
                                                    className="absolute top-[-20px] right-[-20px] p-2 text-gray-500 hover:text-white"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 text-gray-500 group-hover:text-indigo-400 transition-colors">
                                            <UploadCloud className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm text-gray-300 font-medium">Click to upload or drag & drop</p>
                                        <p className="text-xs text-gray-500 mt-2 max-w-[200px]">AI will attempt to auto-fill details from PDF, PNG, or JPG receipts.</p>
                                    </>
                                )}
                                <input
                                    id="receipt-upload"
                                    type="file"
                                    accept='image/*,application/pdf'
                                    className="hidden"
                                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                                />
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
                                    label="Expense Forecasting"
                                    description="Allow AI to analyze spending trends for this category."
                                    checked={data.enable_ai_forecast}
                                    onChange={(val: boolean) => setData('enable_ai_forecast', val)}
                                />
                                <Toggle
                                    label="Anomaly Detection"
                                    description="Automatically flag unusual expense amounts."
                                    checked={data.enable_anomaly_detection}
                                    onChange={(val: boolean) => setData('enable_anomaly_detection', val)}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}