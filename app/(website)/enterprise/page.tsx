// app/enterprise/page.tsx

import Hero from "@/components/enterprise/hero"
import Companies from "@/components/enterprise/Companies"
import Solutions from "@/components/enterprise/Solutions"
import Dashboard from "@/components/enterprise/Dashboard"
import Features from "@/components/enterprise/features"
import Stats from "@/components/enterprise/stats"
import Faq from "@/components/enterprise/faq"
import Cta from "@/components/enterprise/cta"

export default function EnterprisePage() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* TRUSTED */}
      <Companies />

      {/* SOLUTIONS */}
      <Solutions />

      {/* DASHBOARD */}
      <Dashboard />

      {/* FEATURES */}
      <Features />

      {/* STATS */}
      <Stats />

      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <Cta />

    </main>
  )
}