"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  BarChart3,
  PackageCheck,
  Truck,
} from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                ENTERPRISE LOGISTICS
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Smart logistics
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                for modern businesses.
              </span>
            </h1>

            {/* Desc */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Powerful transportation
              infrastructure designed
              for enterprises,
              warehouses and
              high-volume delivery
              operations.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(16,185,129,0.30)] transition hover:scale-[1.02]">

                Book Demo

                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                Explore Platform
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4">

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
                  label: "Success Rate",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.08]"
                >

                  <h3 className="text-3xl font-bold tracking-tight text-white">

                    {item.number}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">

                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >

            {/* Main Dashboard */}
            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:p-7">

              {/* Top */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-500">
                    LIVE OPERATIONS
                  </p>

                  <h3 className="mt-3 text-4xl font-bold tracking-tight text-white">

                    24 Active
                  </h3>
                </div>

                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

                  <div className="flex items-center gap-2">

                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                    <p className="text-xs font-medium text-emerald-400">
                      LIVE
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/40 p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-zinc-500">
                      Shipment Analytics
                    </p>

                    <h3 className="mt-2 text-4xl font-bold tracking-tight text-white">

                      +28%
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 text-white shadow-[0_10px_40px_rgba(16,185,129,0.30)]">

                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>

                {/* Fake Graph */}
                <div className="mt-8 flex h-40 items-end gap-3">

                  {[40, 65, 55, 80, 60, 95, 75].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-full bg-gradient-to-t from-emerald-500 to-orange-500"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="mt-5 grid grid-cols-2 gap-4">

                {[
                  {
                    icon: PackageCheck,
                    title: "Orders",
                    value: "12,840",
                  },

                  {
                    icon: Truck,
                    title: "Fleet",
                    value: "1,240",
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{
                        y: -4,
                      }}
                      className="rounded-[2rem] border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:border-emerald-500/20"
                    >

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">

                        <Icon className="h-6 w-6 text-emerald-400" />
                      </div>

                      <p className="mt-5 text-sm text-zinc-500">
                        {item.title}
                      </p>

                      <h3 className="mt-2 text-4xl font-bold tracking-tight text-white">

                        {item.value}
                      </h3>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}