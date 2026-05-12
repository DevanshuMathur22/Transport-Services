// app/dashboard/admin/analytics/page.tsx

"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Activity,
  BarChart3,
  CreditCard,
  IndianRupee,
  MapPinned,
  Package,
  TimerReset,
  Truck,
  Users,
  Wallet,
} from "lucide-react"

export default function AdminAnalyticsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [data, setData] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchAnalytics()

  }, [])

  const fetchAnalytics =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/admin/analytics"
          )

        setData(
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
      <div className="flex h-[70vh] items-center justify-center">

        <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

      </div>
    )
  }

  //////////////////////////////////////////////////////
  // STATS CARDS
  //////////////////////////////////////////////////////

  const cards = [

    {
      label:
        "Revenue",

      value:
        `₹${data?.revenue || 0}`,

      icon:
        IndianRupee,

      gradient:
        "from-green-500 to-emerald-600",
    },

    {
      label:
        "Bookings",

      value:
        data?.totalBookings || 0,

      icon:
        Package,

      gradient:
        "from-blue-500 to-cyan-600",
    },

    {
      label:
        "Users",

      value:
        data?.totalUsers || 0,

      icon:
        Users,

      gradient:
        "from-orange-500 to-amber-600",
    },

    {
      label:
        "Drivers",

      value:
        data?.totalDrivers || 0,

      icon:
        Truck,

      gradient:
        "from-pink-500 to-rose-600",
    },
  ]

  return (
    <div className="space-y-5 p-5">

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
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white"
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Analytics Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">

              Real-time business insights,
              revenue tracking,
              delivery monitoring,
              payment analytics
              and operational overview.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

            <BarChart3
              size={30}
            />
          </div>
        </div>
      </motion.div>

      {/* TOP STATS */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          (
            item,
            index
          ) => {

            const Icon =
              item.icon

            return (
              <motion.div
                key={index}
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
                className={`overflow-hidden rounded-[30px] bg-gradient-to-br ${item.gradient} p-[1px] shadow-sm`}
              >

                <div className="rounded-[29px] bg-white/10 p-5 backdrop-blur">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm text-white/70">
                        {
                          item.label
                        }
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-white">

                        {
                          item.value
                        }

                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">

                      <Icon
                        size={24}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          }
        )}
      </div>

      {/* ANALYTICS GRID */}

      <div className="grid gap-5 xl:grid-cols-2">

        {/* BOOKINGS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

              <Package
                size={22}
                className="text-blue-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Booking Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Shipment performance overview
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            {[
              {
                label:
                  "Pending Bookings",

                value:
                  data?.pendingBookings,
              },

              {
                label:
                  "In Transit",

                value:
                  data?.inTransitBookings,
              },

              {
                label:
                  "Delivered",

                value:
                  data?.deliveredBookings,
              },

              {
                label:
                  "Cancelled",

                value:
                  data?.cancelledBookings,
              },
            ].map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <p className="font-medium text-slate-700">

                    {
                      item.label
                    }

                  </p>

                  <h3 className="text-xl font-bold text-slate-900">

                    {
                      item.value
                    }

                  </h3>
                </div>
              )
            )}
          </div>
        </div>

        {/* PAYMENTS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

              <CreditCard
                size={22}
                className="text-green-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Payment Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Transaction insights
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            {[
              {
                label:
                  "Paid Payments",

                value:
                  data?.paidPayments,
              },

              {
                label:
                  "Pending Payments",

                value:
                  data?.pendingPayments,
              },

              {
                label:
                  "Refunded Payments",

                value:
                  data?.refundedPayments,
              },

              {
                label:
                  "Failed Payments",

                value:
                  data?.failedPayments,
              },
            ].map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <p className="font-medium text-slate-700">

                    {
                      item.label
                    }

                  </p>

                  <h3 className="text-xl font-bold text-slate-900">

                    {
                      item.value
                    }

                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* EXTRA INSIGHTS */}

      <div className="grid gap-5 lg:grid-cols-3">

        {/* ONLINE DRIVERS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Activity
              size={22}
              className="text-green-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Online Drivers
            </h2>
          </div>

          <h3 className="mt-6 text-5xl font-bold text-slate-900">

            {
              data?.onlineDrivers ||
              0
            }

          </h3>

          <p className="mt-3 text-sm text-slate-500">
            Drivers currently active
          </p>
        </div>

        {/* SUCCESS RATE */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Wallet
              size={22}
              className="text-blue-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Success Rate
            </h2>
          </div>

          <h3 className="mt-6 text-5xl font-bold text-slate-900">

            {
              data?.successRate ||
              0
            }%

          </h3>

          <p className="mt-3 text-sm text-slate-500">
            Successful deliveries
          </p>
        </div>

        {/* DELIVERY TIME */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <TimerReset
              size={22}
              className="text-orange-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Avg Delivery
            </h2>
          </div>

          <h3 className="mt-6 text-5xl font-bold text-slate-900">

            {
              data?.avgDeliveryTime ||
              "2h"
            }

          </h3>

          <p className="mt-3 text-sm text-slate-500">
            Average delivery duration
          </p>
        </div>
      </div>

      {/* CITY + VEHICLE */}

      <div className="grid gap-5 xl:grid-cols-2">

        {/* TOP CITIES */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <MapPinned
              size={22}
              className="text-pink-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Top Cities
            </h2>
          </div>

          <div className="mt-6 space-y-4">

            {data?.topCities?.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <p className="font-medium text-slate-700">

                    {
                      item.city
                    }

                  </p>

                  <h3 className="text-lg font-bold text-slate-900">

                    {
                      item.count
                    }

                  </h3>
                </div>
              )
            )}
          </div>
        </div>

        {/* VEHICLES */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Truck
              size={22}
              className="text-orange-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Vehicle Usage
            </h2>
          </div>

          <div className="mt-6 space-y-4">

            {data?.vehicleStats?.map(
              (
                item: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <p className="font-medium capitalize text-slate-700">

                    {
                      item.vehicleType
                    }

                  </p>

                  <h3 className="text-lg font-bold text-slate-900">

                    {
                      item.count
                    }

                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}