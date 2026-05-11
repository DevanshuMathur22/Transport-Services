// app/services/[slug]/page.tsx

import { notFound } from "next/navigation"

import Hero from "@/components/service-details/Hero"
import LogoStrip from "@/components/service-details/LogoStrip"
import Features from "@/components/service-details/Features"
import TrackingPreview from "@/components/service-details/TrackingPreview"
import Calculator from "@/components/service-details/Calculator"
import Pricing from "@/components/service-details/Pricing"
import Cities from "@/components/service-details/Cities"
import Faq from "@/components/service-details/Faq"
import Cta from "@/components/service-details/Cta"

import { services } from "@/data/services"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ServicePage({
  params,
}: Props) {

  const { slug } = await params

  const service = services.find(
    (item) => item.slug === slug
  )

  if (!service) {
    return notFound()
  }

  return (
    <main>

      <Hero service={service} />

      <LogoStrip />

      <Features service={service} />

      <TrackingPreview />

      <Calculator />

      <Pricing service={service} />

      <Cities />

      <Faq />

      <Cta service={service} />

    </main>
  )
}