// components/partner/Cta.tsx

"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  Wallet,
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
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/85" />

          {/* Glow */}
          <div className="absolute left-[-100px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-pink-500/10 blur-3xl" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                JOIN OUR NETWORK
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Start delivering.
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                Start earning.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

              Become a logistics
              partner with flexible
              delivery schedules,
              real-time earnings and
              smart transportation
              support across India.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
              >

                Become Partner

                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
              >

                <Wallet className="h-4 w-4 text-pink-400" />

                View Earnings
              </motion.button>
            </div>

            {/* Bottom Stats */}
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

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

                {
                  number: "24/7",
                  label: "Support",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.number}
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
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.08]"
                >

                  <h3 className="text-3xl font-bold tracking-tight text-white">

                    {item.number}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-500">

                    {item.label}
                  </p>

                  <div className="mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500 group-hover:w-24" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}