"use client"

import axios from "axios"
import { motion } from "framer-motion"

import {
  ArrowRight,
  Check,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Weight,
} from "lucide-react"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

const vehicles = [
  {
    id: "bike",
    title: "Bike",
    desc: "Small packages",
    color:
      "from-blue-500 to-cyan-500",
  },

  {
    id: "scooter",
    title: "Scooter",
    desc: "Fast delivery",
    color:
      "from-purple-500 to-fuchsia-500",
  },

  {
    id: "pickup",
    title: "Pickup",
    desc: "Medium load",
    color:
      "from-orange-500 to-amber-500",
  },

  {
    id: "mini_truck",
    title: "Mini Truck",
    desc: "Heavy delivery",
    color:
      "from-green-500 to-emerald-500",
  },

  {
    id: "truck",
    title: "Truck",
    desc: "Bulk shipment",
    color:
      "from-slate-700 to-slate-900",
  },
]

export default function CreateBookingPage() {
  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [trackingId, setTrackingId] =
    useState("")

  const [userId, setUserId] =
    useState("")

  const [form, setForm] =
    useState({
      fromCity: "",
      toCity: "",
      pickupAddress: "",
      deliveryAddress: "",
      vehicleType: "bike",
      packageType:
        "electronics",
      pickupDate: "",
      pickupTime: "",
      instructions: "",
      weight: "",
      distance: "",
    })

  //////////////////////////////////////////////////////
  // FETCH USER
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/auth/me"
          )

        setUserId(
          res.data.user.id
        )
      } catch (error) {
        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // PRICE
  //////////////////////////////////////////////////////

  const baseFare =
    Number(form.distance || 0) * 5

  const weightCharge =
    Number(form.weight || 0) * 2

  const gst =
    Math.round(
      (
        baseFare +
        weightCharge
      ) * 0.18
    )

  const total =
    baseFare +
    weightCharge +
    gst

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault()

      try {
        setLoading(true)

        const payload = {
          ...form,
          userId,
          weight:
            Number(form.weight),
          distance:
            Number(form.distance),
          price: total,
        }

        const bookingRes =
  await axios.post(
    "/api/bookings",
    payload
  )




  
          

        setTrackingId(
          bookingRes.data.trackingId
        )

        setSuccess(true)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  return (
    <>
      {/* SUCCESS */}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

              <ShieldCheck
                size={34}
                className="text-green-600"
              />
            </div>

            <h2 className="mt-5 text-center text-xl font-semibold text-slate-900 sm:text-2xl">
              Booking Created
            </h2>

            <p className="mt-2 text-center text-sm text-slate-500">
              Shipment created successfully
            </p>

            <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-center">

              <p className="text-xs text-slate-500">
                Tracking ID
              </p>

              <h3 className="mt-1 break-all text-base font-semibold text-slate-900">
                {trackingId}
              </h3>
            </div>

            <button
              onClick={() =>
                router.push(
                  "/dashboard/user"
                )
              }
              className="mt-5 h-11 w-full rounded-2xl bg-green-600 text-sm font-medium text-white transition-all hover:bg-green-700"
            >
              Go To Dashboard
            </button>
          </motion.div>
        </div>
      )}

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
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6"
        >

          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

                <Package
                  size={22}
                  className="text-green-400"
                />
              </div>

              <div>

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Create Booking
                </h1>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                  Create and manage shipments easily.
                </p>
              </div>
            </div>

            <div className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">
              Real-time pricing
            </div>
          </div>
        </motion.div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="grid gap-5 xl:grid-cols-[1fr_360px]"
        >

          {/* LEFT */}

          <div className="space-y-5">

            {/* ROUTE */}

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100">

                  <MapPin
                    size={20}
                    className="text-blue-700"
                  />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Route Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pickup and delivery info
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <input
                  type="text"
                  placeholder="From City"
                  required
                  value={
                    form.fromCity
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fromCity:
                        e.target.value,
                    })
                  }
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition-all focus:border-green-500"
                />

                <input
                  type="text"
                  placeholder="To City"
                  required
                  value={
                    form.toCity
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      toCity:
                        e.target.value,
                    })
                  }
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition-all focus:border-green-500"
                />

                <textarea
                  rows={4}
                  placeholder="Pickup Address"
                  required
                  value={
                    form.pickupAddress
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pickupAddress:
                        e.target.value,
                    })
                  }
                  className="sm:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-green-500"
                />

                <textarea
                  rows={4}
                  placeholder="Delivery Address"
                  required
                  value={
                    form.deliveryAddress
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deliveryAddress:
                        e.target.value,
                    })
                  }
                  className="sm:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-green-500"
                />

                <input
                  type="number"
                  placeholder="Weight (kg)"
                  required
                  value={
                    form.weight
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      weight:
                        e.target.value,
                    })
                  }
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition-all focus:border-green-500"
                />

                <input
                  type="number"
                  placeholder="Distance (km)"
                  required
                  value={
                    form.distance
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      distance:
                        e.target.value,
                    })
                  }
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition-all focus:border-green-500"
                />
              </div>
            </div>

            {/* PACKAGE TYPE */}

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100">

                  <Package
                    size={20}
                    className="text-purple-700"
                  />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Package Type
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select shipment category
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">

                {[
                  "documents",
                  "electronics",
                  "furniture",
                  "clothes",
                  "groceries",
                  "fragile",
                ].map(
                  (
                    item
                  ) => {
                    const active =
                      form.packageType ===
                      item

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() =>
                          setForm({
                            ...form,
                            packageType:
                              item,
                          })
                        }
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <h3 className="text-sm font-semibold capitalize text-slate-900">
                              {item}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              Category
                            </p>
                          </div>

                          {active && (
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                              <Check
                                size={14}
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            {/* VEHICLE */}

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100">

                  <Truck
                    size={20}
                    className="text-orange-700"
                  />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Select Vehicle
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose shipment vehicle
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {vehicles.map(
                  (
                    vehicle
                  ) => {
                    const active =
                      form.vehicleType ===
                      vehicle.id

                    return (
                      <button
                        type="button"
                        key={vehicle.id}
                        onClick={() =>
                          setForm({
                            ...form,
                            vehicleType:
                              vehicle.id,
                          })
                        }
                        className={`overflow-hidden rounded-[24px] border transition-all ${
                          active
                            ? "border-green-500 shadow-lg ring-4 ring-green-100"
                            : "border-slate-200 hover:shadow-md"
                        }`}
                      >

                        <div
                          className={`bg-gradient-to-br ${vehicle.color} p-5 text-left text-white`}
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <h3 className="text-lg font-semibold">
                                {
                                  vehicle.title
                                }
                              </h3>

                              <p className="mt-1 text-sm text-white/80">
                                {
                                  vehicle.desc
                                }
                              </p>
                            </div>

                            {active && (
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-green-600">
                                <Check
                                  size={15}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  }
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100">

                  <Weight
                    size={20}
                    className="text-green-700"
                  />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Price Summary
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Auto calculated
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-4">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-slate-500">
                    Base Fare
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    ₹{baseFare}
                  </p>
                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm text-slate-500">
                    Weight Charge
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    ₹{weightCharge}
                  </p>
                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm text-slate-500">
                    GST
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    ₹{gst}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-5">

                  <div className="flex items-center justify-between gap-4">

                    <p className="text-sm font-medium text-slate-700">
                      Total Amount
                    </p>

                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      ₹{total}
                    </h2>
                  </div>
                </div>

               <button
  type="submit"
  disabled={
    loading ||
    !userId
  }
  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-600 text-sm font-medium text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
>

  {loading ? (
    <>
      <Loader2
        size={18}
        className="animate-spin"
      />

      Creating...
    </>
  ) : (
    <>
      Create Booking

      <ArrowRight
        size={18}
      />
    </>
  )}
</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}