'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            // Replicating the archive behavior: redirect to the student portal
            window.location.href = 'https://student-portal-sooty-five.vercel.app';
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#667eea_0%,#764ba2_50%,#f093fb_100%)] p-4 relative overflow-hidden font-sans">
            {/* Animated Background Overlay */}
            <div
                className="absolute inset-0 z-0 animate-pulse"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                }}
            ></div>

            <div
                className={`bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-[450px] w-full relative z-10 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] font-outfit mb-2">
                        Novantix Innovation Technology
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Industry-Ready Skills • Real-World Projects • Certification
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mt-6 mb-2 font-outfit">Welcome Back!</h2>
                <p className="text-[0.95rem] text-slate-500 mb-8">Login to access your student portal</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@example.com"
                            required
                            className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base font-inter transition-all duration-300 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-[3px] focus:ring-indigo-500/10 text-slate-900"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base font-inter transition-all duration-300 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-[3px] focus:ring-indigo-500/10 text-slate-900"
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-[1.125rem] h-[1.125rem] cursor-pointer accent-indigo-600 rounded"
                        />
                        <label htmlFor="remember" className="text-sm text-slate-500 cursor-pointer">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white text-base font-semibold rounded-xl font-inter cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                    >
                        Login to Portal
                    </button>
                </form>

                <div className="text-center relative my-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-full before:h-px before:bg-slate-200">
                    <span className="bg-white px-4 text-slate-400 text-sm relative z-10">or</span>
                </div>

                <div className="text-center text-sm text-slate-500">
                    Don't have an account? <Link href="/#contact" className="text-indigo-500 font-semibold hover:underline decoration-2 underline-offset-2">Contact Us to Enroll</Link>
                </div>

                <div className="text-center mt-4">
                    <Link href="/" className="text-violet-500 no-underline text-sm font-medium transition-colors duration-300 hover:text-indigo-500">
                        ← Back to Home
                    </Link>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-slate-200 text-xs text-slate-400">
                    <p>&copy; 2026 Novantix Innovation Technology. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}
