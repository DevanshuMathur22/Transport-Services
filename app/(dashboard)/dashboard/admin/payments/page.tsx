// app/dashboard/admin/payments/page.tsx

"use client"

import axios from "axios"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { motion } from "framer-motion"

import {
  CreditCard,
  Download,
  IndianRupee,
  Receipt,
  RefreshCcw,
  Search,
  Wallet,
  XCircle,
} from "lucide-react"

export default function AdminPaymentsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [payments, setPayments] =
    useState<any[]>([])

  const [stats, setStats] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [filter, setFilter] =
    useState("all")

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchPayments()

  }, [])

  const fetchPayments =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/admin/payments"
          )

        setPayments(
          res.data.payments
        )

        setStats(
          res.data.stats
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // REFUND
  //////////////////////////////////////////////////////

  const refundPayment =
    async (
      paymentId: string
    ) => {

      try {

        await axios.put(
          `/api/admin/payments/${paymentId}`,
          {
            status:
              "refunded",
          }
        )

        fetchPayments()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // FILTERED
  //////////////////////////////////////////////////////

  const filteredPayments =
    useMemo(() => {

      return payments.filter(
        (item) => {

          const matchSearch =

            item.transactionId
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.user?.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.user?.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.booking
              ?.trackingId
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchFilter =
            filter === "all"
              ? true
              : item.status ===
                filter

          return (
            matchSearch &&
            matchFilter
          )
        }
      )

    }, [
      payments,
      search,
      filter,
    ])

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

  return (
    <div className="space-y-5 p-5">

      {/* HERO */}

      <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Payments
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Manage transactions and revenue
            </p>
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 text-sm font-medium text-white transition-all hover:bg-green-600">

            <Download
              size={16}
            />

            Export Report

          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* REVENUE */}

        <div className="rounded-[28px] bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-green-100">
                Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                ₹
                {
                  stats?.totalRevenue ||
                  0
                }

              </h2>
            </div>

            <IndianRupee
              size={24}
            />
          </div>
        </div>

        {/* SUCCESS */}

        <div className="rounded-[28px] bg-gradient-to-br from-blue-500 to-cyan-600 p-5 text-white">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-blue-100">
                Successful
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  stats?.successful ||
                  0
                }

              </h2>
            </div>

            <CreditCard
              size={24}
            />
          </div>
        </div>

        {/* PENDING */}

        <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-amber-600 p-5 text-white">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-orange-100">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  stats?.pending ||
                  0
                }

              </h2>
            </div>

            <Wallet
              size={24}
            />
          </div>
        </div>

        {/* REFUNDED */}

        <div className="rounded-[28px] bg-gradient-to-br from-pink-500 to-rose-600 p-5 text-white">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-pink-100">
                Refunded
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  stats?.refunded ||
                  0
                }

              </h2>
            </div>

            <Receipt
              size={24}
            />
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search payments..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-green-500"
            />
          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">

            {[
              "all",
              "paid",
              "pending",
              "refunded",
            ].map(
              (item) => (

                <button
                  key={item}
                  onClick={() =>
                    setFilter(item)
                  }
                  className={`rounded-2xl px-4 py-2 text-sm font-medium capitalize transition-all ${
                    filter === item
                      ? "bg-green-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >

                  {item}

                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* PAYMENTS */}

      <div className="grid gap-4">

        {filteredPayments.map(
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
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

                    <Receipt
                      size={22}
                      className="text-green-700"
                    />
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="break-all text-lg font-semibold text-slate-900">

                        {
                          item.transactionId
                        }

                      </h2>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          item.status ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                              "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >

                        {
                          item.status
                        }

                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-slate-500">

                      <p>

                        Customer:
                        {" "}
                        {
                          item.user?.name
                        }

                      </p>

                      <p>

                        Email:
                        {" "}
                        {
                          item.user?.email
                        }

                      </p>

                      <p>

                        Tracking:
                        {" "}
                        {
                          item.booking
                            ?.trackingId
                        }

                      </p>

                      <p>

                        Method:
                        {" "}
                        {
                          item.paymentMethod
                        }

                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-start gap-4 lg:items-end">

                  <div>

                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-slate-900">

                      ₹
                      {
                        item.amount
                      }

                    </h2>
                  </div>

                  <p className="text-sm text-slate-500">

                    {
                      new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    }

                  </p>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-3">

                    {/* REFUND */}

                    {item.status ===
                      "paid" && (

                      <button
                        onClick={() =>
                          refundPayment(
                            item.id
                          )
                        }
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-pink-500 px-5 text-sm font-medium text-white transition-all hover:bg-pink-600"
                      >

                        <RefreshCcw
                          size={16}
                        />

                        Refund

                      </button>
                    )}

                    {/* CANCEL */}

                    {item.status ===
                      "pending" && (

                      <button
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 text-sm font-medium text-white transition-all hover:bg-red-600"
                      >

                        <XCircle
                          size={16}
                        />

                        Cancel

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