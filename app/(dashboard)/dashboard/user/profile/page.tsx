"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Camera,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function ProfilePage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [profile, setProfile] =
    useState({

      name: "",

      email: "",

      phone: "",

      city: "",

      address: "",

      pincode: "",

      role: "",

      isVerified: false,

      isBlocked: false,
    })

  //////////////////////////////////////////////////////
  // FETCH PROFILE
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchProfile()

  }, [])

  const fetchProfile =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/user/profile"
          )

        setProfile(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave =
    async () => {

      try {

        setSaving(true)

        await axios.put(
          "/api/user/profile",
          profile
        )

        alert(
          "Profile updated"
        )

      } catch (error) {

        console.log(error)

      } finally {

        setSaving(false)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">

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
        className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6"
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <User
                size={28}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage your account and personal details.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">

            Account Settings

          </div>
        </div>
      </motion.div>

      {/* PROFILE CARD */}

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
        className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
      >

        {/* PROFILE HEADER */}

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex flex-col items-center text-center">

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="relative"
            >

              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-20 blur-2xl" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-xl">

                <User
                  size={50}
                  className="text-white"
                />
              </div>

              <motion.button
                whileTap={{
                  scale: 0.92,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-lg transition-all hover:bg-black"
              >

                <Camera
                  size={18}
                />

              </motion.button>
            </motion.div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">

              {
                profile.name ||
                "User"
              }

            </h2>

            <p className="mt-2 break-all text-sm text-slate-500">

              {
                profile.email
              }

            </p>

            {/* BADGES */}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

              <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium capitalize text-slate-700">

                {
                  profile.role ||
                  "customer"
                }

              </div>

              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${
                  profile.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >

                <ShieldCheck
                  size={14}
                />

                {
                  profile.isVerified
                    ? "Verified"
                    : "Pending"
                }

              </div>

              <div
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  profile.isBlocked
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >

                {
                  profile.isBlocked
                    ? "Blocked"
                    : "Active"
                }

              </div>
            </div>
          </div>
        </div>

        {/* FORM */}

        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">

          {/* NAME */}

          <motion.div
            whileHover={{
              y: -2,
            }}
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Full Name

            </label>

            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm">

              <User
                size={18}
                className="text-slate-400 transition-all group-focus-within:text-green-600"
              />

              <input
                type="text"
                value={
                  profile.name
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>

          {/* EMAIL */}

          <motion.div
            whileHover={{
              y: -2,
            }}
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Email Address

            </label>

            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm">

              <Mail
                size={18}
                className="text-slate-400 transition-all group-focus-within:text-green-600"
              />

              <input
                type="email"
                value={
                  profile.email
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>

          {/* PHONE */}

          <motion.div
            whileHover={{
              y: -2,
            }}
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Phone Number

            </label>

            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm">

              <Phone
                size={18}
                className="text-slate-400 transition-all group-focus-within:text-green-600"
              />

              <input
                type="text"
                value={
                  profile.phone
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>

          {/* CITY */}

          <motion.div
            whileHover={{
              y: -2,
            }}
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              City

            </label>

            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm">

              <MapPin
                size={18}
                className="text-slate-400 transition-all group-focus-within:text-green-600"
              />

              <input
                type="text"
                value={
                  profile.city
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    city:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>

          {/* PINCODE */}

          <motion.div
            whileHover={{
              y: -2,
            }}
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Pincode

            </label>

            <div className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm">

              <MapPin
                size={18}
                className="text-slate-400 transition-all group-focus-within:text-green-600"
              />

              <input
                type="text"
                value={
                  profile.pincode
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    pincode:
                      e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>

          {/* ADDRESS */}

          <motion.div
            whileHover={{
              y: -2,
            }}
            className="md:col-span-2"
          >

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Address

            </label>

            <textarea
              rows={4}
              value={
                profile.address
              }
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-all focus:border-green-500 focus:bg-white focus:shadow-sm"
            />
          </motion.div>
        </div>

        {/* SAVE */}

        <div className="border-t border-slate-100 p-5 sm:p-6">

          <div className="flex justify-end">

            <motion.button
              whileTap={{
                scale: 0.96,
              }}
              whileHover={{
                scale: 1.02,
              }}
              onClick={
                handleSave
              }
              disabled={saving}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 text-sm font-medium text-white shadow-lg transition-all hover:shadow-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Save
                size={18}
              />

              {
                saving
                  ? "Saving..."
                  : "Save Changes"
              }

            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}