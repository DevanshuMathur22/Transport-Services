// components/support/Faq.tsx

"use client"

import { useState } from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question:
      "How can I track my shipment?",

    answer:
      "Use your tracking ID to monitor live shipment updates, transportation progress and estimated delivery timing.",

    gradient:
      "from-cyan-500 to-blue-500",

    glow:
      "bg-cyan-500/10",

    bg:
      "from-cyan-500/[0.08] to-blue-500/[0.08]",
  },

  {
    question:
      "How quickly does support respond?",

    answer:
      "Most support requests are answered within a few minutes through calls, live chat and WhatsApp assistance.",

    gradient:
      "from-violet-500 to-fuchsia-500",

    glow:
      "bg-violet-500/10",

    bg:
      "from-violet-500/[0.08] to-fuchsia-500/[0.08]",
  },

  {
    question:
      "Can I modify my booking after confirmation?",

    answer:
      "Yes, shipment schedules, addresses and transportation preferences can be updated before dispatch.",

    gradient:
      "from-emerald-500 to-green-500",

    glow:
      "bg-emerald-500/10",

    bg:
      "from-emerald-500/[0.08] to-green-500/[0.08]",
  },

  {
    question:
      "How do partner payouts work?",

    answer:
      "Delivery partners receive secure payouts and incentives directly to their registered bank accounts.",

    gradient:
      "from-orange-500 to-amber-500",

    glow:
      "bg-orange-500/10",

    bg:
      "from-orange-500/[0.08] to-amber-500/[0.08]",
  },

  {
    question:
      "What if my delivery gets delayed?",

    answer:
      "You will receive live tracking updates and assistance from our logistics support specialists instantly.",

    gradient:
      "from-pink-500 to-rose-500",

    glow:
      "bg-pink-500/10",

    bg:
      "from-pink-500/[0.08] to-rose-500/[0.08]",
  },
]

export default function Faq() {

  const [active, setActive] =
    useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />

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

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-2xl font-medium tracking-[0.1em] text-zinc-300">
                FAQ
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-2xl font-bold leading-[1] tracking-tight text-white md:text-3xl">

              Frequently asked

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                questions.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-lg text-2xl leading-10 text-zinc-400">

              Everything you need to know about tracking,
              deliveries, logistics operations and support assistance.
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
                  whileHover={{
                    y: -4,
                  }}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:bg-white/[0.06] hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] ${
                    isOpen
                      ? `bg-gradient-to-br ${faq.bg}`
                      : "bg-white/5 backdrop-blur-2xl"
                  }`}
                >

                  {/* Glow */}
                  <div
                    className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full ${faq.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
                  />

                  {/* Button */}
                  <button
                    onClick={() =>
                      setActive(
                        isOpen
                          ? null
                          : index
                      )
                    }
                    className="relative flex w-full items-center justify-between gap-5 p-6 text-left md:p-8"
                  >

                    {/* Question */}
                    <h3 className="max-w-[85%] text-2xl font-semibold tracking-tight text-white">

                      {faq.question}
                    </h3>

                    {/* Arrow */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${faq.gradient} text-white shadow-lg transition duration-300 ${
                        isOpen
                          ? "rotate-180"
                          : ""
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

                        <div className="relative px-6 pb-6 md:px-8 md:pb-8">

                          {/* Divider */}
                          <div
                            className={`h-px w-full bg-gradient-to-r ${faq.gradient}`}
                          />

                          {/* Answer */}
                          <p className="pt-6 text-2xl leading-10 text-zinc-300">

                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Bottom Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${faq.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}