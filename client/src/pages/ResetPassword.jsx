import { Eye, EyeOff, Lock, Mail, Loader2, FileText, ShieldCheck } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'
import getErrorMessage from '../utils/errorHandler'
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1: email, 2: OTP, 3: new password
    const [loading, setLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (resendTimer <= 0) return
        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [resendTimer])

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    })

    const [passwordErrors, setPasswordErrors] = useState([])

    const validatePassword = (password) => {
        const errors = []
        if (password.length < 8) errors.push('At least 8 characters')
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter')
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter')
        if (!/[0-9]/.test(password)) errors.push('One number')
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character')
        return errors
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target
        setFormData(prev => ({ ...prev, newPassword: value }))
        setPasswordErrors(validatePassword(value))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSendOtp = async (e) => {
        e.preventDefault()
        if (!formData.email) {
            toast.error('Please enter your email')
            return
        }
        setLoading(true)
        try {
            const { data } = await api.post('/api/users/send-otp', { email: formData.email, isPasswordReset: true })
            // Adding a boolean isPasswordReset allows backend customization later if needed, but works with current api since it ignores extra fields.
            toast.success("Magic code sent to your email!")
            setStep(2)
            setResendTimer(60)
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        if (!formData.otp) {
            toast.error('Please enter the OTP')
            return
        }
        setLoading(true)
        try {
            const { data } = await api.post('/api/users/verify-otp', {
                email: formData.email,
                otp: formData.otp
            })
            toast.success(data.message)
            setStep(3)
            if (data.registrationToken) {
                sessionStorage.setItem('resetToken', data.registrationToken);
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        const errors = validatePassword(formData.newPassword)
        if (errors.length > 0) {
            toast.error('Please fix password requirements')
            return
        }
        setLoading(true)
        try {
            const resetToken = sessionStorage.getItem('resetToken');
            const { data } = await api.post('/api/users/reset-password', {
                newPassword: formData.newPassword
            }, {
                headers: {
                    'x-registration-token': resetToken || ''
                }
            })
            sessionStorage.removeItem('resetToken');
            toast.success(data.message)
            navigate('/login');
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-[#f8f6f6] min-h-screen flex flex-col font-sans selection:bg-[#ec5b13]/30">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#ec5b13]/10 blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}></div>
            </div>

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
                    <span className="text-slate-600 text-sm">Remembered it?</span>
                    <Link to="/login" className="px-5 py-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/20 transition-all font-semibold text-sm">
                        Log In
                    </Link>
                </div>
            </header>

            <main className="relative z-10 flex-1 flex items-center justify-center p-6 mt-[-40px]">
                <div className="w-full max-w-[480px]">
                    <div className="bg-white/70 backdrop-blur-[16px] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        
                        {step === 1 && (
                            <>
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Reset Password</h2>
                                    <p className="text-slate-600">Enter your email and we'll send you a recovery code.</p>
                                </div>
                                <form className="space-y-6" onSubmit={handleSendOtp}>
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
                                    
                                    <button 
                                        disabled={loading}
                                        className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0" 
                                        type="submit"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={18} />}
                                        {loading ? 'Sending Code...' : 'Send Magic Code'}
                                    </button>
                                </form>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Verify Email</h2>
                                    <p className="text-slate-600">Enter the magic code sent to <span className="font-semibold">{formData.email}</span></p>
                                </div>
                                <form className="space-y-6" onSubmit={handleVerifyOtp}>
                                    <div className="relative">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">6-Digit Code</label>
                                        <div className="relative">
                                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input 
                                                className="w-full h-14 pl-12 pr-4 text-center tracking-[0.5em] font-mono text-xl rounded-xl border border-slate-200 bg-white/50 text-slate-900 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                                placeholder="000000" 
                                                type="text"
                                                name="otp"
                                                maxLength={6}
                                                value={formData.otp}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        disabled={loading}
                                        className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0" 
                                        type="submit"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={18} />}
                                        {loading ? 'Verifying...' : 'Verify Code'}
                                    </button>
                                    
                                    <div className="flex flex-col items-center gap-2 mt-4">
                                        {resendTimer > 0 ? (
                                            <p className="text-slate-500 text-sm">Resend code in <span className="font-semibold text-[#ec5b13]">{resendTimer}s</span></p>
                                        ) : (
                                            <button type="button" className="text-sm font-semibold text-[#ec5b13] hover:text-[#ec5b13]/80" onClick={handleSendOtp}>Didn't receive it? Resend Code</button>
                                        )}
                                        <button type="button" onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 text-sm underline decoration-slate-300 underline-offset-4 mt-2">Change email address</button>
                                    </div>
                                </form>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Create New Password</h2>
                                    <p className="text-slate-600">Please enter a strong new password.</p>
                                </div>
                                <form className="space-y-6" onSubmit={handleResetPassword}>
                                    <div className="relative">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">New Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input 
                                                className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                                placeholder="••••••••" 
                                                type={showPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handlePasswordChange}
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
                                        {formData.newPassword && passwordErrors.length > 0 && (
                                            <div className="mt-3 text-left text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                                                <p className="text-red-800 mb-1 font-semibold">Password Requirements:</p>
                                                {passwordErrors.map((error, i) => (
                                                    <p key={i} className="text-red-500">• {error}</p>
                                                ))}
                                            </div>
                                        )}
                                        {formData.newPassword && passwordErrors.length === 0 && (
                                            <p className="mt-3 text-left text-xs font-semibold text-green-600 bg-green-50 p-2 rounded-lg border border-green-100 flex items-center gap-1">✓ Perfect password</p>
                                        )}
                                    </div>
                                    
                                    <button 
                                        disabled={loading || passwordErrors.length > 0}
                                        className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:shadow-none" 
                                        type="submit"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={18} />}
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </form>
                            </>
                        )}
                        <div className="mt-8 text-center md:hidden">
                            <p className="text-sm text-slate-600">
                                Remembered it? 
                                <Link className="text-[#ec5b13] font-bold ml-1" to="/login">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ResetPassword
