// app/partner/page.tsx

import Hero from "@/components/partner/hero"
import Earnings from "@/components/partner/Earnings"
import Benefits from "@/components/partner/benefits"
import Vehicles from "@/components/partner/Vehicles"
import HowItWorks from "@/components/partner/HowItWorks"
import Requirements from "@/components/partner/Requirements"
import Faq from "@/components/partner/faq"
import Cta from "@/components/partner/cta"

export default function PartnerPage() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* LIGHT */}
      <Earnings />

      {/* DARK */}
      <Benefits />

      {/* LIGHT */}
      <Vehicles />

      {/* DARK */}
      <HowItWorks />

      {/* LIGHT */}
      <Requirements />

      {/* DARK */}
      <Faq />

      {/* FINAL CTA */}
      <Cta />

    </main>
  )
}