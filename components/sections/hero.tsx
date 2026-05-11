"use client"

import { motion } from "framer-motion"

import {
  ArrowDown,
  ArrowUpRight,
  Bike,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Truck",
  },
  {
    icon: Bike,
    title: "Two Wheeler",
  },
  {
    icon: Package,
    title: "Packers",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise",
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B]">

      {/* Glow */}
      <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Hero */}
      <div className="relative z-10 flex min-h-screen items-center pt-28 md:pt-36">

        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                SMART LOGISTICS PLATFORM
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Delivery Aapki,
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Transport Hamara
              </span>
            </h1>

            {/* Desc */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

              Fast and reliable transportation solutions
              with instant booking, real-time tracking
              and seamless logistics support across India.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]">

                Book Delivery

                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button className="h-12 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                Explore Services
              </button>
            </div>

            {/* Services */}
            <div className="mt-12 flex flex-wrap gap-4">

              {services.map((item) => {

                const Icon = item.icon

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{
                      y: -5,
                    }}
                    className="group flex h-28 w-28 flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10">

                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                  </motion.div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-10">

              {[
                {
                  number: "10M+",
                  label: "Trips",
                },
                {
                  number: "500+",
                  label: "Cities",
                },
                {
                  number: "24/7",
                  label: "Support",
                },
              ].map((item) => (
                <div key={item.number}>

                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Scroll */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="mt-10 flex items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

                <ArrowDown className="h-4 w-4 text-white" />
              </div>

              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-500">
                SCROLL TO EXPLORE
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative hidden lg:block"
          >

            {/* Main Image */}
            <div className="relative h-[620px] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl">

              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1400&auto=format&fit=crop')",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -left-10 bottom-10 w-[260px] rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl"
            >

              <p className="text-sm text-zinc-500">
                Smart Logistics
              </p>

              <h3 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white">

                Real-time logistics dashboard
              </h3>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}