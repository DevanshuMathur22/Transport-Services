"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

import {
  ShieldCheck,
  Truck,
  Wifi,
  WifiOff,
} from "lucide-react"

export default function DriversPage() {

  const [loading, setLoading] =
    useState(true)

  const [drivers, setDrivers] =
    useState<any[]>([])

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/admin/drivers"
          )

        setDrivers(response.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  const blockDriver =
    async (id: string) => {

      try {

        await axios.patch(
          "/api/admin/drivers/block",
          {
            id,
          }
        )

        fetchDrivers()

      } catch (error) {

        console.log(error)
      }
    }

  if (loading) {

    return (
      <div className="p-6">
        Loading...
      </div>
    )
  }

  return (
    <div className="
      min-h-screen
      bg-zinc-50
      p-6
      space-y-8
    ">

      {/* Header */}
      <div>

        <h1 className="
          text-4xl
          font-bold
          tracking-tight
        ">
          Drivers Management
        </h1>

        <p className="
          mt-2
          text-zinc-500
        ">
          Manage all logistics drivers
        </p>
      </div>

      {/* Drivers Table */}
      <div className="
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
      ">

        <div className="
          overflow-x-auto
        ">

          <table className="
            w-full
          ">

            <thead className="
              border-b
              bg-zinc-50
            ">

              <tr>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Driver
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Vehicle
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Status
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                ">
                  Online
                </th>

                <th className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-semibold
                ">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {drivers.length === 0 && (
                <tr>

                  <td
                    colSpan={5}
                    className="
                      px-6
                      py-10
                      text-center
                      text-zinc-500
                    "
                  >
                    No drivers found
                  </td>

                </tr>
              )}

              {drivers.map((driver) => (

                <tr
                  key={driver.id}
                  className="
                    border-b
                    last:border-0
                  "
                >

                  {/* Driver */}
                  <td className="
                    px-6
                    py-5
                  ">

                    <div className="
                      flex
                      items-center
                      gap-4
                    ">

                      <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-zinc-100
                      ">

                        <Truck className="
                          h-6
                          w-6
                          text-zinc-600
                        " />
                      </div>

                      <div>

                        <h2 className="
                          font-semibold
                        ">
                          {driver.name}
                        </h2>

                        <p className="
                          text-sm
                          text-zinc-500
                        ">
                          {driver.email}
                        </p>

                        <p className="
                          text-xs
                          text-zinc-400
                        ">
                          {driver.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="
                    px-6
                    py-5
                  ">

                    <p className="
                      font-medium
                      capitalize
                    ">
                      {driver.vehicleType || "-"}
                    </p>

                    <p className="
                      text-sm
                      text-zinc-500
                    ">
                      {driver.vehicleNumber || "-"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="
                    px-6
                    py-5
                  ">

                    {driver.isBlocked ? (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-red-100
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-red-700
                      ">
                        Blocked
                      </div>

                    ) : (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-emerald-700
                      ">

                        <ShieldCheck className="
                          h-4
                          w-4
                        " />

                        Active
                      </div>
                    )}
                  </td>

                  {/* Online */}
                  <td className="
                    px-6
                    py-5
                  ">

                    {driver.isOnline ? (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        text-emerald-600
                      ">

                        <Wifi className="
                          h-4
                          w-4
                        " />

                        Online
                      </div>

                    ) : (

                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        text-zinc-500
                      ">

                        <WifiOff className="
                          h-4
                          w-4
                        " />

                        Offline
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  {/* Actions */}
<td className="
  px-6
  py-5
  text-right
">

  {driver.isBlocked ? (

    <button
      onClick={async () => {

        try {

          await axios.patch(
            "/api/admin/drivers/unblock",
            {
              id: driver.id,
            }
          )

          fetchDrivers()

        } catch (error) {

          console.log(error)
        }
      }}
      className="
        rounded-xl
        bg-emerald-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-emerald-700
      "
    >
      Unblock
    </button>

  ) : (

    <button
      onClick={() =>
        blockDriver(
          driver.id
        )
      }
      className="
        rounded-xl
        bg-red-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-red-700
      "
    >
      Block
    </button>

  )}

</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}