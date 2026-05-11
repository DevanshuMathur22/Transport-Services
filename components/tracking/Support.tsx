// components/tracking/Support.tsx

"use client"

import { motion } from "framer-motion"

import {
  ChevronRight,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react"

const supportCards = [
  {
    title: "Call Support",
    desc: "Talk directly with our support team.",
    icon: Phone,
    button: "Call Now",
  },
  {
    title: "Live Chat",
    desc: "Connect instantly with live agents.",
    icon: MessageCircle,
    button: "Start Chat",
  },
  {
    title: "Email Support",
    desc: "Get detailed shipment assistance.",
    icon: Mail,
    button: "Send Email",
  },
]

export default function Support() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-16 md:px-8 md:pb-24">

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
                CUSTOMER SUPPORT
              </span>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Need help with
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                your shipment?
              </span>
            </h2>
          </div>

          {/* Small Card */}
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-3xl">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">

                <Headphones className="h-5 w-5 text-orange-400" />
              </div>

              <div>

                <p className="text-xs text-zinc-500">
                  24/7 Support
                </p>

                <h3 className="mt-1 text-base font-semibold tracking-tight text-white">
                  Always Available
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {supportCards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
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
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl transition-all duration-300 md:p-6"
              >

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">

                  <Icon className="h-5 w-5 text-orange-400" />
                </div>

                {/* Content */}
                <div className="mt-6">

                  <h3 className="text-xl font-semibold tracking-tight text-white">

                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">

                    {card.desc}
                  </p>
                </div>

                {/* Button */}
                <button className="mt-6 flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-xs font-medium text-white transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10">

                  {card.button}

                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}