// components/tracking/TrackingCard.tsx

"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowUpRight,
  Circle,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react"

const timeline = [
  {
    title: "Shipment Created",
    desc: "Order details received successfully",
    active: true,
  },
  {
    title: "Pickup Scheduled",
    desc: "Driver assigned for pickup",
    active: true,
  },
  {
    title: "Live Tracking",
    desc: "Tracking available after login",
    active: true,
  },
  {
    title: "Delivery Completed",
    desc: "Waiting for confirmation",
    active: false,
  },
]

export default function TrackingCard() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[280px] w-[280px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TOP */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                LIVE SHIPMENT
              </span>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Shipment tracking
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                for modern logistics.
              </span>
            </h2>
          </div>

          {/* Tracking Box */}
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl lg:min-w-[280px]">

            <p className="text-xs text-zinc-500">
              Secure Access
            </p>

            <div className="mt-3 flex items-center justify-between gap-4">

              <div>

                <h3 className="text-lg font-semibold tracking-tight text-white">
                  Live Dashboard
                </h3>

                <p className="mt-1 text-xs text-zinc-400">
                  Login required
                </p>
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
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-5 lg:grid-cols-[1fr_0.6fr]">

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
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 backdrop-blur-3xl"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1800&auto=format&fit=crop"
                alt=""
                className="h-[240px] w-full object-cover md:h-[360px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

              {/* Floating Card */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-2xl"
              >

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                  <p className="text-xs font-medium text-white">
                    Live tracking
                  </p>
                </div>
              </motion.div>

              {/* Bottom Glass */}
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.8rem] border border-white/10 bg-black/40 p-4 backdrop-blur-2xl md:p-5">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                      Smart Tracking
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">

                      Login to continue
                    </h3>
                  </div>

                  <Link
                    href="/login"
                    className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                  >

                    Open Dashboard

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* BOTTOM INFO */}
            <div className="grid gap-3 p-4 md:grid-cols-3 md:p-5">

              {[
                {
                  title: "Pickup",
                  value: "Live Routes",
                  icon: MapPin,
                },
                {
                  title: "Shipment",
                  value: "Real-Time",
                  icon: PackageCheck,
                },
                {
                  title: "Vehicle",
                  value: "Driver Status",
                  icon: Truck,
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{
                      y: -4,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 transition-all duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500/10">

                      <Icon className="h-4 w-4 text-orange-400" />
                    </div>

                    <p className="mt-4 text-xs text-zinc-500">
                      {item.title}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold tracking-tight text-white">
                      {item.value}
                    </h3>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
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
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="space-y-5"
          >

            {/* Timeline */}
            <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl md:p-6">

              <h3 className="text-xl font-bold tracking-tight text-white">
                Delivery Timeline
              </h3>

              <div className="mt-6 space-y-6">

                {timeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="relative flex gap-4"
                  >

                    {/* Line */}
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-[9px] top-6 h-full w-[2px] bg-white/10" />
                    )}

                    {/* Dot */}
                    <div
                      className={`relative z-10 mt-1 flex h-5 w-5 items-center justify-center rounded-full ${
                        item.active
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-white/10 text-zinc-500"
                      }`}
                    >

                      <Circle className="h-2 w-2 fill-current" />
                    </div>

                    {/* Content */}
                    <div>

                      <h4 className="text-sm font-semibold tracking-tight text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-6 text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Card */}
            <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-5 md:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">

                  <ShieldCheck className="h-5 w-5 text-orange-400" />
                </div>

                <div>

                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Driver Access
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400">
                    Login to access details
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">

                <Link
                  href="/login"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-xs font-medium text-black transition hover:scale-[1.02]"
                >

                  <Phone className="h-4 w-4" />

                  Login
                </Link>

                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20">

                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}