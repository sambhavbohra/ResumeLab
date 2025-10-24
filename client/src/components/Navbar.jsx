import React from 'react'
import logo from '../assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {

   const {user} = useSelector(state => state.auth)
   const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutUser = ()=>{
        navigate('/')
        dispatch(logout())
    }

  return (
    <div className='shadow bg-white'>
        <style>{`
            @keyframes rotate {
                0% {
                    transform: rotate(70deg);
                }

                50% {
                    transform: rotate(100deg);
                }

                100% {
                    transform: rotate(70deg);
                }
            }

            .rainbow::before {
                content: '';
                position: absolute;
                z-index: -2;
                left: -50%;
                top: -50%;
                width: 200%;
                height: 200%;
                background-position: 100% 50%;
                background-repeat: no-repeat;
                background-size: 50% 30%;
                filter: blur(6px);
                background-image: linear-gradient(#FFF);
                animation: rotate 4s ease-in-out infinite;
            }
        `}</style>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
                <img src={logo} alt="logo" className="h-11 w-auto" />
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>Hi, {user?.name}</p>
                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                    <button onClick={logoutUser} className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar