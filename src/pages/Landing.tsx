import React from 'react'
import Navbar from '../components/Landing/Navbar'
import HeroSection from '../components/Landing/HeroSection'
import LiveStats from '../components/Landing/LiveStats'
import PersonalizedMatchSection from '../components/Landing/PersonalizedMatchSection'
import HowItWorks from '../components/Landing/HowItWorks'
import InDemandSkills from '../components/Landing/InDemandSkills'
import Footer from '../components/Landing/Footer'
import LandingChatbot from '../components/Landing/LandingChatbot'

export default function Landing(){
  return (
    <div className="min-h-screen bg-[#07102a] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <LiveStats />
        <PersonalizedMatchSection />
        <HowItWorks />
        <InDemandSkills />
        <Footer />
      </main>
      <LandingChatbot />
    </div>
  )
}
