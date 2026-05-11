"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Clock3,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  Weight,
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

export default function DriverOrderDetailsPage({
  params,
}: Props) {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    order,
    setOrder,
  ] = useState<any>(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchOrder()

  }, [])

  const fetchOrder =
    async () => {

      try {

        const resolved =
          await params

        const res =
          await axios.get(
            `/api/driver/orders/${resolved.id}`
          )

        setOrder(
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

        <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />

      </div>
    )
  }

  //////////////////////////////////////////////////////
  // NO ORDER
  //////////////////////////////////////////////////////

  if (!order) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <p className="text-sm text-slate-500">
          Order not found
        </p>
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

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {
                order.trackingId
              }
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Shipment details and tracking information.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium capitalize">

            {
              order.status.replace(
                "_",
                " "
              )
            }
          </div>
        </div>
      </motion.div>

      {/* GRID */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* CUSTOMER */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

              <User
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Customer
              </h2>

              <p className="text-sm text-slate-500">
                Receiver information
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            <div>

              <p className="text-xs text-slate-500">
                Name
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">

                {
                  order.user?.name ||
                  "Customer"
                }

              </h3>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Phone
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Phone
                  size={16}
                  className="text-slate-400"
                />

                <p className="font-medium text-slate-900">

                  {
                    order.user?.phone ||
                    "-"
                  }

                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

              <IndianRupee
                size={22}
                className="text-green-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Payment
              </h2>

              <p className="text-sm text-slate-500">
                Earnings and shipment amount
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>

              <p className="text-xs text-slate-500">
                Order Price
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">

                ₹{
                  order.price
                }

              </h3>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Driver Earnings
              </p>

              <h3 className="mt-2 text-2xl font-bold text-green-600">

                ₹{
                  order.driverEarning ||
                  0
                }

              </h3>
            </div>
          </div>
        </div>

        {/* ROUTE */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

              <MapPin
                size={22}
                className="text-orange-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Route
              </h2>

              <p className="text-sm text-slate-500">
                Pickup and delivery addresses
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            <div>

              <p className="text-xs text-slate-500">
                Pickup Address
              </p>

              <h3 className="mt-2 font-medium text-slate-900">

                {
                  order.pickupAddress
                }

              </h3>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Delivery Address
              </p>

              <h3 className="mt-2 font-medium text-slate-900">

                {
                  order.deliveryAddress
                }

              </h3>
            </div>
          </div>
        </div>

        {/* PACKAGE */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">

              <Package
                size={22}
                className="text-violet-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Package Details
              </h2>

              <p className="text-sm text-slate-500">
                Shipment information
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>

              <p className="text-xs text-slate-500">
                Vehicle
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Truck
                  size={16}
                  className="text-slate-400"
                />

                <h3 className="font-medium capitalize text-slate-900">

                  {
                    order.vehicleType
                  }

                </h3>
              </div>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Weight
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Weight
                  size={16}
                  className="text-slate-400"
                />

                <h3 className="font-medium text-slate-900">

                  {
                    order.weight || 0
                  } kg

                </h3>
              </div>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Package Type
              </p>

              <h3 className="mt-2 font-medium text-slate-900">

                {
                  order.packageType ||
                  "-"
                }

              </h3>
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Pickup Date
              </p>

              <h3 className="mt-2 font-medium text-slate-900">

                {
                  order.pickupDate ||
                  "-"
                }

              </h3>
            </div>
          </div>

          <div className="mt-5">

            <p className="text-xs text-slate-500">
              Instructions
            </p>

            <p className="mt-2 text-sm text-slate-700">

              {
                order.instructions ||
                "No instructions"
              }

            </p>
          </div>
        </div>
      </div>

      {/* TIMELINE */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-slate-900">
          Tracking Timeline
        </h2>

        <div className="mt-6 space-y-5">

          {order.tracking?.map(
            (
              item: any,
              index: number
            ) => (

              <div
                key={index}
                className="flex gap-4"
              >

                <div className="mt-1 flex flex-col items-center">

                  <div className="h-3 w-3 rounded-full bg-orange-500" />

                  {index !==
                    order.tracking.length - 1 && (
                    <div className="h-full w-[2px] bg-slate-200" />
                  )}
                </div>

                <div className="pb-6">

                  <p className="font-medium text-slate-900">

                    {
                      item.message
                    }

                  </p>

                  <p className="mt-1 text-sm text-slate-500">

                    {
                      item.location
                    }

                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">

                    <Clock3
                      size={14}
                    />

                    {
                      new Date(
                        item.createdAt
                      ).toLocaleString()
                    }
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