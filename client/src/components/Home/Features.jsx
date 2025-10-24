import React from 'react'
import Title from './Title';
import Zap from 'lucide-react/dist/esm/icons/zap';

const Features = () => {

    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>
        
            <div
                className="flex items-center gap-2 text-sm rounded-full px-4 py-1"
                style={{ color: '#c01219', backgroundColor: 'rgba(192,18,25,0.08)', border: '1px solid rgba(192,18,25,0.18)' }}
            >
                <Zap width={14} height={14} />
                <span>Simple Process </span>
            </div>

            <Title
                title='Build your resume'
                description='Create a professional resume in minutes — customizable templates, live preview, and ATS-friendly formatting.'
            />
        
        
            <div className="flex flex-col md:flex-row items-center justify-center">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="feature illustration" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className="p-6 feature-card flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c01219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Real-Time Preview</h3>
                                <p className="text-sm text-slate-600 max-w-xs">See changes as you edit — instant live preview to perfect layout and content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 feature-card flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c01219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Secure Cloud Storage</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Save and access your resumes securely from anywhere with encrypted cloud backups.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 feature-card flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c01219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Customizable Templates</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Choose and personalize ATS-friendly templates to match your industry and experience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }

                /* Accent color: #c01219 */
                .feature-card {
                    border: 1px solid transparent;
                    transition: background-color .2s, border-color .2s;
                }
                .feature-card:hover {
                    background-color: rgba(192,18,25,0.08);
                    border-color: rgba(192,18,25,0.18);
                }
                .feature-card svg {
                    stroke: #c01219;
                    color: #c01219;
                }
            `}</style>
        </div>
    );
};


export default Features