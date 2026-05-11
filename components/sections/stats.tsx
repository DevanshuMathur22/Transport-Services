"use client"

import { motion } from "framer-motion"

const stats = [
  {
    number: "10M+",
    label: "Deliveries Completed",
  },
  {
    number: "500+",
    label: "Cities Covered",
  },
  {
    number: "250K+",
    label: "Business Partners",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
]

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-1/2 top-[-120px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
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
          viewport={{ once: true }}
          className="max-w-xl"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              TRUSTED NATIONWIDE
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Powering modern
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              logistics across India.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Businesses and individuals trust our
            smart logistics ecosystem for speed,
            reliability and seamless transportation.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/5"
            >

              {/* Glow */}
              <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Number */}
              <h3 className="relative text-3xl font-bold tracking-tight text-white md:text-4xl">

                {stat.number}
              </h3>

              {/* Divider */}
              <div className="mt-4 h-px w-full bg-white/10" />

              {/* Label */}
              <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">

                {stat.label}
              </p>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}