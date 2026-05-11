// app/tracking/page.tsx

import Hero from "@/components/tracking/hero"
import TrackingCard from "@/components/tracking/TrackingCard"
import Timeline from "@/components/tracking/Timeline"
import Driver from "@/components/tracking/Driver"
import Support from "@/components/tracking/Support"
import Faq from "@/components/tracking/faq"
import Cta from "@/components/tracking/Cta"

export default function TrackingPage() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* LIVE TRACKING */}
      <TrackingCard />

      {/* TIMELINE */}
      <Timeline />

      {/* DRIVER */}
      <Driver />

      {/* SUPPORT */}
      <Support />

      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <Cta />

    </main>
  )
}