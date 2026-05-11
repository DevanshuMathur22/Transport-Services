"use client"

import axios from "axios"
import Link from "next/link"
import { motion } from "framer-motion"

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPinned,
  Package,
  Plus,
  Truck,
  Wallet,
} from "lucide-react"

import { useEffect, useState } from "react"

export default function UserDashboardPage() {
  const [stats, setStats] = useState<any>(null)

  const [bookings, setBookings] =
    useState<any[]>([])

  const [shipment, setShipment] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH DATA
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData =
    async () => {
      try {
        const [
          statsRes,
          bookingsRes,
          shipmentRes,
        ] = await Promise.all([
          axios.get(
            "/api/user/stats"
          ),

          axios.get(
            "/api/user/bookings"
          ),

          axios.get(
            "/api/user/active-shipment"
          ),
        ])

        setStats(
          statsRes.data
        )

        setBookings(
          bookingsRes.data
        )

        setShipment(
          shipmentRes.data
        )
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // STATS
  //////////////////////////////////////////////////////

  const statsCards = [
    {
      title:
        "Total Bookings",

      value:
        stats?.totalBookings ||
        0,

      icon: Package,

      card:
        "from-blue-500 to-cyan-500",

      shadow:
        "shadow-blue-200/60",
    },

    {
      title:
        "Active Deliveries",

      value:
        stats?.activeDeliveries ||
        0,

      icon: Truck,

      card:
        "from-orange-500 to-amber-500",

      shadow:
        "shadow-orange-200/60",
    },

    {
      title:
        "Completed Orders",

      value:
        stats?.completedOrders ||
        0,

      icon:
        CheckCircle2,

      card:
        "from-green-500 to-emerald-500",

      shadow:
        "shadow-green-200/60",
    },

    {
      title:
        "Total Spent",

      value: `₹${
        stats?.totalSpent ||
        0
      }`,

      icon: Wallet,

      card:
        "from-purple-500 to-fuchsia-500",

      shadow:
        "shadow-purple-200/60",
    },
  ]

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">

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

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur sm:h-14 sm:w-14">
              <Package
                size={22}
                className="text-green-400"
              />
            </div>

            <div>

              <p className="text-xs font-medium text-green-300 sm:text-sm">
                Welcome Back 👋
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                User Dashboard
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Track shipments and manage bookings easily in one place.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/user/create-booking"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 text-sm font-medium text-white transition-all hover:bg-green-600 sm:w-fit"
          >
            <Plus size={16} />

            Create Booking

            <ArrowUpRight
              size={16}
            />
          </Link>
        </div>
      </motion.div>

      {/* QUICK ACTIONS */}

     {/* QUICK ACTIONS */}

<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

  {[
    {
      href:
        "/dashboard/user/create-booking",
      icon: Plus,
      title:
        "New Booking",
      desc:
        "Create shipment",
      bg: "bg-green-100",
      color:
        "text-green-700",
    },

    {
      href:
        "/dashboard/user/bookings",
      icon: Truck,
      title:
        "Bookings",
      desc:
        "All deliveries",
      bg: "bg-blue-100",
      color:
        "text-blue-700",
    },

    {
      href:
        "/dashboard/user/tracking",
      icon: MapPinned,
      title:
        "Tracking",
      desc:
        "Live shipment",
      bg: "bg-orange-100",
      color:
        "text-orange-700",
    },

    {
      href:
        "/dashboard/user/payments",
      icon: Wallet,
      title:
        "Payments",
      desc:
        "Transactions",
      bg: "bg-purple-100",
      color:
        "text-purple-700",
    },

    {
      href:
        "/dashboard/user/support",
      icon: CheckCircle2,
      title:
        "Support",
      desc:
        "Help center",
      bg: "bg-emerald-100",
      color:
        "text-emerald-700",
    },

    {
      href:
        "/dashboard/user/history",
      icon: Package,
      title:
        "History",
      desc:
        "Past orders",
      bg: "bg-pink-100",
      color:
        "text-pink-700",
    },
  ].map(
    (
      item,
      index
    ) => {
      const Icon =
        item.icon

      return (
        <Link
          key={index}
          href={
            item.href
          }
          className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
          >
            <Icon
              size={18}
              className={
                item.color
              }
            />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            {item.title}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {item.desc}
          </p>
        </Link>
      )
    }
  )}
</div>

{/* STATS */}

<div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

  {statsCards.map(
    (
      item,
      index
    ) => {
      const Icon =
        item.icon

      return (
        <motion.div
          key={item.title}
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
              index * 0.08,
          }}
          whileHover={{
            y: -3,
          }}
          className={`group overflow-hidden rounded-[24px] bg-gradient-to-br ${item.card} p-[1px] shadow-md ${item.shadow}`}
        >
          <div className="rounded-[23px] bg-white p-4">

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all group-hover:scale-105">
                <Icon
                  size={18}
                  className="text-slate-700"
                />
              </div>

              <div className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                Live
              </div>
            </div>

            <div className="mt-4">

              <p className="text-xs font-medium text-slate-500">
                {item.title}
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">
                {item.value}
              </h2>
            </div>
          </div>
        </motion.div>
      )
    }
  )}
</div>
      {/* ACTIVE SHIPMENT */}

      {shipment && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-5 sm:p-6 text-white"
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="w-full">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Truck
                    size={22}
                  />
                </div>

                <div>

                  <p className="text-sm text-green-100">
                    Active Shipment
                  </p>

                  <h2 className="mt-1 text-xl font-semibold sm:text-2xl break-words">
                    {
                      shipment.fromCity
                    }

                    {" → "}

                    {
                      shipment.toCity
                    }
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div>
                  <p className="text-sm text-green-100">
                    Vehicle
                  </p>

                  <h3 className="mt-1 text-sm font-semibold capitalize sm:text-base">
                    {
                      shipment.vehicleType
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-green-100">
                    ETA
                  </p>

                  <h3 className="mt-1 text-sm font-semibold sm:text-base">
                    {
                      shipment.eta
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-green-100">
                    Tracking ID
                  </p>

                  <h3 className="mt-1 break-all text-sm font-semibold sm:text-base">
                    {
                      shipment.trackingId
                    }
                  </h3>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="mt-7">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-sm font-medium">
                    Delivery Progress
                  </p>

                  <p className="text-sm font-medium">
                    {
                      shipment.progress
                    }%
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/20">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width:
                        `${shipment.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full rounded-full bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">

              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium capitalize backdrop-blur">
                {
                  shipment.status
                }
              </div>

              <Link
                href={`/dashboard/user/bookings/${shipment.id}`}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-medium text-green-700 transition-all hover:scale-[1.02] sm:w-fit"
              >
                Track Shipment

                <ArrowRight
                  size={16}
                />
              </Link>

              <p className="flex items-center gap-2 text-sm text-green-100">
                <Clock3
                  size={14}
                />

                Updated just now
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* RECENT BOOKINGS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
      >

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
              <Truck
                size={20}
                className="text-blue-700"
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Recent Bookings
              </h2>

              <p className="text-sm text-slate-500">
                Latest shipment activity
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/user/bookings"
            className="flex h-11 items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100"
          >
            View All
          </Link>
        </div>

        {bookings.length ===
          0 && (
          <div className="p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
              <Package
                size={26}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-5 text-base font-semibold text-slate-900">
              No bookings found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your recent bookings will appear here
            </p>

            <Link
              href="/dashboard/user/create-booking"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-green-600 px-5 text-sm font-medium text-white transition-all hover:bg-green-700"
            >
              Create Booking
            </Link>
          </div>
        )}

        <div className="divide-y divide-slate-100">

          {bookings.map(
            (
              item: any,
              index
            ) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                className="flex flex-col gap-5 p-5 transition-all hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
              >

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-base font-semibold text-slate-900 break-words">
                      {
                        item.fromCity
                      }

                      {" → "}

                      {
                        item.toCity
                      }
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
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
                        item.status
                      }
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
                  </div>
                </div>

                <div className="flex w-full items-center justify-between gap-4 lg:w-auto">

                  <div>

                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <h3 className="text-lg font-semibold text-slate-900">
                      ₹
                      {
                        item.price
                      }
                    </h3>
                  </div>

                  <Link
                    href={`/dashboard/user/bookings/${item.id}`}
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition-all hover:scale-[1.02]"
                  >
                    Details

                    <ArrowRight
                      size={16}
                    />
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  )
}