"use client"

import { motion } from "framer-motion"

import {
  Search,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react"

export default function Hero() {

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-amber-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

            <p className="text-[10px] font-medium tracking-[0.32em] text-zinc-300">
              SUPPORT CENTER
            </p>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto mt-7 max-w-5xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl"
          >

            How can we

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">

              help you today?
            </span>
          </motion.h1>

          {/* Desc */}
          <motion.p
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-400"
          >

            Get quick assistance
            for deliveries, tracking,
            partner onboarding,
            logistics support and
            transportation related
            queries.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-2xl"
          >

            <div className="flex flex-col gap-3 md:flex-row">

              {/* Input */}
              <div className="flex h-14 flex-1 items-center gap-3 rounded-[1.3rem] border border-white/10 bg-black/30 px-5">

                <Search className="h-5 w-5 text-zinc-500" />

                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Button */}
              <button className="h-14 rounded-[1.3rem] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 px-8 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]">

                Search Help
              </button>
            </div>
          </motion.div>

          {/* Quick Contact */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {[
              {
                icon: Phone,

                title: "Call Support",

                value:
                  "+91 98765 43210",

                color:
                  "from-violet-400 to-fuchsia-500",
              },

              {
                icon: MessageCircle,

                title: "WhatsApp",

                value:
                  "Live Chat Support",

                color:
                  "from-emerald-400 to-green-500",
              },

              {
                icon: Mail,

                title: "Email Support",

                value:
                  "support@porter.com",

                color:
                  "from-amber-400 to-orange-500",
              },
            ].map(
              (item, index) => {

                const Icon =
                  item.icon

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        index * 0.08,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.07] md:p-8"
                  >

                    {/* Icon */}
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
                    >

                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="mt-8 text-center">

                      <h3 className="text-3xl font-bold tracking-tight text-white">

                        {item.title}
                      </h3>

                      <p className="mt-4 text-base leading-8 text-zinc-400">

                        {item.value}
                      </p>

                      {/* Bottom Line */}
                      <div
                        className={`mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500 group-hover:w-24`}
                      />
                    </div>
                  </motion.div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </section>
  )
}