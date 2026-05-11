// components/partner/Vehicles.tsx

"use client"

import { motion } from "framer-motion"

import {
  Bike,
  Truck,
  Package,
  ArrowRight,
} from "lucide-react"

const vehicles = [
  {
    title: "Bike Deliveries",

    desc:
      "Fast intra-city deliveries with flexible working schedules.",

    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",

    icon: Bike,
  },

  {
    title: "Mini Truck",

    desc:
      "Handle large transportation requests and commercial deliveries.",

    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop",

    icon: Truck,
  },

  {
    title: "Packers Movers",

    desc:
      "Smart shifting and relocation services for homes and offices.",

    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=1600&auto=format&fit=crop",

    icon: Package,
  },
]

export default function Vehicles() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute right-[-100px] bottom-0 h-[280px] w-[280px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
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
          viewport={{
            once: true,
          }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                VEHICLE TYPES
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Deliver with
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                your own vehicle.
              </span>
            </h2>
          </div>

          {/* Desc */}
          <p className="max-w-md text-sm leading-8 text-zinc-400 md:text-base">

            Join our smart
            transportation network
            using bikes, trucks
            and commercial delivery
            vehicles across India.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">

          {vehicles.map((vehicle, index) => {

            const Icon = vehicle.icon

            return (
              <motion.div
                key={vehicle.title}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.06] hover:shadow-[0_20px_80px_rgba(168,85,247,0.14)]"
              >

                {/* Image */}
                <div className="relative overflow-hidden">

                  <img
                    src={vehicle.image}
                    alt=""
                    className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-2xl"
                  >

                    <Icon className="h-7 w-7 text-violet-300" />
                  </motion.div>

                  {/* Floating Number */}
                  <div className="absolute right-6 top-6 text-5xl font-bold tracking-tight text-white/10">

                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-7 md:p-8">

                  {/* Glow */}
                  <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  <div className="relative">

                    <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">

                      {vehicle.title}
                    </h3>

                    <p className="mt-5 text-sm leading-8 text-zinc-400 md:text-base">

                      {vehicle.desc}
                    </p>

                    {/* Button */}
                    <motion.button
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="mt-8 flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.25)] transition hover:scale-[1.02]"
                    >

                      Start Delivering

                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Bottom Line */}
                <div className="h-[3px] w-0 bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}