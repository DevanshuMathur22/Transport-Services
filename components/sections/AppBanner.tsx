"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  Download,
  Smartphone,
} from "lucide-react"

export default function AppBanner() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-150px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl"
      >

        {/* Main */}
        <div className="grid gap-14 px-6 py-12 md:px-10 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

              <Smartphone className="h-4 w-4 text-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                DOWNLOAD APP
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Manage Deliveries
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                From Anywhere
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

              Book trucks, bikes and logistics services
              instantly with live tracking and seamless
              transportation management directly from
              your smartphone.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button className="group flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]">

                <Download className="h-4 w-4" />

                App Store
              </button>

              <button className="group flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition hover:bg-white/10">

                Google Play

                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute -left-6 top-16 hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl lg:block"
            >

              <p className="text-sm text-zinc-500">
                Deliveries Today
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                18,420
              </h3>
            </motion.div>

            {/* Phone */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="relative h-[540px] w-[270px] rounded-[3rem] border border-white/10 bg-black p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            >

              {/* Screen */}
              <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-[#f8fafc]">

                {/* Top */}
                <div className="bg-slate-950 px-6 pb-10 pt-14">

                  <p className="text-sm text-white/50">
                    Active Delivery
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">

                    Jaipur → Delhi
                  </h3>

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-4 p-5">

                  {[
                    "Bike Delivery",
                    "Truck Rental",
                    "Packers Movers",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h4 className="text-base font-semibold text-slate-900">
                            {item}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            Live Tracking Enabled
                          </p>
                        </div>

                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}