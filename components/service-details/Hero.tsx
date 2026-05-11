"use client"

import { motion } from "framer-motion"

type Props = {
  service: {
    title: string
    subtitle: string
    image: string
    price: string
  }
}

export default function Hero({
  service,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">

      {/* Glow */}
      <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                PORTER SERVICE
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

              {service.subtitle}
            </p>

            {/* Price */}
            <div className="mt-10">

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-500">
                STARTING PRICE
              </p>

              <h3 className="mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">

                {service.price}
              </h3>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]">

                Book Now
              </button>

              <button className="h-12 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                Live Tracking
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
                  label: "Support",
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

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >

            {/* Image */}
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl">

              <img
                src={service.image}
                alt=""
                className="h-[420px] w-full object-cover md:h-[760px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-2xl md:bottom-8 md:left-8 md:right-8 md:p-7">

                {/* Badge */}
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">

                  <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                    LIVE DELIVERY
                  </p>
                </div>

                {/* Title */}
                <h3 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                  Smart transport
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                    across India.
                  </span>
                </h3>

                {/* Desc */}
                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 md:text-base">

                  Real-time tracking and premium logistics
                  infrastructure designed for modern
                  transportation.
                </p>

                {/* Progress */}
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}