import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { Loader2, Search, CheckCircle, XCircle, AlertCircle, Sparkles, ArrowRight, PlusIcon } from 'lucide-react';
import getErrorMessage from '../utils/errorHandler';

const ATSChecker = () => {
    const { token } = useSelector(state => state.auth);
    const [allResumes, setAllResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState(null);

    useEffect(() => {
        loadAllResumes();
    }, []);

    const loadAllResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
            setAllResumes(data.resumes);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResumeId) return toast.error('Please select a resume');
        if (!jobDescription.trim()) return toast.error('Please provide a job description');

        const selectedResume = allResumes.find(r => r._id === selectedResumeId);
        
        setIsAnalyzing(true);
        setAnalysisResults(null);
        try {
            const { data } = await api.post('/api/ai/analyze-ats', 
                { resumeData: selectedResume, jobDescription }, 
                { headers: { Authorization: token } }
            );
            setAnalysisResults(data);
            toast.success('Analysis complete!');
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-10 font-sans selection:bg-[#ec5b13]/30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">ATS <span className="text-[#ec5b13]">Checker</span></h1>
                        <p className="text-slate-600">Analyze how well your resume matches the job description using AI.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Input Column */}
                    <div className="space-y-8">
                        {/* Resume Selection */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                            <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">1. Select Your Resume</label>
                            <div className="grid grid-cols-1 gap-3">
                                {allResumes.length === 0 ? (
                                    <p className="text-slate-500 italic">No resumes found. Go to dashboard to create one.</p>
                                ) : (
                                    allResumes.map((resume) => (
                                        <button
                                            key={resume._id}
                                            onClick={() => setSelectedResumeId(resume._id)}
                                            className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                                                selectedResumeId === resume._id 
                                                ? 'border-[#ec5b13] bg-white shadow-lg' 
                                                : 'border-transparent bg-white/50 hover:bg-white hover:border-slate-200'
                                            }`}
                                        >
                                            <div>
                                                <p className="font-bold text-slate-900">{resume.title}</p>
                                                <p className="text-xs text-slate-500 italic">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                selectedResumeId === resume._id 
                                                ? 'bg-[#ec5b13] border-[#ec5b13]' 
                                                : 'border-slate-300 group-hover:border-[#ec5b13]'
                                            }`}>
                                                {selectedResumeId === resume._id && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Job Description Input */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                            <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">2. Paste Job Description</label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the full job description here..."
                                className="w-full h-80 p-6 rounded-2xl border border-slate-200 bg-white shadow-inner focus:ring-2 focus:ring-[#ec5b13] outline-none transition-all resize-none text-slate-900"
                            />
                        </div>

                        <button
                            disabled={isAnalyzing || !selectedResumeId || !jobDescription}
                            onClick={handleAnalyze}
                            className="w-full h-16 bg-[#ec5b13] text-white font-black text-xl rounded-2xl shadow-xl shadow-[#ec5b13]/30 hover:shadow-[#ec5b13]/50 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3 uppercase tracking-widest"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={24} />
                                    Run Analysis
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Column */}
                    <div>
                        {!analysisResults && !isAnalyzing && (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50">
                                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-8">
                                    <Search className="text-slate-300" size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-400 mb-4">No Analysis Results</h2>
                                <p className="text-slate-400 max-w-xs leading-relaxed">Select a resume and paste a job description to see your ATS compatibility score.</p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-[3rem] border border-slate-200 bg-white">
                                <div className="relative">
                                    <div className="w-24 h-24 border-8 border-slate-100 border-t-[#ec5b13] rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="text-[#ec5b13]" size={32} />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-2">Analyzing your profile</h2>
                                <p className="text-slate-500">Checking keywords, skills, and formatting compatibility...</p>
                            </div>
                        )}

                        {analysisResults && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                                {/* Score Card */}
                                <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-12 opacity-10">
                                        <Sparkles size={120} />
                                    </div>
                                    <div className="flex items-center gap-8 mb-8">
                                        <div className="relative">
                                            <svg className="w-24 h-24 transform -rotate-90">
                                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={263.89} strokeDashoffset={263.89 - (263.89 * analysisResults.score) / 100} className="text-[#ec5b13] transition-all duration-1000 ease-out" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-black">{analysisResults.score}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black mb-1">Match Score</h3>
                                            <p className="text-slate-400 text-sm">{analysisResults.score > 80 ? 'Excellent compatibility!' : analysisResults.score > 60 ? 'Good potential, needs some polish.' : 'Significant improvements recommended.'}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg leading-relaxed text-slate-200 italic">"{analysisResults.matchAnalysis}"</p>
                                </div>

                                {/* Skills Grid */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-2 mb-6 text-green-600">
                                            <CheckCircle size={20} />
                                            <span className="font-bold uppercase tracking-widest text-xs">Identified Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {analysisResults.skills.found.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">{skill}</span>
                                            ))}
                                            {analysisResults.skills.found.length === 0 && <span className="text-slate-400 italic text-sm">None identified</span>}
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-2 mb-6 text-red-500">
                                            <XCircle size={20} />
                                            <span className="font-bold uppercase tracking-widest text-xs">Missing Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {analysisResults.skills.missing.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100">{skill}</span>
                                            ))}
                                            {analysisResults.skills.missing.length === 0 && <span className="text-slate-400 italic text-sm">None missing!</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Suggestions */}
                                <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-8 text-[#ec5b13]">
                                        <AlertCircle size={24} />
                                        <h3 className="text-xl font-bold uppercase tracking-tight">AI Suggestions to Improve Score</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {analysisResults.suggestions.map((s, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-2 h-2 rounded-full bg-[#ec5b13] mt-2 shrink-0"></div>
                                                <div>
                                                    <h4 className="font-black text-slate-800 leading-tight mb-1">{s.title}</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="p-8 rounded-3xl bg-[#ec5b13]/5 border border-[#ec5b13]/10">
                                    <h4 className="font-bold text-[#ec5b13] mb-4 text-sm uppercase tracking-widest">Recommended Keywords</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisResults.keywords.map((kw, i) => (
                                            <span key={i} className="bg-white px-4 py-2 rounded-xl text-xs font-black text-slate-700 shadow-sm border border-slate-200 flex items-center gap-2">
                                                <PlusIcon size={12} className="text-[#ec5b13]" /> {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATSChecker;
