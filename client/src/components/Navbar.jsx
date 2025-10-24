import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = {name: "Arun"}
    const navigate = useNavigate();

    const logoutUser = () => {
        navigate('/')
    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
                <img src="/src/assets/Logo.png" alt="logo" className="h-11 w-auto" />
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden' style={{ color: 'var(--textdark)' }}>Hi, {user?.name}</p>
                <button onClick={ logoutUser } className='text-white rounded-full px-7 py-1.5 active:scale-95 transition-all font-medium' style={{ backgroundColor: 'var(--textdark)' }}>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar