// app/dashboard/user/notifications/page.tsx

"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Bell,
  CheckCircle2,
  CreditCard,
  Package,
  Truck,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

interface NotificationType {
  id: string
  type: string
  title: string
  message: string
  time: string
}

export default function NotificationsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [notifications, setNotifications] =
    useState<NotificationType[]>([])

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchNotifications()

  }, [])

  const fetchNotifications =
    async () => {

      try {

        setLoading(true)

        const res =
          await axios.get(
            "/api/user/notifications"
          )

        //////////////////////////////////////////////////////
        // SAFE ARRAY CHECK
        //////////////////////////////////////////////////////

        if (
          Array.isArray(
            res.data
          )
        ) {

          setNotifications(
            res.data
          )

        } else if (
          Array.isArray(
            res.data?.notifications
          )
        ) {

          setNotifications(
            res.data.notifications
          )

        } else {

          setNotifications([])
        }

      } catch (error) {

        console.log(
          "FETCH NOTIFICATIONS ERROR:",
          error
        )

        setNotifications([])

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // ICONS
  //////////////////////////////////////////////////////

  const getIcon =
    (type: string) => {

      switch (type) {

        case "booking":

          return {
            icon: Package,
            color:
              "bg-blue-100 text-blue-600",
          }

        case "payment":

          return {
            icon: CreditCard,
            color:
              "bg-green-100 text-green-600",
          }

        case "tracking":

          return {
            icon: Truck,
            color:
              "bg-orange-100 text-orange-600",
          }

        default:

          return {
            icon: CheckCircle2,
            color:
              "bg-emerald-100 text-emerald-600",
          }
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
            Loading notifications...
          </p>

        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

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

        <div className="relative flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10">

            <Bell
              size={26}
              className="text-green-400"
            />

          </div>

          <div>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Notifications
            </h1>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
              Stay updated with your bookings, payments and shipment activity.
            </p>

          </div>
        </div>
      </motion.div>

      {/* EMPTY */}

      {
        notifications.length === 0 && (

          <div className="flex h-[40vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white text-center">

            <Bell
              size={42}
              className="text-slate-300"
            />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">

              No Notifications

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Notifications will appear here.

            </p>
          </div>
        )
      }

      {/* LIST */}

      <div className="space-y-4">

        {
          (notifications || []).map(
            (
              item,
              index
            ) => {

              const config =
                getIcon(
                  item.type
                )

              const Icon =
                config.icon

              return (

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
                  className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >

                  <div className="flex gap-4">

                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl ${config.color}`}>

                      <Icon
                        size={24}
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <h2 className="text-base font-semibold text-slate-900">

                          {
                            item.title
                          }

                        </h2>

                        <p className="text-xs text-slate-400">

                          {
                            item.time || "Just now"
                          }

                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-500">

                        {
                          item.message
                        }

                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            }
          )
        }
      </div>
    </div>
  )
}