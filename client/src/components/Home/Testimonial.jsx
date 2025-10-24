import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {


     const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            name: 'Ananya Sharma',
            handle: '@ananya_sh',
            quote: 'ResumeLab helped me create a clean, professional CV in under 10 minutes — landed interviews within a week!'
        },
        {
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            name: 'Rahul Patel',
            handle: '@rahulpatel',
            quote: 'The templates are very polished and ATS-friendly. I updated my resume and got a response from recruiters quickly.'
        },
        {
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
            name: 'Priya Menon',
            handle: '@priyam',
            quote: 'Simple interface and instant preview — I could tailor my resume for different job applications easily.'
        },
        {
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
            name: 'Vikram Singh',
            handle: '@vikrams',
            quote: 'Great tool for fresher-friendly resumes. The formatting made my profile look much more professional.'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-5 rounded-lg mx-3 shadow-md hover:shadow-lg transition-all duration-200 w-96 shrink-0 bg-white border border-gray-100">
            <div className="flex gap-3 mb-3">
                <img className="size-12 rounded-full" src={card.image} alt="User Image" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-medium text-gray-900">{card.name}</p>
                        <svg className="mt-0.5" style={{ fill: 'var(--textdark)' }} width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--textlight)' }}>{card.handle}</span>
                </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>{card.quote}</p>
        </div>
    );

  return (
    <div>
         <div id='testimonials' className='flex flex-col items-center my-10 scroll-mt-12'>
        
            <div
                className="flex items-center gap-2 text-sm rounded-full px-4 py-1"
                style={{ color: 'var(--textdark)', backgroundColor: 'var(--gradientend)', border: `1px solid ${('var(--textdark)')}`  }}
            >
                <BookUserIcon size={18} color="var(--textdark)" />
                <span> Testimonials </span>
            </div>

      <Title
                title="Don't just take our word for it"
                description={
                  <>
                    Create a professional resume in minutes — customizable templates and a live preview.
                    <br />
                    <strong>ATS-friendly</strong> formatting out of the box.
                  </>
                }
            />
      </div>

      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 40s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

    </div>
  )
}

export default Testimonial;