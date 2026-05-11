"use client"

import { motion } from "framer-motion"

const stats = [
  {
    number: "10M+",
    label: "Monthly Shipments",
  },

  {
    number: "500+",
    label: "Enterprise Clients",
  },

  {
    number: "1,240",
    label: "Active Fleet",
  },

  {
    number: "99.9%",
    label: "Delivery Success",
  },
]

export default function Stats() {
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
                ENTERPRISE SCALE
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Logistics built
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                for high growth.
              </span>
            </h2>
          </div>

          {/* Paragraph */}
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">

            Powerful transportation
            infrastructure supporting
            enterprise deliveries
            across India at
            massive scale.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => (
            <motion.div
              key={item.label}
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
              className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(16,185,129,0.08)]"
            >

              {/* Glow */}
              <div className="absolute right-[-50px] top-[-50px] h-44 w-44 rounded-full bg-emerald-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              {/* Number */}
              <h3 className="relative text-6xl font-bold tracking-tight text-white">

                {item.number}
              </h3>

              {/* Divider */}
              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-emerald-500/20 via-orange-500/20 to-transparent" />

              {/* Label */}
              <p className="relative mt-6 text-base text-zinc-400">

                {item.label}
              </p>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-400 to-orange-400 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}