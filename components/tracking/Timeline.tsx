// components/tracking/Timeline.tsx

"use client"

import { motion } from "framer-motion"

import {
  ArrowUpRight,
  Check,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react"

const timeline = [
  {
    title: "Shipment Created",
    desc: "Order added successfully.",
    tag: "STEP 01",
    icon: PackageCheck,
    active: true,
  },
  {
    title: "Driver Assigned",
    desc: "Nearby driver assigned.",
    tag: "STEP 02",
    icon: Truck,
    active: true,
  },
  {
    title: "Tracking Enabled",
    desc: "Live tracking activated.",
    tag: "STEP 03",
    icon: MapPin,
    active: true,
  },
  {
    title: "Delivery Complete",
    desc: "Waiting for confirmation.",
    tag: "STEP 04",
    icon: Check,
    active: false,
  },
]

export default function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-20 md:px-8 md:pb-24">

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                DELIVERY FLOW
              </span>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Smart shipment
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                activity timeline.
              </span>
            </h2>
          </div>

          {/* Right Card */}
          <div className="max-w-sm rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">

                <ShieldCheck className="h-5 w-5 text-orange-400" />
              </div>

              <div>

                <h3 className="text-base font-semibold tracking-tight text-white">
                  Real-Time Updates
                </h3>

                <p className="mt-1 text-xs leading-6 text-zinc-400">
                  Access delivery activity and tracking updates instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop Line */}
          <div className="absolute left-0 right-0 top-[42px] hidden h-[2px] bg-white/10 xl:block" />

          <div className="grid gap-4 xl:grid-cols-4">

            {timeline.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -4,
                  }}
                  className={`group relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-3xl transition-all duration-300 ${
                    item.active
                      ? "border-white/10 bg-white/5"
                      : "border-white/5 bg-white/[0.03]"
                  }`}
                >

                  {/* Glow */}
                  {item.active && (
                    <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-orange-500/10 blur-3xl" />
                  )}

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                        item.active
                          ? "border-orange-500/20 bg-orange-500/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >

                      <Icon
                        className={`h-5 w-5 ${
                          item.active
                            ? "text-orange-400"
                            : "text-zinc-500"
                        }`}
                      />
                    </div>

                    <div
                      className={`rounded-full px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] ${
                        item.active
                          ? "border border-orange-500/20 bg-orange-500/10 text-orange-300"
                          : "border border-white/10 bg-white/5 text-zinc-500"
                      }`}
                    >

                      {item.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-7">

                    <h3
                      className={`text-lg font-semibold leading-tight tracking-tight ${
                        item.active
                          ? "text-white"
                          : "text-zinc-500"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-3 text-xs leading-6 ${
                        item.active
                          ? "text-zinc-400"
                          : "text-zinc-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.active
                            ? "animate-pulse bg-emerald-400"
                            : "bg-zinc-600"
                        }`}
                      />

                      <p
                        className={`text-xs font-medium ${
                          item.active
                            ? "text-zinc-300"
                            : "text-zinc-500"
                        }`}
                      >
                        {item.active
                          ? "Active"
                          : "Pending"}
                      </p>
                    </div>

                    {item.active && (
                      <ArrowUpRight className="h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    )}
                  </div>

                  {/* Bottom Border */}
                  {item.active && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-500 to-red-500" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}