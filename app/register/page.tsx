"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">

        <div>

          <h1 className="text-3xl font-semibold">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Register to continue
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

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
            className="h-12 w-full rounded-xl border px-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="h-12 w-full rounded-xl border px-4 outline-none"
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="h-12 w-full rounded-xl border px-4 outline-none"
          />

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
            className="h-12 w-full rounded-xl border px-4 outline-none"
          />

          <button
            disabled={loading}
            className="h-12 w-full rounded-xl bg-green-600 text-white"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-medium text-green-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}