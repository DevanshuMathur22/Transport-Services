// components/tracking/Faq.tsx

"use client"

import { useState } from "react"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import {
  ChevronDown,
} from "lucide-react"

const faqs = [
  {
    question: "How can I track my shipment?",
    answer:
      "Login to your dashboard and enter the shipment tracking ID for live updates.",
  },
  {
    question: "Is delivery ETA accurate?",
    answer:
      "Delivery estimates update dynamically based on live logistics activity.",
  },
  {
    question: "Can I contact the driver?",
    answer:
      "Yes, active shipments allow direct contact with delivery partners.",
  },
  {
    question: "What if my shipment is delayed?",
    answer:
      "You will receive instant updates and support assistance automatically.",
  },
]

export default function Faq() {

  const [active, setActive] = useState(0)

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

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                FAQ
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Frequently asked
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">

                questions.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 md:text-base">

              Everything you need to know about shipment
              tracking, delivery activity and support.
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            {faqs.map((faq, index) => {

              const isOpen = active === index

              return (
                <motion.div
                  key={faq.question}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 backdrop-blur-3xl"
                >

                  {/* Button */}
                  <button
                    onClick={() => setActive(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                  >

                    <h3 className="text-sm font-semibold tracking-tight text-white md:text-base">

                      {faq.question}
                    </h3>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 ${
                        isOpen
                          ? "rotate-180 border-orange-500/30 bg-orange-500/10"
                          : ""
                      }`}
                    >

                      <ChevronDown className="h-4 w-4 text-zinc-400" />
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
                          duration: 0.3,
                        }}
                      >

                        <div className="px-5 pb-5 md:px-6 md:pb-6">

                          <div className="h-px w-full bg-white/10" />

                          <p className="pt-4 text-xs leading-7 text-zinc-400 md:text-sm">

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