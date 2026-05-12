"use client"

import axios from "axios"
import { motion } from "framer-motion"

import {
  Calendar,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react"

import { useParams } from "next/navigation"

import {
  useEffect,
  useState,
} from "react"

export default function BookingDetailsPage() {
  const params =
    useParams()

  const [booking, setBooking] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH BOOKING
  //////////////////////////////////////////////////////

  useEffect(() => {
    if (params?.id) {
      fetchBooking()
    }
  }, [params?.id])

 const fetchBooking =
  async () => {

    try {

      const res =
        await axios.get(
          `/api/user/bookings/${params.id}`
        )

      setBooking(
        res.data
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
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
            Loading booking...
          </p>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // NOT FOUND
  //////////////////////////////////////////////////////

  if (!booking) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <p className="text-sm text-slate-500">
          Booking not found
        </p>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // PROGRESS
  //////////////////////////////////////////////////////

  let progress = 10

  if (
    booking.status ===
    "accepted"
  ) {
    progress = 25
  }

  if (
    booking.status ===
    "picked_up"
  ) {
    progress = 55
  }

  if (
    booking.status ===
    "in_transit"
  ) {
    progress = 80
  }

  if (
    booking.status ===
    "delivered"
  ) {
    progress = 100
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
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6"
      >

        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

              <Package
                size={22}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Booking Details
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Track shipment and payment details easily.
              </p>
            </div>
          </div>

          <div className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm break-all">

            {
              booking.trackingId
            }

          </div>
        </div>
      </motion.div>

      {/* PROGRESS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="rounded-[28px] bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white sm:p-6"
      >

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-sm text-green-100">
              Shipment Progress
            </p>

            <h2 className="mt-2 text-xl font-semibold capitalize sm:text-2xl">

              {
                booking.status
              }

            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">

            {progress}%
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width:
                `${progress}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-white"
          />
        </div>
      </motion.div>

      {/* GRID */}

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">

        {/* LEFT */}

        <div className="space-y-5">

          {/* SHIPMENT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100">

                <Truck
                  size={20}
                  className="text-blue-700"
                />
              </div>

              <div>

                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Shipment Info
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Booking shipment details
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              {[
                {
                  label:
                    "Route",
                  value: `${booking.fromCity} → ${booking.toCity}`,
                },

                {
                  label:
                    "Vehicle",
                  value:
                    booking.vehicleType,
                },

                {
                  label:
                    "Weight",
                  value: `${booking.weight} kg`,
                },

                {
                  label:
                    "Distance",
                  value: `${booking.distance} km`,
                },

                {
                  label:
                    "ETA",
                  value:
                    booking.estimatedTime,
                },
              ].map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>

                    <h3 className="mt-2 break-words text-sm font-semibold capitalize text-slate-900 sm:text-base">
                      {item.value}
                    </h3>
                  </div>
                )
              )}

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Status
                </p>

                <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-2 text-xs font-medium capitalize text-green-700 sm:text-sm">

                  {
                    booking.status
                  }

                </div>
              </div>
            </div>

            {/* ADDRESSES */}

            <div className="mt-7 grid gap-4 lg:grid-cols-2">

              <div className="rounded-[24px] bg-slate-50 p-5">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={15}
                    className="text-green-600"
                  />

                  <p className="text-sm font-medium text-slate-700">
                    Pickup Address
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">

                  {
                    booking.pickupAddress
                  }

                </p>
              </div>

              <div className="rounded-[24px] bg-slate-50 p-5">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={15}
                    className="text-red-600"
                  />

                  <p className="text-sm font-medium text-slate-700">
                    Delivery Address
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">

                  {
                    booking.deliveryAddress
                  }

                </p>
              </div>
            </div>
          </motion.div>

          {/* TRACKING */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100">

                <CheckCircle2
                  size={20}
                  className="text-green-700"
                />
              </div>

              <div>

                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Tracking Timeline
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Shipment activity history
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">

              {booking.tracking?.map(
                (
                  item: any,
                  index: number
                ) => (
                  <div
                    key={item.id}
                    className="relative flex gap-4"
                  >

                    {index !==
                      booking
                        .tracking
                        .length -
                        1 && (
                      <div className="absolute left-4 top-10 h-full w-[2px] bg-slate-200" />
                    )}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">

                      <CheckCircle2
                        size={15}
                        className="text-green-700"
                      />
                    </div>

                    <div className="flex-1 rounded-[24px] bg-slate-50 p-4">

                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">

                            {
                              item.message
                            }

                          </h3>

                          <p className="mt-1 text-sm text-slate-500">

                            {
                              item.location
                            }

                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">

                          <Clock3
                            size={14}
                          />

                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}

        <div className="space-y-5">

          {/* PAYMENT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100">

                <CreditCard
                  size={20}
                  className="text-purple-700"
                />
              </div>

              <div>

                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Payment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Payment information
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">

              <div className="flex items-center justify-between">

                <p className="text-sm text-slate-500">
                  Amount
                </p>

                <h3 className="text-lg font-semibold text-slate-900">

                  ₹
                  {
                    booking.price
                  }

                </h3>
              </div>

              <div className="flex items-center justify-between gap-4">

                <p className="text-sm text-slate-500">
                  Status
                </p>

                <div className="rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-700 sm:text-sm">

                  {
                    booking
                      .payment
                      ?.status ||
                    "pending"
                  }

                </div>
              </div>

              <div className="flex items-center justify-between gap-4">

                <p className="text-sm text-slate-500">
                  Method
                </p>

                <p className="text-sm font-medium text-slate-900">

                  {
                    booking
                      .payment
                      ?.paymentMethod ||
                    "N/A"
                  }

                </p>
              </div>
            </div>
          </motion.div>

          {/* CUSTOMER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100">

                <User
                  size={20}
                  className="text-orange-700"
                />
              </div>

              <div>

                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Customer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  User details
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">

              <div>

                <p className="text-sm text-slate-500">
                  Name
                </p>

                <h3 className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">

                  {
                    booking.user
                      ?.name ||
                    "N/A"
                  }

                </h3>
              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <h3 className="mt-1 break-all text-sm font-semibold text-slate-900 sm:text-base">

                  {
                    booking.user
                      ?.email ||
                    "N/A"
                  }

                </h3>
              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Created
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">

                  <Calendar
                    size={14}
                  />

                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}