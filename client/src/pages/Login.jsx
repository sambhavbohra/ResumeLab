import { Eye, EyeOff, Lock, Mail, Loader2, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import getErrorMessage from '../utils/errorHandler'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/users/google-login', {
                token: credentialResponse.credential
            });
            dispatch(login(data));
            localStorage.setItem('token', data.token);
            toast.success(data.message);
            navigate('/app');
        } catch (error) {
            toast.error(getErrorMessage(error) || "Google Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await api.post('/api/users/login', {
                email: formData.email,
                password: formData.password
            })
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
            navigate('/app');
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-[#f8f6f6] min-h-screen flex flex-col font-sans selection:bg-[#ec5b13]/30">
            {/* Background Glow Effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#ec5b13]/10 blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}></div>
            </div>

            {/* Navigation */}
            <header className="relative z-10 w-full px-6 py-6 lg:px-20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="text-[#ec5b13]">
                        <FileText size={40} strokeWidth={1.5} />
                    </div>
                    <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">
                        Resume<span className="text-[#ec5b13]">Lab</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <span className="text-slate-600 text-sm">New to ResumeLab?</span>
                    <Link to="/register" className="px-5 py-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/20 transition-all font-semibold text-sm">
                        Create Account
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[480px]">
                    {/* Login Card */}
                    <div className="bg-white/70 backdrop-blur-[16px] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                            <p className="text-slate-600">Continue building your professional future.</p>
                        </div>
                        
                        {/* Social Login */}
                        <div className="w-full flex justify-center mb-6">
                                <GoogleLogin
                                    theme="outline"
                                    width={350}
                                    size="large"
                                    text="signin_with"
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={() => { toast.error('Google Login Failed') }}
                                />
                            </div>
                            
                        <div className="relative flex items-center py-2 mb-6">
                                <div className="flex-grow border-t border-slate-200"></div>
                                <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-400">or use email</span>
                                <div className="flex-grow border-t border-slate-200"></div>
                            </div>
                            
                            <form className="space-y-6" onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="relative">
                                <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input 
                                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                        placeholder="name@company.com" 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <Link className="text-xs font-bold text-[#ec5b13] hover:text-[#ec5b13]/80" to="/reset-password">Forgot Password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input 
                                        className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                        placeholder="••••••••" 
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <button 
                                disabled={loading}
                                className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0" 
                                type="submit"
                            >
                                {loading && <Loader2 className="animate-spin" size={18} />}
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center md:hidden">
                            <p className="text-sm text-slate-600">
                                Don't have an account? 
                                <Link className="text-[#ec5b13] font-bold ml-1" to="/register">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login