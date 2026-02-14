import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from "@/Components/client/UI/Form-InputField";

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia automatically attaches the CSRF token here
        post('/login');
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30 flex items-center justify-center">
            <div className="flex items-center justify-center min-h-[80vh] px-4 w-1/3">
                <Head title='Login'/>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400 text-sm">Sign in to continue to your dashboard</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6 relative z-10">
                            <InputField
                                label="Email Address"
                                type="email"
                                placeholder="name@company.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                icon={Mail}
                                error={errors.email} // Passing the error
                            />

                            <InputField
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                icon={Lock}
                                error={errors.password} // Passing the error
                            />

                            <button className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group cursor-pointer">
                                Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account? {' '}
                            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                                Sign up for free
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
