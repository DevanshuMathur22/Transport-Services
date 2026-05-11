"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const navLinks = [
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Enterprise",
    href: "/enterprise",
  },
  {
    name: "Partner",
    href: "/partner",
  },
  {
    name: "Tracking",
    href: "/tracking",
  },
  {
    name: "Support",
    href: "/support",
  },
]

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () =>
      window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed left-0 top-0 z-50 w-full">

      <div className="mx-auto max-w-7xl px-4 pt-0 md:px-6">

        {/* Navbar */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center justify-between rounded-full border px-6 py-4 transition-all duration-300 ${
            scrolled
              ? "border-white/20 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
              : "border-white/10 bg-white/60 backdrop-blur-xl"
          }`}
        >

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-green-400">
              P
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Porter
              </h2>

              <p className="text-[10px] tracking-[0.25em] text-slate-500">
                LOGISTICS
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-slate-600 transition duration-300 hover:text-slate-900"
              >

                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden items-center gap-3 md:flex">

            <Link
              href="/login"
              className="flex h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/book"
              className="flex h-11 items-center rounded-full bg-slate-950 px-5 text-sm font-medium text-white transition hover:scale-[1.02]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="flex items-center justify-center md:hidden"
          >

            {mobileMenu ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>

          {mobileMenu && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="mt-3 overflow-hidden rounded-[2rem] border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
            >

              <div className="flex flex-col gap-5">

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="text-sm font-medium text-slate-700 transition hover:text-purple-600"
                  >

                    {link.name}
                  </Link>
                ))}

                {/* Divider */}
                <div className="h-px w-full bg-slate-200" />

                {/* Buttons */}
                <div className="flex flex-col gap-3">

                  <Link
                    href="/login"
                    className="flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-900 hover:not-first-of-type:-bg-linear-180"
                  >
                    Login
                  </Link>

                  <Link
                    href="/book"
                    className="flex h-11 items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}