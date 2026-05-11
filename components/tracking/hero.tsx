// components/tracking/Hero.tsx

"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowUpRight,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_0.9fr]">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                REAL-TIME TRACKING
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Smart shipment
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                tracking dashboard.
              </span>
            </h1>

            {/* Desc */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 md:text-base">

              Track deliveries, monitor live movement and manage
              logistics seamlessly with real-time updates.
            </p>

            {/* Search Box */}
            <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-2.5 backdrop-blur-2xl">

              <div className="flex flex-col gap-2.5 md:flex-row">

                {/* Input */}
                <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">

                  <Search className="h-4 w-4 text-zinc-500" />

                  <input
                    type="text"
                    placeholder="Enter tracking ID"
                    className="w-full bg-transparent text-xs text-white outline-none placeholder:text-zinc-500 md:text-sm"
                  />
                </div>

                {/* Button */}
                <Link
                  href="/login"
                  className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] md:text-sm"
                >

                  Continue

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Bottom Points */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              {[
                "Live Tracking",
                "Real-Time Updates",
                "Secure Monitoring",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >

                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />

                  <p className="text-xs text-zinc-400 md:text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -left-4 top-8 z-20 hidden rounded-[1.4rem] border border-white/10 bg-black/50 p-3 backdrop-blur-2xl lg:block"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">

                  <Truck className="h-4 w-4 text-orange-400" />
                </div>

                <div>

                  <p className="text-[10px] text-zinc-500">
                    Real-Time Sync
                  </p>

                  <h3 className="mt-1 text-xs font-semibold text-white">
                    Tracking Active
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Main Card */}
            <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl md:p-5">

              {/* Header */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Tracking Dashboard
                  </p>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">

                    Real-Time Logistics
                  </h3>
                </div>

                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-3 py-1.5">

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    <p className="text-[10px] font-medium text-emerald-400">
                      LIVE
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative mt-5 overflow-hidden rounded-[1.8rem]">

                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1800&auto=format&fit=crop"
                  alt="Tracking Dashboard"
                  className="h-[240px] w-full object-cover md:h-[320px]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                {/* Bottom Glass */}
                <div className="absolute bottom-0 left-0 right-0 p-4">

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 backdrop-blur-2xl">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                          Access Tracking
                        </p>

                        <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">

                          Login to continue
                        </h3>
                      </div>

                      <Link
                        href="/login"
                        className="flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] md:text-sm"
                      >

                        Open Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}