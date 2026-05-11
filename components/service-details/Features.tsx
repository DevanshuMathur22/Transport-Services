"use client"

import { motion } from "framer-motion"

import {
  Clock3,
  MapPinned,
  ShieldCheck,
  Truck,
} from "lucide-react"

type Props = {
  service: {
    features: string[]
  }
}

const icons = [
  MapPinned,
  Clock3,
  Truck,
  ShieldCheck,
]

export default function Features({
  service,
}: Props) {
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
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              FEATURES
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Built for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              modern logistics.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

            Smart transportation infrastructure designed
            for fast, scalable and reliable delivery
            operations across India.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          {service.features.map((feature, index) => {

            const Icon = icons[index]

            return (
              <motion.div
                key={feature}
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
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.07]"
              >

                {/* Glow */}
                <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>

                {/* Content */}
                <div className="relative mt-6">

                  <h3 className="text-2xl font-bold leading-tight tracking-tight text-white">

                    {feature}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">

                    Premium delivery ecosystem with
                    modern logistics infrastructure
                    and seamless transportation support.
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-hover:w-24" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}