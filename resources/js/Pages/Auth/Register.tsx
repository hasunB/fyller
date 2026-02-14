import React, { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import InputField from "@/Components/client/UI/Form-InputField";

export default function Register() {
    // Initialize Inertia Form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Ensure you have a route named 'register' in web.php
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30 flex items-center justify-center">
            <Head title='Register' />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative background glow */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full -ml-16 -mt-16 pointer-events-none"></div>

                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400 text-sm">Start forecasting your sales intelligently</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5 relative z-10">
                        <InputField
                            id="name"
                            label="Full Name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
                            icon={User}
                            error={errors.name}
                            required
                        />

                        <InputField
                            id="email"
                            label="Email Address"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="name@company.com"
                            icon={Mail}
                            error={errors.email}
                            required
                        />

                        <InputField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Create a password"
                            icon={Lock}
                            error={errors.password}
                            required
                        />

                        <InputField
                            id="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Repeat password"
                            icon={Lock}
                            error={errors.password_confirmation}
                            required
                        />

                        <div className="flex items-start gap-3 mt-4">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                className="w-4 h-4 mt-1 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>.
                            </label>
                        </div>

                        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
                        >
                            {processing ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account? {' '}
                        <Link href={'/login'} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}