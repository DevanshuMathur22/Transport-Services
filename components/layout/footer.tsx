// components/shared/Footer.tsx

"use client"

import Link from "next/link"

import {
  ArrowUpRight,
} from "lucide-react"

import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6"

const footerLinks = {
  Company: [
    "About",
    "Careers",
    "Press",
    "Blog",
  ],
  Services: [
    "Two Wheelers",
    "Trucks",
    "Packers & Movers",
    "Enterprise",
  ],
  Support: [
    "Help Center",
    "Contact",
    "FAQs",
    "Terms",
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090B] px-4 pb-8 pt-16 md:px-8 md:pt-24">

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[260px] w-[260px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* CTA */}
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl md:p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">

                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300">
                  SMART LOGISTICS
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-[1] tracking-tight text-white md:text-4xl">

                Move anything across
                <span className="block bg-gradient-to-r from-green-400 via-green-500 to-red-500 bg-clip-text text-transparent">

                  the city with ease.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">

                Fast logistics solutions with seamless booking,
                real-time tracking and smart transportation.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">

              <button className="flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition hover:scale-[1.02]">

                Book Delivery

                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-xs font-medium text-white transition hover:border-orange-500/30 hover:bg-orange-500/10">

                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 grid gap-10 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Porter
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">

              Smart logistics platform helping businesses and
              individuals deliver faster with modern transport
              solutions.
            </p>

            {/* App Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">

              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-orange-500/30 hover:bg-orange-500/10">

                App Store
              </button>

              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-orange-500/30 hover:bg-orange-500/10">

                Google Play
              </button>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">

              {[
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
                >

                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>

              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                {title}
              </h3>

              <div className="mt-5 flex flex-col gap-3">

                {links.map((link) => (
                  <Link
                    key={link}
                    href="/"
                    className="text-sm text-zinc-400 transition hover:text-orange-400"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">

          <p className="text-xs text-zinc-500">
            © 2026 Porter Clone. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">

            <Link
              href="/"
              className="text-xs text-zinc-500 transition hover:text-green-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="text-xs text-zinc-500 transition hover:text-green-400-400"
            >
              Terms of Service
            </Link>

            <Link
              href="/"
              className="text-xs text-zinc-500 transition hover:text-green-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}