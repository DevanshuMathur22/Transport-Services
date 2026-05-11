"use client"

import { motion } from "framer-motion"

import {
  Bike,
  Truck,
  Package,
  ShieldCheck,
} from "lucide-react"

const services = [
  {
    title: "Bike Delivery",
    icon: Bike,
  },

  {
    title: "Truck Rentals",
    icon: Truck,
  },

  {
    title: "Packers Movers",
    icon: Package,
  },

  {
    title: "Enterprise",
    icon: ShieldCheck,
  },
]

export default function ServicesParallax() {
  return (
    <section className="relative overflow-hidden bg-[#09090B]">

      {/* SCROLL AREA */}
      <div className="relative h-[220vh]">

        {/* STICKY */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* IMAGE */}
          <motion.img
            initial={{
              scale: 1.15,
            }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/75" />

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#09090B]" />

          {/* GLOW */}
          <div className="absolute left-[-120px] top-0 h-[420px] w-[420px] rounded-full bg-orange-500/15 blur-3xl" />

          <div className="absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-red-500/10 blur-3xl" />

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

            {/* BADGE */}
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
                duration: 0.6,
              }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl"
            >

              <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
                PORTER SERVICES
              </p>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="mt-6 max-w-5xl text-4xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl"
            >

              Delivering across
              <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 bg-clip-text text-transparent">

                every movement.
              </span>
            </motion.h2>

            {/* DESC */}
            <motion.p
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
                delay: 0.2,
              }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-zinc-400 md:text-base"
            >

              Smart logistics ecosystem
              designed for businesses,
              enterprises and seamless
              city transportation.
            </motion.p>

            {/* BUTTONS */}
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
                delay: 0.3,
              }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >

              <button className="h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 text-sm font-medium text-white shadow-[0_10px_40px_rgba(249,115,22,0.35)] transition hover:scale-[1.02]">

                Book Delivery
              </button>

              <button className="h-12 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-2xl transition hover:bg-white/10">

                Explore Services
              </button>
            </motion.div>

            {/* FLOATING CARDS */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4">

              {services.map((service, index) => {

                const Icon = service.icon

                return (
                  <motion.div
                    key={service.title}
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
                      delay: 0.4 + index * 0.08,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group flex items-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-2xl transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.08]"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20">

                      <Icon className="h-5 w-5 text-orange-300" />
                    </div>

                    <p className="text-sm font-medium text-white">

                      {service.title}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* BIG TEXT */}
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 select-none text-[120px] font-bold tracking-[-0.08em] text-white/[0.03] md:text-[240px]">

            PORTER
          </div>
        </div>
      </div>
    </section>
  )
}