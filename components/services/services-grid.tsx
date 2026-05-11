"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import {
  Bike,
  Package,
  Truck,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"

const collections = [
  {
    title: "Bike Delivery",

    image:
      "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1200&auto=format&fit=crop",

    href: "/services/bike",

    icon: Bike,

    color:
      "from-cyan-400 to-blue-500",
  },

  {
    title: "Packers Movers",

    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?q=80&w=1200&auto=format&fit=crop",

    href: "/services/packers",

    icon: Package,

    color:
      "from-orange-400 to-amber-500",
  },

  {
    title: "Truck Rentals",

    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop",

    href: "/services/trucks",

    icon: Truck,

    color:
      "from-violet-400 to-fuchsia-500",
  },

  {
    title: "Enterprise Logistics",

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",

    href: "/services/enterprise",

    icon: ShieldCheck,

    color:
      "from-emerald-400 to-teal-500",
  },
]

export default function ServicesShowcase() {

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-24 md:px-8">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TOP */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.32em] text-zinc-300">
              SERVICES
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-7xl">

            Discover logistics
            <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">

              built for India.
            </span>
          </h2>

          {/* Desc */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base md:leading-8">

            Smart transportation
            ecosystem designed for
            instant delivery,
            enterprise logistics and
            modern movement.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {collections.map(
            (item, index) => {

              const Icon =
                item.icon

              return (
                <motion.div
                  key={item.title}
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
                    delay:
                      index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="min-w-[300px]"
                >

                  <Link
                    href={item.href}
                    className="group block"
                  >

                    {/* CARD */}
                    <div className="relative h-[460px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-white/20">

                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

                      {/* Top */}
                      <div className="absolute left-5 top-5 right-5 flex items-center justify-between">

                        {/* Icon */}
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
                        >

                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        {/* Arrow */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white opacity-0 backdrop-blur-xl transition duration-500 group-hover:opacity-100">

                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="absolute bottom-7 left-0 w-full px-6">

                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">

                          PORTER
                        </p>

                        <h3 className="mt-3 text-3xl font-bold leading-none tracking-tight text-white">

                          {item.title}
                        </h3>

                        <div
                          className={`mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500 group-hover:w-28`}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}