"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  IndianRupee,
  Package,
  Truck,
  Power,
  MapPin,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

export default function DriverDashboard() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    stats,
    setStats,
  ] = useState<any>(null)

  const [
    online,
    setOnline,
  ] = useState(false)

  const [
    loading,
    setLoading,
  ] = useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchDashboard()

  }, [])

  const fetchDashboard =
    async () => {

      try {

        const [
          statsRes,
          statusRes,
        ] = await Promise.all([

          axios.get(
            "/api/driver/stats"
          ),

          axios.get(
            "/api/driver/online-status"
          ),
        ])

        setStats(
          statsRes.data
        )

        setOnline(
          statusRes.data.isOnline
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // TOGGLE STATUS
  //////////////////////////////////////////////////////

  const toggleOnlineStatus =
    async () => {

      try {

        const res =
          await axios.put(
            "/api/driver/online-status",
            {
              isOnline:
                !online,
            }
          )

        setOnline(
          res.data.isOnline
        )

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // ACCEPT ORDER
  //////////////////////////////////////////////////////

  const acceptOrder =
    async (
      bookingId: string
    ) => {

      try {

        const me =
          await axios.get(
            "/api/auth/me"
          )

        await axios.post(
          "/api/driver/accept-order",
          {

            bookingId,

            driverId:
              me.data.user.id,
          }
        )

        fetchDashboard()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // UPDATE STATUS
  //////////////////////////////////////////////////////

  const updateStatus =
    async (
      bookingId: string,
      status: string
    ) => {

      try {

        await axios.post(
          "/api/driver/update-status",
          {

            bookingId,

            status,
          }
        )

        fetchDashboard()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (
    loading ||
    !stats
  ) {

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

  //////////////////////////////////////////////////////
  // STATS CARDS
  //////////////////////////////////////////////////////

  const cards = [

    {
      title:
        "Pending Orders",

      value:
        stats.pendingOrders ||
        0,

      icon:
        Package,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      title:
        "Active Deliveries",

      value:
        stats.activeDeliveries ||
        0,

      icon:
        Truck,

      color:
        "from-orange-500 to-amber-500",
    },

    {
      title:
        "Total Earnings",

      value:
        `₹${stats.earnings || 0}`,

      icon:
        IndianRupee,

      color:
        "from-green-500 to-emerald-500",
    },
  ]

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
        className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 sm:p-6 text-white"
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <Truck
                size={28}
                className="text-green-400"
              />

            </div>

            <div>

              <p className="text-sm font-medium text-green-300">
                Driver Panel
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Driver Dashboard
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage deliveries, track orders and monitor earnings easily.
              </p>
            </div>
          </div>

          <button
            onClick={
              toggleOnlineStatus
            }
            className={`flex h-12 items-center justify-center gap-3 rounded-2xl px-5 text-sm font-medium transition-all ${
              online
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >

            <Power
              size={18}
            />

            {
              online
                ? "Online"
                : "Offline"
            }

          </button>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid gap-4 md:grid-cols-3">

        {cards.map(
          (
            item,
            index
          ) => {

            const Icon =
              item.icon

            return (
              <motion.div
                key={
                  item.title
                }
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
                  y: -4,
                }}
                className={`overflow-hidden rounded-[28px] bg-gradient-to-br ${item.color} p-[1px] shadow-lg`}
              >

                <div className="rounded-[27px] bg-white p-5">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm text-slate-500">
                        {
                          item.title
                        }
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-slate-900">
                        {
                          item.value
                        }
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                      <Icon
                        size={28}
                        className="text-slate-700"
                      />

                    </div>
                  </div>
                </div>
              </motion.div>
            )
          }
        )}
      </div>

      {/* AVAILABLE ORDERS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
      >

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

              <Package
                size={22}
                className="text-blue-700"
              />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Available Orders
              </h2>

              <p className="text-sm text-slate-500">
                Nearby pending shipments
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">

            {
              stats.availableOrders
                ?.length || 0
            } Orders

          </div>
        </div>

        <div className="p-5 space-y-4">

          {stats.availableOrders?.length === 0 && (

            <div className="rounded-[24px] border border-dashed border-slate-300 p-10 text-center">

              <Package
                size={30}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No pending orders
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                New delivery requests will appear here
              </p>
            </div>
          )}

          {stats.availableOrders?.map(
            (
              item: any,
              index: number
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
                whileHover={{
                  y: -2,
                }}
                className="rounded-[28px] border border-slate-200 p-5 transition-all hover:shadow-md"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="min-w-0">

                    <h3 className="break-all text-lg font-semibold text-slate-900">

                      {
                        item.trackingId
                      }

                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                      <MapPin
                        size={16}
                      />

                      {
                        item.fromCity
                      }

                      {" → "}

                      {
                        item.toCity
                      }

                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-5">

                      <div>

                        <p className="text-xs text-slate-500">
                          Vehicle
                        </p>

                        <h4 className="mt-1 text-sm font-semibold capitalize text-slate-900">

                          {
                            item.vehicleType
                          }

                        </h4>
                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Earnings
                        </p>

                        <h4 className="mt-1 text-sm font-semibold text-green-600">

                          ₹
                          {
                            item.price
                          }

                        </h4>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      acceptOrder(
                        item.id
                      )
                    }
                    className="flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition-all hover:bg-black"
                  >

                    Accept Order

                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* CURRENT DELIVERY */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
      >

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

              <Truck
                size={22}
                className="text-orange-700"
              />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Current Delivery
              </h2>

              <p className="text-sm text-slate-500">
                Active shipment in progress
              </p>
            </div>
          </div>

          {stats.currentDelivery && (

            <div className="rounded-2xl bg-orange-100 px-4 py-2 text-sm font-medium capitalize text-orange-700">

              {
                stats.currentDelivery.status
              }

            </div>
          )}
        </div>

        <div className="p-5">

          {!stats.currentDelivery ? (

            <div className="rounded-[24px] border border-dashed border-slate-300 p-10 text-center">

              <Truck
                size={30}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No active delivery
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Accepted orders will appear here
              </p>
            </div>

          ) : (

            <div className="rounded-[28px] bg-orange-50 p-5">

              <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">

                      {
                        stats.currentDelivery.trackingId
                      }

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                      {
                        stats.currentDelivery.fromCity
                      }

                      {" → "}

                      {
                        stats.currentDelivery.toCity
                      }

                    </p>
                  </div>

                  <Link
                    href={`/dashboard/driver/orders/${stats.currentDelivery.id}`}
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100"
                  >

                    View Details

                    <ArrowRight
                      size={16}
                    />

                  </Link>
                </div>

                <div className="flex flex-wrap gap-3">

                  {stats.currentDelivery.status ===
                    "accepted" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          stats.currentDelivery.id,
                          "picked_up"
                        )
                      }
                      className="h-11 rounded-2xl bg-orange-500 px-5 text-sm font-medium text-white"
                    >

                      Mark Picked Up

                    </button>
                  )}

                  {stats.currentDelivery.status ===
                    "picked_up" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          stats.currentDelivery.id,
                          "in_transit"
                        )
                      }
                      className="h-11 rounded-2xl bg-blue-500 px-5 text-sm font-medium text-white"
                    >

                      Start Delivery

                    </button>
                  )}

                  {stats.currentDelivery.status ===
                    "in_transit" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          stats.currentDelivery.id,
                          "delivered"
                        )
                      }
                      className="h-11 rounded-2xl bg-green-600 px-5 text-sm font-medium text-white"
                    >

                      Mark Delivered

                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ACTIVITY */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
      >

        <div className="border-b border-slate-200 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

              <Clock3
                size={22}
                className="text-green-700"
              />

            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-500">
                Latest driver updates
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">

          {stats.activities?.length === 0 && (

            <div className="rounded-[24px] border border-dashed border-slate-300 p-10 text-center">

              <Clock3
                size={30}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No activity found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Driver activity history will appear here
              </p>
            </div>
          )}

          {stats.activities?.map(
            (
              item: any,
              index: number
            ) => (

              <motion.div
                key={index}
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
                className="flex items-start gap-4 rounded-[24px] border border-slate-200 p-4"
              >

                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">

                  <CheckCircle2
                    size={15}
                    className="text-green-700"
                  />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">

                    {
                      item.message
                    }

                  </p>

                  <p className="mt-1 text-xs text-slate-500">

                    {
                      item.time
                    }

                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  )
}