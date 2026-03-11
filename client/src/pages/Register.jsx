import { Eye, EyeOff, Lock, Mail, Loader2, FileText, User2Icon, ShieldCheck } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import getErrorMessage from '../utils/errorHandler'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registrationStep, setRegistrationStep] = useState(1) // 1: email, 2: OTP, 3: details
    const [loading, setLoading] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)
    const [showPassword, setShowPassword] = useState(false)

    // Countdown effect for resend OTP timer
    useEffect(() => {
        if (resendTimer <= 0) return
        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [resendTimer])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: ''
    })

    const [passwordErrors, setPasswordErrors] = useState([])

    // Password validation function
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
        setFormData(prev => ({ ...prev, password: value }))
        setPasswordErrors(validatePassword(value))
    }

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

    // Send OTP for email verification
    const handleSendOtp = async (e) => {
        e.preventDefault()
        if (!formData.email) {
            toast.error('Please enter your email')
            return
        }
        setLoading(true)
        try {
            const { data } = await api.post('/api/users/send-otp', { email: formData.email })
            toast.success(data.message)
            setRegistrationStep(2)
            setResendTimer(60)
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    // Verify OTP
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
            setEmailVerified(true)
            setRegistrationStep(3)
            // Store the temporary registration token for the final step
            if (data.registrationToken) {
                sessionStorage.setItem('registrationToken', data.registrationToken);
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    // Complete registration
    const handleRegister = async (e) => {
        e.preventDefault()
        if (!emailVerified) {
            toast.error('Please verify your email first')
            return
        }
        const errors = validatePassword(formData.password)
        if (errors.length > 0) {
            toast.error('Please fix password requirements')
            return
        }
        setLoading(true)
        try {
            const registrationToken = sessionStorage.getItem('registrationToken');
            const { data } = await api.post('/api/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'x-registration-token': registrationToken || ''
                }
            })
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            sessionStorage.removeItem('registrationToken'); // Cleanup
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
                    <span className="text-slate-600 text-sm">Already have an account?</span>
                    <Link to="/login" className="px-5 py-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/20 transition-all font-semibold text-sm">
                        Log In
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-6 mt-[-40px]">
                <div className="w-full max-w-[480px]">
                    {/* Register Card */}
                    <div className="bg-white/70 backdrop-blur-[16px] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        
                        {registrationStep === 1 && (
                            <>
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Join ResumeLab</h2>
                                    <p className="text-slate-600">Start building your professional future.</p>
                                </div>
                                <form className="space-y-6" onSubmit={handleSendOtp}>
                                    {/* Social Login */}
                                    <div className="w-full flex justify-center">
                                        <GoogleLogin
                                            theme="outline"
                                            width={350}
                                            size="large"
                                            text="signup_with"
                                            onSuccess={handleGoogleLoginSuccess}
                                            onError={() => { toast.error('Google Login Failed') }}
                                        />
                                    </div>
                                    
                                    <div className="relative flex items-center py-2">
                                        <div className="flex-grow border-t border-slate-200"></div>
                                        <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-400">or use email</span>
                                        <div className="flex-grow border-t border-slate-200"></div>
                                    </div>
                                    
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
                                    
                                    {/* Submit Button */}
                                    <button 
                                        disabled={loading}
                                        className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0" 
                                        type="submit"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={18} />}
                                        {loading ? 'Sending OTP...' : 'Send Magic Code'}
                                    </button>
                                </form>
                            </>
                        )}

                        {registrationStep === 2 && (
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
                                        <button type="button" onClick={() => setRegistrationStep(1)} className="text-slate-400 hover:text-slate-600 text-sm underline decoration-slate-300 underline-offset-4 mt-2">Change email address</button>
                                    </div>
                                </form>
                            </>
                        )}

                        {registrationStep === 3 && (
                            <>
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">Final Step</h2>
                                    <p className="text-slate-600">Email verified! Let's get to know you.</p>
                                </div>
                                <form className="space-y-6" onSubmit={handleRegister}>
                                    <div className="relative">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">Full Name</label>
                                        <div className="relative">
                                            <User2Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input 
                                                className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                                placeholder="John Doe" 
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">Create Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input 
                                                className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none transition-all" 
                                                placeholder="••••••••" 
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
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
                                        {formData.password && passwordErrors.length > 0 && (
                                            <div className="mt-3 text-left text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                                                <p className="text-red-800 mb-1 font-semibold">Password Requirements:</p>
                                                {passwordErrors.map((error, i) => (
                                                    <p key={i} className="text-red-500">• {error}</p>
                                                ))}
                                            </div>
                                        )}
                                        {formData.password && passwordErrors.length === 0 && (
                                            <p className="mt-3 text-left text-xs font-semibold text-green-600 bg-green-50 p-2 rounded-lg border border-green-100 flex items-center gap-1">✓ Perfect password</p>
                                        )}
                                    </div>
                                    
                                    <button 
                                        disabled={loading || passwordErrors.length > 0}
                                        className="w-full h-14 bg-[#ec5b13] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,91,19,0.3)] hover:shadow-[0_0_25px_rgba(236,91,19,0.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:shadow-none" 
                                        type="submit"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={18} />}
                                        {loading ? 'Creating Account...' : 'Complete Account'}
                                    </button>
                                </form>
                            </>
                        )}

                        <div className="mt-8 text-center md:hidden">
                            <p className="text-sm text-slate-600">
                                Already have an account? 
                                <Link className="text-[#ec5b13] font-bold ml-1" to="/login">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register
