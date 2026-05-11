// components/support/Emergency.tsx

"use client"

import { motion } from "framer-motion"

import {
  ShieldAlert,
  Phone,
  ArrowRight,
} from "lucide-react"

const cards = [
  {
    title: "24/7 Active",

    desc:
      "Round-the-clock emergency transportation assistance.",

    gradient:
      "from-rose-500 to-red-500",

    glow:
      "bg-rose-500/10",

    iconBg:
      "bg-rose-500/10",

    iconColor:
      "text-rose-400",
  },

  {
    title: "Fast Response",

    desc:
      "Critical support requests handled within minutes.",

    gradient:
      "from-orange-500 to-amber-500",

    glow:
      "bg-orange-500/10",

    iconBg:
      "bg-orange-500/10",

    iconColor:
      "text-orange-400",
  },

  {
    title: "Live Tracking",

    desc:
      "Real-time shipment visibility during emergencies.",

    gradient:
      "from-cyan-500 to-blue-500",

    glow:
      "bg-cyan-500/10",

    iconBg:
      "bg-cyan-500/10",

    iconColor:
      "text-cyan-400",
  },

  {
    title: "Priority Support",

    desc:
      "Dedicated logistics specialists for urgent deliveries.",

    gradient:
      "from-violet-500 to-fuchsia-500",

    glow:
      "bg-violet-500/10",

    iconBg:
      "bg-violet-500/10",

    iconColor:
      "text-violet-400",
  },
]

export default function Emergency() {

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

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
          className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl md:p-12"
        >

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">

            {/* LEFT */}
            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-rose-500/20 bg-rose-500/10 px-5 py-2 backdrop-blur-xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />

                <p className="text-[10px] font-medium tracking-[0.28em] text-rose-300">
                  EMERGENCY SUPPORT
                </p>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                Need urgent

                <span className="block bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">

                  shipment help?
                </span>
              </h2>

              {/* Desc */}
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">

                Connect instantly with our emergency logistics
                response team for critical delivery and transportation
                support.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">

                <button className="flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 px-8 text-sm font-medium text-white shadow-[0_10px_40px_rgba(244,63,94,0.25)] transition hover:scale-[1.03]">

                  <Phone className="h-4 w-4" />

                  Call Emergency

                  <ArrowRight className="h-4 w-4" />
                </button>

                <button className="flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                  Live Assistance
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid gap-5 md:grid-cols-2">

              {cards.map((item, index) => (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 40,
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
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] md:p-7"
                >

                  {/* Glow */}
                  <div
                    className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full ${item.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full ${item.iconBg}`}
                  >

                    <ShieldAlert
                      className={`h-6 w-6 ${item.iconColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative mt-7">

                    <h3 className="text-3xl font-bold tracking-tight text-white">

                      {item.title}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-zinc-400">

                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}