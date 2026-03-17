import React from 'react'
import Title from './Title';
import Zap from 'lucide-react/dist/esm/icons/zap';

const Features = () => {
    return (
        <section id="features" className="py-24 bg-slate-50 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-20">
                    <h2 className="text-[#ec5b13] font-bold uppercase tracking-widest text-sm mb-4">Powerful Innovation</h2>
                    <h3 className="text-4xl lg:text-5xl font-black mb-6">Live Preview, Real Results</h3>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Our high-end SaaS platform uses backdrop-blur-xl effects and AI-driven insights to make your profile stand out from the crowd.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#6366f1]/40 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[#6366f1] text-3xl">preview</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">Real-time Rendering</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Watch your resume evolve as you type with our proprietary Live Preview engine. Instant feedback on every stroke.
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#14b8a6]/40 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-[#14b8a6]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[#14b8a6] text-3xl">psychology</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">AI & ATS Analysis</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Smart suggestions and a full ATS Compatibility Checker powered by AI to ensure your resume beats the bots and reaches the hiring manager.
                        </p>
                    </div>
                    {/* Feature 3 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#ec5b13]/40 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-[#ec5b13]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[#ec5b13] text-3xl">auto_awesome</span>
                        </div>
                        <h4 className="text-xl font-bold mb-4">Electric Themes</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Stunning midnight aesthetics that use glassmorphism to create a premium, high-energy profile that gets noticed.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Features