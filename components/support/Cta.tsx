// components/support/Cta.tsx

"use client"

import { motion } from "framer-motion"

import {
  ArrowRight,
  MessageCircle,
} from "lucide-react"

const stats = [
  {
    number: "24/7",

    label: "Support",

    gradient:
      "from-violet-500 to-fuchsia-500",

    glow:
      "bg-violet-500/10",
  },

  {
    number: "2 Min",

    label: "Response Time",

    gradient:
      "from-cyan-500 to-blue-500",

    glow:
      "bg-cyan-500/10",
  },

  {
    number: "500+",

    label: "Cities",

    gradient:
      "from-emerald-500 to-green-500",

    glow:
      "bg-emerald-500/10",
  },

  {
    number: "99%",

    label: "Resolution Rate",

    gradient:
      "from-orange-500 to-amber-500",

    glow:
      "bg-orange-500/10",
  },
]

export default function Cta() {

  return (
    <section className="overflow-hidden bg-[#09090B] px-4 pb-20 md:px-8 md:pb-28">

      <div className="mx-auto max-w-7xl">

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
          className="relative overflow-hidden rounded-[3rem] border border-white/10"
        >

          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Glow */}
          <div className="absolute left-[-100px] top-0 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.32em] text-zinc-300">
                SUPPORT CENTER
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-6 max-w-5xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              We’re always here

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                to help you.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">

              Connect with our logistics specialists for deliveries,
              tracking, transportation and real-time shipment support.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 px-8 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]">

                Contact Support

                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-2xl transition hover:bg-white/20">

                <MessageCircle className="h-4 w-4 text-emerald-400" />

                Live Chat
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

              {stats.map((item) => (

                <motion.div
                  key={item.number}
                  whileHover={{
                    y: -5,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08]"
                >

                  {/* Glow */}
                  <div
                    className={`absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full ${item.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
                  />

                  {/* Number */}
                  <h3
                    className={`relative bg-gradient-to-r ${item.gradient} bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl`}
                  >

                    {item.number}
                  </h3>

                  {/* Label */}
                  <p className="relative mt-3 text-base text-zinc-400">

                    {item.label}
                  </p>

                  {/* Bottom Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}