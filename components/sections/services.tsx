"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react"

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              OUR SERVICES
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Smart logistics for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              every delivery.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Fast transportation and seamless delivery
            solutions for startups, businesses and
            modern logistics operations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Left Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
            }}
            className="group relative overflow-hidden rounded-[2.2rem] border border-white/10"
          >

            {/* Background */}
            <img
              src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1400&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-[500px] flex-col justify-between p-6 md:p-8">

              {/* Top */}
              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/10 backdrop-blur-2xl">

                  <Truck className="h-6 w-6 text-cyan-400" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-2xl">

                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white">
                    PORTER PRIME
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div>

                <h2 className="max-w-xs text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                  Fastest
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                    Delivery
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300 md:text-base">

                  Ultra fast bike and truck transportation
                  with seamless logistics and real-time
                  tracking across India.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/services/bike-delivery"
                    className="flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition hover:scale-[1.02]"
                  >
                    Book Now
                  </Link>

                  <Link
                    href="/services/bike-delivery"
                    className="group flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15"
                  >

                    Explore

                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
            }}
            className="group relative overflow-hidden rounded-[2.2rem] border border-white/10"
          >

            {/* Background */}
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-[500px] flex-col justify-between p-6 md:p-8">

              {/* Top */}
              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/10 backdrop-blur-2xl">

                  <ShieldCheck className="h-6 w-6 text-cyan-400" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-2xl">

                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white">
                    ENTERPRISE
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div>

                <h2 className="max-w-xs text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                  Smart
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                    Transport
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300 md:text-base">

                  Scalable logistics solutions for modern
                  businesses with secure transportation
                  and live shipment monitoring.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/services/enterprise"
                    className="flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-sm font-medium text-white transition hover:scale-[1.02]"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/services/enterprise"
                    className="group flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15"
                  >

                    Explore

                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}