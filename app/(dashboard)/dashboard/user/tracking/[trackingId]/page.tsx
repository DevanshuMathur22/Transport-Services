// app/dashboard/user/tracking/[trackingId]/page.tsx

"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

interface Props {
  params: Promise<{
    trackingId: string
  }>
}

export default function TrackingDetailsPage({
  params,
}: Props) {

  const [trackingId, setTrackingId] =
    useState("")

  const [data, setData] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // GET PARAMS
  //////////////////////////////////////////////////////

  useEffect(() => {

    async function loadParams() {

      const resolved =
        await params

      setTrackingId(
        resolved.trackingId
      )
    }

    loadParams()

  }, [params])

  //////////////////////////////////////////////////////
  // FETCH TRACKING
  //////////////////////////////////////////////////////

  useEffect(() => {

    if (!trackingId) return

    async function fetchTracking() {

      try {

        const res =
          await axios.get(
            `/api/tracking/${trackingId}`
          )

        setData(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchTracking()

  }, [trackingId])

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <p className="text-lg font-semibold text-slate-500">
          Loading...
        </p>

      </div>
    )
  }

  //////////////////////////////////////////////////////
  // NO DATA
  //////////////////////////////////////////////////////

  if (!data) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <p className="text-lg font-semibold text-red-500">
          Tracking Not Found
        </p>

      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className="rounded-3xl bg-black p-6 text-white">

        <h1 className="text-3xl font-bold">
          Live Tracking
        </h1>

        <p className="mt-2 text-sm text-slate-300">

          {data.trackingId}

        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Shipment Details
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-sm text-slate-500">
                Route
              </p>

              <h3 className="font-semibold text-slate-900">

                {data.fromCity}
                {" → "}
                {data.toCity}

              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Vehicle
              </p>

              <h3 className="font-semibold capitalize text-slate-900">

                {data.vehicleType}

              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <h3 className="font-semibold capitalize text-green-600">

                {data.status}

              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                ETA
              </p>

              <h3 className="font-semibold text-slate-900">

                {data.eta}

              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Driver Details
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-sm text-slate-500">
                Driver Name
              </p>

              <h3 className="font-semibold text-slate-900">

                {data.driver.name}

              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Phone
              </p>

              <h3 className="font-semibold text-slate-900">

                {data.driver.phone}

              </h3>
            </div>

           <div>
  <p className="text-sm text-slate-500">
    Driver Status
  </p>

  <h3 className="font-semibold text-green-600">
    Available
  </h3>
</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">

        <h2 className="text-xl font-bold text-slate-900">
          Timeline
        </h2>

        <div className="mt-5 space-y-4">

          {data.timeline.map(
            (
              item: any,
              index: number
            ) => (

              <div
                key={index}
                className="rounded-2xl bg-slate-50 p-4"
              >

                <h3 className="font-semibold text-slate-900">

                  {item.message}

                </h3>

                <p className="mt-1 text-sm text-slate-500">

                  {item.location}

                </p>

                <p className="mt-1 text-xs text-slate-400">

                  {item.time}

                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}