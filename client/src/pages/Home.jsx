import React from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import CallToAction from '../components/Home/CallToAction'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
