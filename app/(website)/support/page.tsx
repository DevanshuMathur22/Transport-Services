// app/support/page.tsx

import Hero from "@/components/support/hero"
import Categories from "@/components/support/Categories"
import Contact from "@/components/support/Contact"
import Faq from "@/components/support/faq"
import Emergency from "@/components/support/Emergency"
import Cta from "@/components/support/Cta"

export default function SupportPage() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* LIGHT */}
      <Categories />

      {/* DARK */}
      <Contact />

      {/* LIGHT */}
      <Faq />

      {/* DARK */}
      <Emergency />

      {/* FINAL CTA */}
      <Cta />

    </main>
  )
}