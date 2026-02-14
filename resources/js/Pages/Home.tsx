import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Box,
    TrendingUp,
    Zap,
    ShieldCheck,
    ArrowRight,
} from 'lucide-react';
import Layout from "@/Components/client/Layouts/Layout";

// --- Background Animation Component ---
const RisingSalesBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

            {/* Glowing Light Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Animated Rising Graph Lines */}
            <svg className="absolute bottom-0 left-0 w-full h-full opacity-30" viewBox="0 0 1440 600" preserveAspectRatio="none">
                {/* Line 1 - Slow & Steady */}
                <motion.path
                    d="M0,600 C320,550 480,500 640,300 C800,100 1120,50 1440,0 L1440,600 L0,600 Z"
                    fill="url(#grad1)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Line 2 - The "Active" Trend Line */}
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
                <motion.path
                    d="M0,600 Q360,400 720,350 T1440,50"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
                />
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
                        <stop offset="50%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Floating Data Points */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-indigo-400 rounded-full w-2 h-2 shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                    initial={{ opacity: 0, x: Math.random() * 100 + "%", y: "100%" }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: ["100%", `${Math.random() * 40}%`]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-950 min-h-[90vh] flex items-center -mt-15">
            <RisingSalesBackground />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-gray-900 border border-gray-700 text-indigo-400 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Powered by Next-Gen Predictive AI
            </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                            Stop Guessing. <br />
                            Start <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Forecasting.</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            The AI Smart Inventory System that learns your sales patterns, predicts demand, and automates restocking before you even know you're running low.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2 border border-indigo-500/50">
                                Start Free Trial <ArrowRight className="h-5 w-5" />
                            </button>
                            <button className="px-8 py-4 bg-gray-900/50 text-white border border-gray-700 rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:border-gray-500">
                                <Box className="h-5 w-5" /> View Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// @ts-ignore
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/30 transition-all group backdrop-blur-sm"
    >
        <div className="h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300 border border-gray-700 group-hover:border-indigo-500">
            <Icon className="h-6 w-6 text-indigo-400 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
);

const FeaturesSection = () => {
    const features = [
        {
            icon: TrendingUp,
            title: "Predictive Sales Forecasting",
            description: "Our AI analyzes historical data and seasonal trends to predict future sales with 98% accuracy."
        },
        {
            icon: Zap,
            title: "Real-Time Sync",
            description: "Inventory updates instantly across all your channels—web, mobile, and physical POS."
        },
        {
            icon: ShieldCheck,
            title: "Smart Safety Stock",
            description: "Automatically adjust safety stock levels based on supplier lead times and demand volatility."
        },
        {
            icon: BarChart3,
            title: "Actionable Insights",
            description: "Don't just see data. Get clear recommendations on what to bundle, discount, or restock."
        }
    ];

    return (
        <section id="features" className="py-24 bg-gray-950 relative">
            {/* Background Gradient Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-indigo-900/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Intelligence built into every shelf</h2>
                    <p className="text-xl text-gray-400">Transform your inventory from a liability into a strategic asset.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const DashboardPreview = () => {
    return (
        <section className="py-20 bg-gray-900 border-y border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">A Dashboard That Thinks Like a CFO</h2>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Visualize revenue trends instantly.",
                                "Identify slow-moving stock before it expires.",
                                "AI-generated purchasing orders in one click."
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="h-2 w-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors">
                            Explore the Dashboard <ArrowRight className="h-4 w-4" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900 aspect-video flex items-center justify-center group"
                    >
                        {/* Abstract UI representation */}
                        <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-950" />

                        {/* Glass Highlight */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 w-full px-8">
                            <div className="flex justify-between items-end mb-4">
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-8 w-32 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-6 w-16 bg-green-500/20 border border-green-500/30 text-green-400 text-xs flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                                    +12.5%
                                </div>
                            </div>
                            {/* Simulated Chart */}
                            <div className="flex items-end justify-between h-32 gap-2">
                                {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-full bg-indigo-500/20 rounded-t-sm relative group-hover:bg-indigo-500/80 transition-all duration-500"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute top-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)]"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <Layout title="Home">
            <HeroSection />
            <FeaturesSection />
            <DashboardPreview />
        </Layout>
    );
}
