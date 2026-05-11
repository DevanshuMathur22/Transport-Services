"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  BarChart3,
} from "lucide-react"

export default function Cta() {
  return (
    <section className="overflow-hidden bg-[#09090B] px-4 pb-20 md:px-8 md:pb-28">

      <div className="mx-auto max-w-7xl">

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
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[3rem] border border-white/10"
        >

          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Glow */}
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-orange-500/10 blur-3xl" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                ENTERPRISE PLATFORM
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Scale your logistics
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                with smarter operations.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Powerful enterprise
              infrastructure designed
              for warehouses, brands
              and large-scale
              transportation systems.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(16,185,129,0.25)] transition hover:scale-[1.02]">

                Book Enterprise Demo

                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                <BarChart3 className="h-4 w-4" />

                Explore Dashboard
              </button>
            </div>

            {/* Bottom Stats */}
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

              {[
                {
                  number: "500+",
                  label: "Enterprise Clients",
                },

                {
                  number: "10M+",
                  label: "Shipments",
                },

                {
                  number: "99.9%",
                  label: "Operational Uptime",
                },

                {
                  number: "24/7",
                  label: "Business Support",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  whileHover={{
                    y: -4,
                  }}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.08]"
                >

                  <h3 className="text-3xl font-bold tracking-tight text-white">

                    {item.number}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-500">

                    {item.label}
                  </p>

                  <div className="mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 transition-all duration-500 group-hover:w-24" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}