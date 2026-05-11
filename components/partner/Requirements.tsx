// components/partner/Requirements.tsx

"use client"

import { motion } from "framer-motion"

import {
  BadgeCheck,
  IdCard,
  Bike,
  Smartphone,
} from "lucide-react"

const requirements = [
  {
    title: "Government ID",

    desc:
      "Valid Aadhaar card, PAN card or driving license required.",

    icon: IdCard,
  },

  {
    title: "Own Vehicle",

    desc:
      "Bike, mini truck or commercial delivery vehicle supported.",

    icon: Bike,
  },

  {
    title: "Smartphone",

    desc:
      "Android or iPhone device required for delivery management.",

    icon: Smartphone,
  },

  {
    title: "Quick Verification",

    desc:
      "Fast onboarding and instant partner verification process.",

    icon: BadgeCheck,
  },
]

export default function Requirements() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute right-[-100px] bottom-0 h-[280px] w-[280px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                REQUIREMENTS
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Everything you need
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                to get started.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-xl text-sm leading-8 text-zinc-400 md:text-base">

              Simple onboarding
              requirements designed
              for fast verification
              and seamless delivery
              partner registration.
            </p>

            {/* Image */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -6,
              }}
              className="group relative mt-10 overflow-hidden rounded-[3rem] border border-white/10"
            >

              <img
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1800&auto=format&fit=crop"
                alt=""
                className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Card */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl md:p-6"
              >

                <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                  QUICK ONBOARDING
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-4xl">

                  Start delivering
                  <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                    within 24 hours.
                  </span>
                </h3>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="grid gap-5 md:grid-cols-2">

            {requirements.map((item, index) => {

              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.07] hover:shadow-[0_20px_80px_rgba(168,85,247,0.12)] md:p-8"
                >

                  {/* Glow */}
                  <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/20 to-pink-500/20"
                  >

                    <Icon className="h-7 w-7 text-violet-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative mt-10">

                    <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">

                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-8 text-zinc-400 md:text-base">

                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}