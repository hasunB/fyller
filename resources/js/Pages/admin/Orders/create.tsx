import React, { useState } from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";
import { Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Plus, 
    Trash2, 
    User, 
    CreditCard, 
    Truck, 
    Save, 
    Sparkles, 
    ShoppingBag,
    Minus,
    ArrowRight
} from 'lucide-react';
import InputField from '@/Components/Client/UI/Form-InputField';

// --- Mock Data for Search ---
const MOCK_PRODUCTS = [
    { id: 1, name: "Neural Noise-Cancelling Headphones", price: 299.00, image: "🎧" },
    { id: 2, name: "Ergo-Lift Smart Desk", price: 850.00, image: "🪑" },
    { id: 3, name: "4K Ultra-Wide Monitor", price: 599.00, image: "🖥️" },
    { id: 4, name: "Mechanical Keyboard", price: 120.00, image: "⌨️" },
    { id: 5, name: "USB-C Docking Station", price: 89.00, image: "🔌" },
];

// --- Helper Components ---

const OrderItemRow = ({ item, onUpdateQty, onRemove }: any) => (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800 rounded-lg group hover:border-gray-700 transition-colors"
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center text-2xl">
                {item.image}
            </div>
            <div>
                <h4 className="text-sm font-medium text-white">{item.name}</h4>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
            </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="flex items-center bg-gray-950 rounded-lg border border-gray-800">
                <button 
                    type="button"
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-l-lg transition-colors"
                >
                    <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-mono text-white">{item.quantity}</span>
                <button 
                    type="button"
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-r-lg transition-colors"
                >
                    <Plus className="w-3 h-3" />
                </button>
            </div>
            <div className="text-right w-20">
                <span className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <button 
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-gray-600 hover:text-red-400 transition-colors p-2"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    </motion.div>
);

const AIUpsellCard = ({ suggestion, onAdd }: any) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Sparkles className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-0.5">AI Recommendation</p>
                <p className="text-sm text-white">
                    Customers often buy <strong>{suggestion.name}</strong> with this order.
                </p>
            </div>
        </div>
        <button 
            type="button"
            onClick={onAdd}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-1"
        >
            Add <Plus className="w-3 h-3" />
        </button>
    </motion.div>
);

// --- Main Page Component ---

export default function CreateOrder() {
    // Form State (Inertia)
    const { data, setData, post, processing } = useForm({
        customer_name: '',
        customer_email: '',
        status: 'pending',
        payment_status: 'unpaid',
        items: [] as any[],
        notes: ''
    });

    // Local UI State
    const [productSearch, setProductSearch] = useState('');
    const [searchResults, setSearchResults] = useState<typeof MOCK_PRODUCTS>([]);

    // Search Logic
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setProductSearch(term);
        if (term.length > 1) {
            const results = MOCK_PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(term.toLowerCase()) && 
                !data.items.find((i: any) => i.id === p.id)
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    // Cart Logic
    const addItem = (product: any) => {
        setData('items', [...data.items, { ...product, quantity: 1 }]);
        setProductSearch('');
        setSearchResults([]);
    };

    const updateQuantity = (id: number, change: number) => {
        const newItems = data.items.map((item: any) => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setData('items', newItems);
    };

    const removeItem = (id: number) => {
        setData('items', data.items.filter((i: any) => i.id !== id));
    };

    // Calculation Logic
    const subtotal = data.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    // AI Logic: Simple mock rule
    const showUpsell = data.items.length > 0 && !data.items.find((i: any) => i.id === 5); // Suggest Docking Station if not in cart

    return (
        <Layout title="Create Order">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-indigo-500" />
                            Create Manual Order
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Draft a new order for phone or walk-in customers.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/orders" className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Discard
                        </Link>
                        <button 
                            disabled={processing || data.items.length === 0}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium"
                        >
                            <Save className="w-4 h-4" /> Create Order
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
                    
                    {/* LEFT COLUMN: Products & Cart */}
                    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                        
                        {/* 1. Product Search */}
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 relative z-20">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="Search products to add..." 
                                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    value={productSearch}
                                    onChange={handleSearch}
                                    autoFocus
                                />
                                {/* Dropdown Results */}
                                {searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                                        {searchResults.map(product => (
                                            <button 
                                                key={product.id}
                                                onClick={() => addItem(product)}
                                                className="w-full flex items-center justify-between p-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0 text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{product.image}</span>
                                                    <span className="text-gray-200 font-medium">{product.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-indigo-400 font-bold">${product.price}</span>
                                                    <Plus className="w-4 h-4 text-gray-500" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Cart Items */}
                        <div className="flex-1 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                            {data.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                                    <ShoppingBag className="w-12 h-12 mb-2" />
                                    <p>Cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <AnimatePresence>
                                        {data.items.map((item: any) => (
                                            <OrderItemRow 
                                                key={item.id} 
                                                item={item} 
                                                onUpdateQty={updateQuantity} 
                                                onRemove={removeItem} 
                                            />
                                        ))}
                                    </AnimatePresence>

                                    {/* AI Upsell Injection */}
                                    {showUpsell && (
                                        <AIUpsellCard 
                                            suggestion={MOCK_PRODUCTS[4]} 
                                            onAdd={() => addItem(MOCK_PRODUCTS[4])}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Customer & Summary */}
                    <div className="w-full lg:w-96 flex flex-col gap-6 h-full overflow-y-auto">
                        
                        {/* 3. Customer Info */}
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" />
                                Customer
                            </h3>
                            <InputField 
                                label="Full Name"
                                placeholder="Guest / Customer Name"
                                value={data.customer_name}
                                onChange={e => setData('customer_name', e.target.value)}
                            />
                            <InputField 
                                label="Email"
                                placeholder="email@example.com"
                                value={data.customer_email}
                                onChange={e => setData('customer_email', e.target.value)}
                            />
                        </div>

                        {/* 4. Order Settings */}
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-400" />
                                Order Details
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400">Payment Status</label>
                                    <select 
                                        className="w-full bg-gray-950 border border-gray-800 text-sm text-white rounded-lg p-2.5 outline-none focus:border-indigo-500"
                                        value={data.payment_status}
                                        onChange={e => setData('payment_status', e.target.value)}
                                    >
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400">Fulfillment</label>
                                    <select 
                                        className="w-full bg-gray-950 border border-gray-800 text-sm text-white rounded-lg p-2.5 outline-none focus:border-indigo-500"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="fulfilled">Fulfilled</option>
                                        <option value="unfulfilled">Unfulfilled</option>
                                    </select>
                                </div>
                            </div>

                            <textarea 
                                placeholder="Add internal notes..."
                                className="w-full bg-gray-950/50 border border-gray-800 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 min-h-[80px]"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                            />
                        </div>

                        {/* 5. Summary & Total */}
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 mt-auto">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-800 my-2"></div>
                                <div className="flex justify-between text-white text-xl font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => alert("Payment Gateway Integration would go here.")}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                Process Payment <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}