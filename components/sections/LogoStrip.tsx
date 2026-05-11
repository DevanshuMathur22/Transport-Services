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
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

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
          className="text-center"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              TRUSTED BRANDS
            </p>
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Powering deliveries for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              modern businesses.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Trusted by leading startups, enterprises and
            modern brands across India for seamless
            logistics and transportation solutions.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-12 overflow-hidden">

          {/* Left Fade */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#09090B] to-transparent" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#09090B] to-transparent" />

          {/* Logos */}
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 22,
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
                className="group flex h-20 w-[180px] items-center justify-center rounded-[1.8rem] border border-white/10 bg-white/5 backdrop-blur-3xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10"
              >

                <h3 className="text-sm font-semibold tracking-[0.35em] text-zinc-400 transition duration-300 group-hover:text-white">

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