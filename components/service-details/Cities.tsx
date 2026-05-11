"use client"

import { motion } from "framer-motion"

const cities = [
  "Jaipur",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Chandigarh",
]

export default function Cities() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                CITIES COVERED
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Delivering across
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                every major city.
              </span>
            </h2>
          </div>

          {/* Paragraph */}
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">

            Smart transportation
            infrastructure and
            delivery ecosystem built
            for modern businesses
            and individuals.
          </p>
        </div>

        {/* Cities */}
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

          {cities.map((city, index) => (
            <motion.div
              key={city}
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
                delay: index * 0.06,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -5,
              }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.07]"
            >

              {/* Glow */}
              <div className="absolute right-[-50px] top-[-50px] h-36 w-36 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              {/* Number */}
              <div className="relative text-[10px] font-medium tracking-[0.28em] text-zinc-500">
                0{index + 1}
              </div>

              {/* City */}
              <h3 className="relative mt-6 text-3xl font-bold tracking-tight text-white">

                {city}
              </h3>

              {/* Line */}
              <div className="relative mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-hover:w-24" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
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
          className="relative mt-16 overflow-hidden rounded-[3rem] border border-white/10"
        >

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="h-[320px] w-full object-cover md:h-[520px]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">

            <div className="px-6 md:px-12">

              {/* Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

                <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                  NATIONWIDE NETWORK
                </p>
              </div>

              {/* Heading */}
              <h3 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                Expanding logistics
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  across India.
                </span>
              </h3>

              {/* Desc */}
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

                Smart delivery ecosystem
                built for scalability,
                reliability and premium
                transportation experiences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}