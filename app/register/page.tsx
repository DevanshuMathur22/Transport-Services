"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { motion } from "framer-motion"

import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

export default function RegisterPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "user",
})
  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      const res = await axios.post(
        "/api/auth/register",
        form
      )

      if (res.data.success) {

        router.push("/login")
      }

    } catch (error: any) {

      alert(
        error.response?.data?.error
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-10">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

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
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-7 backdrop-blur-3xl md:p-9"
      >

        {/* Top */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-300">
              CREATE ACCOUNT
            </p>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">

            Join the
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              platform.
            </span>
          </h1>

          {/* Desc */}
          <p className="mt-5 text-lg leading-8 text-zinc-400">

            Create your account to access
            bookings, tracking and logistics services.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-5"
        >

          {/* Name */}
          <div className="relative">

            <User className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
            />
          </div>

          {/* Email */}
          <div className="relative">

            <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none placeholder:text-zinc-500 focus:border-cyan-500"
            />
          </div>

          {/* Phone */}
          <div className="relative">

            <Phone className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none placeholder:text-zinc-500 focus:border-fuchsia-500"
            />
          </div>

          {/* Password */}
          <div className="relative">

            <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
            />
          </div>

          <div>

  <select
    value={form.role}
    onChange={(e) =>
      setForm({
        ...form,
        role:
          e.target.value,
      })
    }
    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none focus:border-cyan-500 appearance-none"
  >

    <option
      value="user"
      className="bg-black"
    >
      User
    </option>

    <option
      value="driver"
      className="bg-black"
    >
      Driver
    </option>

    <option
  value="admin"
  className="bg-black"
>
  Admin
</option>

  </select>
</div>

          {/* Secure */}
          <div className="flex items-center gap-3">

            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <p className="text-sm text-zinc-400">
              Secure Registration
            </p>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-sm font-medium text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

            {!loading && (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </form>

        {/* Bottom */}
        <p className="mt-8 text-center text-base text-zinc-400">

          Already have an account?{" "}

          <Link
            href="/login"
            className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-semibold text-transparent"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  )
}