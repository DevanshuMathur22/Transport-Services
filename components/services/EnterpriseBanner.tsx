"use client"

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

import { useRef } from "react"

import {
  ArrowRight,
  Building2,
} from "lucide-react"

export default function EnterpriseBanner() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["-10%", "10%"]
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#09090B] py-20 md:py-28"
    >

      {/* FULL WIDTH */}
      <div className="relative h-[420px] overflow-hidden rounded-[3rem] border border-white/10 md:h-[560px]">

        {/* BG IMAGE */}
        <motion.div
          style={{
            y,
          }}
          className="absolute inset-0 scale-125"
        >

          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2400&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

        {/* GLOW */}
        <div className="absolute left-[-120px] top-0 h-[380px] w-[380px] rounded-full bg-orange-500/15 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[380px] w-[380px] rounded-full bg-red-500/10 blur-3xl" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex h-full items-center justify-end">

          <div className="w-full max-w-7xl px-5 md:px-16">

            <motion.div
              initial={{
                opacity: 0,
                y: 60,
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
              className="ml-auto max-w-2xl text-right"
            >

              {/* BADGE */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

                <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
                  ENTERPRISE LOGISTICS
                </p>
              </div>

              {/* HEADING */}
              <h2 className="mt-6 text-4xl font-bold leading-[0.95] tracking-tight text-white md:text-6xl">

                Built for
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 bg-clip-text text-transparent">

                  large scale
                </span>

                <span className="block">
                  movement.
                </span>
              </h2>

              {/* DESC */}
              <p className="mt-6 ml-auto max-w-xl text-sm leading-8 text-zinc-400 md:text-base">

                Smart transportation
                infrastructure for
                warehouses, enterprises
                and nationwide logistics
                operations.
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex justify-end gap-4">

                <button className="flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 text-sm font-medium text-white shadow-[0_10px_40px_rgba(249,115,22,0.35)] transition hover:scale-[1.02]">

                  <Building2 className="h-4 w-4" />

                  Contact Sales
                </button>

                <button className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-2xl transition hover:bg-white/10">

                  Explore

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HUGE TEXT */}
        <div className="absolute bottom-[-20px] right-6 select-none text-[90px] font-bold tracking-[-0.08em] text-white/[0.03] md:text-[220px]">

          PORTER
        </div>
      </div>
    </section>
  )
}