import React from 'react'
import { FileText } from 'lucide-react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <section className="relative overflow-hidden hero-gradient">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/favicon.svg" alt="ResumeLab Logo" className="h-10 w-10" />
                        <h2 className="text-xl font-extrabold tracking-tight">Resume<span className="text-[#ec5b13]">Lab</span></h2>
                    </Link>
                    <div className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold hover:text-[#ec5b13] transition-colors" href="#features">Templates</a>
                        <a className="text-sm font-semibold hover:text-[#ec5b13] transition-colors" href="#features">AI Features</a>
                        <Link className="text-sm font-semibold hover:text-[#ec5b13] transition-colors" to="/register">Pricing</Link>
                        <Link className="text-sm font-semibold hover:text-[#ec5b13] transition-colors" to="/help-center">Help Center</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-all">Log In</Link>
                                <Link to="/register" className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#ec5b13]/20 transition-all">
                                    Build My Resume
                                </Link>
                            </>
                        ) : (
                            <Link to="/app" className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#ec5b13]/20 transition-all">
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366f1] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366f1]"></span>
                        </span>
                        <span className="text-xs font-bold text-[#6366f1] uppercase tracking-wider">New Midnight Glass Editor</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
                        Design a Resume That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#14b8a6]">Lands the Interview</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                        Experience the future of career building. High-energy templates with Electric Indigo accents and real-time AI content optimization.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={user ? "/app" : "/register"} className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-[#ec5b13]/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
                            Start Building Now <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <button className="glass-effect bg-white/5 hover:bg-slate-100 font-bold text-lg px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all">
                            View 50+ Templates
                        </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex -space-x-3">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                        </div>
                        <span>Join 50,000+ professionals today</span>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#14b8a6] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                        <div className="w-full aspect-[4/5] bg-slate-50">
                            <div className="p-8 h-full flex flex-col gap-6">
                                <div className="h-8 w-1/3 bg-slate-200 rounded-lg"></div>
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                                    <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                                    <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 border-dashed"></div>
                                    <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 border-dashed"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Floating Element */}
                    <div className="absolute -bottom-6 -left-6 glass-effect bg-white/80 p-6 rounded-2xl shadow-2xl border border-white/20 hidden md:block">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-[#14b8a6]/20 rounded-lg">
                                <span className="material-symbols-outlined text-[#14b8a6]">bolt</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Live Rendering</p>
                                <p className="text-xs opacity-60">Optimized for ATS 9.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero