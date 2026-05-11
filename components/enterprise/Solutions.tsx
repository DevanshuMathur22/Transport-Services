"use client"

import { motion } from "framer-motion"

import {
  Warehouse,
  Truck,
  BarChart3,
  ShieldCheck,
} from "lucide-react"

const solutions = [
  {
    title: "Warehouse Logistics",
    desc: "Smart transportation solutions for warehouses and fulfillment centers.",
    icon: Warehouse,
  },

  {
    title: "Fleet Management",
    desc: "Real-time fleet visibility with advanced shipment operations.",
    icon: Truck,
  },

  {
    title: "Analytics Dashboard",
    desc: "Powerful business insights with live logistics performance tracking.",
    icon: BarChart3,
  },

  {
    title: "Secure Operations",
    desc: "Enterprise-grade infrastructure with reliable delivery systems.",
    icon: ShieldCheck,
  },
]

export default function Solutions() {
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
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                ENTERPRISE SOLUTIONS
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Built for scalable
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                business operations.
              </span>
            </h2>
          </div>

          {/* Paragraph */}
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">

            Advanced logistics
            infrastructure designed
            for enterprises,
            supply chains and
            high-volume delivery
            systems.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">

          {solutions.map((item, index) => {

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
                className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(16,185,129,0.08)] md:p-10"
              >

                {/* Glow */}
                <div className="absolute right-[-60px] top-[-60px] h-44 w-44 rounded-full bg-emerald-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                {/* Top */}
                <div className="relative flex items-start justify-between gap-5">

                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-emerald-500/20 group-hover:bg-gradient-to-r group-hover:from-emerald-500/20 group-hover:to-orange-500/20">

                    <Icon className="h-7 w-7 text-emerald-400" />
                  </div>

                  {/* Number */}
                  <div className="text-5xl font-bold tracking-tight text-white/10">

                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-10">

                  <h3 className="text-3xl font-bold leading-tight tracking-tight text-white">

                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-8 text-zinc-400 md:text-base">

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