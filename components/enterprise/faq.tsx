"use client"

import { useState } from "react"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question:
      "Which businesses can use enterprise logistics?",

    answer:
      "Warehouses, ecommerce brands, manufacturers and high-volume logistics operations can use our enterprise infrastructure.",
  },

  {
    question:
      "Do you provide dedicated fleet support?",

    answer:
      "Yes, enterprise clients receive scalable fleet management and smart transportation solutions.",
  },

  {
    question:
      "Can I track all shipments in real-time?",

    answer:
      "Our enterprise dashboard provides live shipment visibility, analytics and operational monitoring.",
  },

  {
    question:
      "Do you support custom logistics workflows?",

    answer:
      "Yes, we provide flexible logistics systems tailored for enterprise operational requirements.",
  },

  {
    question:
      "How secure is the platform?",

    answer:
      "Enterprise operations run on secure and reliable infrastructure with high operational uptime.",
  },
]

export default function Faq() {

  const [active, setActive] =
    useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute right-[-100px] bottom-0 h-[280px] w-[280px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                FAQ
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Enterprise logistics
              <span className="block bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">

                explained simply.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-lg text-sm leading-8 text-zinc-400 md:text-base">

              Common questions about
              enterprise operations,
              transportation infrastructure
              and scalable logistics
              systems.
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {faqs.map((faq, index) => {

              const isOpen =
                active === index

              return (
                <motion.div
                  key={faq.question}
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
                  className={`group overflow-hidden rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-500 ${
                    isOpen
                      ? "border-emerald-500/20 bg-white/10 shadow-[0_20px_80px_rgba(16,185,129,0.08)]"
                      : "border-white/10 bg-white/5 hover:border-emerald-500/10 hover:bg-white/[0.07]"
                  }`}
                >

                  {/* Button */}
                  <button
                    onClick={() =>
                      setActive(
                        isOpen
                          ? null
                          : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-5 p-6 text-left md:p-8"
                  >

                    <h3 className="max-w-[85%] text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">

                      {faq.question}
                    </h3>

                    {/* Arrow */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-gradient-to-r from-emerald-500 to-orange-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                          : "text-zinc-400 group-hover:border-emerald-500/20 group-hover:text-white"
                      }`}
                    >

                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  {/* Content */}
                  <AnimatePresence>

                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                      >

                        <div className="px-6 pb-6 md:px-8 md:pb-8">

                          <div className="h-px w-full bg-gradient-to-r from-emerald-500/20 via-orange-500/20 to-transparent" />

                          <p className="pt-6 text-sm leading-8 text-zinc-400 md:text-base">

                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}