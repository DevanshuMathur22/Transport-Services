"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Small Business Owner",
    review:
      "Porter completely transformed our delivery operations. Fast bookings, reliable drivers and smooth tracking experience.",
  },
  {
    name: "Ananya Verma",
    role: "E-commerce Seller",
    review:
      "The interface feels premium and the delivery process is seamless. Perfect logistics solution for growing businesses.",
  },
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    review:
      "Excellent support and very professional service. The real-time updates and quick deliveries are incredibly useful.",
  },
]

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-16 md:px-8 md:py-24">

      {/* Glow */}
      <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

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
          className="max-w-xl"
        >

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              TESTIMONIALS
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

            Trusted by businesses
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              across India.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

            Thousands of businesses and individuals
            rely on our logistics platform for seamless
            transportation and faster deliveries.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">

          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{
                opacity: 0,
                y: 50,
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
              whileHover={{
                y: -6,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/5"
            >

              {/* Glow */}
              <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Quote */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">

                <Quote className="h-6 w-6 text-cyan-400" />
              </div>

              {/* Review */}
              <p className="mt-6 text-sm leading-7 text-zinc-300 md:text-base">

                “{testimonial.review}”
              </p>

              {/* Divider */}
              <div className="mt-6 h-px w-full bg-white/10" />

              {/* User */}
              <div className="mt-6 flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-white">

                  {testimonial.name.charAt(0)}
                </div>

                {/* Info */}
                <div>

                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}