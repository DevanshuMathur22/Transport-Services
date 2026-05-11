"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import {
  Bike,
  Truck,
  Package,
  MapPin,
  Wallet,
  MessageCircle,
  Phone,
} from "lucide-react"

const vehicles = [
  {
    title: "Bike",
    price: 49,
    icon: Bike,
  },
  {
    title: "Mini Truck",
    price: 299,
    icon: Truck,
  },
  {
    title: "Packers Movers",
    price: 999,
    icon: Package,
  },
]

export default function Calculator() {
  const [selected, setSelected] = useState(0)

  const activeVehicle = vehicles[selected]

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

        {/* Top */}
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              DELIVERY ESTIMATOR
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Estimate your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              delivery pricing.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">

            Select your transport
            type, city and delivery
            route to get estimated
            pricing and logistics
            information.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1fr]">

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
            className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8"
          >

            {/* Inputs */}
            <div className="space-y-5">

              {/* Pickup */}
              <div>

                <p className="mb-3 text-sm font-medium text-zinc-400">
                  Pickup Location
                </p>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5">

                  <MapPin className="h-5 w-5 text-cyan-400" />

                  <input
                    type="text"
                    placeholder="Jaipur"
                    className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                  />
                </div>
              </div>

              {/* Drop */}
              <div>

                <p className="mb-3 text-sm font-medium text-zinc-400">
                  Drop Location
                </p>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5">

                  <MapPin className="h-5 w-5 text-cyan-400" />

                  <input
                    type="text"
                    placeholder="Delhi"
                    className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                  />
                </div>
              </div>

              {/* Vehicle */}
              <div>

                <p className="mb-4 text-sm font-medium text-zinc-400">
                  Select Vehicle
                </p>

                <div className="grid grid-cols-3 gap-3">

                  {vehicles.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.title}
                        onClick={() => setSelected(index)}
                        className={`rounded-[1.8rem] border p-4 transition-all duration-300 ${
                          selected === index
                            ? "border-cyan-500/30 bg-gradient-to-b from-cyan-500 to-blue-600 text-white"
                            : "border-white/10 bg-white/5 text-white hover:border-cyan-500/20"
                        }`}
                      >

                        <div className="flex justify-center">

                          <Icon className="h-6 w-6" />
                        </div>

                        <h3 className="mt-3 text-sm font-medium">
                          {item.title}
                        </h3>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Payment */}
              <div>

                <p className="mb-3 text-sm font-medium text-zinc-400">
                  Payment Mode
                </p>

                <div className="grid grid-cols-2 gap-3">

                  {["Cash", "UPI / Card"].map((item) => (
                    <button
                      key={item}
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 text-sm font-medium text-white transition hover:border-cyan-500/20 hover:bg-white/[0.07]"
                    >

                      <Wallet className="h-4 w-4 text-cyan-400" />

                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="mt-8 h-14 w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-white shadow-[0_10px_40px_rgba(6,182,212,0.35)] transition hover:scale-[1.01]">

              Check Pricing
            </button>
          </motion.div>

          {/* RIGHT */}
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
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
          >

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/75" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">

              {/* Top */}
              <div>

                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

                  <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

                  <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
                    ESTIMATED PRICE
                  </p>
                </div>

                <h3 className="mt-6 text-5xl font-bold leading-[0.92] tracking-tight text-white md:text-7xl">

                  ₹{activeVehicle.price}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 md:text-base">

                  Average pricing may
                  vary depending on
                  distance, traffic
                  and delivery timing.
                </p>
              </div>

              {/* Cards */}
              <div className="mt-10 grid gap-4 md:grid-cols-2">

                {/* Support */}
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">

                    <Phone className="h-5 w-5 text-cyan-400" />
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">

                    Customer Support
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">

                    24/7 transportation
                    and booking
                    assistance.
                  </p>

                  <button className="mt-5 text-sm font-medium text-cyan-400">
                    Contact Now
                  </button>
                </div>

                {/* WhatsApp */}
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">

                    <MessageCircle className="h-5 w-5 text-cyan-400" />
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">

                    WhatsApp Booking
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">

                    Instantly connect
                    with our logistics
                    support team.
                  </p>

                  <button className="mt-5 text-sm font-medium text-cyan-400">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">

          {[
            {
              title: "How pricing works?",
              desc:
                "Pricing depends on city, distance, vehicle type and delivery urgency.",
            },

            {
              title: "Do you provide live tracking?",
              desc:
                "Yes, every delivery includes real-time tracking and driver updates.",
            },

            {
              title: "Which payment methods supported?",
              desc:
                "Cash, UPI, cards and digital wallets are supported.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
            >

              <h3 className="text-3xl font-bold tracking-tight text-white">

                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-400">

                {item.desc}
              </p>

              <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}