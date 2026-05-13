"use client"

import axios from "axios"
import Link from "next/link"

import { motion } from "framer-motion"

import {
  ArrowRight,
  Calendar,
  CreditCard,
  Package,
  Search,
  Truck,
} from "lucide-react"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

export default function BookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [statusFilter, setStatusFilter] =
    useState("all")

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
  // FILTER BOOKINGS
  //////////////////////////////////////////////////////

  const filteredBookings =
    useMemo(() => {

      return bookings.filter(
        (item) => {

          const matchSearch =
            item.trackingId
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

          const matchStatus =
            statusFilter ===
              "all" ||

            item.status ===
              statusFilter

          return (
            matchSearch &&
            matchStatus
          )
        }
      )
    }, [
      bookings,
      search,
      statusFilter,
    ])

  //////////////////////////////////////////////////////
  // STATUS COLOR
  //////////////////////////////////////////////////////

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "delivered":
        return "bg-green-100 text-green-700"

      case "pending":
        return "bg-yellow-100 text-yellow-700"

      case "cancelled":
        return "bg-red-100 text-red-700"

      case "in_transit":
        return "bg-blue-100 text-blue-700"

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

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

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
                My Bookings
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage and track all shipments easily.
              </p>
            </div>
          </div>

          <div className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">

            {
              filteredBookings.length
            }{" "}
            Bookings

          </div>
        </div>
      </motion.div>

      {/* FILTERS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition-all focus:border-green-500"
            />
          </div>

          {/* STATUS */}

          <div className="flex flex-wrap gap-2">

            {[
              "all",
              "pending",
              "in_transit",
              "delivered",
              "cancelled",
            ].map(
              (
                status
              ) => {

                const active =
                  statusFilter ===
                  status

                return (
                  <button
                    key={status}
                    onClick={() =>
                      setStatusFilter(
                        status
                      )
                    }
                    className={`rounded-2xl px-4 py-2 text-xs font-medium capitalize transition-all sm:text-sm ${
                      active
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >

                    {status.replace(
                      "_",
                      " "
                    )}

                  </button>
                )
              }
            )}
          </div>
        </div>
      </motion.div>

      {/* EMPTY */}

      {filteredBookings.length ===
        0 && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">

            <Package
              size={26}
              className="text-slate-400"
            />
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
            No bookings found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Your shipment history will appear here
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
                y: -3,
              }}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >

              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex items-start gap-4 min-w-0">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">

                    <Truck
                      size={20}
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
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                          item.status
                        )}`}
                      >

                        {item.status.replace(
                          "_",
                          " "
                        )}

                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4">

                      <p className="break-all text-sm text-slate-500">

                        {
                          item.trackingId
                        }

                      </p>

                      <p className="text-sm capitalize text-slate-500">

                        {
                          item.vehicleType
                        }

                      </p>

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <Calendar
                          size={14}
                        />

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

               {/* RIGHT */}

<div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">

  <div className="text-left lg:text-right">

    <p className="text-sm text-slate-500">
      Amount
    </p>

    <h3 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">

      ₹{item.price}

    </h3>
  </div>

  {/* PAY NOW */}

  {item.status ===
    "pending" && (

    <Link
      href={`/dashboard/user/payments?bookingId=${item.id}`}
      className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-sm font-medium text-white transition-all hover:bg-orange-600"
    >

      <CreditCard
        size={16}
      />

      Pay Now

    </Link>
  )}

  {/* DETAILS */}

  <Link
    href={`/dashboard/user/bookings/${item.id}`}
    className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 text-sm font-medium text-white transition-all hover:bg-green-700"
  >

    Details

    <ArrowRight
      size={16}
    />
  </Link>
</div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}