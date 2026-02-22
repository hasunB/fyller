import React, { useState, useRef } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    UploadCloud,
    Barcode,
    Package,
    DollarSign,
    Layers,
    Image as ImageIcon,
    AlertCircle,
    BrainCircuit
} from 'lucide-react';
import InputField from '@/Components/Admin/UI/Form-InputField';
import SelectField from '@/Components/Admin/UI/InputSelectField';
import TextAreaField from '@/Components/Admin/UI/TextAreaField';
import Toggle from '@/Components/Admin/UI/StockToggle';
import AdminCreateHeader from '@/Components/Admin/UI/AdminCreateHeader';

type Category = {
    id: number;
    name: string;
};

// --- Main Page Component ---

export default function CreateProduct({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sku: '',
        category: categories[0]?.id || '',
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inventory/store');
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    return (
        <Layout title="Add New Product">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <AdminCreateHeader
                    title="Add New Product"
                    description="Configure product details and AI parameters."
                    onSave={submit}
                    processing={processing}
                    errors={errors}
                    cancelLink="/inventory"
                    icon={Package}
                    saveText="Save Product"
                />

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
                                label="Product Name *"
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
                                    label="Category *"
                                    icon={Layers}
                                    options={categories.map(c => ({ value: c.id, label: c.name }))}
                                    value={data.category}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('category', e.target.value)}
                                    error={errors.category}
                                />
                            </div>

                            <TextAreaField
                                label="Description"
                                placeholder="Describe the product features, specs, and benefits..."
                                value={data.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                error={errors.description}
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
                                    label="Selling Price *"
                                    icon={DollarSign}
                                    type="number"
                                    placeholder="0.00"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    error={errors.price}
                                />
                                <InputField
                                    label="Cost Price *"
                                    icon={DollarSign}
                                    type="number"
                                    placeholder="0.00"
                                    value={data.cost_price}
                                    onChange={e => setData('cost_price', e.target.value)}
                                    error={errors.cost_price}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Initial Stock *"
                                    icon={Package}
                                    type="number"
                                    placeholder="0"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    error={errors.stock}
                                />
                                <div className="relative">
                                    <InputField
                                        label="Safety Stock Threshold *"
                                        icon={AlertCircle}
                                        type="number"
                                        placeholder="AI Suggested: 15"
                                        value={data.safety_stock}
                                        onChange={e => setData('safety_stock', e.target.value)}
                                        error={errors.safety_stock}
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
                                onClick={() => fileInputRef.current?.click()}
                                onChange={handleFileSelect}
                            >
                                {data.image ? (
                                    <div className="relative w-full">
                                        <img src={URL.createObjectURL(data.image)} alt="Profile" className="w-full h-full object-cover" />
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
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 400x400px)</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
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