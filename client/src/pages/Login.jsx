import { Lock, Mail, User2Icon, ShieldCheck, Loader2 } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")
    const [registrationStep, setRegistrationStep] = React.useState(1) // 1: email, 2: OTP, 3: details
    const [loading, setLoading] = React.useState(false)
    const [emailVerified, setEmailVerified] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        otp: ''
    })

    const [passwordErrors, setPasswordErrors] = React.useState([])

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
        if (state === 'register') {
            setPasswordErrors(validatePassword(value))
        }
    }

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
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
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
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
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
            const { data } = await api.post('/api/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    // Login submission
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
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const switchMode = () => {
        setState(prev => prev === "login" ? "register" : "login")
        setRegistrationStep(1)
        setEmailVerified(false)
        setFormData({ name: '', email: '', password: '', otp: '' })
        setPasswordErrors([])
    }

    // Render registration form based on step
    const renderRegistrationForm = () => {
        if (registrationStep === 1) {
            return (
                <form onSubmit={handleSendOtp}>
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">Sign up</h1>
                    <p className="text-gray-500 text-sm mt-2">Enter your email to get started</p>
                    <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Mail size={13} color="#6B7280" />
                        <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 flex-1" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="relative inline-block w-full mt-6 p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_var(--textdark),_color-mix(in_srgb,_var(--textdark)_30%,_transparent),_var(--textdark))] button-wrapper">
                        <button type="submit" disabled={loading} className="relative z-10 rounded-full px-8 py-3 font-medium text-sm w-full text-white bg-[var(--textlight)] flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </div>
                    <p onClick={switchMode} className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">Already have an account? <span className="hover:underline" style={{ color: 'var(--textdark)' }}>click here</span></p>
                </form>
            )
        }

        if (registrationStep === 2) {
            return (
                <form onSubmit={handleVerifyOtp}>
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">Verify Email</h1>
                    <p className="text-gray-500 text-sm mt-2">Enter the OTP sent to {formData.email}</p>
                    <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <ShieldCheck size={13} color="#6B7280" />
                        <input type="text" name="otp" placeholder="Enter 6-digit OTP" className="border-none outline-none ring-0 flex-1 tracking-widest text-center" value={formData.otp} onChange={handleChange} maxLength={6} required />
                    </div>
                    <div className="relative inline-block w-full mt-6 p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_var(--textdark),_color-mix(in_srgb,_var(--textdark)_30%,_transparent),_var(--textdark))] button-wrapper">
                        <button type="submit" disabled={loading} className="relative z-10 rounded-full px-8 py-3 font-medium text-sm w-full text-white bg-[var(--textlight)] flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-3 cursor-pointer" onClick={handleSendOtp}>Didn't receive OTP? <span className="hover:underline" style={{ color: 'var(--textdark)' }}>Resend</span></p>
                    <p onClick={() => setRegistrationStep(1)} className="text-gray-500 text-sm mt-2 mb-11 cursor-pointer"><span className="hover:underline" style={{ color: 'var(--textdark)' }}>Change email</span></p>
                </form>
            )
        }

        return (
            <form onSubmit={handleRegister}>
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">Complete Signup</h1>
                <p className="text-gray-500 text-sm mt-2">Email verified! Enter your details</p>
                <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <User2Icon size={16} color='#6B7280'/>
                    <input type="text" name="name" placeholder="Full Name" className="border-none outline-none ring-0 flex-1" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock size={13} color="#6B7280"/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 flex-1" value={formData.password} onChange={handlePasswordChange} required />
                </div>
                {formData.password && passwordErrors.length > 0 && (
                    <div className="mt-3 text-left text-xs">
                        <p className="text-gray-500 mb-1">Password must have:</p>
                        {passwordErrors.map((error, i) => (
                            <p key={i} className="text-red-500">• {error}</p>
                        ))}
                    </div>
                )}
                {formData.password && passwordErrors.length === 0 && (
                    <p className="mt-2 text-left text-xs text-green-600">✓ Password meets all requirements</p>
                )}
                <div className="relative inline-block w-full mt-6 p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_var(--textdark),_color-mix(in_srgb,_var(--textdark)_30%,_transparent),_var(--textdark))] button-wrapper">
                    <button type="submit" disabled={loading || passwordErrors.length > 0} className="relative z-10 rounded-full px-8 py-3 font-medium text-sm w-full text-white bg-[var(--textlight)] flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
                <p onClick={switchMode} className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">Already have an account? <span className="hover:underline" style={{ color: 'var(--textdark)' }}>click here</span></p>
            </form>
        )
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
            <style>{`
                .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                }

                @keyframes spin-gradient {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                {state === "login" ? (
                    <form onSubmit={handleLogin}>
                        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
                        <p className="text-gray-500 text-sm mt-2">Please login to continue</p>
                        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <Mail size={13} color="#6B7280" />
                            <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 flex-1" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <Lock size={13} color="#6B7280"/>
                            <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 flex-1" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mt-4 text-left" style={{ color: 'var(--textdark)' }}>
                            <button className="text-sm" type="button">Forget password?</button>
                        </div>
                        <div className="relative inline-block w-full mt-2 p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_var(--textdark),_color-mix(in_srgb,_var(--textdark)_30%,_transparent),_var(--textdark))] button-wrapper">
                            <button type="submit" disabled={loading} className="relative z-10 rounded-full px-8 py-3 font-medium text-sm w-full text-white bg-[var(--textlight)] flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <p onClick={switchMode} className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">Don't have an account? <span className="hover:underline" style={{ color: 'var(--textdark)' }}>click here</span></p>
                    </form>
                ) : (
                    renderRegistrationForm()
                )}
            </div>
        </div>
    )
}

export default Login