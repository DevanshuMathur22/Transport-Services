"use client"

import { useState } from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import Image from "next/image"

import {
  ChevronDown,
  Bike,
  Truck,
  ShieldCheck,
  Package,
} from "lucide-react"

const data = [
  {
    title: "Bike Delivery",

    desc: `Fast intra-city bike deliveries with live tracking, instant booking and smart route optimization for urgent shipments across every city.`,

    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1600&auto=format&fit=crop",

    icon: Bike,
  },

  {
    title: "Truck Rentals",

    desc: `Mini trucks and large transport vehicles available for commercial logistics and bulk transportation services.

Reliable transportation infrastructure for businesses, warehouses and enterprise logistics movement.`,

    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1600&auto=format&fit=crop",

    icon: Truck,
  },

  {
    title: "Enterprise Logistics",

    desc: `Enterprise-grade logistics infrastructure with warehouse movement, smart operations and dedicated transportation support.

Built for growing businesses, nationwide movement and scalable operations.`,

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",

    icon: ShieldCheck,
  },

  {
    title: "Packers Movers",

    desc: `Reliable home and office shifting experience with secure packaging and real-time delivery updates.

Safe transportation ecosystem designed for modern relocation services.`,

    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",

    icon: Package,
  },
]

export default function Content() {

  const [active, setActive] =
    useState(0)

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[340px] w-[340px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[340px] w-[340px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-12">

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]">

          {/* LEFT */}
          <div>

            {/* TOP */}
            <div className="mb-10">

              {/* Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

                <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
                  PORTER SERVICES
                </p>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-4xl font-bold leading-[1] tracking-tight text-white md:text-5xl">

                Smart logistics
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 bg-clip-text text-transparent">

                  for every movement.
                </span>
              </h2>
            </div>

            {/* ACCORDION */}
            <div className="space-y-5">

              {data.map((item, i) => {

                const Icon = item.icon

                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -4,
                    }}
                    className={`overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-all duration-300 ${
                      i === active
                        ? "border-orange-500/20 bg-white/[0.07]"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >

                    <button
                      onClick={() =>
                        setActive(i)
                      }
                      className="flex w-full items-start justify-between gap-5 p-6 text-left md:p-7"
                    >

                      <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            i === active
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_10px_40px_rgba(249,115,22,0.35)]"
                              : "bg-white/5 text-zinc-400"
                          }`}
                        >

                          <Icon className="h-6 w-6" />
                        </div>

                        {/* Content */}
                        <div>

                          <h3
                            className={`text-xl font-bold tracking-tight transition ${
                              i === active
                                ? "text-white"
                                : "text-zinc-300"
                            }`}
                          >

                            {item.title}
                          </h3>

                          <AnimatePresence>

                            {i === active && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                }}
                                exit={{
                                  opacity: 0,
                                  height: 0,
                                }}
                                transition={{
                                  duration: 0.35,
                                }}
                                className="overflow-hidden"
                              >

                                {item.desc
                                  .split("\n")
                                  .map((para, idx) => (
                                    <p
                                      key={idx}
                                      className="mt-4 max-w-xl text-sm leading-8 text-zinc-400 md:text-base"
                                    >

                                      {para}
                                    </p>
                                  ))}
                              </motion.div>
                            )}

                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          i === active
                            ? "rotate-180 border-orange-500/20 bg-orange-500/10 text-orange-300"
                            : "border-white/10 bg-white/5 text-zinc-500"
                        }`}
                      >

                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[340px] overflow-hidden rounded-[2.5rem] border border-white/10 md:h-[620px]">

            {/* Glow */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <AnimatePresence mode="wait">

              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  scale: 1.06,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="absolute inset-0"
              >

                <Image
                  src={data[active].image}
                  alt=""
                  fill
                  className="object-cover"
                />

              </motion.div>
            </AnimatePresence>

            {/* Floating Card */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="absolute bottom-5 left-5 right-5 z-20 rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-2xl md:p-6"
            >

              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-400">
                ACTIVE SERVICE
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">

                {data[active].title}
              </h3>

              <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 to-red-400" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}