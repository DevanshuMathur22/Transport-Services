// app/dashboard/admin/bookings/page.tsx

"use client"

import axios from "axios"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { motion } from "framer-motion"

import {
  Package,
  Search,
  Truck,
  User,
  XCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react"

export default function AdminBookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

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
            "/api/admin/bookings"
          )

        setBookings(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // CANCEL BOOKING
  //////////////////////////////////////////////////////

  const cancelBooking =
    async (id: string) => {

      try {

        await axios.delete(
          `/api/admin/bookings/${id}`
        )

        fetchBookings()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////

  const filteredBookings =
    useMemo(() => {

      return bookings.filter(
        (item) =>

          item.trackingId
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.fromCity
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.toCity
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )

    }, [
      bookings,
      search,
    ])

  //////////////////////////////////////////////////////
  // STATUS COLORS
  //////////////////////////////////////////////////////

  const getStatusColor =
    (status: string) => {

      switch (status) {

        case "pending":
          return "bg-yellow-100 text-yellow-700"

        case "accepted":
          return "bg-blue-100 text-blue-700"

        case "picked_up":
          return "bg-indigo-100 text-indigo-700"

        case "in_transit":
          return "bg-cyan-100 text-cyan-700"

        case "delivered":
          return "bg-green-100 text-green-700"

        case "cancelled":
          return "bg-red-100 text-red-700"

        default:
          return "bg-slate-100 text-slate-700"
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading bookings...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">

      {/* HERO */}

      <div className="rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 text-white shadow-xl">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <Package
                size={26}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight">
                Bookings Management
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                Monitor deliveries, drivers and shipment activity
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">

            <p className="text-xs text-slate-300">
              Total Bookings
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {
                bookings.length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tracking id, customer or city..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition-all focus:border-green-500"
          />
        </div>
      </div>

      {/* EMPTY */}

      {filteredBookings.length ===
        0 && (

        <div className="rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">

            <Package
              size={28}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            No bookings found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            No shipment data available right now
          </p>
        </div>
      )}

      {/* BOOKINGS */}

      <div className="grid gap-4">

        {filteredBookings.map(
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
                y: -2,
              }}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >

              <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex items-start gap-4 min-w-0">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">

                    <Truck
                      size={24}
                    />
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="break-words text-lg font-semibold text-slate-900">

                        {
                          item.fromCity
                        }

                        {" → "}

                        {
                          item.toCity
                        }

                      </h2>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                          item.status
                        )}`}
                      >

                        {
                          item.status.replace(
                            "_",
                            " "
                          )
                        }

                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500">

                      <div className="flex items-center gap-2">

                        <Package
                          size={15}
                        />

                        {
                          item.trackingId
                        }

                      </div>

                      <div className="flex items-center gap-2 capitalize">

                        <Truck
                          size={15}
                        />

                        {
                          item.vehicleType
                        }

                      </div>

                      <div className="flex items-center gap-2">

                        <User
                          size={15}
                        />

                        {
                          item.user
                            ?.name
                        }

                      </div>
                    </div>

                    {/* DRIVER */}

                    <div className="mt-4">

                      {item.driver ? (

                        <div className="inline-flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

                          <CheckCircle2
                            size={16}
                          />

                          Driver Assigned:
                          {" "}
                          {
                            item.driver
                              ?.name
                          }

                        </div>

                      ) : (

                        <div className="inline-flex items-center gap-2 rounded-2xl bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">

                          <Clock3
                            size={16}
                          />

                          Waiting for driver acceptance

                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-start gap-4 lg:items-end">

                  <div className="text-left lg:text-right">

                    <p className="text-sm text-slate-500">
                      Shipment Amount
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">

                      ₹
                      {
                        item.price
                      }

                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {item.status !==
                      "cancelled" &&

                      item.status !==
                        "delivered" && (

                      <button
                        onClick={() =>
                          cancelBooking(
                            item.id
                          )
                        }
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 text-sm font-medium text-white transition-all hover:bg-red-600"
                      >

                        <XCircle
                          size={16}
                        />

                        Cancel Booking

                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}