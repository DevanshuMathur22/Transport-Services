"use client"

import { motion } from "framer-motion"

import {
  MapPinned,
  Truck,
  PackageCheck,
  ShieldCheck,
} from "lucide-react"

const steps = [
  {
    title: "Book Delivery",

    desc:
      "Choose your vehicle and schedule delivery instantly.",

    icon: MapPinned,
  },

  {
    title: "Live Tracking",

    desc:
      "Track shipments in real-time with smart updates.",

    icon: Truck,
  },

  {
    title: "Safe Transport",

    desc:
      "Reliable transportation network across India.",

    icon: ShieldCheck,
  },

  {
    title: "Delivered",

    desc:
      "Fast and secure delivery experience every time.",

    icon: PackageCheck,
  },
]

export default function HowItWorks() {

  return (
    <section className="relative overflow-hidden bg-[#09090B] py-20 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-rose-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Banner */}
      <div className="relative h-auto overflow-hidden">

        {/* BG IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2200&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/80" />

        {/* Content */}
        <div className="relative z-10 px-5 py-16 md:px-16 md:py-20">

          {/* Heading */}
          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />

              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
                HOW IT WORKS
              </p>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">

              Seamless logistics
              <span className="block bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">

                in few steps.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base md:leading-8">

              Fast transportation
              process designed for
              businesses and individuals
              with smart tracking and
              instant delivery support.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-5">

            {steps.map((step, index) => {

              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl transition-all duration-500 hover:border-rose-500/20 hover:bg-white/[0.08] md:p-6"
                >

                  {/* Glow */}
                  <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-rose-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Number */}
                  <div className="absolute right-4 top-4 text-3xl font-bold text-white/10 md:text-5xl">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 md:h-14 md:w-14"
                  >

                    <Icon className="h-5 w-5 text-rose-300 md:h-6 md:w-6" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative mt-6">

                    <h3 className="text-base font-bold tracking-tight text-white md:text-2xl">

                      {step.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-zinc-400 md:text-sm md:leading-7">

                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Huge Text */}
        <div className="absolute bottom-[-10px] right-5 select-none text-[70px] font-bold tracking-[-0.08em] text-white/[0.03] md:text-[180px]">
          PORTER
        </div>
      </div>
    </section>
  )
}