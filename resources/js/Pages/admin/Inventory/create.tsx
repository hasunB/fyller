import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Save, 
    X, 
    UploadCloud, 
    Sparkles, 
    Barcode, 
    Package, 
    DollarSign, 
    Layers, 
    Image as ImageIcon,
    AlertCircle,
    BrainCircuit
} from 'lucide-react';
import InputField from '@/Components/Admin/UI/Form-InputField'; // Assuming you have this from previous steps

// --- Helper Components for Select & TextArea ---

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
            {/* Custom Arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    </div>
);

const TextAreaField = ({ label, ...props }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <button type="button" className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Sparkles className="w-3 h-3" /> Generate with AI
            </button>
        </div>
        <textarea 
            {...props}
            className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600 min-h-[120px]"
        />
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

// --- Main Page Component ---

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sku: '',
        category: 'Electronics',
        price: '',
        cost_price: '',
        stock: '',
        safety_stock: '',
        description: '',
        enable_ai_forecast: true,
        enable_smart_reorder: true,
        image: null as File | null,
    });

    const [dragActive, setDragActive] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // post(route('products.store'));
        console.log("Submitting:", data);
    };

    // Drag and Drop handlers
    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData('image', e.dataTransfer.files[0]);
        }
    };

    return (
        <Layout title="Add New Product">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Package className="w-6 h-6 text-indigo-500" />
                            Add New Product
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Configure product details and AI parameters.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/inventory" className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Cancel
                        </Link>
                        <button 
                            onClick={submit} 
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium"
                        >
                            <Save className="w-4 h-4" /> Save Product
                        </button>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 1. General Info Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">General Information</h3>
                            
                            <InputField 
                                label="Product Name"
                                placeholder="e.g. Neural Noise-Cancelling Headphones"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField 
                                    label="SKU"
                                    icon={Barcode}
                                    placeholder="Auto-generated if empty"
                                    value={data.sku}
                                    onChange={e => setData('sku', e.target.value)}
                                    error={errors.sku}
                                />
                                <SelectField 
                                    label="Category"
                                    icon={Layers}
                                    options={['Electronics', 'Fashion', 'Home & Garden', 'Automotive', 'Health']}
                                    value={data.category}
                                    onChange={(e: any) => setData('category', e.target.value)}
                                />
                            </div>

                            <TextAreaField 
                                label="Description"
                                placeholder="Describe the product features, specs, and benefits..."
                                value={data.description}
                                onChange={(e: any) => setData('description', e.target.value)}
                            />
                        </motion.div>

                        {/* 2. Inventory & Pricing Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Inventory & Pricing</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField 
                                    label="Selling Price"
                                    icon={DollarSign}
                                    type="number"
                                    placeholder="0.00"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                />
                                <InputField 
                                    label="Cost Price"
                                    icon={DollarSign}
                                    type="number"
                                    placeholder="0.00"
                                    value={data.cost_price}
                                    onChange={e => setData('cost_price', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField 
                                    label="Initial Stock"
                                    icon={Package}
                                    type="number"
                                    placeholder="0"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                />
                                <div className="relative">
                                    <InputField 
                                        label="Safety Stock Threshold"
                                        icon={AlertCircle}
                                        type="number"
                                        placeholder="AI Suggested: 15"
                                        value={data.safety_stock}
                                        onChange={e => setData('safety_stock', e.target.value)}
                                    />
                                    <div className="absolute top-0 right-0">
                                        <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                            AI Recommended
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Media & AI Settings */}
                    <div className="space-y-6">
                        
                        {/* 3. Media Upload */}
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Product Image</h3>
                            
                            <div 
                                className={`
                                    border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer
                                    ${dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'}
                                `}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {data.image ? (
                                    <div className="relative w-full">
                                        <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                                            <ImageIcon className="w-4 h-4" /> {data.image.name}
                                        </p>
                                        <button 
                                            type="button" 
                                            onClick={() => setData('image', null)}
                                            className="text-xs text-red-400 mt-2 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4 text-gray-500">
                                            <UploadCloud className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm text-gray-300 font-medium">Click to upload or drag & drop</p>
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </>
                                )}
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => e.target.files && setData('image', e.target.files[0])}
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
                </form>
            </div>
        </Layout>
    );
}