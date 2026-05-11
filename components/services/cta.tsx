"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowRight,
  PhoneCall,
} from "lucide-react"

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-24 pt-10 md:px-8 md:pb-32">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[340px] w-[340px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 px-8 py-20 backdrop-blur-2xl md:px-16">

        {/* Inner Glow */}
        <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-3xl" />

        {/* Content */}
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
          viewport={{
            once: true,
          }}
          className="relative z-10 max-w-4xl"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

            <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
              START SHIPPING
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-4xl font-bold leading-[1] tracking-tight text-white md:text-6xl">

            Ready to move your
            <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 bg-clip-text text-transparent">

              deliveries faster?
            </span>
          </h2>

          {/* Desc */}
          <p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-400 md:text-base">

            Book reliable logistics
            and transportation services
            with live tracking,
            smart pricing and seamless
            support.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/book"
              className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(249,115,22,0.35)] transition hover:scale-[1.02]"
            >

              Book Delivery

              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-2xl transition hover:bg-white/10"
            >

              <PhoneCall className="h-4 w-4" />

              Contact Sales
            </Link>
          </div>

          {/* Bottom Stats */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {[
              {
                number: "10M+",
                label: "Monthly Deliveries",
              },

              {
                number: "500+",
                label: "Enterprise Clients",
              },

              {
                number: "99.9%",
                label: "Delivery Success",
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                whileHover={{
                  y: -4,
                }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.08]"
              >

                <h3 className="text-3xl font-bold tracking-tight text-white">

                  {item.number}
                </h3>

                <p className="mt-3 text-sm text-zinc-500">

                  {item.label}
                </p>

                <div className="mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-orange-400 to-red-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}