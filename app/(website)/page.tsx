import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import Stats from "@/components/sections/stats"
import Faq from "@/components/sections/faq"
import Footer from "@/components/layout/footer"
import LogoStrip from "@/components/sections/LogoStrip"
import HowItWorks from "@/components/sections/HowItWorks"

import AppBanner from "@/components/sections/AppBanner"
import Testimonials from "@/components/sections/testimonials"

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      
      <Hero />
      <LogoStrip />
      <Services />
      <HowItWorks />
      <Stats />
      <AppBanner />
      <Testimonials />
      <Faq />
      
    </main>
  )
}