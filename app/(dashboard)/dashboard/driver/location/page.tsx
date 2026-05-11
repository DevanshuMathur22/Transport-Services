"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Loader2,
  MapPin,
  Navigation,
  Satellite,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverLocationPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    location,
    setLocation,
  ] = useState<any>(null)

  //////////////////////////////////////////////////////
  // FETCH LOCATION
  //////////////////////////////////////////////////////

  const fetchLocation =
    async () => {

      if (
        !navigator.geolocation
      ) {

        alert(
          "Geolocation not supported"
        )

        return
      }

      setLoading(true)

      navigator.geolocation.getCurrentPosition(

        async (
          position
        ) => {

          const latitude =
            position.coords.latitude

          const longitude =
            position.coords.longitude

          try {

            //////////////////////////////////////////////////////
            // SAVE LOCATION
            //////////////////////////////////////////////////////

            await axios.put(
              "/api/driver/location",
              {

                latitude,

                longitude,
              }
            )

            //////////////////////////////////////////////////////
            // SET STATE
            //////////////////////////////////////////////////////

            setLocation({

              latitude,

              longitude,
            })

          } catch (error) {

            console.log(error)

          } finally {

            setLoading(false)
          }
        },

        (
          error
        ) => {

          console.log(error)

          setLoading(false)
        }
      )
    }

  //////////////////////////////////////////////////////
  // AUTO FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchLocation()

  }, [])

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

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Live Location
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Share and manage your realtime delivery location.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-green-500/20 px-5 py-3 text-sm font-medium text-green-300">

            <Satellite
              size={18}
            />

            GPS Tracking Enabled
          </div>
        </div>
      </motion.div>

      {/* LOCATION CARD */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

            <MapPin
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Current Coordinates
            </h2>

            <p className="text-sm text-slate-500">
              Your live GPS location
            </p>
          </div>
        </div>

        {/* CONTENT */}

        <div className="mt-8">

          {!location ? (

            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 py-16 text-center">

              <Loader2
                size={30}
                className="animate-spin text-orange-500"
              />

              <p className="mt-4 text-sm text-slate-500">
                Fetching live location...
              </p>
            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {/* LATITUDE */}

              <div className="rounded-3xl bg-slate-100 p-6">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Latitude
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">

                  {
                    location.latitude
                  }

                </h3>
              </div>

              {/* LONGITUDE */}

              <div className="rounded-3xl bg-slate-100 p-6">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Longitude
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">

                  {
                    location.longitude
                  }

                </h3>
              </div>
            </div>
          )}
        </div>

        {/* BUTTON */}

        <button
          onClick={
            fetchLocation
          }
          disabled={loading}
          className="mt-8 flex h-12 items-center gap-2 rounded-2xl bg-orange-500 px-6 text-sm font-medium text-white transition-all hover:bg-orange-600 disabled:opacity-60"
        >

          <Navigation
            size={18}
          />

          {
            loading
              ? "Updating..."
              : "Refresh Location"
          }

        </button>
      </div>
    </div>
  )
}