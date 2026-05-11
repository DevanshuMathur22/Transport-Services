// components/tracking/Driver.tsx

"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"

export default function Driver() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-16 md:px-8 md:pb-24">

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[260px] w-[260px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr]">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl md:p-6"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                DELIVERY PARTNER
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Safe and secure
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                delivery network.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 md:text-base">

              Verified drivers, secure transportation and
              real-time communication for seamless delivery.
            </p>

            {/* Profile */}
            <div className="mt-7 flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl">

              <div className="relative">

                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#09090B] bg-emerald-400" />
              </div>

              <div>

                <h3 className="text-lg font-semibold tracking-tight text-white">
                  Verified Partner
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  Login required for driver details
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">

                  <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />

                  <p className="text-xs text-zinc-300">
                    Trusted Logistics Network
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/login"
                className="flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition hover:scale-[1.02]"
              >

                <Phone className="h-4 w-4" />

                Login to Call
              </Link>

              <button className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-xs font-medium text-white backdrop-blur-xl transition hover:border-orange-500/30 hover:bg-orange-500/10">

                <MessageCircle className="h-4 w-4" />

                Live Chat
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >

            {[
              {
                icon: ShieldCheck,
                title: "Verified Drivers",
                desc: "Identity verified delivery partners.",
              },
              {
                icon: Truck,
                title: "Smart Fleet",
                desc: "Modern vehicles with live tracking.",
              },
              {
                icon: Star,
                title: "Top Rated",
                desc: "Highly rated delivery experience.",
              },
              {
                icon: MessageCircle,
                title: "24/7 Support",
                desc: "Instant assistance during shipments.",
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl transition-all duration-300"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">

                    <Icon className="h-5 w-5 text-orange-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">

                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-7 text-zinc-400">

                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}