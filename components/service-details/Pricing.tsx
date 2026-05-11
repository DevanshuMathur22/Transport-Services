"use client"

import { motion } from "framer-motion"

import {
  Bike,
  Truck,
  Package,
} from "lucide-react"

type Props = {
  service: {
    price: string
  }
}

const pricing = [
  {
    title: "Bike Delivery",
    price: "₹49",
    icon: Bike,
    desc: "Best for small and instant city deliveries.",
  },

  {
    title: "Mini Truck",
    price: "₹299",
    icon: Truck,
    desc: "Perfect for goods and commercial transport.",
  },

  {
    title: "Packers Movers",
    price: "₹999",
    icon: Package,
    desc: "Safe and secure home shifting solutions.",
  },
]

export default function Pricing({ service }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                FLEXIBLE PRICING
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Flexible pricing
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                for every delivery.
              </span>
            </h2>

            {/* Paragraph */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Smart transportation
              pricing designed for
              instant bookings,
              businesses and modern
              logistics operations.
            </p>
          </div>

          {/* Main Price */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-500">
              STARTING FROM
            </p>

            <h3 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-6xl">

              {service.price}
            </h3>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {pricing.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
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
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/[0.08] hover:shadow-2xl md:p-8"
              >

                {/* Glow */}
                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5">

                  <Icon className="h-7 w-7 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="relative mt-8 text-3xl font-bold tracking-tight text-white">

                  {item.title}
                </h3>

                {/* Price */}
                <div className="relative mt-5 flex items-end gap-2">

                  <span className="text-5xl font-bold tracking-tight text-white">
                    {item.price}
                  </span>

                  <span className="mb-1 text-zinc-500">
                    / trip
                  </span>
                </div>

                {/* Desc */}
                <p className="relative mt-5 text-sm leading-7 text-zinc-400 md:text-base">

                  {item.desc}
                </p>

                {/* Line */}
                <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-hover:w-24" />

                {/* Button */}
                <button className="relative mt-8 h-12 w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]">

                  Book Now
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}