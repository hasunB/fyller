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
    FileText, 
    Layers, 
    Briefcase, 
    Loader2, 
    CheckCircle2, 
    X
} from 'lucide-react';
import InputField from '@/Components/Client/UI/Form-InputField';

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

// --- Main Component ---

export default function CreateExpense() {
    const { data, setData, post, processing } = useForm({
        merchant: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Operations',
        description: '',
        is_recurring: false,
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
        // post('/expenses');
        console.log("Submitting Expense:", data);
    };

    return (
        <Layout title="Add Expense">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <DollarSign className="w-6 h-6 text-indigo-500" />
                            Log New Expense
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Upload a receipt to auto-fill details via AI.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/expenses" className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Cancel
                        </Link>
                        <button 
                            onClick={submit}
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium"
                        >
                            <Save className="w-4 h-4" /> Save Expense
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Receipt Scanning */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 h-full flex flex-col"
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
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Expense Details Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-800 pb-2">Expense Details</h3>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField 
                                        label="Merchant"
                                        placeholder="e.g. Uber, AWS, WeWork"
                                        icon={Briefcase}
                                        value={data.merchant}
                                        onChange={e => setData('merchant', e.target.value)}
                                        // Highlight field if auto-filled
                                        className={scanComplete ? "animate-pulse-once" : ""}
                                    />
                                    <InputField 
                                        label="Amount"
                                        type="number"
                                        placeholder="0.00"
                                        icon={DollarSign}
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        className={scanComplete ? "animate-pulse-once" : ""}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField 
                                        label="Date of Expense"
                                        type="date"
                                        icon={Calendar}
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                    />
                                    <SelectField 
                                        label="Category"
                                        icon={Layers}
                                        options={['Operations', 'Infrastructure', 'Marketing', 'Travel', 'Software', 'Meals']}
                                        value={data.category}
                                        onChange={(e: any) => setData('category', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Description / Notes</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                        <textarea 
                                            placeholder="What was this expense for?"
                                            className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600 min-h-[100px]"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Toggle 
                                        label="Recurring Subscription" 
                                        description="Is this a monthly or yearly recurring cost? (e.g. SaaS)"
                                        checked={data.is_recurring}
                                        onChange={(val: boolean) => setData('is_recurring', val)}
                                    />
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}