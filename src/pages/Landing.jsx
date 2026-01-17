import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Feature'
import HowItWorks from '../components/HowItWorks'
import Roles from '../components/Roles'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Roles />
      <CTA />
      <Footer />
    </div>
  )
}

export default Landing
