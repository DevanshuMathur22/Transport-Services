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
} from "lucide-react"

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

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchStats()

    fetchOnlineStatus()

  }, [])

  const fetchStats =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/driver/stats"
          )

        setStats(
          res.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // ONLINE STATUS
  //////////////////////////////////////////////////////

  const fetchOnlineStatus =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/driver/online-status"
          )

        setOnline(
          res.data.isOnline
        )

      } catch (error) {

        console.log(error)
      }
    }

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

        fetchStats()

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

        fetchStats()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (!stats) {

    return null
  }

  //////////////////////////////////////////////////////
  // CARDS
  //////////////////////////////////////////////////////

  const cards = [

    {
      title:
        "Pending Orders",

      value:
        stats.pendingOrders,

      icon:
        Package,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      title:
        "Active Deliveries",

      value:
        stats.activeDeliveries,

      icon:
        Truck,

      color:
        "from-orange-500 to-amber-500",
    },

    {
      title:
        "Total Earnings",

      value:
        `₹${stats.earnings}`,

      icon:
        IndianRupee,

      color:
        "from-green-500 to-emerald-500",
    },
  ]

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

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Driver Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Manage orders, deliveries and earnings.
            </p>
          </div>

          <button
            onClick={
              toggleOnlineStatus
            }
            className={`flex h-12 items-center gap-3 rounded-2xl px-5 text-sm font-medium transition-all ${
              online
                ? "bg-green-500 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >

            <Power size={18} />

            {
              online
                ? "Online"
                : "Offline"
            }

          </button>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid gap-5 md:grid-cols-3">

        {cards.map(
          (
            item
          ) => {

            const Icon =
              item.icon

            return (
              <motion.div
                key={
                  item.title
                }
                whileHover={{
                  y: -4,
                }}
                className={`rounded-[28px] bg-gradient-to-br ${item.color} p-6 text-white shadow-lg`}
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-white/80">
                      {
                        item.title
                      }
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      {
                        item.value
                      }
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                    <Icon
                      size={28}
                    />

                  </div>
                </div>
              </motion.div>
            )
          }
        )}
      </div>

      {/* AVAILABLE ORDERS */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Available Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Nearby pending shipments.
            </p>
          </div>

          <Package
            className="text-slate-400"
          />
        </div>

        <div className="mt-6 space-y-4">

          {stats.availableOrders?.length === 0 && (

            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">

              <p className="text-sm text-slate-500">
                No pending orders available.
              </p>
            </div>
          )}

          {stats.availableOrders?.map(
            (
              item: any
            ) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 p-5"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">
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
                      } → {
                        item.toCity
                      }
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      Vehicle: {
                        item.vehicleType
                      }
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <div>

                      <p className="text-sm text-slate-500">
                        Earnings
                      </p>

                      <h4 className="text-lg font-bold text-green-600">
                        ₹{
                          item.price
                        }
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        acceptOrder(
                          item.id
                        )
                      }
                      className="h-11 rounded-2xl bg-black px-5 text-sm font-medium text-white transition-all hover:bg-slate-800"
                    >

                      Accept Order

                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* CURRENT DELIVERY */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Current Delivery
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Active shipment in progress.
            </p>
          </div>

          <Truck
            className="text-slate-400"
          />
        </div>

        {!stats.currentDelivery ? (

          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-8 text-center">

            <p className="text-sm text-slate-500">
              No active delivery.
            </p>
          </div>

        ) : (

          <div className="mt-6 rounded-3xl bg-orange-50 p-5">

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
                    } → {
                      stats.currentDelivery.toCity
                    }

                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">

                  {
                    stats.currentDelivery.status
                  }

                </div>
              </div>

              {/* ACTIONS */}

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

      {/* ACTIVITY */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <div className="mt-6 space-y-4">

          {stats.activities?.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-3xl border border-slate-200 p-4"
              >

                <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />

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
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}