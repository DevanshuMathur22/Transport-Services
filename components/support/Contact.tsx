// components/support/Contact.tsx

"use client"

import { motion } from "framer-motion"

import {
  Phone,
  Mail,
  MessageCircle,
  MapPinned,
  ArrowRight,
} from "lucide-react"

const contacts = [
  {
    icon: Phone,

    title: "Call Support",

    value: "+91 98765 43210",

    desc:
      "24/7 logistics and transportation assistance.",

    gradient:
      "from-violet-500 to-fuchsia-500",

    glow:
      "bg-violet-500/10",

    iconBg:
      "bg-violet-500/10",

    iconColor:
      "text-violet-400",
  },

  {
    icon: MessageCircle,

    title: "WhatsApp Chat",

    value:
      "Start Live Conversation",

    desc:
      "Instant shipment and tracking support online.",

    gradient:
      "from-emerald-500 to-green-500",

    glow:
      "bg-emerald-500/10",

    iconBg:
      "bg-emerald-500/10",

    iconColor:
      "text-emerald-400",
  },

  {
    icon: Mail,

    title: "Email Support",

    value:
      "support@porter.com",

    desc:
      "Detailed help for orders and business logistics.",

    gradient:
      "from-cyan-500 to-blue-500",

    glow:
      "bg-cyan-500/10",

    iconBg:
      "bg-cyan-500/10",

    iconColor:
      "text-cyan-400",
  },

  {
    icon: MapPinned,

    title: "Office Location",

    value:
      "Jaipur, Rajasthan",

    desc:
      "Visit our smart transportation support center.",

    gradient:
      "from-orange-500 to-amber-500",

    glow:
      "bg-orange-500/10",

    iconBg:
      "bg-orange-500/10",

    iconColor:
      "text-orange-400",
  },
]

export default function Contact() {

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

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
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                CONTACT SUPPORT
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

              Get connected

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                with our team.
              </span>
            </h2>

            {/* Desc */}
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">

              Reach our logistics support specialists through
              calls, live chat and smart transportation assistance.
            </p>

            {/* Banner */}
            <div className="relative mt-10 overflow-hidden rounded-[3rem] border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1800&auto=format&fit=crop"
                alt=""
                className="h-[320px] w-full object-cover md:h-[420px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Glow */}
              <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

              {/* Floating */}
              <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl md:p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  LIVE ASSISTANCE
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">

                  Average response

                  <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">

                    under 2 minutes.
                  </span>
                </h3>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="space-y-5">

            {contacts.map((item, index) => {

              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
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
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] md:p-8"
                >

                  {/* Glow */}
                  <div
                    className={`absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full ${item.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
                  />

                  {/* Top */}
                  <div className="relative flex items-start justify-between gap-5">

                    {/* Icon */}
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${item.iconBg}`}
                    >

                      <Icon
                        className={`h-7 w-7 ${item.iconColor}`}
                      />
                    </div>

                    {/* Arrow */}
                    <button
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} text-white transition hover:scale-110`}
                    >

                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="relative mt-8">

                    <h3 className="text-3xl font-bold tracking-tight text-white">

                      {item.title}
                    </h3>

                    <p
                      className={`mt-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-xl font-semibold text-transparent`}
                    >

                      {item.value}
                    </p>

                    <p className="mt-5 text-base leading-8 text-zinc-400">

                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
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