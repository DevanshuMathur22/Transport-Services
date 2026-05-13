"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Car,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverProfilePage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    fetching,
    setFetching,
  ] = useState(true)

  const [
    success,
    setSuccess,
  ] = useState("")

  const [
    error,
    setError,
  ] = useState("")

  const [
    form,
    setForm,
  ] = useState({

    name: "",

    email: "",

    phone: "",

    city: "",

    vehicleType: "",

    vehicleNumber: "",
  })

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchProfile()

  }, [])

  const fetchProfile =
    async () => {

      try {

        setFetching(true)

        const res =
          await axios.get(
            "/api/driver/profile"
          )

        setForm({

          name:
            res.data.name || "",

          email:
            res.data.email || "",

          phone:
            res.data.phone || "",

          city:
            res.data.city || "",

          vehicleType:
            res.data.vehicleType || "",

          vehicleNumber:
            res.data.vehicleNumber || "",
        })

      } catch (error: any) {

        console.log(error)

        setError(
          error?.response?.data
            ?.error ||
          "Failed to load profile"
        )

      } finally {

        setFetching(false)
      }
    }

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave =
    async () => {

      try {

        setLoading(true)

        setSuccess("")

        setError("")

        const res =
          await axios.put(
            "/api/driver/profile",
            form
          )

        setSuccess(
          res.data.message ||
          "Profile updated successfully"
        )

      } catch (error: any) {

        console.log(error)

        setError(
          error?.response?.data
            ?.error ||
          "Failed to update profile"
        )

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (fetching) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white"
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative">

          <h1 className="text-3xl font-bold">
            Driver Profile
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Manage your personal and vehicle information.
          </p>
        </div>
      </motion.div>

      {/* ALERTS */}

      {success && (

        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

          <CheckCircle2
            size={18}
          />

          {success}
        </div>
      )}

      {error && (

        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}
        </div>
      )}

      {/* PROFILE */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* PERSONAL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

              <User
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Personal Info
              </h2>

              <p className="text-sm text-slate-500">
                Update your details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            {/* NAME */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative mt-2">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={form.name || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 outline-none transition-all focus:border-orange-500"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative mt-2">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={form.email || ""}
                  disabled
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-100 pl-11 pr-4 text-slate-500 outline-none"
                />
              </div>
            </div>

            {/* PHONE */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                Phone
              </label>

              <div className="relative mt-2">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={form.phone || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 outline-none transition-all focus:border-orange-500"
                />
              </div>
            </div>

            {/* CITY */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                City
              </label>

              <div className="relative mt-2">

                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={form.city || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 outline-none transition-all focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* VEHICLE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
          }}
          className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

              <Car
                size={22}
                className="text-orange-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Vehicle Info
              </h2>

              <p className="text-sm text-slate-500">
                Manage vehicle details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            {/* VEHICLE TYPE */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                Vehicle Type
              </label>

              <input
                type="text"
                value={form.vehicleType || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicleType:
                      e.target.value,
                  })
                }
                placeholder="Truck / Mini Truck"
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition-all focus:border-orange-500"
              />
            </div>

            {/* VEHICLE NUMBER */}

            <div>

              <label className="text-sm font-medium text-slate-700">
                Vehicle Number
              </label>

              <input
                type="text"
                value={form.vehicleNumber || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicleNumber:
                      e.target.value
                        .toUpperCase(),
                  })
                }
                placeholder="RJ14 AB 4589"
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 uppercase outline-none transition-all focus:border-orange-500"
              />
            </div>

            {/* BUTTON */}

            <button
              onClick={
                handleSave
              }
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 text-sm font-medium text-white transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Save
                size={18}
              />

              {
                loading
                  ? "Saving..."
                  : "Save Profile"
              }

            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}