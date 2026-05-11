"use client"

import { motion } from "framer-motion"

import {
  MapPinned,
  PackageCheck,
  Truck,
} from "lucide-react"

const steps = [
  {
    title: "Book Delivery",
    desc: "Choose your vehicle type and schedule deliveries instantly across the city.",
    icon: MapPinned,
  },
  {
    title: "Live Tracking",
    desc: "Monitor shipments in real-time with smart logistics and tracking updates.",
    icon: Truck,
  },
  {
    title: "Delivered Safely",
    desc: "Fast and secure transportation experience for every business and customer.",
    icon: PackageCheck,
  },
]

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

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
          className="text-center"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              HOW IT WORKS
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Fast delivery in
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              just few steps.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Simple and seamless logistics process with
            real-time tracking and smart transportation
            support for modern businesses.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">

          {/* Line */}
          <div className="absolute left-1/2 top-16 hidden h-[2px] w-[65%] -translate-x-1/2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/5"
              >

                {/* Glow */}
                <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Number */}
                <div className="absolute right-5 top-4 text-5xl font-bold tracking-tight text-white/[0.04]">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5">

                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>

                {/* Content */}
                <div className="relative mt-8">

                  <h3 className="text-2xl font-bold tracking-tight text-white">

                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">

                    {step.desc}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}