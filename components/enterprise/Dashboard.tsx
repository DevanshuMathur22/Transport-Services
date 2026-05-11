"use client"

import { motion } from "framer-motion"

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  PackageCheck,
  Truck,
} from "lucide-react"

export default function Dashboard() {
  return (
    <section className="overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute right-[-100px] bottom-0 h-[280px] w-[280px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                OPERATIONS DASHBOARD
              </p>
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Manage enterprise
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                logistics smarter.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">

            Real-time analytics,
            shipment visibility and
            smart transportation
            insights for enterprise
            operations.
          </p>
        </div>

        {/* Dashboard */}
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
          className="mt-16 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl md:p-7"
        >

          <div className="grid gap-5 lg:grid-cols-[1fr_0.42fr]">

            {/* LEFT */}
            <div className="space-y-5">

              {/* Analytics */}
              <div className="rounded-[2.5rem] border border-white/10 bg-black/40 p-6 md:p-8">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-zinc-500">
                      Shipment Analytics
                    </p>

                    <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">

                      +28%
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-orange-500 text-white shadow-[0_10px_40px_rgba(16,185,129,0.25)]">

                    <BarChart3 className="h-7 w-7" />
                  </div>
                </div>

                {/* Graph */}
                <div className="mt-10 flex h-52 items-end gap-4">

                  {[45, 70, 55, 90, 68, 100, 82].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-full bg-gradient-to-t from-emerald-500 to-orange-400"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid gap-5 md:grid-cols-2">

                {[
                  {
                    icon: Truck,
                    title: "Active Fleet",
                    value: "1,240",
                    growth: "+12%",
                  },

                  {
                    icon: PackageCheck,
                    title: "Orders Processed",
                    value: "84,320",
                    growth: "+18%",
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{
                        y: -4,
                      }}
                      className="rounded-[2.5rem] border border-white/10 bg-black/40 p-6 transition-all duration-300 hover:border-emerald-500/20 md:p-7"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">

                          <Icon className="h-6 w-6 text-emerald-400" />
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">

                          <ArrowUpRight className="h-4 w-4" />

                          {item.growth}
                        </div>
                      </div>

                      <p className="mt-6 text-sm text-zinc-500">
                        {item.title}
                      </p>

                      <h3 className="mt-2 text-5xl font-bold tracking-tight text-white">

                        {item.value}
                      </h3>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-[2.5rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl md:p-8">

              {/* Top */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-zinc-500">
                    Live Activity
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">

                    Operations
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">

                  <Activity className="h-6 w-6 text-orange-400" />
                </div>
              </div>

              {/* Activities */}
              <div className="mt-10 space-y-5">

                {[
                  "Shipment dispatched from Jaipur hub.",

                  "Warehouse inventory synced successfully.",

                  "Delivery fleet reached Delhi NCR.",

                  "Enterprise invoice generated automatically.",
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5"
                  >

                    <div className="mt-2 h-3 w-3 rounded-full bg-emerald-400" />

                    <div>

                      <p className="text-sm leading-7 text-zinc-300">

                        {activity}
                      </p>

                      <p className="mt-3 text-[10px] tracking-[0.25em] text-zinc-600">

                        LIVE UPDATE
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6">

                <p className="text-sm text-zinc-500">
                  Monthly Efficiency
                </p>

                <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">

                  98.4%
                </h3>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-emerald-400 to-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}