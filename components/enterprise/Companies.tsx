"use client"

import { motion } from "framer-motion"

const companies = [
  "Amazon",
  "Flipkart",
  "Myntra",
  "Nykaa",
  "Meesho",
  "Ajio",
]

export default function Companies() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              TRUSTED NETWORK
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Trusted by growing
            <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

              enterprise brands.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">

            Businesses across India
            rely on our smart logistics
            infrastructure for scalable
            transportation operations.
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-16 overflow-hidden">

          {/* Fade Left */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#09090B] to-transparent" />

          {/* Fade Right */}
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#09090B] to-transparent" />

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-5"
          >

            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="group relative flex h-32 w-[240px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl"
              >

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-orange-500/5" />

                {/* Company */}
                <h3 className="relative bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">

                  {company}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">

          {[
            {
              number: "500+",
              label: "Enterprise Clients",
            },

            {
              number: "10M+",
              label: "Monthly Deliveries",
            },

            {
              number: "99.9%",
              label: "Operational Uptime",
            },
          ].map((item) => (
            <motion.div
              key={item.number}
              whileHover={{
                y: -5,
              }}
              className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-7 text-center backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.08] md:p-8"
            >

              <h3 className="text-5xl font-bold tracking-tight text-white">

                {item.number}
              </h3>

              <p className="mt-4 text-base text-zinc-400">

                {item.label}
              </p>

              <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 transition-all duration-500 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}