import React from 'react'

import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { CTA } from '../components/CTA'

import { Testimonials } from '../components/Testimonials'
import { Footer } from '../components/Footer'
import { ParticleBackground } from '../components/ParticleBackground'

export function App() {
  return (
    <div className="relative overflow-x-hidden">
        <ParticleBackground />
      <main className="relative z-10">
        <Hero />
        <Features />
        <CTA />
        <Testimonials />
        <Footer />
      </main>
    </div>

  )

}

export default App;
