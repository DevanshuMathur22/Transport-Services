// components/partner/HowItWorks.tsx

"use client"

import { motion } from "framer-motion"

import {
  UserPlus,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react"

const steps = [
  {
    title: "Register Yourself",

    desc:
      "Complete quick onboarding and upload your delivery documents.",

    icon: UserPlus,
  },

  {
    title: "Get Verified",

    desc:
      "Verification process ensures secure and trusted logistics operations.",

    icon: ShieldCheck,
  },

  {
    title: "Start Delivering",

    desc:
      "Accept deliveries, manage routes and work flexibly across cities.",

    icon: Truck,
  },

  {
    title: "Earn Instantly",

    desc:
      "Track earnings and receive fast secure payouts directly.",

    icon: Wallet,
  },
]

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[280px] w-[280px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
          className="text-center"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              HOW IT WORKS
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Start earning
            <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

              in few simple steps.
            </span>
          </h2>

          {/* Desc */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-zinc-400 md:text-base">

            Seamless onboarding
            experience with smart
            logistics infrastructure
            and flexible delivery
            opportunities.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">

          {/* Line */}
          <div className="absolute left-1/2 top-20 hidden h-[2px] w-[82%] -translate-x-1/2 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-violet-500/20 xl:block" />

          {/* Cards */}
          <div className="grid gap-5 xl:grid-cols-4">

            {steps.map((step, index) => {

              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.07] hover:shadow-[0_20px_80px_rgba(168,85,247,0.12)] md:p-8"
                >

                  {/* Glow */}
                  <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Number */}
                  <div className="absolute right-6 top-6 text-5xl font-bold tracking-tight text-white/10">

                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/20 to-pink-500/20"
                  >

                    <Icon className="h-7 w-7 text-violet-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative mt-10">

                    <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">

                      {step.title}
                    </h3>

                    <p className="mt-5 text-sm leading-8 text-zinc-400 md:text-base">

                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}