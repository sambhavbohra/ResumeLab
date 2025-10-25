import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div>
        <div id ='cta' className='border-y border-dashed w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28' style={{ borderColor: `var(--background)` }}>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed py-16 sm:py-20 -mt-10 -mb-10 w-full" style={{ borderColor: `var(--background)` }}>
                <p className="text-xl font-medium max-w-md" style={{ color: 'black' }}>Build a professional resume that helps you stand out and get hired</p>
        <Link to="/app?state=register" className="flex items-center gap-2 rounded py-3 px-8 hover:shadow-lg transition text-white" style={{ backgroundColor: 'var(--textdark)' }}>
                    <span>Get started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
            </div>
        </div>
    </div>
  )
}

export default CallToAction