"use client"

import { useState } from "react"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import {
  Minus,
  Plus,
} from "lucide-react"

const faqs = [
  {
    question: "How does Porter delivery work?",
    answer:
      "Book a vehicle instantly, select pickup and drop locations and track your shipment live with real-time delivery updates.",
  },
  {
    question: "What vehicles are available?",
    answer:
      "Choose from bikes, mini trucks, tempos and enterprise transport vehicles based on your delivery requirements.",
  },
  {
    question: "Can businesses use Porter?",
    answer:
      "Yes, businesses can access enterprise logistics solutions with smart tracking, custom pricing and dedicated support.",
  },
  {
    question: "Is live tracking included?",
    answer:
      "Every delivery includes real-time tracking, driver updates and shipment status notifications.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team anytime through the app or by calling our helpline for immediate assistance.",
  },
]

export default function Faq() {

  const [active, setActive] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Heading */}
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
          viewport={{ once: true }}
          className="text-center"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              FAQs
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Everything you need
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              to know.
            </span>
          </h2>

          {/* Desc */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Quick answers to common questions about
            logistics, transportation and delivery
            services.
          </p>
        </motion.div>

        {/* FAQ */}
        <div className="mt-12 space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = active === index

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
                viewport={{ once: true }}
                className={`overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-cyan-500/20 bg-cyan-500/5"
                    : "border-white/10 bg-white/5"
                }`}
              >

                {/* Question */}
                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left md:px-8"
                >

                  <h3 className="text-sm font-semibold tracking-tight text-white md:text-base">

                    {faq.question}
                  </h3>

                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "border-white/10 bg-white/5 text-zinc-300"
                    }`}
                  >

                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {/* Answer */}
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

                      <div className="px-6 pb-6 pr-14 md:px-8">

                        <div className="mb-5 h-px w-full bg-white/10" />

                        <p className="max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">

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
    </section>
  )
}