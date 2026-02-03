'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Numbers from '@/components/Numbers'
import Services from '@/components/Services'
import Clients from '@/components/Clients'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <Hero />
      <About />
      <Numbers />
      <Services />
      <Clients />
      <Footer />
    </main>
  )
}
