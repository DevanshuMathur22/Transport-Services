"use client"

import { motion } from "framer-motion"

import {
  Route,
  ShieldCheck,
  Clock3,
  BarChart3,
} from "lucide-react"

const features = [
  {
    title: "Real-Time Tracking",
    desc: "Track enterprise shipments live with smart transportation visibility.",
    icon: Route,
  },

  {
    title: "Secure Infrastructure",
    desc: "Enterprise-grade systems designed for reliable logistics operations.",
    icon: ShieldCheck,
  },

  {
    title: "Fast Operations",
    desc: "Optimized routing and warehouse workflows for scalable delivery speed.",
    icon: Clock3,
  },

  {
    title: "Business Insights",
    desc: "Advanced shipment analytics and performance monitoring dashboards.",
    icon: BarChart3,
  },
]

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute right-[-120px] bottom-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              PLATFORM FEATURES
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 mx-auto max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Built for modern
            <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

              enterprise logistics.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">

            Smart business tools
            designed to optimize
            transportation,
            warehouse operations
            and large-scale delivery
            systems.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item, index) => {

            const Icon = item.icon

            return (
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
                className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(16,185,129,0.08)] md:p-8"
              >

                {/* Glow */}
                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-emerald-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-emerald-500/20 group-hover:bg-gradient-to-r group-hover:from-emerald-500/20 group-hover:to-orange-500/20">

                  <Icon className="h-7 w-7 text-emerald-400" />
                </div>

                {/* Content */}
                <div className="relative mt-10">

                  <h3 className="text-3xl font-bold leading-tight tracking-tight text-white">

                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-8 text-zinc-400 md:text-base">

                    {item.desc}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-400 to-orange-400 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}