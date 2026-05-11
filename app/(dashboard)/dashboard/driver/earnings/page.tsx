"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  IndianRupee,
  PackageCheck,
  Wallet,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverEarningsPage() {

  const [
    data,
    setData,
  ] = useState<any>(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchEarnings()

  }, [])

  const fetchEarnings =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/driver/earnings"
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
      <div className="flex h-[60vh] items-center justify-center">

        <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

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
        `₹${data.totalEarnings}`,

      icon:
        Wallet,

      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Today Earnings",

      value:
        `₹${data.todayEarnings}`,

      icon:
        IndianRupee,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      title:
        "Completed Deliveries",

      value:
        data.completedDeliveries,

      icon:
        PackageCheck,

      color:
        "from-orange-500 to-amber-500",
    },

    {
      title:
        "Average Earnings",

      value:
        `₹${data.averageEarnings}`,

      icon:
        Wallet,

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
        className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white"
      >

        <h1 className="text-3xl font-bold">
          Earnings
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Track delivery income and completed orders.
        </p>
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
                className={`rounded-[28px] bg-gradient-to-br ${item.color} p-6 text-white`}
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
                      size={26}
                    />

                  </div>
                </div>
              </motion.div>
            )
          }
        )}
      </div>

      {/* DELIVERY LIST */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          Recent Deliveries
        </h2>

        <div className="mt-6 space-y-4">

          {data.deliveries.length === 0 && (

            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">

              <p className="text-sm text-slate-500">
                No completed deliveries yet.
              </p>
            </div>
          )}

          {data.deliveries.map(
            (
              item: any
            ) => (

              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-3xl border border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between"
              >

                <div>

                  <h3 className="text-lg font-semibold text-slate-900">

                    {
                      item.trackingId
                    }

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    {
                      item.fromCity
                    } → {
                      item.toCity
                    }

                  </p>
                </div>

                <div className="flex items-center gap-8">

                  <div>

                    <p className="text-xs text-slate-500">
                      Earned
                    </p>

                    <h4 className="text-lg font-bold text-green-600">

                      ₹{
                        item.driverEarning || 0
                      }

                    </h4>
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Delivered
                    </p>

                    <h4 className="text-sm font-medium text-slate-900">

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
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}