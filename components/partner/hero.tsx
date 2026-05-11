"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  Bike,
  Truck,
  Wallet,
} from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl" />

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

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                PARTNER PROGRAM
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Drive smarter.
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                Earn bigger.
              </span>
            </h1>

            {/* Desc */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Join India’s fastest growing
              logistics network and earn
              with flexible deliveries,
              smart tracking and premium
              transportation support.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]">

                Become Partner

                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4">

              {[
                {
                  number: "50K+",
                  label: "Partners",
                },

                {
                  number: "₹35K+",
                  label: "Monthly Earnings",
                },

                {
                  number: "500+",
                  label: "Cities",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.08]"
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

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop"
                alt=""
                className="h-[520px] w-full object-cover md:h-[760px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl md:bottom-8 md:left-8 md:right-8 md:p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-400">
                      TODAY’S EARNINGS
                    </p>

                    <h3 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">

                      ₹4,850
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)]">

                    <Wallet className="h-7 w-7" />
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">

                  <span>12 Deliveries</span>

                  <span>Goal ₹6,000</span>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -left-6 top-10 hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl md:block">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">

                  <Bike className="h-6 w-6 text-violet-400" />
                </div>

                <div>

                  <p className="text-sm text-zinc-500">
                    Bike Deliveries
                  </p>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    Active
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -right-6 bottom-24 hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl md:block">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/10">

                  <Truck className="h-6 w-6 text-pink-400" />
                </div>

                <div>

                  <p className="text-sm text-zinc-500">
                    Fleet Network
                  </p>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    24/7 Online
                  </h3>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}