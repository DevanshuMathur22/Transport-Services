"use client"

import { motion } from "framer-motion"

type Props = {
  service: {
    title: string
    image: string
  }
}

export default function Cta({
  service,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10">

        {/* Background Image */}
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Content */}
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
          className="relative z-10 px-6 py-16 md:px-14 md:py-24"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              START SHIPPING
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Ready for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              {service.title}?
            </span>
          </h2>

          {/* Desc */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

            Book fast deliveries with
            real-time tracking, smart
            logistics infrastructure and
            premium transport support
            across India.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button className="h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.03]">

              Book Now
            </button>

            <button className="h-12 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

              Contact Support
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">

            {[
              {
                number: "10M+",
                label: "Trips",
              },
              {
                number: "500+",
                label: "Cities",
              },
              {
                number: "24/7",
                label: "Tracking",
              },
            ].map((item) => (
              <div key={item.number}>

                <h3 className="text-4xl font-bold tracking-tight text-white">

                  {item.number}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">

                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}