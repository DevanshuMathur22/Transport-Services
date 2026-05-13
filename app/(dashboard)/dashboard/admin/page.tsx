"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

import {
  Users,
  Truck,
  Package,
  IndianRupee,
  Clock3,
  Activity,
  CheckCircle2,
} from "lucide-react"

export default function AdminDashboardPage() {

  const [loading, setLoading] =
    useState(true)

  const [stats, setStats] =
    useState<any>(null)

  const [recentBookings, setRecentBookings] =
    useState<any[]>([])

  const [pendingDrivers, setPendingDrivers] =
    useState<any[]>([])

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/admin/dashboard"
          )

        setStats(response.data.stats)

        setRecentBookings(
          response.data.recentBookings
        )

        setPendingDrivers(
          response.data.pendingDrivers
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  if (
  loading ||
  !stats
) {

  return (
    <div className="
      flex
      h-screen
      items-center
      justify-center
    ">
      Loading...
    </div>
  )
}
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color:
        "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers,
      icon: Truck,
      color:
        "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Package,
      color:
        "from-orange-500 to-amber-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: IndianRupee,
      color:
        "from-emerald-500 to-green-500",
    },
  ]

  return (
    <div className="
      min-h-screen
      bg-zinc-50
      p-6
      space-y-8
    ">

      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
            tracking-tight
          ">
            Admin Dashboard
          </h1>

          <p className="
            mt-2
            text-zinc-500
          ">
            Logistics analytics overview
          </p>
        </div>

        <div className="
          hidden
          md:flex
          items-center
          gap-3
          rounded-2xl
          bg-white
          px-5
          py-3
          shadow-sm
          border
        ">
          <Activity className="
            h-5
            w-5
            text-emerald-500
          " />

          <p className="
            text-sm
            font-medium
          ">
            System Active
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {cards.map((card) => {

          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-white
                p-6
                shadow-sm
                border
              "
            >

              <div className="
                absolute
                right-0
                top-0
                h-32
                w-32
                rounded-full
                bg-zinc-100
                blur-3xl
              " />

              <div className="
                relative
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-zinc-500
                  ">
                    {card.title}
                  </p>

                  <h2 className="
                    mt-4
                    text-4xl
                    font-bold
                  ">
                    {card.value}
                  </h2>
                </div>

                <div className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  ${card.color}
                `}>
                  <Icon className="
                    h-8
                    w-8
                    text-white
                  " />
                </div>
              </div>
            </div>
          )
        })}

      </div>

      {/* Content Grid */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        {/* Recent Bookings */}
        <div className="
          xl:col-span-2
          rounded-3xl
          border
          bg-white
          p-6
          shadow-sm
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
              ">
                Recent Bookings
              </h2>

              <p className="
                mt-1
                text-sm
                text-zinc-500
              ">
                Latest shipment activities
              </p>
            </div>

            <Package className="
              h-6
              w-6
              text-zinc-400
            " />
          </div>

          <div className="
            mt-6
            space-y-4
          ">

            {recentBookings.length === 0 && (
              <div className="
                rounded-2xl
                border
                border-dashed
                p-10
                text-center
                text-zinc-500
              ">
                No recent bookings
              </div>
            )}

            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-5
                  transition
                  hover:bg-zinc-50
                "
              >

                <div>

                  <h3 className="
                    font-semibold
                  ">
                    {booking.trackingId}
                  </h3>

                  <p className="
                    mt-1
                    text-sm
                    text-zinc-500
                  ">
                    {booking.fromCity}
                    {" → "}
                    {booking.toCity}
                  </p>
                </div>

                <div className="
                  text-right
                ">

                  <p className="
                    font-bold
                  ">
                    ₹{booking.price}
                  </p>

                  <span className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-zinc-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    capitalize
                  ">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
{/* Driver Management */}
<div className="
  rounded-3xl
  border
  bg-white
  p-6
  shadow-sm
">

  {/* Header */}
  <div className="
    flex
    flex-col
    gap-4
    md:flex-row
    md:items-center
    md:justify-between
  ">

    <div>

      <h2 className="
        text-2xl
        font-bold
      ">
        Drivers
      </h2>

      <p className="
        mt-1
        text-sm
        text-zinc-500
      ">
        Search and manage drivers
      </p>
    </div>

    {/* Search */}
    <input
      type="text"
      placeholder="Search drivers..."
      className="
        h-11
        w-full
        rounded-2xl
        border
        px-4
        text-sm
        outline-none
        focus:border-black
        md:w-72
      "
    />
  </div>

  {/* Stats */}
  <div className="
    mt-6
    grid
    grid-cols-2
    gap-4
  ">

    <div className="
      rounded-2xl
      bg-zinc-100
      p-4
    ">

      <p className="
        text-sm
        text-zinc-500
      ">
        Active Drivers
      </p>

      <h3 className="
        mt-2
        text-3xl
        font-bold
      ">
        {stats.totalDrivers}
      </h3>
    </div>

    <div className="
      rounded-2xl
      bg-red-100
      p-4
    ">

      <p className="
        text-sm
        text-red-600
      ">
        Blocked Drivers
      </p>

      <h3 className="
        mt-2
        text-3xl
        font-bold
        text-red-600
      ">
        0
      </h3>
    </div>
  </div>

  {/* Drivers List */}
  <div className="
    mt-6
    space-y-4
  ">

    {pendingDrivers.length === 0 && (

      <div className="
        rounded-2xl
        border
        border-dashed
        p-10
        text-center
      ">

        <CheckCircle2 className="
          mx-auto
          h-10
          w-10
          text-emerald-500
        " />

        <p className="
          mt-3
          text-sm
          text-zinc-500
        ">
          No drivers found
        </p>
      </div>
    )}

    {pendingDrivers.map((driver) => (

      <div
        key={driver.id}
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          p-4
        "
      >

        <div>

          <h3 className="
            font-semibold
          ">
            {driver.name}
          </h3>

          <p className="
            mt-1
            text-sm
            text-zinc-500
          ">
            {driver.email}
          </p>
        </div>

       <div className="
  flex
  items-center
  gap-3
">

  <button
    onClick={() =>
      window.location.href =
        `/dashboard/admin/drivers/review?id=${driver.id}`
    }
    className="
      rounded-xl
      border
      px-4
      py-2
      text-sm
      font-medium
      transition
      hover:bg-zinc-100
    "
  >
    View
  </button>

  <button
    onClick={async () => {

      try {

        await axios.put(
          "/api/admin/drivers/block",
          {
            driverId:
              driver.id,
          }
        )

        fetchDashboard()

      } catch (error) {

        console.log(error)
      }
    }}
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

</div>
      </div>
    ))}

  </div>
</div>

      </div>
    </div>
  )
}