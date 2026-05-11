"use client"

import { motion } from "framer-motion"

import {
  ArrowUpRight,
  Zap,
  ShieldCheck,
} from "lucide-react"

const cards = [
  {
    title: "Fastest Deliveries",

    desc:
      "Ultra fast bike and truck delivery network across India.",

    image:
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1400&auto=format&fit=crop",

    icon: Zap,

    color:
      "from-cyan-400 to-blue-500",
  },

  {
    title: "Enterprise Logistics",

    desc:
      "Smart transportation solutions for growing businesses.",

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",

    icon: ShieldCheck,

    color:
      "from-violet-400 to-fuchsia-500",
  },
]

export default function Stats() {

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
              SERVICE NETWORK
            </p>
          </div>

          {/* Title */}
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-7xl">

            Unmatched logistics
            <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">

              across India.
            </span>
          </h2>

          {/* Desc */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base md:leading-8">

            Smart delivery
            infrastructure built for
            speed, reliability and
            seamless transportation.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6">

          {cards.map(
            (card, index) => {

              const Icon =
                card.icon

              return (
                <motion.div
                  key={card.title}
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
                    delay:
                      index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-white/20"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden">

                    <img
                      src={card.image}
                      alt=""
                      className="h-[240px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Icon */}
                    <div
                      className={`absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${card.color} shadow-lg`}
                    >

                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Floating Text */}
                    <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7">

                      <h3 className="text-2xl font-bold tracking-tight text-white md:text-5xl">

                        {card.title}
                      </h3>

                      <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 md:mt-5 md:text-base md:leading-7">

                        {card.desc}
                      </p>

                      {/* Line */}
                      <div
                        className={`mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r ${card.color} transition-all duration-500 group-hover:w-28`}
                      />
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between p-5 md:p-7">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">

                        PORTER SERVICE
                      </p>

                      <h4 className="mt-2 text-sm font-medium text-white md:text-lg">

                        Smart Transportation
                      </h4>
                    </div>

                    <button className="flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">

                      Explore

                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}