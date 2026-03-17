import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Home/Footer';

const HelpCenter = () => {
    const { user } = useSelector(state => state.auth);

    const categories = [
        { title: 'Getting Started', icon: 'rocket_launch', description: 'Everything you need to know to start building your dream resume.', color: '#6366f1' },
        { title: 'Resume Templates', icon: 'description', description: 'Deep dive into our 50+ ATS-friendly templates and customization options.', color: '#ec5b13' },
        { title: 'AI Assistant', icon: 'psychology', description: 'How to leverage AI for content optimization and impact statements.', color: '#14b8a6' },
        { title: 'Account & Billing', icon: 'payments', description: 'Manage your subscription, invoices, and profile settings.', color: '#6366f1' },
        { title: 'Export & Download', icon: 'download', description: 'Tips for downloading in PDF and sharing your resume with recruiters.', color: '#ec5b13' },
        { title: 'ATS Guidelines', icon: 'format_list_bulleted', description: 'Learn how to pass modern applicant tracking systems with ease.', color: '#14b8a6' },
    ];

    const faqs = [
        { q: "How do I use AI to write my resume?", a: "Simply open any resume in the editor and look for the 'AI Enhance' buttons. Our system will analyze your content and suggest improvements based on industry best practices." },
        { q: "Is ResumeLab free to use?", a: "Yes, we offer a robust free tier with premium templates. For advanced AI features and unlimited downloads, you can upgrade to a Pro account." },
        { q: "Can I download my resume as a PDF?", a: "Absolutely! Once you're done editing, click the 'Download' button in the builder to save your resume as a high-quality PDF." },
        { q: "How do I cancel my subscription?", a: "You can manage your subscription anytime from Account Settings > Billing. Cancellations are instant and you keep access until the end of your period." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-['Public_Sans']">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/favicon.svg" alt="ResumeLab Logo" className="h-10 w-10" />
                        <h2 className="text-xl font-extrabold tracking-tight">Resume<span className="text-[#ec5b13]">Lab</span></h2>
                    </Link>
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <Link to="/login" className="text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-all">Log In</Link>
                        ) : (
                            <Link to="/app" className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#ec5b13]/20 transition-all">
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Search */}
            <section className="relative py-24 overflow-hidden hero-gradient">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">How can we <span className="text-[#ec5b13]">help you</span> today?</h1>
                    <div className="relative group max-w-2xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#14b8a6] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-5 text-slate-400">search</span>
                            <input 
                                type="text" 
                                placeholder="Search for articles, guides, and more..." 
                                className="w-full h-16 pl-14 pr-6 rounded-2xl border border-slate-200 bg-white shadow-xl focus:ring-2 focus:ring-[#ec5b13] outline-none transition-all text-lg"
                            />
                        </div>
                    </div>
                    <p className="mt-8 text-slate-500 font-medium italic">Popular: AI Credits, Template Customization, PDF Export</p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#ec5b13]/30 hover:shadow-2xl hover:shadow-[#ec5b13]/5 transition-all cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: `${cat.color}15` }}>
                                <span className="material-symbols-outlined text-3xl" style={{ color: cat.color }}>{cat.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-[#ec5b13] transition-colors">{cat.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">{cat.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-black mb-12 text-center">Frequently Asked <span className="text-[#ec5b13]">Questions</span></h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#ec5b13] text-sm">help</span>
                                    {faq.q}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed ml-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="glass-effect p-12 lg:p-16 rounded-[3rem] border border-slate-200 bg-white/50 text-center flex flex-col items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <span className="material-symbols-outlined text-[10rem] text-[#ec5b13]">mail</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Still need <span className="text-[#ec5b13]">help?</span></h2>
                        <p className="text-lg text-slate-600 max-w-xl">
                            Email us about anything - our team is here to support your career growth. We typically respond within 24 hours.
                        </p>
                        <a 
                            href="mailto:sambhav.24bcs10090@sst.scaler.com" 
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                        >
                            <span className="material-symbols-outlined">send</span> Contact Developer
                        </a>
                    </div>
                </div>
            </section>

            {/* Feedback */}
            <div className="py-12 border-t border-slate-200 flex flex-col items-center gap-4 text-sm text-slate-400">
                <p>Was this helpful?</p>
                <div className="flex gap-4">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><span className="material-symbols-outlined">thumb_up</span></button>
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><span className="material-symbols-outlined">thumb_down</span></button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HelpCenter;
