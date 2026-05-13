"use client"

import Link from "next/link"

import axios from "axios"

import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react"

import { useRouter }
from "next/navigation"

const links = [

  {
    label: "Dashboard",

    href:
      "/dashboard/admin",

    icon:
      LayoutDashboard,
  },

  {
    label: "Drivers",

    href:
      "/dashboard/admin/drivers",

    icon:
      Truck,
  },

  {
    label: "Driver Reviews",

    href:
      "/dashboard/admin/drivers/review",

    icon:
      ShieldCheck,
  },

  {
    label: "Users",

    href:
      "/dashboard/admin/users",

    icon:
      Users,
  },

  {
    label: "Bookings",

    href:
      "/dashboard/admin/bookings",

    icon:
      Package,
  },

  {
    label: "Payments",

    href:
      "/dashboard/admin/payments",

    icon:
      CreditCard,
  },

  {
    label: "Analytics",

    href:
      "/dashboard/admin/analytics",

    icon:
      BarChart3,
  },

  {
    label: "Settings",

    href:
      "/dashboard/admin/settings",

    icon:
      Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router =
    useRouter()

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////

  const handleLogout =
    async () => {

      try {

        await axios.post(
          "/api/auth/logout"
        )

        router.push(
          "/login"
        )

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <div className="flex min-h-screen bg-zinc-50">

      {/* SIDEBAR */}

      <aside className="hidden w-72 flex-col border-r bg-white md:flex">

        {/* HEADER */}

        <div className="flex h-20 items-center border-b px-6">

          <h1 className="text-2xl font-bold">

            Admin Panel

          </h1>
        </div>

        {/* LINKS */}

        <div className="flex-1 space-y-2 p-4">

          {links.map(
            (link) => {

              const Icon =
                link.icon

              return (

                <Link
                  key={
                    link.href
                  }
                  href={
                    link.href
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    transition
                    hover:bg-zinc-100
                  "
                >

                  <Icon className="h-5 w-5" />

                  <span className="font-medium">

                    {
                      link.label
                    }

                  </span>
                </Link>
              )
            }
          )}
        </div>

        {/* LOGOUT */}

        <div className="border-t p-4">

          <button
            onClick={
              handleLogout
            }
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-red-600
              transition
              hover:bg-red-50
            "
          >

            <LogOut className="h-5 w-5" />

            <span className="font-medium">

              Logout

            </span>
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 overflow-y-auto">

        {children}

      </main>
    </div>
  )
}