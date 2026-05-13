"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  AlertTriangle,
  IndianRupee,
  Package,
  Power,
  Truck,
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
  // TOGGLE ONLINE
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
  // NOT APPROVED
  //////////////////////////////////////////////////////

  if (

    !stats.driver
      ?.isDriverApproved

  ) {

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
          className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white"
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-yellow-300">
                Driver Verification
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Verification Required
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">

                Your driver account is currently under verification.
                Upload valid documents to activate deliveries,
                earnings and live order access.

              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-yellow-500/20 px-5 py-3 text-sm font-medium text-yellow-300">

              <AlertTriangle
                size={18}
              />

              Verification Pending

            </div>
          </div>
        </motion.div>

        {/* LOCKED FEATURES */}

        <div className="grid gap-4 md:grid-cols-3">

          {[
            {
              title:
                "Orders Locked",

              desc:
                "Accepting delivery requests is disabled.",
            },

            {
              title:
                "Deliveries Locked",

              desc:
                "Delivery tracking is unavailable.",
            },

            {
              title:
                "Earnings Locked",

              desc:
                "Driver earnings are hidden until approval.",
            },
          ].map(
            (
              item
            ) => (

              <motion.div
                key={item.title}
                whileHover={{
                  y: -4,
                }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                  <Package
                    size={28}
                    className="text-red-600"
                  />

                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">

                  {
                    item.title
                  }

                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">

                  {
                    item.desc
                  }

                </p>
              </motion.div>
            )
          )}
        </div>

        {/* DOCUMENTS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm"
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                Upload Driver Documents

              </h2>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">

                Submit Aadhaar, license, RC and insurance
                documents for automatic verification and
                account activation.

              </p>
            </div>

            <Link
              href="/dashboard/driver/documents"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-orange-500 px-6 text-sm font-medium text-white transition-all hover:bg-orange-600"
            >

              Complete Verification

            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // CARDS
  //////////////////////////////////////////////////////

  const cards = [

    {
      title:
        "Pending Orders",

      value:
        stats.pendingOrders || 0,

      icon:
        Package,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      title:
        "Active Deliveries",

      value:
        stats.activeDeliveries || 0,

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

  //////////////////////////////////////////////////////
  // MAIN UI
  //////////////////////////////////////////////////////

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
        className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white"
      >

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-medium text-green-300">
              Driver Panel
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Driver Dashboard
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              Manage deliveries, earnings and orders.
            </p>
          </div>

          <button
            onClick={
              toggleOnlineStatus
            }
            className={`flex h-12 items-center justify-center gap-3 rounded-2xl px-5 text-sm font-medium transition-all ${
              online
                ? "bg-green-500 text-white"
                : "bg-slate-700 text-slate-300"
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
    </div>
  )
}