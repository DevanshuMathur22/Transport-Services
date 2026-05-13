"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldX,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

type Driver = {

  id: string

  name: string

  email: string

  phone: string

  city: string | null

  vehicleType: string | null

  vehicleNumber: string | null

  aadhaarNumber: string | null

  licenseNumber: string | null

  aadhaarUrl: string | null

  licenseUrl: string | null

  rcUrl: string | null

  insuranceUrl: string | null

  verificationStatus: string

  isDriverApproved: boolean

  duplicateChecks: {

    aadhaar: boolean

    license: boolean

    vehicle: boolean
  }
}

export default function DriverReviewPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    actionLoading,
    setActionLoading,
  ] = useState("")

  const [
    drivers,
    setDrivers,
  ] = useState<Driver[]>([])

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchDrivers()

  }, [])

  const fetchDrivers =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/admin/drivers/review"
          )

        setDrivers(
          res.data.drivers || []
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // APPROVE
  //////////////////////////////////////////////////////

  const approveDriver =
    async (
      driverId: string
    ) => {

      try {

        setActionLoading(
          driverId
        )

        await axios.put(
          "/api/admin/drivers/approve",
          {
            driverId,
          }
        )

        setDrivers(
          (prev) =>

            prev.filter(
              (item) =>
                item.id !==
                driverId
            )
        )

      } catch (error) {

        console.log(error)

      } finally {

        setActionLoading("")
      }
    }

  //////////////////////////////////////////////////////
  // REJECT
  //////////////////////////////////////////////////////

  const rejectDriver =
    async (
      driverId: string
    ) => {

      try {

        setActionLoading(
          driverId
        )

        await axios.put(
          "/api/admin/drivers/reject",
          {
            driverId,
          }
        )

        setDrivers(
          (prev) =>

            prev.filter(
              (item) =>
                item.id !==
                driverId
            )
        )

      } catch (error) {

        console.log(error)

      } finally {

        setActionLoading("")
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (

      <div className="flex h-[400px] items-center justify-center text-sm font-medium text-slate-500">

        Loading review drivers...

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

              Driver Manual Review

            </h1>

            <p className="mt-2 text-sm text-slate-300">

              Review suspicious or duplicate driver documents.

            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-yellow-500/20 px-5 py-3 text-sm font-medium text-yellow-300">

            <AlertTriangle
              size={18}
            />

            {
              drivers.length
            }

            {" "}

            Pending Reviews

          </div>
        </div>
      </motion.div>

      {/* EMPTY */}

      {
        drivers.length === 0 && (

          <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center shadow-sm">

            <CheckCircle2
              size={40}
              className="mx-auto text-green-500"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900">

              No suspicious drivers found

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              All drivers are verified automatically.

            </p>
          </div>
        )
      }

      {/* DRIVERS */}

      <div className="grid gap-6">

        {
          drivers.map(
            (
              driver
            ) => (

              <motion.div
                key={driver.id}
                whileHover={{
                  y: -3,
                }}
                className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
              >

                {/* TOP */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="space-y-3">

                    <div>

                      <h2 className="text-2xl font-bold text-slate-900">

                        {
                          driver.name
                        }

                      </h2>

                      <p className="text-sm text-slate-500">

                        {
                          driver.email
                        }

                      </p>
                    </div>

                    <div className="grid gap-2 text-sm text-slate-700">

                      <p>

                        Phone:
                        {" "}

                        {
                          driver.phone ||
                          "N/A"
                        }

                      </p>

                      <p>

                        City:
                        {" "}

                        {
                          driver.city ||
                          "N/A"
                        }

                      </p>

                      <p>

                        Vehicle:
                        {" "}

                        {
                          driver.vehicleType ||
                          "N/A"
                        }

                      </p>

                      <p>

                        Vehicle Number:
                        {" "}

                        {
                          driver.vehicleNumber ||
                          "N/A"
                        }

                      </p>

                      <p>

                        Aadhaar:
                        {" "}

                        {
                          driver.aadhaarNumber ||
                          "N/A"
                        }

                      </p>

                      <p>

                        License:
                        {" "}

                        {
                          driver.licenseNumber ||
                          "N/A"
                        }

                      </p>
                    </div>
                  </div>

                  {/* FLAGS */}

                  <div className="flex flex-wrap gap-2">

                    <div className="rounded-xl bg-yellow-100 px-3 py-2 text-xs font-semibold text-yellow-700">

                      {
                        driver.verificationStatus
                      }

                    </div>

                    {
                      driver
                        .duplicateChecks
                        .aadhaar && (

                          <div className="rounded-xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">

                            Duplicate Aadhaar

                          </div>
                        )
                    }

                    {
                      driver
                        .duplicateChecks
                        .license && (

                          <div className="rounded-xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">

                            Duplicate License

                          </div>
                        )
                    }

                    {
                      driver
                        .duplicateChecks
                        .vehicle && (

                          <div className="rounded-xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">

                            Duplicate Vehicle

                          </div>
                        )
                    }
                  </div>
                </div>

                {/* DOCUMENTS */}

                <div className="mt-6 grid gap-4 lg:grid-cols-2">

                  {[
                    {
                      title:
                        "License",

                      url:
                        driver.licenseUrl,
                    },

                    {
                      title:
                        "RC Document",

                      url:
                        driver.rcUrl,
                    },

                    {
                      title:
                        "Aadhaar",

                      url:
                        driver.aadhaarUrl,
                    },

                    {
                      title:
                        "Insurance",

                      url:
                        driver.insuranceUrl,
                    },
                  ].map(
                    (
                      item
                    ) => (

                      <div
                        key={
                          item.title
                        }
                        className="rounded-2xl border border-slate-200 p-4"
                      >

                        <div className="flex items-center gap-2">

                          <FileText
                            size={18}
                            className="text-orange-500"
                          />

                          <h3 className="font-semibold text-slate-900">

                            {
                              item.title
                            }

                          </h3>
                        </div>

                        {
                          item.url ? (

                            <a
                              href={
                                item.url
                              }
                              target="_blank"
                              className="
                                mt-4
                                inline-flex
                                items-center
                                rounded-xl
                                bg-slate-900
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-white
                              "
                            >

                              Open Document

                            </a>

                          ) : (

                            <p className="mt-4 text-sm text-slate-500">

                              No document uploaded

                            </p>
                          )
                        }
                      </div>
                    )
                  )}
                </div>

                {/* ACTIONS */}

                <div className="mt-6 flex flex-wrap gap-4">

                  <button
                    onClick={() =>
                      approveDriver(
                        driver.id
                      )
                    }
                    disabled={
                      actionLoading ===
                      driver.id
                    }
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 text-sm font-medium text-white transition-all hover:bg-green-600 disabled:opacity-60"
                  >

                    <CheckCircle2
                      size={18}
                    />

                    {
                      actionLoading ===
                      driver.id

                        ? "Approving..."

                        : "Approve Driver"
                    }

                  </button>

                  <button
                    onClick={() =>
                      rejectDriver(
                        driver.id
                      )
                    }
                    disabled={
                      actionLoading ===
                      driver.id
                    }
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 text-sm font-medium text-white transition-all hover:bg-red-600 disabled:opacity-60"
                  >

                    <ShieldX
                      size={18}
                    />

                    {
                      actionLoading ===
                      driver.id

                        ? "Rejecting..."

                        : "Reject Driver"
                    }

                  </button>
                </div>
              </motion.div>
            )
          )
        }
      </div>
    </div>
  )
}