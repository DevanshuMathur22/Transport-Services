// components/partner/Earnings.tsx

"use client"

import { motion } from "framer-motion"

import {
  Wallet,
  TrendingUp,
  Clock3,
  BadgeIndianRupee,
} from "lucide-react"

const cards = [
  {
    title: "Daily Earnings",
    amount: "₹4,500+",
    desc: "Earn consistently with high-demand deliveries across cities.",
    icon: Wallet,
  },

  {
    title: "Weekly Incentives",
    amount: "₹12,000+",
    desc: "Unlock bonus rewards and performance-based incentives.",
    icon: TrendingUp,
  },

  {
    title: "Flexible Hours",
    amount: "24/7",
    desc: "Work anytime with complete delivery schedule flexibility.",
    icon: Clock3,
  },

  {
    title: "Fast Payouts",
    amount: "Instant",
    desc: "Secure and seamless payments directly to your account.",
    icon: BadgeIndianRupee,
  },
]

export default function Earnings() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                EARNINGS
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Maximize your
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                delivery income.
              </span>
            </h2>
          </div>

          {/* Desc */}
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">

            Flexible work opportunities
            with transparent payouts,
            smart delivery systems and
            real-time earning insights.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.08] hover:shadow-[0_25px_100px_rgba(168,85,247,0.15)] md:p-8"
              >

                {/* Glow */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="absolute right-10 top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10"
                >

                  <Icon className="h-7 w-7 text-violet-400" />
                </motion.div>

                {/* Amount */}
                <motion.h3
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: 0.5,
                  }}
                  className="relative mt-8 text-5xl font-bold tracking-tight text-white"
                >

                  {card.amount}
                </motion.h3>

                {/* Title */}
                <motion.h4
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25 + index * 0.08,
                    duration: 0.5,
                  }}
                  className="relative mt-5 text-2xl font-bold tracking-tight text-white"
                >

                  {card.title}
                </motion.h4>

                {/* Desc */}
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.5,
                  }}
                  className="relative mt-5 text-sm leading-8 text-zinc-400 md:text-base"
                >

                  {card.desc}
                </motion.p>

                {/* Bottom Line */}
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "100%",
                  }}
                  transition={{
                    delay: 0.4 + index * 0.08,
                    duration: 0.8,
                  }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}