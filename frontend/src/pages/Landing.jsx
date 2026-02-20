import React from 'react'
import Navbar from '../components/Landing/Navbar'
import Hero from '../components/Landing/Hero'
import About from '../components/Landing/About'
import Features from '../components/Landing/Feature'
import HowItWorks from '../components/Landing/HowItWorks'
import CTA from '../components/Landing/CTA'
import Footer from '../components/Landing/Footer'
import Roles from '../components/Landing/Roles'


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
