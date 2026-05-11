// components/partner/Faq.tsx

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
      "How much can I earn as a partner?",

    answer:
      "Earnings depend on delivery volume, city demand and working hours. Active partners can earn competitive daily and monthly payouts.",
  },

  {
    question:
      "Which vehicles are supported?",

    answer:
      "Bike, mini truck, tempo and commercial delivery vehicles are supported across logistics operations.",
  },

  {
    question:
      "How quickly can I start deliveries?",

    answer:
      "After successful verification and onboarding, most partners can start delivering within 24 hours.",
  },

  {
    question:
      "Do I get flexible working hours?",

    answer:
      "Yes, you can work anytime and manage deliveries according to your own preferred schedule.",
  },

  {
    question:
      "How are payments transferred?",

    answer:
      "Secure payouts and incentives are transferred directly to your registered bank account.",
  },
]

export default function Faq() {

  const [active, setActive] =
    useState<number | null>(0)

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

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">

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
                FAQ
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Everything you
              <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">

                need to know.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-lg text-sm leading-8 text-zinc-400 md:text-base">

              Common questions about
              onboarding, deliveries,
              earnings and transportation
              partner operations.
            </p>
          </motion.div>

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
                    y: 50,
                    scale: 0.96,
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
                    y: -4,
                  }}
                  className={`overflow-hidden rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-500 ${
                    isOpen
                      ? "border-violet-500/30 bg-white/[0.08] shadow-[0_20px_80px_rgba(168,85,247,0.12)]"
                      : "border-white/10 bg-white/5 hover:border-violet-500/20 hover:bg-white/[0.07]"
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
                    <motion.div
                      animate={{
                        rotate: isOpen
                          ? 180
                          : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >

                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
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
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      >

                        <div className="px-6 pb-6 md:px-8 md:pb-8">

                          <div className="h-px w-full bg-white/10" />

                          <motion.p
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: 0.15,
                              duration: 0.4,
                            }}
                            className="pt-6 text-sm leading-8 text-zinc-400 md:text-base"
                          >

                            {faq.answer}
                          </motion.p>
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