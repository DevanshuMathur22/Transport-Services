"use client"

import axios from "axios"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowRight,
  MapPinned,
  Package,
  Truck,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function TrackingPage() {

  const [bookings, setBookings] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH BOOKINGS
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/user/bookings"
          )

  setBookings(
  Array.isArray(
    res.data.bookings
  )
    ? res.data.bookings
    : []
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
            Loading tracking...
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
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6"
      >

        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

              <MapPinned
                size={22}
                className="text-orange-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Shipment Tracking
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Track your active deliveries live and monitor shipment status.
              </p>
            </div>
          </div>

          <div className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">

            {
              bookings.length
            }{" "}
            Shipments

          </div>
        </div>
      </motion.div>

      {/* EMPTY */}

      {bookings.length ===
        0 && (

        <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">

            <Package
              size={26}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
            No shipments found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your active shipments will appear here
          </p>
        </div>
      )}

      {/* TRACKING LIST */}

      <div className="grid gap-4">

        {bookings.map(
          (
            item,
            index
          ) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
              whileHover={{
                y: -3,
              }}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >

              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex items-start gap-4 min-w-0">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100">

                    <Truck
                      size={20}
                      className="text-orange-700"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="break-words text-base font-semibold text-slate-900 sm:text-lg">

                        {
                          item.fromCity
                        }

                        {" → "}

                        {
                          item.toCity
                        }

                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          item.status ===
                          "delivered"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >

                        {
                          item.status.replace(
                            "_",
                            " "
                          )
                        }

                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6">

                      <div className="min-w-0">

                        <p className="text-xs text-slate-500">
                          Tracking ID
                        </p>

                        <h3 className="mt-1 break-all text-sm font-semibold text-slate-900">

                          {
                            item.trackingId
                          }

                        </h3>
                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Vehicle
                        </p>

                        <h3 className="mt-1 text-sm font-semibold capitalize text-slate-900">

                          {
                            item.vehicleType
                          }

                        </h3>
                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Amount
                        </p>

                        <h3 className="mt-1 text-sm font-semibold text-slate-900">

                          ₹
                          {
                            item.price
                          }

                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}

                <Link
                  href={`/dashboard/user/tracking/${item.trackingId}`}
                  className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 text-sm font-medium text-white transition-all hover:bg-green-700"
                >

                  Live Tracking

                  <ArrowRight
                    size={16}
                  />
                </Link>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}