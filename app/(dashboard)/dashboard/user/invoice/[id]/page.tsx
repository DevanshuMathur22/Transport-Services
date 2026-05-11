"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Download,
  Receipt,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default function InvoicePage({
  params,
}: Props) {

  const [invoice, setInvoice] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchInvoice()

  }, [])

  const fetchInvoice =
    async () => {

      try {

        const resolved =
          await params

        const res =
          await axios.get(
            `/api/payments/invoice/${resolved.id}`
          )

        setInvoice(
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

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading invoice...
          </p>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // EMPTY
  //////////////////////////////////////////////////////

  if (!invoice) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <p className="text-sm text-red-500">
          Invoice not found
        </p>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // DATA
  //////////////////////////////////////////////////////

  const payment =
    invoice.payment

  return (
    <div className="mx-auto max-w-5xl space-y-5">

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
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white sm:p-6"
      >

        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

              <Receipt
                size={24}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Invoice
              </h1>

              <p className="mt-2 break-all text-sm text-slate-300">

                {
                  invoice.invoiceId
                }

              </p>
            </div>
          </div>

          <button
            onClick={() =>
              window.print()
            }
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 text-sm font-medium text-white transition-all hover:bg-green-600"
          >

            <Download
              size={16}
            />

            Download

          </button>
        </div>
      </motion.div>

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.05,
        }}
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
      >

        {/* TOP */}

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Transaction Amount
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">

                ₹
                {
                  payment.amount
                }

              </h2>
            </div>

            <div
              className={`w-fit rounded-full px-4 py-2 text-xs font-medium capitalize sm:text-sm ${
                payment.status ===
                "paid"
                  ? "bg-green-100 text-green-700"
                  : payment.status ===
                    "pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >

              {
                payment.status
              }

            </div>
          </div>
        </div>

        {/* DETAILS */}

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Transaction ID
            </p>

            <h3 className="mt-2 break-all text-sm font-semibold text-slate-900">

              {
                payment.transactionId
              }

            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tracking ID
            </p>

            <h3 className="mt-2 break-all text-sm font-semibold text-slate-900">

              {
                payment.booking
                  ?.trackingId
              }

            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Payment Method
            </p>

            <h3 className="mt-2 text-sm font-semibold capitalize text-slate-900">

              {
                payment.paymentMethod
              }

            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Status
            </p>

            <h3 className="mt-2 text-sm font-semibold capitalize text-green-600">

              {
                payment.status
              }

            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Date
            </p>

            <h3 className="mt-2 text-sm font-semibold text-slate-900">

              {
                new Date(
                  payment.createdAt
                ).toLocaleDateString()
              }

            </h3>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Invoice ID
            </p>

            <h3 className="mt-2 break-all text-sm font-semibold text-slate-900">

              {
                invoice.invoiceId
              }

            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}