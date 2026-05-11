"use client"

import { motion } from "framer-motion"

const logos = [
  "SWIGGY",
  "ZOMATO",
  "AMAZON",
  "FLIPKART",
  "MYNTRA",
  "UBER",
  "BLINKIT",
  "NYKAA",
]

export default function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] py-20 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">

        {/* Top */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              TRUSTED BY LEADING BRANDS
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Powering deliveries
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              across India.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

            Trusted by modern brands,
            startups and businesses
            for seamless logistics
            and transportation services.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative mt-14 overflow-hidden">

          {/* Left Fade */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#09090B] to-transparent" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#09090B] to-transparent" />

          {/* Moving Logos */}
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-4"
          >

            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="group flex h-24 w-[220px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 px-6 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/10"
              >

                <h3 className="text-xl font-bold tracking-[0.28em] text-zinc-300 transition duration-300 group-hover:text-white">

                  {logo}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}