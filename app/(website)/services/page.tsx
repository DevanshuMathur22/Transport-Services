// app/services/page.tsx

import Hero from "@/components/services/hero"
import ServicesGrid from "@/components/services/services-grid"

import Faq from "@/components/services/faq"
import Cta from "@/components/services/cta"
import Stats from "@/components/services/stats"
import HowItWorks from "@/components/services/HowItWorks"
import EnterpriseBanner from "@/components/services/EnterpriseBanner"
import { Feature } from "framer-motion"
import Features from "@/components/services/Features"

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <EnterpriseBanner />
      <Stats />
      <HowItWorks />
      <Features  />
      
     
      <Faq />
      <Cta />
    </>
  )
}