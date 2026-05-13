"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  CalendarDays,
  IndianRupee,
  PackageCheck,
  TrendingUp,
  Wallet,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverEarningsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    data,
    setData,
  ] = useState<any>(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState("")

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchEarnings()

  }, [])

  const fetchEarnings =
    async () => {

      try {

        setLoading(true)

        const res =
          await axios.get(
            "/api/driver/earnings"
          )

       setData({
  ...res.data.stats,
  deliveries:
    res.data.deliveries,
})

      } catch (error: any) {

        console.log(error)

        setError(
          error?.response?.data
            ?.error ||
          "Failed to fetch earnings"
        )

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

          <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading earnings...
          </p>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // ERROR
  //////////////////////////////////////////////////////

  if (error) {

    return (
      <div className="rounded-[30px] border border-red-200 bg-red-50 p-6 text-red-600">

        {error}

      </div>
    )
  }

  //////////////////////////////////////////////////////
  // CARDS
  //////////////////////////////////////////////////////

  const cards = [

    {
      title:
        "Total Earnings",

      value:
        `₹${data.totalEarnings || 0}`,

      icon:
        Wallet,

      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Today Earnings",

      value:
        `₹${data.todayEarnings || 0}`,

      icon:
        IndianRupee,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      title:
        "Completed Deliveries",

      value:
        data.completedDeliveries || 0,

      icon:
        PackageCheck,

      color:
        "from-orange-500 to-amber-500",
    },

    {
      title:
        "Average Earnings",

      value:
        `₹${data.averageEarnings || 0}`,

      icon:
        TrendingUp,

      color:
        "from-violet-500 to-fuchsia-500",
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

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative">

          <h1 className="text-3xl font-bold">
            Earnings
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Track delivery income and completed orders.
          </p>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

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

                    <h2 className="mt-3 text-4xl font-bold break-words">
                      {
                        item.value
                      }
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                    <Icon
                      size={26}
                    />

                  </div>
                </div>
              </motion.div>
            )
          }
        )}
      </div>

      {/* EXTRA STATS */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

              <CalendarDays
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Weekly Earnings
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">

                ₹{
                  data.weeklyEarnings || 0
                }

              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

              <TrendingUp
                size={22}
                className="text-green-600"
              />
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Monthly Earnings
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">

                ₹{
                  data.monthlyEarnings || 0
                }

              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* DELIVERY LIST */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Recent Deliveries
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Completed delivery history.
            </p>
          </div>

          <PackageCheck
            className="text-slate-400"
          />
        </div>

        <div className="mt-6 space-y-4">

          {data.deliveries?.length === 0 && (

            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">

              <p className="text-sm text-slate-500">
                No completed deliveries yet.
              </p>
            </div>
          )}

          {data.deliveries?.map(
            (
              item: any
            ) => (

              <motion.div
                key={item.id}
                whileHover={{
                  y: -2,
                }}
                className="flex flex-col gap-5 rounded-3xl border border-slate-200 p-5 transition-all hover:shadow-sm lg:flex-row lg:items-center lg:justify-between"
              >

                {/* LEFT */}

                <div className="min-w-0">

                  <h3 className="break-all text-lg font-semibold text-slate-900">

                    {
                      item.trackingId
                    }

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    {
                      item.fromCity
                    }

                    {" → "}

                    {
                      item.toCity
                    }

                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">

                      {
                        item.vehicleType
                      }

                    </div>

                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                      Delivered

                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-wrap items-center gap-8">

                  <div>

                    <p className="text-xs text-slate-500">
                      Earned
                    </p>

                    <h4 className="mt-1 text-lg font-bold text-green-600">

                      ₹{
                        item.driverEarning || 0
                      }

                    </h4>
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Delivered On
                    </p>

                    <h4 className="mt-1 text-sm font-medium text-slate-900">

                      {
                        item.deliveredAt
                          ? new Date(
                              item.deliveredAt
                            ).toLocaleDateString()
                          : "-"
                      }

                    </h4>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  )
}