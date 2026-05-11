"use client"

import axios from "axios"

import Link from "next/link"

import {
  motion,
} from "framer-motion"

import {
  ArrowRight,
  Clock3,
  Package,
  Truck,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverOrdersPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    orders,
    setOrders,
  ] = useState<any[]>([])

  const [
    filter,
    setFilter,
  ] = useState("all")

  const [
    search,
    setSearch,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/driver/orders"
          )

        setOrders(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // FILTERED ORDERS
  //////////////////////////////////////////////////////

  const filteredOrders =
    orders.filter(
      (
        item
      ) => {

        const matchesSearch =
          item.trackingId
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        if (
          filter ===
          "active"
        ) {

          return (
            matchesSearch &&
            item.status !==
              "delivered"
          )
        }

        if (
          filter ===
          "delivered"
        ) {

          return (
            matchesSearch &&
            item.status ===
              "delivered"
          )
        }

        return matchesSearch
      }
    )

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading orders...
          </p>
        </div>
      </div>
    )
  }

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
          Driver Orders
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Manage all assigned deliveries.
        </p>
      </motion.div>

      {/* FILTERS */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search tracking ID..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none focus:border-orange-500 lg:max-w-sm"
        />

        {/* TABS */}

        <div className="flex flex-wrap gap-3">

          {[
            "all",
            "active",
            "delivered",
          ].map(
            (
              item
            ) => (

              <button
                key={item}
                onClick={() =>
                  setFilter(
                    item
                  )
                }
                className={`h-11 rounded-2xl px-5 text-sm font-medium capitalize transition-all ${
                  filter === item
                    ? "bg-black text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}
              >

                {item}

              </button>
            )
          )}
        </div>
      </div>

      {/* EMPTY */}

      {filteredOrders.length === 0 && (

        <div className="rounded-[30px] border border-dashed border-slate-300 bg-white p-10 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100">

            <Package
              size={26}
              className="text-orange-600"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            No Orders Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Matching deliveries will appear here.
          </p>
        </div>
      )}

      {/* ORDERS */}

      <div className="grid gap-5">

        {filteredOrders.map(
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
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100">

                    <Truck
                      size={26}
                      className="text-orange-600"
                    />
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-lg font-bold text-slate-900">

                        {
                          item.trackingId
                        }

                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          item.status ===
                          "delivered"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                              "in_transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
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

                    <p className="mt-3 text-sm text-slate-500">

                      {
                        item.fromCity
                      } → {
                        item.toCity
                      }

                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-5">

                      <div>

                        <p className="text-xs text-slate-500">
                          Earnings
                        </p>

                        <h3 className="font-semibold text-green-600">

                          ₹{
                            item.driverEarning ||
                            0
                          }

                        </h3>
                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Vehicle
                        </p>

                        <h3 className="font-semibold capitalize text-slate-900">

                          {
                            item.vehicleType
                          }

                        </h3>
                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Pickup
                        </p>

                        <h3 className="font-semibold text-slate-900">

                          {
                            item.pickupDate ||
                            "Today"
                          }

                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-end gap-4">

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">

                    <Clock3
                      size={18}
                      className="text-slate-500"
                    />

                    <div>

                      <p className="text-xs text-slate-500">
                        Updated
                      </p>

                      <p className="text-sm font-medium text-slate-900">

                        {
                          new Date(
                            item.updatedAt
                          ).toLocaleDateString()
                        }

                      </p>
                    </div>
                  </div>

                  {/* DETAILS BUTTON */}

                  <Link
                    href={`/dashboard/driver/orders/${item.id}`}
                    className="flex h-11 items-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition-all hover:bg-slate-800"
                  >

                    View Details

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