import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="w-full text-white" style={{ background: `linear-gradient(to bottom, var(--textlight), var(--background))` }}>
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="ResumeLab" className="h-11"
                        src="/src/assets/Logo.png" />
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Create stunning, ATS-friendly resumes in minutes. ResumeLab empowers job seekers with intelligent templates, 
                    live preview, and professional formatting to land your dream job.
                </p>
            </div>
            <div className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="/" className="hover:opacity-80 transition">ResumeLab</a> ©2025. Project rights reserved.
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer