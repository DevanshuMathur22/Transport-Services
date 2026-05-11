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
    question:
      "How does Porter delivery work?",

    answer:
      "You can instantly book a vehicle, select pickup and drop locations, track the driver live and manage deliveries seamlessly across cities.",
  },

  {
    question:
      "What vehicle types are available?",

    answer:
      "We provide bikes, mini trucks, tempos and packers movers services depending on your transportation requirements.",
  },

  {
    question:
      "Is live tracking available?",

    answer:
      "Yes, all deliveries include real-time GPS tracking, driver information and instant status updates.",
  },

  {
    question:
      "Which payment methods are supported?",

    answer:
      "Cash, UPI, credit cards, debit cards and digital wallets are supported for secure payments.",
  },

  {
    question:
      "Do you provide intercity transport?",

    answer:
      "Yes, intercity transportation and enterprise logistics solutions are available across major cities in India.",
  },
]

export default function Faq() {

  const [active, setActive] =
    useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr]">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                FAQ
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Everything you
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                need to know.
              </span>
            </h2>

            {/* Paragraph */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 md:text-base">

              Quick answers about
              deliveries, pricing,
              transportation and
              logistics services.
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            {faqs.map((faq, index) => {

              const isOpen =
                active === index

              return (
                <motion.div
                  key={faq.question}
                  layout
                  transition={{
                    duration: 0.3,
                  }}
                  className={`overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-all duration-300 ${
                    isOpen
                      ? "border-cyan-500/20 bg-cyan-500/10"
                      : "border-white/10 bg-white/5"
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
                    className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left md:px-7 md:py-6"
                  >

                    <div>

                      {/* Question */}
                      <h3 className="text-2xl font-bold leading-tight tracking-tight text-white">

                        {faq.question}
                      </h3>

                      {/* Answer */}
                      <AnimatePresence>

                        {isOpen && (
                          <motion.p
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base"
                          >

                            {faq.answer}
                          </motion.p>
                        )}

                      </AnimatePresence>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-cyan-500/30 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                          : "border-white/10 bg-white/5 text-white"
                      }`}
                    >

                      <ChevronDown
                        className={`h-5 w-5 transition duration-300 ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}