"use client"

import { motion } from "framer-motion"

import {
  MapPin,
  Truck,
  Clock3,
  ShieldCheck,
} from "lucide-react"

export default function TrackingPreview() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

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
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                LIVE TRACKING
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Real-time
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                delivery tracking.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Monitor your shipments
              with smart live updates,
              driver location tracking
              and seamless logistics
              visibility.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">

              {[
                {
                  icon: MapPin,
                  title: "Live GPS Tracking",
                },

                {
                  icon: Clock3,
                  title: "Instant ETA Updates",
                },

                {
                  icon: Truck,
                  title: "Driver Information",
                },

                {
                  icon: ShieldCheck,
                  title: "Secure Deliveries",
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="group flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.08]"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">

                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">

                      {item.title}
                    </h3>
                  </div>
                )
              })}
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
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
            className="relative"
          >

            {/* Main Card */}
            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:p-7">

              {/* Image */}
              <div className="relative overflow-hidden rounded-[2rem]">

                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
                  alt=""
                  className="h-[260px] w-full object-cover md:h-[380px]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Floating Tracking */}
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.8rem] border border-white/10 bg-black/40 p-4 backdrop-blur-2xl md:bottom-6 md:left-6 md:right-6 md:p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-400">
                        DELIVERY STATUS
                      </p>

                      <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">

                        Arriving in 12 mins
                      </h3>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)]">

                      <Truck className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>

                  {/* Bottom */}
                  <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">

                    <span>Pickup</span>

                    <span>On The Way</span>

                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -left-4 bottom-10 hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-2xl md:block">

              <p className="text-sm text-zinc-500">
                Driver Rating
              </p>

              <h3 className="mt-2 text-4xl font-bold tracking-tight text-white">

                4.9★
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}