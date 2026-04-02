import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#ec5b13]/5"></div>
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="glass-effect p-12 lg:p-20 rounded-[3rem] border border-slate-200 text-center flex flex-col items-center gap-8 bg-white/50">
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                        Ready to elevate <br />your <span className="text-[#ec5b13]">career?</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-xl">
                        Join 50,000+ professionals using ResumeLab's premium Midnight Glass templates and land your dream job today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link to="/register" className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-[#ec5b13]/40 transition-all flex items-center justify-center gap-2">
                            Get Started for Free <span className="material-symbols-outlined">rocket_launch</span>
                        </Link>
                        <Link to="/register" className="bg-slate-900 text-white font-bold px-10 py-5 rounded-2xl transition-all">
                            View Premium Templates
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction