// components/support/Categories.tsx

"use client"

import { motion } from "framer-motion"

import {
  Truck,
  PackageCheck,
  MapPinned,
  Wallet,
  ShieldCheck,
  Users,
} from "lucide-react"

const categories = [
  {
    title: "Delivery Support",

    desc:
      "Help related to shipments, transportation and logistics operations.",

    icon: Truck,

    gradient:
      "from-violet-500 to-fuchsia-500",

    glow:
      "bg-violet-500/10",

    iconBg:
      "bg-violet-500/10",

    iconColor:
      "text-violet-500",

    cardBg:
      "from-violet-500/[0.05] to-fuchsia-500/[0.05]",
  },

  {
    title: "Tracking Issues",

    desc:
      "Track shipment activity and resolve live delivery problems instantly.",

    icon: MapPinned,

    gradient:
      "from-cyan-500 to-blue-500",

    glow:
      "bg-cyan-500/10",

    iconBg:
      "bg-cyan-500/10",

    iconColor:
      "text-cyan-500",

    cardBg:
      "from-cyan-500/[0.05] to-blue-500/[0.05]",
  },

  {
    title: "Payment & Billing",

    desc:
      "Manage invoices, transactions and delivery payment support.",

    icon: Wallet,

    gradient:
      "from-emerald-500 to-green-500",

    glow:
      "bg-emerald-500/10",

    iconBg:
      "bg-emerald-500/10",

    iconColor:
      "text-emerald-500",

    cardBg:
      "from-emerald-500/[0.05] to-green-500/[0.05]",
  },

  {
    title: "Partner Support",

    desc:
      "Assistance for onboarding, payouts and delivery partner operations.",

    icon: Users,

    gradient:
      "from-orange-500 to-amber-500",

    glow:
      "bg-orange-500/10",

    iconBg:
      "bg-orange-500/10",

    iconColor:
      "text-orange-500",

    cardBg:
      "from-orange-500/[0.05] to-amber-500/[0.05]",
  },

  {
    title: "Order Management",

    desc:
      "Modify bookings, schedules and shipment related information.",

    icon: PackageCheck,

    gradient:
      "from-pink-500 to-rose-500",

    glow:
      "bg-pink-500/10",

    iconBg:
      "bg-pink-500/10",

    iconColor:
      "text-pink-500",

    cardBg:
      "from-pink-500/[0.05] to-rose-500/[0.05]",
  },

  {
    title: "Account Security",

    desc:
      "Secure account access and transportation system verification.",

    icon: ShieldCheck,

    gradient:
      "from-indigo-500 to-purple-500",

    glow:
      "bg-indigo-500/10",

    iconBg:
      "bg-indigo-500/10",

    iconColor:
      "text-indigo-500",

    cardBg:
      "from-indigo-500/[0.05] to-purple-500/[0.05]",
  },
]

export default function Categories() {

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

  {/* Glow */}
  <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

  <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />

  {/* Grid */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* Top */}
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

      <div className="max-w-3xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

          <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

          <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
            HELP CATEGORIES
          </p>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

          Find support for

          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">

            every situation.
          </span>
        </h2>
      </div>

      {/* Desc */}
      <p className="max-w-md text-base leading-8 text-zinc-400">

        Browse smart support categories designed for quick
        assistance and seamless logistics operations.
      </p>
    </div>

    {/* Grid */}
    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

      {categories.map((item, index) => {

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
              y: -8,
            }}
            className={`group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-br ${item.cardBg} p-7 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.05] hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-8`}
          >

            {/* Glow */}
            <div
              className={`absolute right-[-50px] top-[-50px] h-44 w-44 rounded-full ${item.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100`}
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

              {/* Number */}
              <div className="text-5xl font-bold tracking-tight text-white/10">

                0{index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="relative mt-10">

              <h3 className="text-3xl font-bold tracking-tight text-white">

                {item.title}
              </h3>

              <p className="mt-5 text-base leading-8 text-zinc-400">

                {item.desc}
              </p>
            </div>

            {/* Button */}
            <button
              className={`relative mt-8 h-12 rounded-full bg-gradient-to-r ${item.gradient} px-6 text-sm font-medium text-white shadow-lg transition hover:scale-[1.03]`}
            >

              Explore Help
            </button>

            {/* Bottom Line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
            />
          </motion.div>
        )
      })}
    </div>
  </div>
</section>
  )
}