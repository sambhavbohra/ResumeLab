import React from 'react'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="py-16 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/favicon.svg" alt="ResumeLab Logo" className="h-8 w-8" />
                            <h2 className="text-lg font-extrabold tracking-tight">Resume<span className="text-[#ec5b13]">Lab</span></h2>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            The world's most advanced resume builder for modern professionals. Powered by AI, designed for impact.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Resume Builder</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Cover Letter Creator</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">AI Content Writer</a></li>
                            <li><Link className="hover:text-[#ec5b13] transition-colors" to="/app/ats-checker">ATS Checker</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Contact</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link className="hover:text-[#ec5b13] transition-colors" to="/help-center">Help Center</Link></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Resume Guides</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Expert Reviews</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">API Access</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 ResumeLab. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-[#ec5b13] transition-colors" href="#">Twitter</a>
                        <a className="hover:text-[#ec5b13] transition-colors" href="#">LinkedIn</a>
                        <a className="hover:text-[#ec5b13] transition-colors" href="#">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer