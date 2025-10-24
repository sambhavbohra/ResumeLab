import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'

const Login = () => {

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get('state');

  const [state, setState] = React.useState(urlState || "login")

  const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: ''
  })

  const handleSubmit = async (e) => {
      e.preventDefault()

  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <style>{`
        .button-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .button-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: conic-gradient(from 0deg, var(--textdark), var(--background), var(--gradientend), var(--textlight), var(--background), var(--textdark));
          animation: spin-gradient 6s linear infinite;
          border-radius: 9999px;
          z-index: 0;
        }

        @keyframes spin-gradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .button-wrapper button {
          position: relative;
          z-index: 10;
          background: white;
          color: var(--textdark);
          border: none;
        }

        .button-wrapper button:hover {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>

       <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className=" text-3xl mt-10 font-medium" style={{ color: 'var(--textdark)' }}>{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User2Icon size={16} style={{ color: 'var(--textlight)' }}/>
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail size={13} style={{ color: 'var(--textlight)' }}/>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock size={13} style={{ color: 'var(--textlight)' }}/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left">
                    <button className="text-sm" type="reset" style={{ color: 'var(--textdark)' }}>Forget password?</button>
                </div>
                <div className="mt-6 mb-11">
                    <div className="button-wrapper p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100">
                        <button type="submit" className="w-full rounded-full px-8 py-2.5 font-medium text-sm">
                            {state === "login" ? "Login" : "Sign up"}
                        </button>
                    </div>
                </div>
                
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="hover:underline" style={{ color: 'var(--textdark)' }}>click here</a></p>
            </form>
    </div>
  )
}

export default Login