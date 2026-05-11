// components/tracking/Cta.tsx

"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowRight,
  PackageCheck,
} from "lucide-react"

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-16 md:px-8 md:pb-24">

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[260px] w-[260px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10"
        >

          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Glow */}
          <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 px-5 py-12 md:px-8 md:py-16">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-200">
                SMART LOGISTICS
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Real-time tracking
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                for every shipment.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 md:text-base">

              Monitor deliveries, manage shipment activity and
              track logistics seamlessly from one dashboard.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition hover:scale-[1.02]"
              >

                Track Shipment

                <ArrowRight className="h-4 w-4" />
              </Link>

              <button className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-xs font-medium text-white backdrop-blur-xl transition hover:border-orange-500/30 hover:bg-orange-500/10">

                <PackageCheck className="h-4 w-4" />

                Contact Support
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">

              {[
                {
                  number: "10M+",
                  label: "Shipments",
                },
                {
                  number: "500+",
                  label: "Cities",
                },
                {
                  number: "24/7",
                  label: "Tracking",
                },
                {
                  number: "99.9%",
                  label: "Success Rate",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl"
                >

                  <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-300">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}