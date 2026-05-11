// app/dashboard/user/payments/page.tsx

"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import Link from "next/link"

import {
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Receipt,
  Search,
  Wallet,
} from "lucide-react"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

export default function PaymentsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [payments, setPayments] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [filter, setFilter] =
    useState("all")

  //////////////////////////////////////////////////////
  // FETCH PAYMENTS
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchPayments()

  }, [])

  const fetchPayments =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/user/payments"
          )

        setPayments(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // FILTERED DATA
  //////////////////////////////////////////////////////

  const filteredPayments =
    useMemo(() => {

      return payments.filter(
        (item) => {

          const matchesSearch =
            item.transactionId
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

          const matchesFilter =
            filter === "all"
              ? true
              : item.status ===
                filter

          return (
            matchesSearch &&
            matchesFilter
          )
        }
      )
    }, [
      payments,
      search,
      filter,
    ])

  //////////////////////////////////////////////////////
  // STATS
  //////////////////////////////////////////////////////

  const totalSpent =
    payments.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.amount,
      0
    )

  const successfulPayments =
    payments.filter(
      (item) =>
        item.status ===
        "paid"
    ).length

  const pendingPayments =
    payments.filter(
      (item) =>
        item.status ===
        "pending"
    ).length

  const refundedPayments =
    payments.filter(
      (item) =>
        item.status ===
        "refunded"
    ).length

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading payments...
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

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

              <Wallet
                size={22}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Payments
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage all transactions and invoices easily.
              </p>
            </div>
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 text-sm font-medium text-white transition-all hover:bg-green-600">

            Download Report

            <ArrowUpRight
              size={16}
            />
          </button>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}

        <div className="overflow-hidden rounded-[26px] bg-gradient-to-br from-green-500 to-emerald-500 p-[1px] shadow-sm">

          <div className="rounded-[25px] bg-white/10 p-5 backdrop-blur">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-green-100">
                  Total Spent
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">

                  ₹
                  {
                    totalSpent
                  }

                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">

                <IndianRupee
                  size={22}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUCCESS */}

        <div className="overflow-hidden rounded-[26px] bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] shadow-sm">

          <div className="rounded-[25px] bg-white/10 p-5 backdrop-blur">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-blue-100">
                  Successful
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">

                  {
                    successfulPayments
                  }

                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">

                <CreditCard
                  size={22}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PENDING */}

        <div className="overflow-hidden rounded-[26px] bg-gradient-to-br from-orange-500 to-amber-500 p-[1px] shadow-sm">

          <div className="rounded-[25px] bg-white/10 p-5 backdrop-blur">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-orange-100">
                  Pending
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">

                  {
                    pendingPayments
                  }

                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">

                <Wallet
                  size={22}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* REFUND */}

        <div className="overflow-hidden rounded-[26px] bg-gradient-to-br from-pink-500 to-rose-500 p-[1px] shadow-sm">

          <div className="rounded-[25px] bg-white/10 p-5 backdrop-blur">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-pink-100">
                  Refunded
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">

                  {
                    refundedPayments
                  }

                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">

                <Receipt
                  size={22}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-sm">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search transaction..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-green-500"
            />
          </div>

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
                  className={`rounded-2xl px-4 py-2 text-xs font-medium capitalize transition-all sm:text-sm ${
                    filter === item
                      ? "bg-green-600 text-white"
                      : "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
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

      <div className="space-y-4">

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
              whileHover={{
                y: -2,
              }}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >

              <div className="flex flex-col gap-5 p-5">

                {/* TOP */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex items-start gap-4 min-w-0">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">

                      <Receipt
                        size={20}
                      />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="break-all text-sm font-semibold text-slate-900 sm:text-base">

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

                      <p className="mt-2 break-all text-sm text-slate-500">

                        Tracking:
                        {" "}
                        {
                          item.booking
                            ?.trackingId
                        }

                      </p>
                    </div>
                  </div>

                  <div className="text-left lg:text-right">

                    <p className="text-xs text-slate-500">
                      Amount
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">

                      ₹
                      {
                        item.amount
                      }

                    </h2>
                  </div>
                </div>

                {/* BOTTOM */}

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex flex-wrap gap-5">

                    <div>

                      <p className="text-xs text-slate-500">
                        Payment Method
                      </p>

                      <h3 className="mt-1 text-sm font-semibold capitalize text-slate-900">

                        {
                          item.paymentMethod
                        }

                      </h3>
                    </div>

                    <div>

                      <p className="text-xs text-slate-500">
                        Date
                      </p>

                      <h3 className="mt-1 text-sm font-semibold text-slate-900">

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        }

                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {/* PAY NOW */}

                    {item.status ===
                      "pending" && (

                      <button
                        onClick={async () => {

                          try {

                            await axios.post(
                              "/api/payments",
                              {

                                userId:
                                  item.userId,

                                bookingId:
                                  item.bookingId,

                                amount:
                                  item.amount,

                                paymentMethod:
                                  "upi",

                                status:
                                  "paid",
                              }
                            )

                            fetchPayments()

                          } catch (error) {

                            console.log(error)
                          }
                        }}
                        className="flex h-11 items-center justify-center rounded-2xl bg-orange-500 px-5 text-sm font-medium text-white transition-all hover:bg-orange-600"
                      >

                        Pay Now

                      </button>
                    )}

                    {/* INVOICE */}

                    <Link
                      href={`/dashboard/user/invoice/${item.id}`}
                      className="flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white transition-all hover:bg-black"
                    >

                      Invoice

                    </Link>
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