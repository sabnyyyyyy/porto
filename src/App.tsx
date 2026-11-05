import { useEffect } from 'react'
import { clamp, initScroll, onScroll } from './scroll'
import { About } from './sections/About'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Numbers } from './sections/Numbers'
import { Pricing } from './sections/Pricing'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { Work } from './sections/Work'

export default function App() {
  useEffect(() => initScroll(), [])

  // Angled section edges slide up as each section approaches the viewport bottom.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.slant-top'))
    return onScroll(() => {
      const vh = window.innerHeight
      const slant = window.innerWidth * 0.084
      els.forEach((el) => {
        const top = el.getBoundingClientRect().top
        el.style.setProperty('--sp', String(clamp((vh - top) / (slant * 1.6))))
      })
    })
  }, [])

  return (
    <main className="bg-white">
      <Hero />
      <About />
      <Work />
      <Services />
      <Pricing />
      <Testimonials />
      <Numbers />
      <Faq />
      <Footer />
    </main>
  )
}
